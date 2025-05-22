using MediatR;
using Microsoft.AspNetCore.Mvc;
using planora.API.Controllers.Common;
using planora.Application.Features.Activities.Queries.GetAll;
using planora.Domain.Entities;

namespace planora.API.Controllers;

public class ActivitiesController(IMediator mediator) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Activity>>> GetAllActivities(CancellationToken cancellationToken)
    {
        var response = await mediator.Send(new GetAllActivitiesRequest(), cancellationToken);

        return Ok(response);
    }
}