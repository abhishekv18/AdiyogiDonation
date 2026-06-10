

// import { useState } from "react";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FiCheckCircle, FiClock,
//   FiMail, FiMapPin, FiPhone, FiSend, FiHeart, FiArrowRight,
// } from "react-icons/fi";
// import {
//   FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp, FaLinkedinIn,
// } from "react-icons/fa";
// import Footer from "../components/Footer";
// import Navbar from "../components/Navbar";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import toast from "react-hot-toast";

// const API_BASE_URL = "https://adiyogidonation.onrender.com";

// const contactItems = [
//   { label: "Address",    
//   value: "Adiyogi Foundation, Badlapur, Thane, Maharashtra — 421503",
//   href: "https://www.google.com/maps/search/?api=1&query=Adiyogi+Foundation+Badlapur+Thane+Maharashtra+421503",
//         icon: FiMapPin, color: "#D81B4A", bg: "rgba(216,27,74,0.06)",   border: "rgba(216,27,74,0.12)"  },
//   { label: "Phone",      value: "+91 9175033022",                                              href: "tel:+919175033022",                 icon: FiPhone,  color: "#8AAE3B", bg: "rgba(138,174,59,0.06)", border: "rgba(138,174,59,0.12)" },
//   { label: "Email",      value: "info@adiyogifoundation.org",                                  href: "mailto:info@adiyogifoundation.org", icon: FiMail,   color: "#E8B21C", bg: "rgba(232,178,28,0.06)", border: "rgba(232,178,28,0.12)" },
//   { label: "Seva Hours", value: "Mon – Sat: 9:00 AM – 7:00 PM  |  Sun: 10:00 AM – 4:00 PM",  href: null,                               icon: FiClock,  color: "#D81B4A", bg: "rgba(216,27,74,0.06)",   border: "rgba(216,27,74,0.12)"  },
// ];

// const socials = [
//   { Icon: FaInstagram,  href: "https://www.instagram.com/adiyogifoundation?igsh=MXVuODhrbTQyZTdvYg", label: "Instagram" },
//   { Icon: FaFacebookF,  href: "https://www.facebook.com/share/19wQKAWb1b/",                          label: "Facebook"  },
//   { Icon: FaYoutube,    href: "https://www.youtube.com/channel/UCL8UZJkhwQ0o3YJKB8od1nA",            label: "YouTube"   },
//   { Icon: FaWhatsapp,   href: "https://wa.me/919175033022",                                           label: "WhatsApp"  },
//   { Icon: FaLinkedinIn, href: "https://www.linkedin.com/company/adiyogi-foundation",                  label: "LinkedIn"  },
// ];

// const fadeUp  = { hidden: { opacity: 0, y: 26 }, visible: { opacity: 1, y: 0, transition: { duration: 0.60, ease: [0.22, 1, 0.36, 1] } } };
// const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.09 } } };

// export default function ContactPage() {
//   const { userData } = useSelector((state) => state.user);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (userData) navigate("/admin/dashboard");
//   }, [userData, navigate]);

//   const [form, setForm]       = useState({ name: "", email: "", phone: "", message: "" });
//   const [submitting, setSubmit] = useState(false);
//   const [done, setDone]        = useState(false);

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmit(true);
//     try {
//       const result = await axios.post(`${API_BASE_URL}/api/contact/register`, form, { withCredentials: true });
//       toast.success(result.data.message || "Message sent successfully!");
//       setForm({ name: "", email: "", phone: "", message: "" });
//       setDone(true);
//     } catch (error) {
//       if (error.response)      toast.error(error.response.data.message || "Something went wrong.");
//       else if (error.request)  toast.error("Network error. Please check your connection.");
//       else                     toast.error("An unexpected error occurred.");
//     } finally {
//       setSubmit(false);
//     }
//   };

//   return (
//     <main className="cp-page">
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

//         .cp-page {
//           min-height: 100vh;
//           background: var(--warm-bg);
//           font-family: var(--body);
//           color: var(--navy);
//         }

//         /* ══ BANNER — identical structure to success stories ══ */
//         .cp-banner {
//           position: relative;
//           overflow: hidden;
//           height: 360px;
//           display: flex;
//           align-items: flex-end;
//           background: linear-gradient(135deg, #FFF5F0 0%, #F3F0EA 30%, #F0F5E5 100%);
//         }
//         @media (min-width: 480px)  { .cp-banner { height: 400px; } }
//         @media (min-width: 640px)  { .cp-banner { height: 460px; } }
//         @media (min-width: 768px)  { .cp-banner { height: 500px; } }
//         @media (min-width: 1024px) { .cp-banner { height: 520px; } }

//         .cp-banner-bg {
//           position: absolute; inset: 0;
//           background-image: url('https://images.unsplash.com/photo-1545156521-77bd85671d30?auto=format&fit=crop&w=1800&q=85');
//           background-size: cover; background-position: center 30%;
//           opacity: 0.47;
//           transform: scale(1.04);
//           transition: transform 8s ease;
//           z-index: 0;
//         }
//         .cp-banner:hover .cp-banner-bg { transform: scale(1.00); }

//         .cp-banner-ov1 {
//           position: absolute; inset: 0; z-index: 1;
//           background: linear-gradient(to bottom, rgba(250,250,247,0.15) 0%, rgba(250,250,247,0.35) 50%, rgba(250,250,247,0.80) 100%);
//         }
//         .cp-banner-ov2 {
//           position: absolute; inset: 0; z-index: 2;
//           background: linear-gradient(to right, rgba(216,27,74,0.04) 0%, transparent 60%);
//         }

//         /* OM motif */
//         .cp-banner-motif {
//           position: absolute; top: 20px; left: 50%;
//           transform: translateX(-50%);
//           z-index: 5;
//           display: flex; align-items: center; gap: 8px;
//           opacity: 0.45;
//         }
//         @media (min-width: 480px) { .cp-banner-motif { top: 24px; gap: 10px; } }
//         @media (min-width: 640px) { .cp-banner-motif { top: 28px; gap: 12px; } }

//         .cp-motif-line {
//           width: 40px; height: 1px;
//           background: linear-gradient(to right, transparent, rgba(30,41,59,0.40));
//         }
//         @media (min-width: 480px) { .cp-motif-line { width: 50px; } }
//         @media (min-width: 640px) { .cp-motif-line { width: 60px; } }
//         .cp-motif-line.r { background: linear-gradient(to left, transparent, rgba(30,41,59,0.40)); }
//         .cp-motif-symbol {
//           font-size: 18px; color: rgba(216,27,74,0.55);
//           letter-spacing: 0.1em;
//         }
//         @media (min-width: 480px) { .cp-motif-symbol { font-size: 20px; } }
//         @media (min-width: 640px) { .cp-motif-symbol { font-size: 22px; } }

//         /* banner content */
//         .cp-banner-content {
//           position: relative; z-index: 6;
//           width: 100%; max-width: 1280px;
//           margin: 0 auto; padding: 0 16px 28px;
//         }
//         @media (min-width: 480px)  { .cp-banner-content { padding: 0 20px 32px; } }
//         @media (min-width: 640px)  { .cp-banner-content { padding: 0 30px 40px; } }
//         @media (min-width: 1024px) { .cp-banner-content { padding: 0 40px 52px; } }

//         .cp-banner-eyebrow {
//           display: inline-flex; align-items: center; gap: 6px;
//           padding: 4px 10px; border-radius: 999px;
//           background: rgba(216,27,74,0.07);
//           border: 1px solid rgba(216,27,74,0.14);
//           font-size: 9px; font-weight: 600;
//           letter-spacing: 0.14em; text-transform: uppercase;
//           color: var(--primary); margin-bottom: 14px;
//         }
//         @media (min-width: 480px) { .cp-banner-eyebrow { font-size: 10px; padding: 5px 12px; gap: 7px; margin-bottom: 16px; } }
//         @media (min-width: 640px) { .cp-banner-eyebrow { font-size: 10.5px; padding: 5px 14px; gap: 8px; margin-bottom: 18px; } }

//         .cp-eyebrow-dot {
//           width: 5px; height: 5px; border-radius: 50%;
//           background: var(--accent);
//           box-shadow: 0 0 8px rgba(232,178,28,0.7);
//           animation: glowpulse 2s ease-in-out infinite;
//         }
//         @media (min-width: 640px) { .cp-eyebrow-dot { width: 6px; height: 6px; } }
//         @keyframes glowpulse { 0%,100%{opacity:1} 50%{opacity:0.3} }

//         .cp-banner-title {
//           font-family: var(--display);
//           font-size: clamp(1.8rem, 6vw, 4.4rem);
//           font-weight: 600; font-style: italic;
//           color: var(--navy); line-height: 1.10;
//           letter-spacing: -0.02em; margin: 0 0 12px;
//           max-width: 680px;
//         }
//         @media (min-width: 480px) { .cp-banner-title { margin-bottom: 14px; } }
//         @media (min-width: 640px) { .cp-banner-title { margin-bottom: 16px; } }

//         .cp-banner-sub {
//           font-size: 13px; font-weight: 400;
//           color: #64748B; max-width: 520px; line-height: 1.70;
//           margin: 0 0 20px;
//         }
//         @media (min-width: 480px) { .cp-banner-sub { font-size: 14px; margin-bottom: 24px; } }
//         @media (min-width: 640px) { .cp-banner-sub { font-size: 15px; margin-bottom: 28px; } }

//         .cp-banner-line {
//           width: 48px; height: 2px; border-radius: 2px;
//           background: linear-gradient(90deg, var(--primary), var(--accent));
//           margin-bottom: 20px;
//         }
//         @media (min-width: 480px) { .cp-banner-line { width: 56px; height: 2.5px; margin-bottom: 24px; } }
//         @media (min-width: 640px) { .cp-banner-line { width: 64px; height: 3px; margin-bottom: 28px; } }

//         /* wave */
//         .cp-banner-wave { position: absolute; bottom: -2px; left: 0; right: 0; z-index: 7; line-height: 0; }
//         .cp-banner-wave svg { display: block; width: 100%; }

//         /* ══ INFO CARDS ══ */
//         .cp-cards {
//           max-width: 1280px; margin: 0 auto;
//           padding: 32px 12px 0;
//         }
//         @media (min-width: 480px)  { .cp-cards { padding: 36px 16px 0; } }
//         @media (min-width: 640px)  { .cp-cards { padding: 42px 24px 0; } }
//         @media (min-width: 768px)  { .cp-cards { padding: 52px 40px 0; } }

//         .cp-cards-grid {
//           display: grid; grid-template-columns: 1fr; gap: 12px;
//         }
//         @media (min-width: 520px)  { .cp-cards-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; } }
//         @media (min-width: 1024px) { .cp-cards-grid { grid-template-columns: repeat(4, 1fr); } }

//         .cp-info-card {
//           background: #FFFFFF; border: 1px solid var(--border);
//           border-radius: 14px; padding: 18px 16px;
//           box-shadow: 0 4px 18px rgba(30,41,59,0.04);
//           display: flex; flex-direction: column; gap: 9px;
//           text-decoration: none; color: inherit;
//           transition: transform 0.32s cubic-bezier(0.22,1,0.36,1), box-shadow 0.32s;
//         }
//         @media (min-width: 480px)  { .cp-info-card { border-radius: 16px; padding: 20px 18px; gap: 10px; } }
//         @media (min-width: 640px)  { .cp-info-card { border-radius: 18px; padding: 22px 20px; gap: 11px; } }
//         @media (min-width: 1024px) { .cp-info-card { border-radius: 20px; } }
//         .cp-info-card:hover { transform: translateY(-4px); box-shadow: 0 14px 40px rgba(30,41,59,0.08); }

//         .cp-info-icon {
//           width: 36px; height: 36px; border-radius: 10px;
//           display: flex; align-items: center; justify-content: center; flex-shrink: 0;
//         }
//         @media (min-width: 480px) { .cp-info-icon { width: 40px; height: 40px; border-radius: 11px; } }
//         @media (min-width: 640px) { .cp-info-icon { width: 42px; height: 42px; border-radius: 12px; } }

//         .cp-info-label { font-size: 9.5px; font-weight: 700; letter-spacing: 0.10em; text-transform: uppercase; color: #94A3B8; }
//         @media (min-width: 480px) { .cp-info-label { font-size: 10px; } }
//         @media (min-width: 640px) { .cp-info-label { font-size: 10.5px; } }

//         .cp-info-value { font-size: 12px; font-weight: 500; color: var(--navy); line-height: 1.55; }
//         @media (min-width: 480px) { .cp-info-value { font-size: 12.5px; } }
//         @media (min-width: 640px) { .cp-info-value { font-size: 13px; } }

//         /* ══ TWO-COL MAIN ══ */
//         .cp-main {
//           max-width: 1280px; margin: 0 auto;
//           padding: 32px 12px 60px;
//           display: grid; grid-template-columns: 1fr;
//           gap: 28px; align-items: start;
//         }
//         @media (min-width: 480px)  { .cp-main { padding: 36px 16px 70px; gap: 32px; } }
//         @media (min-width: 640px)  { .cp-main { padding: 42px 24px 90px; gap: 36px; } }
//         @media (min-width: 1024px) { .cp-main { grid-template-columns: 1.08fr 0.92fr; padding: 48px 40px 120px; } }

//         /* form card */
//         .cp-form-card {
//           background: #FFFFFF; border: 1px solid var(--border);
//           border-radius: 20px; padding: 24px 18px;
//           box-shadow: 0 16px 56px rgba(30,41,59,0.08);
//           position: relative; overflow: hidden;
//         }
//         @media (min-width: 480px) { .cp-form-card { border-radius: 22px; padding: 30px 24px; } }
//         @media (min-width: 640px) { .cp-form-card { border-radius: 24px; padding: 36px 30px; } }
//         @media (min-width: 768px) { .cp-form-card { border-radius: 26px; padding: 40px 36px; } }
//         .cp-form-card::before {
//           content: ''; position: absolute; top: 0; left: 24px; right: 24px; height: 2px;
//           border-radius: 0 0 3px 3px;
//           background: linear-gradient(90deg, var(--primary), var(--accent), var(--secondary));
//         }
//         @media (min-width: 480px) { .cp-form-card::before { left: 28px; right: 28px; height: 2.5px; } }
//         @media (min-width: 640px) { .cp-form-card::before { left: 32px; right: 32px; height: 3px; } }

//         .cp-form-eyebrow {
//           display: inline-flex; align-items: center; gap: 5px;
//           padding: 3px 10px; border-radius: 999px;
//           background: rgba(216,27,74,0.06); border: 1px solid rgba(216,27,74,0.12);
//           font-size: 9px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
//           color: var(--primary); margin-bottom: 10px;
//         }
//         @media (min-width: 480px) { .cp-form-eyebrow { font-size: 10px; padding: 4px 12px; margin-bottom: 14px; } }

//         .cp-form-title {
//           font-family: var(--display);
//           font-size: clamp(1.4rem, 3vw, 2.2rem);
//           font-weight: 600; font-style: italic;
//           color: var(--navy); letter-spacing: -0.02em;
//           line-height: 1.20; margin-bottom: 4px;
//         }
//         @media (min-width: 480px) { .cp-form-title { margin-bottom: 6px; } }

//         .cp-form-sub { font-size: 12.5px; color: #64748B; line-height: 1.65; margin-bottom: 20px; }
//         @media (min-width: 480px) { .cp-form-sub { font-size: 13.5px; margin-bottom: 24px; } }
//         @media (min-width: 640px) { .cp-form-sub { margin-bottom: 28px; } }

//         .cp-row { display: grid; grid-template-columns: 1fr; gap: 12px; margin-bottom: 12px; }
//         @media (min-width: 540px) { .cp-row { grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; } }

//         .cp-field { display: flex; flex-direction: column; gap: 5px; margin-bottom: 12px; }
//         @media (min-width: 480px) { .cp-field { gap: 6px; margin-bottom: 14px; } }

//         .cp-lbl { font-size: 10px; font-weight: 700; color: #475569; letter-spacing: 0.04em; text-transform: uppercase; }
//         @media (min-width: 480px) { .cp-lbl { font-size: 11px; } }

//         .cp-inp, .cp-ta {
//           padding: 10px 12px; border-radius: 10px;
//           border: 1.5px solid #E2E8F0; background: var(--warm-bg);
//           font-size: 12.5px; color: var(--navy); font-family: var(--body);
//           outline: none; width: 100%;
//           transition: border-color 0.22s, box-shadow 0.22s, background 0.18s;
//         }
//         @media (min-width: 480px) { .cp-inp, .cp-ta { padding: 11px 13px; font-size: 13px; border-radius: 11px; } }
//         @media (min-width: 640px) { .cp-inp, .cp-ta { padding: 12px 14px; font-size: 13.5px; border-radius: 12px; } }
//         .cp-inp:focus, .cp-ta:focus { border-color: var(--primary); box-shadow: 0 0 0 3px rgba(216,27,74,0.08); background: #FFFFFF; }
//         .cp-inp::placeholder, .cp-ta::placeholder { color: #94A3B8; }
//         .cp-ta { resize: vertical; min-height: 100px; }
//         @media (min-width: 480px) { .cp-ta { min-height: 110px; } }
//         @media (min-width: 640px) { .cp-ta { min-height: 120px; } }

//         .cp-btn {
//           width: 100%; padding: 13px 20px; border-radius: 12px; border: none;
//           background: linear-gradient(135deg, var(--primary) 0%, var(--primary-d) 100%);
//           color: #FFFFFF; font-size: 14px; font-weight: 700; font-family: var(--body);
//           display: flex; align-items: center; justify-content: center; gap: 7px;
//           cursor: pointer;
//           box-shadow: 0 14px 38px rgba(216,27,74,0.24);
//           transition: transform 0.22s, box-shadow 0.22s, opacity 0.20s;
//         }
//         @media (min-width: 480px) { .cp-btn { padding: 14px 22px; font-size: 14.5px; border-radius: 13px; } }
//         @media (min-width: 640px) { .cp-btn { padding: 15px 24px; font-size: 15px; border-radius: 14px; } }
//         .cp-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 20px 50px rgba(216,27,74,0.34); }
//         .cp-btn:disabled { opacity: 0.60; cursor: not-allowed; }

//         .cp-spin {
//           width: 15px; height: 15px; border-radius: 50%;
//           border: 2.5px solid rgba(255,255,255,0.32); border-top-color: #fff;
//           animation: spin 0.8s linear infinite;
//         }
//         @keyframes spin { to { transform: rotate(360deg); } }

//         /* success state */
//         .cp-done { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 36px 18px; gap: 12px; }
//         @media (min-width: 480px) { .cp-done { padding: 42px 20px; gap: 14px; } }
//         @media (min-width: 640px) { .cp-done { padding: 52px 24px; } }
//         .cp-done-ring {
//           width: 56px; height: 56px; border-radius: 50%;
//           background: rgba(138,174,59,0.08); border: 2px solid rgba(138,174,59,0.22);
//           display: flex; align-items: center; justify-content: center; color: var(--secondary);
//         }
//         @media (min-width: 480px) { .cp-done-ring { width: 64px; height: 64px; } }
//         @media (min-width: 640px) { .cp-done-ring { width: 70px; height: 70px; } }
//         .cp-done-title { font-family: var(--display); font-size: 1.6rem; font-style: italic; font-weight: 600; color: var(--navy); }
//         @media (min-width: 480px) { .cp-done-title { font-size: 1.8rem; } }
//         @media (min-width: 640px) { .cp-done-title { font-size: 2rem; } }
//         .cp-done-body { font-size: 12.5px; color: #64748B; line-height: 1.70; max-width: 320px; }
//         @media (min-width: 480px) { .cp-done-body { font-size: 13.5px; } }
//         .cp-done-sub { font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--accent); }

//         /* sidebar */
//         .cp-sidebar { display: flex; flex-direction: column; gap: 18px; }
//         @media (min-width: 480px) { .cp-sidebar { gap: 20px; } }
//         @media (min-width: 640px) { .cp-sidebar { gap: 22px; } }

//         .cp-sidebar-card {
//           background: #FFFFFF; border: 1px solid var(--border);
//           border-radius: 16px; padding: 22px 18px;
//           box-shadow: 0 6px 24px rgba(30,41,59,0.05);
//         }
//         @media (min-width: 480px) { .cp-sidebar-card { border-radius: 18px; padding: 24px 20px; } }
//         @media (min-width: 640px) { .cp-sidebar-card { border-radius: 20px; padding: 26px 22px; } }
//         @media (min-width: 768px) { .cp-sidebar-card { border-radius: 22px; padding: 28px 26px; } }

//         .cp-sidebar-title {
//           font-family: var(--display); font-size: 1.1rem; font-weight: 600; font-style: italic;
//           color: var(--navy); margin-bottom: 16px; letter-spacing: -0.01em;
//         }
//         @media (min-width: 480px) { .cp-sidebar-title { font-size: 1.2rem; margin-bottom: 18px; } }
//         @media (min-width: 640px) { .cp-sidebar-title { font-size: 1.3rem; margin-bottom: 20px; } }

//         .cp-contact-list { display: flex; flex-direction: column; gap: 10px; }
//         @media (min-width: 480px) { .cp-contact-list { gap: 12px; } }

//         .cp-contact-item {
//           display: flex; align-items: flex-start; gap: 10px;
//           text-decoration: none; color: inherit;
//           padding: 10px 12px; border-radius: 12px; border: 1px solid transparent;
//           transition: background 0.22s, border-color 0.22s, transform 0.22s;
//         }
//         @media (min-width: 480px) { .cp-contact-item { padding: 11px 13px; gap: 11px; border-radius: 13px; } }
//         @media (min-width: 640px) { .cp-contact-item { padding: 13px 14px; gap: 13px; border-radius: 14px; } }
//         .cp-contact-item:hover { background: var(--warm-bg); border-color: var(--border); transform: translateX(3px); }

//         .cp-ci-icon { width: 32px; height: 32px; border-radius: 9px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
//         @media (min-width: 480px) { .cp-ci-icon { width: 35px; height: 35px; border-radius: 10px; } }
//         @media (min-width: 640px) { .cp-ci-icon { width: 38px; height: 38px; border-radius: 11px; } }

//         .cp-ci-label { font-size: 9.5px; font-weight: 700; letter-spacing: 0.07em; text-transform: uppercase; color: #94A3B8; margin-bottom: 2px; }
//         @media (min-width: 480px) { .cp-ci-label { font-size: 10px; margin-bottom: 3px; } }
//         @media (min-width: 640px) { .cp-ci-label { font-size: 10.5px; } }

//         .cp-ci-value { font-size: 12px; font-weight: 500; color: var(--navy); line-height: 1.50; }
//         @media (min-width: 480px) { .cp-ci-value { font-size: 12.5px; } }
//         @media (min-width: 640px) { .cp-ci-value { font-size: 13px; } }

//         /* map */
//         .cp-map { border-radius: 12px; overflow: hidden; height: 160px; position: relative; border: 1px solid var(--border); }
//         @media (min-width: 480px) { .cp-map { height: 180px; border-radius: 14px; } }
//         @media (min-width: 640px) { .cp-map { height: 200px; border-radius: 16px; } }
//         .cp-map iframe { width: 100%; height: 100%; border: none; display: block; }
//         .cp-map-badge {
//           position: absolute; top: 8px; left: 8px; z-index: 5;
//           display: inline-flex; align-items: center; gap: 5px;
//           padding: 4px 10px; border-radius: 999px;
//           background: rgba(255,255,255,0.95); backdrop-filter: blur(8px);
//           border: 1px solid var(--border); font-size: 10.5px; font-weight: 600; color: var(--navy);
//           box-shadow: 0 3px 14px rgba(30,41,59,0.08);
//         }
//         @media (min-width: 480px) { .cp-map-badge { top: 10px; left: 10px; padding: 5px 12px; font-size: 11px; } }
//         .cp-map-dot {
//           width: 6px; height: 6px; border-radius: 50%; background: var(--primary);
//           box-shadow: 0 0 0 3px rgba(216,27,74,0.15);
//           animation: glowpulse 2s ease-in-out infinite;
//         }

//         /* social */
//         .cp-social-row { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 3px; }
//         @media (min-width: 480px) { .cp-social-row { gap: 10px; margin-top: 4px; } }
//         .cp-social-btn {
//           width: 36px; height: 36px; border-radius: 10px;
//           display: flex; align-items: center; justify-content: center;
//           background: #F3F5EF; border: 1.5px solid var(--border);
//           color: #64748B; text-decoration: none; transition: all 0.22s;
//         }
//         @media (min-width: 480px) { .cp-social-btn { width: 40px; height: 40px; border-radius: 11px; } }
//         @media (min-width: 640px) { .cp-social-btn { width: 42px; height: 42px; border-radius: 12px; } }
//         .cp-social-btn:hover { background: var(--primary); border-color: var(--primary); color: #FFFFFF; transform: translateY(-2px); box-shadow: 0 6px 18px rgba(216,27,74,0.20); }

//         /* quote section */
//         .quote-section {
//           background: #FFFFFF;
//           border-top: 1px solid rgba(30,41,59,0.08);
//           border-bottom: 1px solid rgba(30,41,59,0.08);
//           padding: 36px 16px; margin-top: 16px;
//         }
//         @media (min-width: 480px) { .quote-section { padding: 40px 24px; } }
//         @media (min-width: 640px) { .quote-section { padding: 44px 32px; } }
//         @media (min-width: 768px) { .quote-section { padding: 48px 40px; margin-top: 20px; } }
//         .quote-inner { max-width: 1280px; margin: 0 auto; text-align: center; }
//         .quote-text {
//           font-family: var(--display); font-size: clamp(1rem, 2.5vw, 1.3rem);
//           font-style: italic; color: #64748B; margin-bottom: 6px; line-height: 1.6;
//         }
//           .cp-form-note {
//   display: flex;
//   align-items: flex-start;
//   gap: 10px;
//   margin: 18px 0 24px;
//   padding: 12px 14px;
//   border-radius: 12px;
//   background: rgba(216, 27, 74, 0.06);
//   border: 1px solid rgba(216, 27, 74, 0.12);
//   color: #64748b;
//   font-size: 14px;
//   line-height: 1.6;
// }

// .cp-form-note svg {
//   color: #D81B4A;
//   flex-shrink: 0;
//   margin-top: 3px;
// }
//         @media (min-width: 480px) { .quote-text { margin-bottom: 8px; } }
//         .quote-attribution { font-size: clamp(10px, 1.5vw, 12px); font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #E8B21C; }
//       `}</style>

//       <Navbar />

//       {/* ══ BANNER — same structure as success stories ══ */}
//       <section className="cp-banner" style={{ marginTop: "clamp(80px, 10vw, 101px)" }}>
//         <div className="cp-banner-bg" />
//         <div className="cp-banner-ov1" />
//         <div className="cp-banner-ov2" />

//         {/* OM motif */}
//         <div className="cp-banner-motif">
//           <div className="cp-motif-line" />
//           <span className="cp-motif-symbol">ॐ</span>
//           <div className="cp-motif-line r" />
//         </div>

//         <div className="cp-banner-content">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
//           >
//             <div className="cp-banner-eyebrow">
//               <span className="cp-eyebrow-dot" />
//               Adiyogi Foundation — Reach Out
//             </div>
//             <h1 className="cp-banner-title">
//               Connect With<br />Our Seva Family
//             </h1>
//             <div className="cp-banner-line" />
//             <p className="cp-banner-sub">
//               Whether you wish to donate, volunteer, support temple restoration,
//               or organise a Bhandara — we welcome you with open hands and an open heart.
//             </p>
//           </motion.div>
//         </div>

//         <div className="cp-banner-wave">
//           <svg viewBox="0 0 1440 56" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
//             <path d="M0,22 C240,56 600,0 1440,30 L1440,56 L0,56 Z" fill="#FAFAF7" />
//           </svg>
//         </div>
//       </section>

//       {/* ══ INFO CARDS ══ */}
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
//                     <Icon size={16} />
//                   </div>
//                   <span className="cp-info-label">{c.label}</span>
//                   <span className="cp-info-value">{c.value}</span>
//                 </Wrap>
//               </motion.div>
//             );
//           })}
//         </div>
//       </motion.div>

//       {/* ══ TWO-COL MAIN ══ */}
//       <motion.div
//         className="cp-main"
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, margin: "-60px" }}
//         variants={stagger}
//       >
//         {/* FORM */}
//         <motion.div variants={fadeUp}>
//           <div className="cp-form-card">
//             <AnimatePresence mode="wait">
//               {done ? (
//                 <motion.div
//                   key="done" className="cp-done"
//                   initial={{ opacity: 0, scale: 0.94 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
//                 >
//                   <div className="cp-done-ring">
//                     <FiCheckCircle size={28} />
//                   </div>
//                   <h3 className="cp-done-title">Jai Shri Ram 🙏</h3>
//                   <p className="cp-done-body">
//                     Your message has reached our seva team. We will connect with you
//                     shortly. May your intention blossom into beautiful seva.
//                   </p>
//                   <p className="cp-done-sub">हर हर महादेव</p>
//                   <motion.button
//                     className="cp-btn"
//                     style={{ marginTop: "16px", maxWidth: "200px" }}
//                     onClick={() => setDone(false)}
//                     whileHover={{ scale: 1.015, y: -1 }}
//                     whileTap={{ scale: 0.98 }}
//                   >
//                     Send Another Message
//                   </motion.button>
//                 </motion.div>
//               ) : (
//                 <motion.form key="form" onSubmit={handleSubmit} noValidate exit={{ opacity: 0 }}>
//                   <div className="cp-form-eyebrow">
//                     <FiHeart size={9} />
//                     Get in Touch
//                   </div>
//                   {/* <h2 className="cp-form-title">Send Us a Message</h2>
//                   <p className="cp-form-sub">Every message is read with care. We respond within 24 hours.</p> */}
// <h2 className="cp-form-title">Connect With Adiyogi Foundation</h2>

// <p className="cp-form-sub">
//   Whether you wish to volunteer, support our initiatives, seek assistance,
//   or learn more about our humanitarian and spiritual activities, we would be
//   honored to hear from you. Our team is committed to serving with compassion,
//   transparency, and dedication.
// </p>

// <div className="cp-form-note">
//   <FiHeart size={14} />
//   <span>
//     Together, we can create meaningful change through seva, compassion,
//     and collective responsibility.
//   </span>
// </div>
//                   <div className="cp-row">
//                     <div className="cp-field">
//                       <label className="cp-lbl">Full Name *</label>
//                       <input type="text" name="name" required className="cp-inp" placeholder="Ramesh Sharma" value={form.name} onChange={handleChange} />
//                     </div>
//                     <div className="cp-field">
//                       <label className="cp-lbl">Phone</label>
//                       <input type="tel" name="phone" className="cp-inp" placeholder="+91 98765 43210" value={form.phone} onChange={handleChange} />
//                     </div>
//                   </div>

//                   <div className="cp-field">
//                     <label className="cp-lbl">Email Address *</label>
//                     <input type="email" name="email" required className="cp-inp" placeholder="you@example.com" value={form.email} onChange={handleChange} />
//                   </div>

//                   <div className="cp-field">
//                     <label className="cp-lbl">Your Message *</label>
//                     <textarea name="message" required className="cp-ta" placeholder="Write your message, query, or how you'd like to help..." value={form.message} onChange={handleChange} />
//                   </div>

//                   <motion.button
//                     type="submit" className="cp-btn" disabled={submitting}
//                     whileHover={!submitting ? { scale: 1.015, y: -1 } : {}}
//                     whileTap={!submitting ? { scale: 0.98 } : {}}
//                   >
//                     {submitting ? <><div className="cp-spin" /> Sending with love…</> : <><FiSend size={14} /> Send Message</>}
//                   </motion.button>
//                 </motion.form>
//               )}
//             </AnimatePresence>
//           </div>
//         </motion.div>

//         {/* SIDEBAR */}
//         <motion.div variants={fadeUp} className="cp-sidebar">
//           <div className="cp-sidebar-card">
//             <p className="cp-sidebar-title">Reach Us Directly</p>
//             <div className="cp-contact-list">
//               {contactItems.map(c => {
//                 const Icon = c.icon;
//                 const Wrap = c.href ? "a" : "div";
//                 return (
//                   <Wrap key={c.label} href={c.href || undefined} className="cp-contact-item"
//                     target={c.href && c.href.startsWith("http") ? "_blank" : undefined}
//                     rel={c.href && c.href.startsWith("http") ? "noreferrer" : undefined}
//                   >
//                     <div className="cp-ci-icon" style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.color }}>
//                       <Icon size={15} />
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

//         <div className="cp-sidebar-card" style={{ padding: "16px" }}>
//   <p className="cp-sidebar-title" style={{ marginBottom: "12px" }}>Find Us</p>

//   <div className="cp-map">
//     <div className="cp-map-badge">
//       <span className="cp-map-dot" />
//       Badlapur, Maharashtra
//     </div>

//     <iframe
//       title="Adiyogi Foundation Location"
//       src="https://maps.google.com/maps?q=Badlapur%20Maharashtra%20421503&t=&z=13&ie=UTF8&iwloc=&output=embed"
//       allowFullScreen=""
//       loading="lazy"
//       referrerPolicy="no-referrer-when-downgrade"
//     />
//   </div>
// </div>

//           <div className="cp-sidebar-card">
//             <p className="cp-sidebar-title">Follow Our Seva</p>
//             <div className="cp-social-row">
//               {socials.map(({ Icon, href, label }) => (
//                 <a key={label} href={href} aria-label={label} className="cp-social-btn" target="_blank" rel="noreferrer">
//                   <Icon size={15} />
//                 </a>
//               ))}
//             </div>
//           </div>
//         </motion.div>
//       </motion.div>

//       <div className="quote-section">
//         <div className="quote-inner">
//           <p className="quote-text">"Every act of seva brings us closer to the divine."</p>
//           <p className="quote-attribution">— Adiyogi Foundation</p>
//         </div>
//       </div>

//       <Footer />
//     </main>
//   );
// }



import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCheckCircle, FiClock,
  FiMail, FiMapPin, FiPhone, FiSend, FiHeart, FiArrowRight,
} from "react-icons/fi";
import {
  FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp, FaLinkedinIn,
} from "react-icons/fa";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const API_BASE_URL = "https://adiyogidonation.onrender.com";

const contactItems = [
  { label: "Address",    
    value: "Adiyogi Foundation, Badlapur, Thane, Maharashtra — 421503",
    href: "https://www.google.com/maps/search/?api=1&query=Adiyogi+Foundation+Badlapur+Thane+Maharashtra+421503",
    icon: FiMapPin, color: "#D81B4A", bg: "rgba(216,27,74,0.06)", border: "rgba(216,27,74,0.12)" 
  },
  { label: "Phone",      
    value: "+91 9175033022",                                              
    href: "tel:+919175033022",                 
    icon: FiPhone, color: "#8AAE3B", bg: "rgba(138,174,59,0.06)", border: "rgba(138,174,59,0.12)" 
  },
  { label: "Email",      
    value: "info@adiyogifoundation.org",                                  
    href: "mailto:info@adiyogifoundation.org", 
    icon: FiMail, color: "#E8B21C", bg: "rgba(232,178,28,0.06)", border: "rgba(232,178,28,0.12)" 
  },
  { label: "Seva Hours", 
    value: "Mon – Sat: 9:00 AM – 7:00 PM  |  Sun: 10:00 AM – 4:00 PM",  
    href: null,                               
    icon: FiClock, color: "#D81B4A", bg: "rgba(216,27,74,0.06)", border: "rgba(216,27,74,0.12)" 
  },
];

const socials = [
  { Icon: FaInstagram,  href: "https://www.instagram.com/adiyogifoundation?igsh=MXVuODhrbTQyZTdvYg", label: "Instagram" },
  { Icon: FaFacebookF,  href: "https://www.facebook.com/share/19wQKAWb1b/",                          label: "Facebook"  },
  { Icon: FaYoutube,    href: "https://www.youtube.com/channel/UCL8UZJkhwQ0o3YJKB8od1nA",            label: "YouTube"   },
  { Icon: FaWhatsapp,   href: "https://wa.me/919175033022",                                           label: "WhatsApp"  },
  { Icon: FaLinkedinIn, href: "https://www.linkedin.com/company/adiyogi-foundation",                  label: "LinkedIn"  },
];

const fadeUp  = { hidden: { opacity: 0, y: 26 }, visible: { opacity: 1, y: 0, transition: { duration: 0.60, ease: [0.22, 1, 0.36, 1] } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.09 } } };

export default function ContactPage() {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) navigate("/admin/dashboard");
  }, [userData, navigate]);

  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmit] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState({});
  const [mapLoaded, setMapLoaded] = useState(false);

  // Memoized form handler
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  // Form validation
  const validateForm = useCallback(() => {
    const newErrors = {};
    
    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!form.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (form.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [form]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      return;
    }
    
    setSubmit(true);
    try {
      const result = await axios.post(
        `${API_BASE_URL}/api/contact/register`, 
        form, 
        { 
          withCredentials: true,
          timeout: 15000 // 15 second timeout
        }
      );
      toast.success(result.data.message || "Message sent successfully!");
      setForm({ name: "", email: "", phone: "", message: "" });
      setErrors({});
      setDone(true);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Something went wrong.");
      } else if (error.request) {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setSubmit(false);
    }
  }, [form, validateForm]);

  // Handle map load
  const handleMapLoad = useCallback(() => {
    setTimeout(() => setMapLoaded(true), 1000);
  }, []);

  return (
    <main className="cp-page">
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

        /* ── Skeleton Animations ── */
        @keyframes shimmer {
          0%   { background-position: -800px 0; }
          100% { background-position:  800px 0; }
        }

        .skeleton-shimmer {
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(255,255,255,0.6) 50%, 
            transparent 100%
          );
          background-size: 800px 100%;
          animation: shimmer 1.5s infinite linear;
          position: absolute;
          inset: 0;
        }

        .skeleton-banner {
          height: 360px;
          background: linear-gradient(135deg, #e2e8f0 0%, #f1f5f9 50%, #e2e8f0 100%);
          position: relative;
          overflow: hidden;
        }
        @media (min-width: 480px) { .skeleton-banner { height: 400px; } }
        @media (min-width: 640px) { .skeleton-banner { height: 460px; } }
        @media (min-width: 768px) { .skeleton-banner { height: 500px; } }
        @media (min-width: 1024px) { .skeleton-banner { height: 520px; } }

        .skeleton-card {
          background: #e2e8f0;
          border-radius: 14px;
          padding: 18px 16px;
          min-height: 110px;
          position: relative;
          overflow: hidden;
        }
        @media (min-width: 480px) { .skeleton-card { border-radius: 16px; padding: 20px 18px; } }
        @media (min-width: 640px) { .skeleton-card { border-radius: 18px; padding: 22px 20px; } }

        /* ── Error styles ── */
        .cp-inp.error, .cp-ta.error {
          border-color: #EF4444 !important;
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.08) !important;
        }
        
        .cp-error-text {
          font-size: 10px; 
          color: #EF4444; 
          margin-top: 3px;
          font-weight: 500;
        }
        @media (min-width: 480px) { .cp-error-text { font-size: 11px; } }

        .cp-page {
          min-height: 100vh;
          background: var(--warm-bg);
          font-family: var(--body);
          color: var(--navy);
        }

        /* ══ BANNER ══ */
        .cp-banner {
          position: relative;
          overflow: hidden;
          height: 360px;
          display: flex;
          align-items: flex-end;
          background: linear-gradient(135deg, #FFF5F0 0%, #F3F0EA 30%, #F0F5E5 100%);
        }
        @media (min-width: 480px)  { .cp-banner { height: 400px; } }
        @media (min-width: 640px)  { .cp-banner { height: 460px; } }
        @media (min-width: 768px)  { .cp-banner { height: 500px; } }
        @media (min-width: 1024px) { .cp-banner { height: 520px; } }

        .cp-banner-bg {
          position: absolute; inset: 0;
          background-image: url('https://images.unsplash.com/photo-1545156521-77bd85671d30?auto=format&fit=crop&w=1800&q=85');
          background-size: cover; background-position: center 30%;
          opacity: 0.47;
          transform: scale(1.04);
          transition: transform 8s ease;
          z-index: 0;
        }
        .cp-banner:hover .cp-banner-bg { transform: scale(1.00); }

        .cp-banner-ov1 {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(to bottom, rgba(250,250,247,0.15) 0%, rgba(250,250,247,0.35) 50%, rgba(250,250,247,0.80) 100%);
        }
        .cp-banner-ov2 {
          position: absolute; inset: 0; z-index: 2;
          background: linear-gradient(to right, rgba(216,27,74,0.04) 0%, transparent 60%);
        }

        /* OM motif */
        .cp-banner-motif {
          position: absolute; top: 20px; left: 50%;
          transform: translateX(-50%);
          z-index: 5;
          display: flex; align-items: center; gap: 8px;
          opacity: 0.45;
        }
        @media (min-width: 480px) { .cp-banner-motif { top: 24px; gap: 10px; } }
        @media (min-width: 640px) { .cp-banner-motif { top: 28px; gap: 12px; } }

        .cp-motif-line {
          width: 40px; height: 1px;
          background: linear-gradient(to right, transparent, rgba(30,41,59,0.40));
        }
        @media (min-width: 480px) { .cp-motif-line { width: 50px; } }
        @media (min-width: 640px) { .cp-motif-line { width: 60px; } }
        .cp-motif-line.r { background: linear-gradient(to left, transparent, rgba(30,41,59,0.40)); }
        .cp-motif-symbol {
          font-size: 18px; color: rgba(216,27,74,0.55);
          letter-spacing: 0.1em;
        }
        @media (min-width: 480px) { .cp-motif-symbol { font-size: 20px; } }
        @media (min-width: 640px) { .cp-motif-symbol { font-size: 22px; } }

        /* banner content */
        .cp-banner-content {
          position: relative; z-index: 6;
          width: 100%; max-width: 1280px;
          margin: 0 auto; padding: 0 16px 28px;
        }
        @media (min-width: 480px)  { .cp-banner-content { padding: 0 20px 32px; } }
        @media (min-width: 640px)  { .cp-banner-content { padding: 0 30px 40px; } }
        @media (min-width: 1024px) { .cp-banner-content { padding: 0 40px 52px; } }

        .cp-banner-eyebrow {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 4px 10px; border-radius: 999px;
          background: rgba(216,27,74,0.07);
          border: 1px solid rgba(216,27,74,0.14);
          font-size: 9px; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--primary); margin-bottom: 14px;
        }
        @media (min-width: 480px) { .cp-banner-eyebrow { font-size: 10px; padding: 5px 12px; gap: 7px; margin-bottom: 16px; } }
        @media (min-width: 640px) { .cp-banner-eyebrow { font-size: 10.5px; padding: 5px 14px; gap: 8px; margin-bottom: 18px; } }

        .cp-eyebrow-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 8px rgba(232,178,28,0.7);
          animation: glowpulse 2s ease-in-out infinite;
        }
        @media (min-width: 640px) { .cp-eyebrow-dot { width: 6px; height: 6px; } }
        @keyframes glowpulse { 0%,100%{opacity:1} 50%{opacity:0.3} }

        .cp-banner-title {
          font-family: var(--display);
          font-size: clamp(1.8rem, 6vw, 4.4rem);
          font-weight: 600; font-style: italic;
          color: var(--navy); line-height: 1.10;
          letter-spacing: -0.02em; margin: 0 0 12px;
          max-width: 680px;
        }
        @media (min-width: 480px) { .cp-banner-title { margin-bottom: 14px; } }
        @media (min-width: 640px) { .cp-banner-title { margin-bottom: 16px; } }

        .cp-banner-sub {
          font-size: 13px; font-weight: 400;
          color: #64748B; max-width: 520px; line-height: 1.70;
          margin: 0 0 20px;
        }
        @media (min-width: 480px) { .cp-banner-sub { font-size: 14px; margin-bottom: 24px; } }
        @media (min-width: 640px) { .cp-banner-sub { font-size: 15px; margin-bottom: 28px; } }

        .cp-banner-line {
          width: 48px; height: 2px; border-radius: 2px;
          background: linear-gradient(90deg, var(--primary), var(--accent));
          margin-bottom: 20px;
        }
        @media (min-width: 480px) { .cp-banner-line { width: 56px; height: 2.5px; margin-bottom: 24px; } }
        @media (min-width: 640px) { .cp-banner-line { width: 64px; height: 3px; margin-bottom: 28px; } }

        /* wave */
        .cp-banner-wave { position: absolute; bottom: -2px; left: 0; right: 0; z-index: 7; line-height: 0; }
        .cp-banner-wave svg { display: block; width: 100%; }

        /* ══ INFO CARDS ══ */
        .cp-cards {
          max-width: 1280px; margin: 0 auto;
          padding: 32px 12px 0;
        }
        @media (min-width: 480px)  { .cp-cards { padding: 36px 16px 0; } }
        @media (min-width: 640px)  { .cp-cards { padding: 42px 24px 0; } }
        @media (min-width: 768px)  { .cp-cards { padding: 52px 40px 0; } }

        .cp-cards-grid {
          display: grid; grid-template-columns: 1fr; gap: 12px;
        }
        @media (min-width: 520px)  { .cp-cards-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; } }
        @media (min-width: 1024px) { .cp-cards-grid { grid-template-columns: repeat(4, 1fr); } }

        .cp-info-card {
          background: #FFFFFF; border: 1px solid var(--border);
          border-radius: 14px; padding: 18px 16px;
          box-shadow: 0 4px 18px rgba(30,41,59,0.04);
          display: flex; flex-direction: column; gap: 9px;
          text-decoration: none; color: inherit;
          transition: transform 0.32s cubic-bezier(0.22,1,0.36,1), box-shadow 0.32s;
        }
        @media (min-width: 480px)  { .cp-info-card { border-radius: 16px; padding: 20px 18px; gap: 10px; } }
        @media (min-width: 640px)  { .cp-info-card { border-radius: 18px; padding: 22px 20px; gap: 11px; } }
        @media (min-width: 1024px) { .cp-info-card { border-radius: 20px; } }
        .cp-info-card:hover { transform: translateY(-4px); box-shadow: 0 14px 40px rgba(30,41,59,0.08); }

        .cp-info-icon {
          width: 36px; height: 36px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        @media (min-width: 480px) { .cp-info-icon { width: 40px; height: 40px; border-radius: 11px; } }
        @media (min-width: 640px) { .cp-info-icon { width: 42px; height: 42px; border-radius: 12px; } }

        .cp-info-label { font-size: 9.5px; font-weight: 700; letter-spacing: 0.10em; text-transform: uppercase; color: #94A3B8; }
        @media (min-width: 480px) { .cp-info-label { font-size: 10px; } }
        @media (min-width: 640px) { .cp-info-label { font-size: 10.5px; } }

        .cp-info-value { font-size: 12px; font-weight: 500; color: var(--navy); line-height: 1.55; }
        @media (min-width: 480px) { .cp-info-value { font-size: 12.5px; } }
        @media (min-width: 640px) { .cp-info-value { font-size: 13px; } }

        /* ══ TWO-COL MAIN ══ */
        .cp-main {
          max-width: 1280px; margin: 0 auto;
          padding: 32px 12px 60px;
          display: grid; grid-template-columns: 1fr;
          gap: 28px; align-items: start;
        }
        @media (min-width: 480px)  { .cp-main { padding: 36px 16px 70px; gap: 32px; } }
        @media (min-width: 640px)  { .cp-main { padding: 42px 24px 90px; gap: 36px; } }
        @media (min-width: 1024px) { .cp-main { grid-template-columns: 1.08fr 0.92fr; padding: 48px 40px 120px; } }

        /* form card */
        .cp-form-card {
          background: #FFFFFF; border: 1px solid var(--border);
          border-radius: 20px; padding: 24px 18px;
          box-shadow: 0 16px 56px rgba(30,41,59,0.08);
          position: relative; overflow: hidden;
        }
        @media (min-width: 480px) { .cp-form-card { border-radius: 22px; padding: 30px 24px; } }
        @media (min-width: 640px) { .cp-form-card { border-radius: 24px; padding: 36px 30px; } }
        @media (min-width: 768px) { .cp-form-card { border-radius: 26px; padding: 40px 36px; } }
        .cp-form-card::before {
          content: ''; position: absolute; top: 0; left: 24px; right: 24px; height: 2px;
          border-radius: 0 0 3px 3px;
          background: linear-gradient(90deg, var(--primary), var(--accent), var(--secondary));
        }
        @media (min-width: 480px) { .cp-form-card::before { left: 28px; right: 28px; height: 2.5px; } }
        @media (min-width: 640px) { .cp-form-card::before { left: 32px; right: 32px; height: 3px; } }

        .cp-form-eyebrow {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 3px 10px; border-radius: 999px;
          background: rgba(216,27,74,0.06); border: 1px solid rgba(216,27,74,0.12);
          font-size: 9px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--primary); margin-bottom: 10px;
        }
        @media (min-width: 480px) { .cp-form-eyebrow { font-size: 10px; padding: 4px 12px; margin-bottom: 14px; } }

        .cp-form-title {
          font-family: var(--display);
          font-size: clamp(1.4rem, 3vw, 2.2rem);
          font-weight: 600; font-style: italic;
          color: var(--navy); letter-spacing: -0.02em;
          line-height: 1.20; margin-bottom: 4px;
        }
        @media (min-width: 480px) { .cp-form-title { margin-bottom: 6px; } }

        .cp-form-sub { font-size: 12.5px; color: #64748B; line-height: 1.65; margin-bottom: 16px; }
        @media (min-width: 480px) { .cp-form-sub { font-size: 13.5px; margin-bottom: 20px; } }
        @media (min-width: 640px) { .cp-form-sub { margin-bottom: 24px; } }

        .cp-form-note {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin: 0 0 20px;
          padding: 12px 14px;
          border-radius: 12px;
          background: rgba(216, 27, 74, 0.06);
          border: 1px solid rgba(216, 27, 74, 0.12);
          color: #64748b;
          font-size: 12.5px;
          line-height: 1.6;
          transition: transform 0.3s, border-color 0.3s;
        }
        @media (min-width: 480px) { .cp-form-note { font-size: 13.5px; padding: 14px 16px; margin-bottom: 24px; } }
        .cp-form-note:hover {
          border-color: rgba(216, 27, 74, 0.25);
          transform: translateX(3px);
        }
        .cp-form-note svg {
          color: #D81B4A;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .cp-row { display: grid; grid-template-columns: 1fr; gap: 12px; margin-bottom: 12px; }
        @media (min-width: 540px) { .cp-row { grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; } }

        .cp-field { display: flex; flex-direction: column; gap: 5px; margin-bottom: 12px; }
        @media (min-width: 480px) { .cp-field { gap: 6px; margin-bottom: 14px; } }

        .cp-lbl { font-size: 10px; font-weight: 700; color: #475569; letter-spacing: 0.04em; text-transform: uppercase; }
        @media (min-width: 480px) { .cp-lbl { font-size: 11px; } }

        .cp-inp, .cp-ta {
          padding: 10px 12px; border-radius: 10px;
          border: 1.5px solid #E2E8F0; background: var(--warm-bg);
          font-size: 12.5px; color: var(--navy); font-family: var(--body);
          outline: none; width: 100%;
          transition: border-color 0.22s, box-shadow 0.22s, background 0.18s;
        }
        @media (min-width: 480px) { .cp-inp, .cp-ta { padding: 11px 13px; font-size: 13px; border-radius: 11px; } }
        @media (min-width: 640px) { .cp-inp, .cp-ta { padding: 12px 14px; font-size: 13.5px; border-radius: 12px; } }
        .cp-inp:focus, .cp-ta:focus { border-color: var(--primary); box-shadow: 0 0 0 3px rgba(216,27,74,0.08); background: #FFFFFF; }
        .cp-inp::placeholder, .cp-ta::placeholder { color: #94A3B8; }
        .cp-ta { resize: vertical; min-height: 100px; }
        @media (min-width: 480px) { .cp-ta { min-height: 110px; } }
        @media (min-width: 640px) { .cp-ta { min-height: 120px; } }

        .cp-btn {
          width: 100%; padding: 13px 20px; border-radius: 12px; border: none;
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-d) 100%);
          color: #FFFFFF; font-size: 14px; font-weight: 700; font-family: var(--body);
          display: flex; align-items: center; justify-content: center; gap: 7px;
          cursor: pointer;
          box-shadow: 0 14px 38px rgba(216,27,74,0.24);
          transition: transform 0.22s, box-shadow 0.22s, opacity 0.20s;
        }
        @media (min-width: 480px) { .cp-btn { padding: 14px 22px; font-size: 14.5px; border-radius: 13px; } }
        @media (min-width: 640px) { .cp-btn { padding: 15px 24px; font-size: 15px; border-radius: 14px; } }
        .cp-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 20px 50px rgba(216,27,74,0.34); }
        .cp-btn:disabled { opacity: 0.60; cursor: not-allowed; }

        .cp-spin {
          width: 15px; height: 15px; border-radius: 50%;
          border: 2.5px solid rgba(255,255,255,0.32); border-top-color: #fff;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* success state */
        .cp-done { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 36px 18px; gap: 12px; }
        @media (min-width: 480px) { .cp-done { padding: 42px 20px; gap: 14px; } }
        @media (min-width: 640px) { .cp-done { padding: 52px 24px; } }
        .cp-done-ring {
          width: 56px; height: 56px; border-radius: 50%;
          background: rgba(138,174,59,0.08); border: 2px solid rgba(138,174,59,0.22);
          display: flex; align-items: center; justify-content: center; color: var(--secondary);
        }
        @media (min-width: 480px) { .cp-done-ring { width: 64px; height: 64px; } }
        @media (min-width: 640px) { .cp-done-ring { width: 70px; height: 70px; } }
        .cp-done-title { font-family: var(--display); font-size: 1.6rem; font-style: italic; font-weight: 600; color: var(--navy); }
        @media (min-width: 480px) { .cp-done-title { font-size: 1.8rem; } }
        @media (min-width: 640px) { .cp-done-title { font-size: 2rem; } }
        .cp-done-body { font-size: 12.5px; color: #64748B; line-height: 1.70; max-width: 320px; }
        @media (min-width: 480px) { .cp-done-body { font-size: 13.5px; } }
        .cp-done-sub { font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--accent); }

        /* sidebar */
        .cp-sidebar { display: flex; flex-direction: column; gap: 18px; }
        @media (min-width: 480px) { .cp-sidebar { gap: 20px; } }
        @media (min-width: 640px) { .cp-sidebar { gap: 22px; } }

        .cp-sidebar-card {
          background: #FFFFFF; border: 1px solid var(--border);
          border-radius: 16px; padding: 22px 18px;
          box-shadow: 0 6px 24px rgba(30,41,59,0.05);
        }
        @media (min-width: 480px) { .cp-sidebar-card { border-radius: 18px; padding: 24px 20px; } }
        @media (min-width: 640px) { .cp-sidebar-card { border-radius: 20px; padding: 26px 22px; } }
        @media (min-width: 768px) { .cp-sidebar-card { border-radius: 22px; padding: 28px 26px; } }

        .cp-sidebar-title {
          font-family: var(--display); font-size: 1.1rem; font-weight: 600; font-style: italic;
          color: var(--navy); margin-bottom: 16px; letter-spacing: -0.01em;
        }
        @media (min-width: 480px) { .cp-sidebar-title { font-size: 1.2rem; margin-bottom: 18px; } }
        @media (min-width: 640px) { .cp-sidebar-title { font-size: 1.3rem; margin-bottom: 20px; } }

        .cp-contact-list { display: flex; flex-direction: column; gap: 10px; }
        @media (min-width: 480px) { .cp-contact-list { gap: 12px; } }

        .cp-contact-item {
          display: flex; align-items: flex-start; gap: 10px;
          text-decoration: none; color: inherit;
          padding: 10px 12px; border-radius: 12px; border: 1px solid transparent;
          transition: background 0.22s, border-color 0.22s, transform 0.22s;
        }
        @media (min-width: 480px) { .cp-contact-item { padding: 11px 13px; gap: 11px; border-radius: 13px; } }
        @media (min-width: 640px) { .cp-contact-item { padding: 13px 14px; gap: 13px; border-radius: 14px; } }
        .cp-contact-item:hover { background: var(--warm-bg); border-color: var(--border); transform: translateX(3px); }

        .cp-ci-icon { width: 32px; height: 32px; border-radius: 9px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
        @media (min-width: 480px) { .cp-ci-icon { width: 35px; height: 35px; border-radius: 10px; } }
        @media (min-width: 640px) { .cp-ci-icon { width: 38px; height: 38px; border-radius: 11px; } }

        .cp-ci-label { font-size: 9.5px; font-weight: 700; letter-spacing: 0.07em; text-transform: uppercase; color: #94A3B8; margin-bottom: 2px; }
        @media (min-width: 480px) { .cp-ci-label { font-size: 10px; margin-bottom: 3px; } }
        @media (min-width: 640px) { .cp-ci-label { font-size: 10.5px; } }

        .cp-ci-value { font-size: 12px; font-weight: 500; color: var(--navy); line-height: 1.50; }
        @media (min-width: 480px) { .cp-ci-value { font-size: 12.5px; } }
        @media (min-width: 640px) { .cp-ci-value { font-size: 13px; } }

        /* map */
        .cp-map-wrap {
          border-radius: 12px; overflow: hidden; 
          height: 160px; position: relative; 
          border: 1px solid var(--border);
          background: #e2e8f0;
        }
        @media (min-width: 480px) { .cp-map-wrap { height: 180px; border-radius: 14px; } }
        @media (min-width: 640px) { .cp-map-wrap { height: 200px; border-radius: 16px; } }
        
        .cp-map { 
          width: 100%; height: 100%; 
          opacity: 1;
          transition: opacity 0.5s;
        }
        .cp-map iframe { width: 100%; height: 100%; border: none; display: block; }
        
        .cp-map-skeleton {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #e2e8f0;
          z-index: 1;
          transition: opacity 0.3s;
        }
        
        .cp-map-badge {
          position: absolute; top: 8px; left: 8px; z-index: 5;
          display: inline-flex; align-items: center; gap: 5px;
          padding: 4px 10px; border-radius: 999px;
          background: rgba(255,255,255,0.95); backdrop-filter: blur(8px);
          border: 1px solid var(--border); font-size: 10.5px; font-weight: 600; color: var(--navy);
          box-shadow: 0 3px 14px rgba(30,41,59,0.08);
        }
        @media (min-width: 480px) { .cp-map-badge { top: 10px; left: 10px; padding: 5px 12px; font-size: 11px; } }
        .cp-map-dot {
          width: 6px; height: 6px; border-radius: 50%; background: var(--primary);
          box-shadow: 0 0 0 3px rgba(216,27,74,0.15);
          animation: glowpulse 2s ease-in-out infinite;
        }

        /* social */
        .cp-social-row { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 3px; }
        @media (min-width: 480px) { .cp-social-row { gap: 10px; margin-top: 4px; } }
        .cp-social-btn {
          width: 36px; height: 36px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          background: #F3F5EF; border: 1.5px solid var(--border);
          color: #64748B; text-decoration: none; transition: all 0.22s;
        }
        @media (min-width: 480px) { .cp-social-btn { width: 40px; height: 40px; border-radius: 11px; } }
        @media (min-width: 640px) { .cp-social-btn { width: 42px; height: 42px; border-radius: 12px; } }
        .cp-social-btn:hover { background: var(--primary); border-color: var(--primary); color: #FFFFFF; transform: translateY(-2px); box-shadow: 0 6px 18px rgba(216,27,74,0.20); }

        /* quote section */
        .quote-section {
          background: #FFFFFF;
          border-top: 1px solid rgba(30,41,59,0.08);
          border-bottom: 1px solid rgba(30,41,59,0.08);
          padding: 36px 16px; margin-top: 16px;
        }
        @media (min-width: 480px) { .quote-section { padding: 40px 24px; } }
        @media (min-width: 640px) { .quote-section { padding: 44px 32px; } }
        @media (min-width: 768px) { .quote-section { padding: 48px 40px; margin-top: 20px; } }
        .quote-inner { max-width: 1280px; margin: 0 auto; text-align: center; }
        .quote-text {
          font-family: var(--display); font-size: clamp(1rem, 2.5vw, 1.3rem);
          font-style: italic; color: #64748B; margin-bottom: 6px; line-height: 1.6;
        }
        @media (min-width: 480px) { .quote-text { margin-bottom: 8px; } }
        .quote-attribution { font-size: clamp(10px, 1.5vw, 12px); font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #E8B21C; }
      `}</style>

      <Navbar />

      {/* ══ BANNER ══ */}
      <section className="cp-banner" style={{ marginTop: "clamp(80px, 10vw, 101px)" }}>
        <div className="cp-banner-bg" />
        <div className="cp-banner-ov1" />
        <div className="cp-banner-ov2" />

        {/* OM motif */}
        <div className="cp-banner-motif">
          <div className="cp-motif-line" />
          <span className="cp-motif-symbol">ॐ</span>
          <div className="cp-motif-line r" />
        </div>

        <div className="cp-banner-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="cp-banner-eyebrow">
              <span className="cp-eyebrow-dot" />
              Adiyogi Foundation — Reach Out
            </div>
            <h1 className="cp-banner-title">
              Connect With<br />Our Seva Family
            </h1>
            <div className="cp-banner-line" />
            <p className="cp-banner-sub">
              Whether you wish to donate, volunteer, support temple restoration,
              or organise a Bhandara — we welcome you with open hands and an open heart.
            </p>
          </motion.div>
        </div>

        <div className="cp-banner-wave">
          <svg viewBox="0 0 1440 56" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,22 C240,56 600,0 1440,30 L1440,56 L0,56 Z" fill="#FAFAF7" />
          </svg>
        </div>
      </section>

      {/* ══ INFO CARDS ══ */}
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
                    <Icon size={16} />
                  </div>
                  <span className="cp-info-label">{c.label}</span>
                  <span className="cp-info-value">{c.value}</span>
                </Wrap>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* ══ TWO-COL MAIN ══ */}
      <motion.div
        className="cp-main"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}
      >
        {/* FORM */}
        <motion.div variants={fadeUp}>
          <div className="cp-form-card">
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div
                  key="done" className="cp-done"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="cp-done-ring">
                    <FiCheckCircle size={28} />
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
                    <FiHeart size={9} />
                    Get in Touch
                  </div>
                  <h2 className="cp-form-title">Connect With Adiyogi Foundation</h2>
                  <p className="cp-form-sub">
                    Whether you wish to volunteer, support our initiatives, seek assistance,
                    or learn more about our humanitarian and spiritual activities, we would be
                    honored to hear from you.
                  </p>

                  <div className="cp-form-note">
                    <FiHeart size={14} />
                    <span>
                      Together, we can create meaningful change through seva, compassion,
                      and collective responsibility.
                    </span>
                  </div>

                  <div className="cp-row">
                    <div className="cp-field">
                      <label className="cp-lbl">Full Name *</label>
                      <input 
                        type="text" name="name" required 
                        className={`cp-inp ${errors.name ? 'error' : ''}`}
                        placeholder="Ramesh Sharma" 
                        value={form.name} 
                        onChange={handleChange}
                        disabled={submitting}
                      />
                      {errors.name && <span className="cp-error-text">{errors.name}</span>}
                    </div>
                    <div className="cp-field">
                      <label className="cp-lbl">Phone</label>
                      <input 
                        type="tel" name="phone" 
                        className="cp-inp" 
                        placeholder="+91 98765 43210" 
                        value={form.phone} 
                        onChange={handleChange}
                        disabled={submitting}
                      />
                    </div>
                  </div>

                  <div className="cp-field">
                    <label className="cp-lbl">Email Address *</label>
                    <input 
                      type="email" name="email" required 
                      className={`cp-inp ${errors.email ? 'error' : ''}`}
                      placeholder="you@example.com" 
                      value={form.email} 
                      onChange={handleChange}
                      disabled={submitting}
                    />
                    {errors.email && <span className="cp-error-text">{errors.email}</span>}
                  </div>

                  <div className="cp-field">
                    <label className="cp-lbl">Your Message *</label>
                    <textarea 
                      name="message" required 
                      className={`cp-ta ${errors.message ? 'error' : ''}`}
                      placeholder="Write your message, query, or how you'd like to help..." 
                      value={form.message} 
                      onChange={handleChange}
                      disabled={submitting}
                    />
                    {errors.message && <span className="cp-error-text">{errors.message}</span>}
                  </div>

                  <motion.button
                    type="submit" className="cp-btn" disabled={submitting}
                    whileHover={!submitting ? { scale: 1.015, y: -1 } : {}}
                    whileTap={!submitting ? { scale: 0.98 } : {}}
                  >
                    {submitting ? <><div className="cp-spin" /> Sending with love…</> : <><FiSend size={14} /> Send Message</>}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* SIDEBAR */}
        <motion.div variants={fadeUp} className="cp-sidebar">
          <div className="cp-sidebar-card">
            <p className="cp-sidebar-title">Reach Us Directly</p>
            <div className="cp-contact-list">
              {contactItems.map(c => {
                const Icon = c.icon;
                const Wrap = c.href ? "a" : "div";
                return (
                  <Wrap key={c.label} href={c.href || undefined} className="cp-contact-item"
                    target={c.href && c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href && c.href.startsWith("http") ? "noreferrer" : undefined}
                  >
                    <div className="cp-ci-icon" style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.color }}>
                      <Icon size={15} />
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

          <div className="cp-sidebar-card" style={{ padding: "16px" }}>
            <p className="cp-sidebar-title" style={{ marginBottom: "12px" }}>Find Us</p>

            <div className="cp-map-wrap">
              <div className="cp-map-badge">
                <span className="cp-map-dot" />
                Badlapur, Maharashtra
              </div>
              
              {!mapLoaded && (
                <div className="cp-map-skeleton">
                  <div className="skeleton-shimmer" />
                </div>
              )}

              <div className="cp-map" style={{ opacity: mapLoaded ? 1 : 0 }}>
                <iframe
                  title="Adiyogi Foundation Location"
                  src="https://maps.google.com/maps?q=Badlapur%20Maharashtra%20421503&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  onLoad={handleMapLoad}
                />
              </div>
            </div>
          </div>

          <div className="cp-sidebar-card">
            <p className="cp-sidebar-title">Follow Our Seva</p>
            <div className="cp-social-row">
              {socials.map(({ Icon, href, label }) => (
                <a key={label} href={href} aria-label={label} className="cp-social-btn" target="_blank" rel="noreferrer">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="quote-section">
        <div className="quote-inner">
          <p className="quote-text">"Every act of seva brings us closer to the divine."</p>
          <p className="quote-attribution">— Adiyogi Foundation</p>
        </div>
      </div>

      <Footer />
    </main>
  );
}