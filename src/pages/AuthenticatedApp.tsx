import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { NewDugnadPage } from "./NewDugnadPage";
import { DugnadPage } from "./DugnadPage";
import { OverviewPage } from "./OverviewPage";

type AuthenticatedAppProps = {};

export const AuthenticatedApp: React.FC<AuthenticatedAppProps> = props => {
  return (
    <Switch>
      <Route path="/ny">
        <NewDugnadPage />
      </Route>
      <Route path="/dugnad/:id">
        <DugnadPage />
      </Route>
      <Route path="/" exact>
        <OverviewPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
