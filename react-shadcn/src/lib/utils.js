import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "./axios";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const csrf = () => axios.get("/sanctum/csrf-cookie");
