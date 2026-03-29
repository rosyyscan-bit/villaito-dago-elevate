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
    const t2 = setTimeout(() => setPhase("done"), 4200);
    const t3 = setTimeout(onComplete, 4600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#080f0c]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-5">
            <motion.img
              src={logo}
              alt="Villaito Logo"
              className="h-16 w-16"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: phase === "text" ? 360 : 0,
                x: phase === "text" ? -16 : 0,
              }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            />
            {phase === "text" && (
              <div className="flex flex-col">
                <motion.span
                  className="font-display text-3xl font-semibold text-foreground"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  transition={{ duration: 0.7, delay: 0.15 }}
                  style={{ overflow: "hidden", whiteSpace: "nowrap" }}
                >
                  Villaito
                </motion.span>
                <motion.span
                  className="font-display text-lg tracking-[0.35em] text-primary"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  transition={{ duration: 0.7, delay: 0.5 }}
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
