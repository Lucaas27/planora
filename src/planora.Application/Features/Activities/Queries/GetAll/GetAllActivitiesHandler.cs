using planora.Application.Common.Mediator;
using planora.Application.Common.Responses;
using planora.Domain.Entities;
using planora.Domain.Repositories;

namespace planora.Application.Features.Activities.Queries.GetAll;

public sealed class GetAllActivitiesHandler(IRepository<Activity> repository)
    : IQueryHandler<GetAllActivitiesRequest, IEnumerable<GetAllActivitiesResponse>>
{
    public async Task<BaseResponse<IEnumerable<GetAllActivitiesResponse>>> Handle(
        GetAllActivitiesRequest request,
        CancellationToken cancellationToken
    )
    {
        var activities = await repository.GetAllAsync(cancellationToken);

        var response = activities.Select(activity => new GetAllActivitiesResponse
        {
            Id = activity.Id
            // Map other properties as needed
        });

        return BaseResponse<IEnumerable<GetAllActivitiesResponse>>.CreateSuccess(
            response,
            "Activities retrieved successfully"
        );
    }
}