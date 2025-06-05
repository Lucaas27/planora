namespace planora.Application.Interfaces.Mediator;

public interface IMediator
{
    Task<TResponse> Query<TResponse>(
        IQuery<TResponse> query,
        CancellationToken cancellationToken
    );

    Task Command(ICommand command, CancellationToken cancellationToken);

    Task<TResponse> Command<TResponse>(
        ICommand<TResponse> command,
        CancellationToken cancellationToken
    );
}
