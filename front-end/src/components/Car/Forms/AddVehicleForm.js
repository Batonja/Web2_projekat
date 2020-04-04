import React, { Component } from 'react'
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";
import { Input } from '@material-ui/core';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';


import '../../../App.css'


export default class VehicleForm extends Component {

    state = {
        Id: -1,
        CarModel: "",
        RegistrationNumber: "",
        NumberOfSeats: "",
        NumberOfDoors: "",
        AvailableNow: true,
        Image: ''
    }

    handleSubmit = (e) => {
        e.preventDefault();

    }


    handlePreview = (e) => {
        e.preventDefault();

        let file = e.target.files[0];
        let reader = new FileReader();

        if (e.target.files.length === 0) {
            return;
        }

        reader.onloadend = (e) => {
            this.setState({
                Image: [reader.result]
            });
        }

        reader.readAsDataURL(file);
    }

    handleChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    };

    render() {
        return (
            <div id="form-container">
                <div className="forms-in-cars">
                <h3> Car Preview</h3>
                    <Button
                        component="label"
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<AddAPhotoIcon />}
                    >
                        Upload image
                    <input type="file" style={{ display: "none" }} onChange={this.handlePreview} />
                    </Button>

                   
                    <div >
                        {
                            (this.state.Image === "")
                                ? (
                                    <img src={require('../template-images/add-car-form.png')} alt="" className="car-image" />
                                ) : (
                                    <img src={this.state.Image} alt="" className="car-image" />
                                )
                        }

                    </div>
                </div>

                <div className="forms-in-cars">
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
