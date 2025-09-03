"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import SplashScreen from "@/components/SplashScreen";

export default function AppShell({
  children,
  splashMinDuration = 1800,
  oncePerSession = true,
}: {
  children: React.ReactNode;
  splashMinDuration?: number;
  oncePerSession?: boolean;
}) {
  const prefersReduced = useReducedMotion();
  const [showSplash, setShowSplash] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const key = "splashDone";
      if (oncePerSession && typeof window !== "undefined" && sessionStorage.getItem(key) === "1") {
        setShowSplash(false);
        setReady(true);
        return;
      }
    } catch {
      // ignore storage errors
    }
    setShowSplash(true);
  }, [oncePerSession]);

  const handleDone = () => {
    setShowSplash(false);
    setReady(true);
    try {
      if (oncePerSession) sessionStorage.setItem("splashDone", "1");
    } catch {}
  };

  return (
    <div className="relative">
      {/* Splash overlay */}
      <AnimatePresence>{showSplash && <SplashScreen onDone={handleDone} minDuration={splashMinDuration} />}</AnimatePresence>

      {/* App content reveal */}
      <motion.div
        initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
        animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 14, filter: ready ? "blur(0px)" : "blur(6px)" }}
        transition={{ duration: prefersReduced ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
        aria-busy={!ready}
      >
        {children}
      </motion.div>
    </div>
  );
}
