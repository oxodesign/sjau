import React from "react";

type AddTaskProps = {
  dugnadId: string;
};

const initialState = {
  title: "",
  description: ""
};

export const AddTask: React.FC<AddTaskProps> = ({ dugnadId }) => {
  const [formState, setFormState] = React.useState({
    title: "",
    description: ""
  });
  const updateField = (name: keyof typeof formState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) =>
    setFormState({
      ...formState,
      [name]: e.target.value
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO Add task to dugnad
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Hva skal gjøres?
          <input
            value={formState.title}
            onChange={updateField("title")}
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
            onChange={updateField("description")}
            placeholder="Alt som ikke er innelåst kan kastes i containeren"
          />
        </label>
      </div>
      <button>Legg til!</button>
    </form>
  );
};
