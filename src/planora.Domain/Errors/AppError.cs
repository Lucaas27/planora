using System.Text.Json.Serialization;

namespace planora.Domain.Errors;

public record AppError
{
    private AppError(string code, string description, ErrorType type)
    {
        Code = code;
        Description = description;
        Type = type;
    }

    public string Code { get; }
    public string Description { get; }

    [JsonIgnore]
    public ErrorType Type { get; }

    public static AppError Unexpected(string code, string description)
    {
        return new AppError(code, description, ErrorType.Unexpected);
    }

    public static AppError Validation(string code, string description)
    {
        return new AppError(code, description, ErrorType.Validation);
    }

    public static AppError Conflict(string code, string description)
    {
        return new AppError(code, description, ErrorType.Conflict);
    }

    public static AppError NotFound(string code, string description)
    {
        return new AppError(code, description, ErrorType.NotFound);
    }
}