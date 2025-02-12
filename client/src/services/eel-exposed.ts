// Class that will manage the exposed functions
export class EelExposedFunctions {
  static add_numbers({ a, b }: { a: number; b: number }) {
    console.log(`Adding ${a} + ${b}`);
    return a + b;
  }
}