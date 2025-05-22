using System.Text.Json;
using MediatR;
using Microsoft.Extensions.Logging;

namespace planora.Application.Behaviours.Logging;

public class RequestResponseLoggingBehaviour<TRequest, TResponse>(
    ILogger<RequestResponseLoggingBehaviour<TRequest, TResponse>> logger
)
    : IPipelineBehavior<TRequest, TResponse> where TRequest : class
{
    public async Task<TResponse> Handle(
        TRequest request,
        RequestHandlerDelegate<TResponse> next,
        CancellationToken cancellationToken
    )
    {
        var correlationId = Guid.NewGuid();

        // Request Logging
        // Serialize the request
        var requestJson = JsonSerializer.Serialize(request);

        // Log the serialized request
        logger.LogInformation("Handling request {CorrelationID}: {Request}",
            correlationId, requestJson);

        // Response logging
        var response = await next(cancellationToken);

        // Serialize the response
        var responseJson = JsonSerializer.Serialize(response);

        // Log the serialized response
        logger.LogInformation("Response for {CorrelationID}: {Response}",
            correlationId, responseJson);

        // Return response
        return response;
    }
}