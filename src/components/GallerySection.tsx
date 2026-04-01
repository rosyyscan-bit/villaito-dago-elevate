import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useRealtimeTable } from "@/hooks/use-realtime-table";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import bed1 from "@/assets/bedroom-1.jpg";
import bed2 from "@/assets/bedroom-2.jpg";
import heroImg from "@/assets/villa-hero.png";

const fallbackImages = [heroImg, gallery1, gallery2, gallery3, gallery4, bed1, bed2];

const GallerySection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [carouselStart, setCarouselStart] = useState(0);

  const { data: dbGallery } = useRealtimeTable("gallery");
  const allImages = dbGallery.length > 0
    ? dbGallery.map((g: any) => ({ url: g.image_url, type: g.media_type || "image", caption: g.caption }))
    : fallbackImages.map((url) => ({ url, type: "image", caption: "" }));

  // First 4 are pinned, rest go to carousel
  const pinned = allImages.slice(0, 4);
  const rest = allImages.slice(4);

  const carouselVisible = 4;
  const maxStart = Math.max(0, rest.length - carouselVisible);
  const carouselNext = () => setCarouselStart((s) => Math.min(s + 1, maxStart));
  const carouselPrev = () => setCarouselStart((s) => Math.max(s - 1, 0));

  const allForLightbox = [...pinned, ...rest];

  return (
    <section id="gallery" className="section-padding" ref={ref}>
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span className="text-xs font-medium tracking-[0.3em] text-primary">GALLERY</span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold text-foreground">Explore Villaito</h2>
          <div className="gold-line mx-auto mt-6" />
        </div>

        {/* Pinned 4 photos */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 gap-2 md:grid-cols-4">
          {pinned.map((item: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="cursor-pointer overflow-hidden aspect-[4/3]"
              onClick={() => setLightbox(i)}
            >
              {item.type === "video" ? (
                <video src={item.url} className="h-full w-full object-cover" muted />
              ) : (
                <img src={item.url} alt={item.caption || `Gallery ${i + 1}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Small carousel for remaining */}
        {rest.length > 0 && (
          <div className="mt-4 relative">
            {rest.length > carouselVisible && (
              <>
                <button
                  onClick={carouselPrev}
                  disabled={carouselStart === 0}
                  className="absolute -left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border bg-background/80 p-1.5 text-foreground/60 hover:text-primary hover:border-primary transition-colors disabled:opacity-30"
                >
                  <ChevronLeft size={14} />
                </button>
                <button
                  onClick={carouselNext}
                  disabled={carouselStart >= maxStart}
                  className="absolute -right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border bg-background/80 p-1.5 text-foreground/60 hover:text-primary hover:border-primary transition-colors disabled:opacity-30"
                >
                  <ChevronRight size={14} />
                </button>
              </>
            )}
            <div className="overflow-hidden">
              <div
                className="flex gap-2 transition-transform duration-300"
                style={{ transform: `translateX(-${carouselStart * (100 / carouselVisible + 1)}%)` }}
              >
                {rest.map((item: any, i: number) => (
                  <div
                    key={i}
                    className="cursor-pointer overflow-hidden flex-shrink-0 aspect-[4/3]"
                    style={{ width: `calc(${100 / carouselVisible}% - 6px)` }}
                    onClick={() => setLightbox(pinned.length + i)}
                  >
                    {item.type === "video" ? (
                      <video src={item.url} className="h-full w-full object-cover" muted />
                    ) : (
                      <img src={item.url} alt={item.caption || `Gallery ${pinned.length + i + 1}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-4"
            onClick={() => setLightbox(null)}
          >
            <button className="absolute right-4 top-4 sm:right-6 sm:top-6 text-foreground/40 hover:text-foreground transition-colors">
              <X size={24} />
            </button>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground transition-colors"
              onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + allForLightbox.length) % allForLightbox.length); }}
            >
              <ChevronLeft size={28} />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground transition-colors sm:right-14"
              onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % allForLightbox.length); }}
            >
              <ChevronRight size={28} />
            </button>
            {allForLightbox[lightbox]?.type === "video" ? (
              <video src={allForLightbox[lightbox]?.url} controls autoPlay className="max-h-[85vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()} />
            ) : (
              <motion.img
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                src={allForLightbox[lightbox]?.url}
                alt="Gallery fullscreen"
                className="max-h-[85vh] max-w-[90vw] object-contain"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
