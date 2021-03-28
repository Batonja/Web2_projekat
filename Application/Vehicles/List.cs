using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Vehicles
{
    public class List
    {
        public class Query : IRequest<Result<List<Vehicle>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Vehicle>>>
        {

            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<Result<List<Vehicle>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Vehicle>>.Success(await _context.Vehicles.ToListAsync());
            }
        }
    }
}