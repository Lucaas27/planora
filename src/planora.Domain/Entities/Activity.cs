namespace planora.Domain.Entities;

public class Activity : BaseEntity
{
    public required string Name { get; set; }
    public required string Description { get; set; }
    public required DateTimeOffset Date { get; set; }
    public required string Category { get; set; }
    public bool IsActive { get; set; } = true;

    public required string City { get; set; }
    public required string Location { get; set; }
    public double? Latitude { get; set; }
    public double? Longitude { get; set; }
}
