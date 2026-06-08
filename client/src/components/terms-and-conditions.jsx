import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaGlobe, FaUserPlus, FaUser, FaBan, FaCopyright, 
  FaTrademark, FaShieldAlt, FaGavel, FaExclamationTriangle, 
  FaEnvelope, FaBalanceScale, FaChevronDown, FaChevronUp,
  FaArrowLeft, FaArrowUp
} from 'react-icons/fa';
import { Helmet } from 'react-helmet';

const TermsAndConditions = () => {
  const [activeSections, setActiveSections] = useState({});
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Handle scroll event to show/hide back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSection = (section) => {
    setActiveSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatContent = (content) => {
    return content.split('\n').map((line, index) => {
      const trimmedLine = line.trim();
      
      if (trimmedLine === '') {
        return <br key={index} />;
      }
      
      // Handle bullet points
      if (trimmedLine.startsWith('- ')) {
        return (
          <div key={index} className="flex items-start mb-2 ml-2 sm:ml-4">
            <span className="mr-2 mt-1 flex-shrink-0 text-[#D81B4A]">•</span>
            <span className="text-[#64748B] flex-1 text-sm sm:text-base">{trimmedLine.substring(2)}</span>
          </div>
        );
      }
      
      // Handle numbered lists
      if (/^\d+\.\s/.test(trimmedLine)) {
        return (
          <p key={index} className="mb-3 text-[#1E293B] font-medium text-sm sm:text-base">
            {trimmedLine}
          </p>
        );
      }
      
      // Handle section headers (text ending with colon)
      if (trimmedLine.endsWith(':') && !trimmedLine.startsWith('http')) {
        return (
          <p key={index} className="mb-2 text-[#1E293B] font-medium mt-4 text-sm sm:text-base">
            {trimmedLine}
          </p>
        );
      }
      
      // Regular text
      return (
        <p key={index} className="mb-3 text-[#64748B] text-sm sm:text-base">
          {trimmedLine}
        </p>
      );
    });
  };

  const termsData = [
    {
      id: 'website-access',
      title: 'Website Access, Services and Availability',
      icon: <FaGlobe className="text-[#8AAE3B]" />,
      content: `This Website is made available free of charge to access. However, the Foundation reserves the right to charge subscription, membership, donation processing fees, or any other fees from a user, in respect of certain service(s) and products provided on this Website.`
    },
    {
      id: 'registration',
      title: 'Registration',
      icon: <FaUserPlus className="text-[#8AAE3B]" />,
      content: `In general, you can access and visit our Website without registering on the Website or otherwise revealing your identity or any personal information about yourself. However, access to certain Services features and Content may require completion of a simple registration process by the user.`
    },
    {
      id: 'user-profile',
      title: 'User Profile / Registration',
      icon: <FaUser className="text-[#8AAE3B]" />,
      content: `a. Users may register with us for a subscription, donation account, or product purchases on the Website ("User Profile"), which may enable them to have complete access of our Website, avail certain Services and also receive our newsletters/alerts. By completing the online registration process on the Website, you confirm your acceptance of these Terms and our Privacy Policy.

b. To complete your registration or donation, you may be required to provide your full name, email address, mobile number, billing/shipping address, and other details. You must provide complete and accurate information about yourself. You undertake that you will notify us and update this information to keep it current.

c. You are responsible for protecting the information you provide on the Website including but not limited to your username, email address, contact details and mobile number.

d. Our Services and our Website are intended for a general audience and you confirm your acceptance and compliance with these Terms to use the Website.`
    },
    {
      id: 'suspension',
      title: 'Suspension of Access',
      icon: <FaBan className="text-[#E8B21C]" />,
      content: `We may suspend or terminate your registration, donation account, or access to all or any part of the Website at any time, if you breach these Terms in our reasonable opinion or at our discretion for any reasons we deem fit.`
    },
    {
      id: 'ip',
      title: 'Intellectual Property',
      icon: <FaCopyright className="text-[#E8B21C]" />,
      content: `All Content featured or displayed on this Website including the trademarks, logos, photos, pictures, audio, video, design, layout and all other content and intellectual property rights, belongs to and is the property of Adiyogi Foundation, and/or is used under valid license/authorization. Unauthorized copying, use, reproduction, distribution, modification, dissemination, reposting, hyper-linking, deep-linking, framing, mirroring, downloading or any other use of the Content on this Website in any manner whatsoever, without the prior written authorization of the Foundation is strictly prohibited.`
    },
    {
      id: 'copyright',
      title: 'Copyright',
      icon: <FaCopyright className="text-[#E8B21C]" />,
      content: `1. Subject to these Terms, all materials, including illustrations, statements, opinions, articles, views, photographs, products, images, artwork, designs, text, graphics, logos, images, audio and video clips and software (collectively, "Content") appearing on this Website are owned or controlled by Adiyogi Foundation and/or its subsidiaries, affiliates, licensors and content suppliers and are protected by worldwide design, trademark, trade dress, copyright and other intellectual property laws. The Foundation retains copyright on all information, including text, graphics and sound and all trademarks displayed on this Website are owned by the Foundation or used under licence by its affiliates.

2. You may:
- Use and display the materials only on your personal computer for personal use. The Foundation grants you a limited, personal, non-exclusive and non-transferable license only for such use.
- Print copies of the information on this Website for your personal use only and store the files on your computer for personal use.

3. You may not:
- Copy, distribute, download, display, perform, reproduce, modify, edit, alter, enhance, broadcast, tamper with in any way or otherwise use any material contained in the Website except as expressly permitted above.
- Copy and distribute this information on any other server, or modify or re-use text or graphics on this system or another system.
- Reproduce any part of the Website for commercial gain or incorporate it in any other work, publication or Website, whether in hard copy or electronic format.
- Remove any copyright, trademark or other intellectual property notices contained in the original material from any material copied or printed off from the Website.
- Link to this Website without our express written consent.`
    },
    {
      id: 'trademarks',
      title: 'Trademarks',
      icon: <FaTrademark className="text-[#E8B21C]" />,
      content: `This Website and the Content therein are intended solely for personal, non-commercial use by the users of this Website. All logos, trademarks, service marks, trade names, and trade dress appearing on this Website are proprietary to Adiyogi Foundation, whether registered or unregistered, and are protected under applicable intellectual property laws.

You may not copy, reproduce, publish, transmit, distribute, display, modify, create derivative works from, sell, or participate in any sale of, or exploit in any way, in whole or in part, any of the Content, this Website, or any related software without the prior written authorization of the Foundation.

No right, title, or interest in any materials or software, if applicable, on this Website is transferred to you from your use of this Website. Unauthorized use of these marks is strictly prohibited.`
    },
    {
      id: 'security',
      title: 'Information Security',
      icon: <FaShieldAlt className="text-[#D81B4A]" />,
      content: `We are committed to safeguard the security and confidentiality of any information you provide to us. You accept the inherent security implications of providing information over the internet and agree not to hold us responsible for any breach of security.`
    },
    {
      id: 'indemnity',
      title: 'Indemnity',
      icon: <FaGavel className="text-[#D81B4A]" />,
      content: `You agree to indemnify Adiyogi Foundation, its affiliates, officers, members, and other persons involved in the creation of this Website for all damages, losses and costs (including legal costs) which arise out of or relate to your use of this Website, donations, or product purchases.`
    },
    {
      id: 'liability',
      title: 'Limitation of Liability',
      icon: <FaExclamationTriangle className="text-[#D81B4A]" />,
      content: `In no event shall Adiyogi Foundation, including its affiliates and their respective officers, members, agents and partners be liable for any loss or damage whatsoever including direct, indirect, punitive, incidental and consequential damages, lost profits, or damages resulting from the use or inability to use the Website.`
    },
    {
      id: 'warranty',
      title: 'Warranty',
      icon: <FaExclamationTriangle className="text-[#D81B4A]" />,
      content: `All content, information and materials on this Website are provided to you on an "AS IS" and "AS AVAILABLE" basis, without warranty or guarantee of any kind.`
    },
    {
      id: 'grievances',
      title: 'Redressal of Grievances',
      icon: <FaEnvelope className="text-[#8AAE3B]" />,
      content: `If you have any complaints or concerns with regards to content of this Website or to report alleged infringement of your rights in any way, or any abuse of applicable laws, breach of Terms of this Website, you may write to us at:

📧 privacy@adiyogifoundation.org.in (Grievance Officer)
📧 info@adiyogifoundation.org.in (General Queries / Donations / Products)
📍 Adiyogi Foundation, Badlapur, Mumbai- 421503, India.`
    },
    {
      id: 'jurisdiction',
      title: 'Applicable Law and Jurisdiction',
      icon: <FaBalanceScale className="text-[#8AAE3B]" />,
      content: `These Terms and Conditions are governed by and to be interpreted in accordance with the laws of India. You agree to submit to the exclusive jurisdiction of the courts located at Mumbai, India for any matter or disputes.`
    }
  ];

  return (
    <>
      <Helmet>
        <title>Terms & Conditions | Adiyogi Foundation</title>
        <meta name="description" content="Read the terms and conditions for using Adiyogi Foundation's website, seva programs, products, and services." />
        <meta name="keywords" content="Adiyogi Foundation Terms, Conditions, Policies, Rules" />
        <link rel="canonical" href="https://www.adiyogifoundation.org.in/term-conditions" />

        <meta property="og:title" content="Terms & Conditions | Adiyogi Foundation" />
        <meta property="og:description" content="Review the policies, rules, and terms of using Adiyogi Foundation's website and services." />
        <meta property="og:url" content="https://www.adiyogifoundation.org.in/term-conditions" />
        <meta property="og:image" content="https://www.adiyogifoundation.org.in/Adiyogifoundation logo_02.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Terms & Conditions | Adiyogi Foundation" />
        <meta name="twitter:description" content="Read Adiyogi Foundation's terms and conditions for seva, products, and services." />
        <meta name="twitter:image" content="https://www.adiyogifoundation.org.in/Adiyogifoundation logo_02.png" />
      </Helmet>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        .tc-root {
          font-family: 'DM Sans', sans-serif;
          background: #FAFAF7;
          min-height: 100vh;
          position: relative;
        }

        .tc-header-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-weight: 600;
          font-style: italic;
        }

        /* ── Back button ── */
        .tc-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: 999px;
          background: linear-gradient(135deg, #D81B4A 0%, #B0153D 100%);
          color: #fff;
          font-size: 12px;
          font-weight: 500;
          text-decoration: none;
          box-shadow: 0 8px 24px rgba(216,27,74,0.22);
          transition: all 0.22s;
        }
        @media (min-width: 480px) {
          .tc-back-btn { font-size: 12.5px; padding: 8px 18px; }
        }
        @media (min-width: 640px) {
          .tc-back-btn { font-size: 13px; padding: 9px 20px; }
        }
        .tc-back-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 32px rgba(216,27,74,0.30);
        }

        /* ── Back to top ── */
        .tc-top-btn {
          background: linear-gradient(135deg, #D81B4A 0%, #B0153D 100%);
          color: #fff;
          padding: 12px;
          border-radius: 50%;
          box-shadow: 0 10px 30px rgba(216,27,74,0.30);
          transition: all 0.22s;
        }
        .tc-top-btn:hover {
          transform: translateY(-3px) scale(1.08);
          box-shadow: 0 16px 40px rgba(216,27,74,0.40);
        }

        /* ── Intro box ── */
        .tc-intro-box {
          background: #F3F5EF;
          border-left: 4px solid #D81B4A;
          border-radius: 12px;
          padding: 16px;
        }
        @media (min-width: 480px) {
          .tc-intro-box { padding: 20px; border-radius: 14px; }
        }
        @media (min-width: 640px) {
          .tc-intro-box { padding: 24px; border-radius: 16px; }
        }

        /* ── Accordion item ── */
        .tc-accordion-item {
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          overflow: hidden;
          background: #fff;
          transition: box-shadow 0.25s;
        }
        @media (min-width: 480px) {
          .tc-accordion-item { border-radius: 14px; }
        }
        @media (min-width: 640px) {
          .tc-accordion-item { border-radius: 16px; }
        }
        .tc-accordion-item:hover {
          box-shadow: 0 4px 20px rgba(30,41,59,0.06);
        }

        .tc-accordion-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 16px;
          background: #fff;
          cursor: pointer;
          transition: background 0.20s;
        }
        @media (min-width: 480px) {
          .tc-accordion-header { padding: 16px 20px; }
        }
        .tc-accordion-header:hover {
          background: #F3F5EF;
        }

        .tc-accordion-title {
          font-size: 15px;
          font-weight: 500;
          color: #1E293B;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        @media (min-width: 480px) {
          .tc-accordion-title { font-size: 16px; gap: 12px; }
        }

        .tc-accordion-icon {
          flex-shrink: 0;
          width: 16px;
          height: 16px;
        }
        @media (min-width: 480px) {
          .tc-accordion-icon { width: 18px; height: 18px; }
        }

        .tc-chevron {
          color: #94a3b8;
          transition: transform 0.25s;
          flex-shrink: 0;
          width: 16px;
          height: 16px;
        }
        @media (min-width: 480px) {
          .tc-chevron { width: 18px; height: 18px; }
        }

        .tc-accordion-content {
          padding: 0 16px 16px;
          color: #64748B;
          line-height: 1.75;
          font-size: 13.5px;
        }
        @media (min-width: 480px) {
          .tc-accordion-content { padding: 0 20px 20px; font-size: 14px; }
        }
        @media (min-width: 640px) {
          .tc-accordion-content { font-size: 14.5px; }
        }

        /* ── Footer ── */
        .tc-footer {
          border-top: 1px solid #E2E8F0;
          padding-top: 20px;
          color: #94a3b8;
          font-size: 12px;
        }
        @media (min-width: 480px) {
          .tc-footer { font-size: 13px; padding-top: 24px; }
        }
      `}</style>

      <div className="tc-root">
        {/* Decorative orbs */}
        <div className="pointer-events-none fixed -left-20 sm:-left-28 top-6 sm:top-10 h-60 sm:h-80 w-60 sm:w-80 rounded-full bg-[#D81B4A]/6 blur-3xl" />
        <div className="pointer-events-none fixed -right-16 sm:-right-24 bottom-16 sm:bottom-24 h-60 sm:h-80 w-60 sm:w-80 rounded-full bg-[#8AAE3B]/6 blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 lg:py-14">
          
          {/* Back to Home Button */}
          <div className="mb-6 sm:mb-8">
            <Link to="/" className="tc-back-btn" aria-label="Back to Home">
              <FaArrowLeft size={13} />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Back to Top Button */}
          {showBackToTop && (
            <button
              onClick={scrollToTop}
              className="fixed bottom-6 right-6 z-50 tc-top-btn"
              aria-label="Back to top"
            >
              <FaArrowUp size={16} />
            </button>
          )}

          {/* Header */}
          <header className="text-center mb-8 sm:mb-12">
            <h1 className="tc-header-title text-3xl sm:text-4xl lg:text-5xl text-[#1E293B] mb-2">
              Terms & Conditions
            </h1>
            <div className="w-16 sm:w-20 h-0.5 bg-gradient-to-r from-[#D81B4A] via-[#8AAE3B] to-[#E8B21C] mx-auto my-3 sm:my-4 rounded-full" />
            {/* <p className="text-[#D81B4A] font-semibold text-xs sm:text-sm tracking-wide">www.adiyogifoundation.org.in</p> */}
            <p className="text-[#94a3b8] italic mt-2 text-xs sm:text-sm">
              Last Updated: {new Date().toLocaleDateString()}
            </p>
          </header>

          {/* Introduction */}
          <div className="mb-8 sm:mb-10">
            <div className="tc-intro-box">
              <h3 className="text-base sm:text-lg font-semibold text-[#1E293B] flex items-center gap-2">
                <FaExclamationTriangle className="text-[#D81B4A] flex-shrink-0" size={16} /> 
                <span>Please Read Carefully</span>
              </h3>
              <p className="mt-3 text-[#64748B] text-sm sm:text-base leading-relaxed">
                By accessing, browsing, donating, or purchasing through this Website, you agree and 
                acknowledge that you have read, understood and agree to be bound by the following terms 
                and conditions of use ("Terms").
              </p>
            </div>
          </div>

          {/* Terms Sections */}
          <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
            {termsData.map((section) => (
              <div key={section.id} className="tc-accordion-item">
                <div 
                  className="tc-accordion-header"
                  onClick={() => toggleSection(section.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && toggleSection(section.id)}
                >
                  <div className="tc-accordion-title">
                    <span className="tc-accordion-icon">{section.icon}</span>
                    <span>{section.title}</span>
                  </div>
                  <span className="tc-chevron">
                    {activeSections[section.id] ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
                  </span>
                </div>
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    activeSections[section.id] ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="tc-accordion-content">
                    {formatContent(section.content)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <footer className="tc-footer text-center">
            <p>© {new Date().getFullYear()} Adiyogi Foundation. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default TermsAndConditions;