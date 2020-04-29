using BusinessLayer.Interfaces;
using DatabaseLayer.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLayer.Implementations
{
    public class RentACarBusiness : IRentACarBusiness
    {
        IRentACarDatabase _rentACarDatabase;

        public RentACarBusiness(IRentACarDatabase rentACarDatabase)
        {
            _rentACarDatabase = rentACarDatabase;
        }

        public bool Add(string Car)
        {
            throw new NotImplementedException();
        }
    }
}
