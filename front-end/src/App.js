import React from "react";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import { Routes } from "./common/routes";
import { BrowserRouter as Router} from "react-router-dom";

function App() {
  return (
    <Router>
 
      <Navigation />
      <Routes />
      <Footer />
    </Router>
  );
}

export default App;
