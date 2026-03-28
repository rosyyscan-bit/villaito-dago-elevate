import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [phase, setPhase] = useState<"logo" | "text" | "done">("logo");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("text"), 2000);
    const t2 = setTimeout(() => setPhase("done"), 4500);
    const t3 = setTimeout(onComplete, 5000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-6">
            <motion.img
              src={logo}
              alt="Villaito Logo"
              className="h-20 w-20"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: phase === "text" ? 360 : 0,
                x: phase === "text" ? -20 : 0,
              }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
            {phase === "text" && (
              <div className="flex flex-col">
                <motion.span
                  className="font-display text-4xl font-bold gold-gradient-text"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  style={{ overflow: "hidden", whiteSpace: "nowrap" }}
                >
                  Villaito
                </motion.span>
                <motion.span
                  className="font-display text-2xl tracking-[0.3em] text-foreground"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  style={{ overflow: "hidden", whiteSpace: "nowrap" }}
                >
                  DAGO
                </motion.span>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroAnimation;
