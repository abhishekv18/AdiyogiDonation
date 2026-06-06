
// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   ArrowRight, Quote, Sparkles, Heart, Star, ChevronRight,
// } from "lucide-react";
// import Footer from "../components/Footer";
// import Navbar from "../components/Navbar";
// import { Link, useNavigate } from 'react-router-dom' // Make sure you have react-router-dom installed
// import { Shield } from 'lucide-react' // 
// import { useSelector } from "react-redux";
// import { useEffect } from "react";
// /* ── palette ───────────────────────────────────────────── */
// // --primary:   #D81B4A
// // --secondary: #8AAE3B
// // --accent:    #E8B21C
// // --navy:      #1E293B
// // --warm-bg:   #FAFAF7

// /* ── data ───────────────────────────────────────────────── */
// const stories = [
//   {
//     id: 1,
//     category: "Temple Restoration",
//     categoryColor: "#D81B4A",
//     title: "Shri Ram Mandir Restored to Glory",
//     location: "Mathura, Uttar Pradesh",
//     summary:
//       "A 200-year-old temple in disrepair was lovingly restored — its walls repainted, the deity reinstalled, and daily prayers resumed for the first time in decades. The community gathered with tears of joy at the reopening.",
//     impact: "3,000+ devotees",
//     img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=85",
//     quote: "The temple is our soul. Now our village breathes again.",
//     quoteName: "Pandit Ramesh Sharma",
//   },
//   {
//     id: 2,
//     category: "Bhandara Seva",
//     categoryColor: "#8AAE3B",
//     title: "Mahaprasad Served to 5,000 Devotees",
//     location: "Vrindavan, Uttar Pradesh",
//     summary:
//       "On the occasion of Janmashtami, Adiyogi Foundation organised a grand Bhandara where over 5,000 people received warm meals, prasad, and blessings — irrespective of caste, faith, or background. Seva at its purest.",
//     impact: "5,000+ served",
//     img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=85",
//     quote: "Food given with love is the greatest prayer.",
//     quoteName: "Volunteers of Adiyogi",
//   },
//   {
//     id: 3,
//     category: "Helping the Needy",
//     categoryColor: "#E8B21C",
//     title: "Blankets & Essentials for Winter Relief",
//     location: "Pilkhua, Uttar Pradesh",
//     summary:
//       "During the harsh winter months, our volunteers distributed blankets, warm clothing, and food packets to over 800 families living on the streets and in shelters — bringing warmth not just to their bodies but to their spirits.",
//     impact: "800+ families",
//     img: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=900&q=85",
//     quote: "They came like angels in the night. We were not forgotten.",
//     quoteName: "Sunita Devi, Beneficiary",
//   },
//   {
//     id: 4,
//     category: "Temple Restoration",
//     categoryColor: "#D81B4A",
//     title: "Ancient Shiva Temple Given New Life",
//     location: "Haridwar, Uttarakhand",
//     summary:
//       "A centuries-old Shivalaya on the banks of the Ganga was crumbling. Through community donations, we rebuilt the sanctum, installed a new Shivling, and restarted daily abhishek rituals. The sound of bells has returned.",
//     impact: "Daily rituals restored",
//     img: "https://images.unsplash.com/photo-1545156521-77bd85671d30?auto=format&fit=crop&w=900&q=85",
//     quote: "Shiv ki kripa se aur aap sab ke sahayog se — yeh mandir phir jag utha.",
//     quoteName: "Local Priest, Haridwar",
//   },
//   {
//     id: 5,
//     category: "Bhandara Seva",
//     categoryColor: "#8AAE3B",
//     title: "Navratri Bhandara — 9 Days of Pure Seva",
//     location: "Delhi NCR",
//     summary:
//       "For all nine days of Navratri, our volunteers served sattvic meals to devotees, sadhus, and the poor outside Mata Vaishno Devi temple. No one was turned away. Every plate carried a prayer.",
//     impact: "9,000+ meals served",
//     img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=85",
//     quote: "Seva hi pooja hai. This bhandara was our offering.",
//     quoteName: "Coordinator, Delhi Seva Dal",
//   },
//   {
//     id: 6,
//     category: "Helping the Needy",
//     categoryColor: "#E8B21C",
//     title: "Education Kits for 400 Children",
//     location: "Pilkhua & Hapur, UP",
//     summary:
//       "On the occasion of Saraswati Puja, we distributed school kits — bags, books, stationery — to 400 children from underprivileged families. Every child deserves to learn. Education is the true temple of the future.",
//     impact: "400 children supported",
//     img: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=900&q=85",
//     quote: "My daughter now goes to school every day. Thank you from the heart.",
//     quoteName: "Reena, Mother of Beneficiary",
//   },
// ];

// const fadeUp = {
//   hidden:  { opacity: 0, y: 24 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
// };

// const stagger = {
//   hidden: {},
//   visible: { transition: { staggerChildren: 0.10 } },
// };

// /* ── Story card ─────────────────────────────────────────── */
// function StoryCard({ story, index }) {
//   const [flipped, setFlipped] = useState(false);

//   return (
//     <motion.article
//       variants={fadeUp}
//       className="ss-card"
//       onMouseEnter={() => setFlipped(true)}
//       onMouseLeave={() => setFlipped(false)}
//       style={{ "--cat-color": story.categoryColor }}
//     >
//       {/* image */}
//       <div className="ss-card-img-wrap">
//         <img src={story.img} alt={story.title} className="ss-card-img" />
//         <div className="ss-card-img-overlay" />
//         {/* category pill on image */}
//         <span className="ss-card-cat" style={{ background: story.categoryColor }}>
//           {story.category}
//         </span>
//         {/* impact badge */}
//         <span className="ss-card-impact">
//           <Star size={10} fill="#E8B21C" color="#E8B21C" />
//           {story.impact}
//         </span>
//       </div>

//       {/* body */}
//       <div className="ss-card-body">
//         <p className="ss-card-location">
//           <span className="ss-loc-dot" style={{ background: story.categoryColor }} />
//           {story.location}
//         </p>
//         <h3 className="ss-card-title">{story.title}</h3>
//         <p className="ss-card-summary">{story.summary}</p>

//         {/* quote reveal */}
//         <AnimatePresence>
//           {flipped && (
//             <motion.div
//               className="ss-quote-box"
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.32 }}
//             >
//               <Quote size={16} color={story.categoryColor} />
//               <p className="ss-quote-text">"{story.quote}"</p>
//               <span className="ss-quote-name">— {story.quoteName}</span>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </motion.article>
//   );
// }

// /* ── Page ───────────────────────────────────────────────── */
// export default function SuccessStoriesPage() {

//     const { userData } = useSelector((state) => state.user);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (userData) {
//       navigate("/admin/dashboard");
//     }
//   }, [userData, navigate]);
//   const [activeFilter, setActiveFilter] = useState("All");
//   const filters = ["All", "Temple Restoration", "Bhandara Seva", "Helping the Needy"];
// const [showAdminLogin, setShowAdminLogin] = useState(false)
//   const filtered = activeFilter === "All"
//     ? stories
//     : stories.filter(s => s.category === activeFilter);

//   return (
//     <main className="ss-page">
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600;1,700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

//         :root {
//           --primary:   #D81B4A;
//           --primary-d: #B0153D;
//           --secondary: #8AAE3B;
//           --accent:    #E8B21C;
//           --navy:      #1E293B;
//           --warm-bg:   #FAFAF7;
//           --warm-2:    #F3F5EF;
//           --border:    rgba(30,41,59,0.08);
//           --display:   'Cormorant Garamond', Georgia, serif;
//           --body:      'DM Sans', sans-serif;
//         }

//         .ss-page {
//           min-height: 100vh;
//           background: var(--warm-bg);
//           font-family: var(--body);
//           color: var(--navy);
//         }

//         /* ══ BANNER ══════════════════════════════════════════ */
//         .ss-banner {
//           position: relative;
//           overflow: hidden;
//           height: 520px;
//           display: flex; align-items: flex-end;
//           background: linear-gradient(135deg, #FFF5F0 0%, #FAFAF7 30%, #F0F5E5 100%);
//         }
//         @media (max-width: 768px) { .ss-banner { height: 420px; } }
//         @media (max-width: 480px) { .ss-banner { height: 360px; } }

//        .ss-banner-bg {
//   position: absolute; inset: 0;
//   background-image: url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1800&q=85');
//   background-size: cover; background-position: center 40%;
//   opacity: 0.47;
//   transform: scale(1.04);
//   transition: transform 8s ease;
//   z-index: 0;
// }
//         .ss-banner:hover .ss-banner-bg { transform: scale(1.00); }

//         /* layered overlays — light warm tones */
//       /* layered overlays — balanced for light theme */
// .ss-banner-ov1 {
//   position: absolute; inset: 0; z-index: 1;
//   background: linear-gradient(
//     to bottom,
//     rgba(250,250,247,0.15) 0%,
//     rgba(250,250,247,0.35) 50%,
//     rgba(250,250,247,0.80) 100%
//   );
// }
// .ss-banner-ov2 {
//   position: absolute; inset: 0; z-index: 2;
//   background: linear-gradient(
//     to right,
//     rgba(216,27,74,0.04) 0%,
//     transparent 60%
//   );
// }

//         /* decorative om / lotus motif line */
//         .ss-banner-motif {
//           position: absolute; top: 28px; left: 50%;
//           transform: translateX(-50%);
//           z-index: 5;
//           display: flex; align-items: center; gap: 12px;
//           opacity: 0.45;
//         }
//         .ss-motif-line {
//           width: 60px; height: 1px;
//           background: linear-gradient(to right, transparent, rgba(30,41,59,0.40));
//         }
//         .ss-motif-line.r {
//           background: linear-gradient(to left, transparent, rgba(30,41,59,0.40));
//         }
//         .ss-motif-symbol {
//           font-size: 22px; color: rgba(216,27,74,0.55);
//           letter-spacing: 0.1em;
//         }

//         /* content */
//         .ss-banner-content {
//           position: relative; z-index: 6;
//           width: 100%; max-width: 1280px;
//           margin: 0 auto; padding: 0 40px 52px;
//         }
//         @media (max-width: 768px) { .ss-banner-content { padding: 0 20px 36px; } }

//         .ss-banner-eyebrow {
//           display: inline-flex; align-items: center; gap: 8px;
//           padding: 5px 14px; border-radius: 999px;
//           background: rgba(216,27,74,0.07);
//           border: 1px solid rgba(216,27,74,0.14);
//           font-size: 10.5px; font-weight: 600;
//           letter-spacing: 0.16em; text-transform: uppercase;
//           color: var(--primary);
//           margin-bottom: 18px;
//         }
//         .ss-banner-eyebrow-dot {
//           width: 6px; height: 6px; border-radius: 50%;
//           background: var(--accent);
//           box-shadow: 0 0 8px rgba(232,178,28,0.7);
//           animation: glowpulse 2s ease-in-out infinite;
//         }
//         @keyframes glowpulse { 0%,100%{opacity:1} 50%{opacity:0.3} }

//         .ss-banner-title {
//           font-family: var(--display);
//           font-size: clamp(2.4rem, 6vw, 4.4rem);
//           font-weight: 600; font-style: italic;
//           color: var(--navy); line-height: 1.10;
//           letter-spacing: -0.02em; margin: 0 0 16px;
//           max-width: 680px;
//         }

//         .ss-banner-sub {
//           font-size: 15px; font-weight: 400;
//           color: #64748B;
//           max-width: 520px; line-height: 1.70;
//           margin: 0 0 28px;
//         }

//         /* bottom accent line */
//         .ss-banner-line {
//           width: 64px; height: 3px; border-radius: 2px;
//           background: linear-gradient(90deg, var(--primary), var(--accent));
//           margin-bottom: 28px;
//         }

//         .ss-banner-cta {
//           display: inline-flex; align-items: center; gap: 8px;
//           padding: 12px 26px; border-radius: 999px;
//           background: linear-gradient(135deg, var(--primary) 0%, var(--primary-d) 100%);
//           color: #fff; font-size: 13.5px; font-weight: 600;
//           text-decoration: none;
//           box-shadow: 0 12px 36px rgba(216,27,74,0.22);
//           transition: transform 0.22s, box-shadow 0.22s;
//         }
//         .ss-banner-cta:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 18px 48px rgba(216,27,74,0.32);
//         }

//         /* bottom wave */
//         .ss-banner-wave {
//           position: absolute; bottom: -2px; left: 0; right: 0; z-index: 7;
//           line-height: 0;
//         }
//         .ss-banner-wave svg { display: block; width: 100%; }

//         /* ══ FILTER BAR ══════════════════════════════════════ */
//         .ss-filter-bar {
//           background: #FFFFFF;
//           border-bottom: 1px solid var(--border);
//           position: sticky; top: 0; z-index: 30;
//           padding: 0 40px;
//         }
//         @media (max-width: 768px) { .ss-filter-bar { padding: 0 16px; } }
//         .ss-filter-inner {
//           max-width: 1280px; margin: 0 auto;
//           display: flex; align-items: center; gap: 6px;
//           overflow-x: auto; padding: 14px 0;
//           scrollbar-width: none;
//         }
//         .ss-filter-inner::-webkit-scrollbar { display: none; }
//         .ss-filter-btn {
//           display: inline-flex; align-items: center; gap: 6px;
//           padding: 8px 18px; border-radius: 999px;
//           font-size: 12.5px; font-weight: 600;
//           border: 1.5px solid var(--border);
//           background: transparent; color: #64748B;
//           cursor: pointer; white-space: nowrap;
//           transition: all 0.22s;
//           flex-shrink: 0;
//         }
//         .ss-filter-btn:hover {
//           border-color: var(--primary);
//           color: var(--primary);
//           background: #FCE4E8;
//         }
//         .ss-filter-btn.active {
//           background: var(--primary);
//           color: #fff; border-color: var(--primary);
//           box-shadow: 0 6px 20px rgba(216,27,74,0.20);
//         }

//         /* ══ STORIES GRID ════════════════════════════════════ */
//         .ss-grid-section {
//           max-width: 1280px; margin: 0 auto;
//           padding: 56px 40px 80px;
//         }
//         @media (max-width: 768px) { .ss-grid-section { padding: 40px 16px 60px; } }

//         .ss-grid {
//           display: grid;
//           grid-template-columns: repeat(3, 1fr);
//           gap: 22px;
//         }
//         @media (max-width: 1100px) { .ss-grid { grid-template-columns: repeat(2, 1fr); } }
//         @media (max-width: 640px)  { .ss-grid { grid-template-columns: 1fr; } }

//         /* ── card ── */
//         .ss-card {
//           border-radius: 22px;
//           background: #FFFFFF;
//           border: 1px solid var(--border);
//           box-shadow: 0 6px 28px rgba(30,41,59,0.05);
//           overflow: hidden;
//           transition: transform 0.34s cubic-bezier(0.22,1,0.36,1),
//                       box-shadow 0.34s;
//           display: flex; flex-direction: column;
//         }
//         .ss-card:hover {
//           transform: translateY(-6px);
//           box-shadow: 0 20px 56px rgba(30,41,59,0.10);
//         }

//         .ss-card-img-wrap {
//           position: relative; height: 220px; overflow: hidden;
//           flex-shrink: 0;
//         }
//         .ss-card-img {
//           width: 100%; height: 100%; object-fit: cover; display: block;
//           transition: transform 0.7s cubic-bezier(0.22,1,0.36,1);
//         }
//         .ss-card:hover .ss-card-img { transform: scale(1.06); }
//         .ss-card-img-overlay {
//           position: absolute; inset: 0;
//           background: linear-gradient(to bottom, transparent 50%, rgba(30,41,59,0.10) 100%);
//           pointer-events: none;
//         }
//         .ss-card-cat {
//           position: absolute; top: 14px; left: 14px;
//           padding: 4px 12px; border-radius: 999px;
//           font-size: 10px; font-weight: 700;
//           letter-spacing: 0.10em; text-transform: uppercase;
//           color: #fff;
//           box-shadow: 0 4px 14px rgba(0,0,0,0.12);
//         }
//         .ss-card-impact {
//           position: absolute; bottom: 14px; right: 14px;
//           display: inline-flex; align-items: center; gap: 5px;
//           padding: 4px 11px; border-radius: 999px;
//           background: rgba(255,255,255,0.94);
//           backdrop-filter: blur(6px);
//           font-size: 10.5px; font-weight: 600; color: var(--navy);
//         }

//         .ss-card-body {
//           padding: 22px 22px 24px;
//           display: flex; flex-direction: column; flex: 1;
//         }
//         .ss-card-location {
//           display: flex; align-items: center; gap: 6px;
//           font-size: 11px; font-weight: 500; color: #94A3B8;
//           letter-spacing: 0.05em; margin-bottom: 10px;
//         }
//         .ss-loc-dot {
//           width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0;
//         }
//         .ss-card-title {
//           font-family: var(--display);
//           font-size: 1.25rem; font-weight: 600; font-style: italic;
//           color: var(--navy); line-height: 1.25;
//           margin: 0 0 10px;
//           letter-spacing: -0.01em;
//         }
//         .ss-card-summary {
//           font-size: 13px; color: #64748B;
//           line-height: 1.72; margin: 0;
//         }

//         /* quote reveal box */
//         .ss-quote-box {
//           margin-top: 16px;
//           padding: 14px 16px;
//           border-radius: 14px;
//           background: var(--warm-bg);
//           border-left: 3px solid var(--cat-color, var(--primary));
//           overflow: hidden;
//         }
//         .ss-quote-text {
//           font-size: 12.5px; font-style: italic; color: #475569;
//           line-height: 1.65; margin: 6px 0 4px;
//         }
//         .ss-quote-name {
//           font-size: 10.5px; font-weight: 600; color: #94A3B8;
//           letter-spacing: 0.06em;
//         }

//         /* ══ SEVA STRIP ══════════════════════════════════════ */
//        /* ══ SEVA STRIP — LIGHT VERSION ══════════════════════════ */
// .seva-strip {
//   background: linear-gradient(
//     135deg,
//     #FFFFFF 0%,
//     #FEFEFD 50%,
//     #FFFFFF 100%
//   );

//   padding: 52px 40px;
//   position: relative;
//   overflow: hidden;
//   border-top: 1px solid var(--border);
// }

// @media (max-width: 768px) {
//   .seva-strip {
//     padding: 40px 20px;
//   }
// }

// .seva-strip::before {
//   content: '';
//   position: absolute;
//   inset: 0;
//   background:
//     radial-gradient(
//       circle at 20% 50%,
//       rgba(216,27,74,0.015) 0%,
//       transparent 55%
//     ),
//     radial-gradient(
//       circle at 80% 50%,
//       rgba(138,174,59,0.012) 0%,
//       transparent 55%
//     );
//   pointer-events: none;
// }
// .seva-strip-inner {
//   max-width: 1280px; margin: 0 auto;
//   display: flex; flex-wrap: wrap;
//   align-items: center; justify-content: space-between;
//   gap: 28px; position: relative; z-index: 2;
// }
// .seva-strip-text h2 {
//   font-family: var(--display);
//   font-size: clamp(1.8rem, 3.5vw, 2.8rem);
//   font-weight: 600; font-style: italic;
//   color: var(--navy); margin: 0 0 8px;
//   letter-spacing: -0.02em;
// }
// .seva-strip-text p {
//   font-size: 14px; color: #64748B;
//   max-width: 440px; line-height: 1.70; margin: 0;
// }
// .seva-strip-actions {
//   display: flex; gap: 12px; flex-wrap: wrap;
// }
// .seva-btn-primary {
//   display: inline-flex; align-items: center; gap: 8px;
//   padding: 13px 28px; border-radius: 999px;
//   background: linear-gradient(135deg, var(--primary), var(--primary-d));
//   color: #FFFFFF; font-size: 14px; font-weight: 600;
//   text-decoration: none;
//   box-shadow: 0 12px 36px rgba(216,27,74,0.22);
//   transition: transform 0.22s, box-shadow 0.22s;
// }
// .seva-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 18px 48px rgba(216,27,74,0.32); }

// .seva-btn-secondary {
//   display: inline-flex; align-items: center; gap: 8px;
//   padding: 13px 28px; border-radius: 999px;
//   border: 1.5px solid var(--border);
//   background: #FFFFFF;
//   color: var(--navy); font-size: 14px; font-weight: 600;
//   text-decoration: none;
//   box-shadow: 0 2px 10px rgba(30,41,59,0.04);
//   transition: border-color 0.22s, color 0.22s, background 0.22s;
// }
// .seva-btn-secondary:hover { 
//   border-color: var(--primary); 
//   color: var(--primary); 
//   background: #FCE4E8; 
// }
//       `}</style>
//   <div style={{
//         position: 'fixed',
//         bottom: '16px',
//         left: '16px',
//         zIndex: 40
//       }}>
//        <div style={{ position: 'relative' }}>
//   <button
//     onClick={() => setShowAdminLogin(!showAdminLogin)}
//     style={{
//       width: '48px',
//       height: '48px',
//       backgroundColor: 'rgba(255, 255, 255, 0.88)',
//       backdropFilter: 'blur(8px)',
//       WebkitBackdropFilter: 'blur(8px)',
//       borderRadius: '50%',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       boxShadow: '0 10px 15px -3px rgba(30, 41, 59, 0.08), 0 4px 6px -2px rgba(30, 41, 59, 0.04)',
//       transition: 'all 0.3s ease',
//       border: '1px solid rgba(30, 41, 59, 0.10)',
//       cursor: 'pointer',
//       padding: 0
//     }}
//     onMouseEnter={(e) => {
//       e.currentTarget.style.backgroundColor = 'rgba(216, 27, 74, 0.08)'
//       e.currentTarget.style.borderColor = 'rgba(216, 27, 74, 0.20)'
//       e.currentTarget.style.transform = 'scale(1.05)'
//     }}
//     onMouseLeave={(e) => {
//       e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.88)'
//       e.currentTarget.style.borderColor = 'rgba(30, 41, 59, 0.10)'
//       e.currentTarget.style.transform = 'scale(1)'
//     }}
//     title="Admin Access"
//   >
//     <Shield size={20} style={{ color: '#D81B4A' }} />
//   </button>
  
//   {showAdminLogin && (
//     <div style={{
//       position: 'absolute',
//       bottom: '64px',
//       left: 0,
//       backgroundColor: '#FFFFFF',
//       borderRadius: '12px',
//       boxShadow: '0 20px 25px -5px rgba(30, 41, 59, 0.08), 0 10px 10px -5px rgba(30, 41, 59, 0.04)',
//       border: '1px solid rgba(30, 41, 59, 0.08)',
//       padding: '12px',
//       width: '240px',
//       zIndex: 50
//     }}>
//       <h3 style={{
//         fontWeight: 'bold',
//         color: '#1E293B',
//         marginBottom: '12px',
//         display: 'flex',
//         alignItems: 'center',
//         fontSize: '16px'
//       }}>
//         <Shield size={16} style={{ marginRight: '8px', color: '#D81B4A' }} />
//         Admin Access
//       </h3>
//       <Link to="/admin-login" style={{ textDecoration: 'none' }}>
//         <button
//           style={{
//             width: '100%',
//             padding: '8px 16px',
//             background: 'linear-gradient(135deg, #D81B4A, #B0153D)',
//             color: '#FFFFFF',
//             borderRadius: '8px',
//             border: 'none',
//             cursor: 'pointer',
//             fontWeight: 600,
//             fontSize: '14px',
//             boxShadow: '0 8px 20px rgba(216, 27, 74, 0.20)',
//             transition: 'all 0.3s ease'
//           }}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.background = 'linear-gradient(135deg, #B0153D, #9A0F30)'
//             e.currentTarget.style.boxShadow = '0 12px 28px rgba(216, 27, 74, 0.28)'
//             e.currentTarget.style.transform = 'translateY(-1px)'
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.background = 'linear-gradient(135deg, #D81B4A, #B0153D)'
//             e.currentTarget.style.boxShadow = '0 8px 20px rgba(216, 27, 74, 0.20)'
//             e.currentTarget.style.transform = 'translateY(0)'
//           }}
//         >
//           Admin Login
//         </button>
//       </Link>
//     </div>
//   )}
// </div>
//       </div>
//       <Navbar />

//       {/* ══ BANNER ══════════════════════════════════════════ */}
//       <section className="ss-banner" style={{ marginTop: "101px" }}>
//         <div className="ss-banner-bg" />
//         <div className="ss-banner-ov1" />
//         <div className="ss-banner-ov2" />

//         {/* decorative motif */}
//         <div className="ss-banner-motif">
//           <div className="ss-motif-line" />
//           <span className="ss-motif-symbol">ॐ</span>
//           <div className="ss-motif-line r" />
//         </div>

//         <div className="ss-banner-content">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
//           >
//             <div className="ss-banner-eyebrow">
//               <span className="ss-banner-eyebrow-dot" />
//               Adiyogi Foundation — Seva Stories
//             </div>
//             <h1 className="ss-banner-title">
//               Where Devotion Becomes<br />Service
//             </h1>
//             <div className="ss-banner-line" />
//             <p className="ss-banner-sub">
//               From restoring ancient temples to feeding thousands at Bhandara, 
//               every act of seva is a prayer in action. Here are stories of grace.
//             </p>
//             <a href="#stories" className="ss-banner-cta">
//               Read the Stories <ChevronRight size={16} />
//             </a>
//           </motion.div>
//         </div>

//         {/* wave into filter bar */}
//         <div className="ss-banner-wave">
//           <svg viewBox="0 0 1440 56" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
//             <path d="M0,22 C240,56 600,0 1440,30 L1440,56 L0,56 Z" fill="#FFFFFF" />
//           </svg>
//         </div>
//       </section>

//       {/* ══ FILTER BAR ══════════════════════════════════════ */}
//       <div className="ss-filter-bar" id="stories">
//         <div className="ss-filter-inner items-center justify-center">
//           {filters.map(f => (
//             <button
//               key={f}
//               type="button"
//               className={`ss-filter-btn ${activeFilter === f ? "active" : ""}`}
//               onClick={() => setActiveFilter(f)}
//             >
//               {f === "Temple Restoration" && "🛕"} 
//               {f === "Bhandara Seva" && "🍱"}
//               {f === "Helping the Needy" && "🤝"}
//               {f}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* ══ STORIES GRID ════════════════════════════════════ */}
//       <div className="ss-grid-section">
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={activeFilter}
//             className="ss-grid"
//             initial="hidden"
//             animate="visible"
//             exit={{ opacity: 0 }}
//             variants={stagger}
//           >
//             {filtered.map((story, i) => (
//               <StoryCard key={story.id} story={story} index={i} />
//             ))}
//           </motion.div>
//         </AnimatePresence>
//       </div>

//       {/* ══ SEVA CTA STRIP ══════════════════════════════════ */}
//       <div className="seva-strip">
//         <div className="seva-strip-inner">
//           <div className="seva-strip-text">
//             <h2>Join the Seva. Become the Change.</h2>
//             <p>
//               Your contribution — however small — helps restore temples, 
//               feed thousands at Bhandara, and bring relief to those in need. 
//               Seva is the highest dharma.
//             </p>
//           </div>
//           <div className="seva-strip-actions">
//             <a href="/#donate" className="seva-btn-primary">
//               <Heart size={16} />
//               Donate Now
//             </a>
//             <a href="/contact" className="seva-btn-secondary">
//               Contact Us <ArrowRight size={15} />
//             </a>
//           </div>
//         </div>
//       </div>
//  <div style={{
//         background: '#FFFFFF',
//         borderTop: '1px solid rgba(30,41,59,0.08)',
//         borderBottom: '1px solid rgba(30,41,59,0.08)',
//         padding: '48px 40px',
//         marginTop: '20px'
//       }}>
//         <div style={{
//           maxWidth: '1280px', margin: '0 auto',
//           textAlign: 'center'
//         }}>
//           <p style={{
//             fontFamily: 'var(--display)',
//             fontSize: '1.3rem',
//             fontStyle: 'italic',
//             color: '#64748B',
//             marginBottom: '8px'
//           }}>
//             "Every act of seva brings us closer to the divine."
//           </p>
//           <p style={{
//             fontSize: '12px',
//             fontWeight: 700,
//             letterSpacing: '0.1em',
//             textTransform: 'uppercase',
//             color: '#E8B21C'
//           }}>
//             — Adiyogi Foundation
//           </p>
//         </div>
//       </div>
//       <Footer />
//     </main>
//   );
// }


import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Quote, Sparkles, Heart, Star, ChevronRight,
} from "lucide-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from 'react-router-dom'
import { Shield } from 'lucide-react'
import { useSelector } from "react-redux";
import { useEffect } from "react";

/* ── data ───────────────────────────────────────────────── */
const stories = [
  {
    id: 1,
    category: "Temple Restoration",
    categoryColor: "#D81B4A",
    title: "Shri Ram Mandir Restored to Glory",
    location: "Mathura, Uttar Pradesh",
    summary:
      "A 200-year-old temple in disrepair was lovingly restored — its walls repainted, the deity reinstalled, and daily prayers resumed for the first time in decades. The community gathered with tears of joy at the reopening.",
    impact: "3,000+ devotees",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=85",
    quote: "The temple is our soul. Now our village breathes again.",
    quoteName: "Pandit Ramesh Sharma",
  },
  {
    id: 2,
    category: "Bhandara Seva",
    categoryColor: "#8AAE3B",
    title: "Mahaprasad Served to 5,000 Devotees",
    location: "Vrindavan, Uttar Pradesh",
    summary:
      "On the occasion of Janmashtami, Adiyogi Foundation organised a grand Bhandara where over 5,000 people received warm meals, prasad, and blessings — irrespective of caste, faith, or background. Seva at its purest.",
    impact: "5,000+ served",
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=85",
    quote: "Food given with love is the greatest prayer.",
    quoteName: "Volunteers of Adiyogi",
  },
  {
    id: 3,
    category: "Helping the Needy",
    categoryColor: "#E8B21C",
    title: "Blankets & Essentials for Winter Relief",
    location: "Pilkhua, Uttar Pradesh",
    summary:
      "During the harsh winter months, our volunteers distributed blankets, warm clothing, and food packets to over 800 families living on the streets and in shelters — bringing warmth not just to their bodies but to their spirits.",
    impact: "800+ families",
    img: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=900&q=85",
    quote: "They came like angels in the night. We were not forgotten.",
    quoteName: "Sunita Devi, Beneficiary",
  },
  {
    id: 4,
    category: "Temple Restoration",
    categoryColor: "#D81B4A",
    title: "Ancient Shiva Temple Given New Life",
    location: "Haridwar, Uttarakhand",
    summary:
      "A centuries-old Shivalaya on the banks of the Ganga was crumbling. Through community donations, we rebuilt the sanctum, installed a new Shivling, and restarted daily abhishek rituals. The sound of bells has returned.",
    impact: "Daily rituals restored",
    img: "https://images.unsplash.com/photo-1545156521-77bd85671d30?auto=format&fit=crop&w=900&q=85",
    quote: "Shiv ki kripa se aur aap sab ke sahayog se — yeh mandir phir jag utha.",
    quoteName: "Local Priest, Haridwar",
  },
  {
    id: 5,
    category: "Bhandara Seva",
    categoryColor: "#8AAE3B",
    title: "Navratri Bhandara — 9 Days of Pure Seva",
    location: "Delhi NCR",
    summary:
      "For all nine days of Navratri, our volunteers served sattvic meals to devotees, sadhus, and the poor outside Mata Vaishno Devi temple. No one was turned away. Every plate carried a prayer.",
    impact: "9,000+ meals served",
    img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=85",
    quote: "Seva hi pooja hai. This bhandara was our offering.",
    quoteName: "Coordinator, Delhi Seva Dal",
  },
  {
    id: 6,
    category: "Helping the Needy",
    categoryColor: "#E8B21C",
    title: "Education Kits for 400 Children",
    location: "Pilkhua & Hapur, UP",
    summary:
      "On the occasion of Saraswati Puja, we distributed school kits — bags, books, stationery — to 400 children from underprivileged families. Every child deserves to learn. Education is the true temple of the future.",
    impact: "400 children supported",
    img: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=900&q=85",
    quote: "My daughter now goes to school every day. Thank you from the heart.",
    quoteName: "Reena, Mother of Beneficiary",
  },
];

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.10 } },
};

/* ── Story card ─────────────────────────────────────────── */
function StoryCard({ story, index }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.article
      variants={fadeUp}
      className="ss-card"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      style={{ "--cat-color": story.categoryColor }}
    >
      {/* image */}
      <div className="ss-card-img-wrap">
        <img src={story.img} alt={story.title} className="ss-card-img" />
        <div className="ss-card-img-overlay" />
        {/* category pill on image */}
        <span className="ss-card-cat" style={{ background: story.categoryColor }}>
          {story.category}
        </span>
        {/* impact badge */}
        <span className="ss-card-impact">
          <Star size={10} fill="#E8B21C" color="#E8B21C" />
          {story.impact}
        </span>
      </div>

      {/* body */}
      <div className="ss-card-body">
        <p className="ss-card-location">
          <span className="ss-loc-dot" style={{ background: story.categoryColor }} />
          {story.location}
        </p>
        <h3 className="ss-card-title">{story.title}</h3>
        <p className="ss-card-summary">{story.summary}</p>

        {/* quote reveal */}
        <AnimatePresence>
          {flipped && (
            <motion.div
              className="ss-quote-box"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.32 }}
            >
              <Quote size={16} color={story.categoryColor} />
              <p className="ss-quote-text">"{story.quote}"</p>
              <span className="ss-quote-name">— {story.quoteName}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

/* ── Page ───────────────────────────────────────────────── */
export default function SuccessStoriesPage() {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      navigate("/admin/dashboard");
    }
  }, [userData, navigate]);
  
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Temple Restoration", "Bhandara Seva", "Helping the Needy"];
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  const filtered = activeFilter === "All"
    ? stories
    : stories.filter(s => s.category === activeFilter);

  return (
    <main className="ss-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600;1,700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        :root {
          --primary:   #D81B4A;
          --primary-d: #B0153D;
          --secondary: #8AAE3B;
          --accent:    #E8B21C;
          --navy:      #1E293B;
          --warm-bg:   #FAFAF7;
          --warm-2:    #F3F5EF;
          --border:    rgba(30,41,59,0.08);
          --display:   'Cormorant Garamond', Georgia, serif;
          --body:      'DM Sans', sans-serif;
        }

        .ss-page {
          min-height: 100vh;
          background: var(--warm-bg);
          font-family: var(--body);
          color: var(--navy);
        }

        /* ══ BANNER ══════════════════════════════════════════ */
        .ss-banner {
          position: relative;
          overflow: hidden;
          height: 360px;
          display: flex; align-items: flex-end;
          background: linear-gradient(135deg, #FFF5F0 0%, #FAFAF7 30%, #F0F5E5 100%);
        }
        @media (min-width: 480px) {
          .ss-banner { height: 400px; }
        }
        @media (min-width: 640px) {
          .ss-banner { height: 460px; }
        }
        @media (min-width: 768px) {
          .ss-banner { height: 500px; }
        }
        @media (min-width: 1024px) {
          .ss-banner { height: 520px; }
        }

        .ss-banner-bg {
          position: absolute; inset: 0;
          background-image: url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1800&q=85');
          background-size: cover; background-position: center 40%;
          opacity: 0.47;
          transform: scale(1.04);
          transition: transform 8s ease;
          z-index: 0;
        }
        .ss-banner:hover .ss-banner-bg { transform: scale(1.00); }

        /* layered overlays */
        .ss-banner-ov1 {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(
            to bottom,
            rgba(250,250,247,0.15) 0%,
            rgba(250,250,247,0.35) 50%,
            rgba(250,250,247,0.80) 100%
          );
        }
        .ss-banner-ov2 {
          position: absolute; inset: 0; z-index: 2;
          background: linear-gradient(
            to right,
            rgba(216,27,74,0.04) 0%,
            transparent 60%
          );
        }

        /* decorative om / lotus motif line */
        .ss-banner-motif {
          position: absolute; top: 20px; left: 50%;
          transform: translateX(-50%);
          z-index: 5;
          display: flex; align-items: center; gap: 8px;
          opacity: 0.45;
        }
        @media (min-width: 480px) {
          .ss-banner-motif { top: 24px; gap: 10px; }
        }
        @media (min-width: 640px) {
          .ss-banner-motif { top: 28px; gap: 12px; }
        }
        .ss-motif-line {
          width: 40px; height: 1px;
          background: linear-gradient(to right, transparent, rgba(30,41,59,0.40));
        }
        @media (min-width: 480px) {
          .ss-motif-line { width: 50px; }
        }
        @media (min-width: 640px) {
          .ss-motif-line { width: 60px; }
        }
        .ss-motif-line.r {
          background: linear-gradient(to left, transparent, rgba(30,41,59,0.40));
        }
        .ss-motif-symbol {
          font-size: 18px; color: rgba(216,27,74,0.55);
          letter-spacing: 0.1em;
        }
        @media (min-width: 480px) {
          .ss-motif-symbol { font-size: 20px; }
        }
        @media (min-width: 640px) {
          .ss-motif-symbol { font-size: 22px; }
        }

        /* content */
        .ss-banner-content {
          position: relative; z-index: 6;
          width: 100%; max-width: 1280px;
          margin: 0 auto; padding: 0 16px 28px;
        }
        @media (min-width: 480px) {
          .ss-banner-content { padding: 0 20px 32px; }
        }
        @media (min-width: 640px) {
          .ss-banner-content { padding: 0 30px 40px; }
        }
        @media (min-width: 1024px) {
          .ss-banner-content { padding: 0 40px 52px; }
        }

        .ss-banner-eyebrow {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 4px 10px; border-radius: 999px;
          background: rgba(216,27,74,0.07);
          border: 1px solid rgba(216,27,74,0.14);
          font-size: 9px; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--primary);
          margin-bottom: 14px;
        }
        @media (min-width: 480px) {
          .ss-banner-eyebrow { font-size: 10px; padding: 5px 12px; gap: 7px; letter-spacing: 0.15em; margin-bottom: 16px; }
        }
        @media (min-width: 640px) {
          .ss-banner-eyebrow { font-size: 10.5px; padding: 5px 14px; gap: 8px; letter-spacing: 0.16em; margin-bottom: 18px; }
        }
        .ss-banner-eyebrow-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 8px rgba(232,178,28,0.7);
          animation: glowpulse 2s ease-in-out infinite;
        }
        @media (min-width: 640px) {
          .ss-banner-eyebrow-dot { width: 6px; height: 6px; }
        }
        @keyframes glowpulse { 0%,100%{opacity:1} 50%{opacity:0.3} }

        .ss-banner-title {
          font-family: var(--display);
          font-size: clamp(1.8rem, 6vw, 4.4rem);
          font-weight: 600; font-style: italic;
          color: var(--navy); line-height: 1.10;
          letter-spacing: -0.02em; margin: 0 0 12px;
          max-width: 680px;
        }
        @media (min-width: 480px) {
          .ss-banner-title { margin-bottom: 14px; }
        }
        @media (min-width: 640px) {
          .ss-banner-title { margin-bottom: 16px; }
        }

        .ss-banner-sub {
          font-size: 13px; font-weight: 400;
          color: #64748B;
          max-width: 520px; line-height: 1.70;
          margin: 0 0 20px;
        }
        @media (min-width: 480px) {
          .ss-banner-sub { font-size: 14px; margin-bottom: 24px; }
        }
        @media (min-width: 640px) {
          .ss-banner-sub { font-size: 15px; margin-bottom: 28px; }
        }

        /* bottom accent line */
        .ss-banner-line {
          width: 48px; height: 2px; border-radius: 2px;
          background: linear-gradient(90deg, var(--primary), var(--accent));
          margin-bottom: 20px;
        }
        @media (min-width: 480px) {
          .ss-banner-line { width: 56px; height: 2.5px; margin-bottom: 24px; }
        }
        @media (min-width: 640px) {
          .ss-banner-line { width: 64px; height: 3px; margin-bottom: 28px; }
        }

        .ss-banner-cta {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 10px 20px; border-radius: 999px;
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-d) 100%);
          color: #fff; font-size: 12px; font-weight: 600;
          text-decoration: none;
          box-shadow: 0 12px 36px rgba(216,27,74,0.22);
          transition: transform 0.22s, box-shadow 0.22s;
        }
        @media (min-width: 480px) {
          .ss-banner-cta { padding: 11px 23px; font-size: 13px; gap: 7px; }
        }
        @media (min-width: 640px) {
          .ss-banner-cta { padding: 12px 26px; font-size: 13.5px; gap: 8px; }
        }
        .ss-banner-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 18px 48px rgba(216,27,74,0.32);
        }

        /* bottom wave */
        .ss-banner-wave {
          position: absolute; bottom: -2px; left: 0; right: 0; z-index: 7;
          line-height: 0;
        }
        .ss-banner-wave svg { display: block; width: 100%; }

        /* ══ FILTER BAR ══════════════════════════════════════ */
        .ss-filter-bar {
          background: #FFFFFF;
          border-bottom: 1px solid var(--border);
          position: sticky; top: 0; z-index: 30;
          padding: 0 12px;
        }
        @media (min-width: 480px) {
          .ss-filter-bar { padding: 0 20px; }
        }
        @media (min-width: 768px) {
          .ss-filter-bar { padding: 0 40px; }
        }
        .ss-filter-inner {
          max-width: 1280px; margin: 0 auto;
          display: flex; align-items: center; gap: 5px;
          overflow-x: auto; padding: 12px 0;
          scrollbar-width: none;
        }
        @media (min-width: 480px) {
          .ss-filter-inner { gap: 6px; padding: 14px 0; }
        }
        .ss-filter-inner::-webkit-scrollbar { display: none; }
        .ss-filter-btn {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 7px 14px; border-radius: 999px;
          font-size: 11px; font-weight: 600;
          border: 1.5px solid var(--border);
          background: transparent; color: #64748B;
          cursor: pointer; white-space: nowrap;
          transition: all 0.22s;
          flex-shrink: 0;
        }
        @media (min-width: 480px) {
          .ss-filter-btn { padding: 8px 16px; font-size: 12px; gap: 6px; }
        }
        @media (min-width: 640px) {
          .ss-filter-btn { padding: 8px 18px; font-size: 12.5px; }
        }
        .ss-filter-btn:hover {
          border-color: var(--primary);
          color: var(--primary);
          background: #FCE4E8;
        }
        .ss-filter-btn.active {
          background: var(--primary);
          color: #fff; border-color: var(--primary);
          box-shadow: 0 6px 20px rgba(216,27,74,0.20);
        }

        /* ══ STORIES GRID ════════════════════════════════════ */
        .ss-grid-section {
          max-width: 1280px; margin: 0 auto;
          padding: 32px 12px 48px;
        }
        @media (min-width: 480px) {
          .ss-grid-section { padding: 40px 16px 56px; }
        }
        @media (min-width: 640px) {
          .ss-grid-section { padding: 48px 24px 64px; }
        }
        @media (min-width: 768px) {
          .ss-grid-section { padding: 56px 40px 80px; }
        }

        .ss-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 640px) {
          .ss-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
        }
        @media (min-width: 1100px) {
          .ss-grid { grid-template-columns: repeat(3, 1fr); gap: 22px; }
        }

        /* ── card ── */
        .ss-card {
          border-radius: 16px;
          background: #FFFFFF;
          border: 1px solid var(--border);
          box-shadow: 0 6px 28px rgba(30,41,59,0.05);
          overflow: hidden;
          transition: transform 0.34s cubic-bezier(0.22,1,0.36,1),
                      box-shadow 0.34s;
          display: flex; flex-direction: column;
        }
        @media (min-width: 480px) {
          .ss-card { border-radius: 18px; }
        }
        @media (min-width: 640px) {
          .ss-card { border-radius: 20px; }
        }
        @media (min-width: 1024px) {
          .ss-card { border-radius: 22px; }
        }
        .ss-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 56px rgba(30,41,59,0.10);
        }

        .ss-card-img-wrap {
          position: relative; height: 180px; overflow: hidden;
          flex-shrink: 0;
        }
        @media (min-width: 480px) {
          .ss-card-img-wrap { height: 200px; }
        }
        @media (min-width: 640px) {
          .ss-card-img-wrap { height: 220px; }
        }
        .ss-card-img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          transition: transform 0.7s cubic-bezier(0.22,1,0.36,1);
        }
        .ss-card:hover .ss-card-img { transform: scale(1.06); }
        .ss-card-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 50%, rgba(30,41,59,0.10) 100%);
          pointer-events: none;
        }
        .ss-card-cat {
          position: absolute; top: 10px; left: 10px;
          padding: 3px 10px; border-radius: 999px;
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: #fff;
          box-shadow: 0 4px 14px rgba(0,0,0,0.12);
        }
        @media (min-width: 480px) {
          .ss-card-cat { top: 12px; left: 12px; padding: 4px 11px; font-size: 9.5px; letter-spacing: 0.09em; }
        }
        @media (min-width: 640px) {
          .ss-card-cat { top: 14px; left: 14px; padding: 4px 12px; font-size: 10px; letter-spacing: 0.10em; }
        }
        .ss-card-impact {
          position: absolute; bottom: 10px; right: 10px;
          display: inline-flex; align-items: center; gap: 4px;
          padding: 3px 9px; border-radius: 999px;
          background: rgba(255,255,255,0.94);
          backdrop-filter: blur(6px);
          font-size: 9.5px; font-weight: 600; color: var(--navy);
        }
        @media (min-width: 480px) {
          .ss-card-impact { bottom: 12px; right: 12px; padding: 4px 10px; font-size: 10px; gap: 5px; }
        }
        @media (min-width: 640px) {
          .ss-card-impact { bottom: 14px; right: 14px; padding: 4px 11px; font-size: 10.5px; }
        }

        .ss-card-body {
          padding: 16px 16px 18px;
          display: flex; flex-direction: column; flex: 1;
        }
        @media (min-width: 480px) {
          .ss-card-body { padding: 18px 18px 20px; }
        }
        @media (min-width: 640px) {
          .ss-card-body { padding: 20px 20px 22px; }
        }
        @media (min-width: 1024px) {
          .ss-card-body { padding: 22px 22px 24px; }
        }
        .ss-card-location {
          display: flex; align-items: center; gap: 5px;
          font-size: 10px; font-weight: 500; color: #94A3B8;
          letter-spacing: 0.05em; margin-bottom: 8px;
        }
        @media (min-width: 480px) {
          .ss-card-location { font-size: 10.5px; gap: 6px; margin-bottom: 9px; }
        }
        @media (min-width: 640px) {
          .ss-card-location { font-size: 11px; margin-bottom: 10px; }
        }
        .ss-loc-dot {
          width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0;
        }
        @media (min-width: 640px) {
          .ss-loc-dot { width: 6px; height: 6px; }
        }
        .ss-card-title {
          font-family: var(--display);
          font-size: clamp(1.1rem, 2vw, 1.25rem);
          font-weight: 600; font-style: italic;
          color: var(--navy); line-height: 1.25;
          margin: 0 0 8px;
          letter-spacing: -0.01em;
        }
        @media (min-width: 480px) {
          .ss-card-title { margin-bottom: 9px; }
        }
        @media (min-width: 640px) {
          .ss-card-title { margin-bottom: 10px; }
        }
        .ss-card-summary {
          font-size: 12px; color: #64748B;
          line-height: 1.72; margin: 0;
        }
        @media (min-width: 480px) {
          .ss-card-summary { font-size: 12.5px; }
        }
        @media (min-width: 640px) {
          .ss-card-summary { font-size: 13px; }
        }

        /* quote reveal box */
        .ss-quote-box {
          margin-top: 12px;
          padding: 12px 14px;
          border-radius: 12px;
          background: var(--warm-bg);
          border-left: 3px solid var(--cat-color, var(--primary));
          overflow: hidden;
        }
        @media (min-width: 480px) {
          .ss-quote-box { margin-top: 14px; padding: 14px 16px; border-radius: 14px; }
        }
        @media (min-width: 640px) {
          .ss-quote-box { margin-top: 16px; }
        }
        .ss-quote-text {
          font-size: 11.5px; font-style: italic; color: #475569;
          line-height: 1.65; margin: 5px 0 3px;
        }
        @media (min-width: 480px) {
          .ss-quote-text { font-size: 12px; margin: 6px 0 4px; }
        }
        @media (min-width: 640px) {
          .ss-quote-text { font-size: 12.5px; }
        }
        .ss-quote-name {
          font-size: 9.5px; font-weight: 600; color: #94A3B8;
          letter-spacing: 0.06em;
        }
        @media (min-width: 480px) {
          .ss-quote-name { font-size: 10px; }
        }
        @media (min-width: 640px) {
          .ss-quote-name { font-size: 10.5px; }
        }

        /* ══ SEVA STRIP ══════════════════════════════════════ */
        .seva-strip {
          background: linear-gradient(
            135deg,
            #FFFFFF 0%,
            #FEFEFD 50%,
            #FFFFFF 100%
          );
          padding: 36px 16px;
          position: relative;
          overflow: hidden;
          border-top: 1px solid var(--border);
        }
        @media (min-width: 480px) {
          .seva-strip { padding: 40px 20px; }
        }
        @media (min-width: 640px) {
          .seva-strip { padding: 46px 30px; }
        }
        @media (min-width: 768px) {
          .seva-strip { padding: 52px 40px; }
        }

        .seva-strip::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(
              circle at 20% 50%,
              rgba(216,27,74,0.015) 0%,
              transparent 55%
            ),
            radial-gradient(
              circle at 80% 50%,
              rgba(138,174,59,0.012) 0%,
              transparent 55%
            );
          pointer-events: none;
        }
        .seva-strip-inner {
          max-width: 1280px; margin: 0 auto;
          display: flex; flex-wrap: wrap;
          align-items: center; justify-content: center;
          gap: 20px; position: relative; z-index: 2;
          text-align: center;
        }
        @media (min-width: 480px) {
          .seva-strip-inner { gap: 24px; }
        }
        @media (min-width: 768px) {
          .seva-strip-inner { justify-content: space-between; text-align: left; gap: 28px; }
        }
        .seva-strip-text h2 {
          font-family: var(--display);
          font-size: clamp(1.5rem, 4vw, 2.8rem);
          font-weight: 600; font-style: italic;
          color: var(--navy); margin: 0 0 6px;
          letter-spacing: -0.02em;
        }
        @media (min-width: 480px) {
          .seva-strip-text h2 { margin-bottom: 8px; }
        }
        .seva-strip-text p {
          font-size: 13px; color: #64748B;
          max-width: 440px; line-height: 1.70; margin: 0 auto;
        }
        @media (min-width: 480px) {
          .seva-strip-text p { font-size: 14px; }
        }
        @media (min-width: 768px) {
          .seva-strip-text p { margin: 0; }
        }
        .seva-strip-actions {
          display: flex; gap: 10px; flex-wrap: wrap;
          justify-content: center;
        }
        @media (min-width: 480px) {
          .seva-strip-actions { gap: 12px; }
        }
        .seva-btn-primary {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 11px 22px; border-radius: 999px;
          background: linear-gradient(135deg, var(--primary), var(--primary-d));
          color: #FFFFFF; font-size: 13px; font-weight: 600;
          text-decoration: none;
          box-shadow: 0 12px 36px rgba(216,27,74,0.22);
          transition: transform 0.22s, box-shadow 0.22s;
        }
        @media (min-width: 480px) {
          .seva-btn-primary { padding: 12px 25px; font-size: 13.5px; gap: 7px; }
        }
        @media (min-width: 640px) {
          .seva-btn-primary { padding: 13px 28px; font-size: 14px; gap: 8px; }
        }
        .seva-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 18px 48px rgba(216,27,74,0.32); }

        .seva-btn-secondary {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 11px 22px; border-radius: 999px;
          border: 1.5px solid var(--border);
          background: #FFFFFF;
          color: var(--navy); font-size: 13px; font-weight: 600;
          text-decoration: none;
          box-shadow: 0 2px 10px rgba(30,41,59,0.04);
          transition: border-color 0.22s, color 0.22s, background 0.22s;
        }
        @media (min-width: 480px) {
          .seva-btn-secondary { padding: 12px 25px; font-size: 13.5px; gap: 7px; }
        }
        @media (min-width: 640px) {
          .seva-btn-secondary { padding: 13px 28px; font-size: 14px; gap: 8px; }
        }
        .seva-btn-secondary:hover { 
          border-color: var(--primary); 
          color: var(--primary); 
          background: #FCE4E8; 
        }

        /* ── quote section ── */
        .quote-section {
          background: #FFFFFF;
          border-top: 1px solid rgba(30,41,59,0.08);
          border-bottom: 1px solid rgba(30,41,59,0.08);
          padding: 36px 16px;
          marginTop: '20px'
        }
        @media (min-width: 480px) {
          .quote-section { padding: 40px 24px; }
        }
        @media (min-width: 640px) {
          .quote-section { padding: 44px 32px; }
        }
        @media (min-width: 768px) {
          .quote-section { padding: 48px 40px; }
        }
        .quote-inner {
          max-width: 1280px; margin: 0 auto;
          textAlign: center;
        }
        .quote-text {
          font-family: var(--display);
          font-size: clamp(1rem, 2.5vw, 1.3rem);
          font-style: italic;
          color: #64748B;
          margin-bottom: 6px;
          line-height: 1.6;
        }
        @media (min-width: 480px) {
          .quote-text { margin-bottom: 8px; }
        }
        .quote-attribution {
          font-size: clamp(10px, 1.5vw, 12px);
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #E8B21C;
        }
      `}</style>

      <div style={{
        position: 'fixed',
        bottom: '12px',
        left: '12px',
        zIndex: 40
      }}>
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowAdminLogin(!showAdminLogin)}
            style={{
              width: '44px',
              height: '44px',
              backgroundColor: 'rgba(255, 255, 255, 0.88)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 15px -3px rgba(30, 41, 59, 0.08), 0 4px 6px -2px rgba(30, 41, 59, 0.04)',
              transition: 'all 0.3s ease',
              border: '1px solid rgba(30, 41, 59, 0.10)',
              cursor: 'pointer',
              padding: 0
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(216, 27, 74, 0.08)'
              e.currentTarget.style.borderColor = 'rgba(216, 27, 74, 0.20)'
              e.currentTarget.style.transform = 'scale(1.05)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.88)'
              e.currentTarget.style.borderColor = 'rgba(30, 41, 59, 0.10)'
              e.currentTarget.style.transform = 'scale(1)'
            }}
            title="Admin Access"
          >
            <Shield size={18} className="sm:w-[20px] sm:h-[20px]" style={{ color: '#D81B4A' }} />
          </button>
          
          {showAdminLogin && (
            <div style={{
              position: 'absolute',
              bottom: '56px',
              left: 0,
              backgroundColor: '#FFFFFF',
              borderRadius: '10px',
              boxShadow: '0 20px 25px -5px rgba(30, 41, 59, 0.08), 0 10px 10px -5px rgba(30, 41, 59, 0.04)',
              border: '1px solid rgba(30, 41, 59, 0.08)',
              padding: '10px',
              width: '220px',
              zIndex: 50
            }}>
              <h3 style={{
                fontWeight: 'bold',
                color: '#1E293B',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                fontSize: '14px'
              }}>
                <Shield size={14} style={{ marginRight: '8px', color: '#D81B4A' }} />
                Admin Access
              </h3>
              <Link to="/admin-login" style={{ textDecoration: 'none' }}>
                <button
                  style={{
                    width: '100%',
                    padding: '8px 16px',
                    background: 'linear-gradient(135deg, #D81B4A, #B0153D)',
                    color: '#FFFFFF',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '13px',
                    boxShadow: '0 8px 20px rgba(216, 27, 74, 0.20)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #B0153D, #9A0F30)'
                    e.currentTarget.style.boxShadow = '0 12px 28px rgba(216, 27, 74, 0.28)'
                    e.currentTarget.style.transform = 'translateY(-1px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #D81B4A, #B0153D)'
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(216, 27, 74, 0.20)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  Admin Login
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>

      <Navbar />

      {/* ══ BANNER ══════════════════════════════════════════ */}
      <section className="ss-banner" style={{ marginTop: "clamp(80px, 10vw, 101px)" }}>
        <div className="ss-banner-bg" />
        <div className="ss-banner-ov1" />
        <div className="ss-banner-ov2" />

        {/* decorative motif */}
        <div className="ss-banner-motif">
          <div className="ss-motif-line" />
          <span className="ss-motif-symbol">ॐ</span>
          <div className="ss-motif-line r" />
        </div>

        <div className="ss-banner-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="ss-banner-eyebrow">
              <span className="ss-banner-eyebrow-dot" />
              Adiyogi Foundation — Seva Stories
            </div>
            <h1 className="ss-banner-title">
              Where Devotion Becomes<br />Service
            </h1>
            <div className="ss-banner-line" />
            <p className="ss-banner-sub">
              From restoring ancient temples to feeding thousands at Bhandara, 
              every act of seva is a prayer in action. Here are stories of grace.
            </p>
            <a href="#stories" className="ss-banner-cta">
              Read the Stories <ChevronRight size={14} className="sm:w-[15px] sm:h-[15px] lg:w-[16px] lg:h-[16px]" />
            </a>
          </motion.div>
        </div>

        {/* wave into filter bar */}
        <div className="ss-banner-wave">
          <svg viewBox="0 0 1440 56" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,22 C240,56 600,0 1440,30 L1440,56 L0,56 Z" fill="#FFFFFF" />
          </svg>
        </div>
      </section>

      {/* ══ FILTER BAR ══════════════════════════════════════ */}
      <div className="ss-filter-bar" id="stories">
        <div className="ss-filter-inner items-center justify-center">
          {filters.map(f => (
            <button
              key={f}
              type="button"
              className={`ss-filter-btn ${activeFilter === f ? "active" : ""}`}
              onClick={() => setActiveFilter(f)}
            >
              {f === "Temple Restoration" && "🛕"} 
              {f === "Bhandara Seva" && "🍱"}
              {f === "Helping the Needy" && "🤝"}
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* ══ STORIES GRID ════════════════════════════════════ */}
      <div className="ss-grid-section">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="ss-grid"
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
            variants={stagger}
          >
            {filtered.map((story, i) => (
              <StoryCard key={story.id} story={story} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ══ SEVA CTA STRIP ══════════════════════════════════ */}
      <div className="seva-strip">
        <div className="seva-strip-inner">
          <div className="seva-strip-text">
            <h2>Join the Seva. Become the Change.</h2>
            <p>
              Your contribution — however small — helps restore temples, 
              feed thousands at Bhandara, and bring relief to those in need. 
              Seva is the highest dharma.
            </p>
          </div>
          <div className="seva-strip-actions">
            <a href="/#donate" className="seva-btn-primary">
              <Heart size={14} className="sm:w-[15px] sm:h-[15px] lg:w-[16px] lg:h-[16px]" />
              Donate Now
            </a>
            <a href="/contact" className="seva-btn-secondary">
              Contact Us <ArrowRight size={13} className="sm:w-[14px] sm:h-[14px] lg:w-[15px] lg:h-[15px]" />
            </a>
          </div>
        </div>
      </div>

      <div className="quote-section">
        <div className="quote-inner">
          <p className="quote-text">
            "Every act of seva brings us closer to the divine."
          </p>
          <p className="quote-attribution">
            — Adiyogi Foundation
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}