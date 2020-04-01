import React, { FormEvent } from "react";
import { useAuth } from "reactfire";

export const OverviewPage: React.FC = () => {
  const auth = useAuth();
  const handleLogoutClick = async (e: FormEvent) => {
    e.preventDefault();
    await auth.signOut();
  };
  return (
    <div>
      <h1>Du er logget inn!</h1>
      <button onClick={handleLogoutClick}>Logg ut</button>
    </div>
  );
};
