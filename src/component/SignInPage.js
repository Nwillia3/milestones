
import React, { useState, useContext } from "react"
import Firebase from "./Firebase";
import { Field } from 'react-final-form'
import Wizard from './Wizard'
import SessionContext from "./Session"


const SignInWithGoogleButton = () => (
    <React.Fragment>
      <link type="text/css" rel="stylesheet" href="https://cdn.firebase.com/libs/firebaseui/4.2.0/firebaseui.css" />
      <button
        class="shadow firebaseui-idp-button mdl-button mdl-js-button firebaseui-idp-google firebaseui-id-idp-button"
      >
        <span class="firebaseui-idp-icon-wrapper">
          <img class="firebaseui-idp-icon" alt="" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" />
        </span>
        <span class="firebaseui-idp-text firebaseui-idp-text-long">Sign in with Google</span>
      </button>
    </React.Fragment>
)


const ERROR_CODE_ACCOUNT_EXISTS =
    'auth/account-exists-with-different-credential';

const ERROR_MSG_ACCOUNT_EXISTS = `
    An account with an E-Mail address to
    this social account already exists. Try to login from
    this account instead and associate your social accounts on
    your personal account page.
`;

const Error = ({ name }) => (
  <Field
    name={name}
    subscribe={{ touched: true, error: true }}
    render={({ meta: { touched, error } }) =>
      touched && error ? <span>{error}</span> : null
    }
  />
)

const required = value => (value ? undefined : 'Required')

function SignInPage(props) {
  const { setUser } = useContext(SessionContext)

  const onSubmit = values => {
     const { username } = values

      Firebase
        .doSignInWithGoogle()
        .then(async (socialAuthUser) => {
  
          const uid = socialAuthUser.user.uid
          const docRef = Firebase.fdb.collection("users").doc(uid)
  
          try {
            let doc = await docRef.get()
            if (doc.exists) {
              console.log("Document data:", doc.data());

              setUser(doc.data())
              
              props.history.push(`/${doc.data().username}`)
    
            } else {
                // doc.data() will be undefined in this case

                await Firebase.fdb.collection("users").doc(uid).set({
                  uid: socialAuthUser.user.uid,
                  email: socialAuthUser.user.email,
                  displayName: socialAuthUser.user.displayName,
                  username: username,
                });


                doc = await docRef.get()
  
                console.log("No such document exists!");
                console.log("User created!", doc.data());

                setUser(doc.data())

                props.history.push(`/${doc.data().username}`)

            }
  
          } catch (error) {
            console.log("Error getting document:", error);
  
          }
    
  
        })
        .catch(error => {
          if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
            error.message = ERROR_MSG_ACCOUNT_EXISTS;
          }
  
        });
  
    };
    
    return (
      <React.Fragment>
        <div class="flex justify-center items-center h-screen">
          <Wizard
            initialValues={{ 
              username: ""
            }}
            onSubmit={onSubmit}
            enableSocialProviders={true}
          >
            <Wizard.Page
              validate={values => {
                const errors = {}
                if (!values.username) {
                  errors.username = 'Required'
                }
                return errors
              }}
            >
              <div class="pt-6">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Username
                </label>
                <Field
                  name="username"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  component="input"
                  type="text"
                  placeholder="Pick a username"
                  validate={required}
                />
                <Error name="username" />
              </div>
            </Wizard.Page>

            <Wizard.Page>
              <div class="py-4">
                <SignInWithGoogleButton />
              </div>
            </Wizard.Page>
          </Wizard>
          
        </div>
      </React.Fragment>
    );
}


export default SignInPage
