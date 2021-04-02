using FluentValidation;

namespace Application.Renting.DTOs
{
        public class ReviewValidator : AbstractValidator<ReviewDTO>
    {
        public ReviewValidator()
        {
            RuleFor(x => x.CarGrade).NotEmpty();
            RuleFor(x => x.RentACarServiceGrade).NotEmpty();
        }
    }
}