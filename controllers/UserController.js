"use strict";

const self = {};
const supabase = require("./db");
const sendEmail = require("../utils/emails");
const _ = require("lodash");

self.getUsers = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .is("deletedAt", null);

    if (error) throw error;

    res.json(data);
  } catch (e) {
    res.json({ error: e.message });
  }
};

self.getUserById = async (req, res) => {
  const userId = req.params.userId;
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .is("deletedAt", null);

    if (error) throw error;

    res.json(_.first(data));
  } catch (e) {
    res.json({ error: e.message });
  }
};

self.getUserByUsername = async (req, res) => {
  const search = req.params.username;
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .is("deletedAt", null);

    if (error) throw error;

    res.json(data);
  } catch (e) {
    res.json({ error: e.message });
  }
};

self.login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .eq("password", password)
      .is("deletedAt", null);

    if (!user) {
      throw new Error("User not found");
    }

    res.json(user);
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
};

self.createUser = async (req, res) => {
  try {
    const user = {
      name: req.body.name,
      lastName: req.body.lastName,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      picture: req.body.pictureUrl || "",
      securityLevel: req.body.securityLevel,
    };

    const { data: newUser, error } = await supabase
      .from("users")
      .insert(user)
      .select();

    const inviteLink = "http://localhost:3000/invite?inviteId=" + newUser.id;

    const html =
      '<div className="flex text-sm w-full px-4"><div className="w-full py-4 flex flex-col justify-start"><p className="p-2">Bienvenid@ ' +
      req.body.name +
      '!</p><p className="p-2">Habilita tu usuario haciendo <a href="' +
      inviteLink +
      '">click aqui</a></p></div></div>';

    await sendEmail(user.email, html);

    return res.json(newUser);
  } catch (e) {
    console.log("User creation error", e.message);
    return res.json(e);
  }
};

self.getUserByIdAndUpdate = async (req, res) => {
  try {
    const userId = req.params.userId;
    const update = req.body;
    const { data: updatedUser, error } = await supabase
      .from("users")
      .update(update)
      .eq("id", userId)
      .is("deletedAt", null);

    res.json(updatedUser);
  } catch (e) {
    logger.error("delete user by id", e.message);
    res.json({ error: e.message });
  }
};

self.deleteUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const update = { deletedAt: new Date() };
    const { data: updatedUser, error } = await supabase
      .from("users")
      .update(update)
      .eq("id", userId);

    res.json(updatedUser);
  } catch (e) {
    logger.error("delete user by id", e.message);
    res.json({ error: e.message });
  }
};

module.exports = self;
