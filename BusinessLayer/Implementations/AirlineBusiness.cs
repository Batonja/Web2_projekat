using BusinessLayer.Interfaces;
using Common.ErrorObjects;
using Common.Models.Airline;
using DatabaseLayer.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLayer.Implementations
{
    public class AirlineBusiness : IAirlineBusiness
    {
        IAirlineDatabase _airlineDatabase;

        public AirlineBusiness(IAirlineDatabase airlineDatabase)
        {
            _airlineDatabase = airlineDatabase;
        }

        public List<Airline> Search(SearchObject searchObject)
        {
            List<Airline> dbAirlines = new List<Airline>();

            if (searchObject.Destination != null)
                dbAirlines = _airlineDatabase.SearchWithDestination(searchObject);
            else
                dbAirlines = _airlineDatabase.Search(searchObject);

            return dbAirlines;

        }

        public List<Airline> Filter(FilterObject filterObject)
        {
            List<Airline> airlinesWithFilteredTitles = new List<Airline>();
            List<Airline> retVal = new List<Airline>();

            if (filterObject.Airlines.Count > 0)
            {
                airlinesWithFilteredTitles = _airlineDatabase.Filter(filterObject.Airlines);
            }
            else
                airlinesWithFilteredTitles = _airlineDatabase.Get();
            

            if(filterObject.TripLengthOption == 1 || filterObject.TripLengthOption == -1 || filterObject.TripLengthOption == 5)
                airlinesWithFilteredTitles = FilterFlightsOnTripLength(airlinesWithFilteredTitles, filterObject.TripLengthOption);

            return airlinesWithFilteredTitles;


                

        }

        public Holder<Airline> AddAirline(Airline airline)
        {
            Airline airlineFromDB = _airlineDatabase.Get(airline.AirlineId);

            if (airlineFromDB != null)
                return CheckAirline(airline, 404, "Airline you're trying to add already exists");
           

            if (_airlineDatabase.AddAirline(airline))
                return CheckAirline(airline, 200, "");

            return CheckAirline(airline, 500, "Error while trying to add airline");
        }
        
        public Holder<Airline> DeleteAirline(int airlineId)
        {
            Airline airlineFromDb = _airlineDatabase.Get(airlineId);

            if (airlineFromDb.AirlineId <= 0)
                return CheckAirline(new Airline(), 404, "Airline you'retrying to delete doesn't exists");

            if (_airlineDatabase.DeleteAirline(airlineId)) 
                return CheckAirline(new Airline(), 200, "");

            return CheckAirline(new Airline(), 400, "Unable to delete airline");
        }

        public Holder<Airline> EditAirline(Airline airline)
        {
            Airline airlineFromDB = _airlineDatabase.Get(airline.AirlineId);

            if (airlineFromDB.AirlineId <= 0)
                return CheckAirline(airline, 404, "Airline you're trying to edit doesn't exists");

            if (!_airlineDatabase.EditAirline(airline))
                return CheckAirline(airline, 500, "Unable to edit airline");


            foreach (var flight in airline.Flights)
            {
                foreach (var seat in flight.Seats)
                {

                    if (seat.SeatId == 0)
                    {
                        seat.Flight = flight;
                        if (!_airlineDatabase.AddSeat(seat))
                            return CheckAirline(airline, 500, "Unable to add seats");
                    }

                }

            }


            if(airline.AvailableFlightLuggage != null) { 
                foreach (var airlineAfl in airline.AvailableFlightLuggage)
                {
                    AirlineFlightLuggage aflToAdd = airlineAfl;

                    foreach (var airlineDbAfl in airlineFromDB.AvailableFlightLuggage)
                    {
                        if(airlineDbAfl.FlightLuggageId == airlineAfl.FlightLuggageId && airlineDbAfl.AirlineId == airlineAfl.AirlineId)
                        {
                            aflToAdd = null;
                            break;
                        }
                    }

                    if(aflToAdd != null)
                    {
                        if (!_airlineDatabase.AddAirlineFlightLuggage(aflToAdd))
                            return CheckAirline(airline, 500, "Unable to add AirlineFlightLuggage while editing airline");
                    }
                }
            }


            return CheckAirline(airline, 200, "");

        }

        public List<Airline> Get()
        {
            List<Airline> retVal = _airlineDatabase.Get();

            return retVal;
        }

        public Airline Get(int id)
        {
            return _airlineDatabase.Get(id);
        }

        public List<FlightOrder> GetFlightOrders()
        {
            return _airlineDatabase.GetFlightOrders();
        }
        public Holder<FlightOrder> DeleteFlightOrder(FlightOrder flightOrder)
        {
            if (!_airlineDatabase.FreeSeat(flightOrder.Seat))
                return CheckFlightOrder(flightOrder, 400, "Server error while trying to free the seat");

            return _airlineDatabase.DeleteFlightOrder(flightOrder) ? CheckFlightOrder(flightOrder, 200, "") :
                CheckFlightOrder(flightOrder, 400, "Server error while trying to delete flightOrder");
        }
        public Holder<FlightOrder> OrderFlight(FlightOrder flightOrder)
        {

            flightOrder.FlightLuggage = _airlineDatabase.GetFlightLuggage(flightOrder.FlightLuggage.FlightLuggageId);

            /*_airlineDatabase.AddTicket(flightOrder.FlightTicket);

            if (ticket != null) { }
                
            else
                return CheckFlightOrder(null, 400, "Unable to add ticket to database");
                */

            flightOrder.Seat = _airlineDatabase.EditSeat(flightOrder.Seat);

            if (!_airlineDatabase.AddFlightOrder(flightOrder))
                return CheckFlightOrder(null, 400, "Unable to add flight order");

            if(_airlineDatabase.EditSeat(flightOrder.Seat) == null)
                return CheckFlightOrder(null, 400, "Unable to add edit seat");

            return CheckFlightOrder(flightOrder, 200, "");

        }

        public Holder<FlightOrder> ConfirmFlight(FlightOrder flightOrder)
        {
            return _airlineDatabase.ConfirmFlight(flightOrder) ? CheckFlightOrder(flightOrder, 200, "") : 
                CheckFlightOrder(flightOrder, 400, "Error while trying to confirm flight");
        }

        public List<FlightLuggage> GetFlightLuggage()
        {
            return _airlineDatabase.GetFlightLuggage();
        }

        public Holder<FlightLuggage> AddFlightLuggage(FlightLuggage flightLuggage)
        {
            List<FlightLuggage> flightLuggageList = _airlineDatabase.GetFlightLuggage();

            if (flightLuggage.FlightLuggageType.GetType() == typeof(DBNull))
                return CheckFlightLuggage(flightLuggage, 400, "Flight luggage must have type");

            foreach (FlightLuggage luggageInstance in flightLuggageList)
            {
                if (luggageInstance.FlightLuggageType == flightLuggage.FlightLuggageType)
                    return CheckFlightLuggage(flightLuggage, 403, "Flight luggage with this type already exists");
                
            }

            if (_airlineDatabase.AddFlightLuggage(flightLuggage))
                return CheckFlightLuggage(flightLuggage, 200, "");

            return CheckFlightLuggage(flightLuggage, 500, "Unable to add flight luggage");
            
        }

        public FlightLuggage GetFlightLuggage(int id)
        {
            return _airlineDatabase.GetFlightLuggage(id);
        }


        public Holder<Destination> AddDestination(Destination destination)
        {
            List<Destination> destinationsFromDB = _airlineDatabase.GetDestinations();

            foreach (var destinationFromDB in destinationsFromDB)
            {
                if (destinationFromDB.Title == destination.Title)
                    return CheckDestination(destination, 400, "This destination already exists in database");
            }

            if (_airlineDatabase.AddDestination(destination))
                return CheckDestination(destination, 200, "");

            return CheckDestination(destination, 500, "Error while trying to add destination");
        }

        public List<Destination> GetDestinations()
        {
            return _airlineDatabase.GetDestinations();
        }


        public Holder<Flight> AddFlight(Flight flight)
        {
            if (flight.FlightId < 0)
                flight.FlightId = 0;

            return _airlineDatabase.AddFlight(flight) ? CheckFlight(flight, 200, "") : CheckFlight(flight, 500, "Flight cannot be added");
        }

        #region helpers

        List<Airline> FilterFlightsOnTripLength(List<Airline> airlines, decimal tripLength)
        {

            List<Airline> filteredAirlinesWithFlights = new List<Airline>();
            List<Flight> flightsTemp ;


            if (tripLength == 0)
                filteredAirlinesWithFlights = airlines;
            else
            {
                foreach (var airline in airlines)
                {
                    flightsTemp = new List<Flight>();
                    foreach (var flight in airline.Flights)
                    {
                        switch (tripLength)
                        {
                            case -1:
                                if (flight.TripLength < 1)
                                    flightsTemp.Add(flight);
                                break;
                            case 1:
                                if (flight.TripLength >= 1 && flight.TripLength <= 5)
                                    flightsTemp.Add(flight);
                                break;
                            case 5:
                                if (flight.TripLength > 5)
                                    flightsTemp.Add(flight);
                                break;

                            default: break;
                        }
                    }
                    if (flightsTemp.Count > 0)
                    {
                        Airline airlineToAdd = airline;
                        airlineToAdd.Flights = flightsTemp;
                        filteredAirlinesWithFlights.Add(airlineToAdd);
                    }
                }
            }
            return filteredAirlinesWithFlights;
        }

        Holder<Airline> CheckAirline(Airline airline, int errorCode, string description) =>
            errorCode == 200 ? Holder<Airline>.Success(airline) : Holder<Airline>.Fail(errorCode, description);

        Holder<FlightLuggage> CheckFlightLuggage(FlightLuggage flightLuggage, int errorCode, string description) =>
            errorCode == 200 ? Holder<FlightLuggage>.Success(flightLuggage) : Holder<FlightLuggage>.Fail(errorCode, description);

        Holder<FlightOrder> CheckFlightOrder(FlightOrder flightOrder, int errorCode, string description) =>
            errorCode == 200 ? Holder<FlightOrder>.Success(flightOrder) : Holder<FlightOrder>.Fail(errorCode, description);

        Holder<Destination> CheckDestination(Destination destination, int errorCode, string description) =>
            errorCode == 200 ? Holder<Destination>.Success(destination) : Holder<Destination>.Fail(errorCode, description);

        Holder<Flight> CheckFlight(Flight flight, int errorCode, string description) =>
            errorCode == 200 ? Holder<Flight>.Success(flight) : Holder<Flight>.Fail(errorCode, description);


        #endregion
    }
}
