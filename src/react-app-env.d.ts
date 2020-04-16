/// <reference types="react-scripts" />
/// <reference types="react-dom/experimental" />
/// <reference types="react/experimental" />

interface Window {
  recaptchaVerifier?: firebase.auth.RecaptchaVerifier;
  confirmationResult?: firebase.auth.ConfirmationResult;
}
type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

// TODO: Remove when TypeScript 3.9 is released
interface ShareData {
  text?: string;
  title?: string;
  url?: string;
}
interface Navigator {
  share?: (shareData: ShareData) => Promise<void>;
}
