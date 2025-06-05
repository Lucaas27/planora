using Microsoft.AspNetCore.Diagnostics;
using planora.API.Common;
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
                ? $"{exception.Message}"
                : "An unexpected error occurred. Please try again later.");

        var problemDetailsContext = ProblemDetailsHelper.CreateProblemDetailsContext(
            httpContext,
            error,
            exception);

        // Let the problem details service handle the response
        return await problemDetailsService.TryWriteAsync(problemDetailsContext);
    }
}
