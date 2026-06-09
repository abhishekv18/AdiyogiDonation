

// import { motion } from "framer-motion";
// import {
//   FiArrowRight, FiCheckCircle, FiHeart,
//   FiLock, FiMail, FiMapPin, FiPhone, FiShield,
// } from "react-icons/fi";
// import {
//   FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp, FaXTwitter,FaLinkedinIn,
// } from "react-icons/fa6";
// import logo from "/Adiyogi Foundation (1).jpeg";

// const quickLinks = [
//   { label: "Home",            href: "/"                },
//   { label: "Success Stories", href: "/success-stories" },
//   { label: "Contact",         href: "/contact"         },
//   { label: "Donate",          href: "#donate"          },
// ];

// const socialLinks = [
//   { label: "Instagram", href: "https://www.instagram.com/adiyogifoundation?igsh=MXVuODhrbTQyZTdvYg", icon: FaInstagram },
//   { label: "Facebook",  href: "https://www.facebook.com/share/19wQKAWb1b/",  icon: FaFacebookF  },
//   { label: "YouTube",   href: "https://www.youtube.com/channel/UCL8UZJkhwQ0o3YJKB8od1nA",   icon: FaYoutube    },
//   { label: "LinkedIn",  href: "https://www.linkedin.com/company/adiyogi-foundation",  icon: FaLinkedinIn },
// ];

// const trustItems = [
//   { label: "Secure Donations",    icon: FiLock        },
//   { label: "Razorpay Protected",  icon: FiShield      },
//   { label: "Transparent Giving",  icon: FiCheckCircle },
//   { label: "Community Trusted",   icon: FiHeart       },
// ];

// const contact = {
//   phone:   "+91 9175033022",
//   email:   "info@adiyogifoundation.org",
//  address: "Badlapur, Thane, Maharashtra — 421503"
// };

// const fadeUp = {
//   hidden:  { opacity: 0, y: 22 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] } },
// };

// export default function Footer() {
//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

//         /* only scoped to footer — no global resets */
//         .ft-root {
//           font-family: 'DM Sans', sans-serif;
//           position: relative;
//           overflow: hidden;
//           background: #FAFAF7;
//           color: #1E293B;
//         }

//         /* ── section heading style matches site ── */
//         .ft-col-heading {
//           font-family: 'DM Sans', sans-serif;
//           font-size: 9.5px;
//           font-weight: 700;
//           letter-spacing: 0.18em;
//           text-transform: uppercase;
//           color: #1E293B;
//           margin-bottom: 16px;
//           display: inline-flex;
//           flex-direction: column;
//           gap: 5px;
//         }
//         @media (min-width: 480px) {
//           .ft-col-heading { font-size: 10px; letter-spacing: 0.19em; margin-bottom: 18px; gap: 6px; }
//         }
//         @media (min-width: 640px) {
//           .ft-col-heading { font-size: 10.5px; letter-spacing: 0.20em; margin-bottom: 20px; }
//         }
//         .ft-col-heading::after {
//           content: '';
//           display: block;
//           width: 24px; height: 2px; border-radius: 2px;
//           background: linear-gradient(90deg, #D81B4A, #E8B21C);
//         }
//         @media (min-width: 480px) {
//           .ft-col-heading::after { width: 28px; }
//         }

//         .ft-brand-name {
//           font-family: 'Cormorant Garamond', Georgia, serif;
//           font-size: clamp(0.95rem, 2vw, 1.05rem);
//           font-weight: 600;
//           font-style: italic;
//           color: #1E293B;
//           letter-spacing: -0.01em;
//           line-height: 1.2;
//         }
//         .ft-brand-tag {
//           font-family: 'DM Sans', sans-serif;
//           font-size: 8.5px;
//           font-weight: 700;
//           letter-spacing: 0.2em;
//           text-transform: uppercase;
//           color: #D81B4A;
//           margin-top: 2px;
//           display: block;
//         }
//         @media (min-width: 480px) {
//           .ft-brand-tag { font-size: 9px; letter-spacing: 0.22em; margin-top: 3px; }
//         }
//         @media (min-width: 640px) {
//           .ft-brand-tag { font-size: 9.5px; }
//         }

//         /* ── body copy ── */
//         .ft-body {
//           font-size: 12.5px;
//           line-height: 1.78;
//           color: #64748B;
//           font-weight: 400;
//           max-width: 260px;
//           margin-top: 16px;
//         }
//         @media (min-width: 480px) {
//           .ft-body { font-size: 13px; margin-top: 18px; }
//         }
//         @media (min-width: 640px) {
//           .ft-body { font-size: 13.5px; margin-top: 20px; }
//         }

//         /* ── nav links ── */
//         .ft-nav-link {
//           font-size: 12.5px;
//           font-weight: 400;
//           color: #64748B;
//           text-decoration: none;
//           display: inline-block;
//           position: relative;
//           transition: color 0.22s;
//         }
//         @media (min-width: 480px) {
//           .ft-nav-link { font-size: 13px; }
//         }
//         @media (min-width: 640px) {
//           .ft-nav-link { font-size: 13.5px; }
//         }
//         .ft-nav-link::after {
//           content: '';
//           position: absolute; bottom: -2px; left: 0;
//           height: 1.5px; width: 0;
//           border-radius: 2px;
//           background: linear-gradient(90deg, #D81B4A, #8AAE3B, #E8B21C);
//           transition: width 0.30s ease;
//         }
//         .ft-nav-link:hover { color: #D81B4A; }
//         .ft-nav-link:hover::after { width: 100%; }

//         /* ── contact items ── */
//         .ft-contact-link {
//           display: flex; align-items: flex-start;
//           gap: 8px; text-decoration: none;
//           font-size: 12px; color: #64748B;
//           line-height: 1.60; transition: color 0.20s;
//         }
//         @media (min-width: 480px) {
//           .ft-contact-link { font-size: 12.5px; gap: 9px; }
//         }
//         @media (min-width: 640px) {
//           .ft-contact-link { font-size: 13px; gap: 10px; }
//         }
//         .ft-contact-link:hover { color: #1E293B; }
//         .ft-contact-icon {
//           flex-shrink: 0; margin-top: 2px;
//           transition: transform 0.22s;
//         }
//         .ft-contact-link:hover .ft-contact-icon { transform: scale(1.12); }

//         /* ── social btns ── */
//         .ft-social-btn {
//           display: flex; align-items: center; justify-content: center;
//           width: 36px; height: 36px; border-radius: 50%;
//           border: 1.5px solid #E2E8F0;
//           background: #fff;
//           color: #64748B; text-decoration: none;
//           transition: all 0.22s;
//         }
//         @media (min-width: 480px) {
//           .ft-social-btn { width: 38px; height: 38px; }
//         }
//         @media (min-width: 640px) {
//           .ft-social-btn { width: 40px; height: 40px; }
//         }
//         .ft-social-btn:hover {
//           border-color: rgba(216,27,74,0.28);
//           background: #FCE4E8;
//           color: #D81B4A;
//           transform: translateY(-3px);
//           box-shadow: 0 10px 24px rgba(216,27,74,0.12);
//         }

//         /* ── donate CTA ── */
//         .ft-donate-btn {
//           display: inline-flex; align-items: center; gap: 6px;
//           padding: 10px 18px; border-radius: 999px;
//           background: linear-gradient(135deg, #D81B4A 0%, #B0153D 100%);
//           color: #fff; font-size: 12.5px; font-weight: 600;
//           text-decoration: none;
//           box-shadow: 0 14px 36px rgba(216,27,74,0.26);
//           transition: transform 0.22s, box-shadow 0.22s;
//           margin-top: 18px;
//           font-family: 'DM Sans', sans-serif;
//         }
//         @media (min-width: 480px) {
//           .ft-donate-btn { padding: 10px 20px; font-size: 13px; gap: 7px; margin-top: 20px; }
//         }
//         @media (min-width: 640px) {
//           .ft-donate-btn { padding: 11px 22px; font-size: 13.5px; margin-top: 22px; }
//         }
//         .ft-donate-btn:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 20px 48px rgba(216,27,74,0.36);
//         }
//         .ft-donate-heart { animation: hb 1.8s ease-in-out infinite; }
//         @keyframes hb { 0%,100%{transform:scale(1)} 50%{transform:scale(1.28)} }

//         /* ── trust bar ── */
//         .ft-trust-bar {
//           margin-top: 36px;
//           border-radius: 16px;
//           border: 1px solid #E2E8F0;
//           background: #F3F5EF;
//           padding: 10px;
//         }
//         @media (min-width: 480px) {
//           .ft-trust-bar { margin-top: 42px; border-radius: 18px; padding: 12px; }
//         }
//         @media (min-width: 640px) {
//           .ft-trust-bar { margin-top: 48px; border-radius: 20px; padding: 14px; }
//         }
//         .ft-trust-grid {
//           display: grid;
//           grid-template-columns: 1fr;
//           gap: 8px;
//         }
//         @media (min-width: 480px) {
//           .ft-trust-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
//         }
//         @media (min-width: 1024px) {
//           .ft-trust-grid { grid-template-columns: repeat(4, 1fr); }
//         }

//         .ft-trust-chip {
//           display: flex; align-items: center; gap: 8px;
//           background: #fff; border-radius: 12px;
//           padding: 10px 14px;
//           font-size: 11.5px; font-weight: 500;
//           color: #1E293B;
//           box-shadow: 0 2px 8px rgba(30,41,59,0.05);
//         }
//         @media (min-width: 480px) {
//           .ft-trust-chip { padding: 11px 16px; font-size: 12px; gap: 9px; border-radius: 14px; }
//         }
//         @media (min-width: 640px) {
//           .ft-trust-chip { font-size: 12.5px; }
//         }
//         .ft-trust-chip svg { color: #8AAE3B; flex-shrink: 0; }

//         /* ── divider ── */
//         .ft-divider {
//           margin: 24px 0 0;
//           height: 1px;
//           background: linear-gradient(to right, transparent, #E2E8F0 20%, #E2E8F0 80%, transparent);
//         }
//         @media (min-width: 480px) {
//           .ft-divider { margin-top: 28px; }
//         }
//         @media (min-width: 640px) {
//           .ft-divider { margin-top: 32px; }
//         }

//         /* ── bottom bar ── */
//         .ft-bottom {
//           padding: 14px 0 0;
//           display: flex; flex-wrap: wrap;
//           align-items: center; justify-content: center;
//           gap: 8px;
//           font-size: 11px; color: #94a3b8;
//           text-align: center;
//         }
//         @media (min-width: 480px) {
//           .ft-bottom { padding: 16px 0 0; font-size: 12px; gap: 10px; justify-content: space-between; text-align: left; }
//         }
//         @media (min-width: 640px) {
//           .ft-bottom { padding: 20px 0 0; font-size: 12.5px; }
//         }
//         .ft-bottom > * {
//           flex: 1 1 auto;
//           min-width: 200px;
//         }
//         @media (min-width: 480px) {
//           .ft-bottom > * { min-width: 0; flex: 0 1 auto; }
//         }

//         /* ── spiritual tagline ── */
//         .ft-spiritual-line {
//           font-family: 'Cormorant Garamond', Georgia, serif;
//           font-size: 0.85rem; font-style: italic; font-weight: 500;
//           color: #94a3b8; letter-spacing: 0.01em;
//         }
//         @media (min-width: 480px) {
//           .ft-spiritual-line { font-size: 0.9rem; }
//         }
//         @media (min-width: 640px) {
//           .ft-spiritual-line { font-size: 1.0rem; }
//         }

//         /* ── grid layout for columns ── */
//         .ft-grid {
//           display: grid;
//           gap: 24px;
//           grid-template-columns: 1fr;
//         }
//         @media (min-width: 480px) {
//           .ft-grid { grid-template-columns: repeat(2, 1fr); gap: 28px; }
//         }
//         @media (min-width: 1024px) {
//           .ft-grid { grid-template-columns: 1.2fr 0.8fr 1fr 1fr; gap: 32px; }
//         }

//         .ft-grid-item {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           text-align: center;
//         }
//         @media (min-width: 480px) {
//           .ft-grid-item { align-items: flex-start; text-align: left; }
//         }

//         .ft-contact-list {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           gap: 12px;
//         }
//         @media (min-width: 480px) {
//           .ft-contact-list { align-items: flex-start; }
//         }

//         .ft-social-wrap {
//           display: flex;
//           flex-wrap: wrap;
//           justify-content: center;
//           gap: 8px;
//         }
//         @media (min-width: 480px) {
//           .ft-social-wrap { justify-content: flex-start; gap: 10px; }
//         }
//         @media (min-width: 640px) {
//           .ft-social-wrap { gap: 12px; }
//         }
//       `}</style>

//       <footer className="ft-root">
//         {/* decorative orbs */}
//         <div className="pointer-events-none absolute -left-20 sm:-left-28 top-6 sm:top-10 h-60 sm:h-80 w-60 sm:w-80 rounded-full bg-[#D81B4A]/6 blur-3xl" />
//         <div className="pointer-events-none absolute -right-16 sm:-right-24 bottom-16 sm:bottom-24 h-60 sm:h-80 w-60 sm:w-80 rounded-full bg-[#8AAE3B]/6 blur-3xl" />
//         <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(30,41,59,0.03),transparent_38%)]" />

//         <motion.div
//           className="relative mx-auto max-w-7xl px-4 pb-6 sm:pb-8 pt-10 sm:pt-14 lg:pt-20"
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-100px" }}
//           transition={{ staggerChildren: 0.09 }}
//         >
//           {/* ── 4 col grid ── */}
//           <div className="ft-grid">

//             {/* Col 1 — Brand */}
//             <motion.div variants={fadeUp} className="ft-grid-item">
//               <a
//                 href="/"
//                 aria-label="Adiyogi Foundation home"
//                 className="inline-flex items-center gap-2 sm:gap-3"
//               >
//                 <span className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-white shadow-[0_16px_40px_rgba(216,27,74,0.12)] flex-shrink-0">
//                   <img src={logo} alt="Adiyogi Foundation logo" className="h-7 w-7 sm:h-9 sm:w-9 object-contain" />
//                 </span>
//                 <span>
//                   <span className="ft-brand-name">Adiyogi Foundation</span>
//                   <span className="ft-brand-tag">Bhakti · Prem · Samarpan</span>
//                 </span>
//               </a>

//               <p className="ft-body mx-auto sm:mx-0">
//                 Dedicated to temple restoration, Bhandara seva, and uplifting
//                 those in need — through compassion, transparency, and dharma.
//               </p>
//             </motion.div>

//             {/* Col 2 — Quick Links */}
//             <motion.nav variants={fadeUp} aria-label="Footer quick links" className="ft-grid-item">
//               <span className="ft-col-heading">Quick Links</span>
//               <ul className="space-y-2 sm:space-y-3 flex flex-col items-center sm:items-start mt-1">
//                 {quickLinks.map(link => (
//                   <li key={link.href}>
//                     <a href={link.href} className="ft-nav-link">{link.label}</a>
//                   </li>
//                 ))}
//               </ul>
//             </motion.nav>

//             {/* Col 3 — Contact */}
//             <motion.div variants={fadeUp} className="ft-grid-item">
//               <span className="ft-col-heading">Contact</span>
//               <div className="ft-contact-list mt-1">
//                 <a href={`tel:${contact.phone}`} className="ft-contact-link">
//                   <FiPhone size={14} className="sm:w-[15px] sm:h-[15px] ft-contact-icon" style={{ color: "#8AAE3B" }} />
//                   <span>{contact.phone}</span>
//                 </a>
//                 <a href={`mailto:${contact.email}`} className="ft-contact-link">
//                   <FiMail size={14} className="sm:w-[15px] sm:h-[15px] ft-contact-icon" style={{ color: "#E8B21C" }} />
//                   <span>{contact.email}</span>
//                 </a>
//                <a
//   href="https://www.google.com/maps/search/?api=1&query=Badlapur,Thane,Maharashtra,421503"
//   target="_blank"
//   rel="noopener noreferrer"
//   className="ft-contact-link"
// >
//   <FiMapPin
//     size={14}
//     className="sm:w-[15px] sm:h-[15px] ft-contact-icon"
//     style={{ color: "#D81B4A" }}
//   />
//   <span>{contact.address}</span>
// </a>
//               </div>
//             </motion.div>

//             {/* Col 4 — Connect + Donate */}
//             <motion.div variants={fadeUp} className="ft-grid-item">
//               <span className="ft-col-heading">Connect</span>
//               <div className="ft-social-wrap mt-1">
//                 {socialLinks.map(({ label, href, icon: Icon }) => (
//                   <motion.a
//                     key={label}
//                     href={href}
//                     target="_blank"
//                     rel="noreferrer"
//                     aria-label={`Visit Adiyogi Foundation on ${label}`}
//                     className="ft-social-btn"
//                     whileHover={{ y: -3, scale: 1.06 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     <Icon size={14} className="sm:w-[15px] sm:h-[15px]" />
//                   </motion.a>
//                 ))}
//               </div>

//               <div className="flex justify-center sm:justify-start">
//                 <motion.a
//                   href="/#donate"
//                   className="ft-donate-btn"
//                   whileHover={{ scale: 1.03 }}
//                   whileTap={{ scale: 0.97 }}
//                 >
//                   <FiHeart size={13} className="sm:w-[14px] sm:h-[14px] ft-donate-heart" />
//                   Donate Now
//                   <FiArrowRight size={13} className="sm:w-[14px] sm:h-[14px]" />
//                 </motion.a>
//               </div>
//             </motion.div>
//           </div>

//           {/* ── Trust bar ── */}
//           <motion.div variants={fadeUp} className="ft-trust-bar">
//             <div className="ft-trust-grid">
//               {trustItems.map(({ label, icon: Icon }) => (
//                 <div key={label} className="ft-trust-chip">
//                   <Icon size={13} className="sm:w-[14px] sm:h-[14px]" />
//                   {label}
//                 </div>
//               ))}
//             </div>
//           </motion.div>

//           {/* ── Bottom bar ── */}
//           <div className="ft-divider" />
//           <div className="ft-bottom">
//             <p>© 2026 Adiyogi Foundation. All Rights Reserved.</p>
//             <span className="ft-spiritual-line">
//               "Seva is the highest form of worship."
//             </span>
//             <p>Made with <span style={{ color: "#D81B4A" }}>❤️</span> by Abhishek</p>
//           </div>
//         </motion.div>
//       </footer>
//     </>
//   );
// }
import { motion } from "framer-motion";
import {
  FiArrowRight, FiCheckCircle, FiHeart,
  FiLock, FiMail, FiMapPin, FiPhone, FiShield,
} from "react-icons/fi";
import {
  FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp, FaXTwitter,FaLinkedinIn,
} from "react-icons/fa6";
import logo from "/Adiyogi Foundation (1).jpeg";

const quickLinks = [
  { label: "Home",            href: "/"                },
  { label: "Success Stories", href: "/success-stories" },
  { label: "Contact",         href: "/contact"         },
  { label: "Donate",          href: "#donate"          },
   { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Cookie Policy",      href: "/cookie-policy"        },
];

const policyLinks = [
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Cookie Policy",      href: "/cookie-policy"        },
];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/adiyogifoundation?igsh=MXVuODhrbTQyZTdvYg", icon: FaInstagram },
  { label: "Facebook",  href: "https://www.facebook.com/share/19wQKAWb1b/",  icon: FaFacebookF  },
  { label: "YouTube",   href: "https://www.youtube.com/channel/UCL8UZJkhwQ0o3YJKB8od1nA",   icon: FaYoutube    },
  { label: "LinkedIn",  href: "https://www.linkedin.com/company/adiyogi-foundation",  icon: FaLinkedinIn },
];

const trustItems = [
  { label: "Secure Donations",    icon: FiLock        },
  { label: "Razorpay Protected",  icon: FiShield      },
  { label: "Transparent Giving",  icon: FiCheckCircle },
  { label: "Community Trusted",   icon: FiHeart       },
];

const contact = {
  phone:   "+91 9175033022",
  email:   "info@adiyogifoundation.org",
 address: "Badlapur, Thane, Maharashtra — 421503"
};

const fadeUp = {
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] } },
};

export default function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        /* only scoped to footer — no global resets */
        .ft-root {
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
          background: #FAFAF7;
          color: #1E293B;
        }

        /* ── section heading style matches site ── */
        .ft-col-heading {
          font-family: 'DM Sans', sans-serif;
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #1E293B;
          margin-bottom: 16px;
          display: inline-flex;
          flex-direction: column;
          gap: 5px;
        }
        @media (min-width: 480px) {
          .ft-col-heading { font-size: 10px; letter-spacing: 0.19em; margin-bottom: 18px; gap: 6px; }
        }
        @media (min-width: 640px) {
          .ft-col-heading { font-size: 10.5px; letter-spacing: 0.20em; margin-bottom: 20px; }
        }
        .ft-col-heading::after {
          content: '';
          display: block;
          width: 24px; height: 2px; border-radius: 2px;
          background: linear-gradient(90deg, #D81B4A, #E8B21C);
        }
        @media (min-width: 480px) {
          .ft-col-heading::after { width: 28px; }
        }

        .ft-brand-name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(0.95rem, 2vw, 1.05rem);
          font-weight: 600;
          font-style: italic;
          color: #1E293B;
          letter-spacing: -0.01em;
          line-height: 1.2;
        }
        .ft-brand-tag {
          font-family: 'DM Sans', sans-serif;
          font-size: 8.5px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #D81B4A;
          margin-top: 2px;
          display: block;
        }
        @media (min-width: 480px) {
          .ft-brand-tag { font-size: 9px; letter-spacing: 0.22em; margin-top: 3px; }
        }
        @media (min-width: 640px) {
          .ft-brand-tag { font-size: 9.5px; }
        }

        /* ── body copy ── */
        .ft-body {
          font-size: 12.5px;
          line-height: 1.78;
          color: #64748B;
          font-weight: 400;
          max-width: 260px;
          margin-top: 16px;
        }
        @media (min-width: 480px) {
          .ft-body { font-size: 13px; margin-top: 18px; }
        }
        @media (min-width: 640px) {
          .ft-body { font-size: 13.5px; margin-top: 20px; }
        }

        /* ── nav links ── */
        .ft-nav-link {
          font-size: 12.5px;
          font-weight: 400;
          color: #64748B;
          text-decoration: none;
          display: inline-block;
          position: relative;
          transition: color 0.22s;
        }
        @media (min-width: 480px) {
          .ft-nav-link { font-size: 13px; }
        }
        @media (min-width: 640px) {
          .ft-nav-link { font-size: 13.5px; }
        }
        .ft-nav-link::after {
          content: '';
          position: absolute; bottom: -2px; left: 0;
          height: 1.5px; width: 0;
          border-radius: 2px;
          background: linear-gradient(90deg, #D81B4A, #8AAE3B, #E8B21C);
          transition: width 0.30s ease;
        }
        .ft-nav-link:hover { color: #D81B4A; }
        .ft-nav-link:hover::after { width: 100%; }

        /* ── policy links (subtle style) ── */
        .ft-policy-link {
          font-size: 11px;
          font-weight: 400;
          color: #94a3b8;
          text-decoration: none;
          transition: color 0.22s;
          position: relative;
        }
        @media (min-width: 480px) {
          .ft-policy-link { font-size: 11.5px; }
        }
        @media (min-width: 640px) {
          .ft-policy-link { font-size: 12px; }
        }
        .ft-policy-link:hover { color: #D81B4A; }

        .ft-policy-separator {
          color: #cbd5e1;
          margin: 0 6px;
          user-select: none;
        }

        /* ── contact items ── */
        .ft-contact-link {
          display: flex; align-items: flex-start;
          gap: 8px; text-decoration: none;
          font-size: 12px; color: #64748B;
          line-height: 1.60; transition: color 0.20s;
        }
        @media (min-width: 480px) {
          .ft-contact-link { font-size: 12.5px; gap: 9px; }
        }
        @media (min-width: 640px) {
          .ft-contact-link { font-size: 13px; gap: 10px; }
        }
        .ft-contact-link:hover { color: #1E293B; }
        .ft-contact-icon {
          flex-shrink: 0; margin-top: 2px;
          transition: transform 0.22s;
        }
        .ft-contact-link:hover .ft-contact-icon { transform: scale(1.12); }

        /* ── social btns ── */
        .ft-social-btn {
          display: flex; align-items: center; justify-content: center;
          width: 36px; height: 36px; border-radius: 50%;
          border: 1.5px solid #E2E8F0;
          background: #fff;
          color: #64748B; text-decoration: none;
          transition: all 0.22s;
        }
        @media (min-width: 480px) {
          .ft-social-btn { width: 38px; height: 38px; }
        }
        @media (min-width: 640px) {
          .ft-social-btn { width: 40px; height: 40px; }
        }
        .ft-social-btn:hover {
          border-color: rgba(216,27,74,0.28);
          background: #FCE4E8;
          color: #D81B4A;
          transform: translateY(-3px);
          box-shadow: 0 10px 24px rgba(216,27,74,0.12);
        }

        /* ── donate CTA ── */
        .ft-donate-btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 10px 18px; border-radius: 999px;
          background: linear-gradient(135deg, #D81B4A 0%, #B0153D 100%);
          color: #fff; font-size: 12.5px; font-weight: 600;
          text-decoration: none;
          box-shadow: 0 14px 36px rgba(216,27,74,0.26);
          transition: transform 0.22s, box-shadow 0.22s;
          margin-top: 18px;
          font-family: 'DM Sans', sans-serif;
        }
        @media (min-width: 480px) {
          .ft-donate-btn { padding: 10px 20px; font-size: 13px; gap: 7px; margin-top: 20px; }
        }
        @media (min-width: 640px) {
          .ft-donate-btn { padding: 11px 22px; font-size: 13.5px; margin-top: 22px; }
        }
        .ft-donate-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 48px rgba(216,27,74,0.36);
        }
        .ft-donate-heart { animation: hb 1.8s ease-in-out infinite; }
        @keyframes hb { 0%,100%{transform:scale(1)} 50%{transform:scale(1.28)} }

        /* ── trust bar ── */
        .ft-trust-bar {
          margin-top: 36px;
          border-radius: 16px;
          border: 1px solid #E2E8F0;
          background: #F3F5EF;
          padding: 10px;
        }
        @media (min-width: 480px) {
          .ft-trust-bar { margin-top: 42px; border-radius: 18px; padding: 12px; }
        }
        @media (min-width: 640px) {
          .ft-trust-bar { margin-top: 48px; border-radius: 20px; padding: 14px; }
        }
        .ft-trust-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 8px;
        }
        @media (min-width: 480px) {
          .ft-trust-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
        }
        @media (min-width: 1024px) {
          .ft-trust-grid { grid-template-columns: repeat(4, 1fr); }
        }

        .ft-trust-chip {
          display: flex; align-items: center; gap: 8px;
          background: #fff; border-radius: 12px;
          padding: 10px 14px;
          font-size: 11.5px; font-weight: 500;
          color: #1E293B;
          box-shadow: 0 2px 8px rgba(30,41,59,0.05);
        }
        @media (min-width: 480px) {
          .ft-trust-chip { padding: 11px 16px; font-size: 12px; gap: 9px; border-radius: 14px; }
        }
        @media (min-width: 640px) {
          .ft-trust-chip { font-size: 12.5px; }
        }
        .ft-trust-chip svg { color: #8AAE3B; flex-shrink: 0; }

        /* ── divider ── */
        .ft-divider {
          margin: 24px 0 0;
          height: 1px;
          background: linear-gradient(to right, transparent, #E2E8F0 20%, #E2E8F0 80%, transparent);
        }
        @media (min-width: 480px) {
          .ft-divider { margin-top: 28px; }
        }
        @media (min-width: 640px) {
          .ft-divider { margin-top: 32px; }
        }

        /* ── bottom bar ── */
        .ft-bottom {
          padding: 14px 0 0;
          display: flex; flex-wrap: wrap;
          align-items: center; justify-content: center;
          gap: 8px;
          font-size: 11px; color: #94a3b8;
          text-align: center;
        }
        @media (min-width: 480px) {
          .ft-bottom { padding: 16px 0 0; font-size: 12px; gap: 10px; justify-content: space-between; text-align: left; }
        }
        @media (min-width: 640px) {
          .ft-bottom { padding: 20px 0 0; font-size: 12.5px; }
        }
        .ft-bottom > * {
          flex: 1 1 auto;
          min-width: 200px;
        }
        @media (min-width: 480px) {
          .ft-bottom > * { min-width: 0; flex: 0 1 auto; }
        }

        /* ── spiritual tagline ── */
        .ft-spiritual-line {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 0.85rem; font-style: italic; font-weight: 500;
          color: #94a3b8; letter-spacing: 0.01em;
        }
        @media (min-width: 480px) {
          .ft-spiritual-line { font-size: 0.9rem; }
        }
        @media (min-width: 640px) {
          .ft-spiritual-line { font-size: 1.0rem; }
        }

        /* ── grid layout for columns ── */
        .ft-grid {
          display: grid;
          gap: 24px;
          grid-template-columns: 1fr;
        }
        @media (min-width: 480px) {
          .ft-grid { grid-template-columns: repeat(2, 1fr); gap: 28px; }
        }
        @media (min-width: 1024px) {
          .ft-grid { grid-template-columns: 1.2fr 0.8fr 1fr 1fr; gap: 32px; }
        }

        .ft-grid-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        @media (min-width: 480px) {
          .ft-grid-item { align-items: flex-start; text-align: left; }
        }

        .ft-contact-list {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        @media (min-width: 480px) {
          .ft-contact-list { align-items: flex-start; }
        }

        .ft-social-wrap {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
        }
        @media (min-width: 480px) {
          .ft-social-wrap { justify-content: flex-start; gap: 10px; }
        }
        @media (min-width: 640px) {
          .ft-social-wrap { gap: 12px; }
        }
      `}</style>

      <footer className="ft-root">
        {/* decorative orbs */}
        <div className="pointer-events-none absolute -left-20 sm:-left-28 top-6 sm:top-10 h-60 sm:h-80 w-60 sm:w-80 rounded-full bg-[#D81B4A]/6 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 sm:-right-24 bottom-16 sm:bottom-24 h-60 sm:h-80 w-60 sm:w-80 rounded-full bg-[#8AAE3B]/6 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(30,41,59,0.03),transparent_38%)]" />

        <motion.div
          className="relative mx-auto max-w-7xl px-4 pb-6 sm:pb-8 pt-10 sm:pt-14 lg:pt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.09 }}
        >
          {/* ── 4 col grid ── */}
          <div className="ft-grid">

            {/* Col 1 — Brand */}
            <motion.div variants={fadeUp} className="ft-grid-item">
              <a
                href="/"
                aria-label="Adiyogi Foundation home"
                className="inline-flex items-center gap-2 sm:gap-3"
              >
                <span className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-white shadow-[0_16px_40px_rgba(216,27,74,0.12)] flex-shrink-0">
                  <img src={logo} alt="Adiyogi Foundation logo" className="h-7 w-7 sm:h-9 sm:w-9 object-contain" />
                </span>
                <span>
                  <span className="ft-brand-name">Adiyogi Foundation</span>
                  <span className="ft-brand-tag">Bhakti · Prem · Samarpan</span>
                </span>
              </a>

              <p className="ft-body mx-auto sm:mx-0">
                Dedicated to temple restoration, Bhandara seva, and uplifting
                those in need — through compassion, transparency, and dharma.
              </p>
            </motion.div>

            {/* Col 2 — Quick Links */}
            <motion.nav variants={fadeUp} aria-label="Footer quick links" className="ft-grid-item">
              <span className="ft-col-heading">Quick Links</span>
              <ul className="space-y-2 sm:space-y-3 flex flex-col items-center sm:items-start mt-1">
                {quickLinks.map(link => (
                  <li key={link.href}>
                    <a href={link.href} className="ft-nav-link">{link.label}</a>
                  </li>
                ))}
              </ul>
            </motion.nav>

            {/* Col 3 — Contact */}
            <motion.div variants={fadeUp} className="ft-grid-item">
              <span className="ft-col-heading">Contact</span>
              <div className="ft-contact-list mt-1">
                <a href={`tel:${contact.phone}`} className="ft-contact-link">
                  <FiPhone size={14} className="sm:w-[15px] sm:h-[15px] ft-contact-icon" style={{ color: "#8AAE3B" }} />
                  <span>{contact.phone}</span>
                </a>
                <a href={`mailto:${contact.email}`} className="ft-contact-link">
                  <FiMail size={14} className="sm:w-[15px] sm:h-[15px] ft-contact-icon" style={{ color: "#E8B21C" }} />
                  <span>{contact.email}</span>
                </a>
               <a
  href="https://www.google.com/maps/search/?api=1&query=Badlapur,Thane,Maharashtra,421503"
  target="_blank"
  rel="noopener noreferrer"
  className="ft-contact-link"
>
  <FiMapPin
    size={14}
    className="sm:w-[15px] sm:h-[15px] ft-contact-icon"
    style={{ color: "#D81B4A" }}
  />
  <span>{contact.address}</span>
</a>
              </div>
            </motion.div>

            {/* Col 4 — Connect + Donate */}
            <motion.div variants={fadeUp} className="ft-grid-item">
              <span className="ft-col-heading">Connect</span>
              <div className="ft-social-wrap mt-1">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Visit Adiyogi Foundation on ${label}`}
                    className="ft-social-btn"
                    whileHover={{ y: -3, scale: 1.06 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={14} className="sm:w-[15px] sm:h-[15px]" />
                  </motion.a>
                ))}
              </div>

              <div className="flex justify-center sm:justify-start">
                <motion.a
                  href="/#donate"
                  className="ft-donate-btn"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <FiHeart size={13} className="sm:w-[14px] sm:h-[14px] ft-donate-heart" />
                  Donate Now
                  <FiArrowRight size={13} className="sm:w-[14px] sm:h-[14px]" />
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* ── Trust bar ── */}
          <motion.div variants={fadeUp} className="ft-trust-bar">
            <div className="ft-trust-grid">
              {trustItems.map(({ label, icon: Icon }) => (
                <div key={label} className="ft-trust-chip">
                  <Icon size={13} className="sm:w-[14px] sm:h-[14px]" />
                  {label}
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Bottom bar ── */}
          <div className="ft-divider" />
          <div className="ft-bottom">
            <p>© 2026 Adiyogi Foundation. All Rights Reserved.</p>
            <span className="ft-spiritual-line">
              "Seva is the highest form of worship."
            </span>
            <p>
              <a href="/terms-and-conditions" className="ft-policy-link">Terms & Conditions</a>
              <span className="ft-policy-separator">|</span>
              <a href="/cookie-policy" className="ft-policy-link">Cookie Policy</a>
              <span className="hidden sm:inline"> • Made with <span style={{ color: "#D81B4A" }}>❤️</span> by Abhishek</span>
            </p>
            <p className="sm:hidden">Made with <span style={{ color: "#D81B4A" }}>❤️</span> by Abhishek</p>
          </div>
        </motion.div>
      </footer>
    </>
  );
}