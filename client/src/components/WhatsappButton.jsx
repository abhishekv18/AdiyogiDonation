
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const WhatsAppButton = () => {
  const [showButton, setShowButton] = useState(false);
  const location = useLocation();

  // Block on admin pages
  const blockedRoutes = ["/admin", "/blogs/","/terms-and-conditions", "/cookie-policy"];

  const isBlockedRoute = blockedRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowButton(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (isBlockedRoute) return null;

  // WhatsApp message
//   const message =
//     "Hello Aim Skills Education Trust, I visited your website and would like to know more about your training programs, consultancy services, skill development initiatives, and opportunities for collaboration. Please share more details. Thank you.";

  return (
    <a
       href="https://wa.me/919175033022?text=Namaste%20%F0%9F%99%8F%2C%20I%20visited%20your%20website%20and%20would%20like%20to%20know%20more%20about%20your%20temple%20services."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={`
        fixed bottom-4 sm:bottom-5 md:bottom-6 right-3 sm:right-4 md:right-5 z-[9999]
        flex items-center justify-center
        rounded-full
        bg-[#1C8C5E]
        shadow-[0_8px_24px_rgba(0,0,0,0.25)] sm:shadow-[0_10px_30px_rgba(0,0,0,0.28)]
        backdrop-blur-md
        transition-all duration-500 ease-out
        hover:bg-[#18794D]
        hover:scale-110
        active:scale-95
        
        /* Responsive sizing */
        w-12 h-12 sm:w-13 sm:h-13 md:w-14 md:h-14

        ${
          showButton
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }
      `}
    >
      <FaWhatsapp 
        size={22} 
        className="text-white sm:size-[24px] md:size-[26px]" 
      />
      
      {/* Optional: Pulse animation ring */}
      <span className="absolute inset-0 rounded-full bg-[#1C8C5E] animate-ping opacity-20" />
    </a>
  );
};

export default WhatsAppButton;