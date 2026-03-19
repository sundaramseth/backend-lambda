export const handler = async (event: any) => {
  const token = event.headers?.Authorization;

  if (token === 'Bearer validToken123') {
    return { isAuthorized: true };
  }

  return { isAuthorized: false };
};