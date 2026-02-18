#!/usr/bin/env bash
set -euo pipefail

#
# publish-oss.sh — Publish a cleaned copy to the OSS repo.
#
# Usage:
#   ./scripts/publish-oss.sh                   # dry-run (default)
#   ./scripts/publish-oss.sh --push            # actually push to OSS remote
#

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# --- Configuration -----------------------------------------------------------

OSS_REMOTE="${OSS_REMOTE:-git@github.com:algorisys-oss/react-katas.git}"
OSS_BRANCH="${OSS_BRANCH:-main}"                  # branch to push to on OSS remote
OSS_MESSAGE="${OSS_MESSAGE:-}"                    # custom commit message (optional)
OSSIGNORE_FILE="$REPO_ROOT/.ossignore"            # list of paths to exclude
DRY_RUN=true

if [[ "${1:-}" == "--push" ]]; then
    DRY_RUN=false
fi

# --- Helpers ------------------------------------------------------------------

info()  { printf "\033[1;34m=> %s\033[0m\n" "$*"; }
warn()  { printf "\033[1;33m=> %s\033[0m\n" "$*"; }
error() { printf "\033[1;31m=> %s\033[0m\n" "$*"; exit 1; }

# --- Validate -----------------------------------------------------------------

if [[ "$DRY_RUN" == false && -z "$OSS_REMOTE" ]]; then
    error "OSS_REMOTE is not set. Export it or pass it inline:\n  OSS_REMOTE=git@github.com:algorisys-oss/react-katas.git $0 --push"
fi

if [[ ! -f "$OSSIGNORE_FILE" ]]; then
    error ".ossignore not found at $OSSIGNORE_FILE"
fi

# --- Create temp working copy ------------------------------------------------

WORK_DIR="$(mktemp -d)"
trap 'rm -rf "$WORK_DIR"' EXIT

info "Creating working copy in $WORK_DIR"
# Use git archive of HEAD to get a clean copy without .git or ignored files
git -C "$REPO_ROOT" archive HEAD | tar -x -C "$WORK_DIR"

# --- Read .ossignore and remove listed paths ----------------------------------

info "Removing paths listed in .ossignore"
while IFS= read -r line; do
    # Skip blank lines and comments
    [[ -z "$line" || "$line" == \#* ]] && continue
    target="$WORK_DIR/$line"
    if [[ -e "$target" ]]; then
        rm -rf "$target"
        info "  removed: $line"
    else
        warn "  not found (skipped): $line"
    fi
done < "$OSSIGNORE_FILE"

# --- Patch package.json -------------------------------------------------------

info "Patching package.json"

node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('$WORK_DIR/package.json', 'utf8'));

// Remove private flag so it can be forked/cloned freely
delete pkg.private;

// Keep only client-relevant scripts
pkg.scripts = {
    dev: 'vite',
    build: 'tsc && vite build',
    preview: 'vite preview',
    test: 'vitest',
    lint: 'eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0'
};

fs.writeFileSync('$WORK_DIR/package.json', JSON.stringify(pkg, null, 2) + '\n');
"

# --- Summary ------------------------------------------------------------------

info "OSS tree contents:"
(cd "$WORK_DIR" && find . -maxdepth 2 -not -path '*/node_modules/*' -not -path './.git/*' | sort)

echo ""
info "package.json scripts:"
node -e "const p=JSON.parse(require('fs').readFileSync('$WORK_DIR/package.json','utf8')); console.log(JSON.stringify(p.scripts,null,2));"

echo ""
info "package.json dependencies:"
node -e "const p=JSON.parse(require('fs').readFileSync('$WORK_DIR/package.json','utf8')); console.log('dependencies:', JSON.stringify(Object.keys(p.dependencies||{}),null,2)); console.log('devDependencies:', JSON.stringify(Object.keys(p.devDependencies||{}),null,2));"

# --- Push to OSS remote -------------------------------------------------------

if [[ "$DRY_RUN" == true ]]; then
    echo ""
    warn "DRY RUN — no changes pushed."
    warn "Review the tree above. To push for real:"
    warn "  $0 --push"
    exit 0
fi

info "Cloning OSS remote and applying changes to $OSS_REMOTE ($OSS_BRANCH)"

OSS_CLONE="$(mktemp -d)"
# Clone existing history (shallow to save time); if branch doesn't exist yet, init fresh
if git clone --depth=1 --branch "$OSS_BRANCH" "$OSS_REMOTE" "$OSS_CLONE" 2>/dev/null; then
    info "Cloned existing $OSS_BRANCH branch"
else
    warn "Branch $OSS_BRANCH not found on remote — initializing fresh repo"
    git init -b "$OSS_BRANCH" "$OSS_CLONE"
    git -C "$OSS_CLONE" remote add origin "$OSS_REMOTE"
fi

# Replace all tracked content with the new snapshot
# 1. Remove everything except .git
find "$OSS_CLONE" -mindepth 1 -maxdepth 1 -not -name '.git' -exec rm -rf {} +
# 2. Copy the cleaned working tree in
cp -a "$WORK_DIR"/. "$OSS_CLONE"/

cd "$OSS_CLONE"
git add -A

# Only commit if there are actual changes
if git diff --cached --quiet 2>/dev/null; then
    warn "No changes detected — nothing to push."
else
    SOURCE_SHA="$(git -C "$REPO_ROOT" rev-parse --short HEAD)"
    if [[ -n "$OSS_MESSAGE" ]]; then
        COMMIT_MSG="$OSS_MESSAGE

Source: $SOURCE_SHA"
    else
        COMMIT_MSG="chore: sync from upstream $(date +%Y-%m-%d)

Source: $SOURCE_SHA"
    fi
    git commit -m "$COMMIT_MSG"

    git push origin "$OSS_BRANCH"
    info "Done. Pushed to $OSS_REMOTE ($OSS_BRANCH)"
fi

rm -rf "$OSS_CLONE"
