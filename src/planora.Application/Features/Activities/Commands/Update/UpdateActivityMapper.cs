using planora.Domain.Entities;

namespace planora.Application.Features.Activities.Commands.Update;

public static class UpdateActivityMapper
{
    public static Activity MapToUpdatedEntity(this Activity existingActivity, UpdateActivityRequest request)
    {
        existingActivity.Name = request.Name ?? existingActivity.Name;
        existingActivity.Description = request.Description ?? existingActivity.Description;
        existingActivity.Date = request.Date ?? existingActivity.Date;
        existingActivity.Category = request.Category ?? existingActivity.Category;
        existingActivity.IsActive = request.IsActive ?? existingActivity.IsActive;
        existingActivity.City = request.City ?? existingActivity.City;
        existingActivity.Location = request.Location ?? existingActivity.Location;
        existingActivity.Latitude = request.Latitude ?? existingActivity.Latitude;
        existingActivity.Longitude = request.Longitude ?? existingActivity.Longitude;

        return existingActivity;
    }
}
