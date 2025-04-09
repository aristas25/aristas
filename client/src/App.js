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

  const user = sessionStorage.email || null;
  const inviteId = searchParams.get("inviteId") || null;
  const location = useLocation();

  if (user === undefined) {
    return null;
  }

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
