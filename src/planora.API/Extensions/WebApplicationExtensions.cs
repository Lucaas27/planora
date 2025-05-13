using Microsoft.EntityFrameworkCore;
using planora.Infrastructure.Persistence.Context;
using planora.Infrastructure.Persistence.Seeder;

namespace planora.API.Extensions;

public static class WebApplicationExtensions
{
    /// <summary>
    ///     Configures the database by applying migrations and optionally seeding data.
    /// </summary>
    /// <param name="app">The <see cref="WebApplication" /> instance.</param>
    /// <returns>A <see cref="Task" /> representing the asynchronous operation.</returns>
    public static async Task ConfigureDatabaseAsync(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var services = scope.ServiceProvider;

        try
        {
            // Apply migrations for all environments
            var context = services.GetRequiredService<AppDbContext>();
            await context.Database.MigrateAsync();

            // Seed data only in development environment
            if (app.Environment.IsDevelopment())
            {
                var seeder = services.GetRequiredService<IDbSeeder>();
                await seeder.SeedActivityDataAsync();
            }
        }
        catch (Exception e)
        {
            var logger = services.GetRequiredService<ILogger<Program>>();
            logger.LogError(e, "An error occurred during database configuration.");
        }
    }

    /// <summary>
    ///     Configures middleware that is only available in development environment.
    /// </summary>
    /// <param name="app">The <see cref="WebApplication" /> instance.</param>
    public static void ConfigureDevelopmentMiddleware(this WebApplication app)
    {
        if (!app.Environment.IsDevelopment())
        {
            return;
        }

        app.MapOpenApi();
        app.UseSwaggerUI(options => { options.SwaggerEndpoint("/openapi/v1.json", "Open API V1"); });
    }
}