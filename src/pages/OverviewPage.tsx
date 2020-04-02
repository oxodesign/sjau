import React, { FormEvent } from "react";
import { useAuth } from "reactfire";
import { useUser } from "../hooks/useUser";
import { FillOutUserDetails } from "../components/FillOutUserDetails";
import { Link } from "react-router-dom";
import { useUserDugnads } from "../hooks/useDugnad";

export const OverviewPage: React.FC = () => {
  const auth = useAuth();
  const user = useUser();
  const handleLogoutClick = async (e: FormEvent) => {
    e.preventDefault();
    await auth.signOut();
  };
  const yourDugnads = useUserDugnads(user!.uid);
  return (
    <div>
      {!user && <FillOutUserDetails />}
      {user && (
        <>
          <h2>{user.name}</h2>
          <Link to="/ny">Lag ny dugnad</Link>
          {yourDugnads.length > 0 && (
            <>
              <h2>Dine dugnader</h2>
              <ul>
                {yourDugnads.map(dugnad => (
                  <li key={dugnad.id}>
                    <Link to={`/dugnad/${dugnad.id}`}>{dugnad.name}</Link>
                  </li>
                ))}
              </ul>
            </>
          )}
          <div>
            <button onClick={handleLogoutClick}>Logg ut</button>
          </div>
        </>
      )}
    </div>
  );
};
