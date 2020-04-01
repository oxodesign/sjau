import React from "react";
import { Link } from "react-router-dom";

export const LandingPage = () => {
  return (
    <div>
      <h1>Distribuert dugnad</h1>
      <p>La oss ha dugnad allikevel på tross av Korona!</p>
      <Link to="/login">Bli med på moroa</Link>
    </div>
  );
};
