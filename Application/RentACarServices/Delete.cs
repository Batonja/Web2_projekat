using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.RentACarServices
{
    public class Delete
    {
        public class Create
        {
            public class Command : IRequest<Result<Unit>>
            {
                public Guid Id { get; set; }
            }

            public class CommandValidator : AbstractValidator<Command>
            {
                public CommandValidator()
                {

                }
            }
            public class Handler : IRequestHandler<Command, Result<Unit>>
            {
                private readonly DataContext _context;
                public Handler(DataContext context)
                {
                    _context = context;

                }
                public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
                {
                    var rentACarService = await _context.RentACarServices.FindAsync(request.Id);

                    _context.Remove(rentACarService);
                    var result = await _context.SaveChangesAsync() > 0;
                    if (!result) return Result<Unit>.Failure("Failed to delete the Rent A CarService.");

                    return Result<Unit>.Success(Unit.Value);
                }
            }
        }
    }
}