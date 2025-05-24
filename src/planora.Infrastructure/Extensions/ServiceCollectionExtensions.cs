using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using planora.Domain.Repositories;
using planora.Infrastructure.Persistence.Seeder;
using planora.Infrastructure.Repositories;

namespace planora.Infrastructure.Extensions;

/// <summary>
///     Provides extension methods for configuring infrastructure services in the application's DI container.
/// </summary>
public static class ServiceCollectionExtensions
{
    /// <summary>
    ///     Adds infrastructure-related services to the specified <see cref="IServiceCollection" />.
    /// </summary>
    /// <param name="services">The <see cref="IServiceCollection" /> to which the services will be added.</param>
    /// <param name="config">The <see cref="IConfiguration" /> instance used to retrieve configuration settings.</param>
    public static void AddInfrastructureServices(this IServiceCollection services, IConfiguration config)
    {
        services.ConfigureDbConnection(config);
        services.AddScoped<IDbSeeder, DbSeeder>();
        // Register repositories
        services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
    }
}