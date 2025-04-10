import {
  NavLink,
  Navigate,
  Route,
  Routes,
  Outlet,
  useSearchParams,
  useLocation,
} from "react-router-dom";

import React, { useState, useEffect } from "react";
import logo from "./logo.png";
import "./App.css";

export default function App() {
  const [searchParams] = useSearchParams();

  const [data, setData] = useState(null);
  const user = sessionStorage.email || null;
  const inviteId = searchParams.get("inviteId") || null;
  const location = useLocation();

  if (user === undefined) {
    return null;
  }

  async function obtenerUsuarios() {
    try {
      const response = await fetch("http://localhost:3000/api/getMore");
      const result = await response.json();

      if (response.ok) {
        console.log("Usuarios:", result.data);
      } else {
        console.error("Error en el servidor:", result.error);
      }
    } catch (error) {
      console.error("Error de red:", error.message);
    }
  }
  useEffect(() => {
    const data = obtenerUsuarios();
    setData(data);
  }, []);

  return (
    <Routes>
      <Route
        path="*"
        element={
          <div className="bg-black-special">
            <div className="w-9/12 m-auto py-16 min-h-screen flex items-center justify-center">
              <div className="bg-white shadow overflow-hidden sm:rounded-lg pb-8">
                <div className="border-t border-gray-200 text-center pt-8">
                  <h1 className="text-6xl font-medium py-8">ARISTAS</h1>
                  <p>{JSON.stringify(data)}</p>
                </div>
              </div>
            </div>
          </div>
          // <Navigate to="/login" state={{ referrer: location.pathname }} />
        }
      />
    </Routes>
  );
}
