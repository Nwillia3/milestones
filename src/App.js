import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import SignInPage from "./component/SignInPage"
import UserHomePage from "./component/UsersHomePage"
import SessionContext from "./component/Session"
import HomePage from "./component/Home";


const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const { user } = useContext(SessionContext)

  if (!user) {
    return <Redirect to="/login" />;
  }

  return <Component />;
};


function App() {
  const [state, setState] = useState({
    user: undefined,
    setUser: (value) => setState({ user: value })
  })

  return (
    <React.Fragment>
      <SessionContext.Provider value={state}>
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={SignInPage} />
            <PrivateRoute path="/:username" component={UserHomePage} />
          </Switch>
        </Router>
      </SessionContext.Provider>
    </React.Fragment>
  );
}

export default App;