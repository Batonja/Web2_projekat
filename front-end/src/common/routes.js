import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Flight from "../components/Flight/Flight";
import Hotel from "../components/Hotel/Hotel";
import Car from "../components/Car/Car";
export function Routes() {
  return (
    <Switch>
      <Route path="/flights" component={Flight} />
      <Route path="/hotels" component={Hotel} />
      <Route path="/cars" component={Car} />
    </Switch>
  );
}
