const initialState = {
    rentACarServices: [
        {
            Administrator: {
                FirstName: "Stepa",
                LastName: "Stepanovic",
                Email: "thestepa@gmail.com",
                Password: "test",
                Address: "Zmaj Jove 13",
                Friends: ["mileta@bode.com", "zivkozivkic@yahoo.com"],
                Phone: "062214141",
            },
            Title: "EuroCar",
            Address: "Danila Kisa 34",
            State: "Serbia",
            City: "Novi Sad",
            Stations: ["Novi Sad, Zeleznicka stanica", 'Beograd Aerodrom', 'Nis, Aerodrom', 'Subotica, Palic',],
            Description: "Cheap and safe new car for your travel",
            Pricelist: [],
            Vehicles: [
                {
                    Id: 1,
                    CarModel: "GT Mustang 56",
                    PriceADay: 150,
                    RegistrationNumber: "NS-123-123",
                    NumberOfSeats: 5,
                    NumberOfDoors: 5,
                    NumberOfSuitcases: 2,
                    CoolingType: "Aircondition",
                    GearboxType: "Automatic",
                    Aircondition: true,
                    Image: '',
                    AvailableNow: true,
                    deleted: false,
                    AverageCarGrade: 4
                },
                {
                    Id: 2,
                    CarModel: "Audi TT",
                    PriceADay: 350,
                    RegistrationNumber: "NS-124-124",
                    NumberOfSeats: 4,
                    NumberOfDoors: 4,
                    NumberOfSuitcases: 2,
                    CoolingType: "Aircondition",
                    GearboxType: "Automatic",
                    Aircondition: true,
                    Image: '',
                    AvailableNow: true,
                    deleted: false,
                    AverageCarGrade: 4
                },
                {
                    Id: 3,
                    CarModel: "Toyota Hybrid C-HR",
                    PriceADay: 140,
                    RegistrationNumber: "NS-124-124",
                    NumberOfSeats: 4,
                    NumberOfDoors: 4,
                    GearboxType: "Automatic",
                    NumberOfSuitcases: 2,
                    CoolingType: "Aircondition",
                    Image: '',
                    Aircondition: true,
                    AvailableNow: true,
                    deleted: false,
                    AverageCarGrade: 4
                }
            ],
            BranchOffices: [
                {
                    Id: 1,
                    Title: "Dan's Car Vehicles",
                    City: "Novi Sad",
                    Manager: "Callahan Harry"
                }
            ],
            Grades: [5, 4, 2, 1],
            AverageGrade: 4,
        },
        {
            Administrator: {
                FirstName: "Stepa",
                LastName: "Stepanovic",
                Email: "thestepa@gmail.com",
                Password: "test",
                Address: "Zmaj Jove 13",
                Friends: ["mileta@bode.com", "zivkozivkic@yahoo.com"],
                Phone: "062214141",
            },
            Title: "Your Car",
            Address: "Diane Budisavljevic 43",
            State: "Serbia",
            City: "Belgrade",
            Stations: ["Novi Sad, Zeleznicka stanica", 'Beograd Aerodrom', 'Nis, Aerodrom', 'Subotica, Palic',],
            Description: "Drive safe with us",
            Pricelist: [],
            Vehicles: [
                {
                    Id: 1,
                    CarModel: "GT Mustang 56",
                    PriceADay: 150,
                    RegistrationNumber: "NS-123-123",
                    NumberOfSeats: 5,
                    NumberOfDoors: 5,
                    NumberOfSuitcases: 2,
                    CoolingType: "Aircondition",
                    GearboxType: "Automatic",
                    Aircondition: true,
                    Image: '',
                    AvailableNow: true,
                    deleted: false,
                    AverageCarGrade: 4
                },
                {
                    Id: 2,
                    CarModel: "Audi TT",
                    PriceADay: 350,
                    RegistrationNumber: "NS-124-124",
                    NumberOfSeats: 4,
                    NumberOfDoors: 4,
                    NumberOfSuitcases: 2,
                    CoolingType: "Aircondition",
                    GearboxType: "Automatic",
                    Aircondition: true,
                    Image: '',
                    AvailableNow: true,
                    deleted: false,
                    AverageCarGrade: 4
                },
                {
                    Id: 2,
                    CarModel: "Toyota Hybrid C-HR",
                    PriceADay: 140,
                    RegistrationNumber: "NS-124-124",
                    NumberOfSeats: 4,
                    NumberOfDoors: 4,
                    GearboxType: "Automatic",
                    NumberOfSuitcases: 2,
                    CoolingType: "Aircondition",
                    Image: '',
                    Aircondition: true,
                    AvailableNow: true,
                    deleted: false,
                    AverageCarGrade: 4
                }
            ],
            BranchOffices: [
                {
                    Id: 1,
                    Title: "Dan's Car Vehicles",
                    City: "Novi Sad",
                    Manager: "Callahan Harry"
                }
            ],
            Grades: [3,3,3],
            AverageGrade: 3,
        },
        {
            Administrator: {
                FirstName: "Stepa",
                LastName: "Stepanovic",
                Email: "thestepa@gmail.com",
                Password: "test",
                Address: "Zmaj Jove 13",
                Friends: ["mileta@bode.com", "zivkozivkic@yahoo.com"],
                Phone: "062214141",
            },
            Title: "Car Solution",
            Address: "Milunke Savic 65",
            State: "Serbia",
            City: "Nis",
            Stations : ["Novi Sad, Zeleznicka stanica", 'Beograd Aerodrom', 'Nis, Aerodrom', 'Subotica, Palic',],
            Description: "Be sure and safe with us",
            Pricelist: [],
            Vehicles: [
                {
                    Id: 1,
                    CarModel: "GT Mustang 56",
                    PriceADay: 150,
                    RegistrationNumber: "NS-123-123",
                    NumberOfSeats: 5,
                    NumberOfDoors: 5,
                    NumberOfSuitcases: 2,
                    CoolingType: "Aircondition",
                    GearboxType: "Automatic",
                    Aircondition: true,
                    Image: '',
                    AvailableNow: true,
                    deleted: false,
                    AverageCarGrade: 4
                },
                {
                    Id: 2,
                    CarModel: "Audi TT",
                    PriceADay: 350,
                    RegistrationNumber: "NS-124-124",
                    NumberOfSeats: 4,
                    NumberOfDoors: 4,
                    NumberOfSuitcases: 2,
                    CoolingType: "Aircondition",
                    GearboxType: "Automatic",
                    Aircondition: true,
                    Image: '',
                    AvailableNow: true,
                    deleted: false,
                    AverageCarGrade: 4
                },
                {
                    Id: 2,
                    CarModel: "Toyota Hybrid C-HR",
                    PriceADay: 140,
                    RegistrationNumber: "NS-124-124",
                    NumberOfSeats: 4,
                    NumberOfDoors: 4,
                    GearboxType: "Automatic",
                    NumberOfSuitcases: 2,
                    CoolingType: "Aircondition",
                    Image: '',
                    Aircondition: true,
                    AvailableNow: true,
                    deleted: false,
                    AverageCarGrade: 4
                }
            ],
            BranchOffices: [
                {
                    Id: 1,
                    Title: "Dan's Car Vehicles",
                    City: "Novi Sad",
                    Manager: "Callahan Harry"
                }
            ],
            Grades: [5, 5, 5, 5],
            AverageGrade: 5,
        },
        {
            Administrator: {
                FirstName: "Stepa",
                LastName: "Stepanovic",
                Email: "thestepa@gmail.com",
                Password: "test",
                Address: "Zmaj Jove 13",
                Friends: ["mileta@bode.com", "zivkozivkic@yahoo.com"],
                Phone: "062214141",
            },
            Title: "Express Car",
            Address: "Sarganska 432",
            State: "Serbia",
            City: "Nis",
            Stations : ["Novi Sad, Zeleznicka stanica", 'Beograd Aerodrom', 'Nis, Aerodrom', 'Subotica, Palic',],
            Description: "Drive smart and cheap with us",
            Pricelist: [],
            Vehicles: [
                {
                    Id: 1,
                    CarModel: "GT Mustang 56",
                    PriceADay: 150,
                    RegistrationNumber: "NS-123-123",
                    NumberOfSeats: 5,
                    NumberOfDoors: 5,
                    NumberOfSuitcases: 2,
                    CoolingType: "Aircondition",
                    GearboxType: "Automatic",
                    Aircondition: true,
                    Image: '',
                    AvailableNow: true,
                    deleted: false,
                    AverageCarGrade: 4
                },
                {
                    Id: 2,
                    CarModel: "Audi TT",
                    PriceADay: 350,
                    RegistrationNumber: "NS-124-124",
                    NumberOfSeats: 4,
                    NumberOfDoors: 4,
                    NumberOfSuitcases: 2,
                    CoolingType: "Aircondition",
                    GearboxType: "Automatic",
                    Aircondition: true,
                    Image: '',
                    AvailableNow: true,
                    deleted: false,
                    AverageCarGrade: 4
                },
                {
                    Id: 2,
                    CarModel: "Toyota Hybrid C-HR",
                    PriceADay: 140,
                    RegistrationNumber: "NS-124-124",
                    NumberOfSeats: 4,
                    NumberOfDoors: 4,
                    GearboxType: "Automatic",
                    NumberOfSuitcases: 2,
                    CoolingType: "Aircondition",
                    Image: '',
                    Aircondition: true,
                    AvailableNow: true,
                    deleted: false,
                    AverageCarGrade: 4
                }
            ],
            BranchOffices: [
                {
                    Id: 1,
                    Title: "Dan's Car Vehicles",
                    City: "Novi Sad",
                    Manager: "Callahan Harry"
                }
            ],
            Grades: [1, 2, 2, 1],
            AverageGrade: 2,
        },
    ]

}
export default function userReducer(state = initialState, action) {

    switch (action.type) {
        default:
            return state;
    }
}




