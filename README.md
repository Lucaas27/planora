# Planora

[![Backend Build](https://img.shields.io/github/actions/workflow/status/Lucaas27/planora/backend-ci.yml?branch=main&label=Backend&logo=dotnet)](https://github.com/Lucaas27/planora/actions/workflows/backend-ci.yml)
[![Frontend Build](https://img.shields.io/github/actions/workflow/status/Lucaas27/planora/backend-ci.yml?branch=main&label=Frontend&logo=react)](https://github.com/Lucaas27/planora/actions/workflows/frontend-ci.yml)
[![Deployment](https://img.shields.io/github/actions/workflow/status/Lucaas27/planora/backend-ci.yml?branch=main&label=Deployment&logo=github)](https://github.com/Lucaas27/planora/actions/workflows/release-deploy.yml)
[![Backend Code Coverage](https://img.shields.io/badge/Code%20Coverage-Visit%20Report-blue?logo=dotnet)](https://lucaas27.github.io/planora/coverage/backend)
[![Frontend Code Coverage](https://img.shields.io/badge/Code%20Coverage-Visit%20Report-green?logo=react)](https://lucaas27.github.io/planora/coverage/frontend)
[![Docker Image (API)](https://img.shields.io/badge/Docker-API%20Image-blue?logo=docker)](https://github.com/Lucaas27/planora/pkgs/container/planora-api)
[![Docker Image (Frontend)](https://img.shields.io/badge/Docker-Frontend%20Image-blue?logo=docker)](https://github.com/Lucaas27/planora/pkgs/container/planora-frontend)

## Overview

Planora is a modern event planning application built with .NET 9. It enables users to create, manage, and participate in
various activities and events with an intuitive interface and robust backend.

## Features

- Create and manage activities with detailed information
- Browse activities by category, location, and date
- User authentication and authorization
- Real-time updates for activity changes
- Responsive design for mobile and desktop

## Technology Stack

- **.NET 9**: Backend API and services
- **Clean Architecture**: Domain-driven design with clear separation of concerns
- **Entity Framework Core**: Data access and ORM
- **Docker**: Containerization for consistent deployment
- **GitHub Actions**: CI/CD pipeline with automated testing
- **Shouldly, NSubstitute & xUnit**: Comprehensive test suite

## Getting Started

### Pre Requisites

- .NET 9 SDK
- Docker (optional)

### Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Lucaas27/planora.git
   cd planora
   ```

2. Restore and build the solution:
   ```bash
   dotnet restore
   dotnet build
   ```

3. Run the application:
   ```bash
   dotnet run --project src/planora.API
   ```

## Project Structure

The solution follows Clean Architecture principles:

- **planora.Domain**: Core entities
- **planora.Application**: Use cases and business logic
- **planora.Infrastructure**: External concerns like data access
- **planora.API**: API endpoints and controllers
- **planora.*.Tests**: Corresponding test projects

## CI/CD Pipeline

The project uses GitHub Actions for continuous integration and deployment with separate workflows:

### Pull Request Workflows (Quality Gates)
- **Backend CI**: Automated .NET builds, tests, and code coverage on backend changes
- **Frontend CI**: Automated Node.js builds, tests, and linting on frontend changes
- **Security Analysis**: CodeQL security scanning and dependency vulnerability checks

### Main Branch Workflow (Deployment)
- **Release & Deploy**: Semantic versioning, Docker image builds, and automated deployment to production
- Publishes Docker images to GitHub Container Registry with proper tagging
- Deploys both backend and frontend services to Coolify hosting platform
