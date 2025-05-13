using planora.API.Extensions;
using planora.Infrastructure.Extensions;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;
var config = builder.Configuration;

// Add services to the container.
services.AddControllers();
services.AddOpenApi();
services.AddInfrastructureServices(config);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwaggerUI(options => { options.SwaggerEndpoint("/openapi/v1.json", "Open API V1"); });
}

app.MapControllers();

// Seed the database in development and run migrations before running the application
await app.SeedDatabaseAndRunMigrationsAsync();

await app.RunAsync();