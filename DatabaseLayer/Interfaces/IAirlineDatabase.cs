﻿using Common.Models;
using Common.Models.Airline;
using System;
using System.Collections.Generic;
using System.Text;

namespace DatabaseLayer.Interfaces
{
    public interface IAirlineDatabase
    {
        List<Airline> Get();
        List<Airline> Search(SearchObject searchObject);
        List<Airline> SearchWithDestination(SearchObject searchObject);
        List<Airline> Filter(List<Airline> airlines);
        List<FlightOrder> GetFlightOrders();

        Airline Get(int id);
        bool FreeSeat(Seat seat);
        bool DeleteFlightOrder(FlightOrder flightOrder);
        bool EditFlight(Flight flight);
        bool AddSeat(Seat seat);
        bool EditAirline(Airline airline);
        bool AddAirline(Airline airline);
        bool DeleteAirline(int airlineId);
        bool AddDestination(Destination destination);
        bool AddFlightLuggage(FlightLuggage flightLuggage);
        bool AddFlight(Flight flight);
        bool AddAirlineFlightLuggage(AirlineFlightLuggage airlineFlightLuggage);

        FlightTicket AddTicket(FlightTicket flightTicket);
        bool AddFlightOrder(FlightOrder flightOrder);
        Seat EditSeat(Seat seat);


        User GetUserByPassportId(long passportId);
        List<FlightLuggage> GetFlightLuggage();
        List<Destination> GetDestinations();
        FlightLuggage GetFlightLuggage(int id);
    }
}
