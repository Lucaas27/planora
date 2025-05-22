using Microsoft.AspNetCore.Mvc;
using planora.API.Controllers.Common;
using planora.Domain.Entities;
using planora.Domain.Repositories;

namespace planora.API.Controllers;

public class ActivitiesController(IRepository<Activity> repository) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Activity>>> GetActivities()
    {
        var activities = await repository.GetAllAsync();

        return Ok(activities);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<Activity>> GetActivityDetails(Guid id)
    {
        var activity = await repository.GetByIdAsync(id);
        if (activity == null)
        {
            return NotFound();
        }

        return Ok(activity);
    }
}