using Microsoft.AspNetCore.Mvc;
using planora.Domain.Errors;

namespace planora.API.Helpers;

static internal class ProblemDetailsHelper
{
    static internal int GetStatusCode(ErrorType errorType)
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

    private static string GetErrorTypeUrl(ErrorType errorType)
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

    // Used in the result pattern
    static internal ProblemDetails CreateProblemDetails(AppError appError)
    {
        return new ProblemDetails
        {
            Title = appError.Type.ToString(),
            Type = GetErrorTypeUrl(appError.Type),
            Status = GetStatusCode(appError.Type),
            Extensions = new Dictionary<string, object?>
            {
                { "errors", new[] { appError } }
            }
        };
    }

    // Used in the global exception handler to return a problem detail for unhandled errors
    static internal ProblemDetailsContext CreateProblemDetailsContext(
        HttpContext httpContext,
        AppError appError,
        Exception? exception = null
    )
    {
        return new ProblemDetailsContext
        {
            HttpContext = httpContext,
            ProblemDetails = CreateProblemDetails(appError),
            Exception = exception
        };
    }
}