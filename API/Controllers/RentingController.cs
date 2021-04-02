using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Application.Renting;
using Application.Renting.DTOs;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize(Roles = RoleConstants.RegularUser)]
    public class RentingController : BaseApiController
    {


        [HttpPost]
        public async Task<IActionResult> CreateRenting(RentingDTO renting)
        {
            return Ok(await Mediator.Send(new Create.Command { Renting = renting }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> CancelRenting(Guid id)
        {
            return HandleResult(await Mediator.Send(new Cancel.Command { Id = id }));
        }
        
        [HttpPut("{id}/review")]
        public async Task<IActionResult> CreateReview(Guid id, ReviewDTO review)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            review.UserVehicleRentingId = id;
            return Ok(await Mediator.Send(new CreateReview.Command { Review = review }));
        }

    }
}