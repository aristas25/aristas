import { useParams } from "react-router-dom";
import Button from "./common/Button";
import React, { useState, useEffect } from "react";
import { getMercadoPagoAccessToken } from "../utils/utils";
import config from "../config";

const CLIENT_ID = "99922095";
const REDIRECT_URI = "http://localhost:3000/mercadopago/callback";

export default function Mercadopago() {
  const { action } = useParams();
  const [data, setData] = useState(null);
  const code = new URLSearchParams(window.location.search).get("code");
  const conectarConMP = () => {
    window.location.href = `${config.baseUrl}/mercadopago/auth`;
  };

  useEffect(() => {
    const run = async () => {
      if (action === "callback") {
        const mpData = await getMercadoPagoAccessToken(code);
        setData(mpData);
        console.log("data", mpData);
      }

      if (action === "auth") {
        const redirectUrl = `https://auth.mercadopago.com.ar/authorization?client_id=${CLIENT_ID}&response_type=code&platform_id=mp&redirect_uri=${REDIRECT_URI}`;
        window.location.href = redirectUrl;
      }
      if (action === "error") {
        console.error("Error al vincular la cuenta de Mercado Pago");
      }
    };
    run();
  }, [action, code]);

  return (
    <div className="flex flex-col items-center justify-center py-4">
      <h1 className="py-4">Vincular cuenta de Mercado Pago</h1>

      {action === "callback" && (
        <p className="text-green-500">
          {`Se ha vinculado correctamente tu cuenta de Mercado Pago ${JSON.stringify(
            data
          )}`}
        </p>
      )}
      {action === "auth" && (
        <p className="text-blue-500">
          Redirigiendo a Mercado Pago para autorización...
        </p>
      )}
      {action === "error" && (
        <p className="text-red-500">
          Hubo un error al vincular tu cuenta de Mercado Pago
        </p>
      )}

      {action !== "callback" && action !== "auth" && action !== "error" && (
        <Button variant="" onClick={conectarConMP}>
          Conectar
        </Button>
      )}
      {action}
    </div>
  );
}
