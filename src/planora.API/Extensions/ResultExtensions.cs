using Microsoft.AspNetCore.Mvc;
using planora.API.Common;
using planora.Application.Common;

namespace planora.API.Extensions;

static internal class ResultExtensions
{
    private static ObjectResult ToProblemDetails(this Result result)
    {
        if (result.IsSuccess)
        {
            throw new InvalidOperationException("Cannot convert successful result to problem details");
        }

        var problemDetails = ProblemDetailsHelper.CreateProblemDetails(result.Error!);
        return new ObjectResult(problemDetails)
        {
            StatusCode = problemDetails.Status
        };
    }


    static internal IActionResult MapToActionResult<TValue>(
        this Result<TValue> result,
        int statusCode = StatusCodes.Status200OK
    )
    {
        if (!result.IsSuccess)
        {
            return result.ToProblemDetails();
        }

        return statusCode switch
        {
            StatusCodes.Status200OK => new OkObjectResult(result),
            _ => new ObjectResult(result) { StatusCode = statusCode }
        };
    }

    static internal IActionResult MapToActionResult(this Result result, int statusCode)
    {
        if (!result.IsSuccess)
        {
            return result.ToProblemDetails();
        }

        return statusCode switch
        {
            StatusCodes.Status204NoContent => new NoContentResult(),
            _ => new ObjectResult(result) { StatusCode = statusCode }
        };
    }
}
