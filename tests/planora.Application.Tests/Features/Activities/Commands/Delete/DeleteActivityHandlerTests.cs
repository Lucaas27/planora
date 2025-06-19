using NSubstitute;
using planora.Application.Features.Activities.Commands.Delete;
using planora.Domain.Entities;
using planora.Domain.Errors;
using planora.Domain.Repositories;
using Shouldly;

namespace planora.Application.Tests.Features.Activities.Commands.Delete;

public class DeleteActivityHandlerTests
{
    private static readonly IRepository<Activity> _repository = Substitute.For<IRepository<Activity>>();

    private readonly DeleteActivityHandler
        _handler = new(_repository);

    // Test to ensure the handler deletes an existing activity successfully
    [Fact]
    public async Task Handle_DeletesActivitySuccessfully_WhenActivityExists()
    {
        // Arrange
        var existingActivity = new Activity
        {
            Id = Guid.NewGuid(),
            Name = "Name",
            Description = "Description",
            Date = DateTime.UtcNow.AddDays(-5),
            Category = "Category",
            City = "City",
            Location = "Location"
        };

        _repository
            .GetByIdAsync(existingActivity.Id, Arg.Any<CancellationToken>())
            .Returns(existingActivity);

        // Act
        var result = await _handler.Handle(
            new DeleteActivityRequest { Id = existingActivity.Id },
            CancellationToken.None);

        // Assert
        result.IsSuccess.ShouldBeTrue();
        result.Error.ShouldBeNull();
        await _repository.Received(1).DeleteAsync(existingActivity, Arg.Any<CancellationToken>());
    }

    // Test to ensure the handler returns an error when the activity does not exist
    [Fact]
    public async Task Handle_ReturnsNotFound_WhenActivityDoesNotExist()
    {
        // Arrange
        var nonExistentActivityId = Guid.NewGuid();

        _repository
            .GetByIdAsync(nonExistentActivityId, Arg.Any<CancellationToken>())
            .Returns((Activity?)null);

        // Act
        var result = await _handler.Handle(
            new DeleteActivityRequest { Id = nonExistentActivityId },
            CancellationToken.None);

        // Assert
        result.IsSuccess.ShouldBeFalse();
        result.Error.ShouldBe(ActivityError.NotFound(nonExistentActivityId));
        await _repository.DidNotReceive().DeleteAsync(Arg.Any<Activity>(), Arg.Any<CancellationToken>());
    }

    // Test to ensure the handler returns an error when trying to delete a past activity
    [Fact]
    public async Task Handle_ReturnsCannotDeletePastActivity_WhenActivityIsInThePast()
    {
        // Arrange
        var pastActivity = new Activity
        {
            Id = Guid.NewGuid(),
            Name = "Name",
            Description = "Description",
            Date = DateTime.UtcNow.AddDays(-10), // Past date
            Category = "Category",
            City = "City",
            Location = "Location"
        };

        _repository
            .GetByIdAsync(pastActivity.Id, Arg.Any<CancellationToken>())
            .Returns(pastActivity);

        // Act
        var result = await _handler.Handle(
            new DeleteActivityRequest { Id = pastActivity.Id },
            CancellationToken.None);

        // Assert
        result.IsSuccess.ShouldBeFalse();
        result.Error.ShouldBe(ActivityError.CannotDeletePastActivity(pastActivity.Id));
        await _repository.DidNotReceive().DeleteAsync(Arg.Any<Activity>(), Arg.Any<CancellationToken>());
    }


    // Test to ensure the handler throws an exception when the repository fails during deletion
    [Fact]
    public async Task Handle_ThrowsException_WhenRepositoryFails()
    {
        // Arrange
        var existingActivity = new Activity
        {
            Id = Guid.NewGuid(),
            Name = "Name",
            Description = "Description",
            Date = DateTime.UtcNow.AddDays(-5),
            Category = "Category",
            City = "City",
            Location = "Location"
        };

        _repository
            .GetByIdAsync(existingActivity.Id, Arg.Any<CancellationToken>())
            .Returns(existingActivity);

        // Act
        _repository
            .DeleteAsync(existingActivity, Arg.Any<CancellationToken>())
            .Returns(_ => throw new InvalidOperationException("Repository fails"));

        // Assert
        await Should.ThrowAsync<InvalidOperationException>(() =>
            _handler.Handle(new DeleteActivityRequest { Id = existingActivity.Id }, CancellationToken.None));

        await _repository.Received(1).DeleteAsync(existingActivity, Arg.Any<CancellationToken>());
    }
}
