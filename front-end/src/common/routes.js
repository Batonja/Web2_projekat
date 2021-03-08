import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Car from "../components/Car/Car";
import Home from "../components/Home";
import Account from "../components/AccountForms/Account";
import RegistrationForm from "../components/AccountForms/RegistrationForm";
import LoginForm from "../components/AccountForms/LoginForm";
import CarServices from '../components/Car/Utilities/RentACarServices'
import CarAdminHome from '../components/Car/Admin/CarAdminHome'
import "../App.css";

export function Routes() {
  return (
    <Switch>
      
      <Route path="/cars" component={Car} />
      <Route path="/carservices" component={CarServices} />
      <Route path="/cars-admin-home"  component={CarAdminHome}/>
      
      <Route path="/account" component={Account} />
      <Route path="/signIn" component={LoginForm} />
      <Route path="/signUp" component={RegistrationForm} className="forms" />
      <Route path="/"  component={Home} />

    </Switch>
  );
}
