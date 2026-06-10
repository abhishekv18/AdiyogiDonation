
// import React, { useEffect, useState } from "react";
// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
//   Line,
//   LineChart,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts";
// import {
//   Bell,
//   ChevronDown,
//   Eye,
//   Heart,
//   ImagePlus,
//   LayoutDashboard,
//   LogOut,
//   Mail,
//   Menu,
//   Plus,
//   Search,
//   Shield,
//   ShieldCheck,
//   Sparkles,
//   Trash2,
//   UploadCloud,
//   X,
//   IndianRupee,
//   TrendingUp,
//   Users,
//   ChevronLeft, ChevronRight, MapPin, Phone, User
// } from "lucide-react";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
// import { setUserData } from "../redux/userSlice";

// //const ServerUrl = "http://localhost:8000";
// const ServerUrl = "https://adiyogidonation.onrender.com";
// const monthLabels = [
//   "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//   "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
// ];

// // const navItems = [
// //   { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
// //   { id: "contacts", label: "Contact Messages", icon: Mail },
// //   { id: "donors", label: "Donors", icon: Heart },
// //   { id: "gallery", label: "Gallery", icon: ImagePlus },
// //   { id: "sponsors", label: "Sponsors", icon: Sparkles },
// //   { id: "admins", label: "Admins", icon: Shield },
// // ];
// const navItems = [
//   { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
//   { id: "contacts", label: "Contact Messages", icon: Mail },
//   { id: "donors", label: "Donors", icon: Heart },
//   { id: "guests", label: "Guests", icon: Users }, // Add this line
//   { id: "gallery", label: "Gallery", icon: ImagePlus },
//   { id: "sponsors", label: "Sponsors", icon: Sparkles },
//   { id: "admins", label: "Admins", icon: Shield },
// ];
// const endpoints = {
//   currentUser: "/api/user/current-user",
//   logout: "/api/user/logout",
//   admins: "/api/user/get-user",
//   addAdmin: "/api/user/admin-register",
//   deleteAdmin: "/api/user/delete-user",
//   contacts: "/api/contact/get-contacts",
//   deleteContact: "/api/contact/delete-contact",
//   donors: "/api/payment/donors",
//   gallery: "/api/gallery/get",
//   addGallery: "/api/gallery/add",
//   uploadImage: "/api/gallery/upload-image",
//   deleteGallery: "/api/gallery/delete",
//   sponsors: "/api/sponsor/get",
//   addSponsor: "/api/sponsor/add",
//   deleteSponsor: "/api/sponsor/delete",
//   sponsorUpload: "/api/sponsor/upload-image",
//    guests: "/api/guest/get",
//   addGuest: "/api/guest/add",
//   deleteGuest: "/api/guest/delete",
// };

// // Professional Green Palette
// const COLORS = {
//   primary: '#0F766E',
//   primaryHover: '#0D6D66', 
//   primaryLight: '#CCFBF1',
//   primaryBg: '#F0FDFA',
//   primaryBorder: '#99F6E4',
//   sidebar: '#0F172A',
//   sidebarHover: '#1E293B',
//   sidebarText: '#94A3B8',
//   sidebarActive: '#0F766E',
//   cardBg: '#FFFFFF',
//   border: '#E2E8F0',
//   textPrimary: '#0F172A',
//   textSecondary: '#475569',
//   textMuted: '#94A3B8',
//   bg: '#F8FAFC',
//   success: '#059669',
//   warning: '#D97706',
//   error: '#DC2626',
//   dangerBg: '#FEF2F2',
//   dangerBorder: '#FECACA',
// };

// const DONATION_TIERS = [
//   { label: "Major Donors", min: 10000, color: '#0F766E' },
//   { label: "Generous Donors", min: 5000, color: '#14B8A6' },
//   { label: "Supporting Donors", min: 1000, color: '#5EEAD4' },
//   { label: "Contributors", min: 0, color: '#99F6E4' },
// ];

// function groupByMonth(data = [], labelKey, valueKey = null) {
//   const grouped = Array(12).fill(0);
//   data.forEach((item) => {
//     if (!item?.createdAt) return;
//     const monthIndex = new Date(item.createdAt).getMonth();
//     if (monthIndex >= 0 && monthIndex < 12) {
//       if (valueKey) {
//         grouped[monthIndex] += parseFloat(item[valueKey]) || 0;
//       } else {
//         grouped[monthIndex]++;
//       }
//     }
//   });
//   return monthLabels.map((month, index) => ({
//     month,
//     [labelKey]: grouped[index],
//   }));
// }

// function getResponseArray(result, keys = []) {
//   for (const key of keys) {
//     if (Array.isArray(result.data?.[key])) return result.data[key];
//   }
//   if (Array.isArray(result.data?.data)) return result.data.data;
//   if (Array.isArray(result.data)) return result.data;
//   return [];
// }

// // Custom Pie Chart Label
// const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
//   const RADIAN = Math.PI / 180;
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   return (
//     <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
//       <tspan x={x} y={y - 8} fontSize="11" fontWeight="600">
//         {name}
//       </tspan>
//       <tspan x={x} y={y + 8} fontSize="12" fontWeight="700">
//         {(percent * 100).toFixed(0)}%
//       </tspan>
//     </text>
//   );
// };

// // Custom Tooltip for Donor Charts
// const CustomTooltip = ({ active, payload, label }) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-lg">
//         <p className="text-[12px] font-semibold text-slate-600">{label}</p>
//         {payload.map((pld, index) => (
//           <p key={index} className="text-[13px] font-bold" style={{ color: pld.color }}>
//             {pld.name}: {pld.name === 'Amount' ? `₹${pld.value.toLocaleString()}` : pld.value}
//           </p>
//         ))}
//       </div>
//     );
//   }
//   return null;
// };


// const downloadDonorsCSV = (data, filename = 'donors.csv') => {
//   const headers = ['Donor Name', 'Email', 'Phone', 'Amount', 'Order ID', 'Payment ID', 'Date'];
  
//   const csvRows = [];
//   csvRows.push(headers.join(','));
  
//   data.forEach(donor => {
//     const row = [
//       `"${(donor.donorName || 'Anonymous').replace(/"/g, '""')}"`,
//       `"${donor.email || '—'}"`,
//       `"${donor.phoneNumber || '—'}"`,
//       `"₹${parseFloat(donor.amount || 0).toLocaleString()}"`,
//       `"${donor.orderId || '—'}"`,
//       `"${donor.paymentId || '—'}"`,
//       `"${donor.createdAt ? new Date(donor.createdAt).toLocaleDateString('en-IN') : '—'}"`
//     ];
//     csvRows.push(row.join(','));
//   });
  
//   const csvString = csvRows.join('\n');
//   const blob = new Blob(['\ufeff' + csvString], { type: 'text/csv;charset=utf-8;' });
//   const link = document.createElement('a');
//   const url = URL.createObjectURL(blob);
//   link.setAttribute('href', url);
//   link.setAttribute('download', filename);
//   link.style.visibility = 'hidden';
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// };

// // ADD THIS: Download helper for Donors PDF
// const downloadDonorsPDF = (data, totalDonors, totalAmount) => {
//   const printWindow = window.open('', '_blank');
  
//   const tableRows = data.map((donor, index) => {
//     const tier = getDonorTierLabel(donor.amount);
//     return `
//     <tr>
//       <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0;">${index + 1}</td>
//       <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0;">${donor.donorName || 'Anonymous'}</td>
//       <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0;">${donor.email || '—'}</td>
//       <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0;">${donor.phoneNumber || '—'}</td>
//       <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #0F766E;">₹${parseFloat(donor.amount || 0).toLocaleString()}</td>
//       <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0;"><span style="background: #f0fdfa; color: #0F766E; padding: 2px 8px; border-radius: 12px; font-size: 12px;">${tier}</span></td>
//       <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0;">${donor.createdAt ? new Date(donor.createdAt).toLocaleDateString('en-IN') : '—'}</td>
//     </tr>
//   `}).join('');

//   const html = `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <title>Donor List - Adiyogi Foundation</title>
//       <style>
//         body { font-family: Arial, sans-serif; margin: 20px; color: #1e293b; }
//         .header { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #0F766E; padding-bottom: 10px; }
//         .header h1 { color: #0F766E; margin: 0; font-size: 24px; }
//         .header p { color: #64748b; margin: 5px 0 0 0; font-size: 14px; }
//         .summary { display: flex; justify-content: space-between; margin-bottom: 20px; padding: 10px; background: #f0fdfa; border-radius: 8px; }
//         .summary div { text-align: center; }
//         .summary strong { display: block; font-size: 20px; color: #0F766E; }
//         .summary span { font-size: 12px; color: #64748b; }
//         table { width: 100%; border-collapse: collapse; margin-top: 10px; }
//         th { background: #0F766E; color: white; padding: 10px 12px; text-align: left; font-size: 13px; }
//         td { padding: 8px 12px; border-bottom: 1px solid #e2e8f0; font-size: 13px; }
//         tr:hover { background: #f8fafc; }
//         .footer { margin-top: 20px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 10px; }
//         @media print {
//           body { margin: 0; }
//           .no-print { display: none; }
//         }
//       </style>
//     </head>
//     <body>
//       <div class="no-print" style="margin-bottom: 15px; text-align: right;">
//         <button onclick="window.print()" style="background: #0F766E; color: white; border: none; padding: 8px 20px; border-radius: 6px; cursor: pointer; font-size: 13px;">
//           🖨️ Print / Save as PDF
//         </button>
//       </div>
      
//       <div class="header">
//         <h1>Adiyogi Foundation</h1>
//         <p>Donor List Report</p>
//       </div>
      
//       <div class="summary">
//         <div><strong>${totalDonors.toLocaleString()}</strong><span>Total Donors</span></div>
//         <div><strong>₹${totalAmount.toLocaleString()}</strong><span>Total Donations</span></div>
//         <div><strong>${new Date().toLocaleDateString('en-IN')}</strong><span>Report Date</span></div>
//       </div>
      
//       <table>
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Donor Name</th>
//             <th>Email</th>
//             <th>Phone</th>
//             <th>Amount</th>
//             <th>Tier</th>
//             <th>Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           ${tableRows}
//         </tbody>
//       </table>
      
//       <div class="footer">
//         <p>© ${new Date().getFullYear()} Adiyogi Foundation | Admin Panel Report</p>
//         <p>Generated on ${new Date().toLocaleString('en-IN')}</p>
//       </div>
//     </body>
//     </html>
//   `;
  
//   printWindow.document.write(html);
//   printWindow.document.close();
// };

// // Helper for donor tier label
// const getDonorTierLabel = (amount) => {
//   const donationAmount = parseFloat(amount) || 0;
//   if (donationAmount >= 10000) return 'Major Donor';
//   if (donationAmount >= 5000) return 'Generous Donor';
//   if (donationAmount >= 1000) return 'Supporting Donor';
//   return 'Contributor';
// };

// // ADD THIS: Download Menu for Donors
// const DonorDownloadMenu = React.memo(({ allDonors, filteredDonors, totalDonationAmount, donorSearchQuery }) => {
//   const [showMenu, setShowMenu] = useState(false);
//   const [isDownloadingAll, setIsDownloadingAll] = useState(false);

//   const handleDownloadCSV = () => {
//     setShowMenu(false);
//     if (filteredDonors.length > 0) {
//       downloadDonorsCSV(filteredDonors, 'donors_filtered.csv');
//       toast.success('CSV downloaded successfully');
//     }
//   };

//   const handleDownloadPDF = () => {
//     setShowMenu(false);
//     if (filteredDonors.length > 0) {
//       const totalAmount = filteredDonors.reduce((sum, d) => sum + (parseFloat(d.amount) || 0), 0);
//       downloadDonorsPDF(filteredDonors, filteredDonors.length, totalAmount);
//       toast.success('PDF opened in new tab');
//     }
//   };

//   const handleDownloadAllCSV = async () => {
//     setShowMenu(false);
//     setIsDownloadingAll(true);
//     try {
//       const result = await axios.get(
//         `${ServerUrl}${endpoints.donors}`,
//         { withCredentials: true }
//       );
//       if (result.data.success) {
//         const allDonations = result.data.donations || [];
//         downloadDonorsCSV(allDonations, 'all_donors.csv');
//         toast.success('All donors CSV downloaded');
//       }
//     } catch (error) {
//       toast.error('Failed to download all donors');
//     } finally {
//       setIsDownloadingAll(false);
//     }
//   };

//   return (
//     <div className="relative">
//       <button
//         onClick={() => setShowMenu(!showMenu)}
//         disabled={isDownloadingAll || allDonors.length === 0}
//         className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-[13px] font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 disabled:opacity-50"
//       >
//         {isDownloadingAll ? (
//           <>
//             <div className="h-4 w-4 animate-spin rounded-full border-2 border-teal-600 border-t-transparent" />
//             Downloading...
//           </>
//         ) : (
//           <>
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
//               <polyline points="7 10 12 15 17 10"/>
//               <line x1="12" y1="15" x2="12" y2="3"/>
//             </svg>
//             Download
//           </>
//         )}
//       </button>

//       <AnimatePresence>
//         {showMenu && (
//           <>
//             <motion.div
//               initial={{ opacity: 0, y: 5, scale: 0.95 }}
//               animate={{ opacity: 1, y: 0, scale: 1 }}
//               exit={{ opacity: 0, y: 5, scale: 0.95 }}
//               className="absolute right-0 top-10 z-50 w-56 rounded-xl border border-slate-200 bg-white shadow-lg p-1.5"
//             >
//               <button
//                 onClick={handleDownloadCSV}
//                 className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium text-slate-700 transition-colors hover:bg-slate-50"
//               >
//                 <span className="flex size-8 items-center justify-center rounded-lg bg-green-50 text-green-600">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
//                     <polyline points="14 2 14 8 20 8"/>
//                     <line x1="16" y1="13" x2="8" y2="13"/>
//                     <line x1="16" y1="17" x2="8" y2="17"/>
//                   </svg>
//                 </span>
//                 <div>
//                   <p className="font-semibold">Excel / CSV</p>
//                   <p className="text-[11px] text-slate-400">Filtered data</p>
//                 </div>
//               </button>

//               <button
//                 onClick={handleDownloadPDF}
//                 className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium text-slate-700 transition-colors hover:bg-slate-50"
//               >
//                 <span className="flex size-8 items-center justify-center rounded-lg bg-red-50 text-red-600">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
//                     <polyline points="14 2 14 8 20 8"/>
//                   </svg>
//                 </span>
//                 <div>
//                   <p className="font-semibold">PDF / Print</p>
//                   <p className="text-[11px] text-slate-400">Filtered data</p>
//                 </div>
//               </button>

//               <div className="my-1 border-t border-slate-100"></div>

//               <button
//                 onClick={handleDownloadAllCSV}
//                 className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium text-slate-700 transition-colors hover:bg-teal-50"
//               >
//                 <span className="flex size-8 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
//                     <polyline points="7 10 12 15 17 10"/>
//                     <line x1="12" y1="15" x2="12" y2="3"/>
//                   </svg>
//                 </span>
//                 <div>
//                   <p className="font-semibold">Download All Data</p>
//                   <p className="text-[11px] text-slate-400">Complete {allDonors.length.toLocaleString()} records</p>
//                 </div>
//               </button>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setShowMenu(false)}
//               className="fixed inset-0 z-40"
//             />
//           </>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// });
// DonorDownloadMenu.displayName = 'DonorDownloadMenu';

// const AddGuestModal = React.memo(({ 
//   show, 
//   onClose, 
//   isAddingGuest, 
//   guestForm, 
//   setGuestForm, 
//   onSubmit 
// }) => (
//   <AnimatePresence>
//     {show && (
//       <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           onClick={() => !isAddingGuest && onClose()}
//           className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
//         />

//         <motion.form
//           initial={{ opacity: 0, y: 12, scale: 0.97 }}
//           animate={{ opacity: 1, y: 0, scale: 1 }}
//           exit={{ opacity: 0, y: 12, scale: 0.97 }}
//           onSubmit={onSubmit}
//           className="relative w-full max-w-md rounded-xl bg-white p-5 shadow-lg"
//         >
//           <button
//             type="button"
//             onClick={() => !isAddingGuest && onClose()}
//             className="absolute right-3 top-3 flex size-7 items-center justify-center rounded-md border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50"
//             disabled={isAddingGuest}
//           >
//             <X size={15} />
//           </button>

//           <div className="flex items-center gap-3 mb-4">
//             <div className="flex size-10 items-center justify-center rounded-xl bg-teal-50">
//               <Users size={20} className="text-teal-600" />
//             </div>
//             <div>
//               <h3 className="text-base font-semibold text-slate-900">Add New Guest</h3>
//               <p className="text-[12px] text-slate-500">Enter guest details for Bhandara</p>
//             </div>
//           </div>

//           <div className="space-y-3.5">
//             <label className="block">
//               <span className="text-[13px] font-semibold text-slate-700">Name *</span>
//               <div className="relative mt-1.5">
//                 <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
//                 <input
//                   type="text"
//                   required
//                   value={guestForm.name}
//                   onChange={(e) => setGuestForm(prev => ({ ...prev, name: e.target.value }))}
//                   className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-3.5 py-2 text-[13px] font-medium outline-none transition-colors focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
//                   placeholder="Guest full name"
//                   autoFocus
//                 />
//               </div>
//             </label>

//             <label className="block">
//               <span className="text-[13px] font-semibold text-slate-700">Phone Number</span>
//               <div className="relative mt-1.5">
//                 <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
//                 <input
//                   type="tel"
//                   value={guestForm.phone}
//                   onChange={(e) => setGuestForm(prev => ({ ...prev, phone: e.target.value }))}
//                   className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-3.5 py-2 text-[13px] font-medium outline-none transition-colors focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
//                   placeholder="+91 98765 43210"
//                 />
//               </div>
//             </label>

//             <label className="block">
//               <span className="text-[13px] font-semibold text-slate-700">Location</span>
//               <div className="relative mt-1.5">
//                 <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
//                 <input
//                   type="text"
//                   value={guestForm.location}
//                   onChange={(e) => setGuestForm(prev => ({ ...prev, location: e.target.value }))}
//                   className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-3.5 py-2 text-[13px] font-medium outline-none transition-colors focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
//                   placeholder="City, State"
//                 />
//               </div>
//             </label>
//           </div>

//           <div className="mt-4 flex gap-2">
//             <button
//               type="submit"
//               disabled={isAddingGuest}
//               className="flex-1 rounded-lg bg-teal-600 px-5 py-2.5 text-[13px] font-semibold text-white shadow-sm transition-all hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isAddingGuest ? (
//                 <span className="flex items-center justify-center gap-2">
//                   <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
//                   Adding...
//                 </span>
//               ) : (
//                 "Add Guest"
//               )}
//             </button>
            
//             <button
//               type="button"
//               onClick={onClose}
//               disabled={isAddingGuest}
//               className="rounded-lg border border-slate-200 px-4 py-2.5 text-[13px] font-semibold text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-50"
//             >
//               Done
//             </button>
//           </div>
//         </motion.form>
//       </div>
//     )}
//   </AnimatePresence>
// ));

// AddGuestModal.displayName = 'AddGuestModal';


// // Add this helper function before the GuestTable component
// const downloadAsCSV = (data, filename = 'guests.csv') => {
//   // Define headers
//   const headers = ['Name', 'Phone', 'Location', 'Date'];
  
//   // Convert data to CSV format
//   const csvRows = [];
//   csvRows.push(headers.join(','));
  
//   data.forEach(guest => {
//     const row = [
//       `"${(guest.name || 'Anonymous').replace(/"/g, '""')}"`,
//       `"${guest.phone || '—'}"`,
//       `"${(guest.location || '—').replace(/"/g, '""')}"`,
//       `"${guest.createdAt ? new Date(guest.createdAt).toLocaleDateString('en-IN') : '—'}"`
//     ];
//     csvRows.push(row.join(','));
//   });
  
//   // Create blob and download
//   const csvString = csvRows.join('\n');
//   const blob = new Blob(['\ufeff' + csvString], { type: 'text/csv;charset=utf-8;' });
//   const link = document.createElement('a');
//   const url = URL.createObjectURL(blob);
//   link.setAttribute('href', url);
//   link.setAttribute('download', filename);
//   link.style.visibility = 'hidden';
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// };

// const downloadAsPDF = (data, totalGuests) => {
//   // Create a print-friendly HTML
//   const printWindow = window.open('', '_blank');
  
//   const tableRows = data.map((guest, index) => `
//     <tr>
//       <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0;">${index + 1}</td>
//       <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0;">${guest.name || 'Anonymous'}</td>
//       <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0;">${guest.phone || '—'}</td>
//       <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0;">${guest.location || '—'}</td>
//       <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0;">${guest.createdAt ? new Date(guest.createdAt).toLocaleDateString('en-IN') : '—'}</td>
//     </tr>
//   `).join('');

//   const html = `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <title>Guest List - Adiyogi Foundation</title>
//       <style>
//         body { font-family: Arial, sans-serif; margin: 20px; color: #1e293b; }
//         .header { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #0F766E; padding-bottom: 10px; }
//         .header h1 { color: #0F766E; margin: 0; font-size: 24px; }
//         .header p { color: #64748b; margin: 5px 0 0 0; font-size: 14px; }
//         .summary { display: flex; justify-content: space-between; margin-bottom: 20px; padding: 10px; background: #f0fdfa; border-radius: 8px; }
//         .summary div { text-align: center; }
//         .summary strong { display: block; font-size: 20px; color: #0F766E; }
//         .summary span { font-size: 12px; color: #64748b; }
//         table { width: 100%; border-collapse: collapse; margin-top: 10px; }
//         th { background: #0F766E; color: white; padding: 10px 12px; text-align: left; font-size: 13px; }
//         td { padding: 8px 12px; border-bottom: 1px solid #e2e8f0; font-size: 13px; }
//         tr:hover { background: #f8fafc; }
//         .footer { margin-top: 20px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 10px; }
//         @media print {
//           body { margin: 0; }
//           .no-print { display: none; }
//         }
//       </style>
//     </head>
//     <body>
//       <div class="no-print" style="margin-bottom: 15px; text-align: right;">
//         <button onclick="window.print()" style="background: #0F766E; color: white; border: none; padding: 8px 20px; border-radius: 6px; cursor: pointer; font-size: 13px;">
//           🖨️ Print / Save as PDF
//         </button>
//       </div>
      
//       <div class="header">
//         <h1>Adiyogi Foundation</h1>
//         <p>Anna Seva List Report</p>
//       </div>
      
//       <div class="summary">
//         <div><strong>${totalGuests.toLocaleString()}</strong><span>Total Guests</span></div>
//         <div><strong>${new Set(data.map(g => g.location).filter(Boolean)).size}</strong><span>Unique Locations</span></div>
//         <div><strong>${new Date().toLocaleDateString('en-IN')}</strong><span>Report Date</span></div>
//       </div>
      
//       <table>
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Name</th>
//             <th>Phone</th>
//             <th>Location</th>
//             <th>Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           ${tableRows}
//         </tbody>
//       </table>
      
//       <div class="footer">
//         <p>© ${new Date().getFullYear()} Adiyogi Foundation | Admin Panel Report</p>
//         <p>Generated on ${new Date().toLocaleString('en-IN')}</p>
//       </div>
//     </body>
//     </html>
//   `;
  
//   printWindow.document.write(html);
//   printWindow.document.close();
// };

// // ADD THIS COMPONENT AFTER AddGuestModal AND BEFORE GuestTable
// const DownloadMenu = React.memo(({ allGuests, guestPagination }) => {
//   const [showMenu, setShowMenu] = useState(false);
//   const [isDownloadingAll, setIsDownloadingAll] = useState(false);

//   const handleDownloadCSV = async () => {
//     setShowMenu(false);
//     if (allGuests.length > 0) {
//       downloadAsCSV(allGuests, `guests_page_${guestPagination.currentPage}.csv`);
//       toast.success('CSV downloaded successfully');
//     }
//   };

//   const handleDownloadPDF = () => {
//     setShowMenu(false);
//     if (allGuests.length > 0) {
//       downloadAsPDF(allGuests, guestPagination.total);
//       toast.success('PDF opened in new tab');
//     }
//   };

//   const handleDownloadAllCSV = async () => {
//     setShowMenu(false);
//     setIsDownloadingAll(true);
//     try {
//       // Fetch all guests without pagination
//       const result = await axios.get(
//         `${ServerUrl}${endpoints.guests}?page=1&limit=${guestPagination.total}`,
//         { withCredentials: true }
//       );
//       if (result.data.success) {
//         downloadAsCSV(result.data.guests || [], 'all_guests.csv');
//         toast.success('All guests CSV downloaded');
//       }
//     } catch (error) {
//       toast.error('Failed to download all guests');
//     } finally {
//       setIsDownloadingAll(false);
//     }
//   };

//   return (
//     <div className="relative">
//       <button
//         onClick={() => setShowMenu(!showMenu)}
//         disabled={isDownloadingAll || allGuests.length === 0}
//         className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-[13px] font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 disabled:opacity-50"
//       >
//         {isDownloadingAll ? (
//           <>
//             <div className="h-4 w-4 animate-spin rounded-full border-2 border-teal-600 border-t-transparent" />
//             Downloading...
//           </>
//         ) : (
//           <>
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
//               <polyline points="7 10 12 15 17 10"/>
//               <line x1="12" y1="15" x2="12" y2="3"/>
//             </svg>
//             Download
//           </>
//         )}
//       </button>

//       <AnimatePresence>
//         {showMenu && (
//           <>
//             <motion.div
//               initial={{ opacity: 0, y: 5, scale: 0.95 }}
//               animate={{ opacity: 1, y: 0, scale: 1 }}
//               exit={{ opacity: 0, y: 5, scale: 0.95 }}
//               className="absolute right-0 top-10 z-50 w-56 rounded-xl border border-slate-200 bg-white shadow-lg p-1.5"
//             >
//               <button
//                 onClick={handleDownloadCSV}
//                 className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium text-slate-700 transition-colors hover:bg-slate-50"
//               >
//                 <span className="flex size-8 items-center justify-center rounded-lg bg-green-50 text-green-600">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
//                     <polyline points="14 2 14 8 20 8"/>
//                     <line x1="16" y1="13" x2="8" y2="13"/>
//                     <line x1="16" y1="17" x2="8" y2="17"/>
//                   </svg>
//                 </span>
//                 <div>
//                   <p className="font-semibold">Excel / CSV</p>
//                   <p className="text-[11px] text-slate-400">Current page data</p>
//                 </div>
//               </button>

//               <button
//                 onClick={handleDownloadPDF}
//                 className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium text-slate-700 transition-colors hover:bg-slate-50"
//               >
//                 <span className="flex size-8 items-center justify-center rounded-lg bg-red-50 text-red-600">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
//                     <polyline points="14 2 14 8 20 8"/>
//                   </svg>
//                 </span>
//                 <div>
//                   <p className="font-semibold">PDF / Print</p>
//                   <p className="text-[11px] text-slate-400">Current page data</p>
//                 </div>
//               </button>

//               <div className="my-1 border-t border-slate-100"></div>

//               <button
//                 onClick={handleDownloadAllCSV}
//                 className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium text-slate-700 transition-colors hover:bg-teal-50"
//               >
//                 <span className="flex size-8 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
//                     <polyline points="7 10 12 15 17 10"/>
//                     <line x1="12" y1="15" x2="12" y2="3"/>
//                   </svg>
//                 </span>
//                 <div>
//                   <p className="font-semibold">Download All Data</p>
//                   <p className="text-[11px] text-slate-400">Complete {guestPagination.total.toLocaleString()} records</p>
//                 </div>
//               </button>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setShowMenu(false)}
//               className="fixed inset-0 z-40"
//             />
//           </>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// });
// DownloadMenu.displayName = 'DownloadMenu';


// // ADD THIS RIGHT AFTER AddGuestModal AND BEFORE export default function AdiyogiAdminPanel()
// const GuestTable = React.memo(({ 
//   allGuests, guestPagination, guestSearchQuery, showGuestModal,
//   setGuestSearchQuery, setShowGuestModal, setDeleteState, setSelectedRecord,
//   fetchGuests, addGuest, handleCloseGuestModal, guestForm, setGuestForm, isAddingGuest, 
// }) => {
//   const [searchInput, setSearchInput] = useState(guestSearchQuery);
  
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (searchInput !== guestSearchQuery) {
//         setGuestSearchQuery(searchInput);
//         fetchGuests(1, searchInput);
//       }
//     }, 500);
//     return () => clearTimeout(timer);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [searchInput]);

//   const handlePageChange = React.useCallback((newPage) => {
//     if (newPage >= 1 && newPage <= guestPagination.totalPages) {
//       fetchGuests(newPage, guestSearchQuery);
//     }
//   }, [guestPagination.totalPages, guestSearchQuery, fetchGuests]);

//   const handleDelete = React.useCallback((id) => {
//     setDeleteState({
//       id: id,
//       endpoint: endpoints.deleteGuest,
//       onSuccess: () => fetchGuests(guestPagination.currentPage, guestSearchQuery),
//     });
//   }, [guestPagination.currentPage, guestSearchQuery, fetchGuests, setDeleteState]);

//   return (
//     <div className="space-y-4">
//       {/* Stats cards */}
//       <div className="grid gap-4 sm:grid-cols-3">
//         <div className="rounded-xl border border-slate-200 bg-white p-4">
//           <div className="flex items-center gap-3">
//             <div className="flex size-10 items-center justify-center rounded-lg bg-teal-50">
//               <Users size={20} className="text-teal-600" />
//             </div>
//             <div>
//               <p className="text-[11px] font-semibold uppercase text-slate-500">Total Guests</p>
//               <p className="text-xl font-bold text-slate-900">{guestPagination.total.toLocaleString()}</p>
//             </div>
//           </div>
//         </div>
//         <div className="rounded-xl border border-slate-200 bg-white p-4">
//           <div className="flex items-center gap-3">
//             <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-50">
//               <MapPin size={20} className="text-emerald-600" />
//             </div>
//             <div>
//               <p className="text-[11px] font-semibold uppercase text-slate-500">Unique Locations</p>
//               <p className="text-xl font-bold text-slate-900">
//                 {new Set(allGuests.map(g => g.location).filter(Boolean)).size}
//               </p>
//             </div>
//           </div>
//         </div>
//         <div className="rounded-xl border border-slate-200 bg-white p-4">
//           <div className="flex items-center gap-3">
//             <div className="flex size-10 items-center justify-center rounded-lg bg-cyan-50">
//               <TrendingUp size={20} className="text-cyan-600" />
//             </div>
//             <div>
//               <p className="text-[11px] font-semibold uppercase text-slate-500">Today's Guests</p>
//               <p className="text-xl font-bold text-slate-900">
//                 {allGuests.filter(g => {
//                   const today = new Date();
//                   return new Date(g.createdAt).toDateString() === today.toDateString();
//                 }).length}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Table Card */}
//       <section className="rounded-xl border border-slate-200 bg-white shadow-sm">

// <div className="border-b border-slate-100 p-4">
//   <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//     <div className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 flex-1 max-w-md">
//       <Search size={16} className="text-slate-400 shrink-0" />
//       <input
//         value={searchInput}
//         onChange={(e) => setSearchInput(e.target.value)}
//         placeholder="Search guests by name, phone, or location..."
//         className="w-full bg-transparent text-[13px] font-medium outline-none placeholder:text-slate-400"
//       />
//       {searchInput && (
//         <button onClick={() => { setSearchInput(""); setGuestSearchQuery(""); fetchGuests(1, ""); }}
//           className="flex size-5 items-center justify-center rounded-full hover:bg-slate-200">
//           <X size={12} className="text-slate-400" />
//         </button>
//       )}
//     </div>
    
//     <div className="flex items-center gap-2">
//       <DownloadMenu allGuests={allGuests} guestPagination={guestPagination} />
//       <button onClick={() => setShowGuestModal(true)}
//         className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-[13px] font-semibold text-white shadow-sm transition-all hover:bg-teal-700">
//         <Plus size={16} /> Add Guest
//       </button>
//     </div>
//   </div>
// </div>
//         <div className="overflow-x-auto">
//           <table className="w-full min-w-[700px] text-left">
//             <thead>
//               <tr className="border-b border-slate-100 bg-slate-50/50">
//                 <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500"><div className="flex items-center gap-1.5"><User size={13} />Name</div></th>
//                 <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500"><div className="flex items-center gap-1.5"><Phone size={13} />Phone</div></th>
//                 <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500"><div className="flex items-center gap-1.5"><MapPin size={13} />Location</div></th>
//                 <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500">Date</th>
//                 <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-slate-500">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {allGuests.map((guest, index) => (
//                 <motion.tr key={guest._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.02 }}
//                   className="border-b border-slate-50 transition-colors hover:bg-slate-50/50">
//                   <td className="px-4 py-3">
//                     <div className="flex items-center gap-2.5">
//                       <div className="flex size-8 items-center justify-center rounded-full bg-teal-50 text-[11px] font-bold text-teal-600">{guest.name?.charAt(0)?.toUpperCase() || "G"}</div>
//                       <span className="text-[13px] font-medium text-slate-700">{guest.name || "Anonymous"}</span>
//                     </div>
//                   </td>
//                   <td className="px-4 py-3 text-[13px] text-slate-500">{guest.phone ? <a href={`tel:${guest.phone}`} className="hover:underline text-teal-600">{guest.phone}</a> : "—"}</td>
//                   <td className="px-4 py-3">{guest.location ? <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-600"><MapPin size={10} />{guest.location}</span> : <span className="text-[13px] text-slate-400">—</span>}</td>
//                   <td className="px-4 py-3 text-[13px] text-slate-500">{guest.createdAt ? new Date(guest.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : "—"}</td>
//                   <td className="px-4 py-3">
//                     <div className="flex justify-end gap-1.5">
//                       <button onClick={() => setSelectedRecord({ ...guest, type: 'guest' })} className="flex size-7 items-center justify-center rounded-md border border-slate-200 text-slate-500 transition-colors hover:bg-teal-50 hover:text-teal-600 hover:border-teal-200" title="View Details"><Eye size={14} /></button>
//                       <button onClick={() => handleDelete(guest._id)} className="flex size-7 items-center justify-center rounded-md border border-slate-200 text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600 hover:border-red-200" title="Delete Guest"><Trash2 size={14} /></button>
//                     </div>
//                   </td>
//                 </motion.tr>
//               ))}
//               {allGuests.length === 0 && (
//                 <tr><td colSpan={5} className="px-6 py-12 text-center"><Users size={32} className="mx-auto text-slate-300" /><p className="mt-2 text-[13px] font-medium text-slate-400">No guests found</p></td></tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {guestPagination.totalPages > 1 && (
//           <div className="border-t border-slate-100 px-4 py-3">
//             <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
//               <p className="text-[12px] text-slate-500">Showing <span className="font-semibold text-slate-700">{(guestPagination.currentPage - 1) * guestPagination.limit + 1}</span> to <span className="font-semibold text-slate-700">{Math.min(guestPagination.currentPage * guestPagination.limit, guestPagination.total)}</span> of <span className="font-semibold text-slate-700">{guestPagination.total.toLocaleString()}</span> guests</p>
//               <div className="flex items-center gap-1">
//                 <button onClick={() => handlePageChange(guestPagination.currentPage - 1)} disabled={guestPagination.currentPage === 1} className="flex size-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"><ChevronLeft size={16} /></button>
//                 {Array.from({ length: Math.min(5, guestPagination.totalPages) }, (_, i) => {
//                   let pageNum;
//                   if (guestPagination.totalPages <= 5) pageNum = i + 1;
//                   else if (guestPagination.currentPage <= 3) pageNum = i + 1;
//                   else if (guestPagination.currentPage >= guestPagination.totalPages - 2) pageNum = guestPagination.totalPages - 4 + i;
//                   else pageNum = guestPagination.currentPage - 2 + i;
//                   return (
//                     <button key={pageNum} onClick={() => handlePageChange(pageNum)} className={`flex size-8 items-center justify-center rounded-lg text-[13px] font-medium transition-colors ${pageNum === guestPagination.currentPage ? "bg-teal-600 text-white shadow-sm" : "border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>{pageNum}</button>
//                   );
//                 })}
//                 <button onClick={() => handlePageChange(guestPagination.currentPage + 1)} disabled={guestPagination.currentPage === guestPagination.totalPages} className="flex size-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"><ChevronRight size={16} /></button>
//               </div>
//             </div>
//           </div>
//         )}
//       </section>

//       <AddGuestModal show={showGuestModal} onClose={handleCloseGuestModal} isAddingGuest={isAddingGuest} guestForm={guestForm} setGuestForm={setGuestForm} onSubmit={addGuest} />
//     </div>
//   );
// });
// GuestTable.displayName = 'GuestTable';


// export default function AdiyogiAdminPanel() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { userData } = useSelector((state) => state.user);

//   useEffect(() => {
//     if (!userData) {
//       navigate("/");
//     }
//   }, [userData, navigate]);

//   const [authLoading, setAuthLoading] = useState(true);
//   const [adminUser, setAdminUser] = useState(null);
//   const [activeSection, setActiveSection] = useState("dashboard");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [allAdmins, setAllAdmins] = useState([]);
//   const [allContacts, setAllContacts] = useState([]);
//   const [allDonors, setAllDonors] = useState([]);
//   const [allGallery, setAllGallery] = useState([]);
//   const [allSponsors, setAllSponsors] = useState([]);
//   const [selectedRecord, setSelectedRecord] = useState(null);
//   const [deleteState, setDeleteState] = useState(null);
//   const [showAdminModal, setShowAdminModal] = useState(false);
//   const [adminForm, setAdminForm] = useState({ email: "", password: "" });
//   const [donorSearchQuery, setDonorSearchQuery] = useState("");

//   const [galleryImageFile, setGalleryImageFile] = useState(null);
//   const [galleryImagePreview, setGalleryImagePreview] = useState("");
//   const [uploadedGalleryImageUrl, setUploadedGalleryImageUrl] = useState(null);
//   const [isUploadingGalleryImage, setIsUploadingGalleryImage] = useState(false);

//   const [sponsorImageFile, setSponsorImageFile] = useState(null);
//   const [sponsorImagePreview, setSponsorImagePreview] = useState("");
//   const [uploadedSponsorImageUrl, setUploadedSponsorImageUrl] = useState(null);
//   const [isUploadingSponsorImage, setIsUploadingSponsorImage] = useState(false);
//   const [sponsorName, setSponsorName] = useState("");
// const [allGuests, setAllGuests] = useState([]);
// const [guestPagination, setGuestPagination] = useState({
//   currentPage: 1,
//   totalPages: 1,
//   total: 0,
//   limit: 50,
// });
// const [guestSearchQuery, setGuestSearchQuery] = useState("");
// const [guestForm, setGuestForm] = useState({
//   name: "",
//   phone: "",
//   location: "",
// });
// const [showGuestModal, setShowGuestModal] = useState(false);
// const [isAddingGuest, setIsAddingGuest] = useState(false);

// const fetchGuests = async (page = 1, search = "") => {
//   try {
//     const result = await axios.get(
//       `${ServerUrl}${endpoints.guests}?page=${page}&limit=50${search ? `&search=${search}` : ''}`,
//       { withCredentials: true }
//     );
    
//     if (result.data.success) {
//       setAllGuests(result.data.guests || []);
//       setGuestPagination({
//         currentPage: result.data.currentPage,
//         totalPages: result.data.totalPages,
//         total: result.data.total,
//         limit: 50,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     toast.error("Unable to fetch guests");
//   }
// };


//   const fetchCurrentUser = async () => {
//     try {
//       const result = await axios.get(ServerUrl + endpoints.currentUser, {
//         withCredentials: true,
//       });
//       setAdminUser(result.data.user);
//     } catch (error) {
//       if (error.response?.status !== 401) console.log(error);
//       setAdminUser(null);
//       navigate("/");
//     } finally {
//       setAuthLoading(false);
//     }
//   };

//   const fetchAllAdmins = async () => {
//     try {
//       const result = await axios.get(ServerUrl + endpoints.admins, {
//         withCredentials: true,
//       });
//       setAllAdmins(getResponseArray(result, ["users"]));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const fetchResource = async (endpoint, setter, keys = []) => {
//     try {
//       const result = await axios.get(ServerUrl + endpoint, {
//         withCredentials: true,
//       });
//       setter(getResponseArray(result, keys));
//     } catch (error) {
//       console.log(error);
//       toast.error("Unable to fetch data");
//     }
//   };

//   const fetchAllData = async () => {
//     fetchAllAdmins();
//     fetchResource(endpoints.contacts, setAllContacts, ["contacts"]);
//     fetchResource(endpoints.donors, setAllDonors, ["donations"]);
//     fetchResource(endpoints.gallery, setAllGallery, ["images", "gallery"]);
//     fetchResource(endpoints.sponsors, setAllSponsors, ["images", "sponsors"]);
//      fetchGuests(); // Add this line
//   };
// console.log(allDonors);
//   useEffect(() => {
//     fetchCurrentUser();
//   }, []);

//   useEffect(() => {
//     if (adminUser) fetchAllData();
//   }, [adminUser]);





// const addGuest = React.useCallback(async (event) => {
//   event.preventDefault();
//   setIsAddingGuest(true);
  
//   try {
//     const result = await axios.post(
//       ServerUrl + endpoints.addGuest,
//       guestForm,
//       {
//         headers: { "Content-Type": "application/json" },
//         withCredentials: true,
//       }
//     );
    
//     if (result.data.success) {
//       setGuestForm({ name: "", phone: "", location: "" });
//       fetchGuests(guestPagination.currentPage, guestSearchQuery);
//       toast.success("Guest added successfully");
//     }
//   } catch (error) {
//     console.log(error);
//     toast.error(error.response?.data?.message || "Failed to add guest");
//   } finally {
//     setIsAddingGuest(false);
//   }
// }, [guestForm, guestPagination.currentPage, guestSearchQuery]);

// const handleCloseGuestModal = React.useCallback(() => {
//   setShowGuestModal(false);
//   setGuestForm({ name: "", phone: "", location: "" });
// }, []);



//   const handleLogout = async () => {
//     try {
//       await axios.post(ServerUrl + endpoints.logout, {}, { withCredentials: true });
//       toast.success("Logged out successfully");
//       dispatch(setUserData(null));
//       setAdminUser(null);
//       navigate("/");
//     } catch (error) {
//       console.log(error);
//       toast.error("Logout failed");
//     }
//   };

//   const removeResource = async (endpoint, id, onSuccess) => {
//     try {
//       await axios.delete(ServerUrl + endpoint + "/" + id, {
//         withCredentials: true,
//       });
//      if (onSuccess) {
//       onSuccess();
//     }
//       toast.success("Removed successfully");
//       setDeleteState(null);
//     } catch (error) {
//       console.log(error);
//       toast.error("Delete failed");
//     }
//   };

//   const addAdmin = async (event) => {
//     event.preventDefault();
//     try {
//       const result = await axios.post(ServerUrl + endpoints.addAdmin, adminForm, {
//         headers: { "Content-Type": "application/json" },
//         withCredentials: true,
//       });
//       if (result.data.success) {
//         setAllAdmins((current) => [...current, result.data.newUser]);
//         setAdminForm({ email: "", password: "" });
//         setShowAdminModal(false);
//         toast.success("New admin added successfully");
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response?.data?.message || "Failed to add admin");
//     }
//   };

//   // Donor Analytics Calculations
//   const totalDonationAmount = allDonors.reduce((sum, donor) => sum + (parseFloat(donor.amount) || 0), 0);
//   const averageDonation = allDonors.length > 0 ? totalDonationAmount / allDonors.length : 0;
//   const highestDonation = allDonors.length > 0 ? Math.max(...allDonors.map(d => parseFloat(d.amount) || 0)) : 0;
  
//   const contactsData = groupByMonth(allContacts, "contacts");
//   const donorsData = groupByMonth(allDonors, "donors");
//   const donationAmountData = groupByMonth(allDonors, "Amount", "amount");

//   // Donation Tier Distribution for Pie Chart
//   const getDonationTierData = () => {
//     const tiers = DONATION_TIERS.map(tier => ({
//       name: tier.label,
//       value: 0,
//       color: tier.color,
//     }));

//     allDonors.forEach(donor => {
//       const amount = parseFloat(donor.amount) || 0;
//       for (let i = 0; i < DONATION_TIERS.length; i++) {
//         if (amount >= DONATION_TIERS[i].min) {
//           tiers[i].value += amount;
//           break;
//         }
//       }
//     });

//     return tiers.filter(tier => tier.value > 0);
//   };

//   const sectionTitles = {
//     dashboard: {
//       title: "Dashboard",
//       subtitle: "Overview of your foundation's activity and metrics.",
//     },
//     contacts: {
//       title: "Contact Messages",
//       subtitle: "View and manage messages from your community.",
//     },
//     donors: {
//       title: "Donor Management",
//       subtitle: "Track donations and manage donor information.",
//     },
//      guests: {
//     title: "Guest Management",
//     subtitle: "Manage Bhandara guest registrations and attendance.",
//   },
//     gallery: {
//       title: "Gallery Management",
//       subtitle: "Upload and manage images for your website.",
//     },
//     sponsors: {
//       title: "Sponsor Management",
//       subtitle: "Manage sponsor logos and information.",
//     },
//     admins: {
//       title: "Admin Management",
//       subtitle: "Manage users with administrative access.",
//     },
//   };

//   const Sidebar = () => (
//     <>
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
//           onClick={() => setIsSidebarOpen(false)}
//         />
//       )}

//       <aside
//         className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col overflow-hidden bg-[#0F172A] text-white shadow-2xl transition-transform duration-300 lg:translate-x-0 ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <button
//           type="button"
//           onClick={() => setIsSidebarOpen(false)}
//           className="absolute right-4 top-4 z-10 flex size-8 items-center justify-center rounded-lg bg-white/5 transition-colors hover:bg-white/10 lg:hidden"
//         >
//           <X size={18} />
//         </button>

//         <div className="border-b border-white/5 p-5">
//           <div className="flex items-center gap-3">
//             <div className="flex size-10 items-center justify-center rounded-xl bg-teal-500/10">
//               <img
//                 src="/Adiyogi Foundation (1).jpeg"
//                 alt="logo"
//                 className="size-7 rounded-lg object-cover"
//               />
//             </div>
//             <div>
//               <h1 className="text-base font-bold tracking-tight">Adiyogi</h1>
//               <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
//                 Admin Panel
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="mx-4 mt-3 rounded-xl border border-white/5 bg-white/[0.03] p-3">
//           <div className="flex items-center gap-3">
//             <div className="flex size-9 items-center justify-center rounded-lg bg-teal-500/10 text-teal-400">
//               <ShieldCheck size={18} />
//             </div>
//             <div className="min-w-0">
//               <p className="truncate text-xs font-semibold">
//                 {adminUser?.name || "Admin User"}
//               </p>
//               <p className="truncate text-[11px] text-slate-400">
//                 {adminUser?.email || "Administrator"}
//               </p>
//             </div>
//           </div>
//         </div>

//         <nav className="mt-5 flex-1 space-y-0.5 overflow-y-auto px-3">
//           <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
//             Navigation
//           </p>

//           {navItems.map((item) => {
//             const Icon = item.icon;
//             const isActive = activeSection === item.id;

//             return (
//               <button
//                 key={item.id}
//                 type="button"
//                 onClick={() => {
//                   setActiveSection(item.id);
//                   setIsSidebarOpen(false);
//                 }}
//                 className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-[13px] font-medium transition-all duration-150 ${
//                   isActive
//                     ? "bg-teal-500/10 text-teal-400 border border-teal-500/20"
//                     : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-300"
//                 }`}
//               >
//                 <Icon size={17} strokeWidth={1.75} />
//                 {item.label}
//                 {item.id === 'donors' && allDonors.length > 0 && (
//                   <span className="ml-auto rounded-full bg-teal-500/20 px-2 py-0.5 text-[10px] font-bold text-teal-400">
//                     {allDonors.length}
//                   </span>
//                 )}
//               </button>
//             );
//           })}
//         </nav>

//         <div className="border-t border-white/5 p-3">
//           <button
//             type="button"
//             onClick={handleLogout}
//             className="group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium text-slate-400 transition-all duration-200 hover:bg-red-500/5 hover:text-red-400"
//           >
//             <LogOut size={17} strokeWidth={1.75} />
//             Logout
//           </button>
//         </div>
//       </aside>
//     </>
//   );

//   const Header = () => {
//     const [showNotifications, setShowNotifications] = useState(false);
//     const [notifications, setNotifications] = useState([]);

//     useEffect(() => {
//       const recentNotifications = [];
      
//       allContacts.slice(0, 2).forEach(item => {
//         recentNotifications.push({
//           id: item._id,
//           type: 'Message',
//           message: `New message from ${item.name || 'Visitor'}`,
//           time: item.createdAt,
//           section: 'contacts',
//         });
//       });
      
//       allDonors.slice(0, 2).forEach(item => {
//         recentNotifications.push({
//           id: item._id,
//           type: 'Donation',
//           message: `Donation of ₹${item.amount || 0} from ${item.donorName || 'Donor'}`,
//           time: item.createdAt,
//           section: 'donors',
//         });
//       });
//         allGuests.slice(0, 2).forEach(item => {
//     recentNotifications.push({
//       id: item._id,
//       type: 'Guest',
//       message: `${item.name || 'Guest'} registered for Bhandara`,
//       time: item.createdAt,
//       section: 'guests',
//     });
//   });
  
 
//       recentNotifications.sort((a, b) => new Date(b.time) - new Date(a.time));
//       setNotifications(recentNotifications.slice(0, 8));
//     }, [allContacts, allDonors, allGuests]);

//     return (
//       <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur-xl lg:px-6">
//         <div className="flex items-center justify-between gap-4">
//           <button
//             type="button"
//             onClick={() => setIsSidebarOpen(true)}
//             className="flex size-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-colors hover:bg-slate-50 lg:hidden"
//           >
//             <Menu size={19} />
//           </button>

//           <div className="min-w-0 flex-1">
//             <h2 className="truncate text-lg font-bold text-slate-900 lg:text-xl">
//               {sectionTitles[activeSection]?.title}
//             </h2>
//             <p className="mt-0.5 hidden text-[13px] text-slate-500 sm:block">
//               {sectionTitles[activeSection]?.subtitle}
//             </p>
//           </div>

//           <div className="relative">
//             <button 
//               onClick={() => setShowNotifications(!showNotifications)}
//               className="relative flex size-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-colors hover:bg-slate-50"
//             >
//               <Bell size={18} />
//               {notifications.length > 0 && (
//                 <span className="absolute right-1.5 top-1.5 flex size-2 rounded-full bg-teal-500 ring-2 ring-white" />
//               )}
//             </button>

//             <AnimatePresence>
//               {showNotifications && (
//                 <>
//                   <motion.div
//                     initial={{ opacity: 0, y: 8, scale: 0.96 }}
//                     animate={{ opacity: 1, y: 0, scale: 1 }}
//                     exit={{ opacity: 0, y: 8, scale: 0.96 }}
//                     className="absolute right-0 top-11 z-50 w-80 rounded-xl border border-slate-200 bg-white shadow-lg"
//                   >
//                     <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
//                       <h3 className="text-sm font-semibold text-slate-900">Notifications</h3>
//                       <span className="rounded-full bg-teal-50 px-2 py-0.5 text-[11px] font-semibold text-teal-700">
//                         {notifications.length} new
//                       </span>
//                     </div>

//                     <div className="max-h-[300px] overflow-y-auto">
//                       {notifications.length > 0 ? (
//                         notifications.map((notif) => (
//                           <button
//                             key={notif.id}
//                             onClick={() => {
//                               setActiveSection(notif.section);
//                               setShowNotifications(false);
//                             }}
//                             className="flex w-full items-start gap-3 border-b border-slate-50 px-4 py-2.5 text-left transition-colors hover:bg-slate-50"
//                           >
//                             <div className="mt-1.5 size-1.5 rounded-full bg-teal-500 shrink-0" />
//                             <div className="flex-1 min-w-0">
//                               <p className="text-[13px] font-medium text-slate-700 truncate">
//                                 {notif.message}
//                               </p>
//                               <p className="mt-0.5 text-[11px] text-slate-400">
//                                 {notif.type} • {new Date(notif.time).toLocaleDateString()}
//                               </p>
//                             </div>
//                           </button>
//                         ))
//                       ) : (
//                         <div className="px-4 py-8 text-center">
//                           <Bell size={24} className="mx-auto text-slate-300" />
//                           <p className="mt-2 text-sm text-slate-500">No notifications yet</p>
//                         </div>
//                       )}
//                     </div>
//                   </motion.div>

//                   <div
//                     className="fixed inset-0 z-40"
//                     onClick={() => setShowNotifications(false)}
//                   />
//                 </>
//               )}
//             </AnimatePresence>
//           </div>

//           <div className="hidden items-center gap-2.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 sm:flex">
//             <div className="flex size-7 items-center justify-center rounded-md bg-teal-50 text-xs font-bold text-teal-600">
//               A
//             </div>
//             <div>
//               <p className="text-[13px] font-semibold text-slate-900">
//                 {adminUser?.name || "Admin"}
//               </p>
//               <p className="text-[11px] text-slate-400">Administrator</p>
//             </div>
//             <ChevronDown size={14} className="text-slate-400" />
//           </div>
//         </div>
//       </header>
//     );
//   };

//   const StatsCard = ({ title, value, icon: Icon, accent = "teal", subtitle = "" }) => (
//     <motion.div
//       whileHover={{ y: -2 }}
//       className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md"
//     >
//       <div className="flex items-center justify-between gap-4">
//         <div className="min-w-0">
//           <p className="truncate text-[11px] font-semibold uppercase tracking-wide text-slate-500">{title}</p>
//           <p className="mt-1.5 text-2xl font-bold text-slate-900">{value}</p>
//           {subtitle && (
//             <p className="mt-1 text-[11px] text-slate-400">{subtitle}</p>
//           )}
//         </div>
//         <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
//           <Icon size={20} strokeWidth={1.75} />
//         </div>
//       </div>
//     </motion.div>
//   );

//   const ChartCard = ({ title, children, className = "" }) => (
//     <section className={`rounded-xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}>
//       <h3 className="mb-4 text-base font-semibold text-slate-900">{title}</h3>
//       {children}
//     </section>
//   );

//   const DeleteModal = () => (
//     <AnimatePresence>
//       {deleteState && (
//         <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setDeleteState(null)}
//             className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
//           />
//           <motion.div
//             initial={{ opacity: 0, y: 12, scale: 0.97 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: 12, scale: 0.97 }}
//             className="relative w-full max-w-sm rounded-xl bg-white p-6 shadow-lg"
//           >
//             <h3 className="text-lg font-semibold text-slate-900">Confirm Removal</h3>
//             <p className="mt-2 text-sm text-slate-500">
//               This action cannot be undone. Are you sure you want to proceed?
//             </p>

//             <div className="mt-5 flex justify-end gap-2.5">
//               <button
//                 type="button"
//                 onClick={() => setDeleteState(null)}
//                 className="rounded-lg border border-slate-200 px-4 py-2 text-[13px] font-semibold text-slate-600 transition-colors hover:bg-slate-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 onClick={() =>
//                   removeResource(deleteState.endpoint, deleteState.id, deleteState.onSuccess)
//                 }
//                 className="rounded-lg bg-red-600 px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-red-700"
//               >
//                 Remove
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </AnimatePresence>
//   );



//   const DetailsModal = () => (
//   <AnimatePresence>
//     {selectedRecord && (
//       <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           onClick={() => setSelectedRecord(null)}
//           className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
//         />
//         <motion.div
//           initial={{ opacity: 0, y: 12, scale: 0.97 }}
//           animate={{ opacity: 1, y: 0, scale: 1 }}
//           exit={{ opacity: 0, y: 12, scale: 0.97 }}
//           className="relative max-h-[84vh] w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-lg"
//         >
//           <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3.5">
//             <div>
//               <h3 className="text-base font-semibold text-slate-900">
//                 {selectedRecord.type === 'guest' ? 'Guest Details' : 
//                  selectedRecord.donorName ? 'Donor Details' : 'Message Details'}
//               </h3>
//               <p className="mt-0.5 text-[13px] text-slate-500">Complete information.</p>
//             </div>
//             <button
//               type="button"
//               onClick={() => setSelectedRecord(null)}
//               className="flex size-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50"
//             >
//               <X size={16} />
//             </button>
//           </div>
//           <div className="max-h-[65vh] overflow-y-auto p-5">
//             {/* Guest-specific header */}
//             {selectedRecord.type === 'guest' && (
//               <div className="mb-4 flex items-center gap-3 p-4 rounded-lg bg-teal-50 border border-teal-100">
//                 <div className="flex size-12 items-center justify-center rounded-full bg-teal-100 text-lg font-bold text-teal-700">
//                   {selectedRecord.name?.charAt(0)?.toUpperCase() || "G"}
//                 </div>
//                 <div>
//                   <h4 className="text-lg font-semibold text-slate-900">{selectedRecord.name || "Anonymous"}</h4>
//                   <p className="text-[13px] text-slate-500">Guest Registration</p>
//                 </div>
//               </div>
//             )}
//             <div className="grid gap-3 sm:grid-cols-2">
//               {Object.entries(selectedRecord)
//                 .filter(([key]) => key !== '__v' && key !== '_id' && key !== 'type')
//                 .map(([key, value]) => (
//                   <div key={key} className="rounded-lg border border-slate-200 bg-slate-50 p-3.5">
//                     <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
//                       {key.replace(/([A-Z])/g, ' $1').trim()}
//                     </p>
//                     <p className="mt-1 break-words text-[13px] font-medium text-slate-700">
//                       {key.toLowerCase().includes('phone') ? (
//                         <a href={`tel:${value}`} className="text-teal-600 hover:underline">{value || "—"}</a>
//                       ) : key.toLowerCase().includes('amount') ? (
//                         `₹${parseFloat(value).toLocaleString() || '—'}`
//                       ) : (
//                         String(value || "—")
//                       )}
//                     </p>
//                   </div>
//                 ))}
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     )}
//   </AnimatePresence>
// );
//   const ContactTable = () => {
//     const [query, setQuery] = useState("");
    
//     const filtered = allContacts.filter((item) =>
//       JSON.stringify(item).toLowerCase().includes(query.toLowerCase())
//     );

//     const refreshData = () => fetchResource(endpoints.contacts, setAllContacts, ["contacts"]);

//     return (
//       <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
//         <div className="border-b border-slate-100 p-4">
//           <div className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2">
//             <Search size={16} className="text-slate-400 shrink-0" />
//             <input
//               value={query}
//               onChange={(event) => setQuery(event.target.value)}
//               placeholder="Search messages..."
//               className="w-full bg-transparent text-[13px] font-medium outline-none placeholder:text-slate-400"
//             />
//           </div>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full min-w-[800px] text-left">
//             <thead>
//               <tr className="border-b border-slate-100">
//                 <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500">Name</th>
//                 <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500">Email</th>
//                 <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500">Phone</th>
//                 <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500">Message</th>
//                 <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-slate-500">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {filtered.map((contact) => (
//                 <tr
//                   key={contact._id || contact.id}
//                   className="border-b border-slate-50 transition-colors hover:bg-slate-50/50"
//                 >
//                   <td className="px-4 py-3 text-[13px] font-medium text-slate-700">{contact.name || "—"}</td>
//                   {/* <td className="px-4 py-3 text-[13px] text-slate-500" >{contact.email || "—"}</td> */}
//                   <td className="px-4 py-3 text-[13px] text-slate-500">
//   {contact.email ? (
//     <a
//       href={`mailto:${contact.email}`}
//       className="hover:underline"
//     >
//       {contact.email}
//     </a>
//   ) : (
//     "—"
//   )}
// </td>
//                   {/* <td className="px-4 py-3 text-[13px] text-slate-500">{contact.phone || "—"}</td> */}
//                   <td className="px-4 py-3 text-[13px] text-slate-500">
//   {contact.phone ? (
//     <a
//       href={`tel:${contact.phone}`}
//       className="hover:underline"
//     >
//       {contact.phone}
//     </a>
//   ) : (
//     "—"
//   )}
// </td>
//                   <td className="max-w-[200px] truncate px-4 py-3 text-[13px] text-slate-500">{contact.message || "—"}</td>
//                   <td className="px-4 py-3">
//                     <div className="flex justify-end gap-1.5">
//                       <button
//                         type="button"
//                         onClick={() => setSelectedRecord(contact)}
//                         className="flex size-7 items-center justify-center rounded-md border border-slate-200 text-slate-500 transition-colors hover:bg-teal-50 hover:text-teal-600 hover:border-teal-200"
//                       >
//                         <Eye size={14} />
//                       </button>
//                       <button
//                         type="button"
//                         onClick={() =>
//                           setDeleteState({
//                             id: contact._id || contact.id,
//                             endpoint: endpoints.deleteContact,
//                             onSuccess: refreshData,
//                           })
//                         }
//                         className="flex size-7 items-center justify-center rounded-md border border-slate-200 text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600 hover:border-red-200"
//                       >
//                         <Trash2 size={14} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}

//               {!filtered.length && (
//                 <tr>
//                   <td colSpan={5} className="px-6 py-12 text-center text-[13px] font-medium text-slate-400">
//                     No messages yet
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </section>
//     );
//   };

//   const DonorTable = () => {
//     const filtered = allDonors.filter((item) =>
//       JSON.stringify(item).toLowerCase().includes(donorSearchQuery.toLowerCase())
//     );
// console.log("Filtered Donors:", filtered);
//     const getDonorTier = (amount) => {
//       const donationAmount = parseFloat(amount) || 0;
//       if (donationAmount >= 10000) return { label: 'Major Donor', color: 'bg-teal-100 text-teal-700' };
//       if (donationAmount >= 5000) return { label: 'Generous Donor', color: 'bg-emerald-100 text-emerald-700' };
//       if (donationAmount >= 1000) return { label: 'Supporting Donor', color: 'bg-cyan-100 text-cyan-700' };
//       return { label: 'Contributor', color: 'bg-slate-100 text-slate-700' };
//     };

//     return (
//       <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
//         <div className="border-b border-slate-100 p-4">
//           <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//             <div className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 flex-1">
//               <Search size={16} className="text-slate-400 shrink-0" />
//               <input
//                 value={donorSearchQuery}
//                 onChange={(event) => setDonorSearchQuery(event.target.value)}
//                 placeholder="Search donors by name, email, or phone..."
//                 className="w-full bg-transparent text-[13px] font-medium outline-none placeholder:text-slate-400"
//               />
//             </div>
//             <div className="flex items-center gap-3">
//               <div className="flex items-center gap-2 rounded-lg bg-teal-50 px-3 py-1.5">
//                 <IndianRupee size={14} className="text-teal-600" />
//                 <span className="text-[13px] font-semibold text-teal-700">
//                   Total: ₹{totalDonationAmount.toLocaleString()}
//                 </span>
//               </div>
//               <DonorDownloadMenu 
//               allDonors={allDonors} 
//               filteredDonors={filtered} 
//               totalDonationAmount={totalDonationAmount}
//               donorSearchQuery={donorSearchQuery}
//             />
//             </div>
//           </div>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full min-w-[900px] text-left">
//             <thead>
//               <tr className="border-b border-slate-100">
//                 <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500">Donor Name</th>
//                 <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500">Phone</th>
//                 <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500">Email</th>
//                 <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500">Amount</th>
//                 <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500">Tier</th>
//                 <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500">Date</th>
//                 <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-slate-500">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {filtered.map((donor) => {
//                 const tier = getDonorTier(donor.amount);
//                 return (
//                   <tr
//                     key={donor._id || donor.id}
//                     className="border-b border-slate-50 transition-colors hover:bg-slate-50/50"
//                   >
//                     <td className="px-4 py-3 text-[13px] font-medium text-slate-700">
//                       {donor.donorName || "Anonymous"}
//                     </td>
//                     {/* <td className="px-4 py-3 text-[13px] text-slate-500">{donor.phoneNumber || "—"}</td>
//                     <td className="px-4 py-3 text-[13px] text-slate-500">{donor.email || "—"}</td> */}
//                       <td className="px-4 py-3 text-[13px] text-slate-500">
//   {donor.email ? (
//     <a
//       href={`mailto:${donor.email}`}
//       className="hover:underline"
//     >
//       {donor.email}
//     </a>
//   ) : (
//     "—"
//   )}
// </td>
                 
//                   <td className="px-4 py-3 text-[13px] text-slate-500">
//   {donor.phoneNumber ? (
//     <a
//       href={`tel:${donor.phoneNumber}`}
//       className="hover:underline"
//     >
//       {donor.phoneNumber}
//     </a>
//   ) : (
//     "—"
//   )}
// </td>
//                     <td className="px-4 py-3">
//                       <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-teal-700">
//                         <IndianRupee size={12} />
//                         {parseFloat(donor.amount).toLocaleString() || "0"}
//                       </span>
//                     </td>
//                     <td className="px-4 py-3">
//                       <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${tier.color}`}>
//                         {tier.label}
//                       </span>
//                     </td>
//                     <td className="px-4 py-3 text-[13px] text-slate-500">
//                       {donor.createdAt ? new Date(donor.createdAt).toLocaleDateString() : "—"}
//                     </td>
//                     <td className="px-4 py-3">
//                       <div className="flex justify-end gap-1.5">
//                         <button
//                           type="button"
//                           onClick={() => setSelectedRecord(donor)}
//                           className="flex size-7 items-center justify-center rounded-md border border-slate-200 text-slate-500 transition-colors hover:bg-teal-50 hover:text-teal-600 hover:border-teal-200"
//                         >
//                           <Eye size={14} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 );
//               })}

//               {!filtered.length && (
//                 <tr>
//                   <td colSpan={7} className="px-6 py-12 text-center">
//                     <Heart size={28} className="mx-auto text-slate-300" />
//                     <p className="mt-2 text-[13px] font-medium text-slate-400">No donors yet</p>
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </section>
//     );
//   };

// const renderDashboard = () => (
//   <div className="space-y-5">
//     <section className="rounded-xl bg-gradient-to-br from-slate-800 via-slate-800 to-teal-900 p-6 text-white lg:p-8">
//       <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
//         <div>
//           <div className="inline-flex rounded-full bg-white/10 px-3.5 py-1 text-[11px] font-semibold text-teal-300">
//             Admin Overview
//           </div>
//           <h2 className="mt-3 text-2xl font-bold tracking-tight lg:text-3xl">
//             Foundation Management
//           </h2>
//           <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-slate-300">
//             Manage contacts, donors, gallery images, and sponsors from one central dashboard.
//           </p>
//         </div>

//         <div className="grid gap-2 sm:grid-cols-2">
//           {[
//             ["Messages", "contacts"],
//             ["Donors", "donors"],
//             ["Guests", "guests"],
//             ["Gallery", "gallery"],
//           ].map(([label, id]) => (
//             <button
//               key={id}
//               type="button"
//               onClick={() => setActiveSection(id)}
//               className="rounded-lg bg-white/10 px-4 py-2.5 text-[13px] font-medium text-white transition-all hover:bg-white/20"
//             >
//               {label}
//             </button>
//           ))}
//         </div>
//       </div>
//     </section>

//     {/* 2x2 Cards Grid */}
//     <div className="grid gap-4 sm:grid-cols-2">
//       <StatsCard title="Contact Messages" value={allContacts.length} icon={Mail} />
//       <StatsCard title="Total Donors" value={allDonors.length} icon={Heart} />
//       <StatsCard 
//         title="Total Guests" 
//         value={guestPagination.total.toLocaleString()} 
//         icon={Users}
//         subtitle="Bhandara attendees"
//       />
//       <StatsCard 
//         title="Total Donations" 
//         value={`₹${totalDonationAmount.toLocaleString()}`} 
//         icon={IndianRupee} 
//         subtitle={`Avg: ₹${averageDonation.toLocaleString()}`}
//       />
//     </div>

//     {/* Full Width Guest Registration Trend */}
//     <ChartCard title="Guest Registration Trend">
//       <ResponsiveContainer width="100%" height={350}>
//         <LineChart data={groupByMonth(allGuests, "guests")}>
//           <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
//           <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} />
//           <YAxis stroke="#94A3B8" fontSize={12} />
//           <Tooltip />
//           <Line 
//             type="monotone" 
//             dataKey="guests" 
//             stroke="#0F766E" 
//             strokeWidth={3}
//             dot={{ fill: "#0F766E", strokeWidth: 2, r: 4 }}
//             activeDot={{ r: 8, strokeWidth: 2 }}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </ChartCard>

//     {/* Donation Charts - Side by Side */}
//     <div className="grid gap-5 lg:grid-cols-2">
//       <ChartCard title="Donation Trends">
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={donationAmountData}>
//             <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
//             <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} />
//             <YAxis stroke="#94A3B8" fontSize={12} />
//             <Tooltip content={<CustomTooltip />} />
//             <Bar dataKey="Amount" fill="#0F766E" radius={[4, 4, 0, 0]} />
//           </BarChart>
//         </ResponsiveContainer>
//       </ChartCard>

//       <ChartCard title="Donation Distribution">
//         {getDonationTierData().length > 0 ? (
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={getDonationTierData()}
//                 cx="50%"
//                 cy="50%"
//                 labelLine={false}
//                 label={renderCustomizedLabel}
//                 outerRadius={110}
//                 innerRadius={50}
//                 fill="#8884d8"
//                 dataKey="value"
//               >
//                 {getDonationTierData().map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={entry.color} />
//                 ))}
//               </Pie>
//               <Tooltip content={<CustomTooltip />} />
//             </PieChart>
//           </ResponsiveContainer>
//         ) : (
//           <div className="flex items-center justify-center h-64">
//             <div className="text-center">
//               <Heart size={32} className="mx-auto text-slate-300" />
//               <p className="mt-2 text-sm text-slate-500">No donation data yet</p>
//             </div>
//           </div>
//         )}
//       </ChartCard>
//     </div>

//     {/* Full Width Contact Messages Trend */}
//     <ChartCard title="Contact Messages Trend">
//       <ResponsiveContainer width="100%" height={300}>
//         <BarChart data={contactsData}>
//           <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
//           <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} />
//           <YAxis stroke="#94A3B8" fontSize={12} />
//           <Tooltip />
//           <Bar dataKey="contacts" fill="#0F766E" radius={[4, 4, 0, 0]} />
//         </BarChart>
//       </ResponsiveContainer>
//     </ChartCard>

//     {/* Recent Donors Quick View */}
//     {allDonors.length > 0 && (
//       <ChartCard title="Recent Donations">
//         <div className="overflow-x-auto">
//           <table className="w-full min-w-[600px] text-left">
//             <thead>
//               <tr className="border-b border-slate-100">
//                 <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">Donor</th>
//                 <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">Amount</th>
//                 <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {allDonors.slice(0, 5).map((donor) => (
//                 <tr key={donor._id} className="border-b border-slate-50">
//                   <td className="px-3 py-2.5 text-[13px] font-medium text-slate-700">
//                     {donor.donorName || "Anonymous"}
//                   </td>
//                   <td className="px-3 py-2.5 text-[13px] font-semibold text-teal-700">
//                     ₹{parseFloat(donor.amount).toLocaleString()}
//                   </td>
//                   <td className="px-3 py-2.5 text-[13px] text-slate-500">
//                     {new Date(donor.createdAt).toLocaleDateString()}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </ChartCard>
//     )}
//   </div>
// );

// const renderGallery = () => {
//   const refreshData = async () => {
//     try {
//       const result = await axios.get(ServerUrl + endpoints.gallery, {
//         withCredentials: true,
//       });
//       const data = getResponseArray(result, ["images", "gallery"]);
//       setAllGallery(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleDeleteGallery = (imageId) => {
//     setDeleteState({
//       id: imageId,
//       endpoint: endpoints.deleteGallery,
//       onSuccess: async () => {
//         // Optimistic update AFTER successful deletion
//         setAllGallery(prev => prev.filter(img => (img._id || img.id) !== imageId));
//         // Then refresh from server
//         await refreshData();
//       },
//     });
//   };

//   return (
//     <div className="space-y-5">
//       <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
//         <h3 className="text-base font-semibold text-slate-900 mb-4">Upload Gallery Image</h3>
        
//         <div className="flex flex-col items-center">
//           <div className="w-full max-w-md">
//             <label className="block">
//               <span className="text-[13px] font-semibold text-slate-700">
//                 Image {isUploadingGalleryImage && <span className="text-teal-600">(Uploading...)</span>}
//               </span>
//               <div className="mt-1.5 flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-center transition-colors hover:bg-teal-50/50 hover:border-teal-300">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   id="gallery-image"
//                   onChange={async (event) => {
//                     const file = event.target.files?.[0];
//                     if (file) {
//                       setGalleryImageFile(file);
//                       setGalleryImagePreview(URL.createObjectURL(file));
                      
//                       setIsUploadingGalleryImage(true);
//                       try {
//                         const data = new FormData();
//                         data.append('my_file', file);
                        
//                         const uploadResponse = await axios.post(
//                           `${ServerUrl}${endpoints.uploadImage}`,
//                           data,
//                           {
//                             headers: { "Content-Type": "multipart/form-data" },
//                             withCredentials: true,
//                           }
//                         );
                        
//                         if (uploadResponse.data.success) {
//                           const cloudUrl = uploadResponse.data.result.url;
//                           setUploadedGalleryImageUrl(cloudUrl);
                          
//                           try {
//                             await axios.post(ServerUrl + endpoints.addGallery, {
//                               imageUrl: cloudUrl,
//                             }, {
//                               headers: { "Content-Type": "application/json" },
//                               withCredentials: true,
//                             });
                            
//                             refreshData();
//                             setGalleryImageFile(null);
//                             setGalleryImagePreview("");
//                             setUploadedGalleryImageUrl(null);
//                             toast.success("Image added to gallery");
//                           } catch (error) {
//                             console.log(error);
//                             toast.error("Failed to save to gallery");
//                           }
//                         }
//                       } catch (error) {
//                         console.error("Image upload failed:", error);
//                         toast.error("Failed to upload image");
//                         setGalleryImageFile(null);
//                         setGalleryImagePreview("");
//                       } finally {
//                         setIsUploadingGalleryImage(false);
//                       }
//                     }
//                   }}
//                 />
//                 <label htmlFor="gallery-image" className="cursor-pointer">
//                   {isUploadingGalleryImage ? (
//                     <div className="flex flex-col items-center">
//                       <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-teal-100 border-t-teal-600" />
//                       <span className="mt-3 text-[13px] font-medium text-teal-700">Uploading image...</span>
//                     </div>
//                   ) : galleryImagePreview ? (
//                     <div className="relative">
//                       <img
//                         src={galleryImagePreview}
//                         alt="Preview"
//                         className="mx-auto max-h-44 rounded-lg object-cover"
//                       />
//                       <p className="mt-3 text-[12px] text-teal-600">Uploading and saving automatically...</p>
//                     </div>
//                   ) : (
//                     <div className="flex flex-col items-center">
//                       <ImagePlus size={32} className="text-teal-500" />
//                       <span className="mt-3 text-[13px] font-medium text-slate-600">Click to upload image</span>
//                       <span className="mt-1 text-[12px] text-slate-400">Image will be automatically saved</span>
//                     </div>
//                   )}
//                 </label>
//               </div>
//             </label>
//           </div>
//         </div>
//       </section>

//       <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
//         <h3 className="text-base font-semibold text-slate-900">Gallery Images ({allGallery.length})</h3>

//         <div className="mt-4 columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
//           {allGallery.length === 0 && (
//             <div className="py-12 text-center col-span-full">
//               <ImagePlus size={28} className="mx-auto text-slate-300" />
//               <p className="mt-2 text-[13px] font-medium text-slate-400">No images in gallery</p>
//             </div>
//           )}
//           {allGallery.map((image) => (
//             <figure
//               key={image._id || image.id}
//               className="group relative mb-4 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md break-inside-avoid"
//             >
//               <img
//                 src={image.imageUrl || image.url}
//                 alt="Gallery image"
//                 className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
//               />

//               <div className="absolute inset-0 flex items-center justify-center bg-slate-900/0 transition-all duration-300 group-hover:bg-slate-900/30">
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleDeleteGallery(image._id || image.id);
//                   }}
//                   className="flex size-8 items-center justify-center rounded-lg bg-white/95 text-red-500 shadow-md opacity-0 transition-all duration-300 hover:bg-red-50 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
//                   title="Delete image"
//                 >
//                   <Trash2 size={15} />
//                 </button>
//               </div>
//             </figure>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// const renderSponsors = () => {
//   const refreshData = async () => {
//     try {
//       const result = await axios.get(ServerUrl + endpoints.sponsors, {
//         withCredentials: true,
//       });
//       const data = getResponseArray(result, ["sponsors", "images"]);
//       setAllSponsors(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleDeleteSponsor = (sponsorId) => {
//     setDeleteState({
//       id: sponsorId,
//       endpoint: endpoints.deleteSponsor,
//       onSuccess: async () => {
//         // Optimistic update AFTER successful deletion
//         setAllSponsors(prev => prev.filter(s => (s._id || s.id) !== sponsorId));
//         // Then refresh from server to ensure sync
//         await refreshData();
//       },
//     });
//   };

//   return (
//     <div className="space-y-5">
//       <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
//         <form
//           onSubmit={async (e) => {
//             e.preventDefault();
            
//             if (!sponsorName.trim()) {
//               toast.error("Please enter sponsor name");
//               return;
//             }
            
//             const sponsorData = {
//               title: sponsorName,
//               imageUrl: uploadedSponsorImageUrl || '',
//             };
            
//             try {
//               const result = await axios.post(ServerUrl + endpoints.addSponsor, sponsorData, {
//                 headers: { "Content-Type": "application/json" },
//                 withCredentials: true,
//               });
              
//               const newSponsor = result.data?.sponsor || result.data?.data || result.data;
              
//               setAllSponsors(prevSponsors => [newSponsor, ...prevSponsors]);
              
//               setSponsorName("");
//               setSponsorImageFile(null);
//               setSponsorImagePreview("");
//               setUploadedSponsorImageUrl(null);
              
//               toast.success("Sponsor added successfully");
//             } catch (error) {
//               console.log(error);
//               toast.error("Sponsor upload failed");
//             }
//           }}
//           className="max-w-md mx-auto space-y-4"
//         >
//           <h3 className="text-base font-semibold text-slate-900 text-center">Add Sponsor</h3>
          
//           <div>
//             <label className="block">
//               <span className="text-[13px] font-semibold text-slate-700">Sponsor Name *</span>
//               <input
//                 type="text"
//                 required
//                 value={sponsorName}
//                 onChange={(e) => setSponsorName(e.target.value)}
//                 className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 text-[13px] font-medium outline-none transition-colors focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
//                 placeholder="Enter sponsor name..."
//               />
//             </label>
//           </div>

//           <div>
//             <label className="block">
//               <span className="text-[13px] font-semibold text-slate-700">
//                 Sponsor Image {isUploadingSponsorImage && <span className="text-teal-600">(Uploading...)</span>}
//               </span>
//               <div className="mt-1.5 flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-center transition-colors hover:bg-teal-50/50 hover:border-teal-300">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   id="sponsor-image"
//                   onChange={async (event) => {
//                     const file = event.target.files?.[0];
//                     if (file) {
//                       setSponsorImageFile(file);
//                       setSponsorImagePreview(URL.createObjectURL(file));
                      
//                       setIsUploadingSponsorImage(true);
//                       try {
//                         const data = new FormData();
//                         data.append('my_file', file);
                        
//                         const uploadResponse = await axios.post(
//                           `${ServerUrl}${endpoints.sponsorUpload}`,
//                           data,
//                           {
//                             headers: { "Content-Type": "multipart/form-data" },
//                             withCredentials: true,
//                           }
//                         );
                        
//                         if (uploadResponse.data.success) {
//                           setUploadedSponsorImageUrl(uploadResponse.data.result.url);
//                           toast.success("Image uploaded successfully");
//                         }
//                       } catch (error) {
//                         console.error("Upload failed:", error);
//                         toast.error("Failed to upload image");
//                         setSponsorImageFile(null);
//                         setSponsorImagePreview("");
//                       } finally {
//                         setIsUploadingSponsorImage(false);
//                       }
//                     }
//                   }}
//                 />
//                 <label htmlFor="sponsor-image" className="cursor-pointer">
//                   {isUploadingSponsorImage ? (
//                     <div className="flex flex-col items-center">
//                       <div className="h-9 w-9 animate-spin rounded-full border-[3px] border-teal-100 border-t-teal-600" />
//                       <span className="mt-2 text-[13px] font-medium text-teal-700">Uploading...</span>
//                     </div>
//                   ) : sponsorImagePreview ? (
//                     <img
//                       src={sponsorImagePreview}
//                       alt="Preview"
//                       className="mx-auto max-h-28 rounded-lg object-contain"
//                     />
//                   ) : (
//                     <div className="flex flex-col items-center">
//                       <UploadCloud size={26} className="text-teal-500" />
//                       <span className="mt-2 text-[13px] font-medium text-slate-600">Click to upload image</span>
//                     </div>
//                   )}
//                 </label>
//               </div>
//             </label>
//           </div>

//           <button
//             type="submit"
//             className="w-full rounded-lg bg-teal-600 px-5 py-2.5 text-[13px] font-semibold text-white shadow-sm transition-all hover:bg-teal-700"
//           >
//             Add Sponsor
//           </button>
//         </form>
//       </section>

//       <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
//         <h3 className="text-base font-semibold text-slate-900">
//           Sponsors ({allSponsors.length})
//         </h3>

//         <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//           {allSponsors.length === 0 ? (
//             <div className="py-12 text-center col-span-full">
//               <Sparkles size={28} className="mx-auto text-slate-300" />
//               <p className="mt-2 text-[13px] font-medium text-slate-400">
//                 No sponsors yet
//               </p>
//             </div>
//           ) : (
//             allSponsors.map((sponsor) => {
//               const sponsorId = sponsor._id || sponsor.id;
//               return (
//                 <motion.div
//                   key={sponsorId}
//                   layout
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0, scale: 0.8 }}
//                   className="group relative rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md flex flex-col items-center"
//                 >
//                   <img
//                     src={sponsor.imageUrl || sponsor.logo || sponsor.image}
//                     alt={sponsor.name || sponsor.title || "Sponsor"}
//                     className="h-20 w-auto max-w-full object-contain"
//                     onError={(e) => {
//                       e.target.src = 'data:image/svg+xml;base64,...';
//                     }}
//                   />
//                   <p className="mt-3 text-center text-[13px] font-semibold text-slate-700">
//                     {sponsor.name || sponsor.title || "Unnamed Sponsor"}
//                   </p>
                  
//                   <button
//                     onClick={() => handleDeleteSponsor(sponsorId)}
//                     className="absolute top-2 right-2 flex size-7 items-center justify-center rounded-md border border-slate-200 text-slate-400 opacity-0 transition-all hover:bg-red-50 hover:text-red-500 hover:border-red-200 group-hover:opacity-100"
//                     title="Delete sponsor"
//                   >
//                     <Trash2 size={14} />
//                   </button>
//                 </motion.div>
//               );
//             })
//           )}
//         </div>
//       </section>
//     </div>
//   );
// };
  
//   const renderAdmins = () => (
//     <div className="space-y-5">
//       <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
//         <div>
//           <h3 className="text-lg font-semibold text-slate-900">
//             Admin Management ({allAdmins.length})
//           </h3>
//           <p className="mt-1 text-[13px] text-slate-500">
//             Manage users with administrative access.
//           </p>
//         </div>

//         <button
//           type="button"
//           onClick={() => setShowAdminModal(true)}
//           className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-[13px] font-semibold text-white shadow-sm transition-all hover:bg-teal-700"
//         >
//           <Plus size={16} />
//           Add Admin
//         </button>
//       </div>

//       <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
//         <div className="overflow-x-auto">
//           <table className="w-full min-w-[500px] text-left">
//             <thead>
//               <tr className="border-b border-slate-100">
//                 <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
//                   Email
//                 </th>
//                 <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
//                   Role
//                 </th>
//                 <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-slate-500">
//                   Actions
//                 </th>
//               </tr>
//             </thead>

//             <tbody>
//               {allAdmins.map((admin) => (
//                 <tr
//                   key={admin._id || admin.id}
//                   className="border-b border-slate-50 transition-colors hover:bg-slate-50/50"
//                 >
//                   <td className="px-4 py-3 text-[13px] font-medium text-slate-700">
//                     {admin.email}
//                   </td>
//                   <td className="px-4 py-3">
//                     <span className="rounded-full bg-teal-50 px-2.5 py-0.5 text-[11px] font-semibold text-teal-700">
//                       {admin.role || "admin"}
//                     </span>
//                   </td>
//                   <td className="px-4 py-3 text-right">
//                     {admin.role === "super-admin" ? (
//                       <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-400">
//                         Protected
//                       </span>
//                     ) : (
//                       <button
//                         type="button"
//                         onClick={() =>
//                           setDeleteState({
//                             id: admin._id || admin.id,
//                             endpoint: endpoints.deleteAdmin,
//                             onSuccess: fetchAllAdmins,
//                           })
//                         }
//                         className="inline-flex size-7 items-center justify-center rounded-md border border-slate-200 text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600 hover:border-red-200"
//                       >
//                         <Trash2 size={14} />
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </section>

//       <AnimatePresence>
//         {showAdminModal && (
//           <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setShowAdminModal(false)}
//               className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
//             />

//             <motion.form
//               initial={{ opacity: 0, y: 12, scale: 0.97 }}
//               animate={{ opacity: 1, y: 0, scale: 1 }}
//               exit={{ opacity: 0, y: 12, scale: 0.97 }}
//               onSubmit={addAdmin}
//               className="relative w-full max-w-sm rounded-xl bg-white p-5 shadow-lg"
//             >
//               <button
//                 type="button"
//                 onClick={() => setShowAdminModal(false)}
//                 className="absolute right-3 top-3 flex size-7 items-center justify-center rounded-md border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50"
//               >
//                 <X size={15} />
//               </button>

//               <h3 className="text-base font-semibold text-slate-900">Add New Admin</h3>

//               <div className="mt-4 space-y-3.5">
//                 <label className="block">
//                   <span className="text-[13px] font-semibold text-slate-700">Email</span>
//                   <input
//                     type="email"
//                     required
//                     value={adminForm.email}
//                     onChange={(event) =>
//                       setAdminForm((current) => ({
//                         ...current,
//                         email: event.target.value,
//                       }))
//                     }
//                     className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 text-[13px] font-medium outline-none transition-colors focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
//                     placeholder="admin@adiyogi.org"
//                   />
//                 </label>

//                 <label className="block">
//                   <span className="text-[13px] font-semibold text-slate-700">
//                     Password
//                   </span>
//                   <input
//                     type="password"
//                     required
//                     value={adminForm.password}
//                     onChange={(event) =>
//                       setAdminForm((current) => ({
//                         ...current,
//                         password: event.target.value,
//                       }))
//                     }
//                     className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 text-[13px] font-medium outline-none transition-colors focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
//                     placeholder="Enter secure password"
//                   />
//                 </label>
//               </div>

//               <button
//                 type="submit"
//                 className="mt-4 w-full rounded-lg bg-teal-600 px-5 py-2.5 text-[13px] font-semibold text-white shadow-sm transition-all hover:bg-teal-700"
//               >
//                 Add Admin
//               </button>
//             </motion.form>
//           </div>
//         )}
//       </AnimatePresence>
//     </div>
//   );

// const renderContent = () => {
//   if (activeSection === "dashboard") return renderDashboard();
//   if (activeSection === "contacts") return <ContactTable />;
//   if (activeSection === "donors") return <DonorTable />;
//   if (activeSection === "guests") return (
//     <GuestTable 
//       allGuests={allGuests}
//       guestPagination={guestPagination}
//       guestSearchQuery={guestSearchQuery}
//       showGuestModal={showGuestModal}
//       setGuestSearchQuery={setGuestSearchQuery}
//       setShowGuestModal={setShowGuestModal}
//       setDeleteState={setDeleteState}
//       setSelectedRecord={setSelectedRecord}
//       fetchGuests={fetchGuests}
//       addGuest={addGuest}
//       handleCloseGuestModal={handleCloseGuestModal}
//       guestForm={guestForm}
//       setGuestForm={setGuestForm}
//       isAddingGuest={isAddingGuest}
//     />
//   );
//   if (activeSection === "gallery") return renderGallery();
//   if (activeSection === "sponsors") return renderSponsors();
//   if (activeSection === "admins") return renderAdmins();
//   return <div>Section not found</div>;
// };

//   if (authLoading) {
//     return (
//       <div className="grid min-h-screen place-items-center bg-slate-50">
//         <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
//           <div className="mx-auto h-10 w-10 animate-spin rounded-full border-[3px] border-teal-100 border-t-teal-600" />
//           <p className="mt-4 text-[13px] font-semibold text-slate-600">
//             Verifying admin access...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <Sidebar />

//       <div className="lg:ml-64">
//         <Header />

//         <main className="p-4 lg:p-5">
//           <motion.div
//             key={activeSection}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
//           >
//             {renderContent()}
//           </motion.div>
//         </main>

//         <footer className="border-t border-slate-200 bg-white px-5 py-3.5">
//           <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
//             <div className="flex items-center gap-2">
//               <div className="flex size-6 items-center justify-center rounded-md bg-teal-50">
//                 <img src="/Adiyogi Foundation (1).jpeg" alt="logo" className="size-4 rounded object-cover" />
//               </div>
//               <span className="text-[13px] font-semibold text-slate-700">Adiyogi Foundation</span>
//               <span className="text-[12px] text-slate-400">© {new Date().getFullYear()}</span>
//             </div>
            
//             <div className="flex items-center gap-4 text-[12px] text-slate-400">
//               <span>Admin Panel</span>
//               <span className="flex items-center gap-1">
//                 Made with <span className="text-red-400">❤️</span> by <span className="font-medium text-slate-500">Abhishek</span>
//               </span>
//             </div>
//           </div>
//         </footer>
//       </div>

//       <DetailsModal />
//       <DeleteModal />
//     </div>
//   );
// }


import React, { useEffect, useState, useCallback } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Bell,
  ChevronDown,
  Eye,
  Heart,
  ImagePlus,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  Plus,
  Search,
  Shield,
  ShieldCheck,
  Sparkles,
  Trash2,
  UploadCloud,
  X,
  IndianRupee,
  TrendingUp,
  Users,
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Phone, 
  User
} from "lucide-react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";

const ServerUrl = "https://adiyogidonation.onrender.com";
const monthLabels = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "contacts", label: "Messages", icon: Mail },
  { id: "donors", label: "Donors", icon: Heart },
  { id: "guests", label: "Guests", icon: Users },
  { id: "gallery", label: "Gallery", icon: ImagePlus },
  { id: "sponsors", label: "Sponsors", icon: Sparkles },
  { id: "admins", label: "Admins", icon: Shield },
];

const endpoints = {
  currentUser: "/api/user/current-user",
  logout: "/api/user/logout",
  admins: "/api/user/get-user",
  addAdmin: "/api/user/admin-register",
  deleteAdmin: "/api/user/delete-user",
  contacts: "/api/contact/get-contacts",
  deleteContact: "/api/contact/delete-contact",
  donors: "/api/payment/donors",
  gallery: "/api/gallery/get",
  addGallery: "/api/gallery/add",
  uploadImage: "/api/gallery/upload-image",
  deleteGallery: "/api/gallery/delete",
  sponsors: "/api/sponsor/get",
  addSponsor: "/api/sponsor/add",
  deleteSponsor: "/api/sponsor/delete",
  sponsorUpload: "/api/sponsor/upload-image",
  guests: "/api/guest/get",
  addGuest: "/api/guest/add",
  deleteGuest: "/api/guest/delete",
};

const DONATION_TIERS = [
  { label: "Major Donors", min: 10000, color: '#0F766E' },
  { label: "Generous Donors", min: 5000, color: '#14B8A6' },
  { label: "Supporting Donors", min: 1000, color: '#5EEAD4' },
  { label: "Contributors", min: 0, color: '#99F6E4' },
];

function groupByMonth(data = [], labelKey, valueKey = null) {
  const grouped = Array(12).fill(0);
  data.forEach((item) => {
    if (!item?.createdAt) return;
    const monthIndex = new Date(item.createdAt).getMonth();
    if (monthIndex >= 0 && monthIndex < 12) {
      if (valueKey) {
        grouped[monthIndex] += parseFloat(item[valueKey]) || 0;
      } else {
        grouped[monthIndex]++;
      }
    }
  });
  return monthLabels.map((month, index) => ({
    month,
    [labelKey]: grouped[index],
  }));
}

function getResponseArray(result, keys = []) {
  for (const key of keys) {
    if (Array.isArray(result.data?.[key])) return result.data[key];
  }
  if (Array.isArray(result.data?.data)) return result.data.data;
  if (Array.isArray(result.data)) return result.data;
  return [];
}

// Custom Pie Chart Label
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
      <tspan x={x} y={y - 8} fontSize="11" fontWeight="600">
        {name}
      </tspan>
      <tspan x={x} y={y + 8} fontSize="12" fontWeight="700">
        {(percent * 100).toFixed(0)}%
      </tspan>
    </text>
  );
};

// Custom Tooltip for Charts
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-lg">
        <p className="text-[12px] font-semibold text-slate-600">{label}</p>
        {payload.map((pld, index) => (
          <p key={index} className="text-[13px] font-bold" style={{ color: pld.color }}>
            {pld.name}: {pld.name === 'Amount' ? `₹${pld.value.toLocaleString()}` : pld.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Download helpers
const downloadDonorsCSV = (data, filename = 'donors.csv') => {
  const headers = ['Donor Name', 'Email', 'Phone', 'Amount', 'Order ID', 'Payment ID', 'Date'];
  const csvRows = [headers.join(',')];
  
  data.forEach(donor => {
    const row = [
      `"${(donor.donorName || 'Anonymous').replace(/"/g, '""')}"`,
      `"${donor.email || '—'}"`,
      `"${donor.phoneNumber || '—'}"`,
      `"₹${parseFloat(donor.amount || 0).toLocaleString()}"`,
      `"${donor.orderId || '—'}"`,
      `"${donor.paymentId || '—'}"`,
      `"${donor.createdAt ? new Date(donor.createdAt).toLocaleDateString('en-IN') : '—'}"`
    ];
    csvRows.push(row.join(','));
  });
  
  const csvString = csvRows.join('\n');
  const blob = new Blob(['\ufeff' + csvString], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const downloadDonorsPDF = (data, totalDonors, totalAmount) => {
  const printWindow = window.open('', '_blank');
  
  const tableRows = data.map((donor, index) => {
    const tier = getDonorTierLabel(donor.amount);
    return `
    <tr>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0;">${index + 1}</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0;">${donor.donorName || 'Anonymous'}</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0;">${donor.email || '—'}</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0;">${donor.phoneNumber || '—'}</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #0F766E;">₹${parseFloat(donor.amount || 0).toLocaleString()}</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0;"><span style="background: #f0fdfa; color: #0F766E; padding: 2px 8px; border-radius: 12px; font-size: 12px;">${tier}</span></td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0;">${donor.createdAt ? new Date(donor.createdAt).toLocaleDateString('en-IN') : '—'}</td>
    </tr>
  `}).join('');

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Donor List - Adiyogi Foundation</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; color: #1e293b; }
        .header { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #0F766E; padding-bottom: 10px; }
        .header h1 { color: #0F766E; margin: 0; font-size: 24px; }
        .header p { color: #64748b; margin: 5px 0 0 0; font-size: 14px; }
        .summary { display: flex; justify-content: space-between; margin-bottom: 20px; padding: 10px; background: #f0fdfa; border-radius: 8px; }
        .summary div { text-align: center; }
        .summary strong { display: block; font-size: 20px; color: #0F766E; }
        .summary span { font-size: 12px; color: #64748b; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th { background: #0F766E; color: white; padding: 10px 12px; text-align: left; font-size: 13px; }
        td { padding: 8px 12px; border-bottom: 1px solid #e2e8f0; font-size: 13px; }
        tr:hover { background: #f8fafc; }
        .footer { margin-top: 20px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 10px; }
        @media print {
          body { margin: 0; }
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="no-print" style="margin-bottom: 15px; text-align: right;">
        <button onclick="window.print()" style="background: #0F766E; color: white; border: none; padding: 8px 20px; border-radius: 6px; cursor: pointer; font-size: 13px;">
          🖨️ Print / Save as PDF
        </button>
      </div>
      <div class="header">
        <h1>Adiyogi Foundation</h1>
        <p>Donor List Report</p>
      </div>
      <div class="summary">
        <div><strong>${totalDonors.toLocaleString()}</strong><span>Total Donors</span></div>
        <div><strong>₹${totalAmount.toLocaleString()}</strong><span>Total Donations</span></div>
        <div><strong>${new Date().toLocaleDateString('en-IN')}</strong><span>Report Date</span></div>
      </div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Donor Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Amount</th>
            <th>Tier</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
      <div class="footer">
        <p>© ${new Date().getFullYear()} Adiyogi Foundation | Admin Panel Report</p>
        <p>Generated on ${new Date().toLocaleString('en-IN')}</p>
      </div>
    </body>
    </html>
  `;
  
  printWindow.document.write(html);
  printWindow.document.close();
};

const getDonorTierLabel = (amount) => {
  const donationAmount = parseFloat(amount) || 0;
  if (donationAmount >= 10000) return 'Major Donor';
  if (donationAmount >= 5000) return 'Generous Donor';
  if (donationAmount >= 1000) return 'Supporting Donor';
  return 'Contributor';
};

const downloadAsCSV = (data, filename = 'guests.csv') => {
  const headers = ['Name', 'Phone', 'Location', 'Date'];
  const csvRows = [headers.join(',')];
  
  data.forEach(guest => {
    const row = [
      `"${(guest.name || 'Anonymous').replace(/"/g, '""')}"`,
      `"${guest.phone || '—'}"`,
      `"${(guest.location || '—').replace(/"/g, '""')}"`,
      `"${guest.createdAt ? new Date(guest.createdAt).toLocaleDateString('en-IN') : '—'}"`
    ];
    csvRows.push(row.join(','));
  });
  
  const csvString = csvRows.join('\n');
  const blob = new Blob(['\ufeff' + csvString], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const downloadAsPDF = (data, totalGuests) => {
  const printWindow = window.open('', '_blank');
  
  const tableRows = data.map((guest, index) => `
    <tr>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0;">${index + 1}</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0;">${guest.name || 'Anonymous'}</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0;">${guest.phone || '—'}</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0;">${guest.location || '—'}</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0;">${guest.createdAt ? new Date(guest.createdAt).toLocaleDateString('en-IN') : '—'}</td>
    </tr>
  `).join('');

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Guest List - Adiyogi Foundation</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; color: #1e293b; }
        .header { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #0F766E; padding-bottom: 10px; }
        .header h1 { color: #0F766E; margin: 0; font-size: 24px; }
        .header p { color: #64748b; margin: 5px 0 0 0; font-size: 14px; }
        .summary { display: flex; justify-content: space-between; margin-bottom: 20px; padding: 10px; background: #f0fdfa; border-radius: 8px; }
        .summary div { text-align: center; }
        .summary strong { display: block; font-size: 20px; color: #0F766E; }
        .summary span { font-size: 12px; color: #64748b; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th { background: #0F766E; color: white; padding: 10px 12px; text-align: left; font-size: 13px; }
        td { padding: 8px 12px; border-bottom: 1px solid #e2e8f0; font-size: 13px; }
        tr:hover { background: #f8fafc; }
        .footer { margin-top: 20px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 10px; }
        @media print {
          body { margin: 0; }
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="no-print" style="margin-bottom: 15px; text-align: right;">
        <button onclick="window.print()" style="background: #0F766E; color: white; border: none; padding: 8px 20px; border-radius: 6px; cursor: pointer; font-size: 13px;">
          🖨️ Print / Save as PDF
        </button>
      </div>
      <div class="header">
        <h1>Adiyogi Foundation</h1>
        <p>Anna Seva List Report</p>
      </div>
      <div class="summary">
        <div><strong>${totalGuests.toLocaleString()}</strong><span>Total Guests</span></div>
        <div><strong>${new Set(data.map(g => g.location).filter(Boolean)).size}</strong><span>Unique Locations</span></div>
        <div><strong>${new Date().toLocaleDateString('en-IN')}</strong><span>Report Date</span></div>
      </div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
      <div class="footer">
        <p>© ${new Date().getFullYear()} Adiyogi Foundation | Admin Panel Report</p>
        <p>Generated on ${new Date().toLocaleString('en-IN')}</p>
      </div>
    </body>
    </html>
  `;
  
  printWindow.document.write(html);
  printWindow.document.close();
};

// Donor Download Menu Component
// const DonorDownloadMenu = React.memo(({ allDonors, filteredDonors, totalDonationAmount }) => {
//   const [showMenu, setShowMenu] = useState(false);
//   const [isDownloadingAll, setIsDownloadingAll] = useState(false);

//   const handleDownloadCSV = () => {
//     setShowMenu(false);
//     if (filteredDonors.length > 0) {
//       downloadDonorsCSV(filteredDonors, 'donors_filtered.csv');
//       toast.success('CSV downloaded successfully');
//     }
//   };

//   const handleDownloadPDF = () => {
//     setShowMenu(false);
//     if (filteredDonors.length > 0) {
//       const totalAmount = filteredDonors.reduce((sum, d) => sum + (parseFloat(d.amount) || 0), 0);
//       downloadDonorsPDF(filteredDonors, filteredDonors.length, totalAmount);
//       toast.success('PDF opened in new tab');
//     }
//   };

//   const handleDownloadAllCSV = async () => {
//     setShowMenu(false);
//     setIsDownloadingAll(true);
//     try {
//       const result = await axios.get(
//         `${ServerUrl}${endpoints.donors}`,
//         { withCredentials: true }
//       );
//       if (result.data.success) {
//         const allDonations = result.data.donations || [];
//         downloadDonorsCSV(allDonations, 'all_donors.csv');
//         toast.success('All donors CSV downloaded');
//       }
//     } catch (error) {
//       toast.error('Failed to download all donors');
//     } finally {
//       setIsDownloadingAll(false);
//     }
//   };

//   return (
//     <div className="relative">
//       <button
//         onClick={() => setShowMenu(!showMenu)}
//         disabled={isDownloadingAll || allDonors.length === 0}
//         className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 md:px-4 py-2 text-[12px] md:text-[13px] font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 disabled:opacity-50 whitespace-nowrap"
//       >
//         {isDownloadingAll ? (
//           <>
//             <div className="h-4 w-4 animate-spin rounded-full border-2 border-teal-600 border-t-transparent" />
//             <span className="hidden sm:inline">Downloading...</span>
//           </>
//         ) : (
//           <>
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
//               <polyline points="7 10 12 15 17 10"/>
//               <line x1="12" y1="15" x2="12" y2="3"/>
//             </svg>
//             <span className="hidden sm:inline">Download</span>
//           </>
//         )}
//       </button>

//       <AnimatePresence>
//         {showMenu && (
//           <>
//             <motion.div
//               initial={{ opacity: 0, y: 5, scale: 0.95 }}
//               animate={{ opacity: 1, y: 0, scale: 1 }}
//               exit={{ opacity: 0, y: 5, scale: 0.95 }}
//               className="absolute right-0 top-10 z-50 w-56 rounded-xl border border-slate-200 bg-white shadow-lg p-1.5"
//             >
//               <button onClick={handleDownloadCSV} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium text-slate-700 transition-colors hover:bg-slate-50">
//                 <span className="flex size-8 items-center justify-center rounded-lg bg-green-50 text-green-600">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
//                     <polyline points="14 2 14 8 20 8"/>
//                     <line x1="16" y1="13" x2="8" y2="13"/>
//                     <line x1="16" y1="17" x2="8" y2="17"/>
//                   </svg>
//                 </span>
//                 <div>
//                   <p className="font-semibold">Excel / CSV</p>
//                   <p className="text-[11px] text-slate-400">Filtered data</p>
//                 </div>
//               </button>
//               <button onClick={handleDownloadPDF} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium text-slate-700 transition-colors hover:bg-slate-50">
//                 <span className="flex size-8 items-center justify-center rounded-lg bg-red-50 text-red-600">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
//                     <polyline points="14 2 14 8 20 8"/>
//                   </svg>
//                 </span>
//                 <div>
//                   <p className="font-semibold">PDF / Print</p>
//                   <p className="text-[11px] text-slate-400">Filtered data</p>
//                 </div>
//               </button>
//               <div className="my-1 border-t border-slate-100"></div>
//               <button onClick={handleDownloadAllCSV} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium text-slate-700 transition-colors hover:bg-teal-50">
//                 <span className="flex size-8 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
//                     <polyline points="7 10 12 15 17 10"/>
//                     <line x1="12" y1="15" x2="12" y2="3"/>
//                   </svg>
//                 </span>
//                 <div>
//                   <p className="font-semibold">Download All Data</p>
//                   <p className="text-[11px] text-slate-400">Complete {allDonors.length.toLocaleString()} records</p>
//                 </div>
//               </button>
//             </motion.div>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setShowMenu(false)}
//               className="fixed inset-0 z-40"
//             />
//           </>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// });
// DonorDownloadMenu.displayName = 'DonorDownloadMenu';
const DonorDownloadMenu = React.memo(({ allDonors, filteredDonors, totalDonationAmount }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isDownloadingAll, setIsDownloadingAll] = useState(false);

  const handleDownloadCSV = () => {
    setShowMenu(false);
    if (filteredDonors.length > 0) {
      downloadDonorsCSV(filteredDonors, 'donors_filtered.csv');
      toast.success('CSV downloaded successfully');
    }
  };

  const handleDownloadPDF = () => {
    setShowMenu(false);
    if (filteredDonors.length > 0) {
      const totalAmount = filteredDonors.reduce((sum, d) => sum + (parseFloat(d.amount) || 0), 0);
      downloadDonorsPDF(filteredDonors, filteredDonors.length, totalAmount);
      toast.success('PDF opened in new tab');
    }
  };

  const handleDownloadAllCSV = async () => {
    setShowMenu(false);
    setIsDownloadingAll(true);
    try {
      const result = await axios.get(
        `${ServerUrl}${endpoints.donors}`,
        { withCredentials: true }
      );
      if (result.data.success) {
        const allDonations = result.data.donations || [];
        downloadDonorsCSV(allDonations, 'all_donors.csv');
        toast.success('All donors CSV downloaded');
      }
    } catch (error) {
      toast.error('Failed to download all donors');
    } finally {
      setIsDownloadingAll(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        disabled={isDownloadingAll || allDonors.length === 0}
        className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-[13px] font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 disabled:opacity-50 whitespace-nowrap"
      >
        {isDownloadingAll ? (
          <>
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-teal-600 border-t-transparent" />
            Downloading...
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download
          </>
        )}
      </button>

      <AnimatePresence>
        {showMenu && (
          <>
            {/* Centered on mobile, right-aligned on desktop */}
            <motion.div
              initial={{ opacity: 0, y: 5, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.95 }}
              className="fixed sm:absolute left-1/2 sm:left-auto right-auto sm:right-0 top-1/2 sm:top-10 z-50 w-64 sm:w-56 -translate-x-1/2 sm:translate-x-0 -translate-y-1/2 sm:translate-y-0 rounded-xl border border-slate-200 bg-white shadow-lg p-1.5"
            >
              <button onClick={handleDownloadCSV} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium text-slate-700 transition-colors hover:bg-slate-50">
                <span className="flex size-8 items-center justify-center rounded-lg bg-green-50 text-green-600 shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                  </svg>
                </span>
                <div>
                  <p className="font-semibold">Excel / CSV</p>
                  <p className="text-[11px] text-slate-400">Filtered data</p>
                </div>
              </button>
              <button onClick={handleDownloadPDF} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium text-slate-700 transition-colors hover:bg-slate-50">
                <span className="flex size-8 items-center justify-center rounded-lg bg-red-50 text-red-600 shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                  </svg>
                </span>
                <div>
                  <p className="font-semibold">PDF / Print</p>
                  <p className="text-[11px] text-slate-400">Filtered data</p>
                </div>
              </button>
              <div className="my-1 border-t border-slate-100"></div>
              <button onClick={handleDownloadAllCSV} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium text-slate-700 transition-colors hover:bg-teal-50">
                <span className="flex size-8 items-center justify-center rounded-lg bg-teal-50 text-teal-600 shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                </span>
                <div>
                  <p className="font-semibold">Download All Data</p>
                  <p className="text-[11px] text-slate-400">Complete {allDonors.length.toLocaleString()} records</p>
                </div>
              </button>
              
              {/* Mobile close button */}
              <div className="mt-2 border-t border-slate-100 pt-2 sm:hidden">
                <button
                  onClick={() => setShowMenu(false)}
                  className="w-full rounded-lg bg-slate-100 px-3 py-2 text-[13px] font-semibold text-slate-600 transition-colors hover:bg-slate-200"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMenu(false)}
              className="fixed inset-0 z-40 bg-slate-900/20 sm:bg-transparent"
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
});
DonorDownloadMenu.displayName = 'DonorDownloadMenu';
// Guest Download Menu
// const GuestDownloadMenu = React.memo(({ allGuests, guestPagination }) => {
//   const [showMenu, setShowMenu] = useState(false);
//   const [isDownloadingAll, setIsDownloadingAll] = useState(false);

//   const handleDownloadCSV = () => {
//     setShowMenu(false);
//     if (allGuests.length > 0) {
//       downloadAsCSV(allGuests, `guests_page_${guestPagination.currentPage}.csv`);
//       toast.success('CSV downloaded successfully');
//     }
//   };

//   const handleDownloadPDF = () => {
//     setShowMenu(false);
//     if (allGuests.length > 0) {
//       downloadAsPDF(allGuests, guestPagination.total);
//       toast.success('PDF opened in new tab');
//     }
//   };

//   const handleDownloadAllCSV = async () => {
//     setShowMenu(false);
//     setIsDownloadingAll(true);
//     try {
//       const result = await axios.get(
//         `${ServerUrl}${endpoints.guests}?page=1&limit=${guestPagination.total}`,
//         { withCredentials: true }
//       );
//       if (result.data.success) {
//         downloadAsCSV(result.data.guests || [], 'all_guests.csv');
//         toast.success('All guests CSV downloaded');
//       }
//     } catch (error) {
//       toast.error('Failed to download all guests');
//     } finally {
//       setIsDownloadingAll(false);
//     }
//   };

//   return (
//     <div className="relative">
//       <button
//         onClick={() => setShowMenu(!showMenu)}
//         disabled={isDownloadingAll || allGuests.length === 0}
//         className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 md:px-4 py-2 text-[12px] md:text-[13px] font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 disabled:opacity-50 whitespace-nowrap"
//       >
//         {isDownloadingAll ? (
//           <>
//             <div className="h-4 w-4 animate-spin rounded-full border-2 border-teal-600 border-t-transparent" />
//             <span className="hidden sm:inline">Downloading...</span>
//           </>
//         ) : (
//           <>
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
//               <polyline points="7 10 12 15 17 10"/>
//               <line x1="12" y1="15" x2="12" y2="3"/>
//             </svg>
//             <span className="hidden sm:inline">Download</span>
//           </>
//         )}
//       </button>

//       <AnimatePresence>
//         {showMenu && (
//           <>
//             <motion.div
//               initial={{ opacity: 0, y: 5, scale: 0.95 }}
//               animate={{ opacity: 1, y: 0, scale: 1 }}
//               exit={{ opacity: 0, y: 5, scale: 0.95 }}
//               className="absolute right-0 top-10 z-50 w-56 rounded-xl border border-slate-200 bg-white shadow-lg p-1.5"
//             >
//               <button onClick={handleDownloadCSV} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium text-slate-700 transition-colors hover:bg-slate-50">
//                 <span className="flex size-8 items-center justify-center rounded-lg bg-green-50 text-green-600">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
//                     <polyline points="14 2 14 8 20 8"/>
//                     <line x1="16" y1="13" x2="8" y2="13"/>
//                     <line x1="16" y1="17" x2="8" y2="17"/>
//                   </svg>
//                 </span>
//                 <div>
//                   <p className="font-semibold">Excel / CSV</p>
//                   <p className="text-[11px] text-slate-400">Current page data</p>
//                 </div>
//               </button>
//               <button onClick={handleDownloadPDF} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium text-slate-700 transition-colors hover:bg-slate-50">
//                 <span className="flex size-8 items-center justify-center rounded-lg bg-red-50 text-red-600">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
//                     <polyline points="14 2 14 8 20 8"/>
//                   </svg>
//                 </span>
//                 <div>
//                   <p className="font-semibold">PDF / Print</p>
//                   <p className="text-[11px] text-slate-400">Current page data</p>
//                 </div>
//               </button>
//               <div className="my-1 border-t border-slate-100"></div>
//               <button onClick={handleDownloadAllCSV} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium text-slate-700 transition-colors hover:bg-teal-50">
//                 <span className="flex size-8 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
//                     <polyline points="7 10 12 15 17 10"/>
//                     <line x1="12" y1="15" x2="12" y2="3"/>
//                   </svg>
//                 </span>
//                 <div>
//                   <p className="font-semibold">Download All Data</p>
//                   <p className="text-[11px] text-slate-400">Complete {guestPagination.total.toLocaleString()} records</p>
//                 </div>
//               </button>
//             </motion.div>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setShowMenu(false)}
//               className="fixed inset-0 z-40"
//             />
//           </>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// });
// GuestDownloadMenu.displayName = 'GuestDownloadMenu';
const GuestDownloadMenu = React.memo(({ allGuests, guestPagination }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isDownloadingAll, setIsDownloadingAll] = useState(false);

  const handleDownloadCSV = () => {
    setShowMenu(false);
    if (allGuests.length > 0) {
      downloadAsCSV(allGuests, `guests_page_${guestPagination.currentPage}.csv`);
      toast.success('CSV downloaded successfully');
    }
  };

  const handleDownloadPDF = () => {
    setShowMenu(false);
    if (allGuests.length > 0) {
      downloadAsPDF(allGuests, guestPagination.total);
      toast.success('PDF opened in new tab');
    }
  };

  const handleDownloadAllCSV = async () => {
    setShowMenu(false);
    setIsDownloadingAll(true);
    try {
      const result = await axios.get(
        `${ServerUrl}${endpoints.guests}?page=1&limit=${guestPagination.total}`,
        { withCredentials: true }
      );
      if (result.data.success) {
        downloadAsCSV(result.data.guests || [], 'all_guests.csv');
        toast.success('All guests CSV downloaded');
      }
    } catch (error) {
      toast.error('Failed to download all guests');
    } finally {
      setIsDownloadingAll(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        disabled={isDownloadingAll || allGuests.length === 0}
        className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-[13px] font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 disabled:opacity-50 whitespace-nowrap"
      >
        {isDownloadingAll ? (
          <>
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-teal-600 border-t-transparent" />
            Downloading...
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download
          </>
        )}
      </button>

      <AnimatePresence>
        {showMenu && (
          <>
            {/* Centered on mobile, right-aligned on desktop */}
            <motion.div
              initial={{ opacity: 0, y: 5, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.95 }}
              className="fixed sm:absolute left-1/2 sm:left-auto right-auto sm:right-0 top-1/2 sm:top-10 z-50 w-64 sm:w-56 -translate-x-1/2 sm:translate-x-0 -translate-y-1/2 sm:translate-y-0 rounded-xl border border-slate-200 bg-white shadow-lg p-1.5"
            >
              <button onClick={handleDownloadCSV} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium text-slate-700 transition-colors hover:bg-slate-50">
                <span className="flex size-8 items-center justify-center rounded-lg bg-green-50 text-green-600 shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                  </svg>
                </span>
                <div>
                  <p className="font-semibold">Excel / CSV</p>
                  <p className="text-[11px] text-slate-400">Current page data</p>
                </div>
              </button>
              <button onClick={handleDownloadPDF} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium text-slate-700 transition-colors hover:bg-slate-50">
                <span className="flex size-8 items-center justify-center rounded-lg bg-red-50 text-red-600 shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                  </svg>
                </span>
                <div>
                  <p className="font-semibold">PDF / Print</p>
                  <p className="text-[11px] text-slate-400">Current page data</p>
                </div>
              </button>
              <div className="my-1 border-t border-slate-100"></div>
              <button onClick={handleDownloadAllCSV} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium text-slate-700 transition-colors hover:bg-teal-50">
                <span className="flex size-8 items-center justify-center rounded-lg bg-teal-50 text-teal-600 shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                </span>
                <div>
                  <p className="font-semibold">Download All Data</p>
                  <p className="text-[11px] text-slate-400">Complete {guestPagination.total.toLocaleString()} records</p>
                </div>
              </button>
              
              {/* Mobile close button */}
              <div className="mt-2 border-t border-slate-100 pt-2 sm:hidden">
                <button
                  onClick={() => setShowMenu(false)}
                  className="w-full rounded-lg bg-slate-100 px-3 py-2 text-[13px] font-semibold text-slate-600 transition-colors hover:bg-slate-200"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMenu(false)}
              className="fixed inset-0 z-40 bg-slate-900/20 sm:bg-transparent"
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
});
GuestDownloadMenu.displayName = 'GuestDownloadMenu';
// Add Guest Modal
const AddGuestModal = React.memo(({ 
  show, 
  onClose, 
  isAddingGuest, 
  guestForm, 
  setGuestForm, 
  onSubmit 
}) => (
  <AnimatePresence>
    {show && (
      <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => !isAddingGuest && onClose()}
          className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        />

        <motion.form
          initial={{ opacity: 0, y: 12, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.97 }}
          onSubmit={onSubmit}
          className="relative w-full max-w-md rounded-xl bg-white p-5 shadow-lg mx-4"
        >
          <button
            type="button"
            onClick={() => !isAddingGuest && onClose()}
            className="absolute right-3 top-3 flex size-7 items-center justify-center rounded-md border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50"
            disabled={isAddingGuest}
          >
            <X size={15} />
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex size-10 items-center justify-center rounded-xl bg-teal-50">
              <Users size={20} className="text-teal-600" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900">Add New Guest</h3>
              <p className="text-[12px] text-slate-500">Enter guest details for Bhandara</p>
            </div>
          </div>

          <div className="space-y-3.5">
            <label className="block">
              <span className="text-[13px] font-semibold text-slate-700">Name *</span>
              <div className="relative mt-1.5">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  value={guestForm.name}
                  onChange={(e) => setGuestForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-3.5 py-2 text-[13px] font-medium outline-none transition-colors focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                  placeholder="Guest full name"
                  autoFocus
                />
              </div>
            </label>

            <label className="block">
              <span className="text-[13px] font-semibold text-slate-700">Phone Number</span>
              <div className="relative mt-1.5">
                <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="tel"
                  value={guestForm.phone}
                  onChange={(e) => setGuestForm(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-3.5 py-2 text-[13px] font-medium outline-none transition-colors focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                  placeholder="+91 98765 43210"
                />
              </div>
            </label>

            <label className="block">
              <span className="text-[13px] font-semibold text-slate-700">Location</span>
              <div className="relative mt-1.5">
                <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={guestForm.location}
                  onChange={(e) => setGuestForm(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-3.5 py-2 text-[13px] font-medium outline-none transition-colors focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                  placeholder="City, State"
                />
              </div>
            </label>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              type="submit"
              disabled={isAddingGuest}
              className="flex-1 rounded-lg bg-teal-600 px-5 py-2.5 text-[13px] font-semibold text-white shadow-sm transition-all hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAddingGuest ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Adding...
                </span>
              ) : (
                "Add Guest"
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isAddingGuest}
              className="rounded-lg border border-slate-200 px-4 py-2.5 text-[13px] font-semibold text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-50"
            >
              Done
            </button>
          </div>
        </motion.form>
      </div>
    )}
  </AnimatePresence>
));
AddGuestModal.displayName = 'AddGuestModal';

// Guest Table Component
const GuestTable = React.memo(({ 
  allGuests, guestPagination, guestSearchQuery, showGuestModal,
  setGuestSearchQuery, setShowGuestModal, setDeleteState, setSelectedRecord,
  fetchGuests, addGuest, handleCloseGuestModal, guestForm, setGuestForm, isAddingGuest, 
}) => {
  const [searchInput, setSearchInput] = useState(guestSearchQuery);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== guestSearchQuery) {
        setGuestSearchQuery(searchInput);
        fetchGuests(1, searchInput);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const handlePageChange = useCallback((newPage) => {
    if (newPage >= 1 && newPage <= guestPagination.totalPages) {
      fetchGuests(newPage, guestSearchQuery);
    }
  }, [guestPagination.totalPages, guestSearchQuery, fetchGuests]);

  const handleDelete = useCallback((id) => {
    setDeleteState({
      id: id,
      endpoint: endpoints.deleteGuest,
      onSuccess: () => fetchGuests(guestPagination.currentPage, guestSearchQuery),
    });
  }, [guestPagination.currentPage, guestSearchQuery, fetchGuests, setDeleteState]);

  const todayGuestsCount = allGuests.filter(g => {
    const today = new Date();
    return new Date(g.createdAt).toDateString() === today.toDateString();
  }).length;

  return (
    <div className="space-y-4">
      {/* Stats Cards */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-3 sm:p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-9 sm:size-10 items-center justify-center rounded-lg bg-teal-50 shrink-0">
              <Users size={18} className="text-teal-600" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] sm:text-[11px] font-semibold uppercase text-slate-500 truncate">Total Guests</p>
              <p className="text-lg sm:text-xl font-bold text-slate-900">{guestPagination.total.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="rounded-xl border border-slate-200 bg-white p-3 sm:p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-9 sm:size-10 items-center justify-center rounded-lg bg-emerald-50 shrink-0">
              <MapPin size={18} className="text-emerald-600" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] sm:text-[11px] font-semibold uppercase text-slate-500 truncate">Unique Locations</p>
              <p className="text-lg sm:text-xl font-bold text-slate-900">
                {new Set(allGuests.map(g => g.location).filter(Boolean)).size}
              </p>
            </div>
          </div>
        </div>
        
        <div className="rounded-xl border border-slate-200 bg-white p-3 sm:p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-9 sm:size-10 items-center justify-center rounded-lg bg-cyan-50 shrink-0">
              <TrendingUp size={18} className="text-cyan-600" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] sm:text-[11px] font-semibold uppercase text-slate-500 truncate">Today's Guests</p>
              <p className="text-lg sm:text-xl font-bold text-slate-900">{todayGuestsCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <section className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-slate-100 p-3 sm:p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 flex-1 max-w-md">
              <Search size={16} className="text-slate-400 shrink-0" />
              <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search guests..."
                className="w-full bg-transparent text-[13px] font-medium outline-none placeholder:text-slate-400"
              />
              {searchInput && (
                <button 
                  onClick={() => { setSearchInput(""); setGuestSearchQuery(""); fetchGuests(1, ""); }}
                  className="flex size-5 items-center justify-center rounded-full hover:bg-slate-200 shrink-0"
                >
                  <X size={12} className="text-slate-400" />
                </button>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <GuestDownloadMenu allGuests={allGuests} guestPagination={guestPagination} />
              <button 
                onClick={() => setShowGuestModal(true)}
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg bg-teal-600 px-3 sm:px-4 py-2 text-[12px] sm:text-[13px] font-semibold text-white shadow-sm transition-all hover:bg-teal-700 whitespace-nowrap"
              >
                <Plus size={16} /> <span className="hidden sm:inline">Add Guest</span>
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    <div className="flex items-center gap-1.5"><User size={12} className="sm:size-[13px]" />Name</div>
                  </th>
                  <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    <div className="flex items-center gap-1.5"><Phone size={12} className="sm:size-[13px]" />Phone</div>
                  </th>
                  <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide text-slate-500 hidden md:table-cell">
                    <div className="flex items-center gap-1.5"><MapPin size={12} className="sm:size-[13px]" />Location</div>
                  </th>
                  <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide text-slate-500 hidden sm:table-cell">Date</th>
                  <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-right text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide text-slate-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {allGuests.map((guest, index) => (
                  <motion.tr 
                    key={guest._id} 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: index * 0.02 }}
                    className="border-b border-slate-50 transition-colors hover:bg-slate-50/50"
                  >
                    <td className="px-3 sm:px-4 py-2.5 sm:py-3">
                      <div className="flex items-center gap-2 sm:gap-2.5">
                        <div className="flex size-7 sm:size-8 items-center justify-center rounded-full bg-teal-50 text-[10px] sm:text-[11px] font-bold text-teal-600 shrink-0">
                          {guest.name?.charAt(0)?.toUpperCase() || "G"}
                        </div>
                        <span className="text-[12px] sm:text-[13px] font-medium text-slate-700 truncate max-w-[120px] sm:max-w-none">
                          {guest.name || "Anonymous"}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-[12px] sm:text-[13px] text-slate-500">
                      {guest.phone ? (
                        <a href={`tel:${guest.phone}`} className="hover:underline text-teal-600">{guest.phone}</a>
                      ) : "—"}
                    </td>
                    <td className="px-3 sm:px-4 py-2.5 sm:py-3 hidden md:table-cell">
                      {guest.location ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-[11px] font-medium text-slate-600">
                          <MapPin size={9} className="sm:size-[10px]" />{guest.location}
                        </span>
                      ) : (
                        <span className="text-[12px] sm:text-[13px] text-slate-400">—</span>
                      )}
                    </td>
                    <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-[12px] sm:text-[13px] text-slate-500 hidden sm:table-cell">
                      {guest.createdAt ? new Date(guest.createdAt).toLocaleDateString('en-IN', { 
                        day: 'numeric', 
                        month: 'short', 
                        year: 'numeric' 
                      }) : "—"}
                    </td>
                    <td className="px-3 sm:px-4 py-2.5 sm:py-3">
                      <div className="flex justify-end gap-1 sm:gap-1.5">
                        <button 
                          onClick={() => setSelectedRecord({ ...guest, type: 'guest' })} 
                          className="flex size-6 sm:size-7 items-center justify-center rounded-md border border-slate-200 text-slate-500 transition-colors hover:bg-teal-50 hover:text-teal-600 hover:border-teal-200" 
                          title="View Details"
                        >
                          <Eye size={13} className="sm:size-[14px]" />
                        </button>
                        <button 
                          onClick={() => handleDelete(guest._id)} 
                          className="flex size-6 sm:size-7 items-center justify-center rounded-md border border-slate-200 text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600 hover:border-red-200" 
                          title="Delete Guest"
                        >
                          <Trash2 size={13} className="sm:size-[14px]" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
                {allGuests.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <Users size={32} className="mx-auto text-slate-300" />
                      <p className="mt-2 text-[13px] font-medium text-slate-400">No guests found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {guestPagination.totalPages > 1 && (
          <div className="border-t border-slate-100 px-3 sm:px-4 py-2.5 sm:py-3">
            <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
              <p className="text-[11px] sm:text-[12px] text-slate-500 text-center sm:text-left">
                Showing <span className="font-semibold text-slate-700">{(guestPagination.currentPage - 1) * guestPagination.limit + 1}</span> to{' '}
                <span className="font-semibold text-slate-700">{Math.min(guestPagination.currentPage * guestPagination.limit, guestPagination.total)}</span> of{' '}
                <span className="font-semibold text-slate-700">{guestPagination.total.toLocaleString()}</span> guests
              </p>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => handlePageChange(guestPagination.currentPage - 1)} 
                  disabled={guestPagination.currentPage === 1} 
                  className="flex size-7 sm:size-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={14} className="sm:size-[16px]" />
                </button>
                {Array.from({ length: Math.min(5, guestPagination.totalPages) }, (_, i) => {
                  let pageNum;
                  if (guestPagination.totalPages <= 5) pageNum = i + 1;
                  else if (guestPagination.currentPage <= 3) pageNum = i + 1;
                  else if (guestPagination.currentPage >= guestPagination.totalPages - 2) pageNum = guestPagination.totalPages - 4 + i;
                  else pageNum = guestPagination.currentPage - 2 + i;
                  return (
                    <button 
                      key={pageNum} 
                      onClick={() => handlePageChange(pageNum)} 
                      className={`flex size-7 sm:size-8 items-center justify-center rounded-lg text-[12px] sm:text-[13px] font-medium transition-colors ${
                        pageNum === guestPagination.currentPage 
                          ? "bg-teal-600 text-white shadow-sm" 
                          : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                <button 
                  onClick={() => handlePageChange(guestPagination.currentPage + 1)} 
                  disabled={guestPagination.currentPage === guestPagination.totalPages} 
                  className="flex size-7 sm:size-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={14} className="sm:size-[16px]" />
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      <AddGuestModal 
        show={showGuestModal} 
        onClose={handleCloseGuestModal} 
        isAddingGuest={isAddingGuest} 
        guestForm={guestForm} 
        setGuestForm={setGuestForm} 
        onSubmit={addGuest} 
      />
    </div>
  );
});
GuestTable.displayName = 'GuestTable';

export default function AdiyogiAdminPanel() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    if (!userData) {
      navigate("/");
    }
  }, [userData, navigate]);
// Add this inside your AdiyogiAdminPanel component
useEffect(() => {
  // Cleanup: dismiss all toasts when component unmounts
  return () => {
    toast.dismiss();
  };
}, []);
  const [authLoading, setAuthLoading] = useState(true);
  const [adminUser, setAdminUser] = useState(null);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [allAdmins, setAllAdmins] = useState([]);
  const [allContacts, setAllContacts] = useState([]);
  const [allDonors, setAllDonors] = useState([]);
  const [allGallery, setAllGallery] = useState([]);
  const [allSponsors, setAllSponsors] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [deleteState, setDeleteState] = useState(null);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminForm, setAdminForm] = useState({ email: "", password: "" });
  const [donorSearchQuery, setDonorSearchQuery] = useState("");

  const [galleryImageFile, setGalleryImageFile] = useState(null);
  const [galleryImagePreview, setGalleryImagePreview] = useState("");
  const [uploadedGalleryImageUrl, setUploadedGalleryImageUrl] = useState(null);
  const [isUploadingGalleryImage, setIsUploadingGalleryImage] = useState(false);

  const [sponsorImageFile, setSponsorImageFile] = useState(null);
  const [sponsorImagePreview, setSponsorImagePreview] = useState("");
  const [uploadedSponsorImageUrl, setUploadedSponsorImageUrl] = useState(null);
  const [isUploadingSponsorImage, setIsUploadingSponsorImage] = useState(false);
  const [sponsorName, setSponsorName] = useState("");
  
  const [allGuests, setAllGuests] = useState([]);
  const [guestPagination, setGuestPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0,
    limit: 50,
  });
  const [guestSearchQuery, setGuestSearchQuery] = useState("");
  const [guestForm, setGuestForm] = useState({
    name: "",
    phone: "",
    location: "",
  });
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [isAddingGuest, setIsAddingGuest] = useState(false);

  const fetchGuests = useCallback(async (page = 1, search = "") => {
    try {
      const result = await axios.get(
        `${ServerUrl}${endpoints.guests}?page=${page}&limit=50${search ? `&search=${search}` : ''}`,
        { withCredentials: true }
      );
      
      if (result.data.success) {
        setAllGuests(result.data.guests || []);
        setGuestPagination({
          currentPage: result.data.currentPage,
          totalPages: result.data.totalPages,
          total: result.data.total,
          limit: 50,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Unable to fetch guests");
    }
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const result = await axios.get(ServerUrl + endpoints.currentUser, {
        withCredentials: true,
      });
      setAdminUser(result.data.user);
    } catch (error) {
      if (error.response?.status !== 401) console.log(error);
      setAdminUser(null);
      navigate("/");
    } finally {
      setAuthLoading(false);
    }
  };

  const fetchAllAdmins = async () => {
    try {
      const result = await axios.get(ServerUrl + endpoints.admins, {
        withCredentials: true,
      });
      setAllAdmins(getResponseArray(result, ["users"]));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchResource = async (endpoint, setter, keys = []) => {
    try {
      const result = await axios.get(ServerUrl + endpoint, {
        withCredentials: true,
      });
      setter(getResponseArray(result, keys));
    } catch (error) {
      console.log(error);
      toast.error("Unable to fetch data");
    }
  };

  const fetchAllData = useCallback(async () => {
    fetchAllAdmins();
    fetchResource(endpoints.contacts, setAllContacts, ["contacts"]);
    fetchResource(endpoints.donors, setAllDonors, ["donations"]);
    fetchResource(endpoints.gallery, setAllGallery, ["images", "gallery"]);
    fetchResource(endpoints.sponsors, setAllSponsors, ["images", "sponsors"]);
    fetchGuests();
  }, [fetchGuests]);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (adminUser) fetchAllData();
  }, [adminUser, fetchAllData]);

  const addGuest = useCallback(async (event) => {
    event.preventDefault();
    setIsAddingGuest(true);
    
    try {
      const result = await axios.post(
        ServerUrl + endpoints.addGuest,
        guestForm,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      
      if (result.data.success) {
        setGuestForm({ name: "", phone: "", location: "" });
        setShowGuestModal(false);
        fetchGuests(guestPagination.currentPage, guestSearchQuery);
        toast.success("Guest added successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to add guest");
    } finally {
      setIsAddingGuest(false);
    }
  }, [guestForm, guestPagination.currentPage, guestSearchQuery, fetchGuests]);

  const handleCloseGuestModal = useCallback(() => {
    setShowGuestModal(false);
    setGuestForm({ name: "", phone: "", location: "" });
  }, []);

  // const handleLogout = async () => {
  //   try {
  //     await axios.post(ServerUrl + endpoints.logout, {}, { withCredentials: true });
  //     toast.success("Logged out successfully");
  //     dispatch(setUserData(null));
  //     setAdminUser(null);
  //     navigate("/");
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Logout failed");
  //   }
  // };
const handleLogout = async () => {
  // Dismiss all existing toasts immediately
  toast.dismiss();
  
  try {
    await axios.post(ServerUrl + endpoints.logout, {}, { withCredentials: true });
    
    // Show success toast with short duration
    toast.success("Logged out successfully", {
      duration: 1500,
      position: "top-center",
    });
    
    // Small delay to show the toast before navigation
    setTimeout(() => {
      dispatch(setUserData(null));
      setAdminUser(null);
      navigate("/");
    }, 1000);
    
  } catch (error) {
    console.log(error);
    toast.error("Logout failed", {
      duration: 3000,
    });
  }
};
  const removeResource = async (endpoint, id, onSuccess) => {
    try {
      await axios.delete(ServerUrl + endpoint + "/" + id, {
        withCredentials: true,
      });
      if (onSuccess) {
        onSuccess();
      }
      toast.success("Removed successfully");
      setDeleteState(null);
    } catch (error) {
      console.log(error);
      toast.error("Delete failed");
    }
  };

  const addAdmin = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post(ServerUrl + endpoints.addAdmin, adminForm, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (result.data.success) {
        setAllAdmins((current) => [...current, result.data.newUser]);
        setAdminForm({ email: "", password: "" });
        setShowAdminModal(false);
        toast.success("New admin added successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to add admin");
    }
  };

  // Donor Analytics Calculations
  const totalDonationAmount = allDonors.reduce((sum, donor) => sum + (parseFloat(donor.amount) || 0), 0);
  const averageDonation = allDonors.length > 0 ? totalDonationAmount / allDonors.length : 0;
  
  const contactsData = groupByMonth(allContacts, "contacts");
  const donationAmountData = groupByMonth(allDonors, "Amount", "amount");

  // Donation Tier Distribution for Pie Chart
  const getDonationTierData = () => {
    const tiers = DONATION_TIERS.map(tier => ({
      name: tier.label,
      value: 0,
      color: tier.color,
    }));

    allDonors.forEach(donor => {
      const amount = parseFloat(donor.amount) || 0;
      for (let i = 0; i < DONATION_TIERS.length; i++) {
        if (amount >= DONATION_TIERS[i].min) {
          tiers[i].value += amount;
          break;
        }
      }
    });

    return tiers.filter(tier => tier.value > 0);
  };

  const sectionTitles = {
    dashboard: {
      title: "Dashboard",
      subtitle: "Overview of your foundation's activity and metrics.",
    },
    contacts: {
      title: "Messages",
      subtitle: "View and manage messages from your community.",
    },
    donors: {
      title: "Donor Management",
      subtitle: "Track donations and manage donor information.",
    },
    guests: {
      title: "Guest Management",
      subtitle: "Manage Bhandara guest registrations and attendance.",
    },
    gallery: {
      title: "Gallery",
      subtitle: "Upload and manage images for your website.",
    },
    sponsors: {
      title: "Sponsors",
      subtitle: "Manage sponsor logos and information.",
    },
    admins: {
      title: "Admin Management",
      subtitle: "Manage users with administrative access.",
    },
  };

  const Sidebar = () => (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col overflow-hidden bg-[#0F172A] text-white shadow-2xl transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          type="button"
          onClick={() => setIsSidebarOpen(false)}
          className="absolute right-4 top-4 z-10 flex size-8 items-center justify-center rounded-lg bg-white/5 transition-colors hover:bg-white/10 lg:hidden"
        >
          <X size={18} />
        </button>

        <div className="border-b border-white/5 p-4 sm:p-5">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-teal-500/10 shrink-0">
              <img
                src="/Adiyogi Foundation (1).jpeg"
                alt="logo"
                className="size-7 rounded-lg object-cover"
              />
            </div>
            <div className="min-w-0">
              <h1 className="text-base font-bold tracking-tight truncate">Adiyogi</h1>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Admin Panel
              </p>
            </div>
          </div>
        </div>

        <div className="mx-3 sm:mx-4 mt-3 rounded-xl border border-white/5 bg-white/[0.03] p-3">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-teal-500/10 text-teal-400 shrink-0">
              <ShieldCheck size={18} />
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold">
                {adminUser?.name || "Admin User"}
              </p>
              <p className="truncate text-[11px] text-slate-400">
                {adminUser?.email || "Administrator"}
              </p>
            </div>
          </div>
        </div>

        <nav className="mt-4 sm:mt-5 flex-1 space-y-0.5 overflow-y-auto px-2 sm:px-3">
          <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
            Navigation
          </p>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveSection(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-[13px] font-medium transition-all duration-150 ${
                  isActive
                    ? "bg-teal-500/10 text-teal-400 border border-teal-500/20"
                    : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-300"
                }`}
              >
                <Icon size={17} strokeWidth={1.75} className="shrink-0" />
                <span className="truncate">{item.label}</span>
                {item.id === 'donors' && allDonors.length > 0 && (
                  <span className="ml-auto rounded-full bg-teal-500/20 px-2 py-0.5 text-[10px] font-bold text-teal-400 shrink-0">
                    {allDonors.length}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-white/5 p-3">
          <button
            type="button"
            onClick={handleLogout}
            className="group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium text-slate-400 transition-all duration-200 hover:bg-red-500/5 hover:text-red-400"
          >
            <LogOut size={17} strokeWidth={1.75} className="shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );

  const Header = () => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
      const recentNotifications = [];
      
      allContacts.slice(0, 2).forEach(item => {
        recentNotifications.push({
          id: item._id,
          type: 'Message',
          message: `New message from ${item.name || 'Visitor'}`,
          time: item.createdAt,
          section: 'contacts',
        });
      });
      
      allDonors.slice(0, 2).forEach(item => {
        recentNotifications.push({
          id: item._id,
          type: 'Donation',
          message: `Donation of ₹${item.amount || 0} from ${item.donorName || 'Donor'}`,
          time: item.createdAt,
          section: 'donors',
        });
      });
      
      allGuests.slice(0, 2).forEach(item => {
        recentNotifications.push({
          id: item._id,
          type: 'Guest',
          message: `${item.name || 'Guest'} registered for Bhandara`,
          time: item.createdAt,
          section: 'guests',
        });
      });
  
      recentNotifications.sort((a, b) => new Date(b.time) - new Date(a.time));
      setNotifications(recentNotifications.slice(0, 8));
    }, [allContacts, allDonors, allGuests]);

    return (
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 px-3 sm:px-4 lg:px-6 py-2.5 sm:py-3 backdrop-blur-xl">
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="flex size-8 sm:size-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-colors hover:bg-slate-50 lg:hidden shrink-0"
          >
            <Menu size={18} className="sm:size-[19px]" />
          </button>

          <div className="min-w-0 flex-1">
            <h2 className="truncate text-base sm:text-lg lg:text-xl font-bold text-slate-900">
              {sectionTitles[activeSection]?.title}
            </h2>
            <p className="mt-0.5 hidden md:block text-[12px] sm:text-[13px] text-slate-500">
              {sectionTitles[activeSection]?.subtitle}
            </p>
          </div>

          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative flex size-8 sm:size-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-colors hover:bg-slate-50"
            >
              <Bell size={17} className="sm:size-[18px]" />
              {notifications.length > 0 && (
                <span className="absolute right-1.5 top-1.5 flex size-2 rounded-full bg-teal-500 ring-2 ring-white" />
              )}
            </button>

            <AnimatePresence>
              {showNotifications && (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    className="absolute right-0 top-11 z-50 w-[calc(100vw-2rem)] sm:w-80 rounded-xl border border-slate-200 bg-white shadow-lg"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 px-3 sm:px-4 py-2.5 sm:py-3">
                      <h3 className="text-sm font-semibold text-slate-900">Notifications</h3>
                      <span className="rounded-full bg-teal-50 px-2 py-0.5 text-[11px] font-semibold text-teal-700">
                        {notifications.length} new
                      </span>
                    </div>

                    <div className="max-h-[300px] overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notif) => (
                          <button
                            key={notif.id}
                            onClick={() => {
                              setActiveSection(notif.section);
                              setShowNotifications(false);
                            }}
                            className="flex w-full items-start gap-3 border-b border-slate-50 px-3 sm:px-4 py-2.5 text-left transition-colors hover:bg-slate-50"
                          >
                            <div className="mt-1.5 size-1.5 rounded-full bg-teal-500 shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-[12px] sm:text-[13px] font-medium text-slate-700 truncate">
                                {notif.message}
                              </p>
                              <p className="mt-0.5 text-[10px] sm:text-[11px] text-slate-400">
                                {notif.type} • {new Date(notif.time).toLocaleDateString()}
                              </p>
                            </div>
                          </button>
                        ))
                      ) : (
                        <div className="px-4 py-8 text-center">
                          <Bell size={24} className="mx-auto text-slate-300" />
                          <p className="mt-2 text-sm text-slate-500">No notifications yet</p>
                        </div>
                      )}
                    </div>
                  </motion.div>

                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowNotifications(false)}
                  />
                </>
              )}
            </AnimatePresence>
          </div>

          <div className="hidden sm:flex items-center gap-2.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5">
            <div className="flex size-7 items-center justify-center rounded-md bg-teal-50 text-xs font-bold text-teal-600 shrink-0">
              {adminUser?.name?.charAt(0)?.toUpperCase() || "A"}
            </div>
            <div className="min-w-0">
              <p className="text-[12px] sm:text-[13px] font-semibold text-slate-900 truncate">
                {adminUser?.name || "Admin"}
              </p>
              <p className="text-[10px] sm:text-[11px] text-slate-400">Administrator</p>
            </div>
            <ChevronDown size={14} className="text-slate-400 shrink-0" />
          </div>
        </div>
      </header>
    );
  };

  const StatsCard = ({ title, value, icon: Icon, subtitle = "" }) => (
    <motion.div
      whileHover={{ y: -2 }}
      className="rounded-xl border border-slate-200 bg-white p-3 sm:p-5 shadow-sm transition-all hover:shadow-md"
    >
      <div className="flex items-center justify-between gap-3 sm:gap-4">
        <div className="min-w-0">
          <p className="truncate text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide text-slate-500">{title}</p>
          <p className="mt-1 sm:mt-1.5 text-lg sm:text-2xl font-bold text-slate-900 truncate">{value}</p>
          {subtitle && (
            <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-[11px] text-slate-400 truncate">{subtitle}</p>
          )}
        </div>
        <div className="flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
          <Icon size={18} className="sm:size-[20px]" strokeWidth={1.75} />
        </div>
      </div>
    </motion.div>
  );

  const ChartCard = ({ title, children, className = "" }) => (
    <section className={`rounded-xl border border-slate-200 bg-white p-3 sm:p-5 shadow-sm ${className}`}>
      <h3 className="mb-3 sm:mb-4 text-sm sm:text-base font-semibold text-slate-900">{title}</h3>
      {children}
    </section>
  );

  const DeleteModal = () => (
    <AnimatePresence>
      {deleteState && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDeleteState(null)}
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            className="relative w-full max-w-sm rounded-xl bg-white p-5 sm:p-6 shadow-lg mx-4"
          >
            <h3 className="text-base sm:text-lg font-semibold text-slate-900">Confirm Removal</h3>
            <p className="mt-2 text-sm text-slate-500">
              This action cannot be undone. Are you sure you want to proceed?
            </p>

            <div className="mt-5 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setDeleteState(null)}
                className="rounded-lg border border-slate-200 px-3 sm:px-4 py-2 text-[12px] sm:text-[13px] font-semibold text-slate-600 transition-colors hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() =>
                  removeResource(deleteState.endpoint, deleteState.id, deleteState.onSuccess)
                }
                className="rounded-lg bg-red-600 px-3 sm:px-4 py-2 text-[12px] sm:text-[13px] font-semibold text-white transition-colors hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  const DetailsModal = () => (
    <AnimatePresence>
      {selectedRecord && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedRecord(null)}
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            className="relative max-h-[84vh] w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-lg mx-4"
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-4 sm:px-5 py-3 sm:py-3.5">
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  {selectedRecord.type === 'guest' ? 'Guest Details' : 
                   selectedRecord.donorName ? 'Donor Details' : 'Message Details'}
                </h3>
                <p className="mt-0.5 text-[12px] sm:text-[13px] text-slate-500">Complete information.</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedRecord(null)}
                className="flex size-7 sm:size-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50"
              >
                <X size={15} className="sm:size-[16px]" />
              </button>
            </div>
            <div className="max-h-[65vh] overflow-y-auto p-4 sm:p-5">
              {selectedRecord.type === 'guest' && (
                <div className="mb-4 flex items-center gap-3 p-4 rounded-lg bg-teal-50 border border-teal-100">
                  <div className="flex size-10 sm:size-12 items-center justify-center rounded-full bg-teal-100 text-base sm:text-lg font-bold text-teal-700 shrink-0">
                    {selectedRecord.name?.charAt(0)?.toUpperCase() || "G"}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-base sm:text-lg font-semibold text-slate-900 truncate">{selectedRecord.name || "Anonymous"}</h4>
                    <p className="text-[12px] sm:text-[13px] text-slate-500">Guest Registration</p>
                  </div>
                </div>
              )}
              <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
                {Object.entries(selectedRecord)
                  .filter(([key]) => key !== '__v' && key !== '_id' && key !== 'type')
                  .map(([key, value]) => (
                    <div key={key} className="rounded-lg border border-slate-200 bg-slate-50 p-3 sm:p-3.5">
                      <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="mt-1 break-words text-[12px] sm:text-[13px] font-medium text-slate-700">
                        {key.toLowerCase().includes('phone') ? (
                          <a href={`tel:${value}`} className="text-teal-600 hover:underline">{value || "—"}</a>
                        ) : key.toLowerCase().includes('amount') ? (
                          `₹${parseFloat(value).toLocaleString() || '—'}`
                        ) : (
                          String(value || "—")
                        )}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  const ContactTable = () => {
    const [query, setQuery] = useState("");
    
    const filtered = allContacts.filter((item) =>
      JSON.stringify(item).toLowerCase().includes(query.toLowerCase())
    );

    const refreshData = () => fetchResource(endpoints.contacts, setAllContacts, ["contacts"]);

    return (
      <section className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-slate-100 p-3 sm:p-4">
          <div className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
            <Search size={16} className="text-slate-400 shrink-0" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search messages..."
              className="w-full bg-transparent text-[13px] font-medium outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full text-left">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide text-slate-500">Name</th>
                  <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide text-slate-500 hidden sm:table-cell">Email</th>
                  <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide text-slate-500 hidden md:table-cell">Phone</th>
                  <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide text-slate-500">Message</th>
                  <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-right text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide text-slate-500">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((contact) => (
                  <tr
                    key={contact._id || contact.id}
                    className="border-b border-slate-50 transition-colors hover:bg-slate-50/50"
                  >
                    <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-[12px] sm:text-[13px] font-medium text-slate-700">
                      {contact.name || "—"}
                    </td>
                    <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-[12px] sm:text-[13px] text-slate-500 hidden sm:table-cell">
                      {contact.email ? (
                        <a href={`mailto:${contact.email}`} className="hover:underline text-teal-600">
                          {contact.email}
                        </a>
                      ) : "—"}
                    </td>
                    <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-[12px] sm:text-[13px] text-slate-500 hidden md:table-cell">
                      {contact.phone ? (
                        <a href={`tel:${contact.phone}`} className="hover:underline text-teal-600">
                          {contact.phone}
                        </a>
                      ) : "—"}
                    </td>
                    <td className="max-w-[150px] sm:max-w-[200px] truncate px-3 sm:px-4 py-2.5 sm:py-3 text-[12px] sm:text-[13px] text-slate-500">
                      {contact.message || "—"}
                    </td>
                    <td className="px-3 sm:px-4 py-2.5 sm:py-3">
                      <div className="flex justify-end gap-1 sm:gap-1.5">
                        <button
                          type="button"
                          onClick={() => setSelectedRecord(contact)}
                          className="flex size-6 sm:size-7 items-center justify-center rounded-md border border-slate-200 text-slate-500 transition-colors hover:bg-teal-50 hover:text-teal-600 hover:border-teal-200"
                        >
                          <Eye size={13} className="sm:size-[14px]" />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setDeleteState({
                              id: contact._id || contact.id,
                              endpoint: endpoints.deleteContact,
                              onSuccess: refreshData,
                            })
                          }
                          className="flex size-6 sm:size-7 items-center justify-center rounded-md border border-slate-200 text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                        >
                          <Trash2 size={13} className="sm:size-[14px]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {!filtered.length && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-[13px] font-medium text-slate-400">
                      No messages yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    );
  };

  const DonorTable = () => {
    const filtered = allDonors.filter((item) =>
      JSON.stringify(item).toLowerCase().includes(donorSearchQuery.toLowerCase())
    );

    const getDonorTier = (amount) => {
      const donationAmount = parseFloat(amount) || 0;
      if (donationAmount >= 10000) return { label: 'Major Donor', color: 'bg-teal-100 text-teal-700' };
      if (donationAmount >= 5000) return { label: 'Generous Donor', color: 'bg-emerald-100 text-emerald-700' };
      if (donationAmount >= 1000) return { label: 'Supporting Donor', color: 'bg-cyan-100 text-cyan-700' };
      return { label: 'Contributor', color: 'bg-slate-100 text-slate-700' };
    };

    return (
      <section className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-slate-100 p-3 sm:p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 flex-1">
              <Search size={16} className="text-slate-400 shrink-0" />
              <input
                value={donorSearchQuery}
                onChange={(event) => setDonorSearchQuery(event.target.value)}
                placeholder="Search donors..."
                className="w-full bg-transparent text-[13px] font-medium outline-none placeholder:text-slate-400"
              />
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1.5 sm:gap-2 rounded-lg bg-teal-50 px-2.5 sm:px-3 py-1.5">
                <IndianRupee size={14} className="text-teal-600 shrink-0" />
                <span className="text-[11px] sm:text-[13px] font-semibold text-teal-700 whitespace-nowrap">
                  ₹{totalDonationAmount.toLocaleString()}
                </span>
              </div>
              <DonorDownloadMenu 
                allDonors={allDonors} 
                filteredDonors={filtered} 
                totalDonationAmount={totalDonationAmount}
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full text-left">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide text-slate-500">Donor</th>
                  <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide text-slate-500 hidden sm:table-cell">Email</th>
                  <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide text-slate-500 hidden md:table-cell">Phone</th>
                  <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide text-slate-500">Amount</th>
                  <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide text-slate-500 hidden lg:table-cell">Tier</th>
                  <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide text-slate-500 hidden sm:table-cell">Date</th>
                  <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-right text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide text-slate-500">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((donor) => {
                  const tier = getDonorTier(donor.amount);
                  return (
                    <tr
                      key={donor._id || donor.id}
                      className="border-b border-slate-50 transition-colors hover:bg-slate-50/50"
                    >
                      <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-[12px] sm:text-[13px] font-medium text-slate-700">
                        {donor.donorName || "Anonymous"}
                      </td>
                      <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-[12px] sm:text-[13px] text-slate-500 hidden sm:table-cell">
                        {donor.email ? (
                          <a href={`mailto:${donor.email}`} className="hover:underline text-teal-600">{donor.email}</a>
                        ) : "—"}
                      </td>
                      <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-[12px] sm:text-[13px] text-slate-500 hidden md:table-cell">
                        {donor.phoneNumber ? (
                          <a href={`tel:${donor.phoneNumber}`} className="hover:underline text-teal-600">{donor.phoneNumber}</a>
                        ) : "—"}
                      </td>
                      <td className="px-3 sm:px-4 py-2.5 sm:py-3">
                        <span className="inline-flex items-center gap-1 text-[12px] sm:text-[13px] font-semibold text-teal-700">
                          <IndianRupee size={11} className="sm:size-[12px]" />
                          {parseFloat(donor.amount).toLocaleString() || "0"}
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-2.5 sm:py-3 hidden lg:table-cell">
                        <span className={`inline-flex rounded-full px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-[11px] font-semibold ${tier.color}`}>
                          {tier.label}
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-[12px] sm:text-[13px] text-slate-500 hidden sm:table-cell">
                        {donor.createdAt ? new Date(donor.createdAt).toLocaleDateString() : "—"}
                      </td>
                      <td className="px-3 sm:px-4 py-2.5 sm:py-3">
                        <div className="flex justify-end gap-1 sm:gap-1.5">
                          <button
                            type="button"
                            onClick={() => setSelectedRecord(donor)}
                            className="flex size-6 sm:size-7 items-center justify-center rounded-md border border-slate-200 text-slate-500 transition-colors hover:bg-teal-50 hover:text-teal-600 hover:border-teal-200"
                          >
                            <Eye size={13} className="sm:size-[14px]" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {!filtered.length && (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <Heart size={28} className="mx-auto text-slate-300" />
                      <p className="mt-2 text-[13px] font-medium text-slate-400">No donors yet</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    );
  };

  const renderDashboard = () => (
    <div className="space-y-4 sm:space-y-5">
      <section className="rounded-xl bg-gradient-to-br from-slate-800 via-slate-800 to-teal-900 p-4 sm:p-6 lg:p-8 text-white">
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="inline-flex rounded-full bg-white/10 px-3 py-1 text-[10px] sm:text-[11px] font-semibold text-teal-300">
              Admin Overview
            </div>
            <h2 className="mt-2 sm:mt-3 text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">
              Foundation Management
            </h2>
            <p className="mt-1.5 sm:mt-2 max-w-2xl text-[12px] sm:text-[13px] leading-relaxed text-slate-300">
              Manage contacts, donors, gallery images, and sponsors from one central dashboard.
            </p>
          </div>

          <div className="grid gap-2 grid-cols-2 sm:grid-cols-2">
            {[
              ["Messages", "contacts"],
              ["Donors", "donors"],
              ["Guests", "guests"],
              ["Gallery", "gallery"],
            ].map(([label, id]) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveSection(id)}
                className="rounded-lg bg-white/10 px-3 sm:px-4 py-2 sm:py-2.5 text-[11px] sm:text-[13px] font-medium text-white transition-all hover:bg-white/20"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Contact Messages" value={allContacts.length} icon={Mail} />
        <StatsCard title="Total Donors" value={allDonors.length} icon={Heart} />
        <StatsCard 
          title="Total Guests" 
          value={guestPagination.total.toLocaleString()} 
          icon={Users}
          subtitle="Bhandara attendees"
        />
        <StatsCard 
          title="Total Donations" 
          value={`₹${totalDonationAmount.toLocaleString()}`} 
          icon={IndianRupee} 
          subtitle={`Avg: ₹${averageDonation.toLocaleString()}`}
        />
      </div>

      <ChartCard title="Guest Registration Trend">
        <ResponsiveContainer width="100%" height={250} className="sm:h-[300px] lg:h-[350px]">
          <LineChart data={groupByMonth(allGuests, "guests")}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tick={{fontSize: 11}} />
            <YAxis stroke="#94A3B8" fontSize={11} tick={{fontSize: 11}} />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="guests" 
              stroke="#0F766E" 
              strokeWidth={3}
              dot={{ fill: "#0F766E", strokeWidth: 2, r: 3 }}
              activeDot={{ r: 6, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="grid gap-4 sm:gap-5 grid-cols-1 lg:grid-cols-2">
        <ChartCard title="Donation Trends">
          <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
            <BarChart data={donationAmountData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tick={{fontSize: 11}} />
              <YAxis stroke="#94A3B8" fontSize={11} tick={{fontSize: 11}} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="Amount" fill="#0F766E" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Donation Distribution">
          {getDonationTierData().length > 0 ? (
            <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
              <PieChart>
                <Pie
                  data={getDonationTierData()}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={90}
                  innerRadius={40}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {getDonationTierData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-48 sm:h-64">
              <div className="text-center">
                <Heart size={32} className="mx-auto text-slate-300" />
                <p className="mt-2 text-sm text-slate-500">No donation data yet</p>
              </div>
            </div>
          )}
        </ChartCard>
      </div>

      <ChartCard title="Contact Messages Trend">
        <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
          <BarChart data={contactsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tick={{fontSize: 11}} />
            <YAxis stroke="#94A3B8" fontSize={11} tick={{fontSize: 11}} />
            <Tooltip />
            <Bar dataKey="contacts" fill="#0F766E" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {allDonors.length > 0 && (
        <ChartCard title="Recent Donations">
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="px-3 py-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide text-slate-500">Donor</th>
                    <th className="px-3 py-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide text-slate-500">Amount</th>
                    <th className="px-3 py-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide text-slate-500">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {allDonors.slice(0, 5).map((donor) => (
                    <tr key={donor._id} className="border-b border-slate-50">
                      <td className="px-3 py-2 sm:py-2.5 text-[12px] sm:text-[13px] font-medium text-slate-700">
                        {donor.donorName || "Anonymous"}
                      </td>
                      <td className="px-3 py-2 sm:py-2.5 text-[12px] sm:text-[13px] font-semibold text-teal-700">
                        ₹{parseFloat(donor.amount).toLocaleString()}
                      </td>
                      <td className="px-3 py-2 sm:py-2.5 text-[12px] sm:text-[13px] text-slate-500">
                        {new Date(donor.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ChartCard>
      )}
    </div>
  );

  const renderGallery = () => {
    const refreshData = async () => {
      try {
        const result = await axios.get(ServerUrl + endpoints.gallery, {
          withCredentials: true,
        });
        const data = getResponseArray(result, ["images", "gallery"]);
        setAllGallery(data);
      } catch (error) {
        console.log(error);
      }
    };

    const handleDeleteGallery = (imageId) => {
      setDeleteState({
        id: imageId,
        endpoint: endpoints.deleteGallery,
        onSuccess: async () => {
          setAllGallery(prev => prev.filter(img => (img._id || img.id) !== imageId));
          await refreshData();
        },
      });
    };

    return (
      <div className="space-y-4 sm:space-y-5">
        <section className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
          <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-3 sm:mb-4">Upload Gallery Image</h3>
          
          <div className="flex flex-col items-center">
            <div className="w-full max-w-md">
              <label className="block">
                <span className="text-[12px] sm:text-[13px] font-semibold text-slate-700">
                  Image {isUploadingGalleryImage && <span className="text-teal-600">(Uploading...)</span>}
                </span>
                <div className="mt-1.5 flex min-h-36 sm:min-h-44 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 sm:p-6 text-center transition-colors hover:bg-teal-50/50 hover:border-teal-300">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="gallery-image"
                    onChange={async (event) => {
                      const file = event.target.files?.[0];
                      if (file) {
                        setGalleryImageFile(file);
                        setGalleryImagePreview(URL.createObjectURL(file));
                        
                        setIsUploadingGalleryImage(true);
                        try {
                          const data = new FormData();
                          data.append('my_file', file);
                          
                          const uploadResponse = await axios.post(
                            `${ServerUrl}${endpoints.uploadImage}`,
                            data,
                            {
                              headers: { "Content-Type": "multipart/form-data" },
                              withCredentials: true,
                            }
                          );
                          
                          if (uploadResponse.data.success) {
                            const cloudUrl = uploadResponse.data.result.url;
                            setUploadedGalleryImageUrl(cloudUrl);
                            
                            try {
                              await axios.post(ServerUrl + endpoints.addGallery, {
                                imageUrl: cloudUrl,
                              }, {
                                headers: { "Content-Type": "application/json" },
                                withCredentials: true,
                              });
                              
                              refreshData();
                              setGalleryImageFile(null);
                              setGalleryImagePreview("");
                              setUploadedGalleryImageUrl(null);
                              toast.success("Image added to gallery");
                            } catch (error) {
                              console.log(error);
                              toast.error("Failed to save to gallery");
                            }
                          }
                        } catch (error) {
                          console.error("Image upload failed:", error);
                          toast.error("Failed to upload image");
                          setGalleryImageFile(null);
                          setGalleryImagePreview("");
                        } finally {
                          setIsUploadingGalleryImage(false);
                        }
                      }
                    }}
                  />
                  <label htmlFor="gallery-image" className="cursor-pointer">
                    {isUploadingGalleryImage ? (
                      <div className="flex flex-col items-center">
                        <div className="h-8 sm:h-10 w-8 sm:w-10 animate-spin rounded-full border-[3px] border-teal-100 border-t-teal-600" />
                        <span className="mt-2 sm:mt-3 text-[12px] sm:text-[13px] font-medium text-teal-700">Uploading image...</span>
                      </div>
                    ) : galleryImagePreview ? (
                      <div className="relative">
                        <img
                          src={galleryImagePreview}
                          alt="Preview"
                          className="mx-auto max-h-36 sm:max-h-44 rounded-lg object-cover"
                        />
                        <p className="mt-2 sm:mt-3 text-[11px] sm:text-[12px] text-teal-600">Uploading and saving automatically...</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <ImagePlus size={28} className="sm:size-[32px] text-teal-500" />
                        <span className="mt-2 sm:mt-3 text-[12px] sm:text-[13px] font-medium text-slate-600">Click to upload image</span>
                        <span className="mt-1 text-[11px] sm:text-[12px] text-slate-400">Image will be automatically saved</span>
                      </div>
                    )}
                  </label>
                </div>
              </label>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
          <h3 className="text-sm sm:text-base font-semibold text-slate-900">
            Gallery Images ({allGallery.length})
          </h3>

          <div className="mt-3 sm:mt-4 columns-1 gap-3 sm:gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
            {allGallery.length === 0 && (
              <div className="py-12 text-center col-span-full">
                <ImagePlus size={28} className="mx-auto text-slate-300" />
                <p className="mt-2 text-[13px] font-medium text-slate-400">No images in gallery</p>
              </div>
            )}
            {allGallery.map((image) => (
              <figure
                key={image._id || image.id}
                className="group relative mb-3 sm:mb-4 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md break-inside-avoid"
              >
                <img
                  src={image.imageUrl || image.url}
                  alt="Gallery image"
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 flex items-center justify-center bg-slate-900/0 transition-all duration-300 group-hover:bg-slate-900/30">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteGallery(image._id || image.id);
                    }}
                    className="flex size-7 sm:size-8 items-center justify-center rounded-lg bg-white/95 text-red-500 shadow-md opacity-0 transition-all duration-300 hover:bg-red-50 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                    title="Delete image"
                  >
                    <Trash2 size={14} className="sm:size-[15px]" />
                  </button>
                </div>
              </figure>
            ))}
          </div>
        </section>
      </div>
    );
  };

  const renderSponsors = () => {
    const refreshData = async () => {
      try {
        const result = await axios.get(ServerUrl + endpoints.sponsors, {
          withCredentials: true,
        });
        const data = getResponseArray(result, ["sponsors", "images"]);
        setAllSponsors(data);
      } catch (error) {
        console.log(error);
      }
    };

    const handleDeleteSponsor = (sponsorId) => {
      setDeleteState({
        id: sponsorId,
        endpoint: endpoints.deleteSponsor,
        onSuccess: async () => {
          setAllSponsors(prev => prev.filter(s => (s._id || s.id) !== sponsorId));
          await refreshData();
        },
      });
    };

    return (
      <div className="space-y-4 sm:space-y-5">
        <section className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              
              if (!sponsorName.trim()) {
                toast.error("Please enter sponsor name");
                return;
              }
              
              const sponsorData = {
                title: sponsorName,
                imageUrl: uploadedSponsorImageUrl || '',
              };
              
              try {
                const result = await axios.post(ServerUrl + endpoints.addSponsor, sponsorData, {
                  headers: { "Content-Type": "application/json" },
                  withCredentials: true,
                });
                
                const newSponsor = result.data?.sponsor || result.data?.data || result.data;
                
                setAllSponsors(prevSponsors => [newSponsor, ...prevSponsors]);
                
                setSponsorName("");
                setSponsorImageFile(null);
                setSponsorImagePreview("");
                setUploadedSponsorImageUrl(null);
                
                toast.success("Sponsor added successfully");
              } catch (error) {
                console.log(error);
                toast.error("Sponsor upload failed");
              }
            }}
            className="max-w-md mx-auto space-y-3 sm:space-y-4"
          >
            <h3 className="text-sm sm:text-base font-semibold text-slate-900 text-center">Add Sponsor</h3>
            
            <div>
              <label className="block">
                <span className="text-[12px] sm:text-[13px] font-semibold text-slate-700">Sponsor Name *</span>
                <input
                  type="text"
                  required
                  value={sponsorName}
                  onChange={(e) => setSponsorName(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 sm:px-3.5 py-2 text-[12px] sm:text-[13px] font-medium outline-none transition-colors focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                  placeholder="Enter sponsor name..."
                />
              </label>
            </div>

            <div>
              <label className="block">
                <span className="text-[12px] sm:text-[13px] font-semibold text-slate-700">
                  Sponsor Image {isUploadingSponsorImage && <span className="text-teal-600">(Uploading...)</span>}
                </span>
                <div className="mt-1.5 flex min-h-28 sm:min-h-32 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 p-3 sm:p-4 text-center transition-colors hover:bg-teal-50/50 hover:border-teal-300">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="sponsor-image"
                    onChange={async (event) => {
                      const file = event.target.files?.[0];
                      if (file) {
                        setSponsorImageFile(file);
                        setSponsorImagePreview(URL.createObjectURL(file));
                        
                        setIsUploadingSponsorImage(true);
                        try {
                          const data = new FormData();
                          data.append('my_file', file);
                          
                          const uploadResponse = await axios.post(
                            `${ServerUrl}${endpoints.sponsorUpload}`,
                            data,
                            {
                              headers: { "Content-Type": "multipart/form-data" },
                              withCredentials: true,
                            }
                          );
                          
                          if (uploadResponse.data.success) {
                            setUploadedSponsorImageUrl(uploadResponse.data.result.url);
                            toast.success("Image uploaded successfully");
                          }
                        } catch (error) {
                          console.error("Upload failed:", error);
                          toast.error("Failed to upload image");
                          setSponsorImageFile(null);
                          setSponsorImagePreview("");
                        } finally {
                          setIsUploadingSponsorImage(false);
                        }
                      }
                    }}
                  />
                  <label htmlFor="sponsor-image" className="cursor-pointer">
                    {isUploadingSponsorImage ? (
                      <div className="flex flex-col items-center">
                        <div className="h-7 sm:h-9 w-7 sm:w-9 animate-spin rounded-full border-[3px] border-teal-100 border-t-teal-600" />
                        <span className="mt-2 text-[12px] sm:text-[13px] font-medium text-teal-700">Uploading...</span>
                      </div>
                    ) : sponsorImagePreview ? (
                      <img
                        src={sponsorImagePreview}
                        alt="Preview"
                        className="mx-auto max-h-24 sm:max-h-28 rounded-lg object-contain"
                      />
                    ) : (
                      <div className="flex flex-col items-center">
                        <UploadCloud size={22} className="sm:size-[26px] text-teal-500" />
                        <span className="mt-2 text-[12px] sm:text-[13px] font-medium text-slate-600">Click to upload image</span>
                      </div>
                    )}
                  </label>
                </div>
              </label>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-teal-600 px-4 sm:px-5 py-2.5 text-[12px] sm:text-[13px] font-semibold text-white shadow-sm transition-all hover:bg-teal-700"
            >
              Add Sponsor
            </button>
          </form>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
          <h3 className="text-sm sm:text-base font-semibold text-slate-900">
            Sponsors ({allSponsors.length})
          </h3>

          <div className="mt-3 sm:mt-4 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {allSponsors.length === 0 ? (
              <div className="py-12 text-center col-span-full">
                <Sparkles size={28} className="mx-auto text-slate-300" />
                <p className="mt-2 text-[13px] font-medium text-slate-400">No sponsors yet</p>
              </div>
            ) : (
              allSponsors.map((sponsor) => {
                const sponsorId = sponsor._id || sponsor.id;
                return (
                  <motion.div
                    key={sponsorId}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="group relative rounded-lg border border-slate-200 bg-white p-4 sm:p-5 shadow-sm transition-all hover:shadow-md flex flex-col items-center"
                  >
                    <img
                      src={sponsor.imageUrl || sponsor.logo || sponsor.image}
                      alt={sponsor.name || sponsor.title || "Sponsor"}
                      className="h-16 sm:h-20 w-auto max-w-full object-contain"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,...';
                      }}
                    />
                    <p className="mt-2 sm:mt-3 text-center text-[12px] sm:text-[13px] font-semibold text-slate-700 truncate max-w-full">
                      {sponsor.name || sponsor.title || "Unnamed Sponsor"}
                    </p>
                    
                    <button
                      onClick={() => handleDeleteSponsor(sponsorId)}
                      className="absolute top-2 right-2 flex size-6 sm:size-7 items-center justify-center rounded-md border border-slate-200 text-slate-400 opacity-0 transition-all hover:bg-red-50 hover:text-red-500 hover:border-red-200 group-hover:opacity-100"
                      title="Delete sponsor"
                    >
                      <Trash2 size={13} className="sm:size-[14px]" />
                    </button>
                  </motion.div>
                );
              })
            )}
          </div>
        </section>
      </div>
    );
  };
  
  const renderAdmins = () => (
    <div className="space-y-4 sm:space-y-5">
      <div className="flex flex-col justify-between gap-3 sm:gap-4 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-slate-900">
            Admin Management ({allAdmins.length})
          </h3>
          <p className="mt-1 text-[12px] sm:text-[13px] text-slate-500">
            Manage users with administrative access.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAdminModal(true)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-[12px] sm:text-[13px] font-semibold text-white shadow-sm transition-all hover:bg-teal-700"
        >
          <Plus size={16} />
          Add Admin
        </button>
      </div>

      <section className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full text-left">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    Email
                  </th>
                  <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    Role
                  </th>
                  <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-right text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {allAdmins.map((admin) => (
                  <tr
                    key={admin._id || admin.id}
                    className="border-b border-slate-50 transition-colors hover:bg-slate-50/50"
                  >
                    <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-[12px] sm:text-[13px] font-medium text-slate-700">
                      {admin.email}
                    </td>
                    <td className="px-3 sm:px-4 py-2.5 sm:py-3">
                      <span className="rounded-full bg-teal-50 px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-[11px] font-semibold text-teal-700">
                        {admin.role || "admin"}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-right">
                      {admin.role === "super-admin" ? (
                        <span className="rounded-full bg-slate-100 px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-[11px] font-semibold text-slate-400">
                          Protected
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            setDeleteState({
                              id: admin._id || admin.id,
                              endpoint: endpoints.deleteAdmin,
                              onSuccess: fetchAllAdmins,
                            })
                          }
                          className="inline-flex size-6 sm:size-7 items-center justify-center rounded-md border border-slate-200 text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                        >
                          <Trash2 size={13} className="sm:size-[14px]" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {showAdminModal && (
          <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAdminModal(false)}
              className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            />

            <motion.form
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              onSubmit={addAdmin}
              className="relative w-full max-w-sm rounded-xl bg-white p-4 sm:p-5 shadow-lg mx-4"
            >
              <button
                type="button"
                onClick={() => setShowAdminModal(false)}
                className="absolute right-3 top-3 flex size-7 items-center justify-center rounded-md border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50"
              >
                <X size={15} />
              </button>

              <h3 className="text-sm sm:text-base font-semibold text-slate-900">Add New Admin</h3>

              <div className="mt-3 sm:mt-4 space-y-3 sm:space-y-3.5">
                <label className="block">
                  <span className="text-[12px] sm:text-[13px] font-semibold text-slate-700">Email</span>
                  <input
                    type="email"
                    required
                    value={adminForm.email}
                    onChange={(event) =>
                      setAdminForm((current) => ({
                        ...current,
                        email: event.target.value,
                      }))
                    }
                    className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 sm:px-3.5 py-2 text-[12px] sm:text-[13px] font-medium outline-none transition-colors focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                    placeholder="admin@adiyogi.org"
                  />
                </label>

                <label className="block">
                  <span className="text-[12px] sm:text-[13px] font-semibold text-slate-700">
                    Password
                  </span>
                  <input
                    type="password"
                    required
                    value={adminForm.password}
                    onChange={(event) =>
                      setAdminForm((current) => ({
                        ...current,
                        password: event.target.value,
                      }))
                    }
                    className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 sm:px-3.5 py-2 text-[12px] sm:text-[13px] font-medium outline-none transition-colors focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                    placeholder="Enter secure password"
                  />
                </label>
              </div>

              <button
                type="submit"
                className="mt-3 sm:mt-4 w-full rounded-lg bg-teal-600 px-4 sm:px-5 py-2.5 text-[12px] sm:text-[13px] font-semibold text-white shadow-sm transition-all hover:bg-teal-700"
              >
                Add Admin
              </button>
            </motion.form>
          </div>
        )}
      </AnimatePresence>
    </div>
  );

  const renderContent = () => {
    if (activeSection === "dashboard") return renderDashboard();
    if (activeSection === "contacts") return <ContactTable />;
    if (activeSection === "donors") return <DonorTable />;
    if (activeSection === "guests") return (
      <GuestTable 
        allGuests={allGuests}
        guestPagination={guestPagination}
        guestSearchQuery={guestSearchQuery}
        showGuestModal={showGuestModal}
        setGuestSearchQuery={setGuestSearchQuery}
        setShowGuestModal={setShowGuestModal}
        setDeleteState={setDeleteState}
        setSelectedRecord={setSelectedRecord}
        fetchGuests={fetchGuests}
        addGuest={addGuest}
        handleCloseGuestModal={handleCloseGuestModal}
        guestForm={guestForm}
        setGuestForm={setGuestForm}
        isAddingGuest={isAddingGuest}
      />
    );
    if (activeSection === "gallery") return renderGallery();
    if (activeSection === "sponsors") return renderSponsors();
    if (activeSection === "admins") return renderAdmins();
    return <div className="p-4 text-center text-slate-500">Section not found</div>;
  };

  if (authLoading) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50 p-4">
        <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 text-center shadow-sm">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-[3px] border-teal-100 border-t-teal-600" />
          <p className="mt-4 text-[13px] font-semibold text-slate-600">
            Verifying admin access...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* <Toaster 
        position="top-right"
        toastOptions={{
          className: 'text-sm',
          duration: 3000,
        }}
      /> */}
      
      <Sidebar />

      <div className="lg:ml-64">
        <Header />

        <main className="p-3 sm:p-4 lg:p-5">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {renderContent()}
          </motion.div>
        </main>

        <footer className="border-t border-slate-200 bg-white px-4 sm:px-5 py-3 sm:py-3.5">
          <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex size-5 sm:size-6 items-center justify-center rounded-md bg-teal-50 shrink-0">
                <img src="/Adiyogi Foundation (1).jpeg" alt="logo" className="size-3 sm:size-4 rounded object-cover" />
              </div>
              <span className="text-[12px] sm:text-[13px] font-semibold text-slate-700">Adiyogi Foundation</span>
              <span className="text-[11px] sm:text-[12px] text-slate-400">© {new Date().getFullYear()}</span>
            </div>
            
            <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-[12px] text-slate-400">
              <span>Admin Panel</span>
              <span className="flex items-center gap-1">
                Made with <span className="text-red-400">❤️</span> by <span className="font-medium text-slate-500">Abhishek</span>
              </span>
            </div>
          </div>
        </footer>
      </div>

      <DetailsModal />
      <DeleteModal />
    </div>
  );
}