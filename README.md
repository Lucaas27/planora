# Planora

[![Backend Build](https://img.shields.io/github/actions/workflow/status/Lucaas27/planora/backend-ci.yml?branch=main&label=Backend&logo=dotnet)](https://github.com/Lucaas27/planora/actions/workflows/backend-ci.yml)
[![Frontend Build](https://img.shields.io/github/actions/workflow/status/Lucaas27/planora/backend-ci.yml?branch=main&label=Frontend&logo=react)](https://github.com/Lucaas27/planora/actions/workflows/frontend-ci.yml)
[![Deployment](https://img.shields.io/github/actions/workflow/status/Lucaas27/planora/backend-ci.yml?branch=main&label=Deployment&logo=github)](https://github.com/Lucaas27/planora/actions/workflows/release-deploy.yml)
[![Backend Code Coverage](https://img.shields.io/badge/Code%20Coverage-Visit%20Report-blue?logo=dotnet)](https://lucaas27.github.io/planora/coverage/backend)
[![Frontend Code Coverage](https://img.shields.io/badge/Code%20Coverage-Visit%20Report-green?logo=react)](https://lucaas27.github.io/planora/coverage/frontend)
[![Docker Image (API)](https://img.shields.io/badge/Docker-API%20Image-blue?logo=docker)](https://github.com/Lucaas27/planora/pkgs/container/planora-api)
[![Docker Image (Frontend)](https://img.shields.io/badge/Docker-Frontend%20Image-blue?logo=docker)](https://github.com/Lucaas27/planora/pkgs/container/planora-frontend)

## Overview

This is a small POC to validate architecture and developer workflow. It explores three main ideas:

- A minimal, custom mediator implementation in `planora.Application` to serve as a replacement for libraries like MediatR.
- Automated release tooling with `semantic-release` to validate changelog generation and semantic versioning in CI.
- Centralized NuGet version management using a `Directory.Packages.props` file to pin shared package versions across projects.

## Technology Stack

- **.NET 9**: Backend API and services
- **Clean Architecture**: Domain-driven design with clear separation of concerns
- **Entity Framework Core**: SQLite provider configured currently
- **Docker**: Containerization for consistent deployment
- **GitHub Actions**: CI/CD pipeline with automated testing
- **Shouldly, NSubstitute & xUnit**: Test suite

## Getting Started

Run locally:

1. Backend (API):

```powershell
dotnet restore
dotnet build
dotnet run --project src/planora.API
```

The API by default serves HTTPS in Development and will attempt to apply EF migrations on startup. If you get an HTTPS developer certificate error, run:

```powershell
dotnet dev-certs https --trust
```

2. Frontend (client):

```powershell
cd client
npm install
npm run dev
```

Or from repository root using the npm scripts in `package.json`:

```powershell
npm run frontend:dev
```

3. Tests (application layer):

```powershell
dotnet test tests/planora.Application.Tests
```