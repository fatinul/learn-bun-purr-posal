// Helper to get the correct API URL
export const getApiUrl = () => {
  // In production (when served through Nginx), use relative path
  // In development, use localhost
  if (import.meta.env.DEV) {
    return 'http://localhost:8001';
  }
  // In production, API is proxied through /purr-posal/api
  return '/purr-posal/api';
};

export const api = {
  create: async (title: string, sender: string, receiver: string, message: string) => {
    const baseUrl = getApiUrl();
    const res = await fetch(
      `${baseUrl}/create?title=${encodeURIComponent(title)}&sender=${encodeURIComponent(sender)}&receiver=${encodeURIComponent(receiver)}&message=${encodeURIComponent(message)}`
    );
    return res.json();
  },

  getLove: async (token: string) => {
    const baseUrl = getApiUrl();
    const res = await fetch(`${baseUrl}/love/${token}`);
    return res.json();
  },
};
