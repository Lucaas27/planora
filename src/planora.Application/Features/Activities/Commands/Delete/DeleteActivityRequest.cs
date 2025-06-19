using System.Text.Json.Serialization;
using planora.Application.Common;
using planora.Application.Interfaces.Mediator;

namespace planora.Application.Features.Activities.Commands.Delete;

public sealed record DeleteActivityRequest : ICommand<Result>
{
    [JsonIgnore]
    public required Guid Id { get; init; }
}
