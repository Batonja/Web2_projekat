using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessLayer.Interfaces;
using Common.ErrorObjects;
using Common.Models.Airline;
using DatabaseLayer.DataAccess;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AirlineController : ControllerBase
    {
        IAirlineBusiness _airlineBusiness;

        public DataContext DbContext { get; }

        public AirlineController(IAirlineBusiness airlineBusiess,DataContext dbContext )
        {
            _airlineBusiness = airlineBusiess;
            DbContext = dbContext;
        }

        // GET: api/Airline
        [HttpGet]
        public List<Airline> Get()
        {
            return _airlineBusiness.Get();
        }

        [HttpGet]
        public List<FlightLuggage> GetFlightLuggage()
        {
            return _airlineBusiness.GetFlightLuggage();
        }

        [HttpGet("{id}", Name = "GetFlightLuggage")]
        public FlightLuggage GetFlightLuggage(int id)
        {
            return _airlineBusiness.GetFlightLuggage(id);
        }

        // GET: api/Airline/5
        [HttpGet("{id}", Name = "Get")]
        public Airline Get(int id)
        {
            return _airlineBusiness.Get(id);
        }

        // POST: api/Airline
        [HttpPost]
        public Holder<Airline> AddAirline([FromBody] Airline airline)
        {
            return _airlineBusiness.AddAirline(airline);
        }

        [HttpPost]
        public Holder<FlightLuggage> AddFlightLuggage([FromBody] FlightLuggage flightLuggage)
        {
            return _airlineBusiness.AddFlightLuggage(flightLuggage);
        }

        // PUT: api/Airline/5
        [HttpPost("{id}")]
        public Holder<Airline> EditAirline([FromBody] Airline airline)
        {
            return _airlineBusiness.EditAirline(airline);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public Holder<Airline> Delete(int id)
        {
            return _airlineBusiness.DeleteAirline(id);
        }
    }
}
