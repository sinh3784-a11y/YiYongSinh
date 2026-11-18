import emailjs from "@emailjs/browser";

import type { ContactData } from "../types/contact";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export async function sendContactEmail(data: ContactData) {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    throw new Error("EmailJS configuration is missing");
  }

  const templateParams = {
    from_name: data.name.trim(),
    name: data.name.trim(),
    reply_to: data.email.trim(),
    message: data.message.trim(),
  };

  const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, {
    publicKey: PUBLIC_KEY,
    limitRate: {
      id: "portfolio-contect",
      throttle: 1000,
    },
  });

  return response;
}
