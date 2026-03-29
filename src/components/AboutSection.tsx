import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding" ref={ref}>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs font-medium tracking-[0.3em] text-primary">WELCOME TO VILLAITO DAGO</span>
            <h2 className="mt-4 font-display text-4xl font-bold text-foreground md:text-5xl">
              Your Home in Bandung Awaits
            </h2>
            <div className="gold-line mt-6" />
            <p className="mt-8 leading-relaxed text-muted-foreground">
              Located in the serene & peaceful Dago Pakar area, the luxurious Villaito is the perfect home for families looking for a relaxing getaway.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              With a private pool and spacious living area, it's close enough to the city so you can still enjoy Bandung's culinary & attractions, and yet far enough to provide a tranquil escape from the hustle and bustle of city life.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Immerse yourself in the lush greenery view, enjoy quality time with loved ones and make unforgettable memories in this idyllic retreat.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {[
                { num: "7", label: "Bedrooms" },
                { num: "1", label: "Private Pool" },
                { num: "1", label: "Rooftop" },
                { num: "∞", label: "Memories" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-display text-3xl font-bold text-primary">{stat.num}</div>
                  <div className="mt-1 text-xs tracking-wider text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Image collage */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            <img
              src={gallery1}
              alt="Villa aerial view"
              loading="lazy"
              width={1024}
              height={768}
              className="col-span-2 rounded-sm object-cover h-64 w-full"
            />
            <img
              src={gallery2}
              alt="Rooftop terrace"
              loading="lazy"
              width={1024}
              height={768}
              className="rounded-sm object-cover h-48 w-full"
            />
            <img
              src={gallery3}
              alt="Living room"
              loading="lazy"
              width={1024}
              height={768}
              className="rounded-sm object-cover h-48 w-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
