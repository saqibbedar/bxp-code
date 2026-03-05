# Contributing to bxp-code

Thank you for your interest in contributing to **bxp-code**! Every contribution — whether it's a bug report, feature request, documentation improvement, or code change — helps make this project better for everyone.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [Reporting Issues](#reporting-issues)
- [Commit Conventions](#commit-conventions)
- [Style Guide](#style-guide)
- [License](#license)

## Code of Conduct

This project follows a [Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior by opening an issue.

## Getting Started

### Prerequisites

- **Node.js** >= 18.0.0
- A package manager: **npm**, **pnpm**, **yarn**, or **bun**
- **Git**

### Fork & Clone

1. [Fork](https://github.com/saqibbedar/bxp-code/fork) the repository on GitHub.
2. Clone your fork locally:

   ```bash
   git clone https://github.com/<your-username>/bxp-code.git
   cd bxp-code
   ```

3. Add the upstream remote:

   ```bash
   git remote add upstream https://github.com/saqibbedar/bxp-code.git
   ```

4. Create a new branch for your work:

   ```bash
   git checkout -b feat/my-feature
   ```

## Development Setup

Install dependencies:

```bash
npm install
```

Start the Vite dev server (landing page + interactive examples):

```bash
npm run dev
```

Start the VitePress documentation site:

```bash
npm run docs
```

## Project Structure

```
bxp-code/
├── src/
│   ├── lib/                  # Library source (published to npm)
│   │   ├── BxpCode.tsx       # Single code block component
│   │   ├── BxpCodeTabs.tsx   # Multi-tab code block component
│   │   ├── CodeContainer.tsx # Shared container with sticky headers
│   │   └── themes/           # Custom Shiki themes (bxp-dark, bxp-light)
│   ├── components/           # Landing page & examples (not published)
│   │   ├── ui/               # CoverPage, ExamplesPage
│   │   └── common/           # Header, Footer
│   ├── App.tsx               # Router setup
│   ├── main.tsx              # Entry point
│   └── index.ts              # Public API exports
├── docs/                     # VitePress documentation
│   ├── .vitepress/config.ts  # VitePress config
│   ├── guide/                # Guides (getting started, usage, themes, etc.)
│   ├── api/                  # API reference pages
│   └── blog/                 # Release blog posts
├── public/                   # Static assets
├── vite.config.ts            # Vite config (library mode)
├── tsconfig.json             # TypeScript config
└── package.json
```

### Key directories

| Directory         | Purpose                                                  |
| ----------------- | -------------------------------------------------------- |
| `src/lib/`        | Core library code — this is what gets published to npm   |
| `src/components/` | Landing page and interactive examples (development only) |
| `docs/`           | VitePress documentation site                             |

## Development Workflow

### Available Scripts

| Command                | Description                                           |
| ---------------------- | ----------------------------------------------------- |
| `npm run dev`          | Start Vite dev server for the landing page            |
| `npm run build`        | Type-check with `tsc` and build the library with Vite |
| `npm run lint`         | Run ESLint across the project                         |
| `npm run docs`         | Start VitePress dev server for documentation          |
| `npm run docs:build`   | Build the VitePress documentation site                |
| `npm run docs:preview` | Preview the built documentation site                  |

### Making Changes

1. **Library code** (`src/lib/`): Changes here affect the published package. Make sure to run `npm run build` to verify the build succeeds.
2. **Documentation** (`docs/`): Run `npm run docs` to preview changes locally.
3. **Landing page** (`src/components/`): Run `npm run dev` to see changes in the browser.

### Testing Your Changes

Before submitting a pull request, make sure:

```bash
# Type-check and build
npm run build

# Lint
npm run lint

# Build docs (catches VitePress build errors)
npm run docs:build
```

## Pull Request Process

1. **Update your branch** with the latest upstream changes:

   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Ensure all checks pass** — build, lint, and docs build should all succeed.

3. **Write a clear PR description** that explains:
   - What the change does
   - Why the change is needed
   - Any breaking changes or migration steps

4. **Keep PRs focused** — one feature or fix per PR. Smaller PRs are easier to review and merge.

5. **Update documentation** if your change affects the public API or user-facing behavior.

6. **Add screenshots** for UI changes to the landing page or examples.

## Reporting Issues

When [opening an issue](https://github.com/saqibbedar/bxp-code/issues/new), please include:

- **Description**: A clear and concise description of the problem or suggestion.
- **Steps to reproduce** (for bugs): Minimal steps to reproduce the behavior.
- **Expected behavior**: What you expected to happen.
- **Actual behavior**: What actually happened.
- **Environment**: Node.js version, browser, OS, and `bxp-code` version.
- **Code sample**: A minimal code snippet demonstrating the issue, if applicable.

## Commit Conventions

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]
```

### Types

| Type       | Description                                      |
| ---------- | ------------------------------------------------ |
| `feat`     | A new feature                                    |
| `fix`      | A bug fix                                        |
| `docs`     | Documentation changes                            |
| `style`    | Code style changes (formatting, no logic change) |
| `refactor` | Code refactoring (no feature or fix)             |
| `perf`     | Performance improvements                         |
| `test`     | Adding or updating tests                         |
| `chore`    | Build process, tooling, or dependency updates    |

### Examples

```
feat(tabs): add closable tabs support
fix(theme): correct dark theme background color
docs(api): add missing props to BxpCodeTabs reference
chore(deps): update shiki to v4.1.0
```

## Style Guide

- **TypeScript**: All source code is written in TypeScript. Use proper types — avoid `any`.
- **React**: Functional components with hooks. No class components.
- **Formatting**: Run `npm run lint` before committing. Follow the existing code style.
- **Naming**: Use `PascalCase` for components, `camelCase` for variables and functions, `UPPER_SNAKE_CASE` for constants.
- **Exports**: All public API exports go through `src/index.ts`.

## License

By contributing to bxp-code, you agree that your contributions will be licensed under the [MIT License](./LICENSE).

---

Thank you for contributing! If you have any questions, feel free to open an issue or start a discussion.
