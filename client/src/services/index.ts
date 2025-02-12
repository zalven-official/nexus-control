export * from './eel-bidirectional'
export * from './eel-exposed'
import { EelExposedFunctions } from './eel-exposed'

export const expose = () => {
  Object.getOwnPropertyNames(EelExposedFunctions)
    .filter((key) => key !== "length" && key !== "prototype" && key !== "name")
    .forEach((key) => {
      const method = EelExposedFunctions[key as keyof EelExposedFunctions];
      if (typeof method === "function" && window.eel) {
        const typedMethod = method as <T>(data: T) => void;
        window.eel.expose(typedMethod, key);
      }
    });
};
