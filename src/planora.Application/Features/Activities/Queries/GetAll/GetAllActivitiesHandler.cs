using MediatR;
using planora.Domain.Entities;
using planora.Domain.Repositories;

namespace planora.Application.Features.Activities.Queries.GetAll;

public sealed class
    GetAllActivitiesHandler(IRepository<Activity> repository)
    : IRequestHandler<GetAllActivitiesRequest, IEnumerable<Activity>>
{
    public async Task<IEnumerable<Activity>> Handle(
        GetAllActivitiesRequest request,
        CancellationToken cancellationToken
    )
    {
        return await repository.GetAllAsync(cancellationToken);
    }
}