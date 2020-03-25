import React from "react";

export const NewDugnadPage = () => {
  const [address, setAddress] = React.useState("");
  const createDugnad = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("creating dugnad");
  };
  return (
    <>
      <h1>Lag din egen dugnad</h1>
      <p>Dette er jo kjempespennende</p>
      <form onSubmit={createDugnad}>
        <label>
          Hva er adressen til der du bor?
          <input value={address} onChange={e => setAddress(e.target.value)} />
        </label>
        <button>Lag din egen dugnad!</button>
      </form>
    </>
  );
};
