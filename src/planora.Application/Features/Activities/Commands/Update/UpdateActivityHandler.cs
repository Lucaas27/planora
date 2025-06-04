using planora.Application.Common;
using planora.Application.Interfaces.Mediator;
using planora.Domain.Entities;
using planora.Domain.Errors;
using planora.Domain.Repositories;

namespace planora.Application.Features.Activities.Commands.Update;

public sealed class UpdateActivityHandler(IRepository<Activity> repository)
    : ICommandHandler<UpdateActivityRequest, Result>
{
    public async Task<Result> Handle(UpdateActivityRequest request, CancellationToken cancellationToken)
    {
        var activityId = request.Id;
        var existingActivity = await repository.GetByIdAsync(activityId, cancellationToken);

        if (existingActivity is null)
        {
            return ActivityError.NotFound(activityId);
        }

        // Map the existing activity to an updated one, only changing properties that were specified
        var updatedActivity = existingActivity.MapToUpdatedEntity(request);

        await repository.UpdateAsync(updatedActivity, cancellationToken);

        return Result.Success();
    }
}