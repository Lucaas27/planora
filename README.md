# Planora

[![Build](https://github.com/Lucaas27/planora/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/Lucaas27/planora/actions/workflows/ci-cd.yml)
[![Code Coverage](https://img.shields.io/badge/Code%20Coverage-Visit%20Report-blue)](https://lucaas27.github.io/planora/coverage/)
[![Docker Image](https://img.shields.io/badge/Docker-Latest%20Image-blue?logo=docker)](https://github.com/Lucaas27/planora/pkgs/container/planora-api)

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

The project uses GitHub Actions for continuous integration and deployment:

- Automated builds and tests on push and pull requests
- Code coverage reporting
- Docker image publication to GitHub Container Registry
- Automated deployment to GitHub Pages for coverage reports
