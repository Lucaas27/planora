// ReSharper disable MemberCanBePrivate.Global
// ReSharper disable UnusedAutoPropertyAccessor.Global

using planora.Domain.Errors;

namespace planora.Application.Common;

public class Result
{
    protected Result(bool isSuccess, AppError? error)
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
    public AppError? Error { get; }

    public static Result Success()
    {
        return new Result(true, null);
    }

    public static Result<TValue> Success<TValue>(TValue value)
    {
        return new Result<TValue>(value, true, null);
    }


    public static Result Failure(AppError appError)
    {
        return new Result(false, appError);
    }

    public static Result<TValue> Failure<TValue>(AppError appError)
    {
        return new Result<TValue>(default, false, appError);
    }

    // Implicit conversion from AppError to Result (failure)
    public static implicit operator Result(AppError appError)
    {
        return Failure(appError);
    }
}

public class Result<TValue>(TValue? data, bool isSuccess, AppError? error) : Result(isSuccess, error)
{
    public TValue Data
    {
        get
        {
            if (!IsSuccess)
            {
                throw new InvalidOperationException("Cannot access the data of a failed result");
            }

            return data!;
        }
    }


    // Implicit conversion from TValue to Result<TValue> (success)
    public static implicit operator Result<TValue>(TValue value)
    {
        return Success(value);
    }

    // Implicit conversion from AppError to Result<TValue> (failure)
    public static implicit operator Result<TValue>(AppError appError)
    {
        return Failure<TValue>(appError);
    }
}
