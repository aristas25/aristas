import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useProfessionalsByNameQuery } from "../apis/api.professionals";
import { queryProfessionalsSearchKey } from "../apis/queryKeys";
import { capitalize } from "lodash";

export default function ProfessionalSelector({ onSelectProfessional }) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const { data: professionals = [], refetch } = useQuery({
    queryKey: queryProfessionalsSearchKey(search),
    queryFn: () => useProfessionalsByNameQuery(search),
    enabled: false,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (search && !selected) refetch();
    }, 300);

    return () => clearTimeout(timeout);
  }, [search]);

  const handleSelect = (prof) => {
    setSelected(prof);
    setSearch(prof.name);

    onSelectProfessional(
      prof.id,
      capitalize(prof.name) + " " + capitalize(prof.last_name),
      prof.categories.category
    );
  };

  return (
    <div className="">
      <input
        type="text"
        placeholder="Buscar profesional..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setSelected(null);
        }}
        className="w-full border rounded px-3 py-2"
      />

      {professionals.length > 0 && !selected && (
        <ul className="absolute z-10 bg-white border mt-1 rounded w-full max-h-60 overflow-y-auto shadow">
          {professionals.map((prof) => (
            <li
              key={prof.id}
              onClick={() => handleSelect(prof)}
              className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
            >
              <ProfessionalOpion professional={prof} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ProfessionalOpion({ professional }) {
  return (
    <div className="flex items-center space-x-2">
      <div>
        <div className="">
          - {capitalize(professional.name)} {capitalize(professional.last_name)}
        </div>
        <div className="text-sm text-gray-500">
          {professional?.categories?.category}
        </div>
      </div>
    </div>
  );
}
