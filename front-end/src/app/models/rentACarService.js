
export class RentACarService {
    constructor(rentACarServiceId, name, description, averageGrade, numberOfGrades, address, state, city, totalProfit, managers, vehicles, branchOffices) {
        this.rentACarServiceId = rentACarServiceId
        this.name = name
        this.description = description
        this.averageGrade = averageGrade
        this.numberOfGrades = numberOfGrades
        this.address = address
        this.state = state
        this.city = city
        this.totalProfit = totalProfit
        this.managers = managers
        this.vehicles = vehicles
        this.branchOffices = branchOffices
    }
}