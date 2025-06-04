using JetBrains.Annotations;

namespace planora.Application.Features.Activities.Queries.GetDetails;

public sealed record GetActivityDetailsResponse
{
    public Guid Id { [UsedImplicitly] get; init; }
    public required string Name { [UsedImplicitly] get; init; }
    public required string Description { [UsedImplicitly] get; init; }
    public DateTimeOffset ActivityDate { [UsedImplicitly] get; init; }
    public required string Category { [UsedImplicitly] get; init; }
    public bool IsActive { [UsedImplicitly] get; init; }
    public DateTimeOffset? LastUpdated { [UsedImplicitly] get; init; }
    public DateTimeOffset CreatedAt { [UsedImplicitly] get; init; }

    // Location
    public required string City { [UsedImplicitly] get; init; }
    public required string Location { [UsedImplicitly] get; init; }
    public double? Latitude { [UsedImplicitly] get; init; }
    public double? Longitude { [UsedImplicitly] get; init; }
}