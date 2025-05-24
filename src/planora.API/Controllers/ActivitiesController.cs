using Microsoft.AspNetCore.Mvc;
using planora.API.Common;
using planora.Application.Features.Activities.Queries.GetAll;
using planora.Application.Interfaces.Mediator;

namespace planora.API.Controllers;

public class ActivitiesController(IMediator mediator)
    : ApiController(mediator)
{
    [HttpGet]
    public async Task<IActionResult> GetAllActivities(CancellationToken cancellationToken)
    {
        var response = await Mediator.Query(new GetAllActivitiesRequest(), cancellationToken);

        return Ok(response);
    }
}