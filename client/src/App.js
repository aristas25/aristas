import {
  NavLink,
  Navigate,
  Route,
  Routes,
  Outlet,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import Login from "./components/Login";
import { isMobile } from "react-device-detect";
import Users from "./components/Users";
import Home from "./components/Home";
import Invite from "./components/Invite";
import Logout from "./components/Logout";
import _, { capitalize } from "lodash";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import { useUsersQuery } from "./apis/api.users";
import { cn, tw } from "./utils/utils";
import "./App.css";

const BRAND = "ARISTAS";
function getMenu() {
  let menu = ["usuarios", "logout"];
  return menu;
}

export default function App() {
  const [searchParams] = useSearchParams();
  const user = sessionStorage.email || null;
  const inviteId = searchParams.get("inviteId") || null;
  const location = useLocation();

  const { data, isLoading, error } = useQuery({
    queryKey: ["usuarios"],
    queryFn: useUsersQuery,
  });

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar usuarios</div>;

  if (user === undefined || user === null) {
    return (
      <Routes>
        <Route
          path="*"
          element={
            <Navigate to="/login" state={{ referrer: location.pathname }} />
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/invite" element={<Invite inviteId={inviteId} />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/">
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="usuarios" element={<Users />} />
          <Route path="home" element={<Home />} />
          <Route path="logout" element={<Logout />} />
        </Route>
        <Route
          path="*"
          element={
            <div className="bg-black">
              <div className="w-9/12 m-auto py-16 min-h-screen flex items-center justify-center">
                <div className="bg-white shadow overflow-hidden sm:rounded-lg pb-8">
                  <div className="border-t border-gray-200 text-center pt-8">
                    <h1 className="text-9xl font-bold text-gray-400">404</h1>
                    <h1 className="text-6xl font-medium py-8">
                      Pagina no encontrada
                    </h1>
                    <p className="text-2xl pb-8 px-12 font-medium">
                      Ups! La pagina que esta buscando no existe. Vuelva al
                      inicio haciendo click en el boton.
                    </p>
                    <button
                      className="bg-black hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-6 py-3 rounded-md mr-6"
                      onClick={() => window.location.assign("/")}
                    >
                      IR AL INICIO
                    </button>
                  </div>
                </div>
              </div>
            </div>
          }
        />
      </Route>
    </Routes>
  );
}

function RootLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

function Layout({ children }) {
  return (
    <div className="flex-col w-full h-screen text-gray-700">
      <nav
        className={cn(
          "left-0 flex justify-between items-center pr-6 w-full h-16 text-white print:hidden bg-black"
        )}
      >
        <div
          className="flex gap-2 items-center cursor-pointer"
          onClick={() => window.location.assign("/")}
        >
          <div className="flex items-center">
            <img
              src={logo}
              alt="logo"
              className="ml-4 w-12 h-12 object-cover"
            />
            <h1 className="inline-block text-2xl sm:text-3xl text-white pl-2 tracking-tight ">
              {BRAND}
            </h1>
          </div>
        </div>
        {isMobile ? <MobileMenu /> : <Profile />}
      </nav>

      <div className="fixed top-16 flex h-[calc(100vh-4rem)] overflow-auto w-full">
        {!isMobile && (
          <div
            className={cn(
              "flex flex-col text-white justify-start items-center w-24 print:hidden bg-black"
            )}
          >
            {getMenu().map((el, i) => {
              return (
                <NavLink
                  key={i}
                  className={cn(
                    "h-14 w-full flex items-center hover:text-white cursor-pointer px-2 hover:bg-gray-400"
                  )}
                  to={el}
                >
                  {capitalize(el.replaceAll("-", " "))}
                </NavLink>
              );
            })}
          </div>
        )}

        {/* Main content */}
        {isMobile ? (
          <main className="flex-1 bg-white w-[calc(10vh)] mt-4">
            {children}
          </main>
        ) : (
          <main className="flex-1 bg-white w-[calc(100%-140px)] mt-4">
            {children}
          </main>
        )}
      </div>

      {/* Footer logo */}
      {isMobile ? (
        <div className="flex gap-2 right-2 fixed bottom-1 z-20 justify-center items-center px-3 h-10 bg-white rounded-full shadow print:hidden">
          <span className="text-xs tracking-widest leading-none text-gray-300">
            &copy; {new Date().getFullYear()}
          </span>
          <span className="text-xs">{BRAND}</span>
        </div>
      ) : (
        <div className="flex gap-2 fixed bottom-6 z-20 justify-center items-center px-3 h-10 bg-white rounded-full shadow print:hidden">
          <span className="text-xs tracking-widest leading-none text-gray-300">
            &copy; {new Date().getFullYear()}
          </span>
          <span className="text-xs">{BRAND}</span>
        </div>
      )}
    </div>
  );
}

function Profile() {
  return (
    <div className="flex items-center justify-end gap-2 h-full mt-2">
      <p>{sessionStorage.username}</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
        />
      </svg>
    </div>
  );
}

function MobileMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div onClick={() => setOpen(!open)} className="cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </div>
      <div
        id="menu"
        className={cn(
          "absolute z-10 top-16 right-0 h-[calc(100%-4rem)] bg-black transition-all duration-200 z-20 w-[160px]",
          open && "w-[160px]",
          !open && "hidden"
        )}
      >
        <div className="flex flex-col justify-start items-center">
          {getMenu().map((el, i) => {
            return (
              <NavLink
                key={i}
                className="h-10 w-full flex items-center text-white pl-4 hover:bg-gray-400 cursor-pointer"
                to={el}
                onClick={() => setOpen(!open)}
              >
                {capitalize(el.replaceAll("-", " "))}
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
}
