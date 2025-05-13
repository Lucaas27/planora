using Microsoft.EntityFrameworkCore;
using planora.Infrastructure.Persistence.Context;
using planora.Infrastructure.Persistence.Seeder;

namespace planora.API.Extensions;

public static class WebApplicationExtensions
{
    /// <summary>
    ///     Seeds the database with initial data and applies any pending migrations.
    /// </summary>
    /// <param name="app">The <see cref="WebApplication" /> instance.</param>
    /// <returns>A <see cref="Task" /> representing the asynchronous operation.</returns>
    public static async Task SeedDatabaseAsync(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var services = scope.ServiceProvider;

        try
        {
            // Apply Migrations
            var context = services.GetRequiredService<AppDbContext>();
            await context.Database.MigrateAsync();

            // Seed Data
            var seeder = services.GetRequiredService<IDbSeeder>();
            await seeder.SeedActivityDataAsync();
        }
        catch (Exception e)
        {
            var logger = services.GetRequiredService<ILogger<Program>>();
            logger.LogError(e, "An error occurred during migrations.");
        }
    }
}