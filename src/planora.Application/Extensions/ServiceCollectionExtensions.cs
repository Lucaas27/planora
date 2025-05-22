using Microsoft.Extensions.DependencyInjection;
using planora.Application.Common.Mediator;
using planora.Application.Features.Activities.Queries.GetAll;

namespace planora.Application.Extensions;

public static class ServiceCollectionExtensions
{
    public static void AddApplicationServices(this IServiceCollection services)
    {
        var applicationAssembly = typeof(ServiceCollectionExtensions).Assembly;

        services
            .AddScoped<IQueryHandler<GetAllActivitiesRequest, IEnumerable<GetAllActivitiesResponse>>,
                GetAllActivitiesHandler>();
    }
}