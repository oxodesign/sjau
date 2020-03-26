import React from "react";
import { Switch, Route } from "react-router-dom";
import { NewDugnadPage } from "./NewDugnadPage";
import { DugnadPage } from "./DugnadPage";
import { LandingPage } from "./LandingPage";

type AuthenticatedAppProps = {
  authState?: string;
};

export const AuthenticatedApp: React.FC<AuthenticatedAppProps> = props => {
  if (props.authState !== "signedIn") {
    return null;
  }
  return (
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
  );
};
