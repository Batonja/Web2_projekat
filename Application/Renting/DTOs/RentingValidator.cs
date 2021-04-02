using System;
using Application.Renting.DTOs;
using Domain;
using FluentValidation;

namespace Application.Renting.DTOs
{
    public class RentingValidator : AbstractValidator<RentingDTO>
    {
        public RentingValidator()
        {
            RuleFor(x => x.UserVehicleRentingId).NotEmpty();
            RuleFor(x => x.AppUserId).NotEmpty();
            RuleFor(x => x.VehicleId).NotEmpty();
            RuleFor(x => x.PickUpDate).Must(ValidPickupDate).WithMessage("Pick up date must be at least two days from now");
            RuleFor(x => x.ReturnDate).Must(ValidReturnDate).WithMessage("Return date must be at least two hours from pick up date");

        }
        private bool ValidPickupDate(DateTime date)
        {
            return date > DateTime.Now.AddDays(2);
        }

        private bool ValidReturnDate(RentingDTO dtoInstance, DateTime date)
        {
            return date > dtoInstance.PickUpDate.AddHours(2);
        }
    }
}