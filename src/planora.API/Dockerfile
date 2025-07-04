﻿FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["Directory.Build.props", "."]
COPY ["Directory.Packages.props", "."]
COPY ["src/planora.API/planora.API.csproj", "src/planora.API/"]
COPY ["src/planora.Domain/planora.Domain.csproj", "src/planora.Domain/"]
COPY ["src/planora.Application/planora.Application.csproj", "src/planora.Application/"]
COPY ["src/planora.Infrastructure/planora.Infrastructure.csproj", "src/planora.Infrastructure/"]
RUN dotnet restore "src/planora.API/planora.API.csproj"
COPY . .
WORKDIR "/src/src/planora.API"
RUN dotnet build "./planora.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./planora.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENV ASPNETCORE_URLS=http://0.0.0.0:8080
ENTRYPOINT ["dotnet", "planora.API.dll"]
