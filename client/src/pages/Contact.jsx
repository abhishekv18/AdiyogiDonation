
// import { useState } from "react";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FiArrowRight, FiCheckCircle, FiClock,
//   FiMail, FiMapPin, FiPhone, FiSend, FiHeart,
// } from "react-icons/fi";
// import {
//   FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp,
// } from "react-icons/fa";
// import Footer from "../components/Footer";
// import Navbar from "../components/Navbar";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import toast from "react-hot-toast";
// const API_BASE_URL = "http://localhost:8000";

// /* ── data ───────────────────────────────────────────────── */
// const contactItems = [
//   { label: "Address",       value: "Adiyogi Foundation, Pilkhua, Hapur, Uttar Pradesh — 245304", href: "https://maps.google.com", icon: FiMapPin, color: "#D81B4A", bg: "rgba(216,27,74,0.06)", border: "rgba(216,27,74,0.12)" },
//   { label: "Phone",         value: "+91 98765 43210",                                             href: "tel:+919876543210",                    icon: FiPhone,  color: "#8AAE3B", bg: "rgba(138,174,59,0.06)", border: "rgba(138,174,59,0.12)" },
//   { label: "Email",         value: "seva@adiyogifoundation.org",                                  href: "mailto:seva@adiyogifoundation.org",     icon: FiMail,   color: "#E8B21C", bg: "rgba(232,178,28,0.06)", border: "rgba(232,178,28,0.12)" },
//   { label: "Seva Hours",    value: "Mon – Sat: 9:00 AM – 7:00 PM  |  Sun: 10:00 AM – 4:00 PM",  href: null,                                   icon: FiClock,  color: "#D81B4A", bg: "rgba(216,27,74,0.06)", border: "rgba(216,27,74,0.12)" },
// ];



// const socials = [
//   { Icon: FaInstagram, href: "#", label: "Instagram", color: "#D81B4A" },
//   { Icon: FaFacebookF, href: "#", label: "Facebook",  color: "#8AAE3B" },
//   { Icon: FaYoutube,   href: "#", label: "YouTube",   color: "#D81B4A" },
//   { Icon: FaWhatsapp,  href: "#", label: "WhatsApp",  color: "#8AAE3B" },
// ];

// const initialForm = { name: "", email: "", phone: "", message: "" };

// const fadeUp   = { hidden: { opacity: 0, y: 26 }, visible: { opacity: 1, y: 0, transition: { duration: 0.60, ease: [0.22, 1, 0.36, 1] } } };
// const stagger  = { hidden: {}, visible: { transition: { staggerChildren: 0.09 } } };

// export default function ContactPage() {
//     const { userData } = useSelector((state) => state.user);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (userData) {
//       navigate("/admin/dashboard");
//     }
//   }, [userData, navigate]);
//   // Replace the form section in your ContactPage.jsx with this updated version:

// /* ── FORM SECTION ── */
// const [form, setForm] = useState({
//   name: "",
//   email: "",
//   phone: "",
//   message: "",
// });
// const [submitting, setSubmit] = useState(false);
// const [done, setDone] = useState(false);

// const handleChange = (e) => {
//   setForm({ ...form, [e.target.name]: e.target.value });
// };

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setSubmit(true);

//   try {
//     const result = await axios.post(
//       `${API_BASE_URL}/api/contact/register`,
//       {
//         name: form.name,
//         email: form.email,
//         phone: form.phone,
//         message: form.message,
//       },
//       { withCredentials: true }
//     );

//     toast.success(result.data.message || "Message sent successfully!", );

//     setForm({
//       name: "",
//       email: "",
//       phone: "",
//       message: "",
//     });
//     setDone(true);
//   } catch (error) {
//     if (error.response) {
//       toast.error(
//         error.response.data.message || "Something went wrong. Please try again.",
     
//       );
//     } else if (error.request) {
//       toast.error("Network error. Please check your connection and try again.", );
//     } else {
//       toast.error("An unexpected error occurred. Please try again.", );
//     }
//   } finally {
//     setSubmit(false);
//   }
// };
//   return (
//     <main className="cp-root">
       
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
//         *, *::before, *::after { box-sizing: border-box; margin: 0; }

//         .cp-root {
//           min-height: 100vh;
//           background: var(--warm-bg);
//           font-family: var(--body);
//           color: var(--navy);
//         }

//         /* ══ BANNER — LIGHT THEME ════════════════════════ */
//         .cp-banner {
//           position: relative;
//           height: 460px;
//           display: flex; align-items: flex-end;
//           overflow: hidden;
//           margin-top: 80px;
//         background: linear-gradient(135deg, #FFF5F0 0%, #F3F0EA 30%, #F0F5E5 100%);
//         }
//         @media (max-width: 600px) { .cp-banner { height: 340px; } }

//         .cp-banner-bg {
//           position: absolute; inset: 0;
//           background: url('https://images.unsplash.com/photo-1545156521-77bd85671d30?auto=format&fit=crop&w=1800&q=85')
//             center 30% / cover no-repeat;
//           opacity: 0.48;
//           transform: scale(1.05);
//           transition: transform 9s ease;
//           z-index: 0;
//         }
//         .cp-banner:hover .cp-banner-bg { transform: scale(1.00); }
// .cp-banner-ov1 {
//   position: absolute; inset: 0; z-index: 1;
//   background: linear-gradient(180deg, rgba(250,250,247,0.10) 0%, rgba(250,250,247,0.25) 55%, rgba(250,250,247,0.70) 100%);
// }


//         /* OM motif */
//         .cp-motif {
//           position: absolute; top: 24px; left: 50%; transform: translateX(-50%);
//           z-index: 5; display: flex; align-items: center; gap: 12px; opacity: 0.40;
//         }
//         .cp-motif-line      { width: 56px; height: 1px; background: linear-gradient(to right, transparent, rgba(30,41,59,0.35)); }
//         .cp-motif-line.r    { background: linear-gradient(to left, transparent, rgba(30,41,59,0.35)); }
//         .cp-motif-sym       { font-size: 20px; color: rgba(216,27,74,0.50); }

//         .cp-banner-content {
//           position: relative; z-index: 6;
//           width: 100%; max-width: 1280px;
//           margin: 0 auto; padding: 0 40px 52px;
//         }
//         @media (max-width: 768px) { .cp-banner-content { padding: 0 20px 36px; } }

//         .cp-eyebrow {
//           display: inline-flex; align-items: center; gap: 8px;
//           padding: 5px 14px; border-radius: 999px;
//           background: rgba(216,27,74,0.07);
//           border: 1px solid rgba(216,27,74,0.14);
//           font-size: 10px; font-weight: 700;
//           letter-spacing: 0.16em; text-transform: uppercase;
//           color: var(--primary); margin-bottom: 16px;
//         }
//         .cp-eyebrow-dot {
//           width: 6px; height: 6px; border-radius: 50%;
//           background: var(--accent);
//           box-shadow: 0 0 8px rgba(232,178,28,0.7);
//           animation: gp 2s ease-in-out infinite;
//         }
//         @keyframes gp { 0%,100%{opacity:1} 50%{opacity:0.28} }

//         .cp-banner-title {
//           font-family: var(--display);
//           font-size: clamp(2.2rem, 5.5vw, 4rem);
//           font-weight: 600; font-style: italic;
//           color: var(--navy); line-height: 1.10;
//           letter-spacing: -0.02em; margin-bottom: 12px;
//         }
//         .cp-banner-sub {
//           font-size: 14.5px; color: #64748B;
//           max-width: 460px; line-height: 1.72;
//         }

//         /* wave */
//         .cp-wave { position: absolute; bottom: -2px; left: 0; right: 0; z-index: 7; line-height: 0; }
//         .cp-wave svg { display: block; width: 100%; }

//         /* ══ INFO CARDS ══════════════════════════════════ */
//         .cp-cards {
//           max-width: 1280px; margin: 0 auto;
//           padding: 52px 40px 0;
//         }
//         @media (max-width: 768px) { .cp-cards { padding: 36px 16px 0; } }

//         .cp-cards-grid {
//           display: grid;
//           grid-template-columns: repeat(4, 1fr);
//           gap: 14px;
//         }
//         @media (max-width: 1023px) { .cp-cards-grid { grid-template-columns: repeat(2, 1fr); } }
//         @media (max-width: 520px)  { .cp-cards-grid { grid-template-columns: 1fr; } }

//         .cp-info-card {
//           background: #FFFFFF;
//           border: 1px solid var(--border);
//           border-radius: 20px;
//           padding: 22px 20px;
//           box-shadow: 0 4px 18px rgba(30,41,59,0.04);
//           display: flex; flex-direction: column; gap: 11px;
//           text-decoration: none; color: inherit;
//           transition: transform 0.32s cubic-bezier(0.22,1,0.36,1), box-shadow 0.32s;
//         }
//         .cp-info-card:hover {
//           transform: translateY(-4px);
//           box-shadow: 0 14px 40px rgba(30,41,59,0.08);
//         }
//         .cp-info-icon {
//           width: 42px; height: 42px; border-radius: 12px;
//           display: flex; align-items: center; justify-content: center;
//           flex-shrink: 0;
//         }
//         .cp-info-label {
//           font-size: 10.5px; font-weight: 700;
//           letter-spacing: 0.12em; text-transform: uppercase;
//           color: #94A3B8;
//         }
//         .cp-info-value {
//           font-size: 13px; font-weight: 500;
//           color: var(--navy); line-height: 1.55;
//         }

//         /* ══ TWO-COL MAIN ════════════════════════════════ */
//         .cp-main {
//           max-width: 1280px; margin: 0 auto;
//           padding: 48px 40px 120px;
//           display: grid;
//           grid-template-columns: 1.08fr 0.92fr;
//           gap: 36px; align-items: start;
//         }
//         @media (max-width: 1023px) {
//           .cp-main { grid-template-columns: 1fr; padding: 36px 16px 60px; }
//         }

//         /* ── FORM CARD ── */
//         .cp-form-card {
//           background: #FFFFFF;
//           border: 1px solid var(--border);
//           border-radius: 26px;
//           padding: 40px 36px;
//           box-shadow: 0 16px 56px rgba(30,41,59,0.08);
//           position: relative; overflow: hidden;
//         }
//         @media (max-width: 540px) { .cp-form-card { padding: 28px 18px; } }
//         /* top gradient bar */
//         .cp-form-card::before {
//           content: '';
//           position: absolute; top: 0; left: 32px; right: 32px; height: 3px;
//           border-radius: 0 0 4px 4px;
//           background: linear-gradient(90deg, var(--primary), var(--accent), var(--secondary));
//         }

//         .cp-form-eyebrow {
//           display: inline-flex; align-items: center; gap: 6px;
//           padding: 4px 12px; border-radius: 999px;
//           background: rgba(216,27,74,0.06);
//           border: 1px solid rgba(216,27,74,0.12);
//           font-size: 10px; font-weight: 700;
//           letter-spacing: 0.14em; text-transform: uppercase;
//           color: var(--primary); margin-bottom: 14px;
//         }
//         .cp-form-title {
//           font-family: var(--display);
//           font-size: clamp(1.6rem, 2.5vw, 2.2rem);
//           font-weight: 600; font-style: italic;
//           color: var(--navy); letter-spacing: -0.02em;
//           line-height: 1.20; margin-bottom: 6px;
//         }
//         .cp-form-sub {
//           font-size: 13.5px; color: #64748B; line-height: 1.65; margin-bottom: 28px;
//         }

//         /* grid fields */
//         .cp-row {
//           display: grid; grid-template-columns: 1fr 1fr;
//           gap: 14px; margin-bottom: 14px;
//         }
//         @media (max-width: 540px) { .cp-row { grid-template-columns: 1fr; } }
//         .cp-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px; }
//         .cp-lbl {
//           font-size: 11px; font-weight: 700;
//           color: #475569; letter-spacing: 0.05em; text-transform: uppercase;
//         }
//         .cp-inp, .cp-ta {
//           padding: 12px 14px; border-radius: 12px;
//           border: 1.5px solid #E2E8F0;
//           background: var(--warm-bg);
//           font-size: 13.5px; color: var(--navy);
//           font-family: var(--body); outline: none;
//           transition: border-color 0.22s, box-shadow 0.22s, background 0.18s;
//           width: 100%;
//         }
//         .cp-inp:focus, .cp-ta:focus {
//           border-color: var(--primary);
//           box-shadow: 0 0 0 3px rgba(216,27,74,0.08);
//           background: #FFFFFF;
//         }
//         .cp-inp::placeholder, .cp-ta::placeholder { color: #94A3B8; }
//         .cp-ta { resize: vertical; min-height: 120px; }

//         /* reason chips */
//         .cp-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 22px; }
//         .cp-chip {
//           display: inline-flex; align-items: center; gap: 5px;
//           padding: 7px 13px; border-radius: 999px;
//           font-size: 12px; font-weight: 600;
//           border: 1.5px solid #E2E8F0;
//           background: #F3F5EF; color: #475569;
//           cursor: pointer; transition: all 0.20s;
//         }
//         .cp-chip:hover { border-color: rgba(216,27,74,0.28); color: var(--primary); background: #FCE4E8; }
//         .cp-chip.on {
//           background: var(--primary); color: #fff;
//           border-color: var(--primary);
//           box-shadow: 0 4px 14px rgba(216,27,74,0.20);
//         }

//         /* status bar */
//         .cp-status {
//           margin-bottom: 16px; padding: 11px 16px;
//           border-radius: 12px; font-size: 13px; font-weight: 500;
//         }
//         .cp-status.ok  { background: rgba(138,174,59,0.07); color: #5A7A28; border: 1px solid rgba(138,174,59,0.18); }
//         .cp-status.err { background: rgba(216,27,74,0.06);  color: var(--primary); border: 1px solid rgba(216,27,74,0.14); }

//         /* submit */
//         .cp-btn {
//           width: 100%; padding: 15px 24px;
//           border-radius: 14px; border: none;
//           background: linear-gradient(135deg, var(--primary) 0%, var(--primary-d) 100%);
//           color: #FFFFFF; font-size: 15px; font-weight: 700;
//           font-family: var(--body);
//           display: flex; align-items: center; justify-content: center; gap: 9px;
//           cursor: pointer;
//           box-shadow: 0 14px 38px rgba(216,27,74,0.24);
//           transition: transform 0.22s, box-shadow 0.22s, opacity 0.20s;
//         }
//         .cp-btn:hover:not(:disabled) {
//           transform: translateY(-2px);
//           box-shadow: 0 20px 50px rgba(216,27,74,0.34);
//         }
//         .cp-btn:disabled { opacity: 0.60; cursor: not-allowed; }

//         /* spinner */
//         .cp-spin {
//           width: 17px; height: 17px; border-radius: 50%;
//           border: 2.5px solid rgba(255,255,255,0.32);
//           border-top-color: #fff;
//           animation: spin 0.8s linear infinite;
//         }
//         @keyframes spin { to { transform: rotate(360deg); } }

//         /* success */
//         .cp-done {
//           display: flex; flex-direction: column;
//           align-items: center; text-align: center;
//           padding: 52px 24px; gap: 14px;
//         }
//         .cp-done-ring {
//           width: 70px; height: 70px; border-radius: 50%;
//           background: rgba(138,174,59,0.08);
//           border: 2px solid rgba(138,174,59,0.22);
//           display: flex; align-items: center; justify-content: center;
//           color: var(--secondary);
//         }
//         .cp-done-title {
//           font-family: var(--display);
//           font-size: 2rem; font-style: italic; font-weight: 600;
//           color: var(--navy);
//         }
//         .cp-done-body { font-size: 13.5px; color: #64748B; line-height: 1.70; max-width: 320px; }
//         .cp-done-sub  { font-size: 12px; font-weight: 700; letter-spacing: 0.10em; text-transform: uppercase; color: var(--accent); }

//         /* ── RIGHT SIDEBAR ── */
//         .cp-sidebar { display: flex; flex-direction: column; gap: 22px; }

//         .cp-sidebar-card {
//           background: #FFFFFF;
//           border: 1px solid var(--border);
//           border-radius: 22px;
//           padding: 28px 26px;
//           box-shadow: 0 6px 24px rgba(30,41,59,0.05);
//         }

//         .cp-sidebar-title {
//           font-family: var(--display);
//           font-size: 1.3rem; font-weight: 600; font-style: italic;
//           color: var(--navy); margin-bottom: 20px;
//           letter-spacing: -0.01em;
//         }

//         /* contact items list */
//         .cp-contact-list { display: flex; flex-direction: column; gap: 12px; }
//         .cp-contact-item {
//           display: flex; align-items: flex-start; gap: 13px;
//           text-decoration: none; color: inherit;
//           padding: 13px 14px; border-radius: 14px;
//           border: 1px solid transparent;
//           transition: background 0.22s, border-color 0.22s, transform 0.22s;
//         }
//         .cp-contact-item:hover {
//           background: var(--warm-bg);
//           border-color: var(--border);
//           transform: translateX(3px);
//         }
//         .cp-ci-icon {
//           width: 38px; height: 38px; border-radius: 11px; flex-shrink: 0;
//           display: flex; align-items: center; justify-content: center;
//         }
//         .cp-ci-label { font-size: 10.5px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #94A3B8; margin-bottom: 3px; }
//         .cp-ci-value { font-size: 13px; font-weight: 500; color: var(--navy); line-height: 1.50; }

//         /* map */
//         .cp-map {
//           border-radius: 16px; overflow: hidden;
//           height: 200px; position: relative;
//           border: 1px solid var(--border);
//         }
//         .cp-map iframe { width: 100%; height: 100%; border: none; display: block; }
//         .cp-map-badge {
//           position: absolute; top: 10px; left: 10px; z-index: 5;
//           display: inline-flex; align-items: center; gap: 6px;
//           padding: 5px 12px; border-radius: 999px;
//           background: rgba(255,255,255,0.95);
//           backdrop-filter: blur(8px);
//           border: 1px solid var(--border);
//           font-size: 11.5px; font-weight: 600; color: var(--navy);
//           box-shadow: 0 3px 14px rgba(30,41,59,0.08);
//         }
//         .cp-map-dot {
//           width: 7px; height: 7px; border-radius: 50%;
//           background: var(--primary);
//           box-shadow: 0 0 0 3px rgba(216,27,74,0.15);
//           animation: gp 2s ease-in-out infinite;
//         }

//         /* social */
//         .cp-social-row { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 4px; }
//         .cp-social-btn {
//           width: 42px; height: 42px; border-radius: 12px;
//           display: flex; align-items: center; justify-content: center;
//           background: #F3F5EF;
//           border: 1.5px solid var(--border);
//           color: #64748B; text-decoration: none;
//           transition: all 0.22s;
//         }
//         .cp-social-btn:hover {
//           background: var(--primary); border-color: var(--primary);
//           color: #FFFFFF; transform: translateY(-2px);
//           box-shadow: 0 6px 18px rgba(216,27,74,0.20);
//         }

//         /* quote */
//         .cp-quote-box {
//           border-radius: 18px;
//           background: var(--navy);
//           padding: 24px 26px;
//           position: relative; overflow: hidden;
//         }
//         .cp-quote-box::before {
//           content: '"';
//           position: absolute; top: -16px; left: 14px;
//           font-family: var(--display);
//           font-size: 130px; font-style: italic;
//           color: rgba(216,27,74,0.08);
//           line-height: 1; pointer-events: none; user-select: none;
//         }
//         .cp-quote-text {
//           font-family: var(--display);
//           font-size: 1.15rem; font-style: italic; font-weight: 500;
//           color: rgba(255,255,255,0.88); line-height: 1.55;
//           margin-bottom: 12px; position: relative; z-index: 1;
//         }
//         .cp-quote-attr {
//           font-size: 11px; font-weight: 700;
//           letter-spacing: 0.10em; text-transform: uppercase;
//           color: var(--accent);
//         }
//       `}</style>
//  <Navbar/>
//       {/* ══ BANNER — LIGHT THEME ══════════════════════════ */}
//       <section className="cp-banner" style={{ marginTop: "103px" }}>
//         <div className="cp-banner-bg" />
//         <div className="cp-banner-ov1" />
//         {/* <div className="cp-banner-ov2" /> */}

//         <div className="cp-motif">
//           <div className="cp-motif-line" />
//           <span className="cp-motif-sym">ॐ</span>
//           <div className="cp-motif-line r" />
//         </div>

//         <motion.div
//           className="cp-banner-content"
//           initial={{ opacity: 0, y: 28 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
//         >
//           <div className="cp-eyebrow">
//             <span className="cp-eyebrow-dot" />
//             Adiyogi Foundation — Reach Out
//           </div>
//           <h1 className="cp-banner-title">
//             Connect With<br />Our Seva Family
//           </h1>
//           <p className="cp-banner-sub">
//             Whether you wish to donate, volunteer, support temple restoration,
//             or organise a Bhandara — we welcome you with open hands and an open heart.
//           </p>
//         </motion.div>

//         <div className="cp-wave">
//           <svg viewBox="0 0 1440 54" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
//             <path d="M0,18 C360,54 1000,0 1440,26 L1440,54 L0,54 Z" fill="#FAFAF7" />
//           </svg>
//         </div>
//       </section>

//       {/* ══ INFO CARDS ═══════════════════════════════════════ */}
//       <motion.div
//         className="cp-cards"
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, margin: "-60px" }}
//         variants={stagger}
//       >
//         <div className="cp-cards-grid">
//           {contactItems.map(c => {
//             const Icon = c.icon;
//             const Wrap = c.href ? "a" : "div";
//             return (
//               <motion.div key={c.label} variants={fadeUp}>
//                 <Wrap
//                   href={c.href || undefined}
//                   className="cp-info-card"
//                   target={c.href && c.href.startsWith("http") ? "_blank" : undefined}
//                   rel={c.href && c.href.startsWith("http") ? "noreferrer" : undefined}
//                 >
//                   <div className="cp-info-icon" style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.color }}>
//                     <Icon size={18} />
//                   </div>
//                   <span className="cp-info-label">{c.label}</span>
//                   <span className="cp-info-value">{c.value}</span>
//                 </Wrap>
//               </motion.div>
//             );
//           })}
//         </div>
//       </motion.div>

//       {/* ══ TWO-COL MAIN ═════════════════════════════════════ */}
//       <motion.div
//         className="cp-main"
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, margin: "-60px" }}
//         variants={stagger}
//       >
//         {/* ── FORM ── */}
//        {/* ── FORM ── */}
// <motion.div variants={fadeUp}>
//   <div className="cp-form-card">
//     <AnimatePresence mode="wait">
//       {done ? (
//         <motion.div
//           key="done"
//           className="cp-done"
//           initial={{ opacity: 0, scale: 0.94 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
//         >
//           <div className="cp-done-ring">
//             <FiCheckCircle size={32} />
//           </div>
//           <h3 className="cp-done-title">Jai Shri Ram 🙏</h3>
//           <p className="cp-done-body">
//             Your message has reached our seva team. We will connect with you
//             shortly. May your intention blossom into beautiful seva.
//           </p>
//           <p className="cp-done-sub">हर हर महादेव</p>
//           <motion.button
//             className="cp-btn"
//             style={{ marginTop: "20px", maxWidth: "200px" }}
//             onClick={() => setDone(false)}
//             whileHover={{ scale: 1.015, y: -1 }}
//             whileTap={{ scale: 0.98 }}
//           >
//             Send Another Message
//           </motion.button>
//         </motion.div>
//       ) : (
//         <motion.form key="form" onSubmit={handleSubmit} noValidate exit={{ opacity: 0 }}>
//           <div className="cp-form-eyebrow">
//             <FiHeart size={10} />
//             Get in Touch
//           </div>
//           <h2 className="cp-form-title">Send Us a Message</h2>
//           <p className="cp-form-sub">
//             Every message is read with care. We respond within 24 hours.
//           </p>

//           {/* name + phone */}
//           <div className="cp-row">
//             <div className="cp-field">
//               <label className="cp-lbl">Full Name *</label>
//               <input
//                 type="text"
//                 name="name"
//                 required
//                 className="cp-inp"
//                 placeholder="Ramesh Sharma"
//                 value={form.name}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="cp-field">
//               <label className="cp-lbl">Phone</label>
//               <input
//                 type="tel"
//                 name="phone"
//                 className="cp-inp"
//                 placeholder="+91 98765 43210"
//                 value={form.phone}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           {/* email */}
//           <div className="cp-field">
//             <label className="cp-lbl">Email Address *</label>
//             <input
//               type="email"
//               name="email"
//               required
//               className="cp-inp"
//               placeholder="you@example.com"
//               value={form.email}
//               onChange={handleChange}
//             />
//           </div>

//           {/* message */}
//           <div className="cp-field">
//             <label className="cp-lbl">Your Message *</label>
//             <textarea
//               name="message"
//               required
//               className="cp-ta"
//               placeholder="Write your message, query, or how you'd like to help..."
//               value={form.message}
//               onChange={handleChange}
//             />
//           </div>

//           <motion.button
//             type="submit"
//             className="cp-btn"
//             disabled={submitting}
//             whileHover={!submitting ? { scale: 1.015, y: -1 } : {}}
//             whileTap={!submitting ? { scale: 0.98 } : {}}
//           >
//             {submitting ? (
//               <>
//                 <div className="cp-spin" /> Sending with love…
//               </>
//             ) : (
//               <>
//                 <FiSend size={15} /> Send Message
//               </>
//             )}
//           </motion.button>
//         </motion.form>
//       )}
//     </AnimatePresence>
//   </div>
// </motion.div>

//         {/* ── SIDEBAR ── */}
//         <motion.div variants={fadeUp} className="cp-sidebar">

//           {/* contact details */}
//           <div className="cp-sidebar-card">
//             <p className="cp-sidebar-title">Reach Us Directly</p>
//             <div className="cp-contact-list">
//               {contactItems.map(c => {
//                 const Icon = c.icon;
//                 const Wrap = c.href ? "a" : "div";
//                 return (
//                   <Wrap
//                     key={c.label}
//                     href={c.href || undefined}
//                     className="cp-contact-item"
//                     target={c.href && c.href.startsWith("http") ? "_blank" : undefined}
//                     rel={c.href && c.href.startsWith("http") ? "noreferrer" : undefined}
//                   >
//                     <div className="cp-ci-icon" style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.color }}>
//                       <Icon size={17} />
//                     </div>
//                     <div>
//                       <p className="cp-ci-label">{c.label}</p>
//                       <p className="cp-ci-value">{c.value}</p>
//                     </div>
//                   </Wrap>
//                 );
//               })}
//             </div>
//           </div>

//           {/* map */}
//           <div className="cp-sidebar-card" style={{ padding: "20px" }}>
//             <p className="cp-sidebar-title" style={{ marginBottom: "14px" }}>Find Us</p>
//             <div className="cp-map">
//               <div className="cp-map-badge">
//                 <span className="cp-map-dot" />
//                 Pilkhua, UP
//               </div>
//               <iframe
//                 title="Adiyogi Foundation Location"
//                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14000!2d77.65!3d28.71!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf5e0c0000001%3A0x1234567890abcdef!2sPilkhua%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000"
//                 allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
//               />
//             </div>
//           </div>

//           {/* social */}
//           <div className="cp-sidebar-card">
//             <p className="cp-sidebar-title">Follow Our Seva</p>
//             <div className="cp-social-row">
//               {socials.map(({ Icon, href, label }) => (
//                 <a key={label} href={href} aria-label={label} className="cp-social-btn" target="_blank" rel="noreferrer">
//                   <Icon size={17} />
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* spiritual quote */}
//           {/* <div className="cp-quote-box">
//             <p className="cp-quote-text">
//               "Seva is not what we do for others — it is what we do for 
//               the divine that lives within every being."
//             </p>
//             <span className="cp-quote-attr">— Adiyogi Foundation</span>
//           </div> */}

//         </motion.div>
//       </motion.div>
//         <div style={{
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
//       <Footer/>
//     </main>
//   );
// }


import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowRight, FiCheckCircle, FiClock,
  FiMail, FiMapPin, FiPhone, FiSend, FiHeart,
} from "react-icons/fi";
import {
  FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp,FaLinkedinIn,
} from "react-icons/fa";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";

const API_BASE_URL = "http://localhost:8000";

/* ── data ───────────────────────────────────────────────── */
const contactItems = [
  { label: "Address",       value: "Adiyogi Foundation, Pilkhua, Hapur, Uttar Pradesh — 245304", href: "https://maps.google.com", icon: FiMapPin, color: "#D81B4A", bg: "rgba(216,27,74,0.06)", border: "rgba(216,27,74,0.12)" },
  { label: "Phone",         value: "+91 9175033022",                                             href: "tel:+919175033022",                    icon: FiPhone,  color: "#8AAE3B", bg: "rgba(138,174,59,0.06)", border: "rgba(138,174,59,0.12)" },
  { label: "Email",         value: "info@adiyogifoundation.org",                                  href: "mailto:info@adiyogifoundation.org",     icon: FiMail,   color: "#E8B21C", bg: "rgba(232,178,28,0.06)", border: "rgba(232,178,28,0.12)" },
  { label: "Seva Hours",    value: "Mon – Sat: 9:00 AM – 7:00 PM  |  Sun: 10:00 AM – 4:00 PM",  href: null,                                   icon: FiClock,  color: "#D81B4A", bg: "rgba(216,27,74,0.06)", border: "rgba(216,27,74,0.12)" },
];

const socials = [
  { Icon: FaInstagram, href: "https://www.instagram.com/adiyogifoundation?igsh=MXVuODhrbTQyZTdvYg", label: "Instagram", color: "#D81B4A" },
  { Icon: FaFacebookF, href: "https://www.facebook.com/share/19wQKAWb1b/", label: "Facebook",  color: "#8AAE3B" },
  { Icon: FaYoutube,   href: "https://www.youtube.com/channel/UCL8UZJkhwQ0o3YJKB8od1nA", label: "YouTube",   color: "#D81B4A" },
  { Icon: FaWhatsapp,  href: "https://wa.me/919175033022", label: "WhatsApp",  color: "#8AAE3B" },
  { Icon: FaLinkedinIn, href: "https://www.linkedin.com/company/adiyogi-foundation", label: "LinkedIn",  color: "#D81B4A" },
];

const initialForm = { name: "", email: "", phone: "", message: "" };

const fadeUp   = { hidden: { opacity: 0, y: 26 }, visible: { opacity: 1, y: 0, transition: { duration: 0.60, ease: [0.22, 1, 0.36, 1] } } };
const stagger  = { hidden: {}, visible: { transition: { staggerChildren: 0.09 } } };

export default function ContactPage() {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      navigate("/admin/dashboard");
    }
  }, [userData, navigate]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitting, setSubmit] = useState(false);
  const [done, setDone] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit(true);

    try {
      const result = await axios.post(
        `${API_BASE_URL}/api/contact/register`,
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
        },
        { withCredentials: true }
      );

      toast.success(result.data.message || "Message sent successfully!");

      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      setDone(true);
    } catch (error) {
      if (error.response) {
        toast.error(
          error.response.data.message || "Something went wrong. Please try again."
        );
      } else if (error.request) {
        toast.error("Network error. Please check your connection and try again.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setSubmit(false);
    }
  };

  return (
    <main className="cp-root">
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
        *, *::before, *::after { box-sizing: border-box; margin: 0; }

        .cp-root {
          min-height: 100vh;
          background: var(--warm-bg);
          font-family: var(--body);
          color: var(--navy);
        }

        /* ══ BANNER — LIGHT THEME ════════════════════════ */
        .cp-banner {
          position: relative;
          height: 340px;
          display: flex; align-items: flex-end;
          overflow: hidden;
          margin-top: 80px;
          background: linear-gradient(135deg, #FFF5F0 0%, #F3F0EA 30%, #F0F5E5 100%);
        }
        @media (min-width: 480px) {
          .cp-banner { height: 380px; }
        }
        @media (min-width: 640px) {
          .cp-banner { height: 420px; }
        }
        @media (min-width: 768px) {
          .cp-banner { height: 460px; }
        }
        @media (min-width: 1024px) {
          .cp-banner { margin-top: 103px; }
        }

        .cp-banner-bg {
          position: absolute; inset: 0;
          background: url('https://images.unsplash.com/photo-1545156521-77bd85671d30?auto=format&fit=crop&w=1800&q=85')
            center 30% / cover no-repeat;
          opacity: 0.48;
          transform: scale(1.05);
          transition: transform 9s ease;
          z-index: 0;
        }
        .cp-banner:hover .cp-banner-bg { transform: scale(1.00); }
        
        .cp-banner-ov1 {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(180deg, rgba(250,250,247,0.10) 0%, rgba(250,250,247,0.25) 55%, rgba(250,250,247,0.70) 100%);
        }

        /* OM motif */
        .cp-motif {
          position: absolute; top: 18px; left: 50%; transform: translateX(-50%);
          z-index: 5; display: flex; align-items: center; gap: 8px; opacity: 0.40;
        }
        @media (min-width: 480px) {
          .cp-motif { top: 20px; gap: 10px; }
        }
        @media (min-width: 640px) {
          .cp-motif { top: 24px; gap: 12px; }
        }
        .cp-motif-line { 
          width: 40px; height: 1px; 
          background: linear-gradient(to right, transparent, rgba(30,41,59,0.35)); 
        }
        @media (min-width: 480px) {
          .cp-motif-line { width: 48px; }
        }
        @media (min-width: 640px) {
          .cp-motif-line { width: 56px; }
        }
        .cp-motif-line.r { background: linear-gradient(to left, transparent, rgba(30,41,59,0.35)); }
        .cp-motif-sym { 
          font-size: 16px; color: rgba(216,27,74,0.50); 
        }
        @media (min-width: 480px) {
          .cp-motif-sym { font-size: 18px; }
        }
        @media (min-width: 640px) {
          .cp-motif-sym { font-size: 20px; }
        }

        .cp-banner-content {
          position: relative; z-index: 6;
          width: 100%; max-width: 1280px;
          margin: 0 auto; padding: 0 16px 28px;
        }
        @media (min-width: 480px) {
          .cp-banner-content { padding: 0 20px 32px; }
        }
        @media (min-width: 640px) {
          .cp-banner-content { padding: 0 30px 40px; }
        }
        @media (min-width: 768px) {
          .cp-banner-content { padding: 0 40px 52px; }
        }

        .cp-eyebrow {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 4px 10px; border-radius: 999px;
          background: rgba(216,27,74,0.07);
          border: 1px solid rgba(216,27,74,0.14);
          font-size: 8.5px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--primary); margin-bottom: 12px;
        }
        @media (min-width: 480px) {
          .cp-eyebrow { font-size: 9.5px; padding: 5px 12px; gap: 7px; letter-spacing: 0.15em; margin-bottom: 14px; }
        }
        @media (min-width: 640px) {
          .cp-eyebrow { font-size: 10px; padding: 5px 14px; gap: 8px; letter-spacing: 0.16em; margin-bottom: 16px; }
        }
        .cp-eyebrow-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 8px rgba(232,178,28,0.7);
          animation: gp 2s ease-in-out infinite;
        }
        @media (min-width: 640px) {
          .cp-eyebrow-dot { width: 6px; height: 6px; }
        }
        @keyframes gp { 0%,100%{opacity:1} 50%{opacity:0.28} }

        .cp-banner-title {
          font-family: var(--display);
          font-size: clamp(1.8rem, 6vw, 4rem);
          font-weight: 600; font-style: italic;
          color: var(--navy); line-height: 1.10;
          letter-spacing: -0.02em; margin-bottom: 8px;
        }
        @media (min-width: 480px) {
          .cp-banner-title { margin-bottom: 10px; }
        }
        @media (min-width: 640px) {
          .cp-banner-title { margin-bottom: 12px; }
        }
        .cp-banner-sub {
          font-size: 13px; color: #64748B;
          max-width: 460px; line-height: 1.72;
        }
        @media (min-width: 480px) {
          .cp-banner-sub { font-size: 14px; }
        }
        @media (min-width: 640px) {
          .cp-banner-sub { font-size: 14.5px; }
        }

        /* wave */
        .cp-wave { position: absolute; bottom: -2px; left: 0; right: 0; z-index: 7; line-height: 0; }
        .cp-wave svg { display: block; width: 100%; }

        /* ══ INFO CARDS ══════════════════════════════════ */
        .cp-cards {
          max-width: 1280px; margin: 0 auto;
          padding: 32px 12px 0;
        }
        @media (min-width: 480px) {
          .cp-cards { padding: 36px 16px 0; }
        }
        @media (min-width: 640px) {
          .cp-cards { padding: 42px 24px 0; }
        }
        @media (min-width: 768px) {
          .cp-cards { padding: 52px 40px 0; }
        }

        .cp-cards-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }
        @media (min-width: 520px) {
          .cp-cards-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
        }
        @media (min-width: 1024px) {
          .cp-cards-grid { grid-template-columns: repeat(4, 1fr); }
        }

        .cp-info-card {
          background: #FFFFFF;
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 18px 16px;
          box-shadow: 0 4px 18px rgba(30,41,59,0.04);
          display: flex; flex-direction: column; gap: 9px;
          text-decoration: none; color: inherit;
          transition: transform 0.32s cubic-bezier(0.22,1,0.36,1), box-shadow 0.32s;
        }
        @media (min-width: 480px) {
          .cp-info-card { border-radius: 16px; padding: 20px 18px; gap: 10px; }
        }
        @media (min-width: 640px) {
          .cp-info-card { border-radius: 18px; padding: 22px 20px; gap: 11px; }
        }
        @media (min-width: 1024px) {
          .cp-info-card { border-radius: 20px; }
        }
        .cp-info-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 14px 40px rgba(30,41,59,0.08);
        }
        .cp-info-icon {
          width: 36px; height: 36px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        @media (min-width: 480px) {
          .cp-info-icon { width: 40px; height: 40px; border-radius: 11px; }
        }
        @media (min-width: 640px) {
          .cp-info-icon { width: 42px; height: 42px; border-radius: 12px; }
        }
        .cp-info-label {
          font-size: 9.5px; font-weight: 700;
          letter-spacing: 0.10em; text-transform: uppercase;
          color: #94A3B8;
        }
        @media (min-width: 480px) {
          .cp-info-label { font-size: 10px; letter-spacing: 0.11em; }
        }
        @media (min-width: 640px) {
          .cp-info-label { font-size: 10.5px; letter-spacing: 0.12em; }
        }
        .cp-info-value {
          font-size: 12px; font-weight: 500;
          color: var(--navy); line-height: 1.55;
        }
        @media (min-width: 480px) {
          .cp-info-value { font-size: 12.5px; }
        }
        @media (min-width: 640px) {
          .cp-info-value { font-size: 13px; }
        }

        /* ══ TWO-COL MAIN ════════════════════════════════ */
        .cp-main {
          max-width: 1280px; margin: 0 auto;
          padding: 32px 12px 60px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 28px; align-items: start;
        }
        @media (min-width: 480px) {
          .cp-main { padding: 36px 16px 70px; gap: 32px; }
        }
        @media (min-width: 640px) {
          .cp-main { padding: 42px 24px 90px; gap: 36px; }
        }
        @media (min-width: 1024px) {
          .cp-main { grid-template-columns: 1.08fr 0.92fr; padding: 48px 40px 120px; }
        }

        /* ── FORM CARD ── */
        .cp-form-card {
          background: #FFFFFF;
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 24px 18px;
          box-shadow: 0 16px 56px rgba(30,41,59,0.08);
          position: relative; overflow: hidden;
        }
        @media (min-width: 480px) {
          .cp-form-card { border-radius: 22px; padding: 30px 24px; }
        }
        @media (min-width: 640px) {
          .cp-form-card { border-radius: 24px; padding: 36px 30px; }
        }
        @media (min-width: 768px) {
          .cp-form-card { border-radius: 26px; padding: 40px 36px; }
        }
        /* top gradient bar */
        .cp-form-card::before {
          content: '';
          position: absolute; top: 0; left: 24px; right: 24px; height: 2px;
          border-radius: 0 0 3px 3px;
          background: linear-gradient(90deg, var(--primary), var(--accent), var(--secondary));
        }
        @media (min-width: 480px) {
          .cp-form-card::before { left: 28px; right: 28px; height: 2.5px; border-radius: 0 0 4px 4px; }
        }
        @media (min-width: 640px) {
          .cp-form-card::before { left: 32px; right: 32px; height: 3px; }
        }

        .cp-form-eyebrow {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 3px 10px; border-radius: 999px;
          background: rgba(216,27,74,0.06);
          border: 1px solid rgba(216,27,74,0.12);
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--primary); margin-bottom: 10px;
        }
        @media (min-width: 480px) {
          .cp-form-eyebrow { font-size: 10px; padding: 4px 12px; gap: 6px; letter-spacing: 0.14em; margin-bottom: 14px; }
        }
        .cp-form-title {
          font-family: var(--display);
          font-size: clamp(1.4rem, 3vw, 2.2rem);
          font-weight: 600; font-style: italic;
          color: var(--navy); letter-spacing: -0.02em;
          line-height: 1.20; margin-bottom: 4px;
        }
        @media (min-width: 480px) {
          .cp-form-title { margin-bottom: 6px; }
        }
        .cp-form-sub {
          font-size: 12.5px; color: #64748B; line-height: 1.65; margin-bottom: 20px;
        }
        @media (min-width: 480px) {
          .cp-form-sub { font-size: 13.5px; margin-bottom: 24px; }
        }
        @media (min-width: 640px) {
          .cp-form-sub { margin-bottom: 28px; }
        }

        /* grid fields */
        .cp-row {
          display: grid; grid-template-columns: 1fr;
          gap: 12px; margin-bottom: 12px;
        }
        @media (min-width: 540px) {
          .cp-row { grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
        }
        .cp-field { display: flex; flex-direction: column; gap: 5px; margin-bottom: 12px; }
        @media (min-width: 480px) {
          .cp-field { gap: 6px; margin-bottom: 14px; }
        }
        .cp-lbl {
          font-size: 10px; font-weight: 700;
          color: #475569; letter-spacing: 0.04em; text-transform: uppercase;
        }
        @media (min-width: 480px) {
          .cp-lbl { font-size: 11px; letter-spacing: 0.05em; }
        }
        .cp-inp, .cp-ta {
          padding: 10px 12px; border-radius: 10px;
          border: 1.5px solid #E2E8F0;
          background: var(--warm-bg);
          font-size: 12.5px; color: var(--navy);
          font-family: var(--body); outline: none;
          transition: border-color 0.22s, box-shadow 0.22s, background 0.18s;
          width: 100%;
        }
        @media (min-width: 480px) {
          .cp-inp, .cp-ta { padding: 11px 13px; font-size: 13px; border-radius: 11px; }
        }
        @media (min-width: 640px) {
          .cp-inp, .cp-ta { padding: 12px 14px; font-size: 13.5px; border-radius: 12px; }
        }
        .cp-inp:focus, .cp-ta:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(216,27,74,0.08);
          background: #FFFFFF;
        }
        .cp-inp::placeholder, .cp-ta::placeholder { color: #94A3B8; }
        .cp-ta { resize: vertical; min-height: 100px; }
        @media (min-width: 480px) {
          .cp-ta { min-height: 110px; }
        }
        @media (min-width: 640px) {
          .cp-ta { min-height: 120px; }
        }

        /* reason chips */
        .cp-chips { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 18px; }
        @media (min-width: 480px) {
          .cp-chips { gap: 8px; margin-bottom: 20px; }
        }
        @media (min-width: 640px) {
          .cp-chips { margin-bottom: 22px; }
        }
        .cp-chip {
          display: inline-flex; align-items: center; gap: 4px;
          padding: 6px 10px; border-radius: 999px;
          font-size: 11px; font-weight: 600;
          border: 1.5px solid #E2E8F0;
          background: #F3F5EF; color: #475569;
          cursor: pointer; transition: all 0.20s;
        }
        @media (min-width: 480px) {
          .cp-chip { padding: 7px 12px; font-size: 11.5px; gap: 5px; }
        }
        @media (min-width: 640px) {
          .cp-chip { padding: 7px 13px; font-size: 12px; }
        }
        .cp-chip:hover { border-color: rgba(216,27,74,0.28); color: var(--primary); background: #FCE4E8; }
        .cp-chip.on {
          background: var(--primary); color: #fff;
          border-color: var(--primary);
          box-shadow: 0 4px 14px rgba(216,27,74,0.20);
        }

        /* status bar */
        .cp-status {
          margin-bottom: 14px; padding: 10px 14px;
          border-radius: 10px; font-size: 12px; font-weight: 500;
        }
        @media (min-width: 480px) {
          .cp-status { margin-bottom: 16px; padding: 11px 16px; border-radius: 12px; font-size: 13px; }
        }
        .cp-status.ok  { background: rgba(138,174,59,0.07); color: #5A7A28; border: 1px solid rgba(138,174,59,0.18); }
        .cp-status.err { background: rgba(216,27,74,0.06);  color: var(--primary); border: 1px solid rgba(216,27,74,0.14); }

        /* submit */
        .cp-btn {
          width: 100%; padding: 13px 20px;
          border-radius: 12px; border: none;
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-d) 100%);
          color: #FFFFFF; font-size: 14px; font-weight: 700;
          font-family: var(--body);
          display: flex; align-items: center; justify-content: center; gap: 7px;
          cursor: pointer;
          box-shadow: 0 14px 38px rgba(216,27,74,0.24);
          transition: transform 0.22s, box-shadow 0.22s, opacity 0.20s;
        }
        @media (min-width: 480px) {
          .cp-btn { padding: 14px 22px; font-size: 14.5px; gap: 8px; border-radius: 13px; }
        }
        @media (min-width: 640px) {
          .cp-btn { padding: 15px 24px; font-size: 15px; gap: 9px; border-radius: 14px; }
        }
        .cp-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 20px 50px rgba(216,27,74,0.34);
        }
        .cp-btn:disabled { opacity: 0.60; cursor: not-allowed; }

        /* spinner */
        .cp-spin {
          width: 15px; height: 15px; border-radius: 50%;
          border: 2.5px solid rgba(255,255,255,0.32);
          border-top-color: #fff;
          animation: spin 0.8s linear infinite;
        }
        @media (min-width: 640px) {
          .cp-spin { width: 17px; height: 17px; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* success */
        .cp-done {
          display: flex; flex-direction: column;
          align-items: center; text-align: center;
          padding: 36px 18px; gap: 12px;
        }
        @media (min-width: 480px) {
          .cp-done { padding: 42px 20px; gap: 14px; }
        }
        @media (min-width: 640px) {
          .cp-done { padding: 52px 24px; }
        }
        .cp-done-ring {
          width: 56px; height: 56px; border-radius: 50%;
          background: rgba(138,174,59,0.08);
          border: 2px solid rgba(138,174,59,0.22);
          display: flex; align-items: center; justify-content: center;
          color: var(--secondary);
        }
        @media (min-width: 480px) {
          .cp-done-ring { width: 64px; height: 64px; }
        }
        @media (min-width: 640px) {
          .cp-done-ring { width: 70px; height: 70px; }
        }
        .cp-done-title {
          font-family: var(--display);
          font-size: 1.6rem; font-style: italic; font-weight: 600;
          color: var(--navy);
        }
        @media (min-width: 480px) {
          .cp-done-title { font-size: 1.8rem; }
        }
        @media (min-width: 640px) {
          .cp-done-title { font-size: 2rem; }
        }
        .cp-done-body { 
          font-size: 12.5px; color: #64748B; line-height: 1.70; 
          max-width: 320px; 
        }
        @media (min-width: 480px) {
          .cp-done-body { font-size: 13.5px; }
        }
        .cp-done-sub { 
          font-size: 11px; font-weight: 700; 
          letter-spacing: 0.08em; text-transform: uppercase; 
          color: var(--accent); 
        }
        @media (min-width: 480px) {
          .cp-done-sub { font-size: 12px; letter-spacing: 0.10em; }
        }

        /* ── RIGHT SIDEBAR ── */
        .cp-sidebar { display: flex; flex-direction: column; gap: 18px; }
        @media (min-width: 480px) {
          .cp-sidebar { gap: 20px; }
        }
        @media (min-width: 640px) {
          .cp-sidebar { gap: 22px; }
        }

        .cp-sidebar-card {
          background: #FFFFFF;
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 22px 18px;
          box-shadow: 0 6px 24px rgba(30,41,59,0.05);
        }
        @media (min-width: 480px) {
          .cp-sidebar-card { border-radius: 18px; padding: 24px 20px; }
        }
        @media (min-width: 640px) {
          .cp-sidebar-card { border-radius: 20px; padding: 26px 22px; }
        }
        @media (min-width: 768px) {
          .cp-sidebar-card { border-radius: 22px; padding: 28px 26px; }
        }

        .cp-sidebar-title {
          font-family: var(--display);
          font-size: 1.1rem; font-weight: 600; font-style: italic;
          color: var(--navy); margin-bottom: 16px;
          letter-spacing: -0.01em;
        }
        @media (min-width: 480px) {
          .cp-sidebar-title { font-size: 1.2rem; margin-bottom: 18px; }
        }
        @media (min-width: 640px) {
          .cp-sidebar-title { font-size: 1.3rem; margin-bottom: 20px; }
        }

        /* contact items list */
        .cp-contact-list { display: flex; flex-direction: column; gap: 10px; }
        @media (min-width: 480px) {
          .cp-contact-list { gap: 12px; }
        }
        .cp-contact-item {
          display: flex; align-items: flex-start; gap: 10px;
          text-decoration: none; color: inherit;
          padding: 10px 12px; border-radius: 12px;
          border: 1px solid transparent;
          transition: background 0.22s, border-color 0.22s, transform 0.22s;
        }
        @media (min-width: 480px) {
          .cp-contact-item { padding: 11px 13px; gap: 11px; border-radius: 13px; }
        }
        @media (min-width: 640px) {
          .cp-contact-item { padding: 13px 14px; gap: 13px; border-radius: 14px; }
        }
        .cp-contact-item:hover {
          background: var(--warm-bg);
          border-color: var(--border);
          transform: translateX(3px);
        }
        .cp-ci-icon {
          width: 32px; height: 32px; border-radius: 9px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
        }
        @media (min-width: 480px) {
          .cp-ci-icon { width: 35px; height: 35px; border-radius: 10px; }
        }
        @media (min-width: 640px) {
          .cp-ci-icon { width: 38px; height: 38px; border-radius: 11px; }
        }
        .cp-ci-label { 
          font-size: 9.5px; font-weight: 700; 
          letter-spacing: 0.07em; text-transform: uppercase; 
          color: #94A3B8; margin-bottom: 2px; 
        }
        @media (min-width: 480px) {
          .cp-ci-label { font-size: 10px; letter-spacing: 0.08em; margin-bottom: 3px; }
        }
        @media (min-width: 640px) {
          .cp-ci-label { font-size: 10.5px; }
        }
        .cp-ci-value { 
          font-size: 12px; font-weight: 500; 
          color: var(--navy); line-height: 1.50; 
        }
        @media (min-width: 480px) {
          .cp-ci-value { font-size: 12.5px; }
        }
        @media (min-width: 640px) {
          .cp-ci-value { font-size: 13px; }
        }

        /* map */
        .cp-map {
          border-radius: 12px; overflow: hidden;
          height: 160px; position: relative;
          border: 1px solid var(--border);
        }
        @media (min-width: 480px) {
          .cp-map { height: 180px; border-radius: 14px; }
        }
        @media (min-width: 640px) {
          .cp-map { height: 200px; border-radius: 16px; }
        }
        .cp-map iframe { width: 100%; height: 100%; border: none; display: block; }
        .cp-map-badge {
          position: absolute; top: 8px; left: 8px; z-index: 5;
          display: inline-flex; align-items: center; gap: 5px;
          padding: 4px 10px; border-radius: 999px;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(8px);
          border: 1px solid var(--border);
          font-size: 10.5px; font-weight: 600; color: var(--navy);
          box-shadow: 0 3px 14px rgba(30,41,59,0.08);
        }
        @media (min-width: 480px) {
          .cp-map-badge { top: 10px; left: 10px; padding: 5px 12px; font-size: 11px; gap: 6px; }
        }
        @media (min-width: 640px) {
          .cp-map-badge { font-size: 11.5px; }
        }
        .cp-map-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--primary);
          box-shadow: 0 0 0 3px rgba(216,27,74,0.15);
          animation: gp 2s ease-in-out infinite;
        }
        @media (min-width: 640px) {
          .cp-map-dot { width: 7px; height: 7px; }
        }

        /* social */
        .cp-social-row { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 3px; }
        @media (min-width: 480px) {
          .cp-social-row { gap: 10px; margin-top: 4px; }
        }
        .cp-social-btn {
          width: 36px; height: 36px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          background: #F3F5EF;
          border: 1.5px solid var(--border);
          color: #64748B; text-decoration: none;
          transition: all 0.22s;
        }
        @media (min-width: 480px) {
          .cp-social-btn { width: 40px; height: 40px; border-radius: 11px; }
        }
        @media (min-width: 640px) {
          .cp-social-btn { width: 42px; height: 42px; border-radius: 12px; }
        }
        .cp-social-btn:hover {
          background: var(--primary); border-color: var(--primary);
          color: #FFFFFF; transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(216,27,74,0.20);
        }

        /* quote section */
        .quote-section {
          background: #FFFFFF;
          border-top: 1px solid rgba(30,41,59,0.08);
          border-bottom: 1px solid rgba(30,41,59,0.08);
          padding: 36px 16px;
          margin-top: 16px;
        }
        @media (min-width: 480px) {
          .quote-section { padding: 40px 24px; }
        }
        @media (min-width: 640px) {
          .quote-section { padding: 44px 32px; }
        }
        @media (min-width: 768px) {
          .quote-section { padding: 48px 40px; margin-top: 20px; }
        }
        .quote-inner {
          max-width: 1280px; margin: 0 auto;
          text-align: center;
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

      <Navbar />

      {/* ══ BANNER — LIGHT THEME ══════════════════════════ */}
      <section className="cp-banner">
        <div className="cp-banner-bg" />
        <div className="cp-banner-ov1" />

        <div className="cp-motif">
          <div className="cp-motif-line" />
          <span className="cp-motif-sym">ॐ</span>
          <div className="cp-motif-line r" />
        </div>

        <motion.div
          className="cp-banner-content"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="cp-eyebrow">
            <span className="cp-eyebrow-dot" />
            Adiyogi Foundation — Reach Out
          </div>
          <h1 className="cp-banner-title">
            Connect With<br />Our Seva Family
          </h1>
          <p className="cp-banner-sub">
            Whether you wish to donate, volunteer, support temple restoration,
            or organise a Bhandara — we welcome you with open hands and an open heart.
          </p>
        </motion.div>

        <div className="cp-wave">
          <svg viewBox="0 0 1440 54" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,18 C360,54 1000,0 1440,26 L1440,54 L0,54 Z" fill="#FAFAF7" />
          </svg>
        </div>
      </section>

      {/* ══ INFO CARDS ═══════════════════════════════════════ */}
      <motion.div
        className="cp-cards"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}
      >
        <div className="cp-cards-grid">
          {contactItems.map(c => {
            const Icon = c.icon;
            const Wrap = c.href ? "a" : "div";
            return (
              <motion.div key={c.label} variants={fadeUp}>
                <Wrap
                  href={c.href || undefined}
                  className="cp-info-card"
                  target={c.href && c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href && c.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  <div className="cp-info-icon" style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.color }}>
                    <Icon size={16} className="sm:w-[17px] sm:h-[17px] lg:w-[18px] lg:h-[18px]" />
                  </div>
                  <span className="cp-info-label">{c.label}</span>
                  <span className="cp-info-value">{c.value}</span>
                </Wrap>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* ══ TWO-COL MAIN ═════════════════════════════════════ */}
      <motion.div
        className="cp-main"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}
      >
        {/* ── FORM ── */}
        <motion.div variants={fadeUp}>
          <div className="cp-form-card">
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div
                  key="done"
                  className="cp-done"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="cp-done-ring">
                    <FiCheckCircle size={28} className="sm:w-[30px] sm:h-[30px] lg:w-[32px] lg:h-[32px]" />
                  </div>
                  <h3 className="cp-done-title">Jai Shri Ram 🙏</h3>
                  <p className="cp-done-body">
                    Your message has reached our seva team. We will connect with you
                    shortly. May your intention blossom into beautiful seva.
                  </p>
                  <p className="cp-done-sub">हर हर महादेव</p>
                  <motion.button
                    className="cp-btn"
                    style={{ marginTop: "16px", maxWidth: "200px" }}
                    onClick={() => setDone(false)}
                    whileHover={{ scale: 1.015, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Send Another Message
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} noValidate exit={{ opacity: 0 }}>
                  <div className="cp-form-eyebrow">
                    <FiHeart size={9} className="sm:w-[10px] sm:h-[10px]" />
                    Get in Touch
                  </div>
                  <h2 className="cp-form-title">Send Us a Message</h2>
                  <p className="cp-form-sub">
                    Every message is read with care. We respond within 24 hours.
                  </p>

                  {/* name + phone */}
                  <div className="cp-row">
                    <div className="cp-field">
                      <label className="cp-lbl">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        className="cp-inp"
                        placeholder="Ramesh Sharma"
                        value={form.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="cp-field">
                      <label className="cp-lbl">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        className="cp-inp"
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* email */}
                  <div className="cp-field">
                    <label className="cp-lbl">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="cp-inp"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>

                  {/* message */}
                  <div className="cp-field">
                    <label className="cp-lbl">Your Message *</label>
                    <textarea
                      name="message"
                      required
                      className="cp-ta"
                      placeholder="Write your message, query, or how you'd like to help..."
                      value={form.message}
                      onChange={handleChange}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className="cp-btn"
                    disabled={submitting}
                    whileHover={!submitting ? { scale: 1.015, y: -1 } : {}}
                    whileTap={!submitting ? { scale: 0.98 } : {}}
                  >
                    {submitting ? (
                      <>
                        <div className="cp-spin" /> Sending with love…
                      </>
                    ) : (
                      <>
                        <FiSend size={14} className="sm:w-[15px] sm:h-[15px]" /> Send Message
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ── SIDEBAR ── */}
        <motion.div variants={fadeUp} className="cp-sidebar">

          {/* contact details */}
          <div className="cp-sidebar-card">
            <p className="cp-sidebar-title">Reach Us Directly</p>
            <div className="cp-contact-list">
              {contactItems.map(c => {
                const Icon = c.icon;
                const Wrap = c.href ? "a" : "div";
                return (
                  <Wrap
                    key={c.label}
                    href={c.href || undefined}
                    className="cp-contact-item"
                    target={c.href && c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href && c.href.startsWith("http") ? "noreferrer" : undefined}
                  >
                    <div className="cp-ci-icon" style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.color }}>
                      <Icon size={15} className="sm:w-[16px] sm:h-[16px] lg:w-[17px] lg:h-[17px]" />
                    </div>
                    <div>
                      <p className="cp-ci-label">{c.label}</p>
                      <p className="cp-ci-value">{c.value}</p>
                    </div>
                  </Wrap>
                );
              })}
            </div>
          </div>

          {/* map */}
          <div className="cp-sidebar-card" style={{ padding: "16px" }}>
            <p className="cp-sidebar-title" style={{ marginBottom: "12px" }}>Find Us</p>
            <div className="cp-map">
              <div className="cp-map-badge">
                <span className="cp-map-dot" />
                Pilkhua, UP
              </div>
              <iframe
                title="Adiyogi Foundation Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14000!2d77.65!3d28.71!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf5e0c0000001%3A0x1234567890abcdef!2sPilkhua%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000"
                allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* social */}
          <div className="cp-sidebar-card">
            <p className="cp-sidebar-title">Follow Our Seva</p>
            <div className="cp-social-row">
              {socials.map(({ Icon, href, label }) => (
                <a key={label} href={href} aria-label={label} className="cp-social-btn" target="_blank" rel="noreferrer">
                  <Icon size={15} className="sm:w-[16px] sm:h-[16px] lg:w-[17px] lg:h-[17px]" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

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