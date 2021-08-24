import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import AboutUs from "./components/pages/AboutUs";
import Listings from "./components/pages/Listings";
import Apply from "./components/pages/Apply";
import Footer from "./components/Footer";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/listings" component={Listings} />
          <Route path="/about-us" component={AboutUs} />
          <Route path="/apply" component={Apply} />
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
