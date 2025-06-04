namespace planora.Domain.Errors;

public static class ActivityError
{
    public static AppError NotFound(Guid id)
    {
        return AppError.NotFound("activity.not_found", $"Activity with ID '{id}' was not found.");
    }
}