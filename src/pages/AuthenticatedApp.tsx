import React from "react";
import { Switch, Route } from "react-router-dom";
import { NewDugnadPage } from "./NewDugnadPage";
import { DugnadPage } from "./DugnadPage";
import { LandingPage } from "./LandingPage";
import { Authenticator } from "aws-amplify-react";

const signUpConfig = {
  header: "Bli med du også!",
  defaultCountryCode: "47"
};

type AuthenticatedAppProps = {
  authState?: string;
  user: any;
};

export const AuthenticatedApp: React.FC<AuthenticatedAppProps> = props => {
  return (
    <Authenticator
      authData={props.user}
      usernameAttributes={"phone_number" as any}
    >
      <Switch>
        <Route path="/ny">
          <NewDugnadPage />
        </Route>
        <Route path="/dugnad/:id">
          <DugnadPage />
        </Route>
        <Route path="/" exact>
          <LandingPage />
        </Route>
      </Switch>
    </Authenticator>
  );
};
