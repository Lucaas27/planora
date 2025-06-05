using planora.Domain.Entities;

namespace planora.Application.Features.Activities.Queries.GetDetails;

public static class GetActivityDetailsMapper
{
    public static GetActivityDetailsResponse MapToActivityDetailsResponse(this Activity entity)
    {
        return new GetActivityDetailsResponse
        {
            Id = entity.Id,
            Name = entity.Name,
            Description = entity.Description,
            CreatedAt = entity.CreatedDate,
            LastUpdated = entity.UpdatedAt,
            IsActive = entity.IsActive,
            ActivityDate = entity.Date,
            Category = entity.Category,
            City = entity.City,
            Location = entity.Location,
            Longitude = entity.Longitude,
            Latitude = entity.Latitude
        };
    }
}
