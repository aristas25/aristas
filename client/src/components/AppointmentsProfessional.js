import React, { useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";
import { useAppointmentsByProfessionalQuery } from "../apis/api.appointments";
import { queryAppointmentsProfessionalKey } from "../apis/queryKeys";

import { capitalize } from "lodash";
import Spinner from "./common/Spinner";

import { DateTime } from "luxon";
import config from "../config";

export default function AppointmentBooking() {
  const [stage, setStage] = useState("LIST");
  const [professionalName, setProfessionalName] = useState(null);
  const [slotReserved, setSlotReserved] = useState(null);

  const user_id = sessionStorage.getItem("user_id");

  const onSelectAppointment = (appointment) => {
    console.log("Selected appointment:", appointment);
    setStage("DETAILS");
    setSlotReserved(appointment.start_time);
    setProfessionalName(
      `${capitalize(appointment.user_id.name)} ${capitalize(
        appointment.user_id.last_name
      )}`
    );
  };

  const reset = () => {
    setStage("LIST");
    setProfessionalName(null);
  };

  return (
    <>
      <div className="w-full flex items-center gap-2 pb-4 pl-2 pt-4 border-b border-b-gray-200 bg-gray-50 shadow-md mb-2">
        <div className="flex gap-2 items-center justify-between text-xl font-bold text-center pl-2 w-full mr-2">
          <div className="flex gap-2 items-center">
            {stage !== "LIST" && (
              <ArrowLeftIcon
                className="h-5 w-5 cursor-pointer"
                onClick={() => reset()}
              />
            )}
            <div>
              {stage === "LIST" || stage === "DETAILS"
                ? "Mis agenda"
                : "Agendar nuevo turno"}
            </div>
          </div>
        </div>
      </div>
      {stage === "LIST" && (
        <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
          <UserAppointments user_id={user_id} onSelect={onSelectAppointment} />
          <div className="h-8 w-full"></div>
        </div>
      )}

      {stage === "DETAILS" && (
        <div className="p-4 space-y-4">
          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6 space-y-4 border border-gray-200">
            <h2
              className={`text-xl font-semibold text-blue-600 flex items-center gap-2 text-[${config.theme.colors.primaryColor}]`}
            >
              📅 Detalles del turno
            </h2>

            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-lg">👤</span>
              <p className="text-gray-700">
                <span className="font-medium">Paciente:</span>{" "}
                {professionalName}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-lg">🕒</span>
              <p className="text-gray-700">
                <span className="font-medium">Fecha y hora:</span>{" "}
                {new Date(slotReserved).toLocaleString("es-AR", {
                  dateStyle: "full",
                  timeStyle: "short",
                })}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function UserAppointments({ user_id, onSelect }) {
  const {
    data: appointments,
    isLoading,
    error,
  } = useQuery({
    queryKey: queryAppointmentsProfessionalKey(user_id),
    queryFn: () => useAppointmentsByProfessionalQuery(user_id),
    keepPreviousData: true,
  });

  return (
    <div className="flex flex-wrap justify-start gap-4 max-w-full mx-4">
      {isLoading && <Spinner />}

      {error && (
        <p className="text-sm text-red-500 w-full">
          Error al cargar los turnos.
        </p>
      )}

      {appointments?.length === 0 && (
        <p className="text-sm text-gray-500">No tenés turnos agendados.</p>
      )}

      {appointments?.map((appt) => {
        const start = DateTime.fromISO(appt.start_time, {
          zone: "America/Argentina/Buenos_Aires",
        });
        const end = DateTime.fromISO(appt.end_time, {
          zone: "America/Argentina/Buenos_Aires",
        });

        return (
          <div
            key={appt.id}
            className={`border rounded-lg p-4 bg-white shadow-md cursor-pointer w-full sm:w-[220px] h-[140px]`}
            onClick={() => onSelect(appt)}
          >
            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-lg">👤</span>
              <p
                className={`font-medium text-[${config.theme.colors.primaryColor}]`}
              >
                {`${capitalize(appt.user_id?.name)} ${capitalize(
                  appt.user_id?.last_name
                )}`}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-lg">🕒</span>
              <p className="text-sm text-gray-600">
                {new Date(start).toLocaleString("es-AR", {
                  dateStyle: "full",
                  timeStyle: "short",
                })}
              </p>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <a
                href={`./historia-clinica/${appt.user_id?.id}`}
                className="text-blue-500"
              >
                Ver historia clinica
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
