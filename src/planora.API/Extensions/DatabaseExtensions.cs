using Microsoft.EntityFrameworkCore;
using planora.Infrastructure.Persistence.Context;
using planora.Infrastructure.Persistence.Seeder;

namespace planora.API.Extensions;

/// <summary>
///     Provides extension methods for database configuration and management.
/// </summary>
static internal class DatabaseExtensions
{
    /// <summary>
    ///     Applies database migrations for all environments.
    /// </summary>
    /// <param name="app">The <see cref="WebApplication" /> instance.</param>
    /// <returns>A <see cref="Task" /> representing the asynchronous operation.</returns>
    static internal async Task ApplyMigrationsAsync(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var services = scope.ServiceProvider;

        try
        {
            var context = services.GetRequiredService<AppDbContext>();
            await context.Database.MigrateAsync();
        }
        catch (Exception e)
        {
            var logger = services.GetRequiredService<ILogger<Program>>();
            logger.LogError(e, "An error occurred during database migration.");
        }
    }

    /// <summary>
    ///     Seeds development database if in development environment.
    /// </summary>
    /// <param name="app">The <see cref="WebApplication" /> instance.</param>
    /// <returns>A <see cref="Task" /> representing the asynchronous operation.</returns>
    static internal async Task SeedDevelopmentDataAsync(this WebApplication app)
    {
        if (!app.Environment.IsDevelopment())
        {
            return;
        }

        using var scope = app.Services.CreateScope();
        var services = scope.ServiceProvider;

        try
        {
            var seeder = services.GetRequiredService<IDbSeeder>();
            await seeder.SeedActivityDataAsync();
        }
        catch (Exception e)
        {
            var logger = services.GetRequiredService<ILogger<Program>>();
            logger.LogError(e, "An error occurred during data seeding.");
        }
    }
}