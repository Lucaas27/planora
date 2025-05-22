using planora.API.Extensions;
using planora.Infrastructure.Extensions;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;
var config = builder.Configuration;

// Add services to the container.
services.AddInfrastructureServices(config);
services.AddPresentationServices();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.SetUpCors();
app.MapControllers();
app.SetUpSwagger();

// Configure database (migrations and seeding) before running the application
await app.ApplyMigrationsAsync();
await app.SeedDevelopmentDataAsync();

await app.RunAsync();