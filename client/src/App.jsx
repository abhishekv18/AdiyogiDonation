import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SuccessStoriesPage from './pages/SuccessStories'
import ContactPage from './pages/Contact'
import AdminLoginPage from './pages/AdminLogin'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import axios from 'axios'
import { setUserData } from './redux/userSlice'
import ScrollToTop from './components/ScrollToTop'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './components/ProtectedRoute'
import AdminDashboard from './pages/AdminDashboard'
import WhatsAppButton from './components/WhatsappButton'
//export const ServerUrl="http://localhost:8000";
export const ServerUrl="https://adiyogidonation.onrender.com";
const App = () => {

  const dispatch=useDispatch();
const [authLoading, setAuthLoading] = useState(true);
const {userData} = useSelector((state) => state.user);
    useEffect(() => {
    const getUser = async () => {
      try {
        const result = await axios.get(ServerUrl + "/api/user/current-user", {
          withCredentials: true,
        });

        dispatch(setUserData(result.data.user));
      } catch (error) {
        if (error.response?.status !== 401) {
          console.log(error);
        }

        dispatch(setUserData(null));
      } finally {
        setAuthLoading(false);
      }
    };

    getUser();
  }, [dispatch]);
const navigate = useNavigate();

useEffect(() => {
   if(userData){
      navigate("/admin/dashboard");
   }
}, [userData]);
  return (
  <>
   <Toaster position="top-right" />
  <ScrollToTop/>
  <Routes>

    <Route path="/" element={<HomePage/>} />
    <Route path="/success-stories" element={<SuccessStoriesPage/>} />
    <Route path="/contact" element={<ContactPage/>} />
    <Route path="/admin-login" element={<AdminLoginPage/>} />

     <Route path='/admin/dashboard'  
                               element={
                                <ProtectedRoute authLoading={authLoading}>
                                  <AdminDashboard/>
                                </ProtectedRoute>
                               }
                               />
  </Routes>
  <WhatsAppButton/>
  </>
  )
}

export default App
