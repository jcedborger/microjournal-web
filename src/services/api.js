const baseUrl = "http://0.0.0.0:3333";

export const query = async (query, token) => {
  const response = await fetch(`${baseUrl}/graphql`, {
    method: "POST",
    body: JSON.stringify({ query }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};
