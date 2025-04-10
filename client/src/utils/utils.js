import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { config } from "../config";

export const featureFlags = [];

export const getFeatureFlagValue = (feature) => {
  return featureFlags.filter((a) => a.feature === feature)[0].isEnabled;
};

export const tw = String.raw;

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const uploadResource = async (data) => {
  const formData = new FormData();
  formData.append("file", data.file[0]);

  const res = await fetch(config.resourcesLink, {
    method: "POST",
    body: formData,
  }).then((res) => res.json());

  return res;
};

export const getInviteLink = (userId) => {
  return config.inviteLink + userId;
};

export const delay = (ms) => new Promise((res) => setTimeout(res, ms));
