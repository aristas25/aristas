const BASE_URL = "/api/professionals";

export const useProfessionalsQuery = async () => {
  const res = await fetch(`${BASE_URL}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Error en la petición");
  }
  return res.json();
};

export const useProfessionalsByNameQuery = async (search) => {
  const res = await fetch(
    `${BASE_URL}/search?name=${encodeURIComponent(search)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    throw new Error("Error en la petición");
  }

  return res.json();
};
