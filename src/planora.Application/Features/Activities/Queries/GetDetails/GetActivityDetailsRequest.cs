using planora.Application.Common;
using planora.Application.Interfaces.Mediator;

namespace planora.Application.Features.Activities.Queries.GetDetails;

public sealed record GetActivityDetailsRequest(Guid Id) : IQuery<Result<GetActivityDetailsResponse>>;