import React from "react";

export const useFormFields = <T>(initialValues: T) => {
  const [formFields, setFormFields] = React.useState(initialValues);
  const createChangeHandler = (fieldName: keyof T) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setFormFields(prev => ({ ...prev, [fieldName]: value }));
  };
  const reset = () => setFormFields(initialValues);
  return [formFields, createChangeHandler, reset] as [
    typeof formFields,
    typeof createChangeHandler,
    typeof reset
  ];
};
