#!/usr/bin/env bash
set -euo pipefail

#
# gh-deploy.sh — Build and publish the site to GitHub Pages (OSS repo).
#
# Deploys the Vite production build (dist/) to the `gh-pages` branch of the
# public OSS repo — the same repo publish-oss.sh mirrors this project's source
# into — as a single squashed commit (force-pushed; the branch holds a build
# artifact, not history). GitHub Pages then serves it at:
#
#   https://algorisys-oss.github.io/react-katas/
#
# So the OSS repo carries both: `main` (source, mirrored by publish-oss.sh) and
# `gh-pages` (the built site, published here).
#
# One-time GitHub setup on the OSS repo: Settings → Pages → Build and deployment
# → Source = "Deploy from a branch", Branch = gh-pages, folder = / (root).
#
# Client routing is hash-based (see src/router/router.tsx) and Vite `base` is
# '/react-katas/' for builds, so deep links and refreshes work without any
# server-side SPA fallback.
#
# Usage:
#   ./scripts/gh-deploy.sh                  # dry-run: build + preview, no push
#   ./scripts/gh-deploy.sh --push           # build and publish to gh-pages
#
# Overridable via env:
#   GH_REMOTE   git remote URL to push to   (default: OSS repo; honors OSS_REMOTE)
#   GH_BRANCH   branch Pages serves from     (default: gh-pages)
#

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# --- Configuration -----------------------------------------------------------

# Default to the public OSS repo (same remote publish-oss.sh targets). GH_REMOTE
# wins if set; otherwise fall back to OSS_REMOTE so both scripts share one env.
GH_REMOTE="${GH_REMOTE:-${OSS_REMOTE:-https://github.com/algorisys-oss/react-katas.git}}"
GH_BRANCH="${GH_BRANCH:-gh-pages}"
DIST_DIR="$REPO_ROOT/dist"
DRY_RUN=true

if [[ "${1:-}" == "--push" ]]; then
    DRY_RUN=false
fi

# --- Helpers ------------------------------------------------------------------

info()  { printf "\033[1;34m=> %s\033[0m\n" "$*"; }
warn()  { printf "\033[1;33m=> %s\033[0m\n" "$*"; }
error() { printf "\033[1;31m=> %s\033[0m\n" "$*"; exit 1; }

# --- Build --------------------------------------------------------------------

info "Building production bundle (npm run build)"
( cd "$REPO_ROOT" && npm run build )

[[ -f "$DIST_DIR/index.html" ]] || error "Build did not produce dist/index.html"

# Disable Jekyll on GitHub Pages so files/folders starting with '_' are served.
touch "$DIST_DIR/.nojekyll"

# --- Dry run ------------------------------------------------------------------

if [[ "$DRY_RUN" == true ]]; then
    echo ""
    info "dist/ contents:"
    ( cd "$DIST_DIR" && find . -maxdepth 2 | sort )
    echo ""
    warn "DRY RUN — nothing pushed."
    warn "Preview locally:   npm run preview"
    warn "Publish for real:  $0 --push"
    exit 0
fi

# --- Publish to gh-pages ------------------------------------------------------

SOURCE_SHA="$(git -C "$REPO_ROOT" rev-parse --short HEAD)"
COMMIT_MSG="deploy: site build from $SOURCE_SHA ($(date +%Y-%m-%d))"

info "Publishing dist/ to $GH_REMOTE ($GH_BRANCH)"

# Build a throwaway single-commit repo inside dist/ and force-push it.
# Isolate git state with a temporary index/dir so we never touch the main repo.
TMP_GIT="$(mktemp -d)"
trap 'rm -rf "$TMP_GIT" "$DIST_DIR/.git"' EXIT

git -C "$DIST_DIR" init -q -b "$GH_BRANCH"
git -C "$DIST_DIR" add -A
git -C "$DIST_DIR" \
    -c user.name="${GIT_AUTHOR_NAME:-$(git config user.name)}" \
    -c user.email="${GIT_AUTHOR_EMAIL:-$(git config user.email)}" \
    commit -q -m "$COMMIT_MSG"
git -C "$DIST_DIR" push -f "$GH_REMOTE" "$GH_BRANCH"

info "Done. Live shortly at https://algorisys-oss.github.io/react-katas/"
