using planora.Application.Common;
using planora.Domain.Errors;
using Shouldly;

namespace planora.Application.Tests.Common;

public class ResultTests
{
    [Fact]
    public void Success_ReturnsResultWithIsSuccessTrueAndNoError()
    {
        var result = Result.Success();

        result.IsSuccess.ShouldBeTrue();
        result.Error.ShouldBeNull();
    }

    [Fact]
    public void Success_WithValue_ReturnsResultWithIsSuccessTrueAndCorrectData()
    {
        const string Value = "TestValue";
        var result = Result.Success(Value);

        result.IsSuccess.ShouldBeTrue();
        result.Error.ShouldBeNull();
        result.Data.ShouldBe(Value);
    }

    [Fact]
    public void Failure_ReturnsResultWithIsSuccessFalseAndCorrectError()
    {
        var error = AppError.Unexpected("test", "TestError");
        var result = Result.Failure(error);

        result.IsSuccess.ShouldBeFalse();
        result.Error.ShouldBe(error);
    }

    [Fact]
    public void Failure_WithValue_ThrowsInvalidOperationException_WhenAccessingData()
    {
        var error = AppError.Unexpected("test", "TestError");
        var result = Result.Failure<string>(error);

        result.IsSuccess.ShouldBeFalse();
        result.Error.ShouldBe(error);
        Should.Throw<InvalidOperationException>(() => _ = result.Data);
    }

    [Fact]
    public void ImplicitConversion_FromAppErrorToResult_CreatesFailureResult()
    {
        var error = AppError.Unexpected("test", "TestError");
        Result result = error;

        result.IsSuccess.ShouldBeFalse();
        result.Error.ShouldBe(error);
    }

    [Fact]
    public void ImplicitConversion_FromAppErrorToGenericResult_CreatesFailureResult()
    {
        var error = AppError.Unexpected("test", "TestError");

        Result<string> result = error;

        result.IsSuccess.ShouldBeFalse();
        result.Error.ShouldBe(error);
    }

    [Fact]
    public void ImplicitConversion_FromValueToGenericResult_CreatesSuccessResult()
    {
        const string Value = "TestValue";
        Result<string> result = Value;

        result.IsSuccess.ShouldBeTrue();
        result.Error.ShouldBeNull();
        result.Data.ShouldBe(Value);
    }
}
