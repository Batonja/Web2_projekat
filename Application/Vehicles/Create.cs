using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Validators;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Vehicles
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Vehicle Vehicle { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Vehicle).SetValidator(new VehicleValidator());
            }
        }
        public class Handler : IRequestHandler<Command,Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Vehicles.Add(request.Vehicle);
                var result  = await _context.SaveChangesAsync() > 0;

                return result != false 
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure("Failed to create vehicle");
            }
        }
    }
}