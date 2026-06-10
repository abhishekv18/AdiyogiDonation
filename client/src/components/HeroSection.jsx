
// import { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { AnimatePresence, motion } from "framer-motion";
// import { FiArrowLeft, FiArrowRight, FiHeart, FiShield, FiUsers } from "react-icons/fi";

// //const API_BASE_URL = "http://localhost:8000";
// const API_BASE_URL="https://adiyogidonation.onrender.com";
// /* ── helper: wrap index ─────────────────────────────────── */
// const wrap = (i, len) => ((i % len) + len) % len;

// export default function HeroSection() {
//   const [slides, setSlides]             = useState([]);
//   const [active, setActive]             = useState(0);
//   const [direction, setDirection]       = useState(1); // 1=next, -1=prev
//   const [isLoading, setIsLoading]       = useState(true);
//   const intervalRef = useRef(null);

//   // Fetch gallery images from backend
//   useEffect(() => {
//     let alive = true;
    
//     const fetchGalleryImages = async () => {
//       try {
//         setIsLoading(true);
//         const response = await axios.get(`${API_BASE_URL}/api/gallery/get`);
        
//         if (!alive) return;
        
//         // Get images array - only image URLs
//         const images = response.data?.images || [];
        
//         if (Array.isArray(images) && images.length > 0) {
//           // Transform gallery images to slide format
//           const gallerySlides = images
//             .filter(image => image.imageUrl || image.url || image) // Filter out empty images
//             .map((image, index) => {
//               // Handle both object and string cases
//               const imageUrl = typeof image === 'string' 
//                 ? image 
//                 : (image.imageUrl || image.url || '');
              
//               return {
//                 _id: image._id || image.id || `gallery-${index}`,
//                 label: image.title || image.label || image.alt || `Gallery Image ${index + 1}`,
//                 img: imageUrl,
//                 alt: image.alt || image.title || `Gallery image ${index + 1}`,
//               };
//             });
//           console.log("Fetched gallery images:", gallerySlides);
//           if (gallerySlides.length > 0) {
//             setSlides(gallerySlides);
//           } else {
//             setSlides([]);
//           }
//         } else {
//           setSlides([]);
//         }
//       } catch (error) {
//         console.error("Failed to fetch gallery images:", error);
//         if (alive) setSlides([]);
//       } finally {
//         if (alive) setIsLoading(false);
//       }
//     };

//     fetchGalleryImages();
    
//     return () => { 
//       alive = false; 
//     };
//   }, []);

//   const startTimer = () => {
//     clearInterval(intervalRef.current);
//     intervalRef.current = setInterval(() => {
//       setDirection(1);
//       setActive(c => wrap(c + 1, slides.length));
//     }, 4500);
//   };
  
//   useEffect(() => { 
//     startTimer(); 
//     return () => clearInterval(intervalRef.current); 
//   }, [slides.length]);

//   const go = (dir) => {
//     setDirection(dir);
//     setActive(c => wrap(c + dir, slides.length));
//     startTimer();
//   };

//   const prevIdx  = wrap(active - 1, slides.length);
//   const nextIdx  = wrap(active + 1, slides.length);

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

//         :root {
//           --primary:   #D81B4A;
//           --primary-d: #B0153D;
//           --secondary: #8AAE3B;
//           --accent:    #E8B21C;
//           --navy:      #1E293B;
//           --warm-bg:   #FAFAF7;
//           --display:   'Cormorant Garamond', Georgia, serif;
//           --body:      'DM Sans', sans-serif;
//         }

//         .hero-wrap {
//           position: relative;
//           font-family: var(--body);
//           background: var(--warm-bg);
//           padding-top: 80px;
//           overflow: hidden;
//         }
//         @media (max-width: 640px) {
//           .hero-wrap { padding-top: 72px; }
//         }
//         @media (max-width: 480px) {
//           .hero-wrap { padding-top: 64px; }
//         }

//         /* blurred bg */
//         .hero-bg-blur {
//           position: absolute; inset: 0;
//           background-size: cover; background-position: center;
//           filter: blur(32px) brightness(0.75) saturate(1.2);
//           transform: scale(1.14);
//           z-index: 0;
//         }
//         .hero-bg-scrim {
//           position: absolute; inset: 0;
//           background: linear-gradient(
//             180deg,
//             rgba(250,250,247,0.25) 0%,
//             rgba(250,250,247,0.12) 42%,
//             rgba(250,250,247,0.70) 78%,
//             rgba(250,250,247,1.00) 100%
//           );
//           z-index: 1;
//         }

//         /* ── stage ── */
//         .hero-stage {
//           position: relative; z-index: 4;
//           padding: 20px 0 0;
//           max-width: 1400px; margin: 0 auto;
//           overflow: hidden;
//         }
//         @media (min-width: 640px) {
//           .hero-stage { padding: 28px 0 0; }
//         }
//         @media (min-width: 1024px) {
//           .hero-stage { padding: 36px 0 0; }
//         }

//         /* ── carousel track ── */
//         .carousel-viewport {
//           position: relative;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           height: 280px;
//           padding: 0 0;
//         }
//         @media (min-width: 481px) {
//           .carousel-viewport { height: 340px; }
//         }
//         @media (min-width: 641px) {
//           .carousel-viewport { height: 400px; }
//         }
//         @media (min-width: 901px) {
//           .carousel-viewport { height: 460px; }
//         }

//         /* ── CENTER card ── */
//         .card-center {
//           position: relative;
//           width: 82%;
//           height: 100%;
//           border-radius: 14px;
//           overflow: hidden;
//           box-shadow:
//             0 24px 72px rgba(30,41,59,0.24),
//             0 0 0 2px rgba(255,255,255,0.40);
//           z-index: 10;
//           flex-shrink: 0;
//         }
//         @media (min-width: 481px) {
//           .card-center { width: 72%; border-radius: 18px; }
//         }
//         @media (min-width: 769px) {
//           .card-center { width: 62%; border-radius: 24px; }
//         }

//         /* ── SIDE cards (peek) ── */
//         .card-side {
//           position: absolute;
//           top: 8%;
//           height: 84%;
//           width: 8%;
//           border-radius: 12px;
//           overflow: hidden;
//           cursor: pointer;
//           flex-shrink: 0;
//           z-index: 5;
//           transition: transform 0.3s ease, box-shadow 0.3s;
//           box-shadow: 0 12px 40px rgba(30,41,59,0.18);
//         }
//         @media (min-width: 481px) {
//           .card-side { width: 12%; border-radius: 14px; }
//         }
//         @media (min-width: 769px) {
//           .card-side { width: 18%; border-radius: 18px; top: 8%; height: 84%; }
//         }
//         .card-side.prev {
//           left: 1%;
//           transform: perspective(900px) rotateY(8deg) scale(0.92);
//         }
//         @media (min-width: 769px) {
//           .card-side.prev { left: 4%; }
//         }
//         .card-side.next {
//           right: 1%;
//           transform: perspective(900px) rotateY(-8deg) scale(0.92);
//         }
//         @media (min-width: 769px) {
//           .card-side.next { right: 4%; }
//         }
//         .card-side:hover {
//           transform: perspective(900px) rotateY(0deg) scale(0.96) !important;
//           box-shadow: 0 18px 52px rgba(30,41,59,0.24);
//           z-index: 8;
//         }

//         /* shared image style */
//         .card-img {
//           width: 100%; height: 100%;
//           object-fit: cover; display: block;
//           transition: transform 0.7s cubic-bezier(0.22,1,0.36,1);
//         }
//         .card-center:hover .card-img { transform: scale(1.04); }

//         /* side card dim overlay */
//         .card-side::after {
//           content: '';
//           position: absolute; inset: 0;
//           background: rgba(15,15,25,0.38);
//           transition: background 0.3s;
//           pointer-events: none;
//         }
//         .card-side:hover::after { background: rgba(15,15,25,0.18); }

//         /* center card overlays */
//         .center-overlay-bottom {
//           position: absolute; inset: 0; pointer-events: none;
//           background: linear-gradient(
//             to top,
//             rgba(10,18,34,0.80) 0%,
//             rgba(10,18,34,0.25) 50%,
//             transparent 100%
//           );
//         }
//         .center-overlay-left {
//           position: absolute; inset: 0; pointer-events: none;
//           background: linear-gradient(to right, rgba(10,18,34,0.18) 0%, transparent 55%);
//         }

//         /* accent bar left */
//         .center-accent-bar {
//           position: absolute; left: 0; top: 18%; bottom: 18%;
//           width: 3px; border-radius: 0 3px 3px 0;
//           background: linear-gradient(to bottom, var(--primary), var(--accent), var(--secondary));
//           z-index: 12; opacity: 0.90;
//         }
//         @media (min-width: 481px) {
//           .center-accent-bar { width: 4px; }
//         }

//         /* slide counter */
//         .slide-counter {
//           position: absolute; top: 10px; right: 10px; z-index: 15;
//           display: flex; align-items: center; gap: 4px;
//           padding: 4px 8px; border-radius: 999px;
//           background: rgba(255,255,255,0.14);
//           backdrop-filter: blur(8px);
//           border: 1px solid rgba(255,255,255,0.22);
//           font-size: 10px; font-weight: 600;
//           color: rgba(255,255,255,0.90); letter-spacing: 0.06em;
//         }
//         @media (min-width: 481px) {
//           .slide-counter { top: 14px; right: 14px; padding: 5px 10px; font-size: 11px; gap: 5px; }
//         }
//         @media (min-width: 769px) {
//           .slide-counter { top: 18px; right: 18px; padding: 5px 12px; }
//         }

//         /* label */
//         .center-label-wrap {
//           position: absolute;
//           bottom: 0; left: 0; right: 0; z-index: 12;
//           padding: 14px 12px 16px;
//           display: flex; flex-direction: column;
//           align-items: center; gap: 5px; text-align: center;
//         }
//         @media (min-width: 481px) {
//           .center-label-wrap { padding: 20px 16px 22px; gap: 6px; }
//         }
//         @media (min-width: 641px) {
//           .center-label-wrap { padding: 24px 24px 26px; gap: 7px; }
//         }
//         @media (min-width: 769px) {
//           .center-label-wrap { padding: 28px 32px 30px; }
//         }
//         .center-sub {
//           font-size: 8px; font-weight: 600;
//           letter-spacing: 0.15em; text-transform: uppercase;
//           color: rgba(255,255,255,0.58);
//         }
//         @media (min-width: 481px) {
//           .center-sub { font-size: 9px; letter-spacing: 0.16em; }
//         }
//         @media (min-width: 641px) {
//           .center-sub { font-size: 10px; letter-spacing: 0.18em; }
//         }
//         .center-label {
//           font-family: var(--display);
//           font-size: clamp(1.2rem, 4vw, 2.4rem);
//           font-weight: 600; font-style: italic;
//           color: #fff; line-height: 1.15;
//           letter-spacing: -0.015em;
//           text-shadow: 0 3px 20px rgba(10,18,34,0.55);
//         }

//         /* side label hover */
//         .side-label {
//           position: absolute; bottom: 0; left: 0; right: 0; z-index: 12;
//           padding: 8px 8px 10px;
//           text-align: center;
//           font-family: var(--display);
//           font-size: 0.65rem; font-style: italic; font-weight: 600;
//           color: rgba(255,255,255,0.80);
//           background: linear-gradient(to top, rgba(10,18,34,0.70) 0%, transparent 100%);
//           opacity: 0;
//           transition: opacity 0.28s;
//         }
//         @media (min-width: 481px) {
//           .side-label { font-size: 0.75rem; padding: 9px 9px 11px; }
//         }
//         @media (min-width: 769px) {
//           .side-label { font-size: 0.85rem; padding: 10px 10px 12px; }
//         }
//         .card-side:hover .side-label { opacity: 1; }

//         /* arrow buttons — outside the viewport */
//         .arrow-btn {
//           position: absolute; top: 50%; transform: translateY(-50%);
//           z-index: 20;
//           width: 32px; height: 32px; border-radius: 50%;
//           border: 1.5px solid rgba(255,255,255,0.55);
//           background: rgba(255,255,255,0.92);
//           backdrop-filter: blur(10px);
//           color: var(--navy);
//           display: flex; align-items: center; justify-content: center;
//           cursor: pointer;
//           box-shadow: 0 6px 22px rgba(30,41,59,0.16);
//           transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
//         }
//         @media (min-width: 481px) {
//           .arrow-btn { width: 38px; height: 38px; }
//         }
//         @media (min-width: 641px) {
//           .arrow-btn { width: 42px; height: 42px; }
//         }
//         @media (min-width: 769px) {
//           .arrow-btn { width: 46px; height: 46px; }
//         }
//         .arrow-btn:hover {
//           background: #fff;
//           box-shadow: 0 10px 32px rgba(30,41,59,0.22);
//           transform: translateY(-50%) scale(1.10);
//         }
//         .arrow-btn.left  { left: 4px; }
//         .arrow-btn.right { right: 4px; }
//         @media (min-width: 481px) {
//           .arrow-btn.left  { left: 8px; }
//           .arrow-btn.right { right: 8px; }
//         }
//         @media (min-width: 641px) {
//           .arrow-btn.left  { left: 12px; }
//           .arrow-btn.right { right: 12px; }
//         }
//         @media (min-width: 769px) {
//           .arrow-btn.left  { left: 16px; }
//           .arrow-btn.right { right: 16px; }
//         }

//         /* dots */
//         .dots-row {
//           display: flex; justify-content: center; gap: 6px;
//           margin-top: 16px; position: relative; z-index: 10;
//           flex-wrap: wrap;
//         }
//         @media (min-width: 481px) {
//           .dots-row { gap: 8px; margin-top: 20px; }
//         }
//         @media (min-width: 769px) {
//           .dots-row { margin-top: 22px; }
//         }
//         .hero-dot {
//           height: 4px; border-radius: 4px; border: none;
//           background: rgba(216,27,74,0.20);
//           cursor: pointer; padding: 0;
//           transition: width 0.38s ease, background 0.38s ease;
//           min-width: 6px;
//         }
//         @media (min-width: 481px) {
//           .hero-dot { height: 5px; border-radius: 5px; }
//         }
//         .hero-dot.on  { width: 24px; background: var(--primary); }
//         @media (min-width: 481px) {
//           .hero-dot.on { width: 30px; }
//         }
//         .hero-dot.off { width: 6px; }
//         @media (min-width: 481px) {
//           .hero-dot.off { width: 8px; }
//         }
//         .hero-dot.off:hover { background: rgba(216,27,74,0.45); }

//         /* wave */
//         .wave-wrap {
//           position: relative; z-index: 5;
//           margin-top: 16px; line-height: 0; overflow: hidden;
//         }
//         @media (min-width: 481px) {
//           .wave-wrap { margin-top: 22px; }
//         }
//         @media (min-width: 769px) {
//           .wave-wrap { margin-top: 28px; }
//         }
//         .wave-svg { display: block; width: 100%; height: auto; }

//         /* trust strip */
//         .hero-below { background: #fff; position: relative; z-index: 5; }
//         .trust-strip {
//           max-width: 1080px; margin: 0 auto;
//           padding: 12px 16px 18px;
//           display: flex; flex-wrap: wrap;
//           align-items: center; justify-content: center;
//           gap: 6px 14px;
//         }
//         @media (min-width: 481px) {
//           .trust-strip { padding: 14px 18px 22px; gap: 8px 16px; }
//         }
//         @media (min-width: 641px) {
//           .trust-strip { padding: 18px 24px 26px; gap: 8px 20px; }
//         }
//         .trust-item {
//           display: inline-flex; align-items: center; gap: 4px;
//           font-size: 10px; font-weight: 500; color: #64748B;
//           white-space: nowrap;
//         }
//         @media (min-width: 481px) {
//           .trust-item { font-size: 11px; gap: 5px; }
//         }
//         @media (min-width: 641px) {
//           .trust-item { font-size: 12px; gap: 6px; }
//         }
//         .ti-green { color: var(--secondary); }
//         .ti-red   { color: var(--primary); }
//         .trust-sep { 
//           width: 1px; height: 12px; 
//           background: #e2e8f0; flex-shrink: 0; 
//         }
//         @media (min-width: 481px) {
//           .trust-sep { height: 14px; }
//         }
//         @media (min-width: 641px) {
//           .trust-sep { height: 16px; }
//         }
//         @media (max-width: 480px) { 
//           .trust-sep { display: none; } 
//         }
//         @media (max-width: 640px) { 
//           .trust-sep { display: none; } 
//         }
//         @media (min-width: 641px) {
//           .trust-sep { display: block; }
//         }
//       `}</style>

//       <section className="hero-wrap">
//         {/* Blurred BG */}
//         <AnimatePresence mode="sync">
//           <motion.div
//             key={`bg-${active}`}
//             className="hero-bg-blur"
//             style={{ backgroundImage: `url(${slides[active]?.img})` }}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 1.4 }}
//           />
//         </AnimatePresence>
//         <div className="hero-bg-scrim" />

//         <div className="mb-20"></div>
        
//         {/* Stage */}
//         <div className="hero-stage">
//           <div className="carousel-viewport">

//             {/* ── PREV peek card ── */}
//             <div
//               className="card-side prev"
//               onClick={() => go(-1)}
//               role="button"
//               aria-label="Previous slide"
//             >
//               <img
//                 src={slides[prevIdx]?.img}
//                 alt={slides[prevIdx]?.alt}
//                 className="card-img"
//               />
//               <div className="side-label">{slides[prevIdx]?.label}</div>
//             </div>

//             {/* ── CENTER card ── */}
//         {/* ── CENTER card ── */}
// <div className="card-center">
//   {/* cross-fade images - adjusted to show more top portion */}
//   <AnimatePresence mode="sync">
//     <motion.img
//       key={`center-${active}`}
//       src={slides[active]?.img}
//       alt={slides[active]?.alt}
//       className="card-img"
//       style={{ 
//         position: "absolute", 
//         inset: 0,
//         objectPosition: "center 27%", // Show more of the top portion
//       }}
//       initial={{ opacity: 0, scale: 1.05, x: direction * 40 }}
//       animate={{ opacity: 1, scale: 1, x: 0 }}
//       exit={{ opacity: 0, scale: 0.97, x: direction * -30 }}
//       transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
//     />
//   </AnimatePresence>

//   <div className="center-overlay-bottom" />
//   <div className="center-overlay-left" />
//   {/* REMOVED: center-accent-bar */}

//   {/* counter */}
//   <div className="slide-counter">
//     {active + 1} / {slides.length}
//   </div>

//   {/* label */}
//   <AnimatePresence mode="wait">
//     <motion.div
//       key={`label-${active}`}
//       className="center-label-wrap"
//       initial={{ opacity: 0, y: 14 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -10 }}
//       transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
//     >
//       <span className="center-sub ">Adiyogi Foundation</span>
//     </motion.div>
//   </AnimatePresence>
// </div>

//             {/* ── NEXT peek card ── */}
//             <div
//               className="card-side next"
//               onClick={() => go(1)}
//               role="button"
//               aria-label="Next slide"
//             >
//               <img
//                 src={slides[nextIdx]?.img}
//                 alt={slides[nextIdx]?.alt}
//                 className="card-img"
//               />
//               <div className="side-label">{slides[nextIdx]?.label}</div>
//             </div>

//             {/* Arrow buttons */}
//             <motion.button
//               type="button" aria-label="Previous"
//               className="arrow-btn left"
//               whileTap={{ scale: 0.90 }}
//               onClick={() => go(-1)}
//             >
//               <FiArrowLeft size={16} className="sm:w-[18px] sm:h-[18px] lg:w-[20px] lg:h-[20px]" />
//             </motion.button>

//             <motion.button
//               type="button" aria-label="Next"
//               className="arrow-btn right"
//               whileTap={{ scale: 0.90 }}
//               onClick={() => go(1)}
//             >
//               <FiArrowRight size={16} className="sm:w-[18px] sm:h-[18px] lg:w-[20px] lg:h-[20px]" />
//             </motion.button>
//           </div>

//           {/* Dots */}
//           <div className="dots-row">
//             {slides.map((_, i) => (
//               <button
//                 key={i} type="button" aria-label={`Slide ${i + 1}`}
//                 className={`hero-dot ${i === active ? "on" : "off"}`}
//                 onClick={() => { setDirection(i > active ? 1 : -1); setActive(i); startTimer(); }}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Wave */}
//         <div className="wave-wrap">
//           <svg className="wave-svg" viewBox="0 0 1440 82" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
//             <path d="M0,28 C280,82 560,0 720,36 C880,72 1160,6 1440,40 L1440,82 L0,82 Z" fill="rgba(216,27,74,0.045)" />
//             <path d="M0,34 C200,78 460,2 720,40 C980,78 1220,6 1440,42 L1440,82 L0,82 Z" fill="#ffffff" />
//           </svg>
//         </div>

//         {/* Trust strip */}
//         <div className="hero-below">
//           <div className="trust-strip">
//             <span className="trust-item"><FiShield size={11} className="sm:w-[12px] sm:h-[12px] lg:w-[13px] lg:h-[13px] ti-green" />Secure &amp; Encrypted Giving</span>
//             <div className="trust-sep" />
//             <span className="trust-item"><FiUsers size={11} className="sm:w-[12px] sm:h-[12px] lg:w-[13px] lg:h-[13px] ti-red" />2,03,000+ Lives Touched</span>
//             <div className="trust-sep" />
//             <span className="trust-item"><FiShield size={11} className="sm:w-[12px] sm:h-[12px] lg:w-[13px] lg:h-[13px] ti-red" />Government Certified</span>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }
import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowLeft, FiArrowRight, FiShield, FiUsers } from "react-icons/fi";

const API_BASE_URL = "https://adiyogidonation.onrender.com";

const wrap = (i, len) => ((i % len) + len) % len;

/* ── Preload a single image URL, returns a promise ── */
const preloadImage = (src) =>
  new Promise((resolve) => {
    if (!src) return resolve(src);
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => resolve(src);
    img.src = src;
  });

export default function HeroSection() {
  const [slides, setSlides] = useState([]);
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [apiLoading, setApiLoading] = useState(true);
  const [centerLoaded, setCenterLoaded] = useState(false);
  const [imageErrors, setImageErrors] = useState(new Set());
  const intervalRef = useRef(null);
  const loadedImgsRef = useRef(new Set());
  const [loadedImgs, setLoadedImgs] = useState(new Set());

  /* ── Fetch gallery ── */
  useEffect(() => {
    let alive = true;
    const fetchGalleryImages = async () => {
      try {
        setApiLoading(true);
        const response = await axios.get(`${API_BASE_URL}/api/gallery/get`);
        if (!alive) return;

        const images = response.data?.images || [];
        if (Array.isArray(images) && images.length > 0) {
          const gallerySlides = images
            .filter((image) => image.imageUrl || image.url || image)
            .map((image, index) => {
              const imageUrl =
                typeof image === "string"
                  ? image
                  : image.imageUrl || image.url || "";
              return {
                _id: image._id || image.id || `gallery-${index}`,
                label: image.title || image.label || image.alt || `Gallery Image ${index + 1}`,
                img: imageUrl,
                alt: image.alt || image.title || `Gallery image ${index + 1}`,
              };
            });

          if (gallerySlides.length > 0) {
            setSlides(gallerySlides);

            // Preload first 3 slides (visible immediately), then rest in background
            const priority = gallerySlides.slice(0, 3);
            const rest = gallerySlides.slice(3);

            const preloadBatch = async (batch) => {
              await Promise.all(
                batch.map(async (slide) => {
                  await preloadImage(slide.img);
                  if (alive) {
                    loadedImgsRef.current.add(slide.img);
                    setLoadedImgs(new Set(loadedImgsRef.current));
                  }
                })
              );
            };

            // Load priority batch first, then the rest
            await preloadBatch(priority);
            preloadBatch(rest);
          } else {
            setSlides([]);
          }
        } else {
          setSlides([]);
        }
      } catch (error) {
        console.error("Failed to fetch gallery images:", error);
        if (alive) setSlides([]);
      } finally {
        if (alive) setApiLoading(false);
      }
    };

    fetchGalleryImages();
    return () => { alive = false; };
  }, []);

  /* ── Preload adjacent slides when active changes ── */
  useEffect(() => {
    if (slides.length === 0) return;

    const preloadAdjacent = async () => {
      const adjacentIndexes = [
        wrap(active - 1, slides.length),
        wrap(active + 1, slides.length),
      ];
      
      const toLoad = adjacentIndexes
        .map((idx) => slides[idx]?.img)
        .filter((img) => img && !loadedImgsRef.current.has(img));

      if (toLoad.length > 0) {
        await Promise.all(toLoad.map(preloadImage));
        toLoad.forEach((img) => loadedImgsRef.current.add(img));
        setLoadedImgs(new Set(loadedImgsRef.current));
      }
    };

    preloadAdjacent();
  }, [active, slides]);

  /* ── Reset center loaded state when active changes ── */
  useEffect(() => {
    setCenterLoaded(false);
  }, [active]);

  /* ── Auto-play ── */
  const startTimer = useCallback(() => {
    clearInterval(intervalRef.current);
    if (slides.length > 0) {
      intervalRef.current = setInterval(() => {
        setDirection(1);
        setActive((c) => wrap(c + 1, slides.length));
      }, 4500);
    }
  }, [slides.length]);

  useEffect(() => {
    startTimer();
    return () => clearInterval(intervalRef.current);
  }, [startTimer]);

  const go = (dir) => {
    setDirection(dir);
    setActive((c) => wrap(c + dir, slides.length));
    startTimer();
  };

  const handleImageError = (imageUrl) => {
    setImageErrors((prev) => new Set([...prev, imageUrl]));
  };

  const prevIdx = wrap(active - 1, slides.length);
  const nextIdx = wrap(active + 1, slides.length);

  /* ── Skeleton shimmer while API is loading ── */
  if (apiLoading) {
    return (
      <>
        <style>{skeletonCSS}</style>
        <section className="hero-wrap">
          <div className="skeleton-stage">
            <div className="skeleton-side" />
            <div className="skeleton-center">
              <div className="skeleton-shimmer" />
            </div>
            <div className="skeleton-side" />
          </div>
          <div className="skeleton-dots">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`skeleton-dot ${i === 0 ? "long" : ""}`} />
            ))}
          </div>
          <div className="skeleton-trust">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="skeleton-trust-item" />
            ))}
          </div>
        </section>
      </>
    );
  }

  if (!slides.length) return null;

  return (
    <>
      <style>{mainCSS}</style>

      <section className="hero-wrap">
        {/* Blurred BG */}
        <AnimatePresence mode="sync">
          <motion.div
            key={`bg-${active}`}
            className="hero-bg-blur"
            style={{ backgroundImage: `url(${slides[active]?.img})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4 }}
          />
        </AnimatePresence>
        <div className="hero-bg-scrim" />

        <div className="mb-20" />

        {/* Stage */}
        <div className="hero-stage">
          <div className="carousel-viewport">
            {/* PREV peek */}
            <div
              className="card-side prev"
              onClick={() => go(-1)}
              role="button"
              aria-label="Previous slide"
            >
              {loadedImgs.has(slides[prevIdx]?.img) && !imageErrors.has(slides[prevIdx]?.img) ? (
                <img 
                  src={slides[prevIdx]?.img} 
                  alt={slides[prevIdx]?.alt} 
                  className="card-img"
                  loading="lazy"
                  fetchpriority="low"
                  onError={() => handleImageError(slides[prevIdx]?.img)}
                />
              ) : (
                <div 
                  className="img-placeholder" 
                  style={{ backgroundImage: `url(${slides[prevIdx]?.img})`, backgroundPosition: "center" }} 
                />
              )}
              <div className="side-label">{slides[prevIdx]?.label}</div>
            </div>

            {/* CENTER */}
            <div className="card-center">
              {/* LQIP with correct positioning */}
              <div
                className="img-lqip"
                style={{ 
                  backgroundImage: `url(${slides[active]?.img})`,
                  opacity: centerLoaded ? 0 : 1,
                  transition: "opacity 0.5s ease",
                }}
              />

              {!imageErrors.has(slides[active]?.img) ? (
                <AnimatePresence mode="sync">
                  <motion.img
                    key={`center-${active}`}
                    src={slides[active]?.img}
                    alt={slides[active]?.alt}
                    className="card-img"
                    loading="eager"
                    fetchpriority="high"
                    onLoad={() => setCenterLoaded(true)}
                    onError={() => handleImageError(slides[active]?.img)}
                    style={{ 
                      position: "absolute", 
                      inset: 0, 
                      objectPosition: "center 27%", 
                      zIndex: 2 
                    }}
                    initial={{ opacity: 0, scale: 1.05, x: direction * 40 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.97, x: direction * -30 }}
                    transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                  />
                </AnimatePresence>
              ) : (
                <div className="image-fallback">
                  <span>Image Unavailable</span>
                </div>
              )}

              <div className="center-overlay-bottom" />
              <div className="center-overlay-left" />

              <div className="slide-counter">{active + 1} / {slides.length}</div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`label-${active}`}
                  className="center-label-wrap"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="center-sub">Adiyogi Foundation</span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* NEXT peek */}
            <div
              className="card-side next"
              onClick={() => go(1)}
              role="button"
              aria-label="Next slide"
            >
              {loadedImgs.has(slides[nextIdx]?.img) && !imageErrors.has(slides[nextIdx]?.img) ? (
                <img 
                  src={slides[nextIdx]?.img} 
                  alt={slides[nextIdx]?.alt} 
                  className="card-img"
                  loading="lazy"
                  fetchpriority="low"
                  onError={() => handleImageError(slides[nextIdx]?.img)}
                />
              ) : (
                <div 
                  className="img-placeholder" 
                  style={{ backgroundImage: `url(${slides[nextIdx]?.img})`, backgroundPosition: "center" }} 
                />
              )}
              <div className="side-label">{slides[nextIdx]?.label}</div>
            </div>

            {/* Arrows */}
            <motion.button 
              type="button" 
              aria-label="Previous" 
              className="arrow-btn left" 
              whileTap={{ scale: 0.90 }} 
              onClick={() => go(-1)}
            >
              <FiArrowLeft size={16} />
            </motion.button>
            <motion.button 
              type="button" 
              aria-label="Next" 
              className="arrow-btn right" 
              whileTap={{ scale: 0.90 }} 
              onClick={() => go(1)}
            >
              <FiArrowRight size={16} />
            </motion.button>
          </div>

          {/* Dots */}
          <div className="dots-row">
            {slides.map((_, i) => (
              <button
                key={i} 
                type="button" 
                aria-label={`Slide ${i + 1}`}
                className={`hero-dot ${i === active ? "on" : "off"}`}
                onClick={() => { 
                  setDirection(i > active ? 1 : -1); 
                  setActive(i); 
                  startTimer(); 
                }}
              />
            ))}
          </div>
        </div>

        {/* Wave */}
        <div className="wave-wrap">
          <svg className="wave-svg" viewBox="0 0 1440 82" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,28 C280,82 560,0 720,36 C880,72 1160,6 1440,40 L1440,82 L0,82 Z" fill="rgba(216,27,74,0.045)" />
            <path d="M0,34 C200,78 460,2 720,40 C980,78 1220,6 1440,42 L1440,82 L0,82 Z" fill="#ffffff" />
          </svg>
        </div>

        {/* Trust strip */}
        <div className="hero-below">
          <div className="trust-strip">
            <span className="trust-item"><FiShield size={11} className="ti-green" />Secure &amp; Encrypted Giving</span>
            <div className="trust-sep" />
            <span className="trust-item"><FiUsers size={11} className="ti-red" />2,03,000+ Lives Touched</span>
            <div className="trust-sep" />
            <span className="trust-item"><FiShield size={11} className="ti-red" />Government Certified</span>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─────────────────────────────────────────────
   SKELETON CSS
───────────────────────────────────────────── */
const skeletonCSS = `
  @keyframes shimmer {
    0%   { background-position: -800px 0; }
    100% { background-position:  800px 0; }
  }
  .hero-wrap {
    font-family: 'DM Sans', sans-serif;
    background: #FAFAF7;
    padding-top: 80px;
    overflow: hidden;
  }
  .skeleton-stage {
    max-width: 1400px; margin: 40px auto 0;
    display: flex; align-items: center; justify-content: center;
    height: 320px; gap: 8px; padding: 0 16px;
  }
  .skeleton-center {
    width: 72%; height: 100%; border-radius: 18px; overflow: hidden;
    background: #e2e8f0; position: relative;
  }
  .skeleton-side {
    width: 12%; height: 84%; border-radius: 14px;
    background: #e2e8f0; opacity: 0.6;
    flex-shrink: 0;
  }
  .skeleton-shimmer {
    position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%);
    background-size: 800px 100%;
    animation: shimmer 1.5s infinite linear;
  }
  .skeleton-dots {
    display: flex; justify-content: center; gap: 8px; margin-top: 18px;
  }
  .skeleton-dot {
    height: 5px; border-radius: 5px;
    background: #e2e8f0; width: 8px;
  }
  .skeleton-dot.long { width: 28px; background: rgba(216,27,74,0.25); }
  .skeleton-trust {
    display: flex; justify-content: center; gap: 16px;
    padding: 20px 16px; margin-top: 28px;
    background: #fff;
  }
  .skeleton-trust-item {
    height: 12px; width: 120px; border-radius: 6px;
    background: #e2e8f0;
  }
`;

/* ─────────────────────────────────────────────
   MAIN CSS
───────────────────────────────────────────── */
const mainCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
  
  :root {
    --primary: #D81B4A; --primary-d: #B0153D;
    --secondary: #8AAE3B; --accent: #E8B21C;
    --navy: #1E293B; --warm-bg: #FAFAF7;
    --display: 'Cormorant Garamond', Georgia, serif;
    --body: 'DM Sans', sans-serif;
  }
  
  .hero-wrap { 
    position: relative; font-family: var(--body); background: var(--warm-bg); 
    padding-top: 80px; overflow: hidden; 
  }
  @media (max-width:640px) { .hero-wrap { padding-top:72px; } }
  @media (max-width:480px) { .hero-wrap { padding-top:64px; } }
  
  .hero-bg-blur { 
    position:absolute; inset:0; background-size:cover; background-position:center; 
    filter:blur(32px) brightness(0.75) saturate(1.2); transform:scale(1.14); z-index:0; 
  }
  .hero-bg-scrim { 
    position:absolute; inset:0; 
    background:linear-gradient(180deg,rgba(250,250,247,0.25) 0%,rgba(250,250,247,0.12) 42%,rgba(250,250,247,0.70) 78%,rgba(250,250,247,1.00) 100%); 
    z-index:1; 
  }
  
  .hero-stage { 
    position:relative; z-index:4; padding:20px 0 0; max-width:1400px; margin:0 auto; overflow:hidden; 
  }
  @media (min-width:640px) { .hero-stage { padding:28px 0 0; } }
  @media (min-width:1024px) { .hero-stage { padding:36px 0 0; } }
  
  .carousel-viewport { 
    position:relative; display:flex; align-items:center; justify-content:center; height:280px; 
  }
  @media (min-width:481px) { .carousel-viewport { height:340px; } }
  @media (min-width:641px) { .carousel-viewport { height:400px; } }
  @media (min-width:901px) { .carousel-viewport { height:460px; } }
  
  .card-center { 
    position:relative; width:82%; height:100%; border-radius:14px; overflow:hidden; 
    box-shadow:0 24px 72px rgba(30,41,59,0.24),0 0 0 2px rgba(255,255,255,0.40); 
    z-index:10; flex-shrink:0; 
  }
  @media (min-width:481px) { .card-center { width:72%; border-radius:18px; } }
  @media (min-width:769px) { .card-center { width:62%; border-radius:24px; } }
  
  /* LQIP blur layer - corrected with background-position */
  .img-lqip { 
    position:absolute; inset:0; background-size:cover; 
    background-position:center 27%; /* ✅ Corrected from objectPosition */
    filter:blur(12px); transform:scale(1.08); z-index:1; 
    transition: opacity 0.5s ease; /* Smooth transition when real image loads */
  }
  
  .card-side { 
    position:absolute; top:8%; height:84%; width:8%; border-radius:12px; overflow:hidden; 
    cursor:pointer; flex-shrink:0; z-index:5; 
    transition:transform 0.3s ease,box-shadow 0.3s; 
    box-shadow:0 12px 40px rgba(30,41,59,0.18); 
  }
  @media (min-width:481px) { .card-side { width:12%; border-radius:14px; } }
  @media (min-width:769px) { .card-side { width:18%; border-radius:18px; } }
  
  .card-side.prev { left:1%; transform:perspective(900px) rotateY(8deg) scale(0.92); }
  @media (min-width:769px) { .card-side.prev { left:4%; } }
  
  .card-side.next { right:1%; transform:perspective(900px) rotateY(-8deg) scale(0.92); }
  @media (min-width:769px) { .card-side.next { right:4%; } }
  
  .card-side:hover { 
    transform:perspective(900px) rotateY(0deg) scale(0.96) !important; 
    box-shadow:0 18px 52px rgba(30,41,59,0.24); z-index:8; 
  }
  
  /* Placeholder for side cards not yet loaded */
  .img-placeholder { 
    width:100%; height:100%; background-size:cover; background-position:center; 
    filter:blur(6px); transform:scale(1.06); 
  }
  
  /* Fallback for broken images */
  .image-fallback {
    position: absolute; inset: 0; z-index: 3;
    display: flex; align-items: center; justify-content: center;
    background: #1E293B; color: rgba(255,255,255,0.6);
    font-family: var(--body); font-size: 14px;
  }
  
  .card-img { 
    width:100%; height:100%; object-fit:cover; display:block; 
    transition:transform 0.7s cubic-bezier(0.22,1,0.36,1); 
  }
  .card-center:hover .card-img { transform:scale(1.04); }
  
  .card-side::after { 
    content:''; position:absolute; inset:0; 
    background:rgba(15,15,25,0.38); 
    backdrop-filter:blur(3px); -webkit-backdrop-filter:blur(3px); 
    transition:background 0.3s, backdrop-filter 0.3s; pointer-events:none; 
  }
  .card-side:hover::after { 
    background:rgba(15,15,25,0.18); 
    backdrop-filter:blur(1px); -webkit-backdrop-filter:blur(1px); 
  }
  
  .center-overlay-bottom { 
    position:absolute; inset:0; pointer-events:none; 
    background:linear-gradient(to top,rgba(10,18,34,0.80) 0%,rgba(10,18,34,0.25) 50%,transparent 100%); 
  }
  .center-overlay-left { 
    position:absolute; inset:0; pointer-events:none; 
    background:linear-gradient(to right,rgba(10,18,34,0.18) 0%,transparent 55%); 
  }
  
  .slide-counter { 
    position:absolute; top:10px; right:10px; z-index:15; 
    display:flex; align-items:center; gap:4px; padding:4px 8px; border-radius:999px; 
    background:rgba(255,255,255,0.14); backdrop-filter:blur(8px); 
    border:1px solid rgba(255,255,255,0.22); 
    font-size:10px; font-weight:600; color:rgba(255,255,255,0.90); letter-spacing:0.06em; 
  }
  @media (min-width:481px) { .slide-counter { top:14px; right:14px; padding:5px 10px; font-size:11px; } }
  @media (min-width:769px) { .slide-counter { top:18px; right:18px; } }
  
  .center-label-wrap { 
    position:absolute; bottom:0; left:0; right:0; z-index:12; 
    padding:14px 12px 16px; display:flex; flex-direction:column; 
    align-items:center; gap:5px; text-align:center; 
  }
  @media (min-width:481px) { .center-label-wrap { padding:20px 16px 22px; } }
  @media (min-width:769px) { .center-label-wrap { padding:28px 32px 30px; } }
  
  .center-sub { 
    font-size:8px; font-weight:600; letter-spacing:0.15em; text-transform:uppercase; 
    color:rgba(255,255,255,0.58); 
  }
  @media (min-width:481px) { .center-sub { font-size:9px; } }
  @media (min-width:641px) { .center-sub { font-size:10px; } }
  
  .side-label { 
    position:absolute; bottom:0; left:0; right:0; z-index:12; 
    padding:8px 8px 10px; text-align:center; 
    font-family:var(--display); font-size:0.65rem; font-style:italic; font-weight:600; 
    color:rgba(255,255,255,0.80); 
    background:linear-gradient(to top,rgba(10,18,34,0.70) 0%,transparent 100%); 
    opacity:0; transition:opacity 0.28s; 
  }
  .card-side:hover .side-label { opacity:1; }
  
  .arrow-btn { 
    position:absolute; top:50%; transform:translateY(-50%); z-index:20; 
    width:32px; height:32px; border-radius:50%; 
    border:1.5px solid rgba(255,255,255,0.55); 
    background:rgba(255,255,255,0.92); backdrop-filter:blur(10px); 
    color:var(--navy); display:flex; align-items:center; justify-content:center; 
    cursor:pointer; box-shadow:0 6px 22px rgba(30,41,59,0.16); 
    transition:background 0.2s,box-shadow 0.2s,transform 0.2s; 
  }
  @media (min-width:481px) { .arrow-btn { width:38px; height:38px; } }
  @media (min-width:641px) { .arrow-btn { width:42px; height:42px; } }
  @media (min-width:769px) { .arrow-btn { width:46px; height:46px; } }
  
  .arrow-btn:hover { 
    background:#fff; box-shadow:0 10px 32px rgba(30,41,59,0.22); 
    transform:translateY(-50%) scale(1.10); 
  }
  .arrow-btn.left { left:4px; } 
  .arrow-btn.right { right:4px; }
  @media (min-width:481px) { .arrow-btn.left { left:8px; } .arrow-btn.right { right:8px; } }
  @media (min-width:769px) { .arrow-btn.left { left:16px; } .arrow-btn.right { right:16px; } }
  
  .dots-row { 
    display:flex; justify-content:center; gap:6px; 
    margin-top:16px; position:relative; z-index:10; flex-wrap:wrap; 
  }
  @media (min-width:481px) { .dots-row { gap:8px; margin-top:20px; } }
  
  .hero-dot { 
    height:4px; border-radius:4px; border:none; 
    background:rgba(216,27,74,0.20); cursor:pointer; padding:0; 
    transition:width 0.38s ease,background 0.38s ease; min-width:6px; 
  }
  .hero-dot.on { width:24px; background:var(--primary); }
  @media (min-width:481px) { .hero-dot.on { width:30px; } }
  .hero-dot.off { width:6px; }
  @media (min-width:481px) { .hero-dot.off { width:8px; } }
  .hero-dot.off:hover { background:rgba(216,27,74,0.45); }
  
  .wave-wrap { 
    position:relative; z-index:5; margin-top:16px; line-height:0; overflow:hidden; 
  }
  @media (min-width:769px) { .wave-wrap { margin-top:28px; } }
  .wave-svg { display:block; width:100%; height:auto; }
  
  .hero-below { background:#fff; position:relative; z-index:5; }
  
  .trust-strip { 
    max-width:1080px; margin:0 auto; padding:12px 16px 18px; 
    display:flex; flex-wrap:wrap; align-items:center; justify-content:center; 
    gap:6px 14px; 
  }
  @media (min-width:641px) { .trust-strip { padding:18px 24px 26px; gap:8px 20px; } }
  
  .trust-item { 
    display:inline-flex; align-items:center; gap:4px; 
    font-size:10px; font-weight:500; color:#64748B; white-space:nowrap; 
  }
  @media (min-width:641px) { .trust-item { font-size:12px; gap:6px; } }
  
  .ti-green { color:var(--secondary); } 
  .ti-red { color:var(--primary); }
  
  .trust-sep { 
    width:1px; height:12px; background:#e2e8f0; flex-shrink:0; 
  }
  @media (max-width:640px) { .trust-sep { display:none; } }
  @media (min-width:641px) { .trust-sep { display:block; height:16px; } }
`;