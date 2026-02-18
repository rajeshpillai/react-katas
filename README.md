# React Katas - Modern React 19 Tutorial

> **Master React 19 from fundamentals to advanced patterns with performance, accessibility, and modern best practices**

A comprehensive, hands-on tutorial system for learning React 19 with TypeScript. Build production-ready, performant, and accessible UI components through 30 progressive lessons.

## 🎯 What You'll Learn

- **Fundamentals**: JSX, components, props, state, and event handling
- **Hooks**: useState, useEffect, useRef, custom hooks, and useReducer
- **Performance**: Component composition, React.memo, code splitting, and React 19 compiler
- **Advanced Patterns**: Compound components, render props, HOCs, and portals
- **State Management**: Context API, custom context selectors, and state machines
- **Accessibility**: ARIA, keyboard navigation, and accessible forms

## ✨ Features

- 🚀 **React 19.2** - Latest version with automatic optimizations
- 📘 **TypeScript** - Full type safety throughout
- 🎨 **Beautiful Design** - Modern UI with dark mode support
- 🧪 **Testing Examples** - Vitest + React Testing Library
- ♿ **Accessibility First** - WCAG 2.1 AA compliant
- 🎯 **Interactive Lessons** - Live code examples and demonstrations
- 📱 **Responsive** - Works on all devices
- 🔥 **No Third-Party Libraries** - Learn by building from scratch

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone or navigate to the project
cd react-katas

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 Lesson Structure

### Section 1: Fundamentals (5 lessons)
1. **JSX Basics** - Understanding JSX syntax and transformations
2. **Components & Props** - Building reusable components
3. **State Basics** - Managing component state with useState
4. **Event Handling** - Handling user interactions
5. **Conditional Rendering** - Patterns for conditional UI

### Section 2: Hooks & Side Effects (6 lessons)
6. **useEffect Fundamentals** - Side effects and lifecycle
7. **useEffect Cleanup** - Preventing memory leaks
8. **useRef Hook** - DOM access and mutable values
9. **Custom Hooks** - Creating reusable logic
10. **useReducer** - Complex state management
11. **Memoization (When You Need It)** - Understanding React 19's automatic optimizations

### Section 3: Performance Optimization (6 lessons)
12. **Component Composition** - The primary performance pattern
13. **React.memo** - Preventing unnecessary re-renders
14. **Code Splitting** - Lazy loading with Suspense
15. **Provider Pattern** - Optimizing context providers
16. **Profiling & Debugging** - Using React DevTools
17. **React 19 Compiler** - Automatic optimizations explained

### Section 4: Advanced Patterns (5 lessons)
18. **Compound Components** - Flexible component APIs
19. **Render Props** - Sharing logic between components
20. **Higher-Order Components** - Component enhancement
21. **Controlled vs Uncontrolled** - Form control patterns
22. **Portal Pattern** - Rendering outside the DOM hierarchy

### Section 5: State Management (4 lessons)
23. **Context API Deep Dive** - Advanced context patterns
24. **Context Selectors** - Building useContextSelector from scratch
25. **State Machines** - Modeling UI state
26. **Global State Patterns** - State management without libraries

### Section 6: Accessibility & Production (4 lessons)
27. **ARIA Fundamentals** - Roles, states, and properties
28. **Keyboard Navigation** - Focus management and shortcuts
29. **Accessible Forms** - Validation and error handling
30. **Testing Accessibility** - Automated and manual testing

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start dev server (http://localhost:3000)

# Building
npm run build        # TypeScript check + production build
npm run preview      # Preview production build

# Testing
npm run test         # Run tests in watch mode
npm run test:ui      # Run tests with UI

# Linting
npm run lint         # Check code quality
```

## 🏗️ Project Structure

```
react-katas/
├── src/
│   ├── main.tsx                 # Application entry point
│   ├── App.tsx                  # Main app component
│   ├── index.css                # Design system & global styles
│   ├── router/
│   │   ├── Router.tsx           # Custom routing system
│   │   └── routes.ts            # Lesson route definitions
│   ├── components/
│   │   └── Navigation/
│   │       └── Sidebar.tsx      # Navigation sidebar
│   ├── lessons/
│   │   ├── 01-fundamentals/     # Fundamentals lessons
│   │   ├── 02-hooks/            # Hooks lessons
│   │   ├── 03-performance/      # Performance lessons
│   │   ├── 04-patterns/         # Advanced patterns
│   │   ├── 05-state/            # State management
│   │   └── 06-accessibility/    # Accessibility lessons
│   └── test/
│       └── setup.ts             # Test configuration
├── index.html                   # HTML entry point
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies and scripts
```

## 🎨 Design System

The tutorial uses a comprehensive design system with CSS custom properties:

- **Colors**: Primary (blue), Accent (purple), Semantic colors
- **Typography**: Inter font family, 8 size scales
- **Spacing**: 4px base unit, 12 scale levels
- **Dark Mode**: Automatic via `prefers-color-scheme`
- **Responsive**: Mobile-first approach

## 🧪 Testing

Each lesson includes testing examples using:

- **Vitest** - Fast, modern test runner
- **React Testing Library** - User-centric testing
- **@testing-library/jest-dom** - Custom matchers

```bash
# Run tests
npm run test

# Run tests with UI
# Run tests with UI
npm run test:ui
```

## 📊 Performance Analysis

We use **rollup-plugin-visualizer** to analyze the production bundle size.

1. Build the application:
   ```bash
   npm run build
   ```
2. Open the generated report:
   ```bash
   # On macOS
   open stats.html
   # On Linux
   xdg-open stats.html
   # On Windows
   start stats.html
   ```

This visual report helps identify large dependencies and assess the impact of code splitting strategies.

## 📖 Learning Path

### Beginner Track
Start with **Section 1: Fundamentals** and work through sequentially.

### Intermediate Track
If you know React basics, jump to **Section 3: Performance Optimization** to learn modern patterns.

### Advanced Track
Focus on **Section 4: Advanced Patterns** and **Section 5: State Management** for architectural patterns.

## 🎯 Modern React 19 Philosophy

This tutorial emphasizes **modern best practices**:

1. **Composition over Memoization** - Component composition is the primary performance optimization
2. **React Compiler** - Understanding automatic optimizations reduces manual memoization needs
3. **TypeScript** - Type safety improves developer experience and catches errors early
4. **Accessibility First** - Build components that work for everyone
5. **Testing** - Ensure components work as expected

## 🚢 Publishing to OSS

The public version of this project is hosted at [github.com/algorisys-oss/react-katas](https://github.com/algorisys-oss/react-katas).

A publish script strips internal files (listed in `.ossignore`) and pushes a clean snapshot:

```bash
# Dry run — shows what will be published, pushes nothing
./scripts/publish-oss.sh

# Actually push to the OSS remote
./scripts/publish-oss.sh --push
```

**What the script does:**

1. Creates a clean copy from `git archive HEAD`
2. Removes paths listed in `.ossignore` (e.g. `CLAUDE.md`, `history.md`, `scripts/`)
3. Patches `package.json` (removes `private` flag, keeps client scripts)
4. Commits the snapshot to `algorisys-oss/react-katas` main branch

**Configuration:**

| Variable | Default | Description |
|---|---|---|
| `OSS_REMOTE` | `git@github.com:algorisys-oss/react-katas.git` | SSH URL of the OSS repo |
| `OSS_BRANCH` | `main` | Branch to push to |
| `OSS_MESSAGE` | auto-generated | Custom commit message |

Override via environment: `OSS_BRANCH=release ./scripts/publish-oss.sh --push`

## 🤝 Contributing

This is a learning project. Feel free to:

- Add more lessons
- Improve existing examples
- Fix bugs or typos
- Enhance documentation

## 📝 License

ISC

## 🙏 Acknowledgments

Built with:
- [React 19](https://react.dev/) - The library for web and native user interfaces
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types
- [Vitest](https://vitest.dev/) - Next generation testing framework

---

**Happy Learning! 🚀**

*Master React 19 and build production-ready, performant, accessible UI components.*
