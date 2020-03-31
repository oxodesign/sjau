import React from "react";
import { Switch, Route } from "react-router-dom";
import { LandingPage } from "./LandingPage";
import { Authenticator } from "aws-amplify-react";

export const OpenApp: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <LandingPage />
      </Route>
      <Route path="/ny">
        <Authenticator />
      </Route>
    </Switch>
  );
};
