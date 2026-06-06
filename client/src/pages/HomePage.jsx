
// import React, { useState } from 'react'

// import Navbar from '../components/Navbar'
// import HeroSection from '../components/HeroSection'
// import SponsorsDonationSection from '../components/SponsorsDonationSection'
// import MissionImpactSection from '../components/MissionImpactSection'
// import Footer from '../components/Footer'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { useEffect } from 'react'

// const HomePage = () => {
//    const { userData } = useSelector((state) => state.user);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (userData) {
//       navigate("/admin/dashboard");
//     }
//   }, [userData, navigate]);

//   return (
//     <div style={{ position: 'relative' }}>
//       {/* Admin Login Button - Bottom Left */}
   

//       <Navbar/>
//       <HeroSection/>
//       <SponsorsDonationSection/>
//       <MissionImpactSection/>
//       <div style={{
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
//     </div>
//   )
// }

// export default HomePage

import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import SponsorsDonationSection from '../components/SponsorsDonationSection'
import MissionImpactSection from '../components/MissionImpactSection'
import Footer from '../components/Footer'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const HomePage = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      navigate("/admin/dashboard");
    }
  }, [userData, navigate]);

  return (
    <div style={{ position: 'relative' }}>
      <Navbar/>
      <HeroSection/>
      <SponsorsDonationSection/>
      <MissionImpactSection/>
      <div style={{
        background: '#FFFFFF',
        borderTop: '1px solid rgba(30,41,59,0.08)',
        borderBottom: '1px solid rgba(30,41,59,0.08)',
        padding: '48px 24px',
        marginTop: '20px'
      }}>
        <div style={{
          maxWidth: '1280px', 
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <p style={{
            fontFamily: 'var(--display)',
            fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
            fontStyle: 'italic',
            color: '#64748B',
            marginBottom: '8px',
            lineHeight: '1.6'
          }}>
            "Every act of seva brings us closer to the divine."
          </p>
          <p style={{
            fontSize: 'clamp(10px, 1.5vw, 12px)',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#E8B21C'
          }}>
            — Adiyogi Foundation
          </p>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default HomePage