import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Thomas D.",
    location: "United Kingdom",
    text: "Pablo is an exceptional guide. His knowledge of the Omo Valley tribes is unparalleled. He doesn't just show you the culture; he helps you understand it. A truly professional and life-changing experience.",
    initials: "TD"
  },
  {
    name: "Janine & Holger",
    location: "Germany",
    text: "We spent 10 days with Pablo exploring the South. He is incredibly flexible and always found the best spots for photography. He treats the local communities with such respect.",
    initials: "JH"
  },
  {
    name: "Catherine L.",
    location: "France",
    text: "If you are planning a trip to Danakil or Omo, look no further. Pablo's organization is top-notch. He handles every detail so you can focus on the beauty of Ethiopia.",
    initials: "CL"
  },
  {
    name: "Markus S.",
    location: "Switzerland",
    text: "The best tour operator in Ethiopia. Pablo's expertise made our trekking and visit to the tribes smooth and unforgettable. He is more than a guide, he is a friend.",
    initials: "MS"
  }
];

export function Reviews() {
  return (
    <section className="py-32 bg-slate-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <h2 className="text-red-600 font-black uppercase tracking-[0.3em] text-xs mb-4">Guest Experiences</h2>
            <h3 className="text-5xl font-black uppercase tracking-tighter leading-none">
              Trusted by <br/><span className="text-slate-500">Global Travelers</span>
            </h3>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/50 px-6 py-3 rounded-2xl border border-slate-700">
            <span className="text-2xl font-black italic">4.9/5</span>
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </div>
          </div>
        </div>
        
        <Carousel 
          opts={{ align: "start", loop: true }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((t, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="border border-slate-800 bg-slate-950/50 rounded-[2.5rem] p-10 h-full flex flex-col justify-between group hover:border-red-600/50 transition-all duration-500">
                  <Quote className="w-10 h-10 text-slate-800 mb-6 group-hover:text-red-600/20 transition-colors" />
                  <div>
                    <p className="text-slate-300 font-medium leading-relaxed mb-10 text-lg italic">
                      "{t.text}"
                    </p>
                  </div>
                  <div className="flex items-center gap-4 border-t border-slate-800 pt-8">
                    <Avatar className="w-12 h-12 border-2 border-red-600">
                      <AvatarFallback className="bg-slate-800 text-white font-bold text-xs">{t.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-black uppercase tracking-widest text-[10px] text-white">{t.name}</h4>
                      <p className="text-slate-500 font-black uppercase tracking-widest text-[8px]">{t.location}</p>
                    </div>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-end gap-3 mt-12">
            <CarouselPrevious className="static translate-y-0 h-14 w-14 border-slate-800 bg-slate-900 hover:bg-red-600 text-white transition-all" />
            <CarouselNext className="static translate-y-0 h-14 w-14 border-slate-800 bg-slate-900 hover:bg-red-600 text-white transition-all" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}