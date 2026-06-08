import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaCookie, FaCookieBite, FaShieldAlt, FaChartBar, 
  FaAd, FaCog, FaBan, FaChevronDown, FaChevronUp,
  FaArrowLeft, FaArrowUp, FaExternalLinkAlt
} from 'react-icons/fa';
import { Helmet } from 'react-helmet';

const CookiePolicy = () => {
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

  const cookieData = [
    {
      id: 'introduction',
      title: 'Introduction',
      icon: <FaCookie className="text-[#E8B21C]" />,
      content: `Adiyogi Foundation ("we", "us", "our") is committed to protecting and respecting your privacy. We will always take reasonable and appropriate measures to prevent the unauthorized use or disclosure of your ("you", "your" or "user") personal data.

Adiyogi Foundation uses cookies across https://adiyogifoundation.org.in/ to save your session as you browse this website, store your preferences, perform statistical analytics, deliver personalized advertisements to you, and enhance your browsing experience.

This Cookie Policy explains how and why we use cookies and the choices you have. This Cookie Policy should be read together with our Privacy Policy and Terms and Conditions. Except as otherwise stated in this policy, the Privacy Policy shall govern the way we collect and process data via cookies.

This policy describes the usage of information captured using cookies that Adiyogi Foundation collects from you when you access or use the Website.`
    },
    {
      id: 'what-are-cookies',
      title: 'What are Cookies?',
      icon: <FaCookieBite className="text-[#E8B21C]" />,
      content: `A cookie is a small data or text file that Adiyogi Foundation stores on your computer, mobile, tablet, or other devices when you visit our website, to the extent you agree to such storage.

The saving of a cookie on a device is governed by the user-defined settings of the web browser or device.`
    },
    {
      id: 'why-cookies',
      title: 'Why Do We Need These Cookies?',
      icon: <FaShieldAlt className="text-[#D81B4A]" />,
      content: `We use cookies to offer you a more tailored experience by understanding and remembering your browsing preferences. We use cookies for various purposes such as:

• To provide you with our services and offer a better browsing experience.
• To identify your browser and device.
• To provide you with personalized advertisements.
• To provide you with personalized recommendations.
• To distinguish you from other users and improve your browsing experience.
• To store your preferences.
• For fraud detection and prevention.
• To measure and analyze website usage and improve ergonomics and visibility of content.
• To analyze visits to our pages in real time and offer varied ads suited to user interests.
• Cookies may also be saved by social media tools if you use such functionalities (e.g., Facebook, Google, Twitter, LinkedIn).`
    },
    {
      id: 'cookie-categories',
      title: 'What Categories of Cookies Do We Collect?',
      icon: <FaChartBar className="text-[#8AAE3B]" />,
      content: `We use different types of cookies for various purposes:`,
      table: {
        headers: ['Sr. No', 'Cookie Category', 'Description'],
        rows: [
          {
            number: '1',
            category: 'Necessary',
            description: 'Necessary cookies help make a website usable by enabling basic functions like page navigation and access to secure areas of the website. The website cannot function properly without these cookies.'
          },
          {
            number: '2',
            category: 'Preference',
            description: 'Preference cookies enable a website to remember information that changes the way the website behaves or looks, like your preferred language or the region that you are in.'
          },
          {
            number: '3',
            category: 'Statistics',
            description: 'Statistic cookies help website owners understand how visitors interact with websites by collecting and reporting information anonymously.'
          },
          {
            number: '4',
            category: 'Marketing',
            description: 'Marketing cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user and thereby more valuable for publishers and third-party advertisers.'
          }
        ]
      }
    },
    {
      id: 'your-choices',
      title: 'Your Choices: Accepting or Refusing Cookies',
      icon: <FaCog className="text-[#8AAE3B]" />,
      content: `You have a choice on how we use cookies with respect to your use of the Platform and access to our services. Please note that if you limit our ability to use cookies, you may not be able to access all or parts of our website.

The saving of a cookie on a device is governed by the user-defined settings of your browser or device. If you have accepted the option to allow the collecting and saving of cookies through your browser or device, they will be integrated into the pages and content you have viewed and may be temporarily stored in a dedicated location on your browser or device. Such cookies will be readable only by their issuer.`
    },
    {
      id: 'disabling-cookies',
      title: 'Disabling Cookies',
      icon: <FaBan className="text-[#D81B4A]" />,
      content: `The effect of disabling cookies depends on which cookies you disable. In general, the Website may not operate properly if all cookies are switched off. If you disable all cookies, you may deteriorate your overall user experience since it may no longer be personalized to you, and certain customized settings (like login information) may not be saved.

All modern browsers allow you to change your cookie preferences through their settings. These settings are typically found in the "options" or "preferences" menu. The following links may be helpful:

• Google Chrome
• Safari
• Firefox
• Microsoft Edge

To find information relating to other browsers, please visit the browser developer's website.

If you are primarily concerned about cookies being generated by advertising partners, you may be able to turn these off by going to an online preferences management site or other similar service.`
    },
    {
      id: 'device-info',
      title: 'Device Information',
      icon: <FaCog className="text-[#8AAE3B]" />,
      content: `Any mobile, browser, or online platform on which you access and use our services comes pre-loaded with certain permissions, without which we cannot provide you with the services. Each platform has its own permission system for procuring your consent. Depending on the platform you use (Web, Android, iOS, Windows, etc.), your device or browser will either alert you or require your consent before proceeding.`
    },
    {
      id: 'your-rights',
      title: 'Your Rights',
      icon: <FaShieldAlt className="text-[#D81B4A]" />,
      content: `Please see our Privacy Policy for more information on how you can request access, rectification, and erasure, and for any other queries regarding your device information that we have collected and processed.`
    },
    {
      id: 'contact',
      title: 'Contact Information',
      icon: <FaCookie className="text-[#E8B21C]" />,
      content: `If you have any queries regarding this Cookie Policy, please reach out to us at:

📩 Privacy@adiyogifoundation.org.in`
    }
  ];

  const formatContent = (content) => {
    return content.split('\n').map((line, index) => {
      const trimmedLine = line.trim();
      
      if (trimmedLine === '') {
        return <br key={index} />;
      }
      
      // Handle bullet points
      if (trimmedLine.startsWith('• ')) {
        return (
          <div key={index} className="flex items-start mb-2 ml-2 sm:ml-4">
            <span className="mr-2 mt-1 flex-shrink-0 text-[#D81B4A]">•</span>
            <span className="text-[#64748B] flex-1 text-sm sm:text-base">{trimmedLine.substring(2)}</span>
          </div>
        );
      }
      
      // Handle email/contact info
      if (trimmedLine.includes('📩')) {
        return (
          <div key={index} className="flex items-center mb-2">
            <span className="text-lg mr-2">📩</span>
            <span className="text-[#1E293B] font-medium text-sm sm:text-base">{trimmedLine.substring(2)}</span>
          </div>
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

  const browserLinks = {
    'Google Chrome': 'https://support.google.com/chrome/answer/95647',
    'Safari': 'https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac',
    'Firefox': 'https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences',
    'Microsoft Edge': 'https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09'
  };

  return (
    <>
      <Helmet>
        <title>Cookie Policy | Adiyogi Foundation</title>
        <meta name="description" content="Learn about how Adiyogi Foundation uses cookies to enhance your browsing experience and your choices regarding cookie settings." />
        <meta name="keywords" content="Adiyogi Foundation Cookie Policy, Cookies, Privacy, Website Tracking, Browser Settings" />
        <link rel="canonical" href="https://www.adiyogifoundation.org.in/cookie-policy" />

        <meta property="og:title" content="Cookie Policy | Adiyogi Foundation" />
        <meta property="og:description" content="Understand how we use cookies and manage your preferences for a better browsing experience." />
        <meta property="og:url" content="https://www.adiyogifoundation.org.in/cookie-policy" />
        <meta property="og:image" content="https://www.adiyogifoundation.org.in/Adiyogifoundation logo_02.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Cookie Policy | Adiyogi Foundation" />
        <meta name="twitter:description" content="Learn about cookie usage and management on Adiyogi Foundation's website." />
        <meta name="twitter:image" content="https://www.adiyogifoundation.org.in/Adiyogifoundation logo_02.png" />
      </Helmet>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        .cp-root {
          font-family: 'DM Sans', sans-serif;
          background: #FAFAF7;
          min-height: 100vh;
          position: relative;
        }

        .cp-header-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-weight: 600;
          font-style: italic;
        }

        /* ── Back button ── */
        .cp-back-btn {
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
          .cp-back-btn { font-size: 12.5px; padding: 8px 18px; }
        }
        @media (min-width: 640px) {
          .cp-back-btn { font-size: 13px; padding: 9px 20px; }
        }
        .cp-back-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 32px rgba(216,27,74,0.30);
        }

        /* ── Back to top ── */
        .cp-top-btn {
          background: linear-gradient(135deg, #D81B4A 0%, #B0153D 100%);
          color: #fff;
          padding: 12px;
          border-radius: 50%;
          box-shadow: 0 10px 30px rgba(216,27,74,0.30);
          transition: all 0.22s;
        }
        @media (min-width: 480px) {
          .cp-top-btn { padding: 13px; }
        }
        .cp-top-btn:hover {
          transform: translateY(-3px) scale(1.08);
          box-shadow: 0 16px 40px rgba(216,27,74,0.40);
        }

        /* ── Intro box ── */
        .cp-intro-box {
          background: #F3F5EF;
          border-left: 4px solid #E8B21C;
          border-radius: 12px;
          padding: 16px;
        }
        @media (min-width: 480px) {
          .cp-intro-box { padding: 20px; border-radius: 14px; }
        }
        @media (min-width: 640px) {
          .cp-intro-box { padding: 24px; border-radius: 16px; }
        }

        /* ── Accordion item ── */
        .cp-accordion-item {
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          overflow: hidden;
          background: #fff;
          transition: box-shadow 0.25s;
        }
        @media (min-width: 480px) {
          .cp-accordion-item { border-radius: 14px; }
        }
        @media (min-width: 640px) {
          .cp-accordion-item { border-radius: 16px; }
        }
        .cp-accordion-item:hover {
          box-shadow: 0 4px 20px rgba(30,41,59,0.06);
        }

        .cp-accordion-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 16px;
          background: #fff;
          cursor: pointer;
          transition: background 0.20s;
        }
        @media (min-width: 480px) {
          .cp-accordion-header { padding: 16px 20px; }
        }
        .cp-accordion-header:hover {
          background: #F3F5EF;
        }

        .cp-accordion-title {
          font-size: 15px;
          font-weight: 500;
          color: #1E293B;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        @media (min-width: 480px) {
          .cp-accordion-title { font-size: 16px; gap: 12px; }
        }

        .cp-accordion-icon {
          flex-shrink: 0;
          width: 16px;
          height: 16px;
        }
        @media (min-width: 480px) {
          .cp-accordion-icon { width: 18px; height: 18px; }
        }

        .cp-chevron {
          color: #94a3b8;
          transition: transform 0.25s;
          flex-shrink: 0;
          width: 16px;
          height: 16px;
        }
        @media (min-width: 480px) {
          .cp-chevron { width: 18px; height: 18px; }
        }

        .cp-accordion-content {
          padding: 0 16px 16px;
          color: #64748B;
          line-height: 1.75;
          font-size: 13.5px;
        }
        @media (min-width: 480px) {
          .cp-accordion-content { padding: 0 20px 20px; font-size: 14px; }
        }
        @media (min-width: 640px) {
          .cp-accordion-content { font-size: 14.5px; }
        }

        /* ── Table ── */
        .cp-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 12.5px;
          margin-top: 12px;
        }
        @media (min-width: 480px) {
          .cp-table { font-size: 13px; margin-top: 16px; }
        }
        @media (min-width: 640px) {
          .cp-table { font-size: 13.5px; }
        }
        .cp-table thead {
          background: #F3F5EF;
        }
        .cp-table th {
          border: 1px solid #E2E8F0;
          padding: 12px 14px;
          text-align: left;
          font-weight: 600;
          color: #1E293B;
          font-size: 12px;
        }
        @media (min-width: 480px) {
          .cp-table th { padding: 14px 16px; font-size: 12.5px; }
        }
        .cp-table td {
          border: 1px solid #E2E8F0;
          padding: 10px 14px;
          color: #64748B;
          vertical-align: top;
        }
        @media (min-width: 480px) {
          .cp-table td { padding: 12px 16px; }
        }
        .cp-table tbody tr:nth-child(even) {
          background: #FAFAF7;
        }
        .cp-table .cp-category-cell {
          color: #D81B4A;
          font-weight: 500;
        }

        /* ── Browser links ── */
        .cp-browser-link {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #64748B;
          text-decoration: none;
          padding: 6px 0;
          transition: color 0.20s;
          font-size: 13px;
        }
        @media (min-width: 480px) {
          .cp-browser-link { font-size: 13.5px; }
        }
        .cp-browser-link:hover {
          color: #D81B4A;
        }
        .cp-browser-link:hover .cp-external-icon {
          transform: translate(2px, -2px);
        }
        .cp-external-icon {
          transition: transform 0.20s;
          flex-shrink: 0;
        }

        /* ── Footer ── */
        .cp-footer {
          border-top: 1px solid #E2E8F0;
          padding-top: 20px;
          color: #94a3b8;
          font-size: 12px;
        }
        @media (min-width: 480px) {
          .cp-footer { font-size: 13px; padding-top: 24px; }
        }

        /* ── Responsive table wrapper ── */
        .cp-table-wrap {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          margin: 0 -16px;
          padding: 0 16px;
        }
        @media (min-width: 480px) {
          .cp-table-wrap { margin: 0; padding: 0; }
        }
      `}</style>

      <div className="cp-root">
        {/* Decorative orbs */}
        <div className="pointer-events-none fixed -left-20 sm:-left-28 top-6 sm:top-10 h-60 sm:h-80 w-60 sm:w-80 rounded-full bg-[#D81B4A]/6 blur-3xl" />
        <div className="pointer-events-none fixed -right-16 sm:-right-24 bottom-16 sm:bottom-24 h-60 sm:h-80 w-60 sm:w-80 rounded-full bg-[#8AAE3B]/6 blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 lg:py-14">
          
          {/* Back to Home Button */}
          <div className="mb-6 sm:mb-8">
            <Link to="/" className="cp-back-btn" aria-label="Back to Home">
              <FaArrowLeft size={13} />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Back to Top Button */}
          {showBackToTop && (
            <button
              onClick={scrollToTop}
              className="fixed bottom-6 right-6 z-50 cp-top-btn"
              aria-label="Back to top"
            >
              <FaArrowUp size={16} />
            </button>
          )}

          {/* Header */}
          <header className="text-center mb-8 sm:mb-12">
            <div className="flex justify-center items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <FaCookie className="text-2xl sm:text-3xl text-[#E8B21C]" />
              <h1 className="cp-header-title text-3xl sm:text-4xl lg:text-5xl text-[#1E293B]">
                Cookie Policy
              </h1>
            </div>
            <div className="w-16 sm:w-20 h-0.5 bg-gradient-to-r from-[#D81B4A] via-[#8AAE3B] to-[#E8B21C] mx-auto my-3 sm:my-4 rounded-full" />
            {/* <p className="text-[#D81B4A] font-semibold text-xs sm:text-sm tracking-wide">www.adiyogifoundation.org.in</p> */}
            <p className="text-[#94a3b8] italic mt-2 text-xs sm:text-sm">
              Last Updated: {new Date().toLocaleDateString()}
            </p>
          </header>

          {/* Introduction Banner */}
          <div className="mb-8 sm:mb-10">
            <div className="cp-intro-box">
              <h3 className="text-base sm:text-lg font-semibold text-[#1E293B] flex items-center gap-2">
                <FaCookieBite className="text-[#E8B21C] flex-shrink-0" size={16} /> 
                <span>About Our Cookie Usage</span>
              </h3>
              <p className="mt-3 text-[#64748B] text-sm sm:text-base leading-relaxed">
                This policy explains how we use cookies and similar technologies to enhance your experience 
                on our website. By using our website, you consent to our use of cookies as described in this policy.
              </p>
            </div>
          </div>

          {/* Cookie Policy Sections */}
          <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
            {cookieData.map((section) => (
              <div key={section.id} className="cp-accordion-item">
                <div 
                  className="cp-accordion-header"
                  onClick={() => toggleSection(section.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && toggleSection(section.id)}
                >
                  <div className="cp-accordion-title">
                    <span className="cp-accordion-icon">{section.icon}</span>
                    <span>{section.title}</span>
                  </div>
                  <span className="cp-chevron">
                    {activeSections[section.id] ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
                  </span>
                </div>
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    activeSections[section.id] ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="cp-accordion-content">
                    {formatContent(section.content)}
                    
                    {/* Render table for cookie categories */}
                    {section.table && (
                      <div className="cp-table-wrap mt-4">
                        <table className="cp-table">
                          <thead>
                            <tr>
                              {section.table.headers.map((header, index) => (
                                <th key={index}>{header}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {section.table.rows.map((row, rowIndex) => (
                              <tr key={rowIndex}>
                                <td>{row.number}</td>
                                <td className="cp-category-cell">{row.category}</td>
                                <td>{row.description}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                    
                    {/* Render browser links for disabling cookies section */}
                    {section.id === 'disabling-cookies' && (
                      <div className="mt-4 space-y-1">
                        {Object.entries(browserLinks).map(([browser, link]) => (
                          <a
                            key={browser}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cp-browser-link"
                          >
                            <span className="text-[#D81B4A]">•</span> {browser}
                            <FaExternalLinkAlt size={10} className="cp-external-icon" />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <footer className="cp-footer text-center">
            <p>© {new Date().getFullYear()} Adiyogi Foundation. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default CookiePolicy;