using planora.Domain.Entities;

namespace planora.Application.Features.Activities.Queries.GetAll;

public static class GetAllActivitiesMapper
{
    public static GetAllActivitiesResponse MapToGetAllResponse(this Activity entity)
    {
        return new GetAllActivitiesResponse
        {
            Id = entity.Id,
            Name = entity.Name,
            Description = entity.Description,
            ActivityDate = entity.Date,
            City = entity.City,
            Category = entity.Category,
            IsActive = entity.IsActive
        };
    }
}