"use strict";

const self = {};
const supabase = require("./db");
const _ = require("lodash");
const { DateTime } = require("luxon");
const UtilsController = require("../controllers/UtilsController.js");

const PROFESSIONAL = "PROFESSIONAL";
const USER = "USER";
const ADMIN = "ADMIN";

const HOURS_FROM = 9;
const HOURS_TO = 17;

self.getProfessionals = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("type", PROFESSIONAL)
      .is("deleted_at", null);

    if (error) throw error;

    res.json(data);
  } catch (e) {
    res.json({ error: e.message });
  }
};

self.getProfessionalsByName = async (req, res) => {
  const search = req.query.name;
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*, categories(category, id)")
      .eq("type", "PROFESSIONAL")
      .is("deleted_at", null)
      .or(`name.ilike.%${search}%,last_name.ilike.%${search}%`);

    if (error) throw error;

    res.json(data);
  } catch (e) {
    res.json({ error: e.message });
  }
};

self.getAvailableSlots = async (req, res) => {
  try {
    const { professional_id, date } = req.query;

    if (!professional_id || !date) {
      return res.status(400).json({ message: "Faltan parámetros" });
    }

    const selectedDate = DateTime.fromISO(date, {
      zone: "America/Argentina/Buenos_Aires",
    });

    if (!selectedDate.isValid) {
      return res.status(400).json({ message: "Fecha inválida" });
    }

    const today = DateTime.now().setZone("America/Argentina/Buenos_Aires");
    const sixtyDaysLater = today.plus({ days: 60 });

    if (selectedDate < today || selectedDate > sixtyDaysLater) {
      return res
        .status(400)
        .json({ message: "Fecha fuera del rango permitido" });
    }

    const startOfDay = selectedDate.startOf("day").toISO(); // 00:00:00 -03:00
    const endOfDay = selectedDate.endOf("day").toISO(); // 23:59:59 -03:00

    const { data: appointments, error } = await supabase
      .from("appointments")
      .select("*")
      .eq("professional_id", professional_id)
      .eq("status", "confirmed")
      .gte("start_time", startOfDay)
      .lt("start_time", endOfDay)
      .is("deleted_at", null);

    if (error) throw error;

    const takenSlots = appointments.map((a) =>
      DateTime.fromISO(a.start_time).toISO()
    );

    const slots = [];
    for (let hour = HOURS_FROM; hour < HOURS_TO; hour++) {
      for (let min = 0; min < 60; min += 30) {
        const slot = selectedDate.set({ hour, minute: min, second: 0 });
        const slotISO = slot.toISO(); // incluye -03:00

        if (!takenSlots.includes(slotISO)) {
          slots.push(slotISO); // puede devolver "2025-04-18T15:00:00-03:00"
        }
      }
    }

    res.json(slots);
  } catch (e) {
    console.error("Error en getAvailableSlots:", e);
    res.status(500).json({ error: e.message });
  }
};

self.createAppointment = async (req, res) => {
  try {
    const { user_id, professional_id, date } = req.body;

    const start_time = new Date(date);
    const end_time = new Date(start_time.getTime() + 30 * 60000);
    const now = new Date();
    const maxDate = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000);

    if (start_time < now || start_time > maxDate) {
      return res
        .status(400)
        .json({ message: "Fecha fuera del rango permitido" });
    }

    const { data: conflict, error: conflictError } = await supabase
      .from("appointments")
      .select("*")
      .eq("professional_id", professional_id)
      .eq("start_time", start_time.toISOString())
      .eq("status", "confirmed")
      .is("deleted_at", null);

    if (conflictError) throw new Error("Appointment conflict");

    if (conflict.length > 0)
      return res.status(409).json({ message: "Ese turno ya está ocupado" });

    const appointment = {
      user_id: user_id,
      professional_id: professional_id,
      start_time: start_time,
      end_time: end_time,
    };

    const { data: newAappointment, error } = await supabase
      .from("appointments")
      .insert(appointment)
      .select();

    if (error) throw error;

    const { data: newAappointmentInfo, error: errorInfo } = await supabase
      .from("appointments")
      .select("*, user_id(*), professional_id(*, categories(category, id))")
      .eq("id", newAappointment[0].id)
      .is("deleted_at", null);

    if (errorInfo) throw errorInfo;

    const message = await UtilsController.sendWhatsApp({
      template: "confirmed_appointment",
      cellphone: newAappointmentInfo[0].user_id.cellphone,
      prefix: "+549",
      contentVariables: {
        1: newAappointmentInfo[0].user_id.name,
        2: new Date(start_time).toLocaleString("es-AR", {
          dateStyle: "full",
          timeStyle: "short",
        }),
        3: `tenes el turno con ${newAappointmentInfo[0].professional_id.name} ${newAappointmentInfo[0].professional_id.last_name} (${newAappointmentInfo[0].professional_id.categories.category})`,
        4: `En ${newAappointmentInfo[0].professional_id.street} ${newAappointmentInfo[0].professional_id.number}, ${newAappointmentInfo[0].professional_id.city}, ${newAappointmentInfo[0].professional_id.province}`,
      },
    });

    console.log("Mensaje enviado:", message);

    const email = await UtilsController.createConfirmedAppointmentTemplate(
      newAappointmentInfo[0].user_id.email,
      newAappointmentInfo[0].user_id.name,
      `${newAappointmentInfo[0].professional_id.name} ${newAappointmentInfo[0].professional_id.last_name}`,
      `${newAappointmentInfo[0].professional_id.street} ${newAappointmentInfo[0].professional_id.number}, ${newAappointmentInfo[0].professional_id.city}, ${newAappointmentInfo[0].professional_id.province}`,
      newAappointmentInfo[0]
    );

    console.log("Email enviado:", email);

    res.status(201).json(newAappointmentInfo);
  } catch (e) {
    res.json({ error: e.message });
  }
};

self.deleteAppointment = async (req, res) => {
  try {
    const { id: appointmentId } = req.params;

    const { data: appointment, error } = await supabase
      .from("appointments")
      .update({ deleted_at: new Date() })
      .eq("id", appointmentId)
      .select();
    if (error) throw error;

    res.json({ message: "Turno cancelado" });
  } catch (e) {
    res.json({ error: e.message });
  }
};

self.getAppointmentsByuserId = async (req, res) => {
  const user_id = req.params.user_id;
  try {
    const { data, error } = await supabase
      .from("appointments")
      .select("*, professional_id(*, categories(*))")
      .eq("user_id", user_id)
      .is("deleted_at", null)
      .order("start_time", { ascending: true });

    if (error) throw error;

    res.json(data);
  } catch (e) {
    res.json({ error: e.message });
  }
};

self.getAppointmentsByProfessionalId = async (req, res) => {
  const user_id = req.params.user_id;
  try {
    const { data, error } = await supabase
      .from("appointments")
      .select("*, user_id(*), professional_id(*, categories(*))")
      .eq("professional_id", user_id)
      .is("deleted_at", null)
      .order("start_time", { ascending: true });

    if (error) throw error;

    res.json(data);
  } catch (e) {
    res.json({ error: e.message });
  }
};

module.exports = self;
