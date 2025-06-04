using planora.Domain.Entities;

namespace planora.Application.Features.Activities.Commands.Create;

public static class CreateActivityMapper
{
    public static Activity MapToActivityEntity(this CreateActivityRequest request)
    {
        return new Activity
        {
            Name = request.Name,
            Description = request.Description,
            Date = request.Date,
            Category = request.Category,
            City = request.City,
            Location = request.Location,
            Latitude = request.Latitude,
            Longitude = request.Longitude
        };
    }
}