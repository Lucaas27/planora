namespace planora.Application.Interfaces.Mediator;

/// <summary>
///     Interface for command handlers that don't return data, only success/failure
/// </summary>
public interface ICommandHandler<in TCommand>
    where TCommand : ICommand
{
    Task Handle(TCommand command, CancellationToken cancellationToken);
}

public interface ICommandHandler<in TCommand, TResponse>
    where TCommand : ICommand<TResponse>
{
    Task<TResponse> Handle(TCommand request, CancellationToken cancellationToken);
}