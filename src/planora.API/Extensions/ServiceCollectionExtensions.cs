using planora.API.Middleware;

namespace planora.API.Extensions;

/// <summary>
///     Provides extension methods for configuring services in the application's DI container.
/// </summary>
public static class ServiceCollectionExtensions
{
    /// <summary>
    ///     Adds presentation layer services to the application's service collection.
    /// </summary>
    /// <param name="services">The <see cref="IServiceCollection" /> to which the services will be added.</param>
    public static void AddPresentationServices(this IServiceCollection services)
    {
        services.AddControllers();
        services.AddOpenApi();
        services.AddCors();

        // Add global exception handler
        services.AddExceptionHandler<GlobalExceptionHandler>();
        services.AddProblemDetails();
    }
}