using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Vehicles
{
    public class Edit
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
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var vehicle = await _context.Vehicles.FindAsync(request.Vehicle.Id);
                if(vehicle == null) return null;
                _mapper.Map(request.Vehicle, vehicle);

                var result = await _context.SaveChangesAsync() > 0;
                if(!result) return  Result<Unit>.Failure("Failed to update user");
                return Result<Unit>.Success(Unit.Value);

            }

        }
    }
}