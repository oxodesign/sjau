import React, { FormEvent } from "react";
import { useAuth } from "reactfire";
import { useUser } from "../hooks/useUser";
import { FillOutUserDetails } from "../components/FillOutUserDetails";

export const OverviewPage: React.FC = () => {
  const auth = useAuth();
  const user = useUser();
  const handleLogoutClick = async (e: FormEvent) => {
    e.preventDefault();
    await auth.signOut();
  };
  return (
    <div>
      <h1>Du er logget inn!</h1>
      {!user && <FillOutUserDetails />}
      {user && <h2>{user.name}</h2>}
      <button onClick={handleLogoutClick}>Logg ut</button>
    </div>
  );
};
