using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Renting.DTOs;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Renting
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            //Props
            public RentingDTO Renting { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Renting).SetValidator(new RentingValidator());
            }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
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
                var vehicle = await _context.Vehicles.FindAsync(request.Renting.VehicleId);
                var user = await _context.Users.FindAsync(request.Renting.AppUserId);
                if(vehicle == null || user == null ) return Result<Unit>.Failure("Failed to create Renting record. There is no such a vehicle or user.");
                
                var rentACarService = await _context.RentACarServices.FindAsync(vehicle.RentACarServiceOwnerId);
                
                var rentingTotalProfit = (decimal)(request.Renting.ReturnDate - request.Renting.PickUpDate).TotalDays * (decimal)vehicle.PriceADay;

                rentACarService.TotalProfit += (decimal)rentingTotalProfit;
                UserVehicleRenting renting = new UserVehicleRenting{
                    FullRentingPrice = rentingTotalProfit,
                    CarGrade = Grade.NO_GRADE,
                    RentACarServiceGrade = Grade.NO_GRADE,
                };
                _mapper.Map(request.Renting,renting);
                
                _context.Rentings.Add(renting);
                var result = await _context.SaveChangesAsync() > 0;

                return result != false
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure("Failed to create Renting record");
            }
        }
    }
}