using NSubstitute;
using NSubstitute.ExceptionExtensions;
using planora.Application.Features.Activities.Queries.GetAll;
using planora.Domain.Entities;
using planora.Domain.Repositories;
using Shouldly;

namespace planora.Application.Tests.Features.Activities.Queries.GetAll;

public class GetAllActivitiesHandlerTests
{
    private static readonly IRepository<Activity> _repository = Substitute.For<IRepository<Activity>>();
    private readonly GetAllActivitiesHandler _handler = new(_repository);

    [Fact]
    public async Task Handle_ReturnsSuccessResult_WhenActivitiesExist()
    {
        // Arrange
        var activities = new List<Activity>
        {
            new()
            {
                Id = Guid.NewGuid(),
                Name = "Activity1",
                Description = "Sample description",
                Date = DateTime.UtcNow,
                Category = "Sample category",
                City = "Sample city",
                Location = "Sample location"
            },
            new()
            {
                Id = Guid.NewGuid(),
                Name = "Activity2",
                Description = "Sample description",
                Date = DateTime.UtcNow,
                Category = "Sample category",
                City = "Sample city",
                Location = "Sample location"
            }
        };

        _repository.GetAllAsync(Arg.Any<CancellationToken>()).Returns(activities);

        var request = new GetAllActivitiesRequest();

        // Act
        var result = await _handler.Handle(request, CancellationToken.None);

        // Assert
        result.IsSuccess.ShouldBeTrue();
        result.Data.Count().ShouldBe(2);
        result.Data.ShouldContain(a => a.Name == "Activity1");
        result.Data.ShouldContain(a => a.Name == "Activity2");
    }

    [Fact]
    public async Task Handle_ReturnsEmptyResult_WhenNoActivitiesExist()
    {
        // Arrange
        _repository.GetAllAsync(Arg.Any<CancellationToken>()).Returns([]);

        var request = new GetAllActivitiesRequest();

        // Act
        var result = await _handler.Handle(request, CancellationToken.None);

        // Assert
        result.IsSuccess.ShouldBeTrue();
        result.Data.ShouldBeEmpty();
    }

    [Fact]
    public async Task Handle_ThrowsException_WhenRepositoryThrowsException()
    {
        // Arrange
        _repository.GetAllAsync(Arg.Any<CancellationToken>())
            .Throws(new InvalidOperationException("Database error"));

        var request = new GetAllActivitiesRequest();

        // Act & Assert
        await Should.ThrowAsync<InvalidOperationException>(() => _handler.Handle(request, CancellationToken.None));
    }
}
