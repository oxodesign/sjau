import React from "react";
import awsconfig from "./aws-exports";
import Amplify, { Auth } from "aws-amplify";
import { AuthenticatedApp } from "./pages/AuthenticatedApp";
import { OpenApp } from "./pages/OpenApp";

Amplify.configure(awsconfig);

const useUser = () => {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [isLoading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setCurrentUser(user);
      } catch (e) {
        setCurrentUser(null); // not logged in
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);
  return [isLoading, currentUser];
};

function App() {
  const [isLoadingAuthState, user] = useUser();
  if (isLoadingAuthState) {
    return <p>Laster...</p>;
  }
  return (
    <div className="App">
      {user ? <AuthenticatedApp user={user} /> : <OpenApp />}
    </div>
  );
}

export default App;
