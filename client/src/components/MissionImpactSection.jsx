
// import { useState, useEffect, useRef } from "react";
// import { motion, useInView } from "framer-motion";
// import {
//   FiArrowRight, FiCheckCircle, FiHeart,
//   FiShield, FiTrendingUp, FiUsers,
// } from "react-icons/fi";
// import { HiOutlineSparkles } from "react-icons/hi2";

// /* ── assets ─────────────────────────────────────────────── */
// const missionImage =
//   "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=85";

// const impactStats = [
//   { value: 10000, suffix: "+", label: "Lives Impacted",       description: "People reached through care, relief, and community support.", icon: FiUsers    },
//   { value: 500,   suffix: "+", label: "Active Donors",        description: "Supporters contributing to meaningful, lasting change.",        icon: FiHeart    },
//   { value: 150,   suffix: "+", label: "Community Programs",   description: "Initiatives designed around real, verified local needs.",       icon: FiTrendingUp },
//   { value: 50,    suffix: "+", label: "Partner Organizations",description: "Collaborations helping scale trusted, transparent impact.",     icon: FiShield   },
// ];

// const values = [
//   { title: "Transparent Donations",    description: "Every contribution is tracked with full accountability and a clear focus on measurable outcomes.",         icon: FiShield,      color: "#D81B4A", bg: "rgba(216,27,74,0.06)",   border: "rgba(216,27,74,0.12)"  },
//   { title: "Community-Driven Impact",  description: "Programs shaped around real community needs — serving people with dignity and lasting respect.",           icon: FiUsers,       color: "#8AAE3B", bg: "rgba(138,174,59,0.06)",  border: "rgba(138,174,59,0.12)"  },
//   { title: "Verified Programs",        description: "Each initiative is responsibly executed with thoughtful reporting and long-term trust at its core.",       icon: FiCheckCircle, color: "#1E293B", bg: "rgba(30,41,59,0.05)",   border: "rgba(30,41,59,0.10)"   },
//   { title: "Sustainable Change",       description: "We focus on lasting progress beyond temporary relief so communities can move forward with real strength.", icon: FiTrendingUp,  color: "#D81B4A", bg: "rgba(216,27,74,0.06)",   border: "rgba(216,27,74,0.12)"  },
// ];

// /* ── count-up hook ───────────────────────────────────────── */
// function useCountUp(end, duration = 2000, active = false) {
//   const [count, setCount] = useState(0);
//   useEffect(() => {
//     if (!active) return;
//     let start = 0;
//     const step = end / (duration / 16);
//     const t = setInterval(() => {
//       start += step;
//       if (start >= end) { setCount(end); clearInterval(t); }
//       else setCount(Math.floor(start));
//     }, 16);
//     return () => clearInterval(t);
//   }, [end, duration, active]);
//   return count;
// }

// function StatNumber({ end, suffix, active }) {
//   const n = useCountUp(end, 2000, active);
//   return <>{n.toLocaleString("en-IN")}{suffix}</>;
// }

// const fadeUp = {
//   hidden:   { opacity: 0, y: 28 },
//   visible:  { opacity: 1, y: 0, transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] } },
// };

// /* ── component ───────────────────────────────────────────── */
// export default function MissionImpactSection() {
//   const statsRef  = useRef(null);
//   const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

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
//           --warm:      #FAFAF7;
//           --border:    rgba(30,41,59,0.08);
//           --display:   'Cormorant Garamond', Georgia, serif;
//           --body:      'DM Sans', sans-serif;
//         }

//         /* ── section ── */
//         .mi-section {
//           position: relative; overflow: hidden;
//           background: linear-gradient(180deg, #FFFFFF 0%, var(--warm) 50%, #FFFFFF 100%);
//           padding: 88px 40px 96px;
//           font-family: var(--body);
//         }
//         @media (max-width: 768px) { .mi-section { padding: 60px 20px 72px; } }

//         /* orbs */
//         .mi-orb-l {
//           position: absolute; top: 60px; left: -100px;
//           width: 380px; height: 380px; border-radius: 50%;
//           background: radial-gradient(circle, rgba(216,27,74,0.06) 0%, transparent 70%);
//           pointer-events: none;
//         }
//         .mi-orb-r {
//           position: absolute; bottom: 80px; right: -100px;
//           width: 360px; height: 360px; border-radius: 50%;
//           background: radial-gradient(circle, rgba(138,174,59,0.06) 0%, transparent 70%);
//           pointer-events: none;
//         }

//         .mi-inner { max-width: 1280px; margin: 0 auto; position: relative; z-index: 2; }

//         /* ── top two-col ── */
//         .mi-top {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 72px;
//           align-items: center;
//           margin-bottom: 80px;
//         }
//         @media (max-width: 1023px) { .mi-top { grid-template-columns: 1fr; gap: 48px; } }

//         /* left text col */
//         .mi-eyebrow {
//           display: inline-flex; align-items: center; gap: 7px;
//           padding: 5px 14px; border-radius: 999px;
//           background: rgba(216,27,74,0.06);
//           border: 1px solid rgba(216,27,74,0.12);
//           font-size: 10.5px; font-weight: 700;
//           letter-spacing: 0.13em; text-transform: uppercase;
//           color: var(--primary); margin-bottom: 18px;
//         }
//         .mi-title {
//           font-family: var(--display);
//           font-size: clamp(2rem, 3.5vw, 3rem);
//           font-weight: 600; font-style: italic;
//           color: var(--navy);
//           letter-spacing: -0.025em; line-height: 1.18;
//           margin: 0 0 24px;
//         }
//         .mi-body {
//           font-size: 15px; line-height: 1.82;
//           color: #475569; font-weight: 400;
//           margin: 0; max-width: 520px;
//         }
//         .mi-body p { margin: 0 0 16px; }
//         .mi-body p:last-child { margin-bottom: 0; }

//         .mi-cta-row {
//           display: flex; flex-wrap: wrap; gap: 12px; margin-top: 32px;
//         }
//         .mi-btn-primary {
//           display: inline-flex; align-items: center; gap: 8px;
//           padding: 12px 26px; border-radius: 999px;
//           background: linear-gradient(135deg, var(--primary) 0%, var(--primary-d) 100%);
//           color: #fff; font-size: 13.5px; font-weight: 600;
//           text-decoration: none;
//           box-shadow: 0 14px 36px rgba(216,27,74,0.25);
//           transition: transform 0.22s, box-shadow 0.22s;
//         }
//         .mi-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 20px 48px rgba(216,27,74,0.35); }

//         .mi-btn-secondary {
//           display: inline-flex; align-items: center; gap: 8px;
//           padding: 12px 26px; border-radius: 999px;
//           background: #FFFFFF; border: 1.5px solid var(--border);
//           color: #334155; font-size: 13.5px; font-weight: 600;
//           text-decoration: none;
//           box-shadow: 0 2px 10px rgba(30,41,59,0.04);
//           transition: border-color 0.22s, color 0.22s, background 0.22s;
//         }
//         .mi-btn-secondary:hover {
//           border-color: rgba(216,27,74,0.22);
//           color: var(--primary); background: #FCE4E8;
//         }

//         /* right image col */
//         .mi-img-wrap {
//           position: relative;
//         }
//         .mi-img-glow-tl {
//           position: absolute; top: -24px; left: -24px;
//           width: 120px; height: 120px; border-radius: 50%;
//           background: radial-gradient(circle, rgba(216,27,74,0.18) 0%, transparent 70%);
//           pointer-events: none;
//         }
//         .mi-img-glow-br {
//           position: absolute; bottom: -24px; right: -24px;
//           width: 140px; height: 140px; border-radius: 50%;
//           background: radial-gradient(circle, rgba(138,174,59,0.15) 0%, transparent 70%);
//           pointer-events: none;
//         }
//         .mi-img-frame {
//           position: relative;
//           border-radius: 24px;
//           background: #fff;
//           padding: 10px;
//           box-shadow: 0 28px 80px rgba(30,41,59,0.10), 0 0 0 1px var(--border);
//           overflow: hidden;
//         }
//         .mi-img {
//           width: 100%; height: 480px; object-fit: cover;
//           border-radius: 18px; display: block;
//         }
//         @media (max-width: 600px) { .mi-img { height: 300px; } }

//         /* floating card on image */
//         .mi-float-card {
//           position: absolute;
//           bottom: 22px; left: 22px; right: 22px;
//           border-radius: 20px;
//           background: rgba(255,255,255,0.92);
//           backdrop-filter: blur(16px);
//           border: 1px solid rgba(255,255,255,0.50);
//           box-shadow: 0 16px 48px rgba(30,41,59,0.10);
//           padding: 18px 20px;
//           display: flex; align-items: flex-start; gap: 14px;
//         }
//         .mi-float-icon {
//           width: 44px; height: 44px; border-radius: 14px;
//           background: rgba(138,174,59,0.07);
//           border: 1px solid rgba(138,174,59,0.14);
//           display: flex; align-items: center; justify-content: center;
//           flex-shrink: 0; color: var(--secondary);
//         }
//         .mi-float-label {
//           font-size: 10px; font-weight: 700;
//           letter-spacing: 0.14em; text-transform: uppercase;
//           color: var(--primary); margin-bottom: 4px;
//         }
//         .mi-float-body {
//           font-size: 12.5px; color: #475569; line-height: 1.6;
//           font-weight: 400; margin: 0;
//         }

//         /* ── divider ── */
//         .mi-divider {
//           height: 1px; margin: 0 0 72px;
//           background: linear-gradient(to right, transparent, var(--border) 30%, var(--border) 70%, transparent);
//         }

//         /* ── stats grid ── */
//         .mi-stats-grid {
//           display: grid;
//           grid-template-columns: repeat(4, 1fr);
//           gap: 16px;
//           margin-bottom: 80px;
//         }
//         @media (max-width: 1023px) { .mi-stats-grid { grid-template-columns: repeat(2, 1fr); } }
//         @media (max-width: 480px)  { .mi-stats-grid { grid-template-columns: 1fr; } }

//         .mi-stat-card {
//           position: relative;
//           border-radius: 22px;
//           background: #FFFFFF;
//           border: 1px solid var(--border);
//           box-shadow: 0 8px 28px rgba(30,41,59,0.05);
//           padding: 28px 24px;
//           overflow: hidden;
//           transition: transform 0.32s cubic-bezier(0.22,1,0.36,1), box-shadow 0.32s;
//         }
//         .mi-stat-card:hover {
//           transform: translateY(-6px);
//           box-shadow: 0 20px 56px rgba(30,41,59,0.09);
//         }
//         /* accent bar */
//         .mi-stat-card::before {
//           content: '';
//           position: absolute; top: 0; left: 24px; right: 24px; height: 3px;
//           border-radius: 0 0 4px 4px;
//           background: linear-gradient(90deg, var(--primary), var(--secondary));
//           opacity: 0;
//           transition: opacity 0.3s;
//         }
//         .mi-stat-card:hover::before { opacity: 1; }

//         .mi-stat-icon {
//           width: 44px; height: 44px; border-radius: 13px;
//           display: flex; align-items: center; justify-content: center;
//           background: rgba(216,27,74,0.06);
//           border: 1px solid rgba(216,27,74,0.10);
//           color: var(--primary); margin-bottom: 20px;
//           transition: transform 0.28s;
//         }
//         .mi-stat-card:hover .mi-stat-icon { transform: scale(1.08); }

//         .mi-stat-value {
//           font-family: var(--display);
//           font-size: 2.6rem; font-weight: 600;
//           color: var(--navy); line-height: 1; margin-bottom: 6px;
//           letter-spacing: -0.03em;
//         }
//         .mi-stat-label {
//           font-size: 13px; font-weight: 600; color: #1E293B;
//           margin-bottom: 8px;
//         }
//         .mi-stat-desc { font-size: 12.5px; color: #64748B; line-height: 1.65; }

//         /* ── why-support header ── */
//         .mi-why-header {
//           text-align: center; margin-bottom: 40px;
//         }
//         .mi-why-eyebrow {
//           display: inline-flex; align-items: center; gap: 7px;
//           padding: 5px 14px; border-radius: 999px;
//           background: rgba(138,174,59,0.06);
//           border: 1px solid rgba(138,174,59,0.12);
//           font-size: 10.5px; font-weight: 700;
//           letter-spacing: 0.13em; text-transform: uppercase;
//           color: var(--secondary); margin-bottom: 16px;
//         }
//         .mi-why-title {
//           font-family: var(--display);
//           font-size: clamp(1.7rem, 3vw, 2.4rem);
//           font-weight: 600; font-style: italic;
//           color: var(--navy); letter-spacing: -0.02em;
//           line-height: 1.22; margin: 0; max-width: 640px;
//           margin: 0 auto;
//         }

//         /* ── values grid ── */
//         .mi-values-grid {
//           display: grid;
//           grid-template-columns: repeat(4, 1fr);
//           gap: 16px;
//         }
//         @media (max-width: 1023px) { .mi-values-grid { grid-template-columns: repeat(2, 1fr); } }
//         @media (max-width: 480px)  { .mi-values-grid { grid-template-columns: 1fr; } }

//         .mi-val-card {
//           border-radius: 22px;
//           background: #FFFFFF;
//           border: 1px solid var(--border);
//           box-shadow: 0 6px 24px rgba(30,41,59,0.04);
//           padding: 28px 24px;
//           transition: transform 0.32s cubic-bezier(0.22,1,0.36,1),
//                       box-shadow 0.32s, border-color 0.3s;
//         }
//         .mi-val-card:hover {
//           transform: translateY(-6px);
//           box-shadow: 0 18px 50px rgba(30,41,59,0.08);
//           border-color: rgba(216,27,74,0.12);
//         }
//         .mi-val-icon {
//           width: 46px; height: 46px; border-radius: 14px;
//           display: flex; align-items: center; justify-content: center;
//           margin-bottom: 22px;
//           transition: transform 0.28s;
//         }
//         .mi-val-card:hover .mi-val-icon { transform: scale(1.08) rotate(-4deg); }
//         .mi-val-title {
//           font-size: 15px; font-weight: 600; color: var(--navy);
//           margin: 0 0 10px;
//         }
//         .mi-val-desc {
//           font-size: 13px; color: #64748B; line-height: 1.72; margin: 0;
//         }
//       `}</style>

//       <section className="mi-section">
//         <div className="mi-orb-l" />
//         <div className="mi-orb-r" />

//         <div className="mi-inner">

//           {/* ── top: text + image ── */}
//           <motion.div
//             className="mi-top"
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, margin: "-100px" }}
//             variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.14 } } }}
//           >
//             {/* left */}
//             <motion.div variants={fadeUp}>
//               <div className="mi-eyebrow">
//                 <HiOutlineSparkles size={12} />
//                 Our Mission
//               </div>
//               <h2 className="mi-title">
//                 Creating Meaningful Change Through Compassion &amp; Action
//               </h2>
//               <div className="mi-body">
//                 <p>
//                   At Adiyogi Foundation, every initiative is built around empowering
//                   lives, strengthening communities, and creating sustainable positive change.
//                 </p>
//                 <p>
//                   We believe support should feel personal, transparent, and deeply human.
//                   From donors to volunteers to partner organizations, every act of care
//                   becomes part of a larger movement for dignity and hope.
//                 </p>
//                 <p>
//                   Our work focuses on practical community programs that respond to real
//                   needs and create measurable outcomes people can trust.
//                 </p>
//               </div>
//               <div className="mi-cta-row">
//                 <motion.a
//                   href="#donate"
//                   className="mi-btn-primary"
//                   whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
//                 >
//                   Support Our Mission
//                   <FiArrowRight size={15} />
//                 </motion.a>
//                 <motion.a
//                   href="/success-stories"
//                   className="mi-btn-secondary"
//                   whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
//                 >
//                   Read Success Stories
//                 </motion.a>
//               </div>
//             </motion.div>

//             {/* right image */}
//             <motion.div
//               variants={fadeUp}
//               className="mi-img-wrap"
//               animate={{ y: [0, -8, 0] }}
//               transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
//             >
//               <div className="mi-img-glow-tl" />
//               <div className="mi-img-glow-br" />
//               <div className="mi-img-frame">
//                 <img src={missionImage} alt="Adiyogi Foundation community" className="mi-img" />
//                 <div className="mi-float-card">
//                   <div className="mi-float-icon">
//                     <FiHeart size={20} />
//                   </div>
//                   <div>
//                     <p className="mi-float-label">Human-first impact</p>
//                     <p className="mi-float-body">
//                       Compassion-led programs designed to serve with dignity,
//                       clarity, and long-term trust.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>

//           {/* ── stats ── */}
//           <div ref={statsRef}>
//             <motion.div
//               className="mi-stats-grid"
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true, margin: "-80px" }}
//               variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }}
//             >
//               {impactStats.map((s) => {
//                 const Icon = s.icon;
//                 return (
//                   <motion.div key={s.label} variants={fadeUp} className="mi-stat-card">
//                     <div className="mi-stat-icon">
//                       <Icon size={20} />
//                     </div>
//                     <div className="mi-stat-value">
//                       <StatNumber end={s.value} suffix={s.suffix} active={statsInView} />
//                     </div>
//                     <div className="mi-stat-label">{s.label}</div>
//                     <p className="mi-stat-desc">{s.description}</p>
//                   </motion.div>
//                 );
//               })}
//             </motion.div>
//           </div>

//           {/* ── divider ── */}
//           <div className="mi-divider" />

//           {/* ── why support ── */}
//           <motion.div
//             className="mi-why-header"
//             initial={{ opacity: 0, y: 22 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-80px" }}
//             transition={{ duration: 0.55 }}
//           >
//             <div className="mi-why-eyebrow">
//               <FiCheckCircle size={11} />
//               Why Support Us
//             </div>
//             <h2 className="mi-why-title">
//               Built on trust, clarity, and measurable community progress.
//             </h2>
//           </motion.div>

//           <motion.div
//             className="mi-values-grid"
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, margin: "-80px" }}
//             variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }}
//           >
//             {values.map((v) => {
//               const Icon = v.icon;
//               return (
//                 <motion.article key={v.title} variants={fadeUp} className="mi-val-card">
//                   <div
//                     className="mi-val-icon"
//                     style={{
//                       background: v.bg,
//                       border: `1px solid ${v.border}`,
//                       color: v.color,
//                     }}
//                   >
//                     <Icon size={20} />
//                   </div>
//                   <h3 className="mi-val-title">{v.title}</h3>
//                   <p className="mi-val-desc">{v.description}</p>
//                 </motion.article>
//               );
//             })}
//           </motion.div>

//         </div>
//       </section>
//     </>
//   );
// }


import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FiArrowRight, FiCheckCircle, FiHeart,
  FiShield, FiTrendingUp, FiUsers,
} from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";

/* ── assets ─────────────────────────────────────────────── */
const missionImage =
  "/Donation3 (2).png";

const impactStats = [
  { value: 10000, suffix: "+", label: "Lives Impacted",       description: "People reached through care, relief, and community support.", icon: FiUsers    },
  { value: 500,   suffix: "+", label: "Active Donors",        description: "Supporters contributing to meaningful, lasting change.",        icon: FiHeart    },
  { value: 150,   suffix: "+", label: "Community Programs",   description: "Initiatives designed around real, verified local needs.",       icon: FiTrendingUp },
  { value: 50,    suffix: "+", label: "Partner Organizations",description: "Collaborations helping scale trusted, transparent impact.",     icon: FiShield   },
];

const values = [
  { title: "Transparent Donations",    description: "Every contribution is tracked with full accountability and a clear focus on measurable outcomes.",         icon: FiShield,      color: "#D81B4A", bg: "rgba(216,27,74,0.06)",   border: "rgba(216,27,74,0.12)"  },
  { title: "Community-Driven Impact",  description: "Programs shaped around real community needs — serving people with dignity and lasting respect.",           icon: FiUsers,       color: "#8AAE3B", bg: "rgba(138,174,59,0.06)",  border: "rgba(138,174,59,0.12)"  },
  { title: "Verified Programs",        description: "Each initiative is responsibly executed with thoughtful reporting and long-term trust at its core.",       icon: FiCheckCircle, color: "#1E293B", bg: "rgba(30,41,59,0.05)",   border: "rgba(30,41,59,0.10)"   },
  { title: "Sustainable Change",       description: "We focus on lasting progress beyond temporary relief so communities can move forward with real strength.", icon: FiTrendingUp,  color: "#D81B4A", bg: "rgba(216,27,74,0.06)",   border: "rgba(216,27,74,0.12)"  },
];

/* ── count-up hook ───────────────────────────────────────── */
function useCountUp(end, duration = 2000, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = end / (duration / 16);
    const t = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(t); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(t);
  }, [end, duration, active]);
  return count;
}

function StatNumber({ end, suffix, active }) {
  const n = useCountUp(end, 2000, active);
  return <>{n.toLocaleString("en-IN")}{suffix}</>;
}

const fadeUp = {
  hidden:   { opacity: 0, y: 28 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] } },
};

/* ── component ───────────────────────────────────────────── */
export default function MissionImpactSection() {
  const statsRef  = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        :root {
          --primary:   #D81B4A;
          --primary-d: #B0153D;
          --secondary: #8AAE3B;
          --accent:    #E8B21C;
          --navy:      #1E293B;
          --warm:      #FAFAF7;
          --border:    rgba(30,41,59,0.08);
          --display:   'Cormorant Garamond', Georgia, serif;
          --body:      'DM Sans', sans-serif;
        }

        /* ── section ── */
        .mi-section {
          position: relative; overflow: hidden;
          background: linear-gradient(180deg, #FFFFFF 0%, var(--warm) 50%, #FFFFFF 100%);
          padding: 48px 16px 56px;
          font-family: var(--body);
        }
        @media (min-width: 480px) {
          .mi-section { padding: 56px 20px 64px; }
        }
        @media (min-width: 640px) {
          .mi-section { padding: 68px 28px 76px; }
        }
        @media (min-width: 768px) {
          .mi-section { padding: 78px 34px 86px; }
        }
        @media (min-width: 1024px) {
          .mi-section { padding: 88px 40px 96px; }
        }

        /* orbs - responsive */
        .mi-orb-l {
          position: absolute; top: 30px; left: -60px;
          width: 240px; height: 240px; border-radius: 50%;
          background: radial-gradient(circle, rgba(216,27,74,0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        @media (min-width: 480px) {
          .mi-orb-l { top: 40px; left: -80px; width: 300px; height: 300px; }
        }
        @media (min-width: 768px) {
          .mi-orb-l { top: 60px; left: -100px; width: 380px; height: 380px; }
        }
        .mi-orb-r {
          position: absolute; bottom: 40px; right: -60px;
          width: 220px; height: 220px; border-radius: 50%;
          background: radial-gradient(circle, rgba(138,174,59,0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        @media (min-width: 480px) {
          .mi-orb-r { bottom: 60px; right: -80px; width: 280px; height: 280px; }
        }
        @media (min-width: 768px) {
          .mi-orb-r { bottom: 80px; right: -100px; width: 360px; height: 360px; }
        }

        .mi-inner { max-width: 1280px; margin: 0 auto; position: relative; z-index: 2; }

        /* ── top two-col ── */
        .mi-top {
          display: grid;
          grid-template-columns: 1fr;
          gap: 36px;
          align-items: center;
          margin-bottom: 48px;
        }
        @media (min-width: 640px) {
          .mi-top { gap: 48px; margin-bottom: 64px; }
        }
        @media (min-width: 1024px) {
          .mi-top { grid-template-columns: 1fr 1fr; gap: 72px; margin-bottom: 80px; }
        }

        /* left text col */
        .mi-eyebrow {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 4px 12px; border-radius: 999px;
          background: rgba(216,27,74,0.06);
          border: 1px solid rgba(216,27,74,0.12);
          font-size: 9.5px; font-weight: 700;
          letter-spacing: 0.11em; text-transform: uppercase;
          color: var(--primary); margin-bottom: 14px;
        }
        @media (min-width: 480px) {
          .mi-eyebrow { font-size: 10.5px; padding: 5px 14px; gap: 7px; letter-spacing: 0.13em; margin-bottom: 18px; }
        }
        .mi-title {
          font-family: var(--display);
          font-size: clamp(1.6rem, 4vw, 3rem);
          font-weight: 600; font-style: italic;
          color: var(--navy);
          letter-spacing: -0.025em; line-height: 1.18;
          margin: 0 0 18px;
        }
        @media (min-width: 480px) {
          .mi-title { margin-bottom: 24px; }
        }
        .mi-body {
          font-size: 13.5px; line-height: 1.82;
          color: #475569; font-weight: 400;
          margin: 0; max-width: 520px;
        }
        @media (min-width: 480px) {
          .mi-body { font-size: 14.5px; }
        }
        @media (min-width: 640px) {
          .mi-body { font-size: 15px; }
        }
        .mi-body p { margin: 0 0 12px; }
        @media (min-width: 480px) {
          .mi-body p { margin-bottom: 16px; }
        }
        .mi-body p:last-child { margin-bottom: 0; }

        .mi-cta-row {
          display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px;
        }
        @media (min-width: 480px) {
          .mi-cta-row { gap: 12px; margin-top: 32px; }
        }
        .mi-btn-primary {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 10px 20px; border-radius: 999px;
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-d) 100%);
          color: #fff; font-size: 12.5px; font-weight: 600;
          text-decoration: none;
          box-shadow: 0 14px 36px rgba(216,27,74,0.25);
          transition: transform 0.22s, box-shadow 0.22s;
          white-space: nowrap;
        }
        @media (min-width: 480px) {
          .mi-btn-primary { padding: 11px 23px; font-size: 13px; gap: 7px; }
        }
        @media (min-width: 640px) {
          .mi-btn-primary { padding: 12px 26px; font-size: 13.5px; gap: 8px; }
        }
        .mi-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 20px 48px rgba(216,27,74,0.35); }

        .mi-btn-secondary {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 10px 20px; border-radius: 999px;
          background: #FFFFFF; border: 1.5px solid var(--border);
          color: #334155; font-size: 12.5px; font-weight: 600;
          text-decoration: none;
          box-shadow: 0 2px 10px rgba(30,41,59,0.04);
          transition: border-color 0.22s, color 0.22s, background 0.22s;
          white-space: nowrap;
        }
        @media (min-width: 480px) {
          .mi-btn-secondary { padding: 11px 23px; font-size: 13px; gap: 7px; }
        }
        @media (min-width: 640px) {
          .mi-btn-secondary { padding: 12px 26px; font-size: 13.5px; gap: 8px; }
        }
        .mi-btn-secondary:hover {
          border-color: rgba(216,27,74,0.22);
          color: var(--primary); background: #FCE4E8;
        }

        /* right image col */
        .mi-img-wrap {
          position: relative;
        }
        .mi-img-glow-tl {
          position: absolute; top: -16px; left: -16px;
          width: 80px; height: 80px; border-radius: 50%;
          background: radial-gradient(circle, rgba(216,27,74,0.18) 0%, transparent 70%);
          pointer-events: none;
        }
        @media (min-width: 480px) {
          .mi-img-glow-tl { top: -20px; left: -20px; width: 100px; height: 100px; }
        }
        @media (min-width: 640px) {
          .mi-img-glow-tl { top: -24px; left: -24px; width: 120px; height: 120px; }
        }
        .mi-img-glow-br {
          position: absolute; bottom: -16px; right: -16px;
          width: 90px; height: 90px; border-radius: 50%;
          background: radial-gradient(circle, rgba(138,174,59,0.15) 0%, transparent 70%);
          pointer-events: none;
        }
        @media (min-width: 480px) {
          .mi-img-glow-br { bottom: -20px; right: -20px; width: 110px; height: 110px; }
        }
        @media (min-width: 640px) {
          .mi-img-glow-br { bottom: -24px; right: -24px; width: 140px; height: 140px; }
        }
        .mi-img-frame {
          position: relative;
          border-radius: 16px;
          background: #fff;
          padding: 6px;
          box-shadow: 0 28px 80px rgba(30,41,59,0.10), 0 0 0 1px var(--border);
          overflow: hidden;
        }
        @media (min-width: 480px) {
          .mi-img-frame { padding: 8px; border-radius: 20px; }
        }
        @media (min-width: 640px) {
          .mi-img-frame { padding: 10px; border-radius: 24px; }
        }
        .mi-img {
          width: 100%; height: 250px; object-fit: cover;
          border-radius: 12px; display: block;
        }
        @media (min-width: 480px) {
          .mi-img { height: 320px; border-radius: 14px; }
        }
        @media (min-width: 640px) {
          .mi-img { height: 400px; border-radius: 16px; }
        }
        @media (min-width: 1024px) {
          .mi-img { height: 480px; border-radius: 18px; }
        }

        /* floating card on image */
        .mi-float-card {
          position: absolute;
          bottom: 14px; left: 14px; right: 14px;
          border-radius: 14px;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.50);
          box-shadow: 0 16px 48px rgba(30,41,59,0.10);
          padding: 14px 14px;
          display: flex; align-items: flex-start; gap: 10px;
        }
        @media (min-width: 480px) {
          .mi-float-card { bottom: 18px; left: 18px; right: 18px; padding: 16px 18px; gap: 12px; border-radius: 16px; }
        }
        @media (min-width: 640px) {
          .mi-float-card { bottom: 22px; left: 22px; right: 22px; padding: 18px 20px; gap: 14px; border-radius: 20px; }
        }
        .mi-float-icon {
          width: 36px; height: 36px; border-radius: 10px;
          background: rgba(138,174,59,0.07);
          border: 1px solid rgba(138,174,59,0.14);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; color: var(--secondary);
        }
        @media (min-width: 480px) {
          .mi-float-icon { width: 40px; height: 40px; border-radius: 12px; }
        }
        @media (min-width: 640px) {
          .mi-float-icon { width: 44px; height: 44px; border-radius: 14px; }
        }
        .mi-float-label {
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--primary); margin-bottom: 3px;
        }
        @media (min-width: 480px) {
          .mi-float-label { font-size: 10px; letter-spacing: 0.14em; margin-bottom: 4px; }
        }
        .mi-float-body {
          font-size: 11px; color: #475569; line-height: 1.6;
          font-weight: 400; margin: 0;
        }
        @media (min-width: 480px) {
          .mi-float-body { font-size: 12px; }
        }
        @media (min-width: 640px) {
          .mi-float-body { font-size: 12.5px; }
        }

        /* ── divider ── */
        .mi-divider {
          height: 1px; margin: 0 0 48px;
          background: linear-gradient(to right, transparent, var(--border) 30%, var(--border) 70%, transparent);
        }
        @media (min-width: 480px) {
          .mi-divider { margin-bottom: 56px; }
        }
        @media (min-width: 640px) {
          .mi-divider { margin-bottom: 64px; }
        }
        @media (min-width: 768px) {
          .mi-divider { margin-bottom: 72px; }
        }

        /* ── stats grid ── */
        .mi-stats-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
          margin-bottom: 48px;
        }
        @media (min-width: 480px) {
          .mi-stats-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; margin-bottom: 56px; }
        }
        @media (min-width: 1024px) {
          .mi-stats-grid { grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 80px; }
        }

        .mi-stat-card {
          position: relative;
          border-radius: 16px;
          background: #FFFFFF;
          border: 1px solid var(--border);
          box-shadow: 0 8px 28px rgba(30,41,59,0.05);
          padding: 22px 18px;
          overflow: hidden;
          transition: transform 0.32s cubic-bezier(0.22,1,0.36,1), box-shadow 0.32s;
        }
        @media (min-width: 480px) {
          .mi-stat-card { border-radius: 18px; padding: 24px 20px; }
        }
        @media (min-width: 640px) {
          .mi-stat-card { border-radius: 20px; padding: 26px 22px; }
        }
        @media (min-width: 1024px) {
          .mi-stat-card { border-radius: 22px; padding: 28px 24px; }
        }
        .mi-stat-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 56px rgba(30,41,59,0.09);
        }
        /* accent bar */
        .mi-stat-card::before {
          content: '';
          position: absolute; top: 0; left: 18px; right: 18px; height: 2px;
          border-radius: 0 0 3px 3px;
          background: linear-gradient(90deg, var(--primary), var(--secondary));
          opacity: 0;
          transition: opacity 0.3s;
        }
        @media (min-width: 480px) {
          .mi-stat-card::before { left: 22px; right: 22px; height: 3px; border-radius: 0 0 4px 4px; }
        }
        @media (min-width: 1024px) {
          .mi-stat-card::before { left: 24px; right: 24px; }
        }
        .mi-stat-card:hover::before { opacity: 1; }

        .mi-stat-icon {
          width: 38px; height: 38px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(216,27,74,0.06);
          border: 1px solid rgba(216,27,74,0.10);
          color: var(--primary); margin-bottom: 16px;
          transition: transform 0.28s;
        }
        @media (min-width: 480px) {
          .mi-stat-icon { width: 40px; height: 40px; border-radius: 11px; margin-bottom: 18px; }
        }
        @media (min-width: 640px) {
          .mi-stat-icon { width: 42px; height: 42px; border-radius: 12px; }
        }
        @media (min-width: 1024px) {
          .mi-stat-icon { width: 44px; height: 44px; border-radius: 13px; margin-bottom: 20px; }
        }
        .mi-stat-card:hover .mi-stat-icon { transform: scale(1.08); }

        .mi-stat-value {
          font-family: var(--display);
          font-size: clamp(2rem, 5vw, 2.6rem);
          font-weight: 600;
          color: var(--navy); line-height: 1; margin-bottom: 5px;
          letter-spacing: -0.03em;
        }
        @media (min-width: 480px) {
          .mi-stat-value { margin-bottom: 6px; }
        }
        .mi-stat-label {
          font-size: 12px; font-weight: 600; color: #1E293B;
          margin-bottom: 6px;
        }
        @media (min-width: 480px) {
          .mi-stat-label { font-size: 13px; margin-bottom: 8px; }
        }
        .mi-stat-desc { 
          font-size: 11.5px; color: #64748B; line-height: 1.65; 
        }
        @media (min-width: 480px) {
          .mi-stat-desc { font-size: 12.5px; }
        }

        /* ── why-support header ── */
        .mi-why-header {
          text-align: center; margin-bottom: 28px;
        }
        @media (min-width: 480px) {
          .mi-why-header { margin-bottom: 32px; }
        }
        @media (min-width: 640px) {
          .mi-why-header { margin-bottom: 40px; }
        }
        .mi-why-eyebrow {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 4px 12px; border-radius: 999px;
          background: rgba(138,174,59,0.06);
          border: 1px solid rgba(138,174,59,0.12);
          font-size: 9.5px; font-weight: 700;
          letter-spacing: 0.11em; text-transform: uppercase;
          color: var(--secondary); margin-bottom: 12px;
        }
        @media (min-width: 480px) {
          .mi-why-eyebrow { font-size: 10.5px; padding: 5px 14px; gap: 7px; letter-spacing: 0.13em; margin-bottom: 16px; }
        }
        .mi-why-title {
          font-family: var(--display);
          font-size: clamp(1.4rem, 3.5vw, 2.4rem);
          font-weight: 600; font-style: italic;
          color: var(--navy); letter-spacing: -0.02em;
          line-height: 1.22; margin: 0; max-width: 640px;
          margin: 0 auto;
          padding: 0 8px;
        }

        /* ── values grid ── */
        .mi-values-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }
        @media (min-width: 480px) {
          .mi-values-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
        }
        @media (min-width: 1024px) {
          .mi-values-grid { grid-template-columns: repeat(4, 1fr); gap: 16px; }
        }

        .mi-val-card {
          border-radius: 16px;
          background: #FFFFFF;
          border: 1px solid var(--border);
          box-shadow: 0 6px 24px rgba(30,41,59,0.04);
          padding: 22px 18px;
          transition: transform 0.32s cubic-bezier(0.22,1,0.36,1),
                      box-shadow 0.32s, border-color 0.3s;
        }
        @media (min-width: 480px) {
          .mi-val-card { border-radius: 18px; padding: 24px 20px; }
        }
        @media (min-width: 640px) {
          .mi-val-card { border-radius: 20px; padding: 26px 22px; }
        }
        @media (min-width: 1024px) {
          .mi-val-card { border-radius: 22px; padding: 28px 24px; }
        }
        .mi-val-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 18px 50px rgba(30,41,59,0.08);
          border-color: rgba(216,27,74,0.12);
        }
        .mi-val-icon {
          width: 40px; height: 40px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 18px;
          transition: transform 0.28s;
        }
        @media (min-width: 480px) {
          .mi-val-icon { width: 42px; height: 42px; border-radius: 13px; margin-bottom: 20px; }
        }
        @media (min-width: 640px) {
          .mi-val-icon { width: 44px; height: 44px; }
        }
        @media (min-width: 1024px) {
          .mi-val-icon { width: 46px; height: 46px; border-radius: 14px; margin-bottom: 22px; }
        }
        .mi-val-card:hover .mi-val-icon { transform: scale(1.08) rotate(-4deg); }
        .mi-val-title {
          font-size: 14px; font-weight: 600; color: var(--navy);
          margin: 0 0 8px;
        }
        @media (min-width: 480px) {
          .mi-val-title { font-size: 15px; margin-bottom: 10px; }
        }
        .mi-val-desc {
          font-size: 12px; color: #64748B; line-height: 1.72; margin: 0;
        }
        @media (min-width: 480px) {
          .mi-val-desc { font-size: 13px; }
        }
      `}</style>

      <section className="mi-section">
        <div className="mi-orb-l" />
        <div className="mi-orb-r" />

        <div className="mi-inner">

          {/* ── top: text + image ── */}
          <motion.div
            className="mi-top"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.14 } } }}
          >
            {/* left */}
            <motion.div variants={fadeUp}>
              <div className="mi-eyebrow">
                <HiOutlineSparkles size={11} className="sm:w-[12px] sm:h-[12px]" />
                Our Mission
              </div>
              <h2 className="mi-title">
                Creating Meaningful Change Through Compassion &amp; Action
              </h2>
              <div className="mi-body">
                <p>
                  At Adiyogi Foundation, every initiative is built around empowering
                  lives, strengthening communities, and creating sustainable positive change.
                </p>
                <p>
                  We believe support should feel personal, transparent, and deeply human.
                  From donors to volunteers to partner organizations, every act of care
                  becomes part of a larger movement for dignity and hope.
                </p>
                <p>
                  Our work focuses on practical community programs that respond to real
                  needs and create measurable outcomes people can trust.
                </p>
              </div>
              <div className="mi-cta-row">
                <motion.a
                  href="#donate"
                  className="mi-btn-primary"
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                >
                  Support Our Mission
                  <FiArrowRight size={14} className="sm:w-[15px] sm:h-[15px]" />
                </motion.a>
                <motion.a
                  href="/success-stories"
                  className="mi-btn-secondary"
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                >
                  Read Success Stories
                </motion.a>
              </div>
            </motion.div>

            {/* right image */}
            <motion.div
              variants={fadeUp}
              className="mi-img-wrap"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="mi-img-glow-tl" />
              <div className="mi-img-glow-br" />
              <div className="mi-img-frame">
                <img src={missionImage} alt="Adiyogi Foundation community" className="mi-img" />
                <div className="mi-float-card">
                  <div className="mi-float-icon">
                    <FiHeart size={16} className="sm:w-[18px] sm:h-[18px] lg:w-[20px] lg:h-[20px]" />
                  </div>
                  <div>
                    <p className="mi-float-label">Human-first impact</p>
                    <p className="mi-float-body">
                      Compassion-led programs designed to serve with dignity,
                      clarity, and long-term trust.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ── stats ── */}
          <div ref={statsRef}>
            <motion.div
              className="mi-stats-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }}
            >
              {impactStats.map((s) => {
                const Icon = s.icon;
                return (
                  <motion.div key={s.label} variants={fadeUp} className="mi-stat-card">
                    <div className="mi-stat-icon">
                      <Icon size={18} className="sm:w-[19px] sm:h-[19px] lg:w-[20px] lg:h-[20px]" />
                    </div>
                    <div className="mi-stat-value">
                      <StatNumber end={s.value} suffix={s.suffix} active={statsInView} />
                    </div>
                    <div className="mi-stat-label">{s.label}</div>
                    <p className="mi-stat-desc">{s.description}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* ── divider ── */}
          <div className="mi-divider" />

          {/* ── why support ── */}
          <motion.div
            className="mi-why-header"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
          >
            <div className="mi-why-eyebrow">
              <FiCheckCircle size={10} className="sm:w-[11px] sm:h-[11px]" />
              Why Support Us
            </div>
            <h2 className="mi-why-title">
              Built on trust, clarity, and measurable community progress.
            </h2>
          </motion.div>

          <motion.div
            className="mi-values-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }}
          >
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <motion.article key={v.title} variants={fadeUp} className="mi-val-card">
                  <div
                    className="mi-val-icon"
                    style={{
                      background: v.bg,
                      border: `1px solid ${v.border}`,
                      color: v.color,
                    }}
                  >
                    <Icon size={18} className="sm:w-[19px] sm:h-[19px] lg:w-[20px] lg:h-[20px]" />
                  </div>
                  <h3 className="mi-val-title">{v.title}</h3>
                  <p className="mi-val-desc">{v.description}</p>
                </motion.article>
              );
            })}
          </motion.div>

        </div>
      </section>
    </>
  );
}