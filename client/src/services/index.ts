export const ping = async (): Promise<string> => {
  try {
    return (window as unknown as { eel: { ping: () => Promise<string> } }).eel.ping();
  } catch (error) {
    console.error("Error calling eel.ping:", error);
    throw error;
  }
};