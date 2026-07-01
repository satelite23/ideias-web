# CI/CD Configuration Guide

## GitHub Actions Workflows

Este projeto utiliza GitHub Actions para automação de testes, builds e deploy.

## Workflows Configurados

### 1. Backend CI/CD (`.github/workflows/backend.yml`)

**Triggers:**
- Push em `main` ou `develop`
- Pull Requests para `main` ou `develop`

**Jobs:**

#### Test Job
- ✅ Node.js 18
- ✅ PostgreSQL 15 (service container)
- ✅ ESLint (linter)
- ✅ Jest (unit tests)
- ✅ Codecov (coverage)

#### Build & Deploy Job (only on main)
- ✅ Docker image build
- ✅ Push to Docker Hub
- ✅ Requires: `DOCKER_USERNAME`, `DOCKER_PASSWORD`

### 2. Frontend CI/CD (`.github/workflows/frontend.yml`)

**Triggers:**
- Push em `main` ou `develop`
- Pull Requests para `main` ou `develop`

**Jobs:**

#### Test Job
- ✅ Node.js 18
- ✅ ESLint (linter)
- ✅ Jest + React Testing Library
- ✅ Next.js build
- ✅ Codecov (coverage)

#### Deploy Job (only on main)
- ✅ Deploy to Vercel
- ✅ Requires: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`

### 3. Mobile CI/CD (`.github/workflows/mobile.yml`)

**Triggers:**
- Push em `main` ou `develop`
- Pull Requests para `main` ou `develop`

**Jobs:**

#### Test Job
- ✅ Flutter 3.16.0
- ✅ Flutter tests
- ✅ APK build (release)
- ✅ Artifact upload
- ✅ Codecov (coverage)

### 4. Pull Request Checks (`.github/workflows/pr-checks.yml`)

**Triggers:**
- Pull Requests para `main` ou `develop`

**Checks:**
- ✅ Super Linter (all languages)
- ✅ Commit Lint (conventional commits)

## GitHub Secrets Required

### Backend
```
DOCKER_USERNAME       # Docker Hub username
DOCKER_PASSWORD       # Docker Hub password/token
```

### Frontend
```
VERCEL_TOKEN          # Vercel API token
VERCEL_ORG_ID         # Vercel organization ID
VERCEL_PROJECT_ID     # Vercel project ID
API_URL               # Backend API URL
STRIPE_PUBLISHABLE_KEY # Stripe public key
```

### Mobile
```
# Optional for Play Store deployment
PLAY_STORE_SERVICE_ACCOUNT_JSON
```

## Setup Instructions

### 1. Add Secrets to GitHub

Vá para: **Settings → Secrets and variables → Actions → New repository secret**

```bash
# Backend
GH_TOKEN=your_github_token
DOCKER_USERNAME=your_docker_username
DOCKER_PASSWORD=your_docker_password

# Frontend  
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id
API_URL=https://api.ideias.com
STRIPE_PUBLISHABLE_KEY=pk_...
```

### 2. Configure Branch Protection Rules

Vá para: **Settings → Branches → Add rule**

```
Branch pattern: main
✅ Require status checks to pass before merging
✅ Require code reviews before merging (1 reviewer)
✅ Dismiss stale pull request approvals when new commits are pushed
✅ Require branches to be up to date before merging
```

### 3. Configure Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Link project
vercel link

# Get token from Vercel dashboard
# Settings → Tokens → Create token
```

### 4. Configure Docker Hub

```bash
# Create personal access token
# Account Settings → Security → New Access Token

# Tag image correctly
docker tag ideias-backend:latest username/ideias-backend:latest
```

## Workflow Status Badges

Adicione ao seu README:

```markdown
[![Backend Tests](https://github.com/satelite23/ideias-web/actions/workflows/backend.yml/badge.svg)](https://github.com/satelite23/ideias-web/actions/workflows/backend.yml)
[![Frontend Tests](https://github.com/satelite23/ideias-web/actions/workflows/frontend.yml/badge.svg)](https://github.com/satelite23/ideias-web/actions/workflows/frontend.yml)
[![Mobile Tests](https://github.com/satelite23/ideias-mobile/actions/workflows/mobile.yml/badge.svg)](https://github.com/satelite23/ideias-mobile/actions/workflows/mobile.yml)
```

## Monitoring CI/CD

### GitHub Actions Dashboard

1. Vá para **Actions** no seu repositório
2. Veja status de todos os workflows
3. Clique em um workflow para detalhes
4. Veja logs e artifacts

### Codecov Integration

1. Authorize em: https://codecov.io
2. Selecione o repositório
3. Veja cobertura de testes
4. Configure badges no README

## Troubleshooting

### Build falhando

```bash
# Verifique logs no Actions
# 1. GitHub Actions → Workflow → Job → Step
# 2. Procure por erros
# 3. Verifique secrets estão configurados
```

### Testes falhando

```bash
# Rode localmente primeiro
npm test        # Backend/Frontend
flutter test    # Mobile

# Depois fix e commit
git add .
git commit -m "fix: resolve failing tests"
```

### Deploy não dispara

```bash
# Verifique:
# 1. Branch protection rules
# 2. Required status checks
# 3. Secrets configurados
# 4. Logs no Actions tab
```

## Best Practices

✅ **Use semantic versioning for tags**
```bash
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

✅ **Run tests locally before pushing**
```bash
npm test
flutter test
```

✅ **Write meaningful commit messages**
```
feat: add payment integration
fix: resolve auth token expiration
docs: update API documentation
```

✅ **Keep secrets secure**
- Never commit `.env` files
- Use GitHub Secrets, not comments
- Rotate tokens regularly

✅ **Monitor coverage trends**
- Review codecov reports
- Aim for 80%+ coverage
- Flag decreases in coverage

## Additional Resources

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Codecov](https://codecov.io)
- [Vercel Deployments](https://vercel.com/docs)
- [Docker Hub](https://hub.docker.com)
