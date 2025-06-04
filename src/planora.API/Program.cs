using planora.API.Extensions;
using planora.Application.Extensions;
using planora.Infrastructure.Extensions;
using Serilog;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;
var config = builder.Configuration;

// Add services to the container.
services.AddInfrastructureServices(config);
services.AddApplicationServices();
services.AddPresentationServices();


//Set up serilog
builder.Host.UseSerilog((context, configuration) =>
    configuration.ReadFrom.Configuration(context.Configuration));

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseExceptionHandler();
app.SetUpCors(config);
app.UseSerilogRequestLogging();
app.MapControllers();
app.SetUpSwaggerUi();

// Configure database (migrations and seeding) before running the application
await app.ApplyMigrationsAsync();
await app.SeedDevelopmentDataAsync();

await app.RunAsync();