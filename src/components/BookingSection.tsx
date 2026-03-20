
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

export function BookingSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, you'd use a service like Formspree or a custom API here
  };

  if (submitted) {
    return (
      <section id="book" className="py-24 bg-slate-900 text-white flex items-center justify-center min-h-[600px]">
        <div className="text-center animate-in zoom-in duration-500">
          <CheckCircle2 className="w-20 h-20 text-red-600 mx-auto mb-6" />
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">Request Received!</h2>
          <p className="text-slate-400 max-w-md mx-auto mb-8 font-medium">
            Thank you for reaching out. Our team in Arba Minch will review your inquiry and get back to you within 24 hours.
          </p>
          <Button 
            onClick={() => setSubmitted(false)}
            variant="outline" 
            className="rounded-full border-slate-700 hover:bg-slate-800 text-white font-bold uppercase tracking-widest text-[10px]"
          >
            Send another message
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section id="book" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-slate-950 rounded-[3.5rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
          
          {/* Contact Info Sidebar */}
          <div className="lg:w-1/3 bg-red-600 p-12 text-white flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 leading-none">Ready for the <br/>Adventure?</h2>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Email Us</p>
                    <p className="font-bold text-sm">info@southethiopiatours.com</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Call / WhatsApp</p>
                    <p className="font-bold text-sm">+251 913 281 441</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Base Office</p>
                    <p className="font-bold text-sm">Arba Minch, Ethiopia</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-12 mt-12 border-t border-white/10">
              <p className="text-xs font-medium opacity-80 leading-relaxed italic">
                "Our local experts are available 24/7 to help you plan the perfect custom itinerary."
              </p>
            </div>
          </div>

          {/* Form Area */}
          <div className="lg:w-2/3 p-12 lg:p-20 bg-slate-900">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                  <Input required placeholder="John Doe" className="bg-slate-800/50 border-slate-700 h-14 rounded-2xl text-white focus:ring-red-600 focus:border-red-600 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                  <Input required type="email" placeholder="john@example.com" className="bg-slate-800/50 border-slate-700 h-14 rounded-2xl text-white focus:ring-red-600 focus:border-red-600 transition-all" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Interested In</label>
                <select className="w-full bg-slate-800/50 border border-slate-700 h-14 rounded-2xl text-white px-4 text-sm focus:outline-none focus:ring-1 focus:ring-red-600">
                  <option>Omo Valley Cultural Tour</option>
                  <option>Danakil Depression Expedition</option>
                  <option>Bale Mountains Trekking</option>
                  <option>Simien Mountains Adventure</option>
                  <option>Custom Multi-Day Trip</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Message / Details</label>
                <Textarea required placeholder="Tell us about your group size, travel dates, and interests..." className="bg-slate-800/50 border-slate-700 min-h-[150px] rounded-2xl text-white focus:ring-red-600 focus:border-red-600 transition-all" />
              </div>

              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 h-16 rounded-2xl text-white font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-red-900/20 group">
                Send Inquiry <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
