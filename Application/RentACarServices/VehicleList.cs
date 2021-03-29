using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.RentACarServices
{
        public class VehicleList
        {
            public class Query : IRequest<Result<List<Vehicle>>> {
                public Guid Id {get;set;}
            }
    
            public class Handler : IRequestHandler<Query,Result<List<Vehicle>>>
            {
    
                private readonly DataContext _context;
    
                public Handler(DataContext context)
                {
                    _context = context;
    
                }
                public async Task<Result<List<Vehicle>>> Handle(Query request, CancellationToken cancellationToken)
                {
                    var vehicles  = await _context.Vehicles.Where(x => x.RentACarServiceOwnerId == request.Id).ToListAsync();


                    return Result<List<Vehicle>>.Success(vehicles);
                }
            }
        }
}