using System.Text.Json.Serialization;
using planora.Application.Common;
using planora.Application.Interfaces.Mediator;

namespace planora.Application.Features.Activities.Commands.Update;

public sealed record UpdateActivityRequest : ICommand<Result>
{
    [JsonIgnore]
    public Guid Id { get; init; }

    public string? Name { get; init; }
    public string? Description { get; init; }
    public DateTimeOffset? Date { get; init; }
    public string? Category { get; init; }
    public bool? IsActive { get; init; }
    public string? City { get; init; }
    public string? Location { get; init; }
    public double? Latitude { get; init; }
    public double? Longitude { get; init; }
}