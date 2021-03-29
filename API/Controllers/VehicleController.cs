using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Vehicles;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    [Authorize]
    public class VehicleController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult> GetVehicles()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetVehicle(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [Authorize(Roles = RoleConstants.CarManager)]
        [HttpPost]
        public async Task<IActionResult> CreateVehicle(Vehicle vehicle)
        {
            return Ok(await Mediator.Send(new Create.Command { Vehicle = vehicle }));
        }

        [Authorize(Roles = RoleConstants.Administrator)]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditVehicle(Guid id, Vehicle vehicle)
        {
            vehicle.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Vehicle = vehicle }));
        }

        [Authorize(Roles = "Administrator, CarManager")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehicle(Guid id)
        {

            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}