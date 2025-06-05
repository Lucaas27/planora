using planora.Application.Common;
using planora.Application.Interfaces.Mediator;
using planora.Domain.Entities;
using planora.Domain.Errors;
using planora.Domain.Repositories;

namespace planora.Application.Features.Activities.Queries.GetDetails;

public class GetActivityDetailsHandler(IRepository<Activity> repository)
    : IQueryHandler<GetActivityDetailsRequest, Result<GetActivityDetailsResponse>>
{
    public async Task<Result<GetActivityDetailsResponse>> Handle(
        GetActivityDetailsRequest query,
        CancellationToken cancellationToken
    )
    {
        var activityId = query.Id;
        var activity = await repository.GetByIdAsync(activityId, cancellationToken);

        if (activity is null)
        {
            return ActivityError.NotFound(activityId);
        }

        var result = activity.MapToActivityDetailsResponse();

        return result;
    }
}
