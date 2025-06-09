using JetBrains.Annotations;

namespace planora.Application.Interfaces.Mediator;

public interface ICommand;

public interface ICommand<[UsedImplicitly] TResponse>;
