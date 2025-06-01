namespace planora.Application.Features.Activities.Queries.GetDetails;

public sealed record GetActivityDetailsResponse
{
    public Guid Id { get; init; }
    public required string Name { get; init; }
    public required string Description { get; init; }
    public DateTimeOffset ActivityDate { get; init; }
    public required string Category { get; init; }
    public bool IsActive { get; init; }
    public DateTimeOffset? LastUpdated { get; init; }
    public DateTimeOffset CreatedAt { get; init; }

    // Location
    public required string City { get; init; }
    public required string Location { get; init; }
    public double Latitude { get; init; }
    public double Longitude { get; init; }
}