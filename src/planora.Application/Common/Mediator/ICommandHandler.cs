using planora.Application.Common.Responses;

namespace planora.Application.Common.Mediator;

/// <summary>
///     Interface for command handlers that don't return data, only success/failure
/// </summary>
public interface ICommandHandler<in TCommand>
    where TCommand : ICommand
{
    Task<BaseResponse> Handle(TCommand command, CancellationToken cancellationToken);
}

public interface ICommandHandler<in TCommand, TResponse>
    where TCommand : ICommand<TResponse>
{
    Task<BaseResponse<TResponse>> Handle(TCommand command, CancellationToken cancellationToken);
}