using Domain;
using FluentValidation;


namespace Application.RentACarServices
{

    public class RentACarServiceValidator : AbstractValidator<RentACarService>
    {
        public RentACarServiceValidator()
        {
            RuleFor(x => x.RentACarServiceId).NotEmpty();
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.Description).NotEmpty();
            RuleFor(x => x.AverageGrade).NotEmpty().GreaterThanOrEqualTo(0);
            RuleFor(x => x.Address).NotEmpty();
            RuleFor(x => x.State).NotEmpty();
            RuleFor(x => x.City).NotEmpty();
        }
    }
}