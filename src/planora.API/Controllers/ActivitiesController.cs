using Microsoft.AspNetCore.Mvc;
using planora.API.Common;
using planora.API.Extensions;
using planora.Application.Features.Activities.Queries.GetAll;
using planora.Application.Features.Activities.Queries.GetDetails;
using planora.Application.Interfaces.Mediator;

namespace planora.API.Controllers;

public class ActivitiesController(IMediator mediator)
    : ApiController(mediator)
{
    [HttpGet]
    public async Task<IActionResult> GetAllActivities(CancellationToken cancellationToken)
    {
        var result = await Mediator.Query(new GetAllActivitiesRequest(), cancellationToken);

        return result.MapToActionResult();
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetActivityDetails(
        Guid id,
        CancellationToken cancellationToken
    )
    {
        var result = await Mediator.Query(new GetActivityDetailsRequest(id), cancellationToken);

        return result.MapToActionResult();
    }
}