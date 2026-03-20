
export function Hero() {
  return (
    <section className="relative py-20 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter uppercase mb-6 leading-[0.9]">
          Discover the <span className="text-red-600">Soul</span> of Ethiopia
        </h1>
        <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
          Expert-led journeys through the Omo Valley, Danakil Depression, and beyond. Authentic, sustainable, and unforgettable.
        </p>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-50 rounded-full blur-3xl -z-10 opacity-50" />
    </section>
  );
}
