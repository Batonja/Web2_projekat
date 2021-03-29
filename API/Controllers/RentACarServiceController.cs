using System;
using System.Threading.Tasks;
using Application.RentACarServices;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class RentACarServiceController : BaseApiController
    {
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult> GetRentACarServices()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRentACarService(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [AllowAnonymous]
        [HttpGet("{id}/vehicles")]
        public async Task<IActionResult> GetRentACarServiceVehicles(Guid id)
        {
            return HandleResult(await Mediator.Send(new VehicleList.Query { Id = id }));
        }


        [Authorize(Roles = RoleConstants.CarManager)]
        [HttpPost]
        public async Task<IActionResult> CreateRentACarService(RentACarService rentACarService)
        {
            return Ok(await Mediator.Send(new Create.Command { RentACarService = rentACarService }));
        }

        [Authorize(Roles = "Administrator, CarManager")]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditRentACarService(Guid id, RentACarService rentACarService)
        {
            rentACarService.RentACarServiceId = id;
            return HandleResult(await Mediator.Send(new Edit.Command { RentACarService = rentACarService }));
        }

        [Authorize(Roles = RoleConstants.Administrator)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRentACarService(Guid id)
        {

            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}