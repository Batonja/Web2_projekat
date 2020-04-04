initialState = {
    rentacarServices: [
        {
            Title: "EuroCar",
            Address: "Majora Gravrilovica 34",
            Description: "Cheap and safe new car for your travel",
            Pricelist: [],
            Vehicles: [
                {
                    Id: 1,
                    CarModel: "GT Mustang 56",
                    RegistrationNumber: "NS-123-123",
                    NumberOfSeats: 4,
                    NumberOfDoors: 4,
                    AvailableNow: true,
                    deleted: false,
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
        }  
    ]
    
}
export default function userReducer(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}




