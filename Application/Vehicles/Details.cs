using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Vehicles
{
    public class Details
    {
        public class Query : IRequest<Result<Vehicle>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Vehicle>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<Result<Vehicle>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Vehicles.FindAsync(request.Id);

                return Result<Vehicle>.Success(user);
            }

            
        }
    }

}
