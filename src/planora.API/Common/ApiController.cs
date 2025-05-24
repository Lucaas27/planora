using Microsoft.AspNetCore.Mvc;
using planora.Application.Interfaces.Mediator;

namespace planora.API.Common;

[Route("api/[controller]")]
[ApiController]
public abstract class ApiController(IMediator mediator) : ControllerBase
{
    protected readonly IMediator Mediator = mediator;
}