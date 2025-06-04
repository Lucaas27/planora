using JetBrains.Annotations;

namespace planora.Application.Features.Activities.Queries.GetAll;

public sealed record GetAllActivitiesResponse
{
    public Guid Id { [UsedImplicitly] get; init; }
    public required string Name { [UsedImplicitly] get; init; }
    public required string Description { [UsedImplicitly] get; init; }
    public DateTimeOffset ActivityDate { [UsedImplicitly] get; init; }
    public required string Category { [UsedImplicitly] get; init; }
    public bool IsActive { [UsedImplicitly] get; init; }
    public required string City { [UsedImplicitly] get; init; }
}