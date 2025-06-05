using Microsoft.Extensions.DependencyInjection;

namespace planora.Application.Extensions;

public static class ServiceCollectionExtensions
{
    public static void AddApplicationServices(this IServiceCollection services)
    {
        var applicationAssembly = typeof(ServiceCollectionExtensions).Assembly;
        services.AddCustomMediator(applicationAssembly);
    }
}
