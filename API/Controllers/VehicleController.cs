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

        [HttpPost]
        public async Task<IActionResult> RegisterVehicle(Vehicle vehicle)
        {
            return Ok(await Mediator.Send(new Register.Command { Vehicle = vehicle }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditVehicle(Guid id, Vehicle vehicle)
        {
            vehicle.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Vehicle = vehicle }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehicle(Guid id)
        {

            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}