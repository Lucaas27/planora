using Microsoft.AspNetCore.Mvc;
using planora.Application.Interfaces.Mediator;

namespace planora.API.Common;

[Route("api/[controller]")]
[ApiController]
public abstract class ApiController : ControllerBase
{
    private IMediator? _mediator;

    protected IMediator Mediator
    {
        get => _mediator ??=
            HttpContext.RequestServices.GetService<IMediator>() ??
            throw new InvalidOperationException("Mediator is null");
    }
}
