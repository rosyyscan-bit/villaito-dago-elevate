import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useRealtimeSetting } from "@/hooks/use-realtime-table";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";

const defaultStats = [
  { num: "7", label: "Bedrooms" },
  { num: "1", label: "Private Pool" },
  { num: "1", label: "Rooftop" },
  { num: "∞", label: "Memories" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const { value: aboutData } = useRealtimeSetting("about");

  const title = aboutData?.title || "Your Home in Bandung Awaits";
  const text = aboutData?.text || "Located in the serene & peaceful Dago Pakar area, the luxurious Villaito is the perfect home for families looking for a relaxing getaway.\n\nWith a private pool and spacious living area, it's close enough to the city so you can still enjoy Bandung's culinary & attractions, and yet far enough to provide a tranquil escape from the hustle and bustle of city life.\n\nImmerse yourself in the lush greenery view, enjoy quality time with loved ones and make unforgettable memories in this idyllic retreat.";
  const stats = aboutData?.stats || defaultStats;
  const images = aboutData?.images || [gallery1, gallery2, gallery3];

  return (
    <section id="about" className="section-padding" ref={ref}>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:gap-16 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="text-xs font-medium tracking-[0.3em] text-primary">WELCOME TO VILLAITO DAGO</span>
            <h2 className="mt-4 font-display text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
              {title}
            </h2>
            <div className="gold-line mt-6" />
            {text.split("\n\n").map((p: string, i: number) => (
              <p key={i} className="mt-4 first:mt-8 leading-relaxed text-muted-foreground text-sm sm:text-base">
                {p}
              </p>
            ))}

            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
              {stats.map((stat: any) => (
                <div key={stat.label} className="text-center">
                  <div className="font-display text-2xl sm:text-3xl font-bold text-primary">{stat.num}</div>
                  <div className="mt-1 text-[10px] sm:text-xs tracking-wider text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="grid grid-cols-2 gap-2"
          >
            <img src={images[0] || gallery1} alt="Villa aerial view" loading="lazy" width={1024} height={768} className="col-span-2 object-cover h-48 sm:h-64 w-full" />
            <img src={images[1] || gallery2} alt="Rooftop terrace" loading="lazy" width={1024} height={768} className="object-cover h-36 sm:h-48 w-full" />
            <img src={images[2] || gallery3} alt="Living room" loading="lazy" width={1024} height={768} className="object-cover h-36 sm:h-48 w-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
