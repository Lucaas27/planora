// ReSharper disable MemberCanBePrivate.Global

using planora.Domain.Errors;

namespace planora.Application.Common;

public class Result<T>
{
    private Result(T data)
    {
        Error = null;
        Data = data;
    }

    private Result(BaseError error)
    {
        Error = error;
        Data = default;
    }

    public bool IsSuccess => Error == null;
    public BaseError? Error { get; }
    public T? Data { get; }

    public static Result<T> Success(T data)
    {
        return new Result<T>(data);
    }

    public static Result<T> Failure(BaseError error)
    {
        return new Result<T>(error);
    }

    public TResult Map<TResult>(Func<T, TResult> onSuccess, Func<BaseError, TResult> onFailure)
    {
        return IsSuccess
            ? onSuccess(Data!)
            : onFailure(Error!);
    }
}

public static class Result
{
    public static Result<T> Success<T>(T data)
    {
        return Result<T>.Success(data);
    }

    public static Result<T> Failure<T>(BaseError error)
    {
        return Result<T>.Failure(error);
    }
}