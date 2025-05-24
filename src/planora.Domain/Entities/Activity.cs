namespace planora.Domain.Entities;

public class Activity : BaseEntity
{
    public required string Name { get; init; }
    public required string Description { get; init; }
    public DateTimeOffset Date { get; init; }
    public required string Category { get; init; }
    public bool IsActive { get; init; }

    // Location
    public required string City { get; init; }
    public required string Location { get; init; }
    public double Latitude { get; init; }
    public double Longitude { get; init; }
}