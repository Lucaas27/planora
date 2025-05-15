using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using planora.API.Controllers.Common;
using planora.Domain.Entities;
using planora.Infrastructure.Persistence.Context;

namespace planora.API.Controllers;

public class ActivitiesController(AppDbContext context) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        return await context.Activities.ToListAsync();
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<Activity>> GetActivityDetails(Guid id)
    {
        var activity = await context.Activities.FindAsync(id);
        if (activity == null)
        {
            return NotFound();
        }

        return activity;
    }
}