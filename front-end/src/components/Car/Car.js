import React, { Component,Fragment } from "react";
import RegistrationForm from '../AccountForms/RegistrationForm'
import AddVehicleForm from './Forms/AddVehicleForm'


class Car extends Component {
  render() {
    return (
      <div>
        <h3>Cars Page</h3>
        <AddVehicleForm/>
      </div>
    );

  }
}

export default Car;
