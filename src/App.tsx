import React from "react";
import { Switch, Redirect, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { NewDugnadPage } from "./pages/NewDugnadPage";
import { DugnadPage } from "./pages/DugnadPage";
import { OverviewPage } from "./pages/OverviewPage";
import { TaskPage } from "./pages/TaskPage";
import { AnimatedRoute } from "./components/AnimatedRoute";
import { LandingPage } from "./pages/LandingPage";
import { useAnalytics } from "reactfire";

export const App: React.FC = () => {
  useAnalytics();
  const location = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <>
      <main>
        <AnimatePresence>
          <Switch>
            <AnimatedRoute exact path="/ny" requiresAuth>
              <NewDugnadPage />
            </AnimatedRoute>
            <AnimatedRoute exact path="/dugnad/:dugnadId/:taskId" requiresAuth>
              <TaskPage />
            </AnimatedRoute>
            <AnimatedRoute exact path="/dugnad/:dugnadId" requiresAuth>
              <DugnadPage />
            </AnimatedRoute>
            <AnimatedRoute exact path="/oversikt" requiresAuth>
              <OverviewPage />
            </AnimatedRoute>
            <AnimatedRoute exact path="/">
              <LandingPage />
            </AnimatedRoute>
            <Redirect to="/" />
          </Switch>
        </AnimatePresence>
      </main>
    </>
  );
};

export default App;
