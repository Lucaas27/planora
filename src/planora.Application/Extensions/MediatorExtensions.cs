using System.Reflection;
using Microsoft.Extensions.DependencyInjection;
using planora.Application.Common;
using planora.Application.Interfaces;
using planora.Application.Interfaces.Mediator;

namespace planora.Application.Extensions;

public static class MediatorExtensions
{
    public static void AddCustomMediator(this IServiceCollection services, Assembly assembly)
    {
        // Register mediator
        services.AddScoped<IMediator, Mediator>();

        // Register all query handlers
        RegisterQueryHandlers(services, assembly);

        // Register all command handlers
        RegisterCommandHandlers(services, assembly);
    }


    private static void RegisterQueryHandlers(IServiceCollection services, Assembly assembly)
    {
        var handlerTypes = assembly.GetTypes()
            .Where(t => t.GetInterfaces().Any(IsQueryHandlerInterface))
            .Where(t => t is { IsClass: true, IsAbstract: false });

        foreach (var handlerType in handlerTypes)
        {
            var interfaces = handlerType.GetInterfaces()
                .Where(IsQueryHandlerInterface)
                .ToList();

            foreach (var interfaceType in interfaces)
            {
                services.AddScoped(interfaceType, handlerType);
            }
        }
    }


    private static bool IsQueryHandlerInterface(Type type)
    {
        if (!type.IsGenericType)
        {
            return false;
        }

        var typeDefinition = type.GetGenericTypeDefinition();
        return typeDefinition == typeof(IQueryHandler<,>);
    }


    private static void RegisterCommandHandlers(IServiceCollection services, Assembly assembly)
    {
        var handlerTypes = assembly.GetTypes()
            .Where(t => t.GetInterfaces().Any(IsCommandHandlerInterface))
            .Where(t => t is { IsClass: true, IsAbstract: false });

        foreach (var handlerType in handlerTypes)
        {
            var interfaces = handlerType.GetInterfaces()
                .Where(IsCommandHandlerInterface)
                .ToList();

            foreach (var interfaceType in interfaces)
            {
                services.AddScoped(interfaceType, handlerType);
            }
        }
    }

    private static bool IsCommandHandlerInterface(Type type)
    {
        if (!type.IsGenericType)
        {
            return false;
        }

        var typeDefinition = type.GetGenericTypeDefinition();
        return typeDefinition == typeof(ICommandHandler<>);
    }
}