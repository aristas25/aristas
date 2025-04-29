import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { queryUsersKey } from "../apis/queryKeys";
import { useUserByIdQuery } from "../apis/api.users";
import Spinner from "./common/Spinner";
import Button from "./common/Button";
import { useUpdateUserMutation } from "../apis/api.users";

export default function Profile() {
  const userId = sessionStorage.getItem("user_id");
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: queryUsersKey(userId),
    queryFn: () => useUserByIdQuery(userId),
  });

  const updateMutation = useMutation({
    mutationFn: ({ userId, body }) => useUpdateUserMutation(userId, body),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryUsersKey() });
      console.log("Usuario actualizado:", data);
    },
    onError: (error) => {
      console.error("Error actualizando usuario:", error);
    },
  });

  const onSubmit = async (data) => {
    console.log("Datos enviados:", data);
    const body = { ...data };
    console.log("body", body);
    const updatedUser = await updateMutation.mutateAsync({ userId, body });
    console.log("Datos actualizados:", updatedUser);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 h-[calc(100vh-4rem)] overflow-auto">
      {isLoading && <Spinner className="w-10 h-10 mx-auto" />}
      {error && (
        <p className="text-red-500">
          Hubo un error al cargar los datos del usuario: {error.message}
        </p>
      )}

      {user && (
        <>
          <h1 className="text-2xl font-bold mb-4">Perfil de {user.name}</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold mb-2">Datos personales</h2>
              {[
                { label: "Nombre", name: "name" },
                { label: "Apellido", name: "last_name" },
                { label: "Email", name: "email", type: "email" },
                { label: "Teléfono", name: "cellphone" },
                { label: "Calle", name: "street" },
                { label: "Altura", name: "number" },
                { label: "Localidad", name: "city" },
                { label: "Provincia", name: "province" },
                { label: "País", name: "country" },
                { label: "Código Postal", name: "postal_code" },
              ].map(({ label, name, type = "text" }) => (
                <div key={name} className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                  </label>
                  <input
                    defaultValue={user[name]}
                    {...register(name, { required: true })}
                    type={type}
                    {...register(name, { required: true })}
                    className="w-full rounded border border-slate-200 p-3 text-slate-700"
                  />
                  {errors[name] && (
                    <span className="text-red-500 text-sm">* Obligatorio</span>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold mb-2">Preferencias</h2>
              <div className="flex items-center mb-2">
                {/* <input
                  type="checkbox"
                  {...register("notifications")}
                  className="mr-2"
                /> */}
                <label className="text-gray-700">Recibir notificaciones</label>
              </div>
              <div className="flex items-center">
                {/* <input
                  type="checkbox"
                  {...register("newsletter")}
                  className="mr-2"
                /> */}
                <label className="text-gray-700">
                  Suscribirse al newsletter
                </label>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-[200px]"
            >
              {isSubmitting ? "Guardando..." : "Guardar cambios"}
            </Button>
          </form>
        </>
      )}
    </div>
  );
}
