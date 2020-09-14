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
        

        [HttpPost]
        public Holder<FlightOrder> DeleteFlightOrder([FromBody]FlightOrder flightOrder)
        {
            Holder<FlightOrder> retVal = _airlineBusiness.DeleteFlightOrder(flightOrder);
            return retVal;
        }

        [HttpGet]
        public List<FlightOrder> GetFlightOrders()
        {
            List<FlightOrder> orders = _airlineBusiness.GetFlightOrders();

            return orders;
        }

        // GET: api/Airline
        [HttpGet]
        public List<Airline> Get()
        {

            List<Airline> retVal = _airlineBusiness.Get();

            return retVal;
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

            Holder<Airline> retValu = _airlineBusiness.AddAirline(airline);

            

            return retValu;
        }

    

        [HttpPost]
        public Holder<Destination> AddDestination([FromBody] Destination destination)
        {
            Holder<Destination> retVal = _airlineBusiness.AddDestination(destination);

            return retVal;
        }

        [HttpGet]
        public List<Destination> GetDestinations()
        {

            return _airlineBusiness.GetDestinations();
        }


        [HttpPost]
        public Holder<FlightOrder> ConfirmFlight([FromBody]FlightOrder flightOrder)
        {
            Holder<FlightOrder> retVal = _airlineBusiness.ConfirmFlight(flightOrder);

            return retVal;
        }

        [HttpPost]
        public Holder<FlightOrder> OrderFlight([FromBody]FlightOrder flightOrder)
        {

            Holder<FlightOrder> retVal = _airlineBusiness.OrderFlight(flightOrder);

            return retVal;
        }


        [HttpPost]
        public Holder<Flight> AddFlight([FromBody]Flight flight)
        {
            Holder<Flight> retval = _airlineBusiness.AddFlight(flight);

            return retval;
        }

        [HttpPost]
        public Holder<FlightLuggage> AddFlightLuggage([FromBody] FlightLuggage flightLuggage)
        {
            return _airlineBusiness.AddFlightLuggage(flightLuggage);
        }

        [HttpPost]
        public List<Airline> Search([FromBody] SearchObject searchObject)
        {
            return _airlineBusiness.Search(searchObject);
        }

        [HttpPost]
        public List<Airline> Filter([FromBody]FilterObject filterObject)
        {
            return _airlineBusiness.Filter(filterObject);
        }

        // PUT: api/Airline/5
        [HttpPost]
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
