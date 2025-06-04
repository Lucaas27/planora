using Microsoft.OpenApi.Models;
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
        services.AddCors();
        services.AddOpenApiConfig();
        // Add global exception handler
        services.AddExceptionHandler<GlobalExceptionHandler>();
        services.AddProblemDetails();
    }

    private static void AddOpenApiConfig(this IServiceCollection services)
    {
        services.AddOpenApi(options =>
        {
            options.AddDocumentTransformer((document, _, _) =>
            {
                document.Info.Title = "Planora .NET 9 API";
                document.Info.Description =
                    "Planora API provides endpoints for managing events, schedules, and resources to help users plan and organize their activities efficiently.";
                document.Info.Contact = new OpenApiContact
                {
                    Name = "Lucas Gomes",
                    Url = new Uri("https://github.com/Lucaas27")
                };
                document.Info.License = new OpenApiLicense
                {
                    Name = "MIT License",
                    Url = new Uri("https://opensource.org/licenses/MIT")
                };
                return Task.CompletedTask;
            });
        });
    }
}