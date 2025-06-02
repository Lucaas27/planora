using System.Net.Mime;
using Microsoft.AspNetCore.Mvc;
using planora.API.Common;
using planora.API.Extensions;
using planora.Application.Common;
using planora.Application.Features.Activities.Queries.GetAll;
using planora.Application.Features.Activities.Queries.GetDetails;

namespace planora.API.Controllers;

[Produces(MediaTypeNames.Application.Json)]
[Tags("Activities")]
public class ActivitiesController
    : ApiController
{
    [HttpGet]
    [ProducesResponseType(typeof(Result<GetAllActivitiesResponse>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetAllActivities(CancellationToken cancellationToken)
    {
        var result = await Mediator.Query(new GetAllActivitiesRequest(), cancellationToken);

        return result.MapToActionResult();
    }

    [HttpGet("{id:guid}")]
    [ProducesResponseType(typeof(Result<GetActivityDetailsResponse>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetActivityDetails(
        Guid id,
        CancellationToken cancellationToken
    )
    {
        var result = await Mediator.Query(new GetActivityDetailsRequest(id), cancellationToken);

        return result.MapToActionResult();
    }
}