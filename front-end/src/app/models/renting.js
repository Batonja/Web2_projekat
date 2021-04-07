import { v4 as uuidv4 } from 'uuid';

export class Renting {
    constructor(appUserId, vehicleId, pickUpDate, returnDate, pickupPlaceId, returnPlaceId, userVehicleRentingId = uuidv4()) {
        this.userVehicleRentingId = userVehicleRentingId
        this.appUserId = appUserId
        this.vehicleId = vehicleId
        this.pickUpDate = pickUpDate
        this.returnDate = returnDate
        this.pickupPlaceId = pickupPlaceId
        this.returnPlaceId = returnPlaceId
    }
}

export class SearchParametars {
    constructor(rentACarServiceId,
        pickUpDate,
        returnDate,
        minPrice,
        maxPrice,
        numberOfPassangers,) {

        this.rentACarServiceId = rentACarServiceId
        this.pickUpDate = pickUpDate
        this.returnDate = returnDate
        this.minPrice = minPrice
        this.maxPrice = maxPrice
        this.numberOfPassangers = numberOfPassangers
    }

}