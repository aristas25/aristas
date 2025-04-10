import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Button from "./common/Button";
import { EyeIcon } from "./icons";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useLoginUserMutation, useUpdateUserMutation } from "../apis/api.users";

export default function Login() {
  const [errorLogin, setErrorLogin] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: useLoginUserMutation,
    onSuccess: (data) => {
      console.log("Usuario creado:", data);
    },
    onError: (error) => {
      console.error("Error creando usuario:", error);
    },
  });

  const updateMutation = useMutation({
    mutationFn: useUpdateUserMutation,
    onSuccess: (data) => {
      console.log("Usuario creado:", data);
    },
    onError: (error) => {
      console.error("Error creando usuario:", error);
    },
  });

  const setCredentials = (userLogin) => {
    sessionStorage.username = userLogin.username;
    sessionStorage.email = userLogin.email;
    sessionStorage.name = userLogin.name;
    sessionStorage.lastName = userLogin.lastName;
    sessionStorage.securityLevel = userLogin.securityLevel;
    navigate("/home");
  };

  const onSubmit = async (formData) => {
    const body = {
      username: formData.username,
      password: formData.password,
    };

    try {
      const userLogin = await loginMutation.mutateAsync(body);
      debugger;
      const userId = userLogin.id;
      updateMutation.mutate(userId, {
        lastlogin: new Date(),
      });
      setCredentials(userLogin);
    } catch (error) {
      console.log(error);
      setErrorLogin("Usuario o Clave erroneos");
    }
  };

  return (
    <div className="flex flex-col w-screen h-screen text-white bg-gray-900">
      <div className="flex h-[calc(100vh-4rem)]">
        <main className="flex-1">
          <div className="h-full overflow-auto mt-4">
            <div className="flex items-center justify-center h-full">
              <div className="flex flex-col items-center justify-center p-4 rounded w-[400px] ">
                <h1 className="rounded p-4 text-white inline-block text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight ">
                  LOGIN
                </h1>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="w-full flex flex-col"
                >
                  <input
                    type="text"
                    {...register("username", { required: true })}
                    className="mt-2 rounded border border-slate-200  p-4 pl-8 text-slate-500 "
                  />
                  {errors.username && (
                    <span className="px-2 text-red-500">* Obligatorio</span>
                  )}
                  <div className="flex">
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      {...register("password", { required: true })}
                      className="mt-2 w-full rounded border border-slate-200  p-4 pl-8 text-slate-500 "
                    />
                    <div
                      className="relative mt-8 -ml-5 right-2.5	text-gray-900 cursor-pointer"
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    >
                      <EyeIcon className="w-4 h-4" />
                    </div>
                  </div>
                  {errors.password && (
                    <span className="px-2 text-red-500">* Obligatorio</span>
                  )}
                  <Button className="mt-2">Login</Button>
                  {errorLogin && (
                    <span className="p-2 text-red-500">{errorLogin}</span>
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
