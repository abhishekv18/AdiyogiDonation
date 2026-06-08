

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowUpRight, FiCheckCircle, FiCreditCard,
  FiGlobe, FiHeart, FiLock, FiShield, FiUser, FiPhone,
  FiX, FiAward, FiUsers, FiTarget, FiMail, FiStar,
  FiTrendingUp, FiThumbsUp,
} from "react-icons/fi";
import toast, { Toaster } from 'react-hot-toast';
import { ServerUrl } from "../App";

//const API_BASE_URL = "http://localhost:8000";
const API_BASE_URL = "https://adiyogidonation.onrender.com";
const fallbackSponsors = [
  { _id: "1", name: "Lotus Health Trust",  img: "https://dummyimage.com/220x70/f8fafc/64748b&text=Lotus+Trust",  website: "#", category: "Healthcare" },
  { _id: "2", name: "Greenleaf Partners",  img: "https://dummyimage.com/220x70/f8fafc/64748b&text=Greenleaf",    website: "#", category: "Environment" },
  { _id: "3", name: "Sahas Foundation",    img: "https://dummyimage.com/220x70/f8fafc/64748b&text=Sahas",        website: "#", category: "Education" },
  { _id: "4", name: "Aarogya Care",        img: "https://dummyimage.com/220x70/f8fafc/64748b&text=Aarogya",      website: "#", category: "Healthcare" },
  { _id: "5", name: "Microsoft",           img: "https://dummyimage.com/220x70/f8fafc/64748b&text=Microsoft",    website: "#", category: "Technology" },
  { _id: "6", name: "Global Tech",         img: "https://dummyimage.com/220x70/f8fafc/64748b&text=Global+Tech",  website: "#", category: "Technology" },
];

const quickAmounts = [100, 500, 1000, 5000];

const trustItems = [
  { label: "Secure Payment",       icon: FiLock        },
  { label: "SSL Protected",        icon: FiShield      },
  { label: "80G Tax Benefit",      icon: FiHeart       },
  { label: "Transparent Process",  icon: FiCheckCircle },
];

/* ── Success Modal Component ─────────────────────────── */
function SuccessModal({ isOpen, onClose, donorName, amount }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="modal-overlay"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal-close" onClick={onClose}>
            <FiX size={20} />
          </button>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="success-icon-wrap"
          >
            <FiHeart size={32} className="sm:w-[36px] sm:h-[36px] lg:w-[40px] lg:h-[40px] success-heart" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="modal-title"
          >
            Thank You, {donorName}!
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="modal-message"
          >
            Your generous contribution of <strong>₹{amount.toLocaleString("en-IN")}</strong> will make a lasting impact on countless lives through Adiyogi Foundation's community programs.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="modal-stats"
          >
            <div className="stat-item">
              <FiUsers size={18} className="sm:w-[20px] sm:h-[20px]" />
              <span>Community Impact</span>
            </div>
            <div className="stat-item">
              <FiTarget size={18} className="sm:w-[20px] sm:h-[20px]" />
              <span>Transparent Process</span>
            </div>
          </motion.div>
          
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="modal-btn"
            onClick={onClose}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Continue Spreading Joy
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Marquee strip for sponsors ─────────────────────────── */
function SponsorMarquee({ sponsors }) {
  const doubled = [...sponsors, ...sponsors];
  return (
    <div className="sp-marquee-wrap">
      <div className="sp-marquee-fade-l" />
      <div className="sp-marquee-fade-r" />
      <motion.div
        className="sp-marquee-track"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, ease: "linear", repeat: Infinity }}
      >
        {doubled.map((s, i) => {
          const Wrap = s.website ? "a" : "div";
          return (
            <Wrap
              key={i}
              className="sp-logo-card"
            >
              <img src={s.img} alt={s.name} className="sp-logo-img" />
            </Wrap>
          );
        })}
      </motion.div>
    </div>
  );
}

/* ── Main ───────────────────────────────────────────────── */
export default function SponsorsDonationSection() {
  const [sponsors, setSponsors] = useState([]);
  const [selectedAmount, setSelectedAmount] = useState(500);
  const [customAmount, setCustomAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [donorName, setDonorName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastDonation, setLastDonation] = useState({ name: "", amount: 0 });

  useEffect(() => {
    let alive = true;
    
    const fetchGalleryImages = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${API_BASE_URL}/api/sponsor/get`);
        
        if (!alive) return;
        
        const images = response.data?.images || [];
        
        if (Array.isArray(images) && images.length > 0) {
          const gallerySlides = images
            .filter(image => image.imageUrl || image.url || image)
            .map((image, index) => {
              const imageUrl = typeof image === 'string' 
                ? image 
                : (image.imageUrl || image.url || '');
              
              return {
                _id: image._id || image.id || `gallery-${index}`,
                name: image.title || image.label || image.alt || `Partner ${index + 1}`,
                img: imageUrl,
                alt: image.alt || image.title || `Partner ${index + 1}`,
                category: image.category || "Supporting Partner",
              };
            });
          console.log("Fetched sponsor images:", gallerySlides);
          if (gallerySlides.length > 0) {
            setSponsors(gallerySlides);
          } else {
            setSponsors([]);
          }
        } else {
          setSponsors([]);
        }
      } catch (error) {
        console.error("Failed to fetch sponsor images:", error);
        if (alive) setSponsors([]);
      } finally {
        if (alive) setIsLoading(false);
      }
    };

    fetchGalleryImages();
    
    return () => { 
      alive = false; 
    };
  }, []);
  
  // Show only 6 sponsors in the grid (first 6)
  const visibleSponsors = sponsors.length 
    ? sponsors.slice(0, 6) 
    : fallbackSponsors.slice(0, 6);
    
  // For marquee, show all sponsors or fallback
  const allSponsors = sponsors.length ? sponsors : fallbackSponsors;
  
  const donationAmount = useMemo(() => {
    const n = customAmount ? Number(customAmount) : Number(selectedAmount);
    return Number.isFinite(n) && n > 0 ? n : 0;
  }, [customAmount, selectedAmount]);

  const handleAmountSelect = (a) => { setSelectedAmount(a); setCustomAmount(""); };

  const handleDonation = async () => {
    if (!donationAmount || donationAmount < 1) {
      toast.error("Please select or enter a donation amount");
      return;
    }
    if (!donorName.trim() || !phoneNumber.trim() || !email.trim()) {
      toast.error("Please enter your name, phone number, and email");
      return;
    }
    
    setIsLoading(true);
    
    const currentDonorName = donorName.trim();
    const currentPhoneNumber = phoneNumber.trim();
    const currentEmail = email.trim();
    const currentAmount = donationAmount;
    
    toast.loading("Initiating secure payment...", { id: "payment" });
    
    try {
      const orderRes = await axios.post(ServerUrl+"/api/payment/order", {
        amount: currentAmount,
        donorName: currentDonorName,
        phoneNumber: currentPhoneNumber,
        email: currentEmail,
      });
      
      const order = orderRes.data;
      toast.dismiss("payment");
      
      // const options = {
      //   key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      //   amount: order.amount,
      //   currency: order.currency || "INR",
      //   name: "Adiyogi Foundation",
      //   description: "Empowering Communities Through Compassion & Care",
      //   image: "https://ibb.co/tw70Mqm3",
      //   order_id: order.orderId,
      //   prefill: {
      //     name: currentDonorName,
      //     email: currentEmail,
      //     contact: currentPhoneNumber,
      //   },
      //   notes: {
      //     donor_name: currentDonorName,
      //     donor_phone: currentPhoneNumber,
      //     donor_email: currentEmail,
      //     purpose: "Community welfare and development programs",
      //     foundation_name: "Adiyogi Foundation",
      //   },
      //   remember_customer: true,
      //   send_sms_hash: true,
      //   allow_rotation: false,
      //   retry: {
      //     enabled: false,
      //   },
      //   handler: async function (response) {
      //     toast.loading("Verifying payment...", { id: "verify" });
      //     try {
      //       await axios.post(ServerUrl+"/api/payment/verify", {
      //         razorpay_order_id: response.razorpay_order_id,
      //         razorpay_payment_id: response.razorpay_payment_id,
      //         razorpay_signature: response.razorpay_signature,
      //       });
            
      //       toast.dismiss("verify");
      //       toast.success("Payment successful! Thank you for your generosity.");
            
      //       setLastDonation({ name: currentDonorName, amount: currentAmount });
      //       setShowSuccess(true);
            
      //       setCustomAmount("");
      //       setSelectedAmount(500);
      //       setDonorName("");
      //       setPhoneNumber("");
      //       setEmail("");
      //       setIsLoading(false);
      //     } catch (error) {
      //       toast.dismiss("verify");
      //       toast.error("Payment verification failed. Please contact support.");
      //       console.error("Verification failed:", error);
      //       setIsLoading(false);
      //     }
      //   },
      //   modal: {
      //     ondismiss: function() {
      //       toast.error("Payment cancelled");
      //       setIsLoading(false);
      //     },
      //     escape: true,
      //     backdropclose: true,
      //     confirm_close: true,
      //     animation: true,
      //   },
      //   theme: {
      //     color: "#D81B4A",
      //   },
      //   checkout: {
      //     method: {
      //       netbanking: true,
      //       card: true,
      //       upi: true,
      //       wallet: true,
      //       emi: false,
      //     },
      //     name: "Adiyogi Foundation Donation",
      //     description: "Your contribution supports community welfare programs",
      //   },
      //   readonly: {
      //     contact: false,
      //     email: false,
      //     name: false,
      //   },
      //   hidden: {
      //     address: true,
      //     cod: true,
      //   },
      //   config: {
      //     display: {
      //       blocks: {
      //         banks: {
      //           name: 'Pay using NetBanking',
      //           instruments: [
      //             { method: 'netbanking' },
      //           ],
      //         },
      //         upi: {
      //           name: 'Pay via UPI',
      //           instruments: [
      //             { method: 'upi' },
      //           ],
      //         },
      //       },
      //       sequence: ['block.banks', 'block.upi', 'block.card', 'block.wallet'],
      //       preferences: {
      //         show_default_blocks: false,
      //       },
      //     },
      //   },
      // };
      const options = {
  key: import.meta.env.VITE_RAZORPAY_KEY_ID,
  amount: order.amount,
  currency: order.currency || "INR",
  name: "Adiyogi Foundation",
  description: "Empowering Communities Through Compassion & Care",
  image: "https://ibb.co/tw70Mqm3",
  order_id: order.orderId,
  prefill: {
    name: currentDonorName,
    email: currentEmail,
    contact: currentPhoneNumber,
  },
  notes: {
    donor_name: currentDonorName,
    donor_phone: currentPhoneNumber,
    donor_email: currentEmail,
    purpose: "Community welfare and development programs",
    foundation_name: "Adiyogi Foundation",
  },
  remember_customer: true,
  send_sms_hash: true,
  allow_rotation: false,
  retry: {
    enabled: false,
  },
  handler: async function (response) {
    toast.loading("Verifying payment...", { id: "verify" });
    try {
      await axios.post(ServerUrl+"/api/payment/verify", {
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
      });
      
      toast.dismiss("verify");
      toast.success("Payment successful! Thank you for your generosity.");
      
      setLastDonation({ name: currentDonorName, amount: currentAmount });
      setShowSuccess(true);
      
      setCustomAmount("");
      setSelectedAmount(500);
      setDonorName("");
      setPhoneNumber("");
      setEmail("");
      setIsLoading(false);
    } catch (error) {
      toast.dismiss("verify");
      toast.error("Payment verification failed. Please contact support.");
      console.error("Verification failed:", error);
      setIsLoading(false);
    }
  },
  modal: {
    ondismiss: function() {
      toast.error("Payment cancelled");
      setIsLoading(false);
    },
    escape: true,
    backdropclose: true,
    confirm_close: true,
    animation: true,
  },
  theme: {
    color: "#D81B4A",
  },
  // Remove the checkout and config objects entirely
  // Or if you want to keep checkout settings, simplify them:
  checkout: {
    method: {
      netbanking: true,
      card: true,
      upi: true,
      wallet: true,
      emi: false,
    },
    name: "Adiyogi Foundation Donation",
    description: "Your contribution supports community welfare programs",
  },
  // Remove the readonly object as it might be restricting information display
  // Remove the hidden object
  // Remove the config object entirely - this is what's causing the single payment option issue
  
  // Instead, use a simpler config or remove it completely:
  config: {
    display: {
      blocks: {
        upi: {
          name: 'Pay via UPI',
          instruments: [
            { method: 'upi' }
          ],
        },
        cards: {
          name: 'Pay with Card',
          instruments: [
            { method: 'card' }
          ],
        },
        netbanking: {
          name: 'NetBanking',
          instruments: [
            { method: 'netbanking' }
          ],
        },
        wallet: {
          name: 'Wallet',
          instruments: [
            { method: 'wallet' }
          ],
        },
      },
      sequence: ['block.upi', 'block.cards', 'block.netbanking', 'block.wallet'],
      preferences: {
        show_default_blocks: true, // Changed to true
      },
    },
  },
};
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        toast.error("Payment failed. Please try again.");
        setIsLoading(false);
      });
      rzp.open();
    } catch (e) {
      toast.dismiss("payment");
      toast.error("Unable to process payment. Please try again.");
      console.error(e);
      setIsLoading(false);
    }
  };

  // Sponsor highlights
  const sponsorHighlights = [
    { icon: FiUsers, text: "Collective Impact", color: "#D81B4A" },
    { icon: FiTrendingUp, text: "Sustainable Growth", color: "#8AAE3B" },
    { icon: FiThumbsUp, text: "Trusted Network", color: "#E8B21C" },
    { icon: FiStar, text: "Excellence Partners", color: "#D81B4A" },
  ];

  return (
    <>
      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        donorName={lastDonation.name}
        amount={lastDonation.amount}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        :root {
          --primary:   #D81B4A;
          --primary-d: #B0153D;
          --secondary: #8AAE3B;
          --accent:    #E8B21C;
          --navy:      #1E293B;
          --surface:   #FFFFFF;
          --warm:      #FAFAF7;
          --border:    rgba(30,41,59,0.08);
          --display:   'Cormorant Garamond', Georgia, serif;
          --body:      'DM Sans', sans-serif;
        }

        /* ── section shell ── */
        .sd-section {
          position: relative;
          background: var(--warm);
          overflow: hidden;
          font-family: var(--body);
        }

        /* decorative orbs - responsive */
        .sd-orb-1 {
          position: absolute; top: -40px; right: -40px;
          width: 280px; height: 280px; border-radius: 50%;
          background: radial-gradient(circle, rgba(216,27,74,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        @media (min-width: 640px) {
          .sd-orb-1 { top: -60px; right: -60px; width: 340px; height: 340px; }
        }
        @media (min-width: 1024px) {
          .sd-orb-1 { top: -80px; right: -80px; width: 380px; height: 380px; }
        }
        
        .sd-orb-2 {
          position: absolute; bottom: -30px; left: -30px;
          width: 260px; height: 260px; border-radius: 50%;
          background: radial-gradient(circle, rgba(138,174,59,0.07) 0%, transparent 70%);
          pointer-events: none;
        }
        @media (min-width: 640px) {
          .sd-orb-2 { bottom: -45px; left: -45px; width: 300px; height: 300px; }
        }
        @media (min-width: 1024px) {
          .sd-orb-2 { bottom: -60px; left: -60px; width: 340px; height: 340px; }
        }

        /* ── sponsors block ── */
        .sponsors-block {
          border-bottom: 1px solid var(--border);
          padding: 36px 16px 32px;
        }
        @media (min-width: 640px) {
          .sponsors-block { padding: 44px 24px 40px; }
        }
        @media (min-width: 768px) {
          .sponsors-block { padding: 48px 32px 44px; }
        }
        @media (min-width: 1024px) {
          .sponsors-block { padding: 56px 40px 52px; }
        }

        .sponsors-inner { max-width: 1280px; margin: 0 auto; }

        .sponsors-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 10px;
          margin-bottom: 28px;
        }
        @media (min-width: 640px) {
          .sponsors-header { gap: 12px; margin-bottom: 40px; }
        }
        .sponsors-eyebrow {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 4px 12px; border-radius: 999px;
          background: rgba(138,174,59,0.07);
          border: 1px solid rgba(138,174,59,0.12);
          font-size: 10px; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--secondary);
        }
        @media (min-width: 640px) {
          .sponsors-eyebrow { font-size: 11px; gap: 7px; padding: 5px 14px; letter-spacing: 0.12em; }
        }
        .sponsors-title {
          font-family: var(--display);
          font-size: clamp(1.5rem, 4vw, 2.8rem);
          font-weight: 600; font-style: italic;
          color: var(--navy);
          letter-spacing: -0.02em;
          line-height: 1.18;
          margin: 0;
        }
        .sponsors-sub {
          font-size: 13px; color: #64748B; font-weight: 400;
          max-width: 480px; line-height: 1.7; margin: 0;
          padding: 0 8px;
        }
        @media (min-width: 640px) {
          .sponsors-sub { font-size: 14.5px; }
        }

        /* ── marquee ── */
        .sp-marquee-wrap {
          position: relative;
          overflow: hidden;
          padding: 4px 0;
        }
        @media (min-width: 640px) {
          .sp-marquee-wrap { padding: 6px 0; }
        }
        .sp-marquee-fade-l {
          position: absolute; left: 0; top: 0; bottom: 0; 
          width: 60px;
          background: linear-gradient(to right, var(--warm), transparent);
          z-index: 2; pointer-events: none;
        }
        @media (min-width: 640px) {
          .sp-marquee-fade-l { width: 100px; }
        }
        .sp-marquee-fade-r {
          position: absolute; right: 0; top: 0; bottom: 0; 
          width: 60px;
          background: linear-gradient(to left, var(--warm), transparent);
          z-index: 2; pointer-events: none;
        }
        @media (min-width: 640px) {
          .sp-marquee-fade-r { width: 100px; }
        }
        .sp-marquee-track {
          display: flex; align-items: center; gap: 12px;
          white-space: nowrap;
        }
        @media (min-width: 640px) {
          .sp-marquee-track { gap: 16px; }
        }
        // .sp-logo-card {
        //   display: inline-flex; align-items: center; justify-content: center;
        //   min-width: 140px; height: 70px;
        //   border-radius: 12px;
        //   background: #fff;
        //   border: 1px solid var(--border);
        //   box-shadow: 0 4px 18px rgba(30,41,59,0.05);
        //   padding: 10px 16px;
        //   transition: box-shadow 0.3s, transform 0.3s, border-color 0.3s;
        //   text-decoration: none; flex-shrink: 0;
        // }
        // @media (min-width: 640px) {
        //   .sp-logo-card { min-width: 160px; height: 76px; padding: 12px 20px; border-radius: 14px; }
        // }
        // @media (min-width: 1024px) {
        //   .sp-logo-card { min-width: 170px; height: 80px; padding: 14px 22px; border-radius: 16px; }
        // }
        // .sp-logo-card:hover {
        //   box-shadow: 0 10px 32px rgba(30,41,59,0.10);
        //   transform: translateY(-3px);
        //   border-color: rgba(216,27,74,0.15);
        // }
        // .sp-logo-img {
        //   max-height: 32px; max-width: 110px;
        //   object-fit: contain;
        //   transition: filter 0.3s;
        // }
        // @media (min-width: 640px) {
        //   .sp-logo-img { max-height: 36px; max-width: 120px; }
        // }
        // @media (min-width: 1024px) {
        //   .sp-logo-img { max-height: 40px; max-width: 130px; }
        // }
        .sp-logo-card {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 150px; height: 76px;
  border-radius: 12px;
  background: #fff;
  border: 1px solid var(--border);
  box-shadow: 0 4px 18px rgba(30,41,59,0.05);
  padding: 10px 16px;
  transition: box-shadow 0.3s, transform 0.3s, border-color 0.3s;
  text-decoration: none; flex-shrink: 0;
}
@media (min-width: 640px) {
  .sp-logo-card { min-width: 170px; height: 80px; padding: 12px 20px; border-radius: 14px; }
}
@media (min-width: 1024px) {
  .sp-logo-card { min-width: 180px; height: 84px; padding: 14px 22px; border-radius: 16px; }
}

.sp-logo-img {
  max-height: 36px; max-width: 115px;
  object-fit: contain;
  transition: filter 0.3s;
}
@media (min-width: 640px) {
  .sp-logo-img { max-height: 40px; max-width: 125px; }
}
@media (min-width: 1024px) {
  .sp-logo-img { max-height: 44px; max-width: 135px; }
}
        .sp-logo-card:hover .sp-logo-img { filter: grayscale(0) opacity(1); }

        /* ── divider ── */
        .sd-divider {
          width: 1px;
          background: var(--border);
          align-self: stretch;
          margin: 0 16px;
        }
        @media (max-width: 1023px) { .sd-divider { display: none; } }

        /* ── lower two-col ── */
        .sd-lower {
          max-width: 1280px; margin: 0 auto;
          padding: 36px 16px 48px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 36px;
          align-items: start;
        }
        @media (min-width: 640px) {
          .sd-lower { padding: 44px 24px 56px; gap: 42px; }
        }
        @media (min-width: 1024px) {
          .sd-lower { grid-template-columns: 1.1fr 4px 1fr; padding: 60px 40px 72px; gap: 0; }
        }

        /* ── sponsors grid (left col) ── */
        .sp-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          padding-right: 0;
        }
        @media (min-width: 480px) {
          .sp-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
        }
        @media (min-width: 1024px) {
          .sp-grid { grid-template-columns: repeat(3, 1fr); padding-right: 48px; gap: 16px; }
        }

        .sp-card {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 8px;
          padding: 18px 12px;
          border-radius: 14px;
          background: #fff;
          border: 1px solid var(--border);
          box-shadow: 0 4px 20px rgba(30,41,59,0.04);
          text-decoration: none;
          transition: transform 0.32s cubic-bezier(0.22,1,0.36,1),
                      box-shadow 0.32s, border-color 0.3s;
          min-height: 110px;
          position: relative;
          overflow: hidden;
        }
        @media (min-width: 640px) {
          .sp-card { padding: 20px 14px; border-radius: 16px; gap: 10px; min-height: 115px; }
        }
        @media (min-width: 1024px) {
          .sp-card { padding: 22px 16px; border-radius: 18px; min-height: 120px; }
        }
        
        /* Accent line on top */
        .sp-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 20%;
          right: 20%;
          height: 2px;
          background: linear-gradient(90deg, var(--primary), var(--secondary));
          opacity: 0;
          transition: opacity 0.3s, left 0.3s, right 0.3s;
        }
        .sp-card:hover::before {
          opacity: 1;
          left: 15%;
          right: 15%;
        }
        
        .sp-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 14px 40px rgba(30,41,59,0.09);
          border-color: rgba(216,27,74,0.14);
        }
        .sp-card-img {
          max-height: 34px; max-width: 100px;
          object-fit: contain;
          transition: filter 0.3s, transform 0.3s;
        }
        @media (min-width: 640px) {
          .sp-card-img { max-height: 38px; max-width: 110px; }
        }
        @media (min-width: 1024px) {
          .sp-card-img { max-height: 42px; max-width: 120px; }
        }
        .sp-card:hover .sp-card-img { 
          filter: none; 
          transform: scale(1.05);
        }
        .sp-card-name {
          font-size: 11px; font-weight: 600;
          color: #475569; text-align: center;
          display: flex; align-items: center; gap: 3px;
          transition: color 0.2s;
        }
        @media (min-width: 640px) {
          .sp-card-name { font-size: 11.5px; }
        }
        @media (min-width: 1024px) {
          .sp-card-name { font-size: 12px; }
        }
        .sp-card:hover .sp-card-name { color: var(--primary); }
        
        .sp-card-category {
          font-size: 9px;
          font-weight: 600;
          color: #94A3B8;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          text-align: center;
        }
        @media (min-width: 640px) {
          .sp-card-category { font-size: 9.5px; }
        }

        .sp-left-header {
          margin-bottom: 20px;
        }
        @media (min-width: 640px) {
          .sp-left-header { margin-bottom: 24px; }
        }
        @media (min-width: 1024px) {
          .sp-left-header { margin-bottom: 28px; }
        }
        .sp-left-eyebrow {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 4px 12px; border-radius: 999px;
          background: rgba(138,174,59,0.06);
          border: 1px solid rgba(138,174,59,0.10);
          font-size: 9.5px; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--secondary); margin-bottom: 12px;
        }
        @media (min-width: 640px) {
          .sp-left-eyebrow { font-size: 10.5px; gap: 7px; padding: 5px 14px; letter-spacing: 0.12em; margin-bottom: 16px; }
        }
        .sp-left-title {
          font-family: var(--display);
          font-size: clamp(1.3rem, 3vw, 2.2rem);
          font-weight: 600; font-style: italic;
          color: var(--navy); letter-spacing: -0.02em;
          line-height: 1.2; margin: 0 0 8px;
        }
        @media (min-width: 640px) {
          .sp-left-title { margin-bottom: 10px; }
        }
        .sp-left-body {
          font-size: 13px; color: #64748B; line-height: 1.72; margin: 0;
          max-width: 400px;
        }
        @media (min-width: 640px) {
          .sp-left-body { font-size: 14px; }
        }

        /* Sponsor Highlights */
        .sp-highlights {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          margin-top: 20px;
        }
        @media (min-width: 640px) {
          .sp-highlights { gap: 12px; margin-top: 24px; }
        }
        @media (min-width: 1024px) {
          .sp-highlights { margin-top: 28px; }
        }
        
        .sp-highlight-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          background: #FFFFFF;
          border: 1px solid var(--border);
          border-radius: 12px;
          font-size: 11.5px;
          font-weight: 500;
          color: var(--navy);
          transition: all 0.22s;
        }
        @media (min-width: 640px) {
          .sp-highlight-item { padding: 12px 16px; font-size: 12px; gap: 10px; border-radius: 14px; }
        }
        .sp-highlight-item:hover {
          border-color: rgba(216,27,74,0.15);
          background: #FCE4E8;
          transform: translateX(3px);
        }
        
        .sp-highlight-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        @media (min-width: 640px) {
          .sp-highlight-icon { width: 36px; height: 36px; border-radius: 10px; }
        }

      .donate-card {
  position: relative;
  border-radius: 20px;
  background: #fff;
  border: 1px solid var(--border);
  box-shadow: 0 28px 80px rgba(30,41,59,0.10), 0 0 0 1px rgba(255,255,255,0.6);
  padding: 28px 20px 24px;
  overflow: hidden;
}
@media (min-width: 480px) {
  .donate-card { padding: 32px 24px 28px; border-radius: 22px; }
}
@media (min-width: 640px) {
  .donate-card { padding: 34px 28px 30px; border-radius: 24px; }
}
@media (min-width: 1024px) {
  .donate-card { padding: 36px 32px 32px; border-radius: 26px; }
}

/* floating heart badge */
.donate-float-heart {
  position: absolute; top: -14px; right: 18px;
  width: 44px; height: 44px; border-radius: 12px;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-d) 100%);
  display: flex; align-items: center; justify-content: center;
  color: #fff;
  box-shadow: 0 10px 30px rgba(216,27,74,0.28);
}
@media (min-width: 480px) {
  .donate-float-heart { top: -16px; right: 22px; width: 48px; height: 48px; border-radius: 14px; }
}
@media (min-width: 1024px) {
  .donate-float-heart { right: 24px; width: 52px; height: 52px; border-radius: 16px; }
}

.donate-eyebrow {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 3px 10px; border-radius: 999px;
  background: rgba(216,27,74,0.06);
  border: 1px solid rgba(216,27,74,0.11);
  font-size: 9px; font-weight: 700;
  letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--primary); margin-bottom: 12px;
}
@media (min-width: 480px) {
  .donate-eyebrow { font-size: 10px; padding: 4px 12px; gap: 6px; letter-spacing: 0.14em; margin-bottom: 14px; }
}

.donate-title {
  font-family: var(--display);
  font-size: clamp(1.3rem, 3vw, 2rem);
  font-weight: 600; font-style: italic;
  color: var(--navy); letter-spacing: -0.02em;
  line-height: 1.18; margin: 0 0 6px;
}
@media (min-width: 480px) {
  .donate-title { margin-bottom: 8px; }
}

.donate-sub {
  font-size: 12.5px; color: #64748B; line-height: 1.65; margin: 0 0 20px;
}
@media (min-width: 480px) {
  .donate-sub { font-size: 13.5px; margin-bottom: 24px; }
}

/* donor input fields */
.donor-input {
  width: 100%;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1.5px solid #e2e8f0;
  background: #F3F5EF;
  font-size: 13px;
  font-weight: 500;
  color: #1E293B;
  outline: none;
  margin-bottom: 10px;
  box-sizing: border-box;
  transition: border-color 0.2s, box-shadow 0.2s;
}
@media (min-width: 480px) {
  .donor-input { padding: 12px 14px; font-size: 14px; margin-bottom: 12px; border-radius: 12px; }
}
.donor-input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(216,27,74,0.08);
  background: #fff;
}
.donor-input::placeholder {
  color: #cbd5e1;
  font-weight: 400;
}

/* amount label */
.field-label {
  font-size: 11px; font-weight: 600;
  color: #374151; letter-spacing: 0.03em;
  text-transform: uppercase; margin-bottom: 8px;
  display: block;
}
@media (min-width: 480px) {
  .field-label { font-size: 12px; letter-spacing: 0.04em; margin-bottom: 10px; }
}

/* quick amounts */
.amounts-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px;
  margin-bottom: 12px;
}
@media (min-width: 480px) {
  .amounts-grid { gap: 8px; margin-bottom: 14px; }
}
@media (max-width: 360px) {
  .amounts-grid { grid-template-columns: repeat(2, 1fr); }
}

.amt-btn {
  padding: 9px 4px; border-radius: 10px;
  font-size: 12px; font-weight: 600;
  border: 1.5px solid #e2e8f0;
  background: #F3F5EF; color: #334155;
  cursor: pointer; transition: all 0.2s;
  text-align: center;
}
@media (min-width: 480px) {
  .amt-btn { padding: 10px 5px; font-size: 13px; border-radius: 12px; }
}
@media (min-width: 640px) {
  .amt-btn { padding: 11px 6px; font-size: 13.5px; }
}
.amt-btn:hover { border-color: rgba(216,27,74,0.25); color: var(--primary); background: #FCE4E8; }
.amt-btn.selected {
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-d) 100%);
  color: #fff; border-color: transparent;
  box-shadow: 0 8px 24px rgba(216,27,74,0.25);
}

/* custom input */
.custom-input-wrap {
  position: relative; margin-bottom: 16px;
}
@media (min-width: 480px) {
  .custom-input-wrap { margin-bottom: 20px; }
}

.custom-prefix {
  position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
  font-size: 14px; font-weight: 600; color: #94a3b8;
  pointer-events: none;
}
@media (min-width: 480px) {
  .custom-prefix { font-size: 16px; left: 14px; }
}

.custom-input {
  width: 100%; padding: 11px 12px 11px 28px;
  border-radius: 10px;
  border: 1.5px solid #e2e8f0;
  background: #F3F5EF;
  font-size: 13px; font-weight: 600; color: #1E293B;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
}
@media (min-width: 480px) {
  .custom-input { padding: 12px 14px 12px 30px; font-size: 14px; border-radius: 12px; }
}
@media (min-width: 640px) {
  .custom-input { padding: 13px 14px 13px 32px; }
}
.custom-input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(216,27,74,0.08);
  background: #fff;
}
.custom-input::placeholder { color: #cbd5e1; font-weight: 400; }

/* divider */
.donate-divider {
  height: 1px; margin: 14px 0;
  background: linear-gradient(to right, transparent, #e2e8f0 30%, #e2e8f0 70%, transparent);
}
@media (min-width: 480px) {
  .donate-divider { margin: 18px 0; }
}

/* CTA button */
.donate-cta {
  width: 100%; padding: 13px 20px;
  border-radius: 12px; border: none;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-d) 100%);
  color: #fff; font-size: 14px; font-weight: 700;
  letter-spacing: 0.02em;
  display: flex; align-items: center; justify-content: center; gap: 7px;
  cursor: pointer;
  box-shadow: 0 14px 40px rgba(216,27,74,0.28);
  transition: transform 0.22s, box-shadow 0.22s, opacity 0.2s;
  margin-bottom: 14px;
}
@media (min-width: 480px) {
  .donate-cta { padding: 14px 22px; font-size: 14.5px; gap: 8px; margin-bottom: 16px; border-radius: 13px; }
}
@media (min-width: 640px) {
  .donate-cta { padding: 15px 24px; font-size: 15px; gap: 9px; margin-bottom: 18px; border-radius: 14px; }
}
.donate-cta:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 20px 52px rgba(216,27,74,0.38);
}
.donate-cta:disabled { opacity: 0.55; cursor: not-allowed; }

.cta-heart { animation: hb 1.8s ease-in-out infinite; }
@keyframes hb {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.28); }
}

/* trust grid */
.trust-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 6px;
}
@media (min-width: 480px) {
  .trust-grid { gap: 8px; }
}

.trust-chip {
  display: flex; align-items: center; gap: 5px;
  padding: 7px 10px; border-radius: 8px;
  background: #F3F5EF; border: 1px solid var(--border);
  font-size: 10.5px; font-weight: 500; color: #475569;
}
@media (min-width: 480px) {
  .trust-chip { padding: 8px 11px; font-size: 11px; gap: 6px; border-radius: 9px; }
}
@media (min-width: 640px) {
  .trust-chip { padding: 9px 12px; font-size: 11.5px; gap: 7px; border-radius: 10px; }
}
.trust-chip svg { color: var(--secondary); flex-shrink: 0; }

/* ── Success Modal ── */
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 16px;
}
@media (min-width: 480px) {
  .modal-overlay { padding: 20px; }
}

.modal-content {
  background: #fff;
  border-radius: 20px;
  padding: 32px 20px 28px;
  max-width: 480px;
  width: 100%;
  position: relative;
  text-align: center;
  box-shadow: 0 40px 80px rgba(30, 41, 59, 0.25);
}
@media (min-width: 480px) {
  .modal-content { border-radius: 24px; padding: 40px 28px 34px; }
}
@media (min-width: 640px) {
  .modal-content { border-radius: 28px; padding: 48px 40px 40px; }
}

.modal-close {
  position: absolute;
  top: 12px; right: 12px;
  background: #F3F5EF;
  border: none;
  width: 32px; height: 32px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  color: #64748B;
  transition: all 0.2s;
}
@media (min-width: 480px) {
  .modal-close { top: 16px; right: 16px; width: 36px; height: 36px; }
}
.modal-close:hover {
  background: #e2e8f0;
  color: #1E293B;
}

.success-icon-wrap {
  width: 64px; height: 64px;
  border-radius: 18px;
  background: linear-gradient(135deg, #D81B4A 0%, #B0153D 100%);
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 18px;
  box-shadow: 0 20px 40px rgba(216, 27, 74, 0.3);
}
@media (min-width: 480px) {
  .success-icon-wrap { width: 72px; height: 72px; border-radius: 20px; margin-bottom: 22px; }
}
@media (min-width: 640px) {
  .success-icon-wrap { width: 80px; height: 80px; border-radius: 24px; margin-bottom: 24px; }
}

.success-heart {
  color: #fff;
  animation: hb 1.8s ease-in-out infinite;
}

.modal-title {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(1.4rem, 3vw, 2rem);
  font-weight: 600; font-style: italic;
  color: #1E293B;
  margin: 0 0 10px;
  line-height: 1.2;
}
@media (min-width: 480px) {
  .modal-title { margin-bottom: 12px; }
}

.modal-message {
  font-size: 13px;
  color: #64748B;
  line-height: 1.7;
  margin: 0 0 24px;
}
@media (min-width: 480px) {
  .modal-message { font-size: 14px; margin-bottom: 28px; }
}
.modal-message strong {
  color: #D81B4A;
  font-weight: 600;
}

.modal-stats {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}
@media (min-width: 480px) {
  .modal-stats { gap: 16px; margin-bottom: 32px; }
}
@media (max-width: 480px) {
  .modal-stats { flex-direction: column; align-items: center; gap: 8px; }
}

.stat-item {
  display: flex; align-items: center; gap: 6px;
  padding: 7px 14px;
  background: #F3F5EF;
  border-radius: 10px;
  font-size: 11px; font-weight: 600; color: #475569;
}
@media (min-width: 480px) {
  .stat-item { padding: 8px 16px; border-radius: 12px; font-size: 12px; gap: 8px; }
}
.stat-item svg { color: #8AAE3B; }

.modal-btn {
  width: 100%;
  padding: 12px 20px;
  border-radius: 12px; border: none;
  background: linear-gradient(135deg, #8AAE3B 0%, #7A9E2B 100%);
  color: #fff;
  font-size: 14px; font-weight: 700;
  cursor: pointer;
  box-shadow: 0 14px 40px rgba(138, 174, 59, 0.28);
  transition: all 0.22s;
}
@media (min-width: 480px) {
  .modal-btn { padding: 14px 24px; border-radius: 14px; font-size: 15px; }
}
.modal-btn:hover {
  box-shadow: 0 20px 52px rgba(138, 174, 59, 0.38);
}
      `}</style>

      <section id="donate" className="sd-section">
        <div className="sd-orb-1" />
        <div className="sd-orb-2" />

        {/* ── Sponsors marquee strip ── */}
        <div className="sponsors-block">
          <div className="sponsors-inner">
            <div className="sponsors-header">
              <span className="sponsors-eyebrow">
                <FiShield size={10} className="sm:w-[11px] sm:h-[11px]" />
                Our Trusted Partners
              </span>
              <h2 className="sponsors-title">Partners who believe in lasting impact</h2>
              <p className="sponsors-sub">
                Organizations backing transparent, compassionate community transformation.
              </p>
            </div>
            <SponsorMarquee sponsors={allSponsors} />
          </div>
        </div>

        {/* ── Sponsors grid + Donate card ── */}
        <div className="sd-lower">
          {/* LEFT — sponsor cards with enhanced content */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="sp-left-header">
              <div className="sp-left-eyebrow">
                <FiShield size={10} className="sm:w-[11px] sm:h-[11px]" />
                Featured Partners
              </div>
              <h3 className="sp-left-title">Proudly supported by</h3>
              <p className="sp-left-body">
                Our esteemed partners share our vision of creating meaningful impact through compassion, transparency, and community-driven initiatives.
              </p>
            </div>

            {/* Sponsor Grid - Shows only 6 sponsors */}
            <div className="sp-grid">
              {visibleSponsors.map((s, i) => {
                const Wrap = s.website ? "a" : "div";
                return (
                  <motion.div
                    key={s._id || i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.42, delay: i * 0.07 }}
                  >
                    <Wrap className="sp-card">
                      <img src={s.img} alt={s.name} className="sp-card-img" />
                      <span className="sp-card-name">
                        {s.name}
                        {s.website && <FiArrowUpRight size={10} style={{ opacity: 0.4 }} />}
                      </span>
                      {s.category && (
                        <span className="sp-card-category">{s.category}</span>
                      )}
                    </Wrap>
                  </motion.div>
                );
              })}
            </div>

            {/* Enhanced Content - Sponsor Highlights */}
            <div className="sp-highlights">
              {sponsorHighlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    className="sp-highlight-item"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  >
                    <div 
                      className="sp-highlight-icon"
                      style={{ 
                        background: `${item.color}10`,
                        border: `1px solid ${item.color}20`,
                        color: item.color 
                      }}
                    >
                      <Icon size={16} />
                    </div>
                    <span>{item.text}</span>
                  </motion.div>
                );
              })}
            </div>

            {/* Additional Info */}
            <motion.p
              style={{
                marginTop: '16px',
                fontSize: '11px',
                color: '#94A3B8',
                lineHeight: '1.6',
                textAlign: 'center'
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <FiStar size={12} style={{ display: 'inline', marginRight: '4px', color: '#E8B21C' }} />
              Many more organizations support our mission
            </motion.p>
          </motion.div>

          {/* divider */}
          <div className="sd-divider" />

          {/* RIGHT — donate card */}
          <motion.div
            style={{ paddingLeft: "0" }}
            className="lg:pl-[48px]"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="donate-card">
              {/* floating heart */}
              <motion.div
                className="donate-float-heart"
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <FiHeart size={18} className="sm:w-[20px] sm:h-[20px] lg:w-[22px] lg:h-[22px]" />
              </motion.div>

              {/* header */}
              <div className="donate-eyebrow">Donate with trust</div>
              <h3 className="donate-title">Make a Difference Today</h3>
              <p className="donate-sub">
                Every contribution creates real, lasting community impact — tracked transparently.
              </p>

              {/* Donor Information */}
              <div style={{ marginBottom: "16px" }}>
                <span className="field-label">
                  <FiUser size={11} className="sm:w-[12px] sm:h-[12px]" style={{ display: 'inline', marginRight: '4px' }} />
                  Your Name
                </span>
                <input
                  key={`name-${showSuccess}`}
                  type="text"
                  placeholder="Enter your name"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="donor-input"
                />
                
                <span className="field-label">
                  <FiMail size={11} className="sm:w-[12px] sm:h-[12px]" style={{ display: 'inline', marginRight: '4px' }} />
                  Email Address
                </span>
                <input
                  key={`email-${showSuccess}`}
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="donor-input"
                />
                
                <span className="field-label">
                  <FiPhone size={11} className="sm:w-[12px] sm:h-[12px]" style={{ display: 'inline', marginRight: '4px' }} />
                  Phone Number
                </span>
                <input
                  key={`phone-${showSuccess}`}
                  type="tel"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  maxLength="10"
                  className="donor-input"
                />
              </div>

              {/* quick amounts */}
              <span className="field-label">Choose an amount</span>
              <div className="amounts-grid">
                {quickAmounts.map((a) => (
                  <motion.button
                    key={a}
                    type="button"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    className={`amt-btn ${selectedAmount === a && !customAmount ? "selected" : ""}`}
                    onClick={() => handleAmountSelect(a)}
                  >
                    ₹{a.toLocaleString("en-IN")}
                  </motion.button>
                ))}
              </div>

              {/* custom */}
              <div className="custom-input-wrap">
                <span className="custom-prefix">₹</span>
                <input
                  id="customAmount"
                  type="number"
                  min="1"
                  inputMode="numeric"
                  value={customAmount}
                  placeholder="Enter custom amount"
                  className="custom-input"
                  onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                />
              </div>

              <div className="donate-divider" />

              {/* CTA */}
              <motion.button
                type="button"
                className="donate-cta"
                disabled={isLoading || !donationAmount}
                whileHover={!isLoading && donationAmount ? { scale: 1.015 } : {}}
                whileTap={!isLoading && donationAmount ? { scale: 0.98 } : {}}
                onClick={handleDonation}
              >
                {isLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      style={{ width: '14px', height: '14px', border: '2px solid #fff', borderTopColor: 'transparent', borderRadius: '50%' }}
                      className="sm:w-[16px] sm:h-[16px]"
                    />
                    Processing...
                  </>
                ) : (
                  <>
                    <FiHeart size={14} className="sm:w-[15px] sm:h-[15px] lg:w-[16px] lg:h-[16px] cta-heart" />
                    Donate Securely
                    {donationAmount > 0 && ` · ₹${donationAmount.toLocaleString("en-IN")}`}
                  </>
                )}
              </motion.button>

              {/* trust chips */}
              <div className="trust-grid">
                {trustItems.map((t) => {
                  const Icon = t.icon;
                  return (
                    <div key={t.label} className="trust-chip">
                      <Icon size={12} className="sm:w-[13px] sm:h-[13px]" />
                      {t.label}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}