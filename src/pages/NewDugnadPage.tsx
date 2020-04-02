import React from "react";
import { useHistory } from "react-router-dom";
import { useFormFields } from "../hooks/useFormFields";
import { useFirestore } from "reactfire";
import { useUser } from "../hooks/useUser";

const A_WEEK = 1000 * 60 * 60 * 24 * 7;

export const NewDugnadPage = () => {
  const [formState, createChangeHandler] = useFormFields({
    name: "",
    description: "",
    startsAt: new Date().toLocaleDateString("fr-CA"),
    endsAt: new Date(Date.now() + A_WEEK).toLocaleDateString("fr-CA")
  });
  const dugnadsRef = useFirestore().collection("dugnads");
  const user = useUser();

  const { push } = useHistory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await dugnadsRef.add({
        ...formState,
        tasks: [],
        author: user!.uid
      });
      push(`/dugnad/${result.id}`);
    } catch (e) {
      console.error("Kunne ikke opprette ting", e);
    }
  };
  return (
    <>
      <h1>Lag din egen dugnad</h1>
      <p>En distribuert dugnad er sikrere, og mest sannsynlig bedre også.</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Hva vil du kalle dugnaden din?
            <input
              value={formState.name}
              onChange={createChangeHandler("name")}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Skriv en velkomsthilsen til folk!
            <textarea
              value={formState.description}
              onChange={createChangeHandler("description")}
            />
          </label>
        </div>
        <div>
          <label>
            Når starter dugnadsperioden?
            <input
              type="date"
              value={formState.startsAt}
              onChange={createChangeHandler("startsAt")}
              min={new Date().toLocaleDateString("fr-CA")}
              aria-describedby="starter-beskrivelse"
            />
          </label>
        </div>
        <p id="starter-beskrivelse">
          Distribuerte dugnader fungerer som regel best når man gir folk en litt
          lengre periode å bidra på. En uke, for eksempel?
        </p>
        <div>
          <label>
            Når slutter dugnaden?
            <input
              type="date"
              value={formState.endsAt}
              onChange={createChangeHandler("endsAt")}
              min={formState.startsAt}
            />
          </label>
        </div>
        <button>Lag oppgaver folk kan gjøre!</button>
      </form>
    </>
  );
};
