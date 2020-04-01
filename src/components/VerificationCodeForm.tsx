import React from "react";

type VerificationCodeFormProps = {
  onSubmit: (verificationCode: string) => void;
};

export const VerificationCodeForm: React.FC<VerificationCodeFormProps> = ({
  onSubmit
}) => {
  const [verificationCode, setVerificationCode] = React.useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationCode) {
      onSubmit(verificationCode);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Skriv inn verifikasjonskoden du får på SMS:
        <br />
        <input
          type="tel"
          value={verificationCode}
          onChange={e => setVerificationCode(e.target.value)}
        />
      </label>
      <button>Logg inn</button>
    </form>
  );
};
