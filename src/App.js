import React from "react";
import Chat from "./components/Chat";
import Join from "./components/Join";
import SignUp from "../src/components/SignUp";
import { HashRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router className="App">
      <Route path="/" exact component={Join} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/chat" component={Chat} />
    </Router>
  );
};

export default App;

