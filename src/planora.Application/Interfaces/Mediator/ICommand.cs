using JetBrains.Annotations;

namespace planora.Application.Interfaces.Mediator;

public interface ICommand;

/// <summary>
///     Marker interface for commands that don't return data
/// </summary>
public interface ICommand<[UsedImplicitly] TResponse>;