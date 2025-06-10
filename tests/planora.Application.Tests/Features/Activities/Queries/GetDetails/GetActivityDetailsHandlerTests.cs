using NSubstitute;
using planora.Application.Features.Activities.Queries.GetDetails;
using planora.Domain.Entities;
using planora.Domain.Errors;
using planora.Domain.Repositories;
using Shouldly;

namespace planora.Application.Tests.Features.Activities.Queries.GetDetails;

public class GetActivityDetailsHandlerTests
{
    private static readonly IRepository<Activity> _repository = Substitute.For<IRepository<Activity>>();
    private readonly GetActivityDetailsHandler _handler = new(_repository);

    [Fact]
    public async Task Handle_ReturnsNotFound_WhenActivityDoesNotExist()
    {
        // Arrange
        _repository.GetByIdAsync(Arg.Any<Guid>(), Arg.Any<CancellationToken>())
            .Returns((Activity?)null);

        var query = new GetActivityDetailsRequest(Guid.NewGuid());

        // Act
        var result = await _handler.Handle(query, CancellationToken.None);

        // Assert
        result.IsSuccess.ShouldBeFalse();
        result.Error.ShouldBe(ActivityError.NotFound(query.Id));
    }

    [Fact]
    public async Task Handle_ReturnsActivityDetails_WhenActivityExists()
    {
        // Arrange
        var activity = new Activity
        {
            Id = Guid.NewGuid(),
            Name = "Test Activity",
            Description = "Test Description",
            Date = DateTime.UtcNow,
            Category = "Test Category",
            City = "Test City",
            Location = "Test Location"
        };

        _repository.GetByIdAsync(activity.Id, Arg.Any<CancellationToken>())
            .Returns(activity);

        var query = new GetActivityDetailsRequest(activity.Id);
        // Act
        var result = await _handler.Handle(query, CancellationToken.None);

        // Assert
        result.IsSuccess.ShouldBeTrue();
        result.Data.ShouldBe(activity.MapToActivityDetailsResponse());
    }
}
