using MediatR;
using Microsoft.Extensions.DependencyInjection;
using planora.Application.Behaviours.Logging;

namespace planora.Application.Extensions;

public static class ServiceCollectionExtensions
{
    public static void AddApplicationServices(this IServiceCollection services)
    {
        var applicationAssembly = typeof(ServiceCollectionExtensions).Assembly;

        services.AddMediatR(configuration =>
        {
            configuration.RegisterServicesFromAssembly(applicationAssembly);
            configuration.AddBehavior(typeof(IPipelineBehavior<,>), typeof(RequestResponseLoggingBehaviour<,>));
        });
    }
}