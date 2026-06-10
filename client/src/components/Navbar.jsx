

// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FiMenu, FiX, FiChevronDown, FiHeart } from "react-icons/fi";
// import axios from "axios";
// import logo from "/Adiyogi Foundation (1).jpeg";

// //const ServerUrl = "http://localhost:8000";
// const ServerUrl="https://adiyogidonation.onrender.com";
// const navLinks = [
//   { label: "Success Stories", href: "/success-stories" },
//   { label: "Contact", href: "/contact" },
// ];

// /* ─── Helper: Check if donation is within last 48 hours ─── */
// function isWithinLast48Hours(dateString) {
//   const donationDate = new Date(dateString);
//   const now = new Date();
//   const diffInHours = (now - donationDate) / (1000 * 60 * 60);
//   return diffInHours <= 48;
// }

// function DonationTicker() {
//   const [recentDonations, setRecentDonations] = useState([]);
//   const [oldDonations, setOldDonations] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [showRecent, setShowRecent] = useState(false);

//   useEffect(() => {
//     const fetchRecentDonations = async () => {
//       try {
//         const response = await axios.get(`${ServerUrl}/api/payment/donors`, {
//           withCredentials: true,
//         });
        
//         // Extract donors array from response
//         const donors = response.data?.donations || response.data?.data || response.data || [];
        
//         if (Array.isArray(donors) && donors.length > 0) {
//           // Sort by most recent first
//           const sorted = donors
//             .filter(donor => donor.createdAt)
//             .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          
//           // Separate into recent (48h) and old
//           const recent = sorted.filter(donor => isWithinLast48Hours(donor.createdAt));
//           const old = sorted.filter(donor => !isWithinLast48Hours(donor.createdAt));
          
//           setRecentDonations(recent);
//           setOldDonations(old);
//           setShowRecent(recent.length > 0);
//         } else {
//           setRecentDonations([]);
//           setOldDonations([]);
//           setShowRecent(false);
//         }
//       } catch (error) {
//         console.error("Failed to fetch recent donations:", error);
//         setRecentDonations([]);
//         setOldDonations([]);
//         setShowRecent(false);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchRecentDonations();
    
//     // Refresh every 2 minutes to catch new donations
//     const interval = setInterval(fetchRecentDonations, 120000);
//     return () => clearInterval(interval);
//   }, []);

//   // Determine which donations to display with minimum 3 requirement
//   const getDisplayDonations = () => {
//     // Priority 1: Show recent donations (within 48h)
//     if (showRecent && recentDonations.length > 0) {
//       // If we have at least 3 recent donations, show them all
//       if (recentDonations.length >= 3) {
//         return recentDonations;
//       }
//       // If less than 3 recent, fill the rest with old donations
//       const combined = [...recentDonations];
//       const needed = 3 - recentDonations.length;
//       if (oldDonations.length > 0) {
//         combined.push(...oldDonations.slice(0, needed));
//       }
//       return combined;
//     }
    
//     // Priority 2: Show old donations if no recent ones
//     if (oldDonations.length > 0) {
//       // Show minimum 3 old donations (or all if less than 3)
//       return oldDonations.slice(0, Math.max(3, oldDonations.length));
//     }
    
//     return [];
//   };

//   const displayDonations = getDisplayDonations();

//   // If no donations at all, don't show ticker
//   if (!isLoading && displayDonations.length === 0) {
//     return null;
//   }

//   // Repeat array 3 times for smooth infinite scroll (ensure minimum display)
//   const repeatedDonations = displayDonations.length > 0 
//     ? [...displayDonations, ...displayDonations, ...displayDonations]
//     : [];

//   // Get the label text based on what we're showing
//   const getLabelText = () => {
//     if (showRecent && recentDonations.length > 0) {
//       if (displayDonations.length >= 3) {
//         return `${displayDonations.length} Recent`;
//       }
//       return recentDonations.length === 1 ? "1 Recent" : `${recentDonations.length} Recent`;
//     }
//     return displayDonations.length === 1 ? "Donation" : `${displayDonations.length} Donations`;
//   };

//   return (
//     <div
//       className="relative overflow-hidden"
//       style={{
//         height: "46px",
//         background: "linear-gradient(90deg, #FAFAF7 0%, #F3F5EF 50%, #FAFAF7 100%)",
//         borderBottom: "1px solid rgba(30,41,59,0.06)",
//       }}
//     >
//       {/* Loading shimmer */}
//       {isLoading && (
//         <div className="absolute inset-0 flex items-center justify-center">
//           <div className="flex items-center gap-2 sm:gap-3">
//             <div className="h-2 w-2 rounded-full bg-slate-300 animate-pulse" />
//             <div className="h-3 w-24 sm:w-32 rounded bg-slate-200 animate-pulse" />
//             <div className="h-3 w-12 sm:w-16 rounded bg-slate-200 animate-pulse" />
//           </div>
//         </div>
//       )}

//       {/* Label pill */}
//       {displayDonations.length > 0 && (
//         <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
//           <span
//             className="flex items-center gap-1 sm:gap-1.5 rounded-full px-2 sm:px-3.5 py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-white whitespace-nowrap"
//             style={{
//               background: showRecent && recentDonations.length > 0
//                 ? "linear-gradient(135deg, #D81B4A 0%, #C01640 100%)" 
//                 : "linear-gradient(135deg, #64748B 0%, #475569 100%)",
//               boxShadow: showRecent && recentDonations.length > 0
//                 ? "0 2px 12px rgba(216,27,74,0.30)" 
//                 : "0 2px 12px rgba(100,116,139,0.30)",
//             }}
//           >
//             <FiHeart size={8} className="sm:w-[9px] sm:h-[9px]" />
//             {getLabelText()}
//           </span>
//         </div>
//       )}

//       {/* Left fade */}
//       <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-24 bg-gradient-to-r from-[#FAFAF7] to-transparent" />

//       {/* Right fade */}
//       <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-24 bg-gradient-to-l from-[#F3F5EF] to-transparent" />

//       {repeatedDonations.length > 0 && (
//         <motion.div
//           className="flex items-center whitespace-nowrap"
//           style={{ height: "46px" }}
//           animate={{ x: ["0%", "-33.33%"] }}
//           transition={{
//             duration: window.innerWidth < 640 ? 8 : window.innerWidth < 1024 ? 12 : 16,
//             ease: "linear",
//             repeat: Infinity,
//           }}
//         >
//           {repeatedDonations.map((donor, i) => {
//             const donorName = donor.donorName || donor.name || "Anonymous";
//             const amount = parseFloat(donor.amount) || 0;
//             const donationDate = donor.createdAt 
//               ? new Date(donor.createdAt)
//               : null;
            
//             // Calculate time ago
//             let timeAgo = "";
//             if (donationDate) {
//               const diffMs = Date.now() - donationDate.getTime();
//               const diffMins = Math.floor(diffMs / (1000 * 60));
//               const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
//               const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
              
//               if (diffMins < 60) {
//                 timeAgo = `${diffMins}m`;
//               } else if (diffHours < 24) {
//                 timeAgo = `${diffHours}h`;
//               } else {
//                 timeAgo = `${diffDays}d`;
//               }
//             }

//             // Check if this specific donation is recent
//             const isRecentDonation = donationDate && isWithinLast48Hours(donor.createdAt);

//             return (
//               <span
//                 key={`${donor._id || i}-${i}`}
//                 className="inline-flex items-center gap-1 sm:gap-1.5 mx-2 sm:mx-4 text-[11px] sm:text-[13px] font-medium group cursor-default shrink-0"
//                 style={{ color: "#64748B" }}
//                 title={`Donated ${timeAgo} ago`}
//               >
//                 {/* Animated dot - only animate for recent donations */}
//                 <span className="relative flex h-1.5 w-1.5 shrink-0">
//                   {isRecentDonation && showRecent && (
//                     <span
//                       className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
//                       style={{ background: "rgba(138, 174, 59, 0.4)" }}
//                     />
//                   )}
//                   <span
//                     className="relative inline-flex h-1.5 w-1.5 rounded-full"
//                     style={{
//                       background: isRecentDonation && showRecent
//                         ? "linear-gradient(135deg, #8AAE3B, #D81B4A)"
//                         : "linear-gradient(135deg, #94A3B8, #64748B)",
//                     }}
//                   />
//                 </span>

//                 <span 
//                   className="font-semibold transition-colors group-hover:text-[#D81B4A] hidden sm:inline" 
//                   style={{ color: "#1E293B" }}
//                 >
//                   {donorName}
//                 </span>

//                 <span className="text-[10px] opacity-50 mx-0.5 hidden sm:inline" style={{ color: "#94A3B8" }}>•</span>

//                 <span 
//                   className="font-bold text-[11px] sm:text-[12px]" 
//                   style={{ 
//                     color: isRecentDonation && showRecent ? "#8AAE3B" : "#64748B" 
//                   }}
//                 >
//                   ₹{amount.toLocaleString()}
//                 </span>

//                 {/* Time badge */}
//                 {timeAgo && (
//                   <span 
//                     className="text-[9px] sm:text-[10px] opacity-0 group-hover:opacity-100 transition-opacity ml-0.5 sm:ml-1 px-1 sm:px-1.5 py-0.5 rounded-full hidden sm:inline"
//                     style={{ 
//                       color: "#94A3B8",
//                       background: "rgba(148,163,184,0.1)",
//                     }}
//                   >
//                     {timeAgo}
//                   </span>
//                 )}
//               </span>
//             );
//           })}
//         </motion.div>
//       )}
//     </div>
//   );
// }
// /* ─── Main Navbar ─────────────────────────────────────── */
// export default function Navbar() {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 12);
//     handleScroll();
//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     document.body.style.overflow = isOpen ? "hidden" : "";
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [isOpen]);

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');

//         :root {
//           --clr-primary:   #D81B4A;
//           --clr-primary-d: #B0153D;
//           --clr-secondary: #8AAE3B;
//           --clr-accent:    #E8B21C;
//           --clr-navy:      #1E293B;
//           --clr-text:      #1E293B;
//           --clr-muted:     #64748B;
//           --clr-surface:   #FFFFFF;
//           --clr-bg:        #FAFAF7;
//           --clr-bg-alt:    #F3F5EF;
//           --clr-border:    rgba(30,41,59,0.08);
//           --nav-font:      'DM Sans', sans-serif;
//           --display-font:  'Playfair Display', serif;
//           --nav-h-idle:    80px;
//           --nav-h-scroll:  64px;
//           --shadow-nav:    0 8px 40px rgba(30,41,59,0.08);
//           --shadow-glow:   0 14px 36px rgba(216,27,74,0.25);
//         }

//         .nav-root {
//           font-family: var(--nav-font);
//           position: fixed;
//           top: 0; left: 0;
//           width: 100%;
//           z-index: 50;
//           transition: box-shadow 0.3s, background 0.3s;
//         }

//         .nav-bar {
//           background: rgba(250,250,247,0.97);
//           backdrop-filter: blur(16px);
//           -webkit-backdrop-filter: blur(16px);
//           transition: all 0.3s;
//         }
//         .nav-bar.scrolled {
//           background: rgba(250,250,247,0.92);
//           box-shadow: var(--shadow-nav);
//         }

//         .nav-inner {
//           max-width: 1280px;
//           margin: 0 auto;
//           padding: 0 1rem;
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           height: var(--nav-h-idle);
//           transition: height 0.3s;
//         }
//         @media (min-width: 640px) {
//           .nav-inner { padding: 0 1.5rem; }
//         }
//         @media (min-width: 1024px) {
//           .nav-inner { padding: 0 2rem; }
//         }
//         .nav-inner.scrolled { height: var(--nav-h-scroll); }

//         /* Brand */
//         .brand { display: flex; align-items: center; gap: 8px; text-decoration: none; }
//         @media (min-width: 640px) {
//           .brand { gap: 12px; }
//         }
//         .brand-logo-wrap {
//           width: 36px; height: 36px;
//           border-radius: 12px;
//           background: #fff;
//           display: flex; align-items: center; justify-content: center;
//           box-shadow: 0 6px 24px rgba(216,27,74,0.10), 0 0 0 1px rgba(216,27,74,0.08);
//           transition: box-shadow 0.3s, transform 0.25s;
//           overflow: hidden;
//           flex-shrink: 0;
//         }
//         @media (min-width: 640px) {
//           .brand-logo-wrap {
//             width: 44px; height: 44px;
//             border-radius: 14px;
//           }
//         }
//         .brand:hover .brand-logo-wrap {
//           box-shadow: 0 10px 32px rgba(216,27,74,0.18), 0 0 0 1px rgba(216,27,74,0.15);
//           transform: translateY(-1px);
//         }
//         .brand-logo-wrap img { 
//           width: 28px; height: 28px; 
//           object-fit: contain; 
//         }
//         @media (min-width: 640px) {
//           .brand-logo-wrap img { width: 32px; height: 32px; }
//         }

//         .brand-text { display: flex; flex-direction: column; gap: 1px; }
//         .brand-name {
//           font-family: var(--display-font);
//           font-size: clamp(0.85rem, 2vw, 1.05rem);
//           font-weight: 600;
//           color: var(--clr-navy);
//           letter-spacing: -0.01em;
//           line-height: 1.2;
//         }
//         .brand-tagline {
//           font-size: clamp(8px, 1.5vw, 10px);
//           font-weight: 500;
//           letter-spacing: 0.22em;
//           text-transform: uppercase;
//           color: var(--clr-primary);
//           opacity: 0.80;
//         }

//         /* Desktop links */
//         .nav-links { display: none; align-items: center; gap: 24px; }
//         @media (min-width: 768px) { 
//           .nav-links { display: flex; } 
//         }
//         @media (min-width: 1024px) {
//           .nav-links { gap: 32px; }
//         }

//         .nav-link {
//           position: relative;
//           font-size: clamp(12px, 1.2vw, 13.5px);
//           font-weight: 500;
//           color: var(--clr-text);
//           text-decoration: none;
//           padding: 4px 0;
//           transition: color 0.25s;
//           white-space: nowrap;
//         }
//         .nav-link::after {
//           content: '';
//           position: absolute;
//           bottom: -2px; left: 0;
//           height: 2px; width: 0;
//           border-radius: 2px;
//           background: linear-gradient(90deg, var(--clr-primary) 0%, var(--clr-secondary) 100%);
//           transition: width 0.3s ease;
//         }
//         .nav-link:hover { color: var(--clr-primary); }
//         .nav-link:hover::after { width: 100%; }

//         /* CTA Button */
//         .cta-btn {
//           display: inline-flex;
//           align-items: center;
//           gap: 6px;
//           padding: 8px 18px;
//           border-radius: 999px;
//           font-size: clamp(12px, 1.2vw, 13.5px);
//           font-weight: 600;
//           color: #fff;
//           text-decoration: none;
//           background: linear-gradient(135deg, var(--clr-primary) 0%, var(--clr-primary-d) 100%);
//           box-shadow: var(--shadow-glow);
//           transition: transform 0.22s, box-shadow 0.22s, background 0.22s;
//           letter-spacing: 0.01em;
//           border: none;
//           cursor: pointer;
//           white-space: nowrap;
//         }
//         @media (min-width: 1024px) {
//           .cta-btn {
//             padding: 10px 22px;
//             gap: 7px;
//           }
//         }
//         .cta-btn:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 18px 44px rgba(216,27,74,0.35);
//           background: linear-gradient(135deg, var(--clr-primary-d) 0%, var(--clr-primary) 100%);
//         }
//         .cta-btn .cta-heart {
//           animation: pulse-heart 1.8s ease-in-out infinite;
//         }
//         @keyframes pulse-heart {
//           0%, 100% { transform: scale(1); }
//           50% { transform: scale(1.25); }
//         }

//         /* Vertical divider */
//         .nav-divider {
//           width: 1px; height: 24px;
//           background: linear-gradient(to bottom, transparent, var(--clr-border), transparent);
//         }
//         @media (min-width: 1024px) {
//           .nav-divider { height: 28px; }
//         }

//         /* Hamburger */
//         .hamburger-btn {
//           display: flex;
//           width: 38px; height: 38px;
//           border-radius: 10px;
//           background: #fff;
//           border: 1px solid var(--clr-border);
//           align-items: center; justify-content: center;
//           cursor: pointer;
//           color: var(--clr-navy);
//           box-shadow: 0 2px 8px rgba(30,41,59,0.06);
//           transition: background 0.2s;
//           flex-shrink: 0;
//         }
//         @media (min-width: 640px) {
//           .hamburger-btn { width: 40px; height: 40px; }
//         }
//         @media (min-width: 768px) { 
//           .hamburger-btn { display: none; } 
//         }
//         .hamburger-btn:hover { background: #FCE4E8; }

//         /* Mobile drawer */
//         .mobile-drawer {
//           position: absolute;
//           left: 8px; right: 8px;
//           top: calc(100% + 4px);
//           border-radius: 16px;
//           background: rgba(255,255,255,0.97);
//           backdrop-filter: blur(20px);
//           border: 1px solid var(--clr-border);
//           box-shadow: 0 24px 60px rgba(30,41,59,0.12);
//           overflow: hidden;
//         }
//         @media (min-width: 640px) {
//           .mobile-drawer {
//             left: 12px; right: 12px;
//             top: calc(100% + 8px);
//             border-radius: 20px;
//           }
//         }
//         .mobile-links { padding: 8px; }
//         @media (min-width: 640px) {
//           .mobile-links { padding: 12px; }
//         }
//         .mobile-link {
//           display: block;
//           padding: 10px 14px;
//           border-radius: 10px;
//           font-size: 14px;
//           font-weight: 500;
//           color: var(--clr-text);
//           text-decoration: none;
//           transition: background 0.18s, color 0.18s;
//         }
//         @media (min-width: 640px) {
//           .mobile-link {
//             padding: 12px 16px;
//             border-radius: 12px;
//             font-size: 15px;
//           }
//         }
//         .mobile-link:hover { background: #FCE4E8; color: var(--clr-primary); }

//         .mobile-cta {
//           display: flex; align-items: center; justify-content: center; gap: 8px;
//           margin: 6px 0 4px;
//           padding: 12px 18px;
//           border-radius: 12px;
//           background: linear-gradient(135deg, var(--clr-primary) 0%, var(--clr-primary-d) 100%);
//           color: #fff;
//           font-size: 14px;
//           font-weight: 600;
//           text-decoration: none;
//           box-shadow: var(--shadow-glow);
//           transition: opacity 0.2s;
//         }
//         @media (min-width: 640px) {
//           .mobile-cta {
//             margin: 8px 0 4px;
//             padding: 14px 20px;
//             border-radius: 14px;
//             font-size: 15px;
//           }
//         }
//         .mobile-cta:hover { opacity: 0.92; }

//         .mobile-footer {
//           padding: 12px 16px;
//           background: #F3F5EF;
//           border-top: 1px solid var(--clr-border);
//         }
//         @media (min-width: 640px) {
//           .mobile-footer { padding: 14px 20px; }
//         }
//         .mobile-footer p {
//           font-size: 11px;
//           color: var(--clr-muted);
//           line-height: 1.6;
//           margin: 0;
//         }
//         @media (min-width: 640px) {
//           .mobile-footer p { font-size: 12.5px; }
//         }

//         /* Overlay */
//         .mobile-overlay {
//           position: fixed;
//           inset: 0;
//           top: 0;
//           background: rgba(30,41,59,0.28);
//           backdrop-filter: blur(3px);
//           z-index: 40;
//         }
//       `}</style>

//       {/* ── Navbar Container ── */}
//       <div className="nav-root">
//         <DonationTicker />

//         {/* ── Main nav bar ── */}
//         <motion.div
//           className={`nav-bar ${isScrolled ? "scrolled" : ""}`}
//           initial={{ y: -24, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.45, ease: "easeOut" }}
//         >
//           <div className={`nav-inner ${isScrolled ? "scrolled" : ""}`}>
//             {/* Brand */}
//             <motion.a
//               href="/"
//               className="brand"
//               whileHover={{ scale: 1.012 }}
//               whileTap={{ scale: 0.985 }}
//             >
//               <div className="brand-logo-wrap">
//                 <img src={logo} alt="Adiyogi Foundation logo" />
//               </div>
//               <div className="brand-text">
//                 <span className="brand-name">Adiyogi Foundation</span>
//                 <span className="brand-tagline">Bhakti · Prem · Samarpan</span>
//               </div>
//             </motion.a>

//             {/* Desktop nav */}
//             <div className="nav-links">
//               {navLinks.map((link) => (
//                 <a key={link.href} href={link.href} className="nav-link">
//                   {link.label}
//                 </a>
//               ))}

//               <div className="nav-divider" />

//               <motion.a
//                 href="/#donate"
//                 className="cta-btn"
//                 whileHover={{ scale: 1.03 }}
//                 whileTap={{ scale: 0.97 }}
//               >
//                 <FiHeart className="cta-heart" size={14} />
//                 Donate Now
//               </motion.a>
//             </div>

//             {/* Hamburger */}
//             <motion.button
//               type="button"
//               aria-label={isOpen ? "Close menu" : "Open menu"}
//               aria-expanded={isOpen}
//               className="hamburger-btn"
//               whileTap={{ scale: 0.92 }}
//               onClick={() => setIsOpen((v) => !v)}
//             >
//               <AnimatePresence mode="wait" initial={false}>
//                 {isOpen ? (
//                   <motion.span
//                     key="x"
//                     initial={{ rotate: -45, opacity: 0 }}
//                     animate={{ rotate: 0, opacity: 1 }}
//                     exit={{ rotate: 45, opacity: 0 }}
//                     transition={{ duration: 0.16 }}
//                   >
//                     <FiX size={18} className="sm:w-[20px] sm:h-[20px]" />
//                   </motion.span>
//                 ) : (
//                   <motion.span
//                     key="menu"
//                     initial={{ rotate: 45, opacity: 0 }}
//                     animate={{ rotate: 0, opacity: 1 }}
//                     exit={{ rotate: -45, opacity: 0 }}
//                     transition={{ duration: 0.16 }}
//                   >
//                     <FiMenu size={18} className="sm:w-[20px] sm:h-[20px]" />
//                   </motion.span>
//                 )}
//               </AnimatePresence>
//             </motion.button>
//           </div>
//         </motion.div>

//         {/* ── Mobile overlay + drawer ── */}
//         <AnimatePresence>
//           {isOpen && (
//             <>
//               <motion.div
//                 className="mobile-overlay"
//                 style={{ zIndex: 40 }}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 onClick={() => setIsOpen(false)}
//               />

//               <motion.div
//                 className="mobile-drawer"
//                 style={{ zIndex: 50, position: "absolute" }}
//                 initial={{ opacity: 0, y: -10, scale: 0.97 }}
//                 animate={{ opacity: 1, y: 0, scale: 1 }}
//                 exit={{ opacity: 0, y: -10, scale: 0.97 }}
//                 transition={{ duration: 0.22, ease: "easeOut" }}
//               >
//                 <div className="mobile-links">
//                   {navLinks.map((link) => (
//                     <a
//                       key={link.href}
//                       href={link.href}
//                       className="mobile-link"
//                       onClick={() => setIsOpen(false)}
//                     >
//                       {link.label}
//                     </a>
//                   ))}

//                   <a
//                     href="#donate"
//                     className="mobile-cta"
//                     onClick={() => setIsOpen(false)}
//                   >
//                     <FiHeart size={14} className="sm:w-[15px] sm:h-[15px]" />
//                     Donate Now
//                   </a>
//                 </div>

//                 <div className="mobile-footer">
//                   <p>100% secure giving — every rupee reaches those who need it.</p>
//                 </div>
//               </motion.div>
//             </>
//           )}
//         </AnimatePresence>
//       </div>
//     </>
//   );
// }




import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiChevronDown, FiHeart } from "react-icons/fi";
import axios from "axios";
import logo from "/Adiyogi Foundation (1).jpeg";

//const ServerUrl = "http://localhost:8000";
const ServerUrl="https://adiyogidonation.onrender.com";
const navLinks = [
  { label: "Success Stories", href: "/success-stories" },
  { label: "Contact", href: "/contact" },
];

/* ─── Helper: Check if donation is within last 48 hours ─── */
function isWithinLast48Hours(dateString) {
  const donationDate = new Date(dateString);
  const now = new Date();
  const diffInHours = (now - donationDate) / (1000 * 60 * 60);
  return diffInHours <= 48;
}

/* ─── Optimized Donation Ticker ─── */
function DonationTicker() {
  const [displayDonations, setDisplayDonations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showRecent, setShowRecent] = useState(false);
  const [allDonors, setAllDonors] = useState({ recent: [], old: [] });
  const cacheRef = useRef(null);

  useEffect(() => {
    let alive = true;
    
    const fetchDonors = async () => {
      try {
        // Show loading only on first fetch
        if (!cacheRef.current) {
          setIsLoading(true);
        }
        
        const response = await axios.get(`${ServerUrl}/api/payment/donors`, {
          withCredentials: true,
        });
        
        if (!alive) return;
        
        // Extract donors array from response
        const donors = response.data?.donations || response.data?.data || response.data || [];
        
        if (Array.isArray(donors) && donors.length > 0) {
          // Sort by most recent first - LIMIT to first 20 for performance
          const sorted = donors
            .filter(donor => donor.createdAt)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 20); // Only take first 20 for performance
          
          // Separate into recent (48h) and old
          const recent = sorted.filter(donor => isWithinLast48Hours(donor.createdAt));
          const old = sorted.filter(donor => !isWithinLast48Hours(donor.createdAt));
          
          cacheRef.current = { recent, old };
          setAllDonors({ recent, old });
          setShowRecent(recent.length > 0);
        } else {
          cacheRef.current = { recent: [], old: [] };
          setAllDonors({ recent: [], old: [] });
          setShowRecent(false);
        }
      } catch (error) {
        console.error("Failed to fetch recent donations:", error);
        if (!cacheRef.current) {
          cacheRef.current = { recent: [], old: [] };
          setAllDonors({ recent: [], old: [] });
          setShowRecent(false);
        }
      } finally {
        if (alive) {
          setIsLoading(false);
        }
      }
    };

    // Fetch immediately
    fetchDonors();
    
    // Refresh every 2 minutes to catch new donations
    const interval = setInterval(fetchDonors, 120000);
    return () => {
      alive = false;
      clearInterval(interval);
    };
  }, []);

  // Determine which donations to display - memoized for performance
  useEffect(() => {
    if (isLoading) return;
    
    const { recent, old } = allDonors;
    
    // Priority 1: Show recent donations (within 48h)
    if (showRecent && recent.length > 0) {
      // If we have at least 3 recent donations, show them all
      if (recent.length >= 3) {
        setDisplayDonations(recent);
      } else {
        // If less than 3 recent, fill the rest with old donations
        const combined = [...recent];
        const needed = 3 - recent.length;
        if (old.length > 0) {
          combined.push(...old.slice(0, needed));
        }
        setDisplayDonations(combined);
      }
    } else if (old.length > 0) {
      // Priority 2: Show old donations if no recent ones
      setDisplayDonations(old.slice(0, Math.max(3, Math.min(old.length, 5))));
    } else {
      setDisplayDonations([]);
    }
  }, [allDonors, showRecent, isLoading]);

  // If still loading, show skeleton
  if (isLoading) {
    return (
      <div
        className="relative overflow-hidden"
        style={{
          height: "46px",
          background: "linear-gradient(90deg, #FAFAF7 0%, #F3F5EF 50%, #FAFAF7 100%)",
          borderBottom: "1px solid rgba(30,41,59,0.06)",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="h-2 w-2 rounded-full bg-slate-300 animate-pulse" />
            <div className="h-3 w-24 sm:w-32 rounded bg-slate-200 animate-pulse" />
            <div className="h-3 w-12 sm:w-16 rounded bg-slate-200 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  // If no donations at all, don't show ticker
  if (displayDonations.length === 0) {
    return null;
  }

  // Repeat array 3 times for smooth infinite scroll
  const repeatedDonations = [...displayDonations, ...displayDonations, ...displayDonations];

  // Get the label text based on what we're showing
  const getLabelText = () => {
    if (showRecent && allDonors.recent.length > 0) {
      const recentCount = allDonors.recent.length;
      return recentCount === 1 ? "1 Recent" : `${Math.min(recentCount, displayDonations.length)} Recent`;
    }
    return displayDonations.length === 1 ? "Donation" : `${displayDonations.length} Donations`;
  };

  return (
    <div
      className="relative overflow-hidden"
      style={{
        height: "46px",
        background: "linear-gradient(90deg, #FAFAF7 0%, #F3F5EF 50%, #FAFAF7 100%)",
        borderBottom: "1px solid rgba(30,41,59,0.06)",
      }}
    >
      {/* Label pill */}
      {displayDonations.length > 0 && (
        <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <span
            className="flex items-center gap-1 sm:gap-1.5 rounded-full px-2 sm:px-3.5 py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-white whitespace-nowrap"
            style={{
              background: showRecent && allDonors.recent.length > 0
                ? "linear-gradient(135deg, #D81B4A 0%, #C01640 100%)" 
                : "linear-gradient(135deg, #64748B 0%, #475569 100%)",
              boxShadow: showRecent && allDonors.recent.length > 0
                ? "0 2px 12px rgba(216,27,74,0.30)" 
                : "0 2px 12px rgba(100,116,139,0.30)",
            }}
          >
            <FiHeart size={8} className="sm:w-[9px] sm:h-[9px]" />
            {getLabelText()}
          </span>
        </div>
      )}

      {/* Left fade */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-24 bg-gradient-to-r from-[#FAFAF7] to-transparent" />

      {/* Right fade */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-24 bg-gradient-to-l from-[#F3F5EF] to-transparent" />

      {repeatedDonations.length > 0 && (
        <motion.div
          className="flex items-center whitespace-nowrap"
          style={{ height: "46px" }}
          initial={{ x: 0 }}
          animate={{ x: "-33.33%" }}
          transition={{
            duration: window.innerWidth < 640 ? 8 : window.innerWidth < 1024 ? 12 : 16,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {repeatedDonations.map((donor, i) => {
            const donorName = donor.donorName || donor.name || "Anonymous";
            const amount = parseFloat(donor.amount) || 0;
            const donationDate = donor.createdAt 
              ? new Date(donor.createdAt)
              : null;
            
            // Calculate time ago
            let timeAgo = "";
            if (donationDate) {
              const diffMs = Date.now() - donationDate.getTime();
              const diffMins = Math.floor(diffMs / (1000 * 60));
              const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
              const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
              
              if (diffMins < 60) {
                timeAgo = `${diffMins}m`;
              } else if (diffHours < 24) {
                timeAgo = `${diffHours}h`;
              } else {
                timeAgo = `${diffDays}d`;
              }
            }

            // Check if this specific donation is recent
            const isRecentDonation = donationDate && isWithinLast48Hours(donor.createdAt);

            return (
              <span
                key={`${donor._id || i}-${i}`}
                className="inline-flex items-center gap-1 sm:gap-1.5 mx-2 sm:mx-4 text-[11px] sm:text-[13px] font-medium group cursor-default shrink-0"
                style={{ color: "#64748B" }}
                title={`Donated ${timeAgo} ago`}
              >
                {/* Animated dot - only animate for recent donations */}
                <span className="relative flex h-1.5 w-1.5 shrink-0">
                  {isRecentDonation && showRecent && (
                    <span
                      className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                      style={{ background: "rgba(138, 174, 59, 0.4)" }}
                    />
                  )}
                  <span
                    className="relative inline-flex h-1.5 w-1.5 rounded-full"
                    style={{
                      background: isRecentDonation && showRecent
                        ? "linear-gradient(135deg, #8AAE3B, #D81B4A)"
                        : "linear-gradient(135deg, #94A3B8, #64748B)",
                    }}
                  />
                </span>

                <span 
                  className="font-semibold transition-colors group-hover:text-[#D81B4A] hidden sm:inline" 
                  style={{ color: "#1E293B" }}
                >
                  {donorName}
                </span>

                <span className="text-[10px] opacity-50 mx-0.5 hidden sm:inline" style={{ color: "#94A3B8" }}>•</span>

                <span 
                  className="font-bold text-[11px] sm:text-[12px]" 
                  style={{ 
                    color: isRecentDonation && showRecent ? "#8AAE3B" : "#64748B" 
                  }}
                >
                  ₹{amount.toLocaleString()}
                </span>

                {/* Time badge */}
                {timeAgo && (
                  <span 
                    className="text-[9px] sm:text-[10px] opacity-0 group-hover:opacity-100 transition-opacity ml-0.5 sm:ml-1 px-1 sm:px-1.5 py-0.5 rounded-full hidden sm:inline"
                    style={{ 
                      color: "#94A3B8",
                      background: "rgba(148,163,184,0.1)",
                    }}
                  >
                    {timeAgo}
                  </span>
                )}
              </span>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}

/* ─── Main Navbar (unchanged) ─────────────────────────────────────── */
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');

        :root {
          --clr-primary:   #D81B4A;
          --clr-primary-d: #B0153D;
          --clr-secondary: #8AAE3B;
          --clr-accent:    #E8B21C;
          --clr-navy:      #1E293B;
          --clr-text:      #1E293B;
          --clr-muted:     #64748B;
          --clr-surface:   #FFFFFF;
          --clr-bg:        #FAFAF7;
          --clr-bg-alt:    #F3F5EF;
          --clr-border:    rgba(30,41,59,0.08);
          --nav-font:      'DM Sans', sans-serif;
          --display-font:  'Playfair Display', serif;
          --nav-h-idle:    80px;
          --nav-h-scroll:  64px;
          --shadow-nav:    0 8px 40px rgba(30,41,59,0.08);
          --shadow-glow:   0 14px 36px rgba(216,27,74,0.25);
        }

        .nav-root {
          font-family: var(--nav-font);
          position: fixed;
          top: 0; left: 0;
          width: 100%;
          z-index: 50;
          transition: box-shadow 0.3s, background 0.3s;
        }

        .nav-bar {
          background: rgba(250,250,247,0.97);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          transition: all 0.3s;
        }
        .nav-bar.scrolled {
          background: rgba(250,250,247,0.92);
          box-shadow: var(--shadow-nav);
        }

        .nav-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: var(--nav-h-idle);
          transition: height 0.3s;
        }
        @media (min-width: 640px) {
          .nav-inner { padding: 0 1.5rem; }
        }
        @media (min-width: 1024px) {
          .nav-inner { padding: 0 2rem; }
        }
        .nav-inner.scrolled { height: var(--nav-h-scroll); }

        /* Brand */
        .brand { display: flex; align-items: center; gap: 8px; text-decoration: none; }
        @media (min-width: 640px) {
          .brand { gap: 12px; }
        }
        .brand-logo-wrap {
          width: 36px; height: 36px;
          border-radius: 12px;
          background: #fff;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 6px 24px rgba(216,27,74,0.10), 0 0 0 1px rgba(216,27,74,0.08);
          transition: box-shadow 0.3s, transform 0.25s;
          overflow: hidden;
          flex-shrink: 0;
        }
        @media (min-width: 640px) {
          .brand-logo-wrap {
            width: 44px; height: 44px;
            border-radius: 14px;
          }
        }
        .brand:hover .brand-logo-wrap {
          box-shadow: 0 10px 32px rgba(216,27,74,0.18), 0 0 0 1px rgba(216,27,74,0.15);
          transform: translateY(-1px);
        }
        .brand-logo-wrap img { 
          width: 28px; height: 28px; 
          object-fit: contain; 
        }
        @media (min-width: 640px) {
          .brand-logo-wrap img { width: 32px; height: 32px; }
        }

        .brand-text { display: flex; flex-direction: column; gap: 1px; }
        .brand-name {
          font-family: var(--display-font);
          font-size: clamp(0.85rem, 2vw, 1.05rem);
          font-weight: 600;
          color: var(--clr-navy);
          letter-spacing: -0.01em;
          line-height: 1.2;
        }
        .brand-tagline {
          font-size: clamp(8px, 1.5vw, 10px);
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--clr-primary);
          opacity: 0.80;
        }

        /* Desktop links */
        .nav-links { display: none; align-items: center; gap: 24px; }
        @media (min-width: 768px) { 
          .nav-links { display: flex; } 
        }
        @media (min-width: 1024px) {
          .nav-links { gap: 32px; }
        }

        .nav-link {
          position: relative;
          font-size: clamp(12px, 1.2vw, 13.5px);
          font-weight: 500;
          color: var(--clr-text);
          text-decoration: none;
          padding: 4px 0;
          transition: color 0.25s;
          white-space: nowrap;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0;
          height: 2px; width: 0;
          border-radius: 2px;
          background: linear-gradient(90deg, var(--clr-primary) 0%, var(--clr-secondary) 100%);
          transition: width 0.3s ease;
        }
        .nav-link:hover { color: var(--clr-primary); }
        .nav-link:hover::after { width: 100%; }

        /* CTA Button */
        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 18px;
          border-radius: 999px;
          font-size: clamp(12px, 1.2vw, 13.5px);
          font-weight: 600;
          color: #fff;
          text-decoration: none;
          background: linear-gradient(135deg, var(--clr-primary) 0%, var(--clr-primary-d) 100%);
          box-shadow: var(--shadow-glow);
          transition: transform 0.22s, box-shadow 0.22s, background 0.22s;
          letter-spacing: 0.01em;
          border: none;
          cursor: pointer;
          white-space: nowrap;
        }
        @media (min-width: 1024px) {
          .cta-btn {
            padding: 10px 22px;
            gap: 7px;
          }
        }
        .cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 18px 44px rgba(216,27,74,0.35);
          background: linear-gradient(135deg, var(--clr-primary-d) 0%, var(--clr-primary) 100%);
        }
        .cta-btn .cta-heart {
          animation: pulse-heart 1.8s ease-in-out infinite;
        }
        @keyframes pulse-heart {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.25); }
        }

        /* Vertical divider */
        .nav-divider {
          width: 1px; height: 24px;
          background: linear-gradient(to bottom, transparent, var(--clr-border), transparent);
        }
        @media (min-width: 1024px) {
          .nav-divider { height: 28px; }
        }

        /* Hamburger */
        .hamburger-btn {
          display: flex;
          width: 38px; height: 38px;
          border-radius: 10px;
          background: #fff;
          border: 1px solid var(--clr-border);
          align-items: center; justify-content: center;
          cursor: pointer;
          color: var(--clr-navy);
          box-shadow: 0 2px 8px rgba(30,41,59,0.06);
          transition: background 0.2s;
          flex-shrink: 0;
        }
        @media (min-width: 640px) {
          .hamburger-btn { width: 40px; height: 40px; }
        }
        @media (min-width: 768px) { 
          .hamburger-btn { display: none; } 
        }
        .hamburger-btn:hover { background: #FCE4E8; }

        /* Mobile drawer */
        .mobile-drawer {
          position: absolute;
          left: 8px; right: 8px;
          top: calc(100% + 4px);
          border-radius: 16px;
          background: rgba(255,255,255,0.97);
          backdrop-filter: blur(20px);
          border: 1px solid var(--clr-border);
          box-shadow: 0 24px 60px rgba(30,41,59,0.12);
          overflow: hidden;
        }
        @media (min-width: 640px) {
          .mobile-drawer {
            left: 12px; right: 12px;
            top: calc(100% + 8px);
            border-radius: 20px;
          }
        }
        .mobile-links { padding: 8px; }
        @media (min-width: 640px) {
          .mobile-links { padding: 12px; }
        }
        .mobile-link {
          display: block;
          padding: 10px 14px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
          color: var(--clr-text);
          text-decoration: none;
          transition: background 0.18s, color 0.18s;
        }
        @media (min-width: 640px) {
          .mobile-link {
            padding: 12px 16px;
            border-radius: 12px;
            font-size: 15px;
          }
        }
        .mobile-link:hover { background: #FCE4E8; color: var(--clr-primary); }

        .mobile-cta {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          margin: 6px 0 4px;
          padding: 12px 18px;
          border-radius: 12px;
          background: linear-gradient(135deg, var(--clr-primary) 0%, var(--clr-primary-d) 100%);
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          box-shadow: var(--shadow-glow);
          transition: opacity 0.2s;
        }
        @media (min-width: 640px) {
          .mobile-cta {
            margin: 8px 0 4px;
            padding: 14px 20px;
            border-radius: 14px;
            font-size: 15px;
          }
        }
        .mobile-cta:hover { opacity: 0.92; }

        .mobile-footer {
          padding: 12px 16px;
          background: #F3F5EF;
          border-top: 1px solid var(--clr-border);
        }
        @media (min-width: 640px) {
          .mobile-footer { padding: 14px 20px; }
        }
        .mobile-footer p {
          font-size: 11px;
          color: var(--clr-muted);
          line-height: 1.6;
          margin: 0;
        }
        @media (min-width: 640px) {
          .mobile-footer p { font-size: 12.5px; }
        }

        /* Overlay */
        .mobile-overlay {
          position: fixed;
          inset: 0;
          top: 0;
          background: rgba(30,41,59,0.28);
          backdrop-filter: blur(3px);
          z-index: 40;
        }
      `}</style>

      {/* ── Navbar Container ── */}
      <div className="nav-root">
        <DonationTicker />

        {/* ── Main nav bar ── */}
        <motion.div
          className={`nav-bar ${isScrolled ? "scrolled" : ""}`}
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <div className={`nav-inner ${isScrolled ? "scrolled" : ""}`}>
            {/* Brand */}
            <motion.a
              href="/"
              className="brand"
              whileHover={{ scale: 1.012 }}
              whileTap={{ scale: 0.985 }}
            >
              <div className="brand-logo-wrap">
                <img src={logo} alt="Adiyogi Foundation logo" />
              </div>
              <div className="brand-text">
                <span className="brand-name">Adiyogi Foundation</span>
                <span className="brand-tagline">Bhakti · Prem · Samarpan</span>
              </div>
            </motion.a>

            {/* Desktop nav */}
            <div className="nav-links">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="nav-link">
                  {link.label}
                </a>
              ))}

              <div className="nav-divider" />

              <motion.a
                href="/#donate"
                className="cta-btn"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <FiHeart className="cta-heart" size={14} />
                Donate Now
              </motion.a>
            </div>

            {/* Hamburger */}
            <motion.button
              type="button"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className="hamburger-btn"
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsOpen((v) => !v)}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.span
                    key="x"
                    initial={{ rotate: -45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 45, opacity: 0 }}
                    transition={{ duration: 0.16 }}
                  >
                    <FiX size={18} className="sm:w-[20px] sm:h-[20px]" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -45, opacity: 0 }}
                    transition={{ duration: 0.16 }}
                  >
                    <FiMenu size={18} className="sm:w-[20px] sm:h-[20px]" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.div>

        {/* ── Mobile overlay + drawer ── */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                className="mobile-overlay"
                style={{ zIndex: 40 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
              />

              <motion.div
                className="mobile-drawer"
                style={{ zIndex: 50, position: "absolute" }}
                initial={{ opacity: 0, y: -10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.97 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                <div className="mobile-links">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="mobile-link"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </a>
                  ))}

                  <a
                    href="#donate"
                    className="mobile-cta"
                    onClick={() => setIsOpen(false)}
                  >
                    <FiHeart size={14} className="sm:w-[15px] sm:h-[15px]" />
                    Donate Now
                  </a>
                </div>

                <div className="mobile-footer">
                  <p>100% secure giving — every rupee reaches those who need it.</p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}