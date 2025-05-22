using Microsoft.AspNetCore.Mvc;
using planora.API.Controllers.Common;
using planora.Application.Common.Mediator;
using planora.Application.Features.Activities.Queries.GetAll;

namespace planora.API.Controllers;

public class ActivitiesController(IQueryHandler<GetAllActivitiesRequest, IEnumerable<GetAllActivitiesResponse>> handler)
    : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult> GetAllActivities(CancellationToken cancellationToken)
    {
        var response = await handler.Handle(new GetAllActivitiesRequest(), cancellationToken);
        return ProcessResponse(response);
    }

    // [HttpGet("{id:guid}")]
    // public async Task<ActionResult> GetActivityDetails(Guid id, CancellationToken cancellationToken)
    // {
    //     var response = await mediator.Send(new GetActivityByIdRequest(id), cancellationToken);
    //     return ProcessResponse(response);
    // }
}