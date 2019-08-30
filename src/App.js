import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./component/Landing";
import Product from "./component/Product";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Landing} />
      <Route exact path="/product" component={Product} />
    </Router>
  );
}

export default App;
