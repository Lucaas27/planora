using System.Net;
using Microsoft.AspNetCore.Mvc;
using planora.Application.Common.Responses;

namespace planora.API.Controllers.Common;

[Route("api/[controller]")]
[ApiController]
public abstract class BaseApiController : ControllerBase
{
    /// <summary>
    ///     Processes a BaseResponse and returns the appropriate ActionResult based on its properties
    /// </summary>
    protected ActionResult ProcessResponse(BaseResponse response)
    {
        // For successful responses, just return with the correct status code
        if (response.Success)
        {
            return StatusCode((int)response.StatusCode, response);
        }

        // For error responses, use the specific result type when available
        // This provides more semantic meaning in your API responses
        return response.StatusCode switch
        {
            HttpStatusCode.NotFound => NotFound(response),
            HttpStatusCode.Unauthorized => Unauthorized(response),
            HttpStatusCode.Forbidden => StatusCode((int)HttpStatusCode.Forbidden, response),
            HttpStatusCode.BadRequest => BadRequest(response),
            _ => StatusCode((int)response.StatusCode, response)
        };
    }

    /// <summary>
    ///     Processes a generic BaseResponse and returns the appropriate ActionResult based on its properties
    /// </summary>
    protected ActionResult ProcessResponse<T>(BaseResponse<T> response)
    {
        if (response.Success)
        {
            return StatusCode((int)response.StatusCode, response);
        }

        return response.StatusCode switch
        {
            HttpStatusCode.NotFound => NotFound(response),
            HttpStatusCode.Unauthorized => Unauthorized(response),
            HttpStatusCode.Forbidden => StatusCode((int)HttpStatusCode.Forbidden, response),
            HttpStatusCode.BadRequest => BadRequest(response),
            _ => StatusCode((int)response.StatusCode, response)
        };
    }
}