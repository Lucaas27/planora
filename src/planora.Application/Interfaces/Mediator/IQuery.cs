using JetBrains.Annotations;

namespace planora.Application.Interfaces.Mediator;

/// <summary>
///     Marker interface for commands that don't return data
/// </summary>
public interface IQuery<[UsedImplicitly] TResponse>;
