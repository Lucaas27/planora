using Microsoft.AspNetCore.Mvc;
using planora.API.Common;
using planora.Application.Common;

namespace planora.API.Extensions;

public static class ResultExtensions
{
    private static IActionResult ToProblemDetails(this Result result)
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

    public static IActionResult MapToActionResult<TValue>(this Result<TValue> result)
    {
        return result.IsSuccess ? new OkObjectResult(result) : result.ToProblemDetails();
    }
}