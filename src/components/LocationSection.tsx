import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Navigation } from "lucide-react";
import { useRealtimeSetting } from "@/hooks/use-realtime-table";

const LocationSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const { value: locationData } = useRealtimeSetting("location");

  const address = locationData?.address || "Jl. Dago Pakar Permai I No.21, Mekarsaluyu, Kec. Cimenyan, Kabupaten Bandung, Jawa Barat 40198";
  const description = locationData?.description || "The access to our villa is quite easy and does not require guests to go through small alleys. All the roads are paved as we are located in the luxurious Resort Dago Pakar housing complex.";
  const mapUrl = locationData?.mapUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.0!2d107.636101!3d-6.8676097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e717adac3503%3A0xa8934a9e1ee48684!2sJl.%20Dago%20Pakar%20Permai%20I%20No.21!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid";

  return (
    <section id="contact" className="section-padding bg-secondary/30" ref={ref}>
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span className="text-xs font-medium tracking-[0.3em] text-primary">LOCATION</span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold text-foreground">Our Location</h2>
          <div className="gold-line mx-auto mt-6" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mt-12 sm:mt-16 grid gap-8 lg:grid-cols-2"
        >
          <div className="overflow-hidden rounded-sm">
            <iframe
              src={mapUrl}
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Villaito Dago Location"
              className="sm:h-[400px]"
            />
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex items-start gap-4">
              <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground">Address</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{address}</p>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 flex items-start gap-4">
              <Navigation className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground">Easy Access</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
              </div>
            </div>

            <a
              href="https://www.google.com/maps/dir//Jalan+Dago+Pakar+Permai+I+No.21,+Mekarsaluyu,+Kabupaten+Bandung,+Jawa+Barat"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 sm:mt-10 inline-flex w-fit items-center gap-2 rounded-sm border border-primary bg-primary/10 px-6 py-3 text-sm font-medium text-primary transition-all hover:bg-primary hover:text-primary-foreground"
            >
              <Navigation size={16} />
              Get Directions
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LocationSection;
