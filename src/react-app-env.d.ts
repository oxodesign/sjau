/// <reference types="react-scripts" />
/// <reference types="react-dom/experimental" />
/// <reference types="react/experimental" />

interface Window {
  recaptchaVerifier?: firebase.auth.RecaptchaVerifier;
  confirmationResult?: firebase.auth.ConfirmationResult;
}
type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;
