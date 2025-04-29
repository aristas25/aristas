import React, { useState, useEffect } from "react";
import Button from "./common/Button";
import config from "../config";

export default function Web() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = window.screen.width < 640;
  return (
    <main className="min-h-screen bg-white text-gray-800">
      <header
        className={`text-white px-6 py-4 shadow-md sticky top-0 z-50 bg-[${config.theme.colors.primaryColor}]`}
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">{config.brand}</h1>
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
                  className="absolute right-2 z-10 w-48 mr-[16px] mt-[237px] origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="radix-:R2pjta:"
                  tabIndex="-1"
                >
                  <div className="px-1 py-1" role="none">
                    <a
                      href="#features"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      tabIndex="-1"
                      id="radix-:R2pjta:0"
                      onClick={() => setMenuOpen(false)}
                    >
                      Características
                    </a>
                    <a
                      href="#about"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      tabIndex="-1"
                      id="radix-:R2pjta3:0"
                      onClick={() => setMenuOpen(false)}
                    >
                      Nosotros
                    </a>
                    <a
                      href="#contact"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      tabIndex="-1"
                      id="radix-:R2pj2ta:0"
                      onClick={() => setMenuOpen(false)}
                    >
                      Contacto
                    </a>
                    <a
                      href="/register"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      tabIndex="-1"
                      id="radix-:R2dpjta:0"
                      onClick={() => setMenuOpen(false)}
                    >
                      Registro
                    </a>
                    <a
                      href="/login"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      tabIndex="-1"
                      id="radix-:R2pjcta:0"
                      onClick={() => setMenuOpen(false)}
                    >
                      Acceso
                    </a>
                  </div>
                </div>
              )}
            </>
          ) : (
            <nav className="space-x-4">
              <a href="#features" className="hover:underline">
                Características
              </a>
              <a href="#about" className="hover:underline">
                Nosotros
              </a>
              <a href="#contact" className="hover:underline">
                Contacto
              </a>
              <a href="/register" className="hover:underline">
                Registro
              </a>
              <a href="/login" className="hover:underline">
                Acceso
              </a>
            </nav>
          )}
        </div>
      </header>

      <section className="bg-blue-100 py-20 text-center px-4">
        <h2 className="text-4xl font-bold mb-4">
          La plataforma integral para profesionales de la salud
        </h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Gestioná turnos, historias clínicas, pacientes y mucho más desde un
          solo lugar. Rápido, seguro y accesible.
        </p>

        <Button
          className="text-lg flex gap-2 items-center mx-auto"
          onClick={() =>
            window.location.assign(
              "https://api.whatsapp.com/send?phone=5491158888423&text=Hola,%20quiero%20saber%20mas%20sobre%Aristas"
            )
          }
        >
          <p>Solicitá una demo</p>
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
        </Button>
      </section>

      <section id="features" className="py-20 bg-white px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-xl font-semibold mb-2">Gestión de Turnos</h3>
            <p>
              Organizá tu agenda con facilidad. Confirmaciones automáticas por
              WhatsApp.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">
              Historias Clínicas Digitales
            </h3>
            <p>
              Accedé a los antecedentes de tus pacientes en cualquier momento,
              desde cualquier lugar.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">
              Privacidad y Seguridad
            </h3>
            <p>
              Cumplimos con los más altos estándares para resguardar los datos
              de tus pacientes.
            </p>
          </div>
        </div>
      </section>

      <section id="about" className="bg-gray-100 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">¿Quiénes somos?</h3>
          <p>
            Somos un equipo de profesionales de la salud y la tecnología con el
            objetivo de modernizar la gestión médica en Latinoamérica.
          </p>
        </div>
      </section>

      <section id="contact" className="pt-20 pb-10 px-4">
        <div className="max-w-xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Contacto</h3>
          <p className="mb-2">
            <a
              href={`mailto:${config.email}`}
              className="text-blue-600 underline"
            >
              {config.email}
            </a>
          </p>
          <p className="mb-2">
            <a
              href={`tel:+${config.phone}`}
              className="text-blue-600 underline"
            >
              {config.phone}
            </a>
          </p>
          <p className="mb-2">{config.address}</p>
          <div className="mt-6">
            <Button
              className="text-lg flex gap-2 items-center mx-auto"
              onClick={() =>
                window.location.assign(
                  "https://api.whatsapp.com/send?phone=5491158888423&text=Hola,%20quiero%20saber%20mas%20sobre%Aristas"
                )
              }
            >
              <p>Solicitá una demo</p>
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
            </Button>
          </div>

          <div className="flex justify-center gap-4 mt-10">
            <a
              href={config.facebook}
              target="_blank"
              className="text-blue-600 underline"
            >
              Facebook
            </a>
            <a
              href={config.instagram}
              target="_blank"
              className="text-blue-600 underline"
            >
              Instagram
            </a>
            <a
              href={config.twitter}
              target="_blank"
              className="text-blue-600 underline"
            >
              Twitter
            </a>
          </div>
        </div>
      </section>

      <footer
        className={`text-white text-center p-4 bg-[${config.theme.colors.primaryColor}]`}
      >
        <p>
          &copy; {new Date().getFullYear()} {config.brand}. Todos los derechos
          reservados.
        </p>
      </footer>
    </main>
  );
}
