
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const phoneNumber = "251913281441"; // Your friend's number
  const message = "Hi! I'm interested in booking a tour in South Ethiopia. Can you help me?";
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a 
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group"
      aria-label="Chat on WhatsApp"
    >
      <div className="absolute right-full mr-4 bg-white text-slate-900 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl border border-slate-100 pointer-events-none">
        Chat with an Expert
      </div>
      <MessageCircle size={28} fill="currentColor" />
    </a>
  );
}
