using planora.Application.Features.Activities.Commands.Update;
using planora.Domain.Entities;
using Shouldly;

namespace planora.Application.Tests.Features.Activities.Commands.Update;

public class UpdateActivityMapperTests
{
    [Fact]
    public void MapToUpdatedEntity_UpdatesAllFields_WhenRequestHasAllValues()
    {
        var existingActivity = new Activity
        {
            Name = "Old Name",
            Description = "Old Description",
            Date = DateTime.UtcNow.AddDays(-5),
            Category = "Old Category",
            IsActive = true,
            City = "Old City",
            Location = "Old Location",
            Latitude = 12.3456,
            Longitude = 65.4321
        };

        var request = new UpdateActivityRequest
        {
            Name = "New Name",
            Description = "New Description",
            Date = DateTime.UtcNow.AddDays(5),
            Category = "New Category",
            IsActive = false,
            City = "New City",
            Location = "New Location",
            Latitude = 98.7654,
            Longitude = 43.2100
        };

        var updatedActivity = existingActivity.MapToUpdatedEntity(request);

        updatedActivity.Name.ShouldBe(request.Name);
        updatedActivity.Description.ShouldBe(request.Description);
        updatedActivity.Category.ShouldBe(request.Category);
        updatedActivity.Date.ShouldBe(request.Date!.Value);
        updatedActivity.IsActive.ShouldBe(request.IsActive!.Value);
        updatedActivity.City.ShouldBe(request.City);
        updatedActivity.Location.ShouldBe(request.Location);
        updatedActivity.Latitude.ShouldBe(request.Latitude);
        updatedActivity.Longitude.ShouldBe(request.Longitude);
    }

    [Fact]
    public void MapToUpdatedEntity_RetainsExistingValues_WhenRequestHasNullValues()
    {
        var existingActivity = new Activity
        {
            Name = "Old Name",
            Description = "Old Description",
            Date = DateTime.UtcNow.AddDays(-5),
            Category = "Old Category",
            IsActive = true,
            City = "Old City",
            Location = "Old Location",
            Latitude = 12.3456,
            Longitude = 65.4321
        };

        var request = new UpdateActivityRequest
        {
            Name = null,
            Description = null,
            Date = null,
            Category = null,
            IsActive = null,
            City = null,
            Location = null,
            Latitude = null,
            Longitude = null
        };

        var updatedActivity = existingActivity.MapToUpdatedEntity(request);

        updatedActivity.Name.ShouldBe(existingActivity.Name);
        updatedActivity.Description.ShouldBe(existingActivity.Description);
        updatedActivity.Date.ShouldBe(existingActivity.Date);
        updatedActivity.Category.ShouldBe(existingActivity.Category);
        updatedActivity.IsActive.ShouldBe(existingActivity.IsActive);
        updatedActivity.City.ShouldBe(existingActivity.City);
        updatedActivity.Location.ShouldBe(existingActivity.Location);
        updatedActivity.Latitude.ShouldBe(existingActivity.Latitude);
        updatedActivity.Longitude.ShouldBe(existingActivity.Longitude);
    }

    [Fact]
    public void MapToUpdatedEntity_PreservesId_WhenMappingToUpdatedEntity()
    {
        var activityId = Guid.NewGuid();
        var existingActivity = new Activity
        {
            Id = activityId,
            Name = "Old Name",
            Description = "Old Description",
            Date = DateTime.UtcNow.AddDays(-5),
            Category = "Old Category",
            IsActive = true,
            City = "Old City",
            Location = "Old Location",
            Latitude = 12.3456,
            Longitude = 65.4321
        };

        var request = new UpdateActivityRequest { Name = "New Name" };

        var updatedActivity = existingActivity.MapToUpdatedEntity(request);

        updatedActivity.Id.ShouldBe(activityId);
    }


    [Fact]
    public void MapToUpdatedEntity_PartiallyUpdatesFields_WhenSomeValuesProvided()
    {
        var existingActivity = new Activity
        {
            Name = "Old Name",
            Description = "Old Description",
            Date = DateTime.UtcNow.AddDays(-5),
            Category = "Old Category",
            IsActive = true,
            City = "Old City",
            Location = "Old Location",
            Latitude = 12.3456,
            Longitude = 65.4321
        };

        var request = new UpdateActivityRequest
        {
            Name = "New Name",
            Description = null,
            Date = DateTime.UtcNow.AddDays(5),
            Category = null,
            IsActive = null,
            City = "New City",
            Location = null,
            Latitude = null,
            Longitude = 43.2100
        };

        var updatedActivity = existingActivity.MapToUpdatedEntity(request);

        updatedActivity.Name.ShouldBe(request.Name);
        updatedActivity.Description.ShouldBe(existingActivity.Description);
        updatedActivity.Date.ShouldBe(request.Date!.Value);
        updatedActivity.Category.ShouldBe(existingActivity.Category);
        updatedActivity.IsActive.ShouldBe(existingActivity.IsActive);
        updatedActivity.City.ShouldBe(request.City);
        updatedActivity.Location.ShouldBe(existingActivity.Location);
        updatedActivity.Latitude.ShouldBe(existingActivity.Latitude);
        updatedActivity.Longitude.ShouldBe(request.Longitude);
    }
}
