import { Eel } from "./src/services";

declare global {
  interface Window {
    eel: Eel
  }
}
