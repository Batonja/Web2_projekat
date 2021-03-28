using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.RentACarServices
{
    public class List
    {
        public class Query : IRequest<Result<List<RentACarService>>> { }

        public class Handler : IRequestHandler<Query, Result<List<RentACarService>>>
        {

            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<Result<List<RentACarService>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return  Result<List<RentACarService>>.Success(await _context.RentACarServices.ToListAsync());
            }
        }
    }
}