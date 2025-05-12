using planora.Domain.Common;

namespace planora.Domain.Entities;

public class Activity : BaseEntity
{
    public required string Name { get; set; }
    public required string Description { get; set; }
    public DateTimeOffset Date { get; set; }
    public required string Category { get; set; }
    public bool IsActive { get; set; }
    
    // Location
    public required string City { get; set; }
    public required string Location { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    
}