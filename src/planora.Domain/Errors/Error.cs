using System.Text.Json.Serialization;

namespace planora.Domain.Errors;

public record Error
{
    private Error(string code, string description, ErrorType type)
    {
        Code = code;
        Description = description;
        Type = type;
    }

    public string Code { get; }
    public string Description { get; }

    [JsonIgnore]
    public ErrorType Type { get; }

    public static Error Failure(string code, string description)
    {
        return new Error(code, description, ErrorType.Failure);
    }

    public static Error Unexpected(string code, string description)
    {
        return new Error(code, description, ErrorType.Unexpected);
    }

    public static Error Validation(string code, string description)
    {
        return new Error(code, description, ErrorType.Validation);
    }

    public static Error Conflict(string code, string description)
    {
        return new Error(code, description, ErrorType.Conflict);
    }

    public static Error NotFound(string code, string description)
    {
        return new Error(code, description, ErrorType.NotFound);
    }
}