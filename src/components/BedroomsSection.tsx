import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRealtimeTable } from "@/hooks/use-realtime-table";
import bed1 from "@/assets/bedroom-1.jpg";

const fallbackRooms = [
  { name: "Lalo Room", description: "Spacious master bedroom with king-size bed and ensuite bathroom", image_url: null },
  { name: "Tinro Room", description: "Cozy room with tropical garden view and modern amenities", image_url: null },
  { name: "Tedok Room", description: "Elegant suite with wooden accents and natural lighting", image_url: null },
  { name: "Modom Room", description: "Comfortable room with queen bed and private balcony", image_url: null },
  { name: "Sare Room", description: "Contemporary room with mountain view and work desk", image_url: null },
  { name: "Sirep Room", description: "Serene retreat with minimalist design and pool access", image_url: null },
  { name: "Bobo Room", description: "Family-friendly room with extra space and amenities", image_url: null },
];

const BedroomsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState(0);

  const { data: dbRooms } = useRealtimeTable("bedrooms");
  const rooms = dbRooms.length > 0 ? dbRooms : fallbackRooms;

  const next = useCallback(() => setCurrent((c) => (c + 1) % rooms.length), [rooms.length]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + rooms.length) % rooms.length), [rooms.length]);

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
  };

  const getVisibleCards = () => {
    const cards = [];
    for (let i = -1; i <= 1; i++) {
      cards.push(rooms[(current + i + rooms.length) % rooms.length]);
    }
    return cards;
  };

  return (
    <section id="bedrooms" className="section-padding" ref={ref}>
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span className="text-xs font-medium tracking-[0.3em] text-primary">ACCOMMODATION</span>
          <h2 className="mt-4 font-display text-4xl font-bold text-foreground">Bedrooms</h2>
          <div className="gold-line mx-auto mt-6" />
        </div>

        <div
          className="relative mt-16"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            onClick={prev}
            className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-primary/30 bg-background/80 p-2 text-primary backdrop-blur-sm transition-all hover:bg-primary hover:text-primary-foreground md:-left-6"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-primary/30 bg-background/80 p-2 text-primary backdrop-blur-sm transition-all hover:bg-primary hover:text-primary-foreground md:-right-6"
          >
            <ChevronRight size={20} />
          </button>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {getVisibleCards().map((room: any, i) => (
              <motion.div
                key={`${room.name}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`glass-card overflow-hidden rounded-sm transition-all ${
                  i === 1 ? "md:scale-105 md:shadow-2xl" : "md:opacity-80"
                }`}
              >
                <img
                  src={room.image_url || bed1}
                  alt={room.name}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="h-56 w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-foreground">{room.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{room.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex justify-center gap-2">
            {rooms.map((_: any, i: number) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all ${
                  i === current ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BedroomsSection;
