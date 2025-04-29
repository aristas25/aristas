import { capitalize } from "lodash";

export default function DayColumn({ day, slots, onSelectSlot }) {
  return (
    <div className="flex flex-col items-center justify-center border rounded-lg px-8 h-[120px]">
      {capitalize(day.toLocaleDateString("es-AR", { weekday: "long" }))}{" "}
      {day.toLocaleDateString("es-AR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })}
      {slots.length > 0 ? (
        <div className="flex items-start justify-center w-full">
          <div className="flex gap-2 overflow-scroll w-full h-16">
            {slots.map((slot) => (
              <div
                key={slot}
                className="mt-2 space-x-2 h-10 w-full flex items-center justify-center"
              >
                <button
                  onClick={() => onSelectSlot(slot)}
                  className="w-[150px] h-[40px] bg-blue-100 hover:bg-blue-200 text-sm rounded px-2 py-1 whitespace-nowrap"
                  id={slot}
                >
                  {new Date(slot).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-sm text-gray-400 text-center">
          No hay turnos disponibles
        </div>
      )}
    </div>
  );
}
