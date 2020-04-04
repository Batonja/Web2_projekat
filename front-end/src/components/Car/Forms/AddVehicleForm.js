import React, { Component } from 'react'
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";
import '../../../App.css'

export default class VehicleForm extends Component {

    state = {
        Id: -1,
        CarModel: "",
        RegistrationNumber: "",
        NumberOfSeats: "",
        NumberOfDoors: "",
        AvailableNow: true,
    }

    handleSubmit = (e) => {
        e.preventDefault();

    }


    handleChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    };

    render() {
        return (
            <div className="cars-form-div">
                <div className ="forms-in-cars">
                    <div className="form-text-field">
                        <h3>Add Vehicle</h3>
                    </div>
                    <ValidatorForm
                        onSubmit={this.handleSubmit}
                        onError={errors => console.log(errors)}
                    >

                        <div className="form-text-field">
                            <TextValidator
                                margin="normal"
                                label="Car Model"
                                onChange={this.handleChange}
                                name="CarModel"
                                value={this.state.CarModel}
                            // validators={["required", "isEmail", "isExistingUser"]}
                            // errorMessages={[
                            //   "this field is required",
                            //   "email is not valid",
                            //   "user with this email already exists"
                            // ]}
                            />
                        </div>
                        <div className="form-text-field">
                            <TextValidator
                                margin="normal"
                                label="Registration Number"
                                onChange={this.handleChange}
                                name="RegistrationNumber"
                                value={this.state.RegistrationNumber}
                            // validators={["required", "isEmail", "isExistingUser"]}
                            // errorMessages={[
                            //   "this field is required",
                            //   "email is not valid",
                            //   "user with this email already exists"
                            // ]}
                            />
                        </div>
                        <div className="form-text-field">
                            <TextValidator
                                margin="normal"
                                label="Number Of Seats"
                                onChange={this.handleChange}
                                name="NumberOfSeats"
                                value={this.state.NumberOfSeats}
                            // validators={["required", "isEmail", "isExistingUser"]}
                            // errorMessages={[
                            //   "this field is required",
                            //   "email is not valid",
                            //   "user with this email already exists"
                            // ]}
                            />
                        </div>

                        <div className="form-text-field">
                            <div>
                                <Button type="submit" variant="contained" color="primary">
                                    Add
                                    </Button>
                            </div>
                        </div>
                        <br />
                    </ValidatorForm>
                    </div>
            </div>

        )
    }
}
