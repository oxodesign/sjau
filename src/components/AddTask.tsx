import React from "react";
import { useFormFields } from "../hooks/useFormFields";
import { useDugnad, useDugnadRef } from "../hooks/useDugnad";
import { useFirestore } from "reactfire";
import { useUser } from "../hooks/useUser";

type AddTaskProps = {
  dugnadId: string;
};

export const AddTask: React.FC<AddTaskProps> = ({ dugnadId }) => {
  const [formState, createChangeHandler] = useFormFields({
    title: "",
    description: ""
  });

  const dugnadRef = useDugnadRef(dugnadId);
  const user = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dugnadRef.collection("tasks").add({ ...formState, author: user!.uid });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Hva skal gjøres?
          <input
            value={formState.title}
            onChange={createChangeHandler("title")}
            placeholder="Rydde opp i kjelleren"
            required
          />
        </label>
      </div>
      <div>
        <label>
          Flere detaljer?
          <textarea
            value={formState.description}
            onChange={createChangeHandler("description")}
            placeholder="Alt som ikke er innelåst kan kastes i containeren"
          />
        </label>
      </div>
      <button>Legg til!</button>
    </form>
  );
};
