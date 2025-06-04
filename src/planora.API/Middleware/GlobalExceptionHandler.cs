using Microsoft.AspNetCore.Diagnostics;
using planora.API.Helpers;
using planora.Domain.Errors;

namespace planora.API.Middleware;

public class GlobalExceptionHandler(
    ILogger<GlobalExceptionHandler> logger,
    IWebHostEnvironment env,
    IProblemDetailsService problemDetailsService
)
    : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(
        HttpContext httpContext,
        Exception exception,
        CancellationToken cancellationToken
    )
    {
        logger.LogError(exception, "An unhandled exception occurred: {ExceptionMessage}", exception.Message);

        var error = AppError.Unexpected(
            "server.error",
            env.IsDevelopment()
                ? $"An unexpected error occurred: {exception.Message}"
                : "An unexpected error occurred. Please try again later.");

        // Get the appropriate status code (will be 500 for unexpected errors)
        var statusCode = ProblemDetailsHelper.GetStatusCode(error.Type);

        // Explicitly set the status code on the response
        httpContext.Response.StatusCode = statusCode;

        var problemDetailsContext = ProblemDetailsHelper.CreateProblemDetailsContext(
            httpContext,
            error,
            exception);

        // Let the problem details service handle the response
        return await problemDetailsService.TryWriteAsync(problemDetailsContext);
    }
}