using planora.Application.Features.Activities.Queries.GetDetails;
using planora.Domain.Entities;
using Shouldly;

namespace planora.Application.Tests.Features.Activities.Queries.GetDetails;

public class GetActivityDetailsMapperTests
{
    [Fact]
    public void MapToActivityDetailsResponse_ReturnsCorrectResponse_WhenEntityIsValid()
    {
        var activity = new Activity
        {
            Id = Guid.NewGuid(),
            Name = "Test Activity",
            Description = "Test Description",
            CreatedDate = DateTime.UtcNow.AddDays(-10),
            UpdatedAt = DateTime.UtcNow,
            IsActive = true,
            Date = DateTime.UtcNow.AddDays(5),
            Category = "Test Category",
            City = "Test City",
            Location = "Test Location",
            Longitude = 12.3456,
            Latitude = 65.4321
        };

        var response = activity.MapToActivityDetailsResponse();

        response.Id.ShouldBe(activity.Id);
        response.Name.ShouldBe(activity.Name);
        response.Description.ShouldBe(activity.Description);
        response.CreatedAt.ShouldBe(activity.CreatedDate);
        response.LastUpdated.ShouldBe(activity.UpdatedAt);
        response.IsActive.ShouldBe(activity.IsActive);
        response.ActivityDate.ShouldBe(activity.Date);
        response.Category.ShouldBe(activity.Category);
        response.City.ShouldBe(activity.City);
        response.Location.ShouldBe(activity.Location);
        response.Longitude.ShouldBe(activity.Longitude);
        response.Latitude.ShouldBe(activity.Latitude);
    }
}
