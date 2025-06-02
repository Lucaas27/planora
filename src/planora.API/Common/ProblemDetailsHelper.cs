using Microsoft.AspNetCore.Mvc;
using planora.Domain.Errors;

namespace planora.API.Common;

public static class ProblemDetailsHelper
{
    public static int GetStatusCode(ErrorType errorType)
    {
        return errorType switch
        {
            ErrorType.Validation => StatusCodes.Status400BadRequest,
            ErrorType.NotFound => StatusCodes.Status404NotFound,
            ErrorType.Conflict => StatusCodes.Status409Conflict,
            ErrorType.Unauthorized => StatusCodes.Status401Unauthorized,
            ErrorType.Forbidden => StatusCodes.Status403Forbidden,
            _ => StatusCodes.Status500InternalServerError
        };
    }

    public static string GetErrorTypeUrl(ErrorType errorType)
    {
        return errorType switch
        {
            ErrorType.Validation => "https://tools.ietf.org/html/rfc7231#section-6.5.1",
            ErrorType.NotFound => "https://tools.ietf.org/html/rfc7231#section-6.5.4",
            ErrorType.Conflict => "https://tools.ietf.org/html/rfc7231#section-6.5.8",
            ErrorType.Unauthorized => "https://tools.ietf.org/html/rfc7235#section-3.1",
            ErrorType.Forbidden => "https://tools.ietf.org/html/rfc7231#section-6.5.3",
            _ => "https://tools.ietf.org/html/rfc7231#section-6.6.1"
        };
    }

    public static ProblemDetails CreateProblemDetails(Error error)
    {
        return new ProblemDetails
        {
            Title = error.Type.ToString(),
            Type = GetErrorTypeUrl(error.Type),
            Status = GetStatusCode(error.Type),
            Extensions = new Dictionary<string, object?>
            {
                { "errors", new[] { error } }
            }
        };
    }

    public static ProblemDetailsContext CreateProblemDetailsContext(
        HttpContext httpContext,
        Error error,
        Exception? exception = null
    )
    {
        return new ProblemDetailsContext
        {
            HttpContext = httpContext,
            ProblemDetails = CreateProblemDetails(error),
            Exception = exception
        };
    }
}