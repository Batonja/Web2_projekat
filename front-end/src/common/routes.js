import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Flight from "../components/Flight/Flight";
import Hotel from "../components/Hotel/Hotel";
import Car from "../components/Car/Car";
import Home from "../components/Home";
import Airlines from "../components/Flight/Airlines";
import RegistrationForm from "../components/AccountForms/RegistrationForm";
import LoginForm from "../components/AccountForms/LoginForm";

export function Routes() {
  return (
    <Switch>
      <Route path="/flights" component={Flight} />
      <Route path="/hotels" component={Hotel} />
      <Route path="/cars" component={Car} />
      <Route path="/flights/airlines" component={Airlines} />
      {/* <Route path="/account" component={Account}/> */}
      <Route path="/signin" component={LoginForm} />
      <Route path="/signup" component={RegistrationForm} />
      <Route path="/" component={Home} />
    </Switch>
  );
}
