using NSubstitute;
using planora.Application.Features.Activities.Commands.Update;
using planora.Domain.Entities;
using planora.Domain.Errors;
using planora.Domain.Repositories;
using Shouldly;

namespace planora.Application.Tests.Features.Activities.Commands.Update;

public class UpdateActivityHandlerTests
{
    private static readonly IRepository<Activity> _repository = Substitute.For<IRepository<Activity>>();
    private readonly UpdateActivityHandler _handler = new(_repository);

    [Fact]
    public async Task Handle_UpdatesActivitySuccessfully_WhenRequestIsValid()
    {
        var existingActivity = new Activity
        {
            Id = Guid.NewGuid(),
            Name = "Old Name",
            Description = "Old Description",
            Date = DateTime.UtcNow.AddDays(-5),
            Category = "Old Category",
            City = "Old City",
            Location = "Old Location"
        };

        _repository.GetByIdAsync(existingActivity.Id, Arg.Any<CancellationToken>())
            .Returns(existingActivity);

        var request = new UpdateActivityRequest
        {
            Id = existingActivity.Id,
            Name = "Updated Name",
            Description = "Updated Description",
            Date = DateTime.UtcNow.AddDays(5),
            Category = "Updated Category",
            City = "Updated City",
            Location = "Updated Location"
        };

        var result = await _handler.Handle(request, CancellationToken.None);

        result.IsSuccess.ShouldBeTrue();
        await _repository.Received(1).UpdateAsync(Arg.Is<Activity>(a =>
            a.Id == existingActivity.Id &&
            a.Name == request.Name &&
            a.Description == request.Description &&
            a.Date == request.Date &&
            a.Category == request.Category &&
            a.City == request.City &&
            a.Location == request.Location
        ), Arg.Any<CancellationToken>());
    }

    [Fact]
    public async Task Handle_ReturnsNotFoundError_WhenActivityDoesNotExist()
    {
        _repository.GetByIdAsync(Arg.Any<Guid>(), Arg.Any<CancellationToken>())
            .Returns((Activity?)null);

        var request = new UpdateActivityRequest
        {
            Id = Guid.NewGuid(),
            Name = "Updated Name",
            Description = "Updated Description",
            Date = DateTime.UtcNow.AddDays(5),
            Category = "Updated Category",
            City = "Updated City",
            Location = "Updated Location"
        };

        var result = await _handler.Handle(request, CancellationToken.None);

        result.IsSuccess.ShouldBeFalse();
        result.Error.ShouldBe(ActivityError.NotFound(request.Id));
    }
}
