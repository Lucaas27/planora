using planora.Application.Common;
using planora.Application.Interfaces.Mediator;
using planora.Domain.Entities;
using planora.Domain.Repositories;

namespace planora.Application.Features.Activities.Commands.Create;

public sealed class CreateActivityHandler(IRepository<Activity> repository)
    : ICommandHandler<CreateActivityRequest, Result<CreateActivityResponse>>
{
    public async Task<Result<CreateActivityResponse>> Handle(
        CreateActivityRequest request,
        CancellationToken cancellationToken
    )
    {
        var entity = request.MapToActivityEntity();

        await repository.AddAsync(entity, cancellationToken);

        return new CreateActivityResponse(entity.Id);
    }
}
