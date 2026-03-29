import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="section-padding" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="text-[11px] font-medium tracking-[0.3em] text-primary">WELCOME</span>
            <h2 className="mt-4 font-display text-3xl font-semibold text-foreground md:text-4xl">
              Your Home in<br />Bandung Awaits
            </h2>
            <div className="gold-line mt-5" />
            <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
              Located in the serene & peaceful Dago Pakar area, the luxurious Villaito is the perfect home for families looking for a relaxing getaway.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              With a private pool and spacious living area, it's close enough to the city so you can still enjoy Bandung's culinary & attractions, and yet far enough to provide a tranquil escape from the hustle and bustle of city life.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Immerse yourself in the lush greenery view, enjoy quality time with loved ones and make unforgettable memories in this idyllic retreat.
            </p>

            <div className="mt-10 flex gap-10">
              {[
                { num: "7", label: "Bedrooms" },
                { num: "1", label: "Private Pool" },
                { num: "1", label: "Rooftop" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-2xl font-semibold text-primary">{stat.num}</div>
                  <div className="mt-1 text-[11px] tracking-wider text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Images */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="grid grid-cols-2 gap-3"
          >
            <img src={gallery1} alt="Villa aerial view" loading="lazy" width={1024} height={768}
              className="col-span-2 h-60 w-full object-cover" />
            <img src={gallery2} alt="Rooftop terrace" loading="lazy" width={1024} height={768}
              className="h-44 w-full object-cover" />
            <img src={gallery3} alt="Living room" loading="lazy" width={1024} height={768}
              className="h-44 w-full object-cover" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
