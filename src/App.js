import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import SignInPage from "./component/SignInPage"
import UserHomePage from "./component/UsersHomePage"
import SessionContext from "./component/Session"
import HomePage from "./component/Home";
import Firebase from "./component/Firebase"
import { useAuthState } from 'react-firebase-hooks/auth';

const getUser = async (socialAuthUser, fn) => {
  const uid = socialAuthUser.uid
  const docRef = Firebase.fdb.collection("users").doc(uid)

  try {
    let doc = await docRef.get()
    if (doc.exists) {
      console.log("Document data:", doc.data());

      debugger

      if(typeof fn !== undefined) {
        fn(doc.data())
      }
    }

  } catch (error) {
    console.log("Error getting document:", error);

  }
  
}

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const { setUser } = useContext(SessionContext)
  const [socialAuthUser, initialising, error] = useAuthState(Firebase.auth);

  if (initialising) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }

  if (socialAuthUser) {
    getUser(socialAuthUser, setUser)

    return <Component />
  }

  return <Redirect to="/login" />;
};


function App() {
  const [state, setState] = useState({
    user: undefined,
    setUser: (value) => setState({ user: value })
  })

  // const [socialAuthUser, initialising, error] = useAuthState(Firebase.auth);
  // console.log("App: ", socialAuthUser)
  // console.log("App: typeof/setUser: ", typeof state.setUser)



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