using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Renting.DTOs;
using AutoMapper;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Renting
{
    public class CreateReview
    {
        public class Command : IRequest<Result<Unit>>
        {
            //Props
            public ReviewDTO Review { get; set; }
            public string AppUserId { get; set; }
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
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var renting = await _context.Rentings.FindAsync(request.Review.UserVehicleRentingId);
                if (renting == null) return Result<Unit>.Failure("Failed to review renting.");
                //Check if return date has passed
                if(renting.AppUserId != request.AppUserId) return Result<Unit>.Failure("Tried to access someone else's renting review.");
                if (renting.ReturnDate < DateTime.Now && !renting.IsCanceled && !renting.IsReviewed)
                {
                    
                    _mapper.Map(request.Review, renting);
                    renting.IsReviewed = true;
                    //Calculate Car Average Grade
                    var vehicle = await _context.Vehicles.FindAsync(renting.VehicleId);
                    decimal sumGradesV = vehicle.AverageCarGrade * vehicle.NumberOfRentings;
                    vehicle.NumberOfRentings++;
                    decimal avgGradesV = (sumGradesV + (decimal)request.Review.CarGrade) / vehicle.NumberOfRentings;
                    vehicle.AverageCarGrade = avgGradesV;
                    //Calculate Rent A Car Service Average Grade
                    var rentACarService = await _context.RentACarServices.FindAsync(vehicle.RentACarServiceOwnerId);
                    decimal sumGradesRACS = vehicle.AverageCarGrade * vehicle.NumberOfRentings;
                    rentACarService.NumberOfGrades++;
                    decimal avgGradesRACS = (sumGradesRACS + (decimal)request.Review.CarGrade) / vehicle.NumberOfRentings;
                    vehicle.AverageCarGrade = avgGradesRACS;
                
                }else{
                    return Result<Unit>.Failure("Failed to create review.This renting have been canceled or already reviewed.");
                }


                var result = await _context.SaveChangesAsync() > 0;

                return result != false
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure("Failed to create review");
            }
        }
    }
}