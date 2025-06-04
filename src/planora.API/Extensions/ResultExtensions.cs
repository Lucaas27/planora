using Microsoft.AspNetCore.Mvc;
using planora.API.Helpers;
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

    static internal ObjectResult MapToActionResult<TValue>(this Result<TValue> result)
    {
        return result.IsSuccess ? new OkObjectResult(result) : result.ToProblemDetails();
    }

    static internal ObjectResult MapToActionResult<TValue>(this Result<TValue> result, int statusCode)
    {
        if (!result.IsSuccess)
        {
            return result.ToProblemDetails();
        }

        return new ObjectResult(result)
        {
            StatusCode = statusCode
        };
    }
}