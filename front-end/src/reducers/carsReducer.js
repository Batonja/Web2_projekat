initialState = {
    rentacarServices: [
        {
            Administrator:{
                FirstName: "Stepa",
                LastName: "Stepanovic",
                Email: "thestepa@gmail.com",
                Password: "test",
                Address: "Zmaj Jove 13",
                Friends: ["mileta@bode.com", "zivkozivkic@yahoo.com"],
                Phone: "062214141",
            },
            Title: "EuroCar",
            Address: "Majora Gravrilovica 34",
            State: "Serbia",
            City: "Novi Sad",
            Description: "Cheap and safe new car for your travel",
            Pricelist: [],
            Vehicles: [
                {
                    Id: 1,
                    CarModel: "GT Mustang 56",
                    RegistrationNumber: "NS-123-123",
                    NumberOfSeats: 4,
                    NumberOfDoors: 4,
                    Image: '',
                    AvailableNow: true,
                    deleted: false,
                    AverageCarGrade: 4
                },
                {
                    Id: 2,
                    CarModel: "Audi TT",
                    RegistrationNumber: "NS-124-124",
                    NumberOfSeats: 4,
                    NumberOfDoors: 4,
                    Image: '',
                    AvailableNow: true,
                    deleted: false,
                    AverageCarGrade: 4
                },
                {
                    Id: 2,
                    CarModel: "Toyota Hybrid C-HR",
                    RegistrationNumber: "NS-124-124",
                    NumberOfSeats: 4,
                    NumberOfDoors: 4,
                    Image: '',
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
            AverageGrade: 12,
        },
    ]
    
}
export default function userReducer(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}




