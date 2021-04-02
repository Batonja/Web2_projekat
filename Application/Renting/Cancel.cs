using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Renting.DTOs;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Renting
{
    public class Cancel
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
                var renting = await _context.Rentings.FindAsync(request.Id);
                if (renting.PickUpDate < DateTime.Now.AddDays(2))
                    return Result<Unit>.Failure("You can cancel renting if it is more then two days away.");

                var vehicle = await _context.Vehicles.FindAsync(renting.VehicleId);
                var rentACarService = await _context.RentACarServices.FindAsync(vehicle.RentACarServiceOwnerId);
                var rentingTotalProfit = (float)(renting.ReturnDate - renting.PickUpDate).TotalDays * (float)vehicle.PriceADay;

                if (!renting.IsCanceled)
                {
                    renting.FullRentingPrice = 0;
                    rentACarService.TotalProfit += (decimal)rentingTotalProfit;
                    --vehicle.NumberOfRentings;
                    renting.IsCanceled = true;
                }

                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to cancel the Renting.");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}