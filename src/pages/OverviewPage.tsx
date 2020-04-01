import React, { FormEvent } from "react";
import { useAuth } from "reactfire";
import { useUser } from "../hooks/useUser";
import { FillOutUserDetails } from "../components/FillOutUserDetails";
import { Link } from "react-router-dom";

export const OverviewPage: React.FC = () => {
  const auth = useAuth();
  const user = useUser();
  const handleLogoutClick = async (e: FormEvent) => {
    e.preventDefault();
    await auth.signOut();
  };
  return (
    <div>
      {!user && <FillOutUserDetails />}
      {user && (
        <>
          <h2>{user.name}</h2>
          <p>Her kan du gjøre hva du vil</p>
          <Link to="/ny">Lag ny dugnad</Link>
        </>
      )}
      <div>
        <button onClick={handleLogoutClick}>Logg ut</button>
      </div>
    </div>
  );
};
