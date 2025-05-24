namespace planora.Domain.Errors;

public static class ActivityError
{
    public static BaseError NotFound(Guid id)
    {
        return new BaseError("activity.not_found", $"Activity with ID '{id}' was not found.");
    }
}