namespace planora.Application.Features.Activities.Queries.GetAll;

public sealed record GetAllActivitiesResponse
{
    public Guid Id { get; init; }
    public required string Name { get; init; }
    public required string Description { get; init; }
    public DateTimeOffset ActivityDate { get; init; }
    public required string Category { get; init; }
    public bool IsActive { get; init; }
    public required string City { get; init; }
}