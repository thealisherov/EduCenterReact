import React, { useState } from 'react'
import Header from './Components/Layouts/Header'
import Footer from './Components/Layouts/Footer'
import Hero from './Components/Home/Hero'
import About from './Components/Home/About'
import Courses from './Components/Home/Courses'
import Teachers from './Components/Home/Teachers'
import Results from './Components/Home/Results'
import AdminDashboard from './Components/Admin/AdminDashboard'
import LoginModal from './Components/Admin/LoginModal'
import { AuthProvider } from './hooks/useAuth'
import { BrowserRouter as Router } from 'react-router-dom';
import About from './Components/Home/About';
import Courses from './Components/Home/Courses';
import { AuthProvider } from './hooks/useAuth';
import AdminDashboard from './Components/Admin/AdminDashboard';
function App() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showAdminPanel, setShowAdminPanel] = useState(false)

  return (
    <AuthProvider>
      <div className="App">
        <Header 
          onLoginClick={() => setShowLoginModal(true)}
          onAdminClick={() => setShowAdminPanel(true)}
        />
        
        {showAdminPanel ? (
          <AdminDashboard onClose={() => setShowAdminPanel(false)} />
        ) : (
          <>
            <Hero />
            <About />
            <Courses />
            <Teachers />
            <Results />
          </>
        )}
        
        <Footer />
        
        <LoginModal 
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        />
      </div>
    </AuthProvider>
  )
}

export default App