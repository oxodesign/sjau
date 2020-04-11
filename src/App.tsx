import React from "react";
import { Switch, Redirect, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AnimatedRoute } from "./components/AnimatedRoute";
import { useAnalytics } from "reactfire";

const NewDugnadPage = React.lazy(() => import("./pages/NewDugnadPage"));
const DugnadPage = React.lazy(() => import("./pages/DugnadPage"));
const OverviewPage = React.lazy(() => import("./pages/OverviewPage"));
const TaskPage = React.lazy(() => import("./pages/TaskPage"));
const LandingPage = React.lazy(() => import("./pages/LandingPage"));
const PrivacyPage = React.lazy(() => import("./pages/PrivacyPage"));

export const App: React.FC = () => {
  useAnalytics();
  const location = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <>
      <AnimatePresence>
        <Switch>
          <AnimatedRoute exact path="/ny" requiresAuth>
            <NewDugnadPage />
          </AnimatedRoute>
          <AnimatedRoute exact path="/sjau/:dugnadId/:taskId" requiresAuth>
            <TaskPage />
          </AnimatedRoute>
          <AnimatedRoute exact path="/sjau/:dugnadId" requiresAuth>
            <DugnadPage />
          </AnimatedRoute>
          <AnimatedRoute exact path="/oversikt" requiresAuth>
            <OverviewPage />
          </AnimatedRoute>
          <AnimatedRoute exact path="/personvern">
            <PrivacyPage />
          </AnimatedRoute>
          <AnimatedRoute exact path="/">
            <LandingPage />
          </AnimatedRoute>
          <Redirect from="/dugnad/*" to="/sjau/*" />
          <Redirect to="/" />
        </Switch>
      </AnimatePresence>
    </>
  );
};

export default App;
