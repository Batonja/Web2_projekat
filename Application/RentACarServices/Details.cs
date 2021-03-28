using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.RentACarServices
{
    public class Details
    {
        public class Query : IRequest<Result<RentACarService>>
        {

            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<RentACarService>>
        {

            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<Result<RentACarService>> Handle(Query request, CancellationToken cancellationToken)
            {
                var rentACarService = await _context.RentACarServices.FindAsync(request.Id);
                
                return Result<RentACarService>.Success(rentACarService);
            }
        }
    }
}