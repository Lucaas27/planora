using planora.Application.Common;
using planora.Application.Interfaces.Mediator;

namespace planora.Application.Features.Activities.Commands.Create;

public sealed record CreateActivityRequest : ICommand<Result<CreateActivityResponse>>
{
    public required string Name { get; init; }
    public required string Description { get; init; }
    public required DateTimeOffset Date { get; init; }
    public required string Category { get; init; }

    // Location
    public required string City { get; init; }
    public required string Location { get; init; }
    public double? Latitude { get; init; }
    public double? Longitude { get; init; }
}
