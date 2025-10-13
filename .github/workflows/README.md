# GitHub Actions Workflows

This directory contains the CI/CD workflows for the Notably browser extension.

## Workflows

### 🔍 CI Workflow (`ci.yaml`)

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches

**Jobs:**

1. **Test & Lint**
   - Runs ESLint for code quality
   - Executes Jest test suite with coverage
   - Uploads coverage reports to Codecov (optional)

2. **Build Extensions**
   - Builds Chrome extension
   - Builds Firefox extension
   - Uploads both as artifacts (30-day retention)
   - Verifies build outputs

**Purpose:** Ensures code quality and buildability on every push and PR.

---

### 🚀 Release Workflow (`release.yaml`)

**Triggers:**
- Push to `main` branch only

**Jobs:**

1. **Create Release**
   - Runs full test suite
   - Runs linting
   - Builds both browser extensions
   - Creates ZIP files for distribution
   - Generates changelog using Conventional Commits
   - Creates GitHub release with:
     - Changelog
     - Chrome extension ZIP
     - Firefox extension ZIP
   - Uploads artifacts (90-day retention)

**Purpose:** Automates version releases when changes are merged to main.

---

## Commit Message Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/) for automatic changelog generation:

- `feat:` - New features (triggers minor version bump)
- `fix:` - Bug fixes (triggers patch version bump)
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks
- `perf:` - Performance improvements
- `ci:` - CI/CD changes

**Breaking Changes:** Add `BREAKING CHANGE:` in the commit body or `!` after type (triggers major version bump)

### Examples:

```bash
# New feature
feat: add search and filter functionality

# Bug fix
fix: resolve issue with note deletion

# Breaking change
feat!: redesign storage API

# Multiple changes
feat: add search bar
feat: implement keyboard shortcuts
docs: update README with new features
```

---

## Artifacts

### CI Workflow Artifacts
- **notably-chrome**: Chrome extension build (30 days)
- **notably-firefox**: Firefox extension build (30 days)

### Release Workflow Artifacts
- **notably-chrome-X.X.X**: Chrome extension for release (90 days)
- **notably-firefox-X.X.X**: Firefox extension for release (90 days)

---

## Setting Up

### Required Secrets

No additional secrets are required! The workflows use the default `GITHUB_TOKEN`.

### Optional: Codecov

To enable code coverage reporting:

1. Sign up at [codecov.io](https://codecov.io)
2. Add your repository
3. Add `CODECOV_TOKEN` secret to your repository settings

---

## Status Badges

Add these to your README.md:

```markdown
![CI](https://github.com/PMFrancisco/Notably/workflows/CI/badge.svg)
![Release](https://github.com/PMFrancisco/Notably/workflows/Release/badge.svg)
```

---

## Local Testing

Test the same checks that run in CI:

```bash
# Run linting
npm run lint

# Run tests with coverage
npm test -- --coverage

# Build both extensions
npm run build:cross-browser
```

