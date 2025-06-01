using Microsoft.AspNetCore.Mvc;
using planora.Application.Common;
using planora.Domain.Errors;

namespace planora.API.Extensions;

public static class ResultExtensions
{
    private static int GetStatusCode(ErrorType errorType)
    {
        return errorType switch
        {
            ErrorType.Validation => StatusCodes.Status400BadRequest,
            ErrorType.NotFound => StatusCodes.Status404NotFound,
            ErrorType.Conflict => StatusCodes.Status409Conflict,
            _ => StatusCodes.Status500InternalServerError
        };
    }

    private static string GetType(ErrorType errorType)
    {
        return errorType switch
        {
            ErrorType.Validation => "https://tools.ietf.org/html/rfc7231#section-6.5.1",
            ErrorType.NotFound => "https://tools.ietf.org/html/rfc7231#section-6.5.4",
            ErrorType.Conflict => "https://tools.ietf.org/html/rfc7231#section-6.5.8",
            _ => "https://tools.ietf.org/html/rfc7231#section-6.6.1"
        };
    }

    private static IActionResult ToProblemDetails(this Result result)
    {
        if (result.IsSuccess)
        {
            throw new InvalidOperationException();
        }

        return new ObjectResult(new ProblemDetails
        {
            Title = result.Error!.Type.ToString(),
            Type = GetType(result.Error!.Type),
            Status = GetStatusCode(result.Error.Type),
            Extensions = new Dictionary<string, object?>
            {
                { "errors", new[] { result.Error } }
            }
        });
    }

    public static IActionResult MapToActionResult(this Result result)
    {
        return result.IsSuccess ? new OkObjectResult(result) : result.ToProblemDetails();
    }
}