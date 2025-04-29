import { useState } from "react";
import { useForm } from "react-hook-form";
import { EyeIcon } from "lucide-react";
import Button from "./common/Button";
import logo from "../logo.svg";
import config from "../config";
import {
  useUsersByUsernameQuery,
  useUsersByEmailQuery,
  useRegisterUserMutation,
} from "../apis/api.users";
import {
  queryUsersUsernameValidationKey,
  queryUsersEmailValidationKey,
} from "../apis/queryKeys";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMsg("");

    const {
      data: usernameExists,
      isLoading: isLoadingUsername,
      error: usernameError,
    } = useQuery({
      queryKey: queryUsersUsernameValidationKey(data.username),
      queryFn: () => useUsersByUsernameQuery(data.username),
    });

    const {
      data: emailExists,
      isLoading: isLoadingEmail,
      error: emailError,
    } = useQuery({
      queryKey: queryUsersEmailValidationKey(data.email),
      queryFn: () => useUsersByEmailQuery(data.email),
    });

    if (usernameExists.exists) {
      setErrorMsg("El nombre de usuario ya está en uso");
      setLoading(false);
      return;
    }

    if (emailExists.exists) {
      setErrorMsg("El correo ya está registrado");
      setLoading(false);
      return;
    }

    // Subir imagen (ejemplo con imgbb)
    let pictureUrl = "";
    if (data.picture[0]) {
      const formData = new FormData();
      formData.append("image", data.picture[0]);

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${config.imgbbApiKey}`,
        {
          method: "POST",
          body: formData,
        }
      ).then((res) => res.json());

      pictureUrl = response.data.url;
    }

    // Enviar registro
    const payload = {
      ...data,
      created_at: new Date().toISOString(),
      picture: pictureUrl,
    };

    await fetch("/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);
    // redirigir o mostrar éxito...
  };

  return (
    <div className="flex flex-col w-screen h-screen bg-cold-white">
      <div className="flex">
        <main className="flex-1">
          <div className="h-full mt-4">
            <div className="flex flex-col items-center justify-center h-full mb-4">
              <div className="flex items-center justify-center mb-4">
                <img src={logo} alt="logo" className="w-12 h-12 object-cover" />
                <h1 className="inline-block text-2xl sm:text-3xl text-gray-400 pl-2 tracking-tight ">
                  Aristas
                </h1>
              </div>
              <div className="flex flex-col items-start justify-center p-4 rounded-lg w-[100%] max-w-[500px] shadow-lg border border-gray-100 bg-white">
                <header className="mb-4">
                  <h1 className="mb-2 text-2xl font-bold text-gray-900">
                    Registrarse
                  </h1>
                </header>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="w-full flex flex-col space-y-4"
                >
                  {step === 1 && (
                    <>
                      {[
                        { label: "Nombre", name: "name" },
                        { label: "Apellido", name: "last_name" },
                        { label: "Usuario", name: "username" },
                        { label: "Email", name: "email", type: "email" },
                      ].map(({ label, name, type = "text" }) => (
                        <div key={name}>
                          <div className="text-xs-special mb-2 font-sans text-gray-900 block">
                            {label}
                          </div>
                          <input
                            type={type}
                            {...register(name, { required: true })}
                            className="w-full rounded border border-slate-200 p-4 pl-4 text-slate-500"
                          />
                          {errors[name] && (
                            <span className="px-2 text-red-500">
                              * Obligatorio
                            </span>
                          )}
                        </div>
                      ))}

                      <div>
                        <div className="text-xs-special mb-2 font-sans text-gray-900 block">
                          Tipo de usuario
                        </div>
                        <select
                          {...register("type", { required: true })}
                          className="w-full rounded border border-slate-200 p-4 text-slate-500"
                        >
                          <option value="">Seleccionar tipo</option>
                          <option value="USER">Usuario</option>
                          <option value="PROFESSIONAL">Profesional</option>
                        </select>
                        {errors.type && (
                          <span className="px-2 text-red-500">
                            * Obligatorio
                          </span>
                        )}
                      </div>

                      <div>
                        <div className="text-xs-special mb-2 font-sans text-gray-900 block">
                          Categoría
                        </div>
                        <select
                          {...register("category", { required: true })}
                          className="w-full rounded border border-slate-200 p-4 text-slate-500"
                        >
                          <option value="">Seleccionar categoría</option>
                          <option value="psicologia">Psicología</option>
                          <option value="nutricion">Nutrición</option>
                          <option value="fisioterapia">Fisioterapia</option>
                        </select>
                        {errors.category && (
                          <span className="px-2 text-red-500">
                            * Obligatorio
                          </span>
                        )}
                      </div>

                      <div>
                        <div className="text-xs-special mb-2 font-sans text-gray-900 block">
                          Contraseña
                        </div>
                        <div className="flex">
                          <input
                            type={isPasswordVisible ? "text" : "password"}
                            {...register("password", { required: true })}
                            className="w-full rounded border border-slate-200 p-4 pl-4 text-slate-500"
                          />
                          <div
                            className="relative -ml-6 flex items-center pr-2 text-gray-900 cursor-pointer"
                            onClick={() =>
                              setIsPasswordVisible(!isPasswordVisible)
                            }
                          >
                            <EyeIcon className="w-4 h-4" />
                          </div>
                        </div>
                        {errors.password && (
                          <span className="px-2 text-red-500">
                            * Obligatorio
                          </span>
                        )}
                      </div>

                      <div>
                        <div className="text-xs-special mb-2 font-sans text-gray-900 block">
                          Foto de perfil
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          {...register("picture")}
                          className="w-full rounded border border-slate-200 p-2 text-slate-500"
                        />
                      </div>

                      <Button
                        className="mt-4"
                        type="button"
                        onClick={() => setStep(2)}
                      >
                        Siguiente
                      </Button>

                      <a
                        href="/login"
                        className="text-gray-900 underline text-center"
                      >
                        Volver
                      </a>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      {[
                        { label: "Calle", name: "street", required: true },
                        { label: "Altura", name: "number", required: true },
                        { label: "Piso", name: "floor", required: true },
                        {
                          label: "Departamento",
                          name: "apartment",
                          required: false,
                        },
                        { label: "Localidad", name: "city", required: true },
                        {
                          label: "Provincia",
                          name: "province",
                          required: true,
                        },
                        { label: "País", name: "country", required: true },
                        {
                          label: "Código Postal",
                          name: "postal_code",
                          required: true,
                        },
                        { label: "Teléfono", name: "phone", required: true },
                      ].map(({ label, name, required }) => (
                        <div key={name}>
                          <div className="text-xs-special mb-2 font-sans text-gray-900 block">
                            {label}
                          </div>
                          <input
                            type="text"
                            {...register(name, { required: required })}
                            className="w-full rounded border border-slate-200 p-4 pl-4 text-slate-500"
                          />
                          {errors[name] && (
                            <span className="px-2 text-red-500">
                              * Obligatorio
                            </span>
                          )}
                        </div>
                      ))}

                      <div className="flex justify-between w-full mt-4">
                        <Button
                          type="button"
                          onClick={() => setStep(1)}
                          variant="outline"
                        >
                          Atrás
                        </Button>
                        <Button type="submit" disabled={loading}>
                          {loading ? "Registrando..." : "Registrarse"}
                        </Button>
                      </div>
                    </>
                  )}

                  {errorMsg && (
                    <span className="p-2 text-red-500">{errorMsg}</span>
                  )}
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
