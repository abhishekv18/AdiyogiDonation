

// import React, { useEffect, useState } from 'react';
// import { Eye, EyeOff, Mail, Lock, ArrowRight, Home, Shield, Users, Heart } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';
// import { setUserData } from '../redux/userSlice';
// import { ServerUrl } from '../App';

// const AdminLoginPage = () => {
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };
  
//   const { userData } = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (userData) {
//       navigate("/admin/dashboard");
//     }
//   }, [userData, navigate]);

//   const handleSubmit = async(e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       const result = await axios.post(
//         ServerUrl + "/api/user/login",
//         { email: formData.email, password: formData.password },
//         { withCredentials: true }
//       );

//       dispatch(setUserData(result.data.user)); 
//       setFormData({ email: '', password: '' });
//       toast.success("Login successful!");
//       navigate("/admin/dashboard");
//       setIsLoading(false);
//     } catch (error) {
//       setIsLoading(false);
//       if (error.response) {
//         toast.error(error.response.data.message);
//       } else if (error.request) {
//         toast.error("Network error. Please check your connection and try again.");
//       } else {
//         toast.error("An unexpected error occurred. Please try again.");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600;1,700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

//         :root {
//           --primary:   #D81B4A;
//           --primary-d: #B0153D;
//           --secondary: #8AAE3B;
//           --accent:    #E8B21C;
//           --navy:      #1E293B;
//           --warm:      #FAFAF7;
//           --display:   'Cormorant Garamond', Georgia, serif;
//           --body:      'DM Sans', sans-serif;
//         }

//         .al-root { font-family: var(--body); min-height: 100vh; background: var(--warm); }

//         /* ── header ── */
//         .al-header {
//           position: fixed; top: 0; left: 0; width: 100%;
//           background: rgba(250,250,247,0.92);
//           backdrop-filter: blur(14px);
//           border-bottom: 1px solid rgba(30,41,59,0.08);
//           box-shadow: 0 1px 16px rgba(216,27,74,0.04);
//           z-index: 50;
//         }
//         .al-header-inner {
//           max-width: 1280px; margin: 0 auto;
//           padding: 0 16px; height: 64px;
//           display: flex; align-items: center; justify-content: space-between;
//         }
//         @media (min-width: 480px) {
//           .al-header-inner { padding: 0 20px; height: 68px; }
//         }
//         @media (min-width: 640px) {
//           .al-header-inner { padding: 0 24px; height: 72px; }
//         }

//         /* brand */
//         .al-brand { display: flex; align-items: center; gap: 8px; text-decoration: none; }
//         @media (min-width: 480px) {
//           .al-brand { gap: 10px; }
//         }
//         @media (min-width: 640px) {
//           .al-brand { gap: 12px; }
//         }
//         .al-brand-logo {
//           width: 36px; height: 36px; border-radius: 50%; overflow: hidden; flex-shrink: 0;
//           box-shadow: 0 4px 16px rgba(216,27,74,0.14);
//           transition: transform 0.28s;
//         }
//         @media (min-width: 480px) {
//           .al-brand-logo { width: 40px; height: 40px; }
//         }
//         @media (min-width: 640px) {
//           .al-brand-logo { width: 44px; height: 44px; }
//         }
//         .al-brand:hover .al-brand-logo { transform: scale(1.06); }
//         .al-brand-logo img { width: 100%; height: 100%; object-fit: contain; }

//         .al-brand-name {
//           font-family: var(--display);
//           font-size: clamp(0.85rem, 2vw, 1.05rem);
//           font-weight: 600;
//           color: var(--navy);
//           letter-spacing: -0.01em;
//           line-height: 1.2;
//         }
//         .al-brand:hover .al-brand-name { color: var(--primary); }
//         .al-brand-tag {
//           font-family: var(--body);
//           font-size: 8px; font-weight: 600;
//           letter-spacing: 0.16em; text-transform: uppercase;
//           color: var(--primary); display: block; margin-top: 2px; opacity: 0.75;
//         }
//         @media (min-width: 480px) {
//           .al-brand-tag { font-size: 9px; letter-spacing: 0.17em; }
//         }
//         @media (min-width: 640px) {
//           .al-brand-tag { font-size: 9.5px; letter-spacing: 0.18em; }
//         }

//         /* home btn */
//         .al-home-btn {
//           display: inline-flex; align-items: center; gap: 5px;
//           padding: 7px 12px; border-radius: 8px;
//           font-size: 12px; font-weight: 500; color: #64748B;
//           text-decoration: none; border: 1px solid rgba(30,41,59,0.08);
//           background: #FFFFFF; transition: all 0.22s;
//           white-space: nowrap;
//         }
//         @media (min-width: 480px) {
//           .al-home-btn { padding: 8px 14px; font-size: 12.5px; gap: 6px; border-radius: 9px; }
//         }
//         @media (min-width: 640px) {
//           .al-home-btn { padding: 8px 16px; font-size: 13px; gap: 7px; border-radius: 10px; }
//         }
//         .al-home-btn:hover { color: var(--primary); border-color: rgba(216,27,74,0.22); background: #FCE4E8; }

//         /* ── layout ── */
//         .al-body { 
//           display: flex; min-height: calc(100vh - 64px); 
//           padding-top: 64px; 
//         }
//         @media (min-width: 480px) {
//           .al-body { min-height: calc(100vh - 68px); padding-top: 68px; }
//         }
//         @media (min-width: 640px) {
//           .al-body { min-height: calc(100vh - 72px); padding-top: 72px; }
//         }

//         /* ── left panel ── */
//         .al-left {
//           display: none;
//           width: 50%;
//           background: linear-gradient(135deg, var(--primary) 0%, var(--primary-d) 100%);
//           position: relative; overflow: hidden;
//           flex-direction: column; align-items: center; justify-content: center;
//           padding: 40px;
//         }
//         @media (min-width: 1024px) { .al-left { display: flex; padding: 56px; } }

//         .al-left-scrim {
//           position: absolute; inset: 0;
//           background: rgba(0,0,0,0.12); pointer-events: none;
//         }
//         /* decorative blobs */
//         .al-blob-1 {
//           position: absolute; top: -60px; right: -60px;
//           width: 200px; height: 200px; border-radius: 50%;
//           background: rgba(255,255,255,0.05); pointer-events: none;
//         }
//         @media (min-width: 1024px) {
//           .al-blob-1 { top: -80px; right: -80px; width: 260px; height: 260px; }
//         }
//         .al-blob-2 {
//           position: absolute; bottom: -40px; left: -40px;
//           width: 150px; height: 150px; border-radius: 50%;
//           background: rgba(138,174,59,0.08); pointer-events: none;
//         }
//         @media (min-width: 1024px) {
//           .al-blob-2 { bottom: -60px; left: -60px; width: 200px; height: 200px; }
//         }

//         .al-left-content { position: relative; z-index: 2; max-width: 400px; text-align: center; }

//         .al-left-icon-wrap {
//           width: 64px; height: 64px; border-radius: 50%;
//           background: rgba(255,255,255,0.16);
//           backdrop-filter: blur(8px);
//           display: flex; align-items: center; justify-content: center;
//           margin: 0 auto 20px; color: #FFFFFF;
//           box-shadow: 0 8px 32px rgba(0,0,0,0.12);
//         }
//         @media (min-width: 1024px) {
//           .al-left-icon-wrap { width: 80px; height: 80px; margin-bottom: 28px; }
//         }

//         /* Cormorant for the big left title */
//         .al-left-title {
//           font-family: var(--display);
//           font-size: clamp(1.8rem, 2.5vw, 2.5rem);
//           font-weight: 600; font-style: italic;
//           color: #FFFFFF; line-height: 1.15;
//           letter-spacing: -0.02em; margin-bottom: 10px;
//         }
//         @media (min-width: 1024px) {
//           .al-left-title { margin-bottom: 14px; }
//         }
//         .al-left-sub {
//           font-size: 13.5px; color: rgba(255,255,255,0.78); 
//           line-height: 1.70; margin-bottom: 24px;
//         }
//         @media (min-width: 1024px) {
//           .al-left-sub { font-size: 15px; margin-bottom: 32px; }
//         }

//         .al-feature {
//           display: flex; align-items: flex-start; gap: 12px;
//           background: rgba(255,255,255,0.10);
//           backdrop-filter: blur(6px);
//           border: 1px solid rgba(255,255,255,0.14);
//           border-radius: 12px; padding: 14px 15px;
//           text-align: left; margin-bottom: 10px;
//         }
//         @media (min-width: 1024px) {
//           .al-feature { gap: 14px; border-radius: 14px; padding: 16px 18px; margin-bottom: 12px; }
//         }
//         .al-feature-icon { color: rgba(255,255,255,0.80); flex-shrink: 0; margin-top: 2px; }
//         .al-feature-title {
//           font-family: var(--display);
//           font-size: 0.95rem; font-style: italic; font-weight: 600;
//           color: #FFFFFF; margin-bottom: 2px;
//         }
//         @media (min-width: 1024px) {
//           .al-feature-title { font-size: 1.05rem; margin-bottom: 3px; }
//         }
//         .al-feature-body { 
//           font-size: 12px; color: rgba(255,255,255,0.72); 
//           line-height: 1.60; 
//         }
//         @media (min-width: 1024px) {
//           .al-feature-body { font-size: 13px; }
//         }

//         /* ── right form panel ── */
//         .al-right {
//           width: 100%; display: flex;
//           align-items: center; justify-content: center;
//           padding: 32px 16px; background: var(--warm);
//         }
//         @media (min-width: 480px) {
//           .al-right { padding: 36px 20px; }
//         }
//         @media (min-width: 640px) {
//           .al-right { padding: 40px 24px; }
//         }
//         @media (min-width: 1024px) { .al-right { width: 50%; } }

//         .al-form-wrap { width: 100%; max-width: 420px; }

//         /* form header */
//         .al-form-icon-wrap {
//           width: 52px; height: 52px; border-radius: 50%;
//           background: linear-gradient(135deg, var(--primary), var(--primary-d));
//           display: flex; align-items: center; justify-content: center;
//           margin: 0 auto 16px;
//           box-shadow: 0 10px 28px rgba(216,27,74,0.22);
//         }
//         @media (min-width: 480px) {
//           .al-form-icon-wrap { width: 58px; height: 58px; margin-bottom: 18px; }
//         }
//         @media (min-width: 640px) {
//           .al-form-icon-wrap { width: 64px; height: 64px; margin-bottom: 22px; }
//         }
//         .al-form-title {
//           font-family: var(--display);
//           font-size: clamp(1.5rem, 3vw, 2rem);
//           font-weight: 600; font-style: italic;
//           color: var(--navy); letter-spacing: -0.02em;
//           margin-bottom: 4px; text-align: center;
//         }
//         @media (min-width: 480px) {
//           .al-form-title { margin-bottom: 6px; }
//         }
//         .al-form-sub {
//           font-size: 12.5px; color: #64748B;
//           text-align: center; margin-bottom: 24px; line-height: 1.60;
//         }
//         @media (min-width: 480px) {
//           .al-form-sub { font-size: 13.5px; margin-bottom: 28px; }
//         }
//         @media (min-width: 640px) {
//           .al-form-sub { margin-bottom: 32px; }
//         }

//         /* form fields */
//         .al-field { margin-bottom: 16px; }
//         @media (min-width: 480px) {
//           .al-field { margin-bottom: 18px; }
//         }
//         @media (min-width: 640px) {
//           .al-field { margin-bottom: 20px; }
//         }
//         .al-label {
//           display: block; font-size: 10.5px; font-weight: 600;
//           color: #475569; letter-spacing: 0.04em; text-transform: uppercase;
//           margin-bottom: 6px;
//         }
//         @media (min-width: 480px) {
//           .al-label { font-size: 11px; letter-spacing: 0.05em; margin-bottom: 7px; }
//         }
//         @media (min-width: 640px) {
//           .al-label { font-size: 11.5px; }
//         }
//         .al-input-wrap { position: relative; }
//         .al-input-icon {
//           position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
//           color: #94A3B8; pointer-events: none;
//         }
//         @media (min-width: 480px) {
//           .al-input-icon { left: 14px; }
//         }
//         .al-input {
//           width: 100%; padding: 11px 12px 11px 38px;
//           border: 1.5px solid #E2E8F0;
//           border-radius: 10px; font-size: 13px; color: var(--navy);
//           font-family: var(--body); outline: none;
//           background: #FFFFFF;
//           transition: border-color 0.22s, box-shadow 0.22s, background 0.18s;
//         }
//         @media (min-width: 480px) {
//           .al-input { padding: 11px 13px 11px 40px; font-size: 13.5px; border-radius: 11px; }
//         }
//         @media (min-width: 640px) {
//           .al-input { padding: 12px 14px 12px 42px; font-size: 14px; border-radius: 12px; }
//         }
//         .al-input:focus {
//           border-color: var(--primary);
//           box-shadow: 0 0 0 3px rgba(216,27,74,0.08);
//           background: #FFFFFF;
//         }
//         .al-input::placeholder { color: #CBD5E1; }

//         .al-pw-toggle {
//           position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
//           color: #94A3B8; cursor: pointer; background: none; border: none; padding: 0;
//           transition: color 0.18s;
//         }
//         @media (min-width: 480px) {
//           .al-pw-toggle { right: 14px; }
//         }
//         .al-pw-toggle:hover { color: var(--primary); }

//         /* divider */
//         .al-divider {
//           height: 1px; margin: 2px 0 16px;
//           background: linear-gradient(to right, transparent, #E2E8F0 30%, #E2E8F0 70%, transparent);
//         }
//         @media (min-width: 480px) {
//           .al-divider { margin: 4px 0 18px; }
//         }
//         @media (min-width: 640px) {
//           .al-divider { margin: 4px 0 20px; }
//         }

//         /* submit */
//         .al-submit {
//           width: 100%; padding: 12px 20px;
//           border-radius: 10px; border: none; cursor: pointer;
//           background: linear-gradient(135deg, var(--primary) 0%, var(--primary-d) 100%);
//           color: #FFFFFF; font-size: 13.5px; font-weight: 700;
//           font-family: var(--body);
//           display: flex; align-items: center; justify-content: center; gap: 7px;
//           box-shadow: 0 12px 32px rgba(216,27,74,0.24);
//           transition: transform 0.22s, box-shadow 0.22s, opacity 0.2s;
//           letter-spacing: 0.02em;
//         }
//         @media (min-width: 480px) {
//           .al-submit { padding: 13px 22px; font-size: 14px; gap: 8px; border-radius: 11px; }
//         }
//         @media (min-width: 640px) {
//           .al-submit { padding: 14px 24px; font-size: 14.5px; gap: 9px; border-radius: 12px; }
//         }
//         .al-submit:hover:not(:disabled) {
//           transform: translateY(-2px);
//           box-shadow: 0 18px 44px rgba(216,27,74,0.32);
//           background: linear-gradient(135deg, var(--primary-d) 0%, #9A0F30 100%);
//         }
//         .al-submit:disabled { opacity: 0.60; cursor: not-allowed; }

//         .al-spinner {
//           width: 15px; height: 15px; border-radius: 50%;
//           border: 2.5px solid rgba(255,255,255,0.32);
//           border-top-color: #FFFFFF;
//           animation: al-spin 0.8s linear infinite;
//         }
//         @media (min-width: 640px) {
//           .al-spinner { width: 17px; height: 17px; }
//         }
//         @keyframes al-spin { to { transform: rotate(360deg); } }

//         /* arrow animate */
//         .al-arrow { transition: transform 0.22s; }
//         .al-submit:hover:not(:disabled) .al-arrow { transform: translateX(4px); }

//         /* support */
//         .al-support {
//           margin-top: 20px; text-align: center;
//           font-size: 12px; color: #64748B;
//         }
//         @media (min-width: 480px) {
//           .al-support { margin-top: 24px; font-size: 13px; }
//         }
//         .al-support a {
//           color: var(--primary); font-weight: 600; text-decoration: none;
//           transition: color 0.20s;
//         }
//         .al-support a:hover { color: var(--primary-d); }

//         /* ── footer ── */
//         .al-footer {
//           background: #FFFFFF;
//           border-top: 1px solid rgba(30,41,59,0.08);
//           padding: 14px 16px;
//         }
//         @media (min-width: 480px) {
//           .al-footer { padding: 16px 20px; }
//         }
//         @media (min-width: 640px) {
//           .al-footer { padding: 18px 24px; }
//         }
//         .al-footer-inner {
//           max-width: 1280px; margin: 0 auto;
//           display: flex; flex-wrap: wrap;
//           align-items: center; justify-content: center;
//           gap: 8px; text-align: center;
//         }
//         @media (min-width: 480px) {
//           .al-footer-inner { justify-content: space-between; text-align: left; gap: 12px; }
//         }
//         .al-footer-brand { display: flex; align-items: center; gap: 8px; }
//         @media (min-width: 480px) {
//           .al-footer-brand { gap: 10px; }
//         }
//         @media (min-width: 640px) {
//           .al-footer-brand { gap: 12px; }
//         }
//         .al-footer-logo { 
//           width: 32px; height: 32px; border-radius: 50%; 
//           overflow: hidden; flex-shrink: 0;
//         }
//         @media (min-width: 480px) {
//           .al-footer-logo { width: 36px; height: 36px; }
//         }
//         @media (min-width: 640px) {
//           .al-footer-logo { width: 40px; height: 40px; }
//         }
//         .al-footer-logo img { width: 100%; height: 100%; object-fit: contain; }

//         .al-footer-name {
//           font-family: var(--display);
//           font-size: clamp(0.85rem, 1.5vw, 1.05rem);
//           font-weight: 600;
//           color: var(--navy);
//           letter-spacing: -0.01em;
//           line-height: 1.2;
//         }
//         .al-footer-tag {
//           font-size: 8.5px; font-weight: 600;
//           letter-spacing: 0.12em; text-transform: uppercase;
//           color: var(--primary); display: block; margin-top: 1px; opacity: 0.75;
//         }
//         @media (min-width: 480px) {
//           .al-footer-tag { font-size: 9.5px; letter-spacing: 0.13em; }
//         }
//         @media (min-width: 640px) {
//           .al-footer-tag { font-size: 10px; letter-spacing: 0.14em; }
//         }
//         .al-footer-copy {
//           font-size: 11.5px; color: #64748B;
//         }
//         @media (min-width: 480px) {
//           .al-footer-copy { font-size: 12.5px; }
//         }

//         /* ── Om motif ── */
//         .al-om {
//           position: absolute; bottom: 20px; right: 24px;
//           font-family: var(--display);
//           font-size: 4rem; font-style: italic;
//           color: rgba(255,255,255,0.05);
//           line-height: 1; pointer-events: none; user-select: none;
//           z-index: 1;
//         }
//         @media (min-width: 1024px) {
//           .al-om { bottom: 32px; right: 40px; font-size: 7rem; }
//         }
//       `}</style>

//       <div className="al-root">

//         {/* ── Header ── */}
//         <header className="al-header">
//           <div className="al-header-inner">
//             <Link to="/" className="al-brand">
//               <div className="al-brand-logo">
//                 <img src="/Adiyogi Foundation (1).jpeg" alt="Adiyogi Foundation Logo" />
//               </div>
//               <div>
//                 <span className="al-brand-name">Adiyogi Foundation</span>
//                 <span className="al-brand-tag">Bhakti · Prem · Samarpan</span>
//               </div>
//             </Link>

//             <Link to="/" className="al-home-btn">
//               <Home size={14} className="sm:w-[15px] sm:h-[15px]" />
//               <span className="hidden sm:inline">Home</span>
//             </Link>
//           </div>
//         </header>

//         {/* ── Body ── */}
//         <div className="al-body">

//           {/* Left panel */}
//           <div className="al-left">
//             <div className="al-left-scrim" />
//             <div className="al-blob-1" />
//             <div className="al-blob-2" />
//             <span className="al-om">ॐ</span>

//             <div className="al-left-content">
//               <div className="al-left-icon-wrap">
//                 <Shield size={28} className="lg:w-[36px] lg:h-[36px]" />
//               </div>

//               <h2 className="al-left-title">Admin CMS Portal</h2>
//               <p className="al-left-sub">
//                 Manage blogs, insights, and divine content for the Adiyogi community with care and purpose.
//               </p>

//               <div className="al-feature">
//                 <Users size={18} className="lg:w-[20px] lg:h-[20px] al-feature-icon" />
//                 <div>
//                   <p className="al-feature-title">Content Management</p>
//                   <p className="al-feature-body">Create, edit, and publish spiritual blogs and updates</p>
//                 </div>
//               </div>

//               <div className="al-feature">
//                 <Heart size={18} className="lg:w-[20px] lg:h-[20px] al-feature-icon" />
//                 <div>
//                   <p className="al-feature-title">Community Engagement</p>
//                   <p className="al-feature-body">Inspire and connect with seekers through shared wisdom</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right form */}
//           <div className="al-right">
//             <div className="al-form-wrap">
//               <div style={{ textAlign: "center", marginBottom: 0 }}>
//                 <div className="al-form-icon-wrap">
//                   <Lock size={24} color="#fff" className="sm:w-[26px] sm:h-[26px] lg:w-[28px] lg:h-[28px]" />
//                 </div>
//                 <h2 className="al-form-title">Admin Login</h2>
//                 <p className="al-form-sub">Sign in to begin your sacred duties</p>
//               </div>

//               {/* <div className="al-divider" /> */}

//               <form onSubmit={handleSubmit} noValidate>
//                 {/* email */}
//                 <div className="al-field">
//                   <label htmlFor="email" className="al-label">Email Address</label>
//                   <div className="al-input-wrap">
//                     <Mail size={15} className="sm:w-[16px] sm:h-[16px] al-input-icon" />
//                     <input
//                       id="email" name="email" type="email" required
//                       className="al-input"
//                       placeholder="admin@adiyogifoundation.org"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                 </div>

//                 {/* password */}
//                 <div className="al-field">
//                   <label htmlFor="password" className="al-label">Password</label>
//                   <div className="al-input-wrap">
//                     <Lock size={15} className="sm:w-[16px] sm:h-[16px] al-input-icon" />
//                     <input
//                       id="password" name="password"
//                       type={showPassword ? 'text' : 'password'}
//                       required
//                       className="al-input"
//                       style={{ paddingRight: "42px" }}
//                       placeholder="Enter your password"
//                       value={formData.password}
//                       onChange={handleInputChange}
//                     />
//                     <button
//                       type="button"
//                       className="al-pw-toggle"
//                       onClick={() => setShowPassword(s => !s)}
//                       aria-label={showPassword ? "Hide password" : "Show password"}
//                     >
//                       {showPassword ? <EyeOff size={16} className="sm:w-[17px] sm:h-[17px]" /> : <Eye size={16} className="sm:w-[17px] sm:h-[17px]" />}
//                     </button>
//                   </div>
//                 </div>

//                 {/* submit */}
//                 <button type="submit" className="al-submit">
//                   {isLoading ? (
//                     <>
//                       <div className="al-spinner" />
//                       Signing in…
//                     </>
//                   ) : (
//                     <>
//                       Sign in to Dashboard
//                       <ArrowRight size={15} className="sm:w-[16px] sm:h-[16px] al-arrow" />
//                     </>
//                   )}
//                 </button>
//               </form>

//               <p className="al-support">
//                 Need help? Contact{' '}
//                 <a href="mailto:support@adiyogifoundation.org">
//                   support@adiyogifoundation.org
//                 </a>
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* ── Footer ── */}
//         <footer className="al-footer">
//           <div className="al-footer-inner">
//             <div className="al-footer-brand">
//               <div className="al-footer-logo">
//                 <img src="/Adiyogi Foundation (1).jpeg" alt="Adiyogi Foundation Logo" />
//               </div>
//               <div>
//                 <span className="al-footer-name">Adiyogi Foundation</span>
//                 <span className="al-footer-tag">Bhakti · Prem · Samarpan</span>
//               </div>
//             </div>
//             <p className="al-footer-copy">© 2025 Adiyogi Foundation. All rights reserved.</p>
//           </div>
//         </footer>

//       </div>
//     </>
//   );
// };

// export default AdminLoginPage;



import React, { useEffect, useState, useCallback } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Home, Shield, Users, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUserData } from '../redux/userSlice';
import { ServerUrl } from '../App';

const AdminLoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userData) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [userData, navigate]);

  // Memoized input handler for better performance
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  // Toggle password visibility
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  // Form validation
  const validateForm = useCallback(() => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } 
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await axios.post(
        `${ServerUrl}/api/user/login`,
        { 
          email: formData.email.trim(), 
          password: formData.password 
        },
        { 
          withCredentials: true,
          timeout: 10000 // 10 second timeout
        }
      );

      if (result.data?.user) {
        dispatch(setUserData(result.data.user));
        setFormData({ email: '', password: '' });
        toast.success("Welcome back! Redirecting to dashboard...");
        
        // Small delay for toast to be visible
        setTimeout(() => {
          navigate("/admin/dashboard", { replace: true });
        }, 500);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Login error:", error);
      
      if (error.response) {
        // Server responded with error
        const message = error.response.data?.message || "Invalid credentials";
        toast.error(message);
        
        // Handle specific error cases
        if (error.response.status === 401) {
          setErrors({ password: 'Invalid email or password' });
        } else if (error.response.status === 429) {
          toast.error("Too many attempts. Please try again later.");
        }
      } else if (error.request) {
        // Network error
        toast.error("Network error. Please check your connection.");
      } else {
        // Other errors
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [formData, validateForm, dispatch, navigate]);

  // Handle keyboard shortcut for submit
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && !isLoading) {
        const form = document.getElementById('login-form');
        if (form) form.requestSubmit();
      }
    };
    
    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [isLoading]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600;1,700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        :root {
          --primary:   #D81B4A;
          --primary-d: #B0153D;
          --secondary: #8AAE3B;
          --accent:    #E8B21C;
          --navy:      #1E293B;
          --warm:      #FAFAF7;
          --display:   'Cormorant Garamond', Georgia, serif;
          --body:      'DM Sans', sans-serif;
        }

        .al-root { 
          font-family: var(--body); 
          min-height: 100vh; 
          background: var(--warm);
          display: flex;
          flex-direction: column;
        }

        /* ── header ── */
        .al-header {
          position: fixed; top: 0; left: 0; width: 100%;
          background: rgba(250,250,247,0.92);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(30,41,59,0.08);
          box-shadow: 0 1px 16px rgba(216,27,74,0.04);
          z-index: 50;
        }
        .al-header-inner {
          max-width: 1280px; margin: 0 auto;
          padding: 0 16px; height: 64px;
          display: flex; align-items: center; justify-content: space-between;
        }
        @media (min-width: 480px) {
          .al-header-inner { padding: 0 20px; height: 68px; }
        }
        @media (min-width: 640px) {
          .al-header-inner { padding: 0 24px; height: 72px; }
        }

        /* brand */
        .al-brand { 
          display: flex; align-items: center; gap: 8px; 
          text-decoration: none; transition: opacity 0.2s;
        }
        .al-brand:hover { opacity: 0.85; }
        @media (min-width: 480px) { .al-brand { gap: 10px; } }
        @media (min-width: 640px) { .al-brand { gap: 12px; } }
        
        .al-brand-logo {
          width: 36px; height: 36px; border-radius: 50%; overflow: hidden; flex-shrink: 0;
          box-shadow: 0 4px 16px rgba(216,27,74,0.14);
          transition: transform 0.28s;
        }
        @media (min-width: 480px) { .al-brand-logo { width: 40px; height: 40px; } }
        @media (min-width: 640px) { .al-brand-logo { width: 44px; height: 44px; } }
        .al-brand:hover .al-brand-logo { transform: scale(1.06); }
        .al-brand-logo img { width: 100%; height: 100%; object-fit: contain; }

        .al-brand-name {
          font-family: var(--display);
          font-size: clamp(0.85rem, 2vw, 1.05rem);
          font-weight: 600;
          color: var(--navy);
          letter-spacing: -0.01em;
          line-height: 1.2;
        }
        .al-brand-tag {
          font-family: var(--body);
          font-size: 8px; font-weight: 600;
          letter-spacing: 0.16em; text-transform: uppercase;
          color: var(--primary); display: block; margin-top: 2px; opacity: 0.75;
        }
        @media (min-width: 480px) { .al-brand-tag { font-size: 9px; } }
        @media (min-width: 640px) { .al-brand-tag { font-size: 9.5px; } }

        /* home btn */
        .al-home-btn {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 7px 12px; border-radius: 8px;
          font-size: 12px; font-weight: 500; color: #64748B;
          text-decoration: none; border: 1px solid rgba(30,41,59,0.08);
          background: #FFFFFF; transition: all 0.22s;
          white-space: nowrap;
        }
        @media (min-width: 480px) { .al-home-btn { padding: 8px 14px; font-size: 12.5px; gap: 6px; } }
        @media (min-width: 640px) { .al-home-btn { padding: 8px 16px; font-size: 13px; gap: 7px; } }
        .al-home-btn:hover { 
          color: var(--primary); 
          border-color: rgba(216,27,74,0.22); 
          background: #FCE4E8; 
        }

        /* ── layout ── */
        .al-body { 
          flex: 1;
          display: flex; 
          padding-top: 64px; 
        }
        @media (min-width: 480px) { .al-body { padding-top: 68px; } }
        @media (min-width: 640px) { .al-body { padding-top: 72px; } }

        /* ── left panel ── */
        .al-left {
          display: none;
          width: 50%;
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-d) 100%);
          position: relative; overflow: hidden;
          flex-direction: column; align-items: center; justify-content: center;
          padding: 40px;
        }
        @media (min-width: 1024px) { 
          .al-left { 
            display: flex; 
            padding: 56px; 
            min-height: 100%;
          } 
        }

        .al-left-scrim {
          position: absolute; inset: 0;
          background: rgba(0,0,0,0.12); pointer-events: none;
        }
        
        /* decorative blobs */
        .al-blob-1 {
          position: absolute; top: -60px; right: -60px;
          width: 200px; height: 200px; border-radius: 50%;
          background: rgba(255,255,255,0.05); pointer-events: none;
        }
        @media (min-width: 1024px) {
          .al-blob-1 { top: -80px; right: -80px; width: 260px; height: 260px; }
        }
        .al-blob-2 {
          position: absolute; bottom: -40px; left: -40px;
          width: 150px; height: 150px; border-radius: 50%;
          background: rgba(138,174,59,0.08); pointer-events: none;
        }
        @media (min-width: 1024px) {
          .al-blob-2 { bottom: -60px; left: -60px; width: 200px; height: 200px; }
        }

        .al-left-content { 
          position: relative; z-index: 2; 
          max-width: 400px; text-align: center; 
        }

        .al-left-icon-wrap {
          width: 64px; height: 64px; border-radius: 50%;
          background: rgba(255,255,255,0.16);
          backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 20px; color: #FFFFFF;
          box-shadow: 0 8px 32px rgba(0,0,0,0.12);
          animation: float 3s ease-in-out infinite;
        }
        @media (min-width: 1024px) {
          .al-left-icon-wrap { width: 80px; height: 80px; margin-bottom: 28px; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .al-left-title {
          font-family: var(--display);
          font-size: clamp(1.8rem, 2.5vw, 2.5rem);
          font-weight: 600; font-style: italic;
          color: #FFFFFF; line-height: 1.15;
          letter-spacing: -0.02em; margin-bottom: 10px;
        }
        @media (min-width: 1024px) { .al-left-title { margin-bottom: 14px; } }
        
        .al-left-sub {
          font-size: 13.5px; color: rgba(255,255,255,0.78); 
          line-height: 1.70; margin-bottom: 24px;
        }
        @media (min-width: 1024px) { .al-left-sub { font-size: 15px; margin-bottom: 32px; } }

        .al-feature {
          display: flex; align-items: flex-start; gap: 12px;
          background: rgba(255,255,255,0.10);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 12px; padding: 14px 15px;
          text-align: left; margin-bottom: 10px;
          transition: transform 0.3s, background 0.3s;
        }
        .al-feature:hover {
          background: rgba(255,255,255,0.15);
          transform: translateX(4px);
        }
        @media (min-width: 1024px) {
          .al-feature { gap: 14px; border-radius: 14px; padding: 16px 18px; margin-bottom: 12px; }
        }
        .al-feature-icon { color: rgba(255,255,255,0.80); flex-shrink: 0; margin-top: 2px; }
        .al-feature-title {
          font-family: var(--display);
          font-size: 0.95rem; font-style: italic; font-weight: 600;
          color: #FFFFFF; margin-bottom: 2px;
        }
        @media (min-width: 1024px) { .al-feature-title { font-size: 1.05rem; margin-bottom: 3px; } }
        .al-feature-body { 
          font-size: 12px; color: rgba(255,255,255,0.72); 
          line-height: 1.60; 
        }
        @media (min-width: 1024px) { .al-feature-body { font-size: 13px; } }

        /* ── right form panel ── */
        .al-right {
          width: 100%; display: flex;
          align-items: center; justify-content: center;
          padding: 32px 16px; background: var(--warm);
        }
        @media (min-width: 480px) { .al-right { padding: 36px 20px; } }
        @media (min-width: 640px) { .al-right { padding: 40px 24px; } }
        @media (min-width: 1024px) { .al-right { width: 50%; } }

        .al-form-wrap { width: 100%; max-width: 420px; }

        /* form header */
        .al-form-icon-wrap {
          width: 52px; height: 52px; border-radius: 50%;
          background: linear-gradient(135deg, var(--primary), var(--primary-d));
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 16px;
          box-shadow: 0 10px 28px rgba(216,27,74,0.22);
        }
        @media (min-width: 480px) { .al-form-icon-wrap { width: 58px; height: 58px; margin-bottom: 18px; } }
        @media (min-width: 640px) { .al-form-icon-wrap { width: 64px; height: 64px; margin-bottom: 22px; } }
        
        .al-form-title {
          font-family: var(--display);
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 600; font-style: italic;
          color: var(--navy); letter-spacing: -0.02em;
          margin-bottom: 4px; text-align: center;
        }
        @media (min-width: 480px) { .al-form-title { margin-bottom: 6px; } }
        
        .al-form-sub {
          font-size: 12.5px; color: #64748B;
          text-align: center; margin-bottom: 24px; line-height: 1.60;
        }
        @media (min-width: 480px) { .al-form-sub { font-size: 13.5px; margin-bottom: 28px; } }
        @media (min-width: 640px) { .al-form-sub { margin-bottom: 32px; } }

        /* form fields */
        .al-field { margin-bottom: 16px; }
        @media (min-width: 480px) { .al-field { margin-bottom: 18px; } }
        @media (min-width: 640px) { .al-field { margin-bottom: 20px; } }
        
        .al-label {
          display: block; font-size: 10.5px; font-weight: 600;
          color: #475569; letter-spacing: 0.04em; text-transform: uppercase;
          margin-bottom: 6px;
        }
        @media (min-width: 480px) { .al-label { font-size: 11px; letter-spacing: 0.05em; margin-bottom: 7px; } }
        @media (min-width: 640px) { .al-label { font-size: 11.5px; } }
        
        .al-input-wrap { position: relative; }
        
        .al-input-icon {
          position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
          color: #94A3B8; pointer-events: none; z-index: 1;
        }
        @media (min-width: 480px) { .al-input-icon { left: 14px; } }
        
        .al-input {
          width: 100%; padding: 11px 12px 11px 38px;
          border: 1.5px solid #E2E8F0;
          border-radius: 10px; font-size: 13px; color: var(--navy);
          font-family: var(--body); outline: none;
          background: #FFFFFF;
          transition: border-color 0.22s, box-shadow 0.22s, background 0.18s;
        }
        .al-input.error {
          border-color: #EF4444;
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.08);
        }
        @media (min-width: 480px) { .al-input { padding: 11px 13px 11px 40px; font-size: 13.5px; border-radius: 11px; } }
        @media (min-width: 640px) { .al-input { padding: 12px 14px 12px 42px; font-size: 14px; border-radius: 12px; } }
        .al-input:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(216,27,74,0.08);
          background: #FFFFFF;
        }
        .al-input::placeholder { color: #CBD5E1; }

        .al-error-message {
          font-size: 10px; color: #EF4444;
          margin-top: 4px; font-weight: 500;
        }
        @media (min-width: 480px) { .al-error-message { font-size: 11px; } }

        .al-pw-toggle {
          position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
          color: #94A3B8; cursor: pointer; background: none; border: none; padding: 4px;
          transition: color 0.18s; z-index: 2;
        }
        @media (min-width: 480px) { .al-pw-toggle { right: 14px; } }
        .al-pw-toggle:hover { color: var(--primary); }

        /* submit */
        .al-submit {
          width: 100%; padding: 12px 20px;
          border-radius: 10px; border: none; cursor: pointer;
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-d) 100%);
          color: #FFFFFF; font-size: 13.5px; font-weight: 700;
          font-family: var(--body);
          display: flex; align-items: center; justify-content: center; gap: 7px;
          box-shadow: 0 12px 32px rgba(216,27,74,0.24);
          transition: transform 0.22s, box-shadow 0.22s, opacity 0.2s;
          letter-spacing: 0.02em;
        }
        @media (min-width: 480px) { .al-submit { padding: 13px 22px; font-size: 14px; gap: 8px; border-radius: 11px; } }
        @media (min-width: 640px) { .al-submit { padding: 14px 24px; font-size: 14.5px; gap: 9px; border-radius: 12px; } }
        .al-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 18px 44px rgba(216,27,74,0.32);
          background: linear-gradient(135deg, var(--primary-d) 0%, #9A0F30 100%);
        }
        .al-submit:disabled { opacity: 0.60; cursor: not-allowed; }

        .al-spinner {
          width: 15px; height: 15px; border-radius: 50%;
          border: 2.5px solid rgba(255,255,255,0.32);
          border-top-color: #FFFFFF;
          animation: al-spin 0.8s linear infinite;
        }
        @media (min-width: 640px) { .al-spinner { width: 17px; height: 17px; } }
        @keyframes al-spin { to { transform: rotate(360deg); } }

        /* arrow animate */
        .al-arrow { transition: transform 0.22s; }
        .al-submit:hover:not(:disabled) .al-arrow { transform: translateX(4px); }

        /* support */
        .al-support {
          margin-top: 20px; text-align: center;
          font-size: 12px; color: #64748B;
        }
        @media (min-width: 480px) { .al-support { margin-top: 24px; font-size: 13px; } }
        .al-support a {
          color: var(--primary); font-weight: 600; text-decoration: none;
          transition: color 0.20s;
        }
        .al-support a:hover { color: var(--primary-d); }

        /* ── footer ── */
        .al-footer {
          background: #FFFFFF;
          border-top: 1px solid rgba(30,41,59,0.08);
          padding: 14px 16px;
          margin-top: auto;
        }
        @media (min-width: 480px) { .al-footer { padding: 16px 20px; } }
        @media (min-width: 640px) { .al-footer { padding: 18px 24px; } }
        
        .al-footer-inner {
          max-width: 1280px; margin: 0 auto;
          display: flex; flex-wrap: wrap;
          align-items: center; justify-content: center;
          gap: 8px; text-align: center;
        }
        @media (min-width: 480px) {
          .al-footer-inner { justify-content: space-between; text-align: left; gap: 12px; }
        }
        
        .al-footer-brand { display: flex; align-items: center; gap: 8px; }
        @media (min-width: 480px) { .al-footer-brand { gap: 10px; } }
        @media (min-width: 640px) { .al-footer-brand { gap: 12px; } }
        
        .al-footer-logo { 
          width: 32px; height: 32px; border-radius: 50%; 
          overflow: hidden; flex-shrink: 0;
        }
        @media (min-width: 480px) { .al-footer-logo { width: 36px; height: 36px; } }
        @media (min-width: 640px) { .al-footer-logo { width: 40px; height: 40px; } }
        .al-footer-logo img { width: 100%; height: 100%; object-fit: contain; }

        .al-footer-name {
          font-family: var(--display);
          font-size: clamp(0.85rem, 1.5vw, 1.05rem);
          font-weight: 600;
          color: var(--navy);
          letter-spacing: -0.01em;
          line-height: 1.2;
        }
        .al-footer-tag {
          font-size: 8.5px; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--primary); display: block; margin-top: 1px; opacity: 0.75;
        }
        @media (min-width: 480px) { .al-footer-tag { font-size: 9.5px; } }
        @media (min-width: 640px) { .al-footer-tag { font-size: 10px; } }
        
        .al-footer-copy {
          font-size: 11.5px; color: #64748B;
        }
        @media (min-width: 480px) { .al-footer-copy { font-size: 12.5px; } }

        /* ── Om motif ── */
        .al-om {
          position: absolute; bottom: 20px; right: 24px;
          font-family: var(--display);
          font-size: 4rem; font-style: italic;
          color: rgba(255,255,255,0.05);
          line-height: 1; pointer-events: none; user-select: none;
          z-index: 1;
        }
        @media (min-width: 1024px) {
          .al-om { bottom: 32px; right: 40px; font-size: 7rem; }
        }
      `}</style>

      <div className="al-root">

        {/* ── Header ── */}
        <header className="al-header">
          <div className="al-header-inner">
            <Link to="/" className="al-brand">
              <div className="al-brand-logo">
                <img src="/Adiyogi Foundation (1).jpeg" alt="Adiyogi Foundation Logo" />
              </div>
              <div>
                <span className="al-brand-name">Adiyogi Foundation</span>
                <span className="al-brand-tag">Bhakti · Prem · Samarpan</span>
              </div>
            </Link>

            <Link to="/" className="al-home-btn">
              <Home size={14} className="sm:w-[15px] sm:h-[15px]" />
              <span className="hidden sm:inline">Home</span>
            </Link>
          </div>
        </header>

        {/* ── Body ── */}
        <div className="al-body">

          {/* Left panel */}
          <div className="al-left">
            <div className="al-left-scrim" />
            <div className="al-blob-1" />
            <div className="al-blob-2" />
            <span className="al-om">ॐ</span>

            <div className="al-left-content">
              <div className="al-left-icon-wrap">
                <Shield size={28} className="lg:w-[36px] lg:h-[36px]" />
              </div>

              <h2 className="al-left-title">Admin CMS Portal</h2>
              <p className="al-left-sub">
                Manage blogs, insights, and divine content for the Adiyogi community with care and purpose.
              </p>

              <div className="al-feature">
                <Users size={18} className="lg:w-[20px] lg:h-[20px] al-feature-icon" />
                <div>
                  <p className="al-feature-title">Content Management</p>
                  <p className="al-feature-body">Create, edit, and publish spiritual blogs and updates</p>
                </div>
              </div>

              <div className="al-feature">
                <Heart size={18} className="lg:w-[20px] lg:h-[20px] al-feature-icon" />
                <div>
                  <p className="al-feature-title">Community Engagement</p>
                  <p className="al-feature-body">Inspire and connect with seekers through shared wisdom</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="al-right">
            <div className="al-form-wrap">
              <div style={{ textAlign: "center", marginBottom: 0 }}>
                <div className="al-form-icon-wrap">
                  <Lock size={24} color="#fff" className="sm:w-[26px] sm:h-[26px] lg:w-[28px] lg:h-[28px]" />
                </div>
                <h2 className="al-form-title">Admin Login</h2>
                <p className="al-form-sub">Sign in to begin your sacred duties</p>
              </div>

              <form id="login-form" onSubmit={handleSubmit} noValidate>
                {/* email */}
                <div className="al-field">
                  <label htmlFor="email" className="al-label">Email Address</label>
                  <div className="al-input-wrap">
                    <Mail size={15} className="sm:w-[16px] sm:h-[16px] al-input-icon" />
                    <input
                      id="email" 
                      name="email" 
                      type="email" 
                      required
                      className={`al-input ${errors.email ? 'error' : ''}`}
                      placeholder="admin@adiyogifoundation.org"
                      value={formData.email}
                      onChange={handleInputChange}
                      autoComplete="email"
                      disabled={isLoading}
                    />
                  </div>
                  {errors.email && <p className="al-error-message">{errors.email}</p>}
                </div>

                {/* password */}
                <div className="al-field">
                  <label htmlFor="password" className="al-label">Password</label>
                  <div className="al-input-wrap">
                    <Lock size={15} className="sm:w-[16px] sm:h-[16px] al-input-icon" />
                    <input
                      id="password" 
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      className={`al-input ${errors.password ? 'error' : ''}`}
                      style={{ paddingRight: "42px" }}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                      autoComplete="current-password"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      className="al-pw-toggle"
                      onClick={togglePasswordVisibility}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff size={16} className="sm:w-[17px] sm:h-[17px]" /> : <Eye size={16} className="sm:w-[17px] sm:h-[17px]" />}
                    </button>
                  </div>
                  {errors.password && <p className="al-error-message">{errors.password}</p>}
                </div>

                {/* submit */}
                <button 
                  type="submit" 
                  className="al-submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="al-spinner" />
                      Signing in…
                    </>
                  ) : (
                    <>
                      Sign in to Dashboard
                      <ArrowRight size={15} className="sm:w-[16px] sm:h-[16px] al-arrow" />
                    </>
                  )}
                </button>
              </form>

              <p className="al-support">
                Need help? Contact{' '}
                <a href="mailto:support@adiyogifoundation.org">
                  support@adiyogifoundation.org
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <footer className="al-footer">
          <div className="al-footer-inner">
            <div className="al-footer-brand">
              <div className="al-footer-logo">
                <img src="/Adiyogi Foundation (1).jpeg" alt="Adiyogi Foundation Logo" />
              </div>
              <div>
                <span className="al-footer-name">Adiyogi Foundation</span>
                <span className="al-footer-tag">Bhakti · Prem · Samarpan</span>
              </div>
            </div>
            <p className="al-footer-copy">© 2025 Adiyogi Foundation. All rights reserved.</p>
          </div>
        </footer>

      </div>
    </>
  );
};

export default AdminLoginPage;