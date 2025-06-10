using planora.Application.Features.Activities.Commands.Create;
using Shouldly;

namespace planora.Application.Tests.Features.Activities.Commands.Create;

public class CreateActivityMapperTests
{
    [Fact]
    public void MapToActivityEntity_ReturnsCorrectEntity_WhenRequestIsValid()
    {
        var request = new CreateActivityRequest
        {
            Name = "Activity Name",
            Description = "Activity Description",
            Date = DateTime.UtcNow.AddDays(5),
            Category = "Category",
            City = "City",
            Location = "Location",
            Latitude = 12.3456,
            Longitude = 65.4321
        };

        var activity = request.MapToActivityEntity();

        activity.Name.ShouldBe(request.Name);
        activity.Description.ShouldBe(request.Description);
        activity.Date.ShouldBe(request.Date);
        activity.Category.ShouldBe(request.Category);
        activity.City.ShouldBe(request.City);
        activity.Location.ShouldBe(request.Location);
        activity.Latitude.ShouldBe(request.Latitude);
        activity.Longitude.ShouldBe(request.Longitude);
    }
}
