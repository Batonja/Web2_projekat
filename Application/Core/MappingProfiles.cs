using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Vehicle, Vehicle>();
            CreateMap<RentACarService,RentACarService>();
        }
    }
}