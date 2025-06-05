using System.Net.Mime;
using Microsoft.AspNetCore.Mvc;
using planora.API.Common;
using planora.API.Extensions;
using planora.Application.Common;
using planora.Application.Features.Activities.Commands.Create;
using planora.Application.Features.Activities.Commands.Update;
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

    [HttpPost]
    [ProducesResponseType(typeof(Result<CreateActivityResponse>), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> CreateActivity(CreateActivityRequest request, CancellationToken cancellationToken)
    {
        var result = await Mediator.Command(request, cancellationToken);

        return result.MapToActionResult(StatusCodes.Status201Created);
    }

    [HttpPut("{id:guid}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> UpdateActivity(
        [FromRoute] Guid id,
        [FromBody] UpdateActivityRequest request,
        CancellationToken cancellationToken
    )
    {
        // Copies all properties from the original immutable request object and overwrites ID
        var requestWithId = request with { Id = id };
        var result = await Mediator.Command(requestWithId, cancellationToken);

        return result.MapToActionResult(StatusCodes.Status204NoContent);
    }
}
