import React from "react";
import { useParams } from "react-router-dom";

export const DugnadPage = () => {
  const { id } = useParams();
  return (
    <>
      <h1>Dugnad: {id}</h1>
      <p>Her vil du finne oppgavene du skal gjøre</p>
    </>
  );
};
