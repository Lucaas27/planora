using planora.Application.Common;
using planora.Application.Interfaces.Mediator;
using planora.Domain.Entities;
using planora.Domain.Repositories;

namespace planora.Application.Features.Activities.Queries.GetAll;

public sealed class GetAllActivitiesHandler(IRepository<Activity> repository)
    : IQueryHandler<GetAllActivitiesRequest, Result<IEnumerable<GetAllActivitiesResponse>>>
{
    public async Task<Result<IEnumerable<GetAllActivitiesResponse>>> Handle(
        GetAllActivitiesRequest request,
        CancellationToken cancellationToken
    )
    {
        var activities = await repository.GetAllAsync(cancellationToken);

        var response = activities.Select(activity => new GetAllActivitiesResponse
        {
            // Map properties temporarily
            Id = activity.Id
        });

        return Result.Success(response);
    }
}