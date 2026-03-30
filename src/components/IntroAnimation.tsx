import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [phase, setPhase] = useState<"logo" | "text" | "done">("logo");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("text"), 1800);
    const t2 = setTimeout(() => setPhase("done"), 4000);
    const t3 = setTimeout(onComplete, 4500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-5">
            <motion.img
              src={logo}
              alt="Villaito Logo"
              className="h-16 w-16"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: phase === "text" ? 360 : 0,
                x: phase === "text" ? -16 : 0,
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
            {phase === "text" && (
              <div className="flex flex-col">
                <motion.span
                  className="font-display text-3xl font-semibold text-primary"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  style={{ overflow: "hidden", whiteSpace: "nowrap" }}
                >
                  Villaito
                </motion.span>
                <motion.span
                  className="font-display text-xl tracking-[0.3em] text-foreground/80"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  transition={{ duration: 0.6, delay: 0.5 }}
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
