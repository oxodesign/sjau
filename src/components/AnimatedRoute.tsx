import React from "react";
import { RouteProps, Route } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthCheck } from "reactfire";
import { Login } from "./Login";
import { FillOutUserDetails } from "./FillOutUserDetails";

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
          <AuthCheck fallback={<Login />}>
            <FillOutUserDetails>{children}</FillOutUserDetails>
          </AuthCheck>
        ) : (
          children
        )}
      </motion.div>
    </Route>
  );
};
