using MediatR;
using planora.Domain.Entities;

namespace planora.Application.Features.Activities.Queries.GetAll;

public sealed record GetAllActivitiesRequest : IRequest<IEnumerable<Activity>>;