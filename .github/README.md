# Release & Deployment Guide

This guide covers how releases and deployments work for **bxp-code**. Both are automated via GitHub Actions and triggered by file changes — no manual workflow runs needed.

## Overview

| Workflow       | Trigger File              | What It Does                                                | Creates Git Tag? |
| -------------- | ------------------------- | ----------------------------------------------------------- | ---------------- |
| **Release**    | `.github/release-info.md` | Creates a GitHub Release with tag, title, and release notes | Yes (`v1.0.0`)   |
| **Deployment** | `.github/deploy-info.md`  | Builds and deploys docs + playground to GitHub Pages        | No               |

Both workflows trigger automatically when their respective file is pushed to `main`.

---

## Release

### When to use

When you're publishing a new version of the library to npm and want a corresponding GitHub Release with release notes and a git tag.

### Steps

1. Update `.github/release-info.md` with the new version, title, and description:

   ```md
   # Current Release

   version: 1.1.0

   ## Title

   bxp-code v1.1.0

   ## Description

   ...release notes here...
   ```

2. Commit and push to `main`:

   ```bash
   git add .github/release-info.md
   git commit -m "chore(release): v1.1.0"
   git push
   ```

3. The workflow automatically:
   - Reads the version from `release-info.md`
   - Deletes any existing tag/release with that version (safe re-runs)
   - Creates a git tag `v1.1.0`
   - Creates a GitHub Release titled `bxp-code v1.1.0` with the file contents as the body

### Result

- A new git tag `v1.1.0` appears on the repo
- A new GitHub Release appears under **Releases** with full release notes

---

## Deployment

### When to use

When you've updated docs, playground, or any site content and want to redeploy to GitHub Pages — without cutting a new library release.

### Steps

1. Update the version in `.github/deploy-info.md` and add the previous version to the history:

   ```md
   # Current Deployment

   version: 1.0.1

   ---

   ## Deployment History

   - 1.0.1
   - 1.0.0
   ```

2. Commit and push to `main`:

   ```bash
   git add .github/deploy-info.md
   git commit -m "chore(deploy): v1.0.1"
   git push
   ```

3. The workflow automatically:
   - Builds the VitePress docs (`docs/.vitepress/dist`)
   - Builds the playground (`dist-playground`) with the correct base path
   - Assembles both into a single Pages artifact (docs at root, playground at `/playground`)
   - Deploys to GitHub Pages

### Result

- Docs live at: `https://saqibbedar.github.io/bxp-code/`
- Playground live at: `https://saqibbedar.github.io/bxp-code/playground/`
- Deployment history is tracked in `deploy-info.md`

### Deployment versioning

Deployment versions are independent of library versions. Use any incrementing scheme (e.g., `1.0.0`, `1.0.1`, `1.0.2`). The version only needs to change to trigger a new deployment — the number itself is just for your own tracking.

---

## File Structure

```
.github/
├── release-info.md          # Release version + notes (triggers release workflow)
├── deploy-info.md           # Deployment version + history (triggers deploy workflow)
└── workflows/
    ├── release.yml           # Creates GitHub Release + git tag
    └── deploy.yml            # Builds & deploys docs + playground to Pages
```

---

## Quick Reference

### New library release

```bash
# Edit .github/release-info.md with new version + notes
git add .github/release-info.md
git commit -m "chore(release): v1.1.0"
git push
```

### Redeploy site (docs/playground fix)

```bash
# Bump version in .github/deploy-info.md, add old version to history
git add .github/deploy-info.md
git commit -m "chore(deploy): v1.0.1"
git push
```
