import React from "react";
import { RouteProps, Route } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthCheck } from "reactfire";
import { LoginPage } from "../pages/LoginPage";
import { SiteHeader } from "./SiteHeader";

type AnimatedRouteProps = RouteProps & {
  requiresAuth?: boolean;
};
export const AnimatedRoute: React.FC<AnimatedRouteProps> = ({
  children,
  requiresAuth = false,
  ...rest
}) => {
  return (
    <Route {...rest}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        key={rest.path as string}
      >
        {requiresAuth ? (
          <AuthCheck fallback={<LoginPage />}>
            <SiteHeader />
            {children}
          </AuthCheck>
        ) : (
          children
        )}
      </motion.div>
    </Route>
  );
};
