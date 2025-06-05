using JetBrains.Annotations;
using planora.Application.Common;
using planora.Application.Interfaces.Mediator;

namespace planora.Application.Features.Activities.Commands.Create;

public sealed record CreateActivityRequest : ICommand<Result<CreateActivityResponse>>
{
    public required string Name { get; [UsedImplicitly] init; }
    public required string Description { get; [UsedImplicitly] init; }
    public required DateTimeOffset Date { get; [UsedImplicitly] init; }
    public required string Category { get; [UsedImplicitly] init; }

    // Location
    public required string City { get; [UsedImplicitly] init; }
    public required string Location { get; [UsedImplicitly] init; }
    public double? Latitude { get; [UsedImplicitly] init; }
    public double? Longitude { get; [UsedImplicitly] init; }
}
