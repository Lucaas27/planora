using NSubstitute;
using planora.Application.Features.Activities.Commands.Create;
using planora.Domain.Entities;
using planora.Domain.Repositories;
using Shouldly;

namespace planora.Application.Tests.Features.Activities.Commands.Create;

public class CreateActivityHandlerTests
{
    private readonly CreateActivityHandler _handler;
    private readonly IRepository<Activity> _repository;

    public CreateActivityHandlerTests()
    {
        // Initialize a fresh repository for each test
        _repository = Substitute.For<IRepository<Activity>>();
        _handler = new CreateActivityHandler(_repository);
    }

    [Fact]
    public async Task Handle_CreatesActivitySuccessfully_WhenRequestIsValid()
    {
        var request = new CreateActivityRequest
        {
            Name = "New Activity",
            Description = "Activity Description",
            Date = DateTime.UtcNow.AddDays(5),
            Category = "Category",
            City = "City",
            Location = "Location"
        };

        var result = await _handler.Handle(request, CancellationToken.None);

        result.IsSuccess.ShouldBeTrue();
        await _repository.Received(1).AddAsync(Arg.Is<Activity>(a =>
            a.Name == request.Name &&
            a.Description == request.Description &&
            a.Date == request.Date &&
            a.Category == request.Category &&
            a.City == request.City &&
            a.Location == request.Location
        ), Arg.Any<CancellationToken>());
    }

    [Fact]
    public async Task Handle_ThrowsException_WhenRepositoryFails()
    {
        _repository.AddAsync(Arg.Any<Activity>(), Arg.Any<CancellationToken>())
#pragma warning disable CA2201
            .Returns(_ => throw new Exception("Database error"));
#pragma warning restore CA2201

        var request = new CreateActivityRequest
        {
            Name = "New Activity",
            Description = "Activity Description",
            Date = DateTime.UtcNow.AddDays(5),
            Category = "Category",
            City = "City",
            Location = "Location"
        };


        // Act and Assert
        await Should.ThrowAsync<Exception>(async () =>
            await _handler.Handle(request, CancellationToken.None));
    }
}
