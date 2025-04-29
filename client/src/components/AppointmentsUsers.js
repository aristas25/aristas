import React, { useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import {
  useAvailableSlotsQuery,
  useCreateAppointmentMutation,
  useAppointmentsByUserQuery,
} from "../apis/api.appointments";
import {
  queryAppointmentsKey,
  queryAppointmentsUserKey,
} from "../apis/queryKeys";
import { getStartOfWeek, getWeekDays } from "../utils/utils";
import Button from "./common/Button";
import DayColumn from "./DayColumn";
import WeekSelector from "./WeekSelector";
import ProfessionalSelector from "./ProfessionalSelector";

import { capitalize } from "lodash";
import Spinner from "./common/Spinner";

import { DateTime } from "luxon";
import config from "../config";

export default function AppointmentBooking() {
  const [stage, setStage] = useState("LIST");
  const [professionalId, setProfessionalId] = useState(null);
  const [professionalName, setProfessionalName] = useState(null);
  const [professionalCategory, setProfessionalCategory] = useState(null);
  const [slotReserved, setSlotReserved] = useState(null);
  const [currentWeekStart, setCurrentWeekStart] = useState(
    getStartOfWeek(new Date())
  );
  const user_id = sessionStorage.getItem("user_id");
  const days = getWeekDays(currentWeekStart);
  const queryClient = useQueryClient();
  const { data: availableSlots, isLoading } = useQuery({
    queryKey: queryAppointmentsKey(
      professionalId,
      currentWeekStart.toISOString()
    ),
    queryFn: () => useAvailableSlotsQuery(professionalId, days),
    keepPreviousData: true,
    enabled: !!professionalId,
  });

  const createMutation = useMutation({
    mutationFn: useCreateAppointmentMutation,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: queryAppointmentsKey(
          professionalId,
          currentWeekStart.toISOString()
        ),
      });
      console.log("Turno creado:", data);
    },
    onError: (error) => {
      console.error("Error creando turno:", error);
    },
  });

  const handleSelectSlot = (slot, professionalId) => {
    console.log("Selected slot:", slot, " Professional: ", professionalId);
    setSlotReserved(slot);
    return true;
  };

  const onSelectProfessional = (id, name, category) => {
    setProfessionalId(id);
    setProfessionalName(name);
    setProfessionalCategory(category);
  };

  const handleConfirmSlot = () => {
    const body = {
      user_id: user_id,
      professional_id: professionalId,
      date: slotReserved,
    };
    createMutation.mutate(body);
    setStage("LIST");
    setProfessionalId(null);
    setProfessionalName(null);
    setSlotReserved(null);
  };

  const onSelectAppointment = (appointment) => {
    setStage("DETAILS");
    setProfessionalId(appointment.professional_id.id);
    setProfessionalName(
      `${capitalize(appointment.professional_id.name)} ${capitalize(
        appointment.professional_id.last_name
      )}`
    );
    setProfessionalCategory(
      capitalize(appointment.professional_id.categories.category)
    );
    setSlotReserved(appointment.start_time);
  };

  const reset = () => {
    setStage("LIST");
    setProfessionalId(null);
    setProfessionalName(null);
    setSlotReserved(null);
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
                ? "Mis turnos"
                : "Agendar nuevo turno"}
            </div>
          </div>
          {stage === "LIST" && (
            <Button
              onClick={() => setStage("NEW_APPOINTMENT")}
              className="bg-blue-500 text-white px-4 py-2 rounded"
              size={"sm"}
              variant="default"
            >
              Agendar nuevo turno
            </Button>
          )}
        </div>
      </div>
      {stage === "LIST" && (
        <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
          <UserAppointments user_id={user_id} onSelect={onSelectAppointment} />
          <div className="h-8 w-full"></div>
        </div>
      )}
      {stage === "NEW_APPOINTMENT" && (
        <div className="p-4 space-y-4">
          {/* 1er paso: Seleccionar profesional */}
          {!professionalId && (
            <div className="max-w-md mx-auto">
              <label className="font-medium">Seleccioná un profesional:</label>
              <div className="mt-4">
                <ProfessionalSelector
                  onSelectProfessional={onSelectProfessional}
                />
              </div>
              {professionalId && (
                <p className="mt-2 text-sm text-gray-600">
                  ID seleccionado: {professionalId}
                </p>
              )}
            </div>
          )}

          {/* 2do paso: Seleccionar fecha y hora */}
          {professionalId && !slotReserved && (
            <>
              <div>
                {professionalName && (
                  <>
                    <p className="text-lg font-medium">
                      Profesional: {capitalize(professionalName)}
                    </p>
                    <p className="text-base">
                      {capitalize(professionalCategory)}
                    </p>
                  </>
                )}
              </div>
              <WeekSelector
                currentWeekStart={currentWeekStart}
                onChange={setCurrentWeekStart}
              />

              {!isLoading && (
                <>
                  {days.map((day) => (
                    <DayColumn
                      key={day.toISOString()}
                      day={day}
                      slots={
                        availableSlots[day.toISOString().slice(0, 10)] || []
                      }
                      onSelectSlot={(slot) =>
                        handleSelectSlot(slot, professionalId)
                      }
                    />
                  ))}
                </>
              )}

              {isLoading && (
                <p className="text-center text-gray-500">
                  <Spinner />
                </p>
              )}
            </>
          )}

          {/* 3er paso: Confirmar turno */}
          {slotReserved && (
            <div className="max-w-md mx-auto mt-4">
              <div className="flex flex-wrap items-center text-lg mb-4">
                Confirma su turno para el{" "}
                <span className="font-semibold">
                  {new Date(slotReserved).toLocaleString("es-AR", {
                    dateStyle: "full",
                    timeStyle: "short",
                  })}
                </span>
                con el profesional:
                <span className="font-semibold ml-1">{professionalName}</span>
              </div>
              <Button
                onClick={() => handleConfirmSlot()}
                disabled={createMutation.isLoading}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-[450px]"
                variant="default"
              >
                Confirmar
              </Button>
            </div>
          )}
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
                <span className="font-medium">Profesional:</span>{" "}
                {professionalName} -{capitalize(professionalCategory)}
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
    queryKey: queryAppointmentsUserKey(user_id),
    queryFn: () => useAppointmentsByUserQuery(user_id),
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
            className={`border rounded-lg p-4 bg-white shadow-md cursor-pointer w-full sm:w-[220px] h-[120px] sm:h-[140px]`}
            onClick={() => onSelect(appt)}
          >
            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-lg">👤</span>
              <p
                className={`font-medium text-[${config.theme.colors.primaryColor}]`}
              >
                {`${capitalize(appt.professional_id?.name)} ${capitalize(
                  appt.professional_id?.last_name
                )}`}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <p className="font-medium">
                {`${capitalize(appt.professional_id?.categories?.category)}`}
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
          </div>
        );
      })}
    </div>
  );
}
