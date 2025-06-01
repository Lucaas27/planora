// ReSharper disable MemberCanBePrivate.Global
// ReSharper disable UnusedAutoPropertyAccessor.Global

using planora.Domain.Errors;

namespace planora.Application.Common;

public class Result
{
    protected Result(bool isSuccess, Error? error)
    {
        if ((isSuccess && error is not null) ||
            (!isSuccess && error is null))
        {
            throw new ArgumentException("Invalid error", nameof(error));
        }

        IsSuccess = isSuccess;
        Error = error;
    }

    public bool IsSuccess { get; }
    public Error? Error { get; }

    public static Result Success()
    {
        return new Result(true, null);
    }

    public static Result<TValue> Success<TValue>(TValue value)
    {
        return new Result<TValue>(value, true, null);
    }


    public static Result Failure(Error error)
    {
        return new Result(false, error);
    }

    public static Result<TValue> Failure<TValue>(Error error)
    {
        return new Result<TValue>(default, false, error);
    }
}

public class Result<TValue>(TValue? data, bool isSuccess, Error? error) : Result(isSuccess, error)
{
    public TValue Data => IsSuccess
        ? data!
        : throw new InvalidOperationException("Cannot access the data of a failed result");


    // Implicit conversion from TValue to Result<TValue> (success)
    public static implicit operator Result<TValue>(TValue value)
    {
        return Success(value);
    }

    // Implicit conversion from Error to Result<TValue> (failure)
    public static implicit operator Result<TValue>(Error error)
    {
        return Failure<TValue>(error);
    }
}