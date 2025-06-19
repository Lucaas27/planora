namespace planora.Domain.Errors;

public static class ActivityError
{
    public static AppError NotFound(Guid id)
    {
        return AppError.NotFound("activity.not_found", $"Activity with ID '{id}' was not found.");
    }

    public static AppError CannotDeletePastActivity(Guid id)
    {
        return AppError.Validation("activity.cannot_delete_past_activity",
            $"Activity with ID '{id}' cannot be deleted because it is in the past.");
    }
}
