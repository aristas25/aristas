import { getStartOfWeek, addDays } from "../utils/utils";
import config from "../config";

export default function WeekSelector({ currentWeekStart, onChange }) {
  const disabled = currentWeekStart <= getStartOfWeek(new Date());
  return (
    <div className="flex justify-between px-4">
      <button
        onClick={() => onChange(addDays(currentWeekStart, -7))}
        disabled={disabled}
        className={`btn text-xs w-10 text-[${
          config.theme.colors.primaryColor
        }] ${disabled ? "" : ""}`}
      >
        Semana anterior
      </button>
      <div className="flex items-center justify-center text-center -xl font-semibold">
        Semana del {currentWeekStart.toLocaleDateString()}
      </div>
      <button
        onClick={() => onChange(addDays(currentWeekStart, 7))}
        className={`btn text-xs w-10 text-[${
          config.theme.colors.primaryColor
        }] ${disabled ? "" : ""}`}
      >
        Semana siguiente
      </button>
    </div>
  );
}
