import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Anti",
    title: "Selalu Pengen Balik Lagi ke Sini",
    text: "Udah beberapa kali nginep disini dan selaluuu suka. Villanya nyaman, cocok untuk kumpul2 keluarga besar, temen2 juga bisa. Kamarnya bersih, handuknya wangi, kasurnya nyaman. Jadi ga heran selalu pengen balik lagi kesini ❤️",
  },
  {
    name: "Mirna",
    title: "You Definitely Will Not Be Disappointed",
    text: "We were a group of 17 and the villa easily accommodated all of us. 7 spacious bedrooms with ensuite bathrooms. The pool was awesome. I would strongly recommend anyone going in big groups to stay here.",
  },
  {
    name: "Rahma",
    title: "Semua Fasilitasnya Kayak Hotel Bintang 5",
    text: "Udah beberapa kali stay di villaito, dari acara keluarga sampai acara kantor. Rekomen bgt buat stay rame-rame, semua fasilitasnya kayak hotel bintang 5.",
  },
  {
    name: "William",
    title: "Will Definitely Book Again",
    text: "Love our stay at Villaito Dago. The villa is clean, has beautiful view, has a lot of facilities. Walking in the morning around villa complex is also very refreshing. Will definitely book again.",
  },
  {
    name: "Christina",
    title: "Everyone Were Very Happy",
    text: "We stayed in the property for company outing and everyone were very happy. The villa looks exactly the same with the photos, clean and well maintained. It feels like staying in 5 star hotels.",
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  const t = testimonials[current];

  return (
    <section className="section-padding" ref={ref}>
      <div className="mx-auto max-w-4xl text-center">
        <span className="text-xs font-medium tracking-[0.3em] text-primary">TESTIMONY</span>
        <h2 className="mt-4 font-display text-4xl font-bold text-foreground">Hear from Our Guests</h2>
        <div className="gold-line mx-auto mt-6" />

        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card mt-16 rounded-sm p-8 md:p-12"
        >
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-primary text-primary" />
            ))}
          </div>
          <h3 className="font-display text-xl font-semibold text-foreground">{t.title}</h3>
          <p className="mt-4 text-muted-foreground leading-relaxed italic">"{t.text}"</p>
          <p className="mt-6 text-sm font-medium text-primary">— {t.name}</p>
        </motion.div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button onClick={prev} className="rounded-full border border-border p-2 text-foreground/60 hover:text-primary hover:border-primary transition-colors">
            <ChevronLeft size={18} />
          </button>
          <span className="text-sm text-muted-foreground">{current + 1} / {testimonials.length}</span>
          <button onClick={next} className="rounded-full border border-border p-2 text-foreground/60 hover:text-primary hover:border-primary transition-colors">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
