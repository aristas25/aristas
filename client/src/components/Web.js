import React, { useState, useEffect } from "react";
import { cn } from "../utils/utils";

const MAIN_COLOR = "#892ae0";

export default function Web({ type }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Nav />
      <Body />
      <Footer />
    </>
  );
}

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = window.screen.width < 640;

  return (
    <nav className="max-w-6xl px-6 mx-auto">
      <div className="relative flex flex-row justify-between pt-6 pb-4 align-center mx-auto">
        <div className="flex items-center">
          <a className="Navbar_logo__INhgK" aria-label="Logo" href="/">
            <div
              className={cn(
                "text-gray-900 flex items-center justify-start gap-2"
              )}
            >
              <h1
                className={cn(
                  "inline-block text-2xl sm:text-3xl text-gray-900 pl-2 tracking-tight"
                )}
              >
                Aristas
              </h1>
            </div>
          </a>
        </div>
        <div className="flex justify-end space-x-3">
          {isMobile ? (
            <>
              <button
                className="whitespace-nowrap rounded-lg text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 hover:bg-slate-100 hover:text-slate-900 h-10 w-10 flex items-center justify-center"
                type="button"
                id="radix-:R2pjta:"
                aria-haspopup="menu"
                aria-expanded="false"
                data-state="closed"
                onClick={() => {
                  setMenuOpen(!menuOpen);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-menu h-6 w-6"
                >
                  <line x1="4" x2="20" y1="12" y2="12"></line>
                  <line x1="4" x2="20" y1="6" y2="6"></line>
                  <line x1="4" x2="20" y1="18" y2="18"></line>
                </svg>
              </button>
              {menuOpen && (
                <div
                  className="absolute right-2 z-10 w-48 mt-10 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="radix-:R2pjta:"
                  tabIndex="-1"
                >
                  <div className="px-1 py-1" role="none">
                    <a
                      href="/"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      tabIndex="-1"
                      id="radix-:R2pjta:0"
                    >
                      Inicio
                    </a>
                    <a
                      href="/login"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      tabIndex="-1"
                      id="radix-:R2pjta:2"
                    >
                      Iniciar sesión
                    </a>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <a href="/">
                <button className="whitespace-nowrap rounded-lg text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 hover:bg-slate-100 hover:text-slate-900 h-10 px-2 py-2 flex items-center justify-center">
                  Inicio
                </button>
              </a>
              <a href="/login">
                <button className="whitespace-nowrap rounded-lg text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 bg-zinc-800 hover:bg-zinc-700 text-slate-50 h-10 px-2 py-2 flex items-center justify-center">
                  Iniciar sesión
                </button>
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

function Body() {
  return (
    <>
      <main>
        <div className="flex flex-col max-w-screen">
          <header
            className="flex flex-col items-center text-center pt-8 p-6 pb-0 bg-gray-100"
            style={{
              minHeight: "calc(-5rem + 180vh)",
            }}
          >
            <h1 className="text-2xl font-bold mb-3 max-w-2xl text-slate-800">
              Proyecto Aristas
            </h1>
          </header>
        </div>
      </main>
    </>
  );
}

function Footer() {
  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(to top, #fafafa 0%, rgba(250, 250, 250, 0)",
      }}
      className="flex flex-col fixed bottom-0 w-screen px-2 pb-4 items-center"
    >
      <div
        style={{ width: "-webkit-fill-available" }}
        className="max-w-md flex gap-1"
      >
        <button
          className="whitespace-nowrap rounded-lg text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 bg-green-500 hover:bg-green-700 text-slate-50 h-10 px-4 py-2 w-full drop-shadow-md gap-2 flex items-center justify-center"
          onClick={() =>
            window.location.assign(
              "https://api.whatsapp.com/send?phone=5491158888423&text=Hola,%20quiero%20saber%20mas%20sobre%Aristas"
            )
          }
        >
          <span>Hablar por WhatsApp con un representante</span>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 448 512"
            className="text-xl"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
