using System.Net;

namespace planora.Application.Common.Responses;

/// <summary>
///     Base response class for all API responses
/// </summary>
public class BaseResponse
{
    /// <summary>
    ///     Indicates whether the request was successful
    /// </summary>
    public bool Success { get; protected init; }

    /// <summary>
    ///     Message providing additional information about the response
    /// </summary>
    public string Message { get; protected init; } = string.Empty;

    /// <summary>
    ///     HTTP status code of the response
    /// </summary>
    public HttpStatusCode StatusCode { get; protected init; }

    /// <summary>
    ///     Error details if the request failed
    /// </summary>
    public List<string>? Errors { get; protected init; }

    /// <summary>
    ///     Creates a successful response with default message
    /// </summary>
    public static BaseResponse CreateSuccess()
    {
        return new BaseResponse
        {
            Success = true,
            StatusCode = HttpStatusCode.OK,
            Message = "Request processed successfully"
        };
    }

    /// <summary>
    ///     Creates a successful response with custom message
    /// </summary>
    public static BaseResponse CreateSuccess(string message)
    {
        return new BaseResponse
        {
            Success = true,
            StatusCode = HttpStatusCode.OK,
            Message = message
        };
    }

    /// <summary>
    ///     Creates a failed response with error details
    /// </summary>
    public static BaseResponse CreateFailure(string message, HttpStatusCode statusCode = HttpStatusCode.BadRequest)
    {
        return new BaseResponse
        {
            Success = false,
            StatusCode = statusCode,
            Message = message
        };
    }

    /// <summary>
    ///     Creates a failed response with multiple error details
    /// </summary>
    public static BaseResponse CreateFailure(List<string> errors, HttpStatusCode statusCode = HttpStatusCode.BadRequest)
    {
        return new BaseResponse
        {
            Success = false,
            StatusCode = statusCode,
            Message = "One or more errors occurred",
            Errors = errors
        };
    }
}

/// <summary>
///     Generic response class that includes data payload
/// </summary>
public class BaseResponse<T> : BaseResponse
{
    /// <summary>
    ///     Data payload returned in the response
    /// </summary>
    public T? Data { get; protected init; }

    /// <summary>
    ///     Creates a successful response with data payload
    /// </summary>
    public static BaseResponse<T> CreateSuccess(T data)
    {
        return new BaseResponse<T>
        {
            Success = true,
            StatusCode = HttpStatusCode.OK,
            Message = "Request processed successfully",
            Data = data
        };
    }

    /// <summary>
    ///     Creates a successful response with data payload and custom message
    /// </summary>
    public static BaseResponse<T> CreateSuccess(T data, string message)
    {
        return new BaseResponse<T>
        {
            Success = true,
            StatusCode = HttpStatusCode.OK,
            Message = message,
            Data = data
        };
    }

    /// <summary>
    ///     Creates a failed response with error message and default data
    /// </summary>
    public new static BaseResponse<T> CreateFailure(
        string message,
        HttpStatusCode statusCode = HttpStatusCode.BadRequest
    )
    {
        return new BaseResponse<T>
        {
            Success = false,
            StatusCode = statusCode,
            Message = message,
            Data = default
        };
    }

    /// <summary>
    ///     Creates a failed response with multiple error details and default data
    /// </summary>
    public new static BaseResponse<T> CreateFailure(
        List<string> errors,
        HttpStatusCode statusCode = HttpStatusCode.BadRequest
    )
    {
        return new BaseResponse<T>
        {
            Success = false,
            StatusCode = statusCode,
            Message = "One or more errors occurred",
            Errors = errors,
            Data = default
        };
    }
}