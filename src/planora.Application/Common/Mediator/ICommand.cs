namespace planora.Application.Common.Mediator;

/// <summary>
///     Marker interface for commands that don't return data
/// </summary>
public interface ICommand;

public interface ICommand<TResponse>;