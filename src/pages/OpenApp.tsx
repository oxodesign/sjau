import React from "react";
import { Switch, Route } from "react-router-dom";
import { LandingPage } from "./LandingPage";
import { RegisterPage } from "./RegisterPage";

export const OpenApp: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <LandingPage />
      </Route>
      <Route path="/login">
        <RegisterPage />
      </Route>
    </Switch>
  );
};
