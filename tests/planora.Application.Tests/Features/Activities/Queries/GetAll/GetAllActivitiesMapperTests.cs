using planora.Application.Features.Activities.Queries.GetAll;
using planora.Domain.Entities;
using Shouldly;

namespace planora.Application.Tests.Features.Activities.Queries.GetAll;

public class GetAllActivitiesMapperTests
{
    [Fact]
    public void MapToGetAllResponse_ReturnsCorrectResponse_WhenEntityIsValid()
    {
        var activity = new Activity
        {
            Id = Guid.NewGuid(),
            Name = "Activity1",
            Description = "Description1",
            Date = DateTime.UtcNow,
            City = "City1",
            Category = "Category1",
            IsActive = true,
            Location = "Location1"
        };

        var response = activity.MapToGetAllResponse();

        response.Id.ShouldBe(activity.Id);
        response.Name.ShouldBe(activity.Name);
        response.Description.ShouldBe(activity.Description);
        response.ActivityDate.ShouldBe(activity.Date);
        response.City.ShouldBe(activity.City);
        response.Category.ShouldBe(activity.Category);
        response.IsActive.ShouldBe(activity.IsActive);
    }

    [Fact]
    public void MapToGetAllResponse_ThrowsException_WhenEntityIsNull()
    {
        Activity activity = null!;

        Should.Throw<ArgumentNullException>(() =>
        {
            ArgumentNullException.ThrowIfNull(activity);
            activity.MapToGetAllResponse();
        });
    }
}
