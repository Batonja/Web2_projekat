using Domain;
using FluentValidation;

namespace Application.Vehicles
{
    public class VehicleValidator : AbstractValidator<Vehicle>
    {
        public VehicleValidator()
        {
            RuleFor(x => x.Id).NotEmpty();
            RuleFor(x => x.CarModel).NotEmpty();
            RuleFor(x => x.PriceADay).NotEmpty().GreaterThan(0);
            RuleFor(x => x.RegistrationNumber).NotEmpty();
            RuleFor(x => x.NumberOfSeats).NotEmpty().GreaterThanOrEqualTo(2);
            RuleFor(x => x.NumberOfDoors).NotEmpty().GreaterThan(3);
            RuleFor(x => x.NumberOfSuitcases).NotEmpty().GreaterThanOrEqualTo(0);
            RuleFor(x => x.GearboxType).NotEmpty();
            RuleFor(x => x.IsAirCondition).NotEmpty();
            // RuleFor(x => x.).NotEmpty(); Image
            RuleFor(x => x.IsAvailableNow).NotEmpty();
            RuleFor(x => x.AverageCarGrade).NotEmpty().GreaterThanOrEqualTo(0);
            RuleFor(x => x.TotalProfit).NotEmpty();
        }
    }
}