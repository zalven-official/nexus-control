export const ping = async (): Promise<string> => {
  try {
    const eelWindow = window as unknown as { eel: { ping: () => () => Promise<string> } };
    return await eelWindow.eel.ping()();
  } catch (error) {
    console.error("Error calling eel.ping:", error);
    throw error;
  }
};
