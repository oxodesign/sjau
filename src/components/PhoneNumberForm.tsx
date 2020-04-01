import React from "react";
import { usePersistedState } from "../hooks/usePersistedState";

type PhoneNumberFormProps = {
  onSubmit: (phoneNumber: string) => void;
};
export const PhoneNumberForm: React.FC<PhoneNumberFormProps> = ({
  onSubmit
}) => {
  const [phoneNumber, setPhoneNumber] = usePersistedState("phone-number", "");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber) {
      onSubmit(phoneNumber);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Hva er telefonnummeret ditt?
        <br />
        <input
          type="tel"
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
          placeholder="F.eks. 926 73 134"
        />
      </label>
      <button id="login-button">Logg inn</button>
    </form>
  );
};
