using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessLayer.Interfaces;
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

        // GET: api/Airline/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Airline
        [HttpPost]
        public bool AddAirline([FromBody] Airline airline)
        {
            return _airlineBusiness.AddAirline(airline);
        }

        // PUT: api/Airline/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
