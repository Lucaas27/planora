using planora.Application.Common.Mediator;

namespace planora.Application.Features.Activities.Queries.GetAll;

public sealed record GetAllActivitiesRequest : IQuery<IEnumerable<GetAllActivitiesResponse>>;