using planora.Application.Common;
using planora.Application.Interfaces.Mediator;
using planora.Domain.Entities;
using planora.Domain.Errors;
using planora.Domain.Repositories;

namespace planora.Application.Features.Activities.Commands.Delete;

public sealed class DeleteActivityHandler(IRepository<Activity> repository)
    : ICommandHandler<DeleteActivityRequest, Result>
{
    public async Task<Result> Handle(DeleteActivityRequest request, CancellationToken cancellationToken)
    {
        var activityId = request.Id;
        // Fetch the activity to be deleted
        var activityToBeRemoved = await repository.GetByIdAsync(activityId, cancellationToken);

        // Check if the activity exists
        if (activityToBeRemoved is null)
        {
            return ActivityError.NotFound(activityId);
        }

        // Ensure the activity is not in the past
        if (activityToBeRemoved.Date < DateTime.UtcNow)
        {
            return ActivityError.CannotDeletePastActivity(activityId);
        }

        await repository.DeleteAsync(activityToBeRemoved, cancellationToken);

        return Result.Success();
    }
}
