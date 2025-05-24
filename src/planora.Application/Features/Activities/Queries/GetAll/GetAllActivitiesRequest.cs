using planora.Application.Common;
using planora.Application.Interfaces.Mediator;

namespace planora.Application.Features.Activities.Queries.GetAll;

public sealed record GetAllActivitiesRequest : IQuery<Result<IEnumerable<GetAllActivitiesResponse>>>;