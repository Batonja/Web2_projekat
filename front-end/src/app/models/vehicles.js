export class Vehicle {
    constructor(
        id,
        carModel,
        priceADay,
        registrationNumber,
        numberOfSeats,
        numberOfDoors,
        numberOfSuitcases,
        gearboxType,
        isAirCondition,
        image,
        isAvailableNow,
        isDeleted,
        averageCarGrade,
        numberOfRentings,
        totalProfit,
        userVehicleRentings,
        rentACarServiceOwnerId,
        rentACarServiceOwner
    ) {
        this.id = id
        this.carModel =  carModel
        this.priceADay = priceADay
        this.registrationNumber =registrationNumber
        this.numberOfSeats = numberOfSeats
        this.numberOfDoors =numberOfDoors
        this.numberOfSuitcases = numberOfSuitcases
        this.gearboxType = gearboxType
        this.isAirCondition = isAirCondition
        this.image = image
        this.isAvailableNow = isAvailableNow
        this.isDeleted = isDeleted
        this.averageCarGrade = averageCarGrade
        this. numberOfRentings = numberOfRentings
        this.  totalProfit = totalProfit
        this. userVehicleRentings = userVehicleRentings
        this. rentACarServiceOwnerId = rentACarServiceOwnerId
        this. rentACarServiceOwner = rentACarServiceOwner
    }

}

