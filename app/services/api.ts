const BASE_URL = "http://192.168.110.49/api-balcade";

export const api = async (
  endpoint: string,
  method: string = "GET",
  body?: any
) => {
  
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Network error");
  }

  return response.json();
};
