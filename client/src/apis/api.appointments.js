const BASE_URL = "/api/appointments";

export const useAvailableSlotsQuery = async (professional_id, days) => {
  const responses = await Promise.all(
    days.map((day) => {
      return fetch(
        `${BASE_URL}/available-slots?professional_id=${professional_id}&date=${day
          .toISOString()
          .slice(0, 10)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((slots) => ({ date: day.toISOString().slice(0, 10), slots }));
    })
  );

  const slotMap = {};
  responses.forEach(({ date, slots }) => {
    slotMap[date] = slots;
  });
  return slotMap;
};

export const useCreateAppointmentMutation = async (body) => {
  const res = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error("Error en la petición");
  }
  return res.json();
};

export const useAppointmentsByUserQuery = async (user_id) => {
  const res = await fetch(`${BASE_URL}/user/${user_id}`, {
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

export const useAppointmentsByProfessionalQuery = async (user_id) => {
  const res = await fetch(`${BASE_URL}/professional/${user_id}`, {
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
