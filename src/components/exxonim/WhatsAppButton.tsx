"use client";

import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  phoneNumber: string;
}

export function WhatsAppButton({ phoneNumber }: WhatsAppButtonProps) {
  if (!phoneNumber) return null;

  const href = phoneNumber.startsWith("http")
    ? phoneNumber
    : `https://wa.me/${phoneNumber.replace(/[^0-9]/g, "")}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact via WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-whatsapp-pulse" />
      <MessageCircle className="relative h-6 w-6" aria-hidden="true" />
    </a>
  );
}
