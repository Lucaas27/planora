using Microsoft.AspNetCore.Mvc;

namespace planora.API.Controllers.Common;

[Route("api/[controller]")]
[ApiController]
public abstract class BaseApiController : ControllerBase
{
}