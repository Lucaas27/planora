namespace planora.Domain.Entities;

public class Activity : BaseEntity
{
    public required string Name { get; init; }
    public required string Description { get; init; }
    public required DateTimeOffset Date { get; init; }
    public required string Category { get; init; }
    public bool IsActive { get; init; } = true;

    // Location
    public required string City { get; init; }
    public required string Location { get; init; }
    public double? Latitude { get; init; }
    public double? Longitude { get; init; }
}
