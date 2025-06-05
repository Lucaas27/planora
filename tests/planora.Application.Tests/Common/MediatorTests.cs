using NSubstitute;
using planora.Application.Common;
using planora.Application.Interfaces.Mediator;
using Shouldly;

namespace planora.Application.Tests.Common;

public class MediatorTests
{
    private const string ExpectedResponse = "ExpectedResponse";

    [Fact]
    public async Task Query_ReturnsExpectedResponse_WhenHandlerIsRegistered()
    {
        // Arrange
        var serviceProvider = Substitute.For<IServiceProvider>();
        var query = Substitute.For<IQuery<string>>();
        var handler = Substitute.For<IQueryHandler<IQuery<string>, string>>();
        handler.Handle(query, Arg.Any<CancellationToken>()).Returns(ExpectedResponse);
        handler.Handle(query, Arg.Any<CancellationToken>()).Returns(ExpectedResponse);
        serviceProvider.GetService(Arg.Any<Type>()).Returns(handler);

        var mediator = new Mediator(serviceProvider);

        // Act
        var result = await mediator.Query(query, CancellationToken.None);

        result.ShouldBe(ExpectedResponse);
        result.ShouldBe(ExpectedResponse);
    }

    [Fact]
    public async Task Query_ThrowsInvalidOperationException_WhenHandlerIsNotRegistered()
    {
        // Arrange
        var serviceProvider = Substitute.For<IServiceProvider>();
        var query = Substitute.For<IQuery<string>>();
        serviceProvider.GetService(Arg.Any<Type>()).Returns(null);

        var mediator = new Mediator(serviceProvider);

        // Act & Assert
        await Should.ThrowAsync<InvalidOperationException>(async () =>
            await mediator.Query(query, CancellationToken.None));
    }

    [Fact]
    public async Task Command_ExecutesSuccessfully_WhenHandlerIsRegistered()
    {
        // Arrange
        var serviceProvider = Substitute.For<IServiceProvider>();
        var command = Substitute.For<ICommand>();
        var handler = Substitute.For<ICommandHandler<ICommand>>();

        handler.Handle(command, Arg.Any<CancellationToken>()).Returns(Task.CompletedTask);
        serviceProvider.GetService(Arg.Any<Type>()).Returns(handler);

        var mediator = new Mediator(serviceProvider);

        // Act
        await mediator.Command(command, CancellationToken.None);

        // Assert
        await handler.Received(1).Handle(command, Arg.Any<CancellationToken>());
    }

    [Fact]
    public async Task Command_ThrowsInvalidOperationException_WhenHandlerIsNotRegistered()
    {
        // Arrange
        var serviceProvider = Substitute.For<IServiceProvider>();
        var command = Substitute.For<ICommand>();
        serviceProvider.GetService(Arg.Any<Type>()).Returns(null);

        var mediator = new Mediator(serviceProvider);

        // Act & Assert
        await Should.ThrowAsync<InvalidOperationException>(async () =>
            await mediator.Command(command, CancellationToken.None));
    }

    [Fact]
    public async Task CommandWithResponse_ReturnsExpectedResponse_WhenHandlerIsRegistered()
    {
        // Arrange
        var serviceProvider = Substitute.For<IServiceProvider>();
        var command = Substitute.For<ICommand<string>>();
        var handler = Substitute.For<ICommandHandler<ICommand<string>, string>>();
        handler.Handle(command, Arg.Any<CancellationToken>()).Returns(ExpectedResponse);
        handler.Handle(command, Arg.Any<CancellationToken>()).Returns(ExpectedResponse);
        serviceProvider.GetService(Arg.Any<Type>()).Returns(handler);

        var mediator = new Mediator(serviceProvider);

        // Act
        var result = await mediator.Command(command, CancellationToken.None);

        // Assert
        result.ShouldBe(ExpectedResponse);
    }

    [Fact]
    public async Task CommandWithResponse_ThrowsInvalidOperationException_WhenHandlerIsNotRegistered()
    {
        // Arrange
        var serviceProvider = Substitute.For<IServiceProvider>();
        var command = Substitute.For<ICommand<string>>();
        serviceProvider.GetService(Arg.Any<Type>()).Returns(null);

        var mediator = new Mediator(serviceProvider);

        // Act & Assert
        await Should.ThrowAsync<InvalidOperationException>(async () =>
            await mediator.Command(command, CancellationToken.None));
    }
}
