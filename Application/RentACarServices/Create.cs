using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.RentACarServices
{
    public class Create
        {
            public class Command : IRequest<Result<Unit>>
            {
                //Props
                public RentACarService RentACarService { get; set; }
            }
    
            public class CommandValidator : AbstractValidator<Command>
            {
                public CommandValidator()
                {
                    RuleFor(x => x.RentACarService).SetValidator(new RentACarServiceValidator());
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
                    _context.RentACarServices.Add(request.RentACarService);
                    var result = await _context.SaveChangesAsync() > 0;

                    return result != false
                    ? Result<Unit>.Success(Unit.Value)
                    :  Result<Unit>.Failure("Failed to create Rent A Car Service");
                }
            }
        }
}