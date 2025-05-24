using planora.Domain.Entities;

namespace planora.Application.Features.Activities.Queries.GetAll;

public static class GetAllActivitiesMapper
{
    public static GetAllActivitiesResponse MapToDto(this Activity entity)
    {
        return new GetAllActivitiesResponse
        {
            Id = entity.Id,
            Name = entity.Name,
            Description = entity.Description,
            Location = entity.Location,
            ActivityDate = entity.Date,
            Category = entity.Category,
            IsActive = entity.IsActive,
            City = entity.City,
            Coordinates = entity is not { Latitude: 0 } && entity is not { Longitude: 0 }
                ? $"({entity.Latitude:F6}),({entity.Longitude:F6})"
                : null
        };
    }
}