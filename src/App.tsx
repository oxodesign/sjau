import React from "react";
import awsconfig from "./aws-exports";
import Amplify from "aws-amplify";
import { AuthenticatedApp } from "./pages/AuthenticatedApp";
import { Authenticator } from "aws-amplify-react";

Amplify.configure(awsconfig);
const signUpConfig = {
  header: "Bli med du også!",
  defaultCountryCode: "47"
};

function App() {
  return (
    <div className="App">
      <Authenticator
        authState="signUp"
        usernameAttributes={"phone_number" as any}
        signUpConfig={signUpConfig}
      >
        <AuthenticatedApp />
      </Authenticator>
    </div>
  );
}

export default App;
