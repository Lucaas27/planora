namespace planora.Domain.Errors;

public static class ActivityError
{
    public static Error NotFound(Guid id)
    {
        return Error.NotFound("activity.not_found", $"Activity with ID '{id}' was not found.");
    }
}