import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { NewDugnadPage } from "./NewDugnadPage";
import { DugnadPage } from "./DugnadPage";
import { OverviewPage } from "./OverviewPage";
import { TaskPage } from "./TaskPage";

export const AuthenticatedApp: React.FC = () => {
  return (
    <Switch>
      <Route path="/ny">
        <NewDugnadPage />
      </Route>
      <Route exact path="/dugnad/:dugnadId/:taskId">
        <TaskPage />
      </Route>
      <Route exact path="/dugnad/:dugnadId">
        <DugnadPage />
      </Route>
      <Route exact path="/">
        <OverviewPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
