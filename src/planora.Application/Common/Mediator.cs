using planora.Application.Interfaces.Mediator;

namespace planora.Application.Common;

public class Mediator(IServiceProvider serviceProvider) : IMediator
{
    public async Task<TResponse> Query<TResponse>(
        IQuery<TResponse> query,
        CancellationToken cancellationToken
    )
    {
        var handlerType = typeof(IQueryHandler<,>).MakeGenericType(query.GetType(), typeof(TResponse));
        var handler = serviceProvider.GetService(handlerType);

        if (handler == null)
        {
            throw new InvalidOperationException($"No handler registered for {query.GetType().Name}");
        }

        var method = handlerType.GetMethod("Handle");

        if (method == null)
        {
            throw new InvalidOperationException($"No 'Handle' method found for {handlerType.Name}");
        }

        return await (Task<TResponse>)method.Invoke(handler, [query, cancellationToken])!;
    }

    public async Task Command(ICommand command, CancellationToken cancellationToken)
    {
        var handlerType = typeof(ICommandHandler<>).MakeGenericType(command.GetType());
        var handler = serviceProvider.GetService(handlerType);

        if (handler == null)
        {
            throw new InvalidOperationException($"No handler registered for {command.GetType().Name}");
        }

        var method = handlerType.GetMethod("Handle");

        if (method == null)
        {
            throw new InvalidOperationException($"No 'Handle' method found for {handlerType.Name}");
        }

        await (Task)method.Invoke(handler, [command, cancellationToken])!;
    }

    public async Task<TResponse> Command<TResponse>(
        ICommand<TResponse> command,
        CancellationToken cancellationToken
    )
    {
        var handlerType = typeof(ICommandHandler<,>).MakeGenericType(command.GetType(), typeof(TResponse));
        var handler = serviceProvider.GetService(handlerType);

        if (handler == null)
        {
            throw new InvalidOperationException($"No handler registered for {command.GetType().Name}");
        }

        var method = handlerType.GetMethod("Handle");

        if (method == null)
        {
            throw new InvalidOperationException($"No 'Handle' method found for {handlerType.Name}");
        }

        return await (Task<TResponse>)method.Invoke(handler, [command, cancellationToken])!;
    }
}