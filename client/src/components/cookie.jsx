
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiShield } from "react-icons/fi";
import { useLocation } from "react-router-dom";

const Cookie = () => {
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  // Hide on admin routes
  const isAdminPage = location.pathname.startsWith("/admin");

  useEffect(() => {
      if (isAdminPage) return;
    const consent = localStorage.getItem("cookieConsent");
    
    if (!consent) {
      // Small delay for smooth page load
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }

    if (window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: consent === "accepted" ? "granted" : "denied",
      });
    }
  }, [isAdminPage]);
  if (isAdminPage) return null;
  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    if (window.gtag) {
      window.gtag("consent", "update", { analytics_storage: "granted" });
    }
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    if (window.gtag) {
      window.gtag("consent", "update", { analytics_storage: "denied" });
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Subtle backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
           className="fixed inset-0 bg-slate-900/10 z-40 sm:bg-transparent"
          />

          {/* Cookie Banner */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="
              fixed z-50
              bottom-0 sm:bottom-5
              left-0 right-0 sm:left-1/2 sm:-translate-x-1/2
              
              w-full sm:w-[90%] md:w-[680px] lg:w-[720px]
              
              bg-white
              border-t sm:border border-slate-200
              sm:rounded-2xl
              
              shadow-[0_-4px_24px_rgba(0,0,0,0.06)]
              sm:shadow-[0_4px_32px_rgba(0,0,0,0.08)]
            "
          >
            <div className="px-4 py-3.5 sm:px-5 sm:py-4 md:px-6 md:py-4.5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                {/* Content */}
                <div className="flex items-start gap-2.5 sm:gap-3 flex-1 min-w-0">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#FCE4E8] flex items-center justify-center">
                      <FiShield className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#D81B4A]" />
                    </div>
                  </div>
                  
                  <div className="min-w-0">
                    <p className="text-xs sm:text-[13px] md:text-sm text-[#475569] leading-relaxed">
                      We use cookies to improve your experience and support our mission.{" "}
                      <a 
                        href="/cookie-policy" 
                        className="text-[#D81B4A] hover:text-[#B0153D] underline underline-offset-2 font-medium transition-colors whitespace-nowrap"
                      >
                        Learn more
                      </a>
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-2 w-full sm:w-auto flex-shrink-0">
                  <button
                    onClick={handleDecline}
                    className="
                      flex-1 sm:flex-none
                      px-3.5 py-2 sm:px-4 sm:py-2
                      text-[11px] sm:text-xs font-medium
                      text-[#64748B] hover:text-[#1E293B]
                      bg-slate-50 hover:bg-slate-100
                      border border-slate-200
                      rounded-lg
                      transition-all duration-200
                      whitespace-nowrap
                    "
                  >
                    Decline
                  </button>
                  
                  <button
                    onClick={handleAccept}
                    className="
                      flex-1 sm:flex-none
                      px-3.5 py-2 sm:px-4 sm:py-2
                      text-[11px] sm:text-xs font-semibold
                      bg-[#D81B4A] hover:bg-[#B0153D]
                      text-white
                      rounded-lg
                      transition-all duration-200
                      whitespace-nowrap
                      shadow-sm
                    "
                  >
                    Accept All
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cookie;