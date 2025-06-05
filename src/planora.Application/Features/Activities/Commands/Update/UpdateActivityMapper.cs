using planora.Domain.Entities;

namespace planora.Application.Features.Activities.Commands.Update;

public static class UpdateActivityMapper
{
    public static Activity MapToUpdatedEntity(this Activity existingActivity, UpdateActivityRequest request)
    {
        var updatedActivity = new Activity
        {
            Id = existingActivity.Id,
            Name = request.Name ?? existingActivity.Name,
            Description = request.Description ?? existingActivity.Description,
            Date = request.Date ?? existingActivity.Date,
            Category = request.Category ?? existingActivity.Category,
            IsActive = request.IsActive ?? existingActivity.IsActive,

            // Location properties
            City = request.City ?? existingActivity.City,
            Location = request.Location ?? existingActivity.Location,
            Latitude = request.Latitude ?? existingActivity.Latitude,
            Longitude = request.Longitude ?? existingActivity.Longitude
        };

        return updatedActivity;
    }
}
