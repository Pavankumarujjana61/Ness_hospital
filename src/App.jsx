import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetails from './pages/ServiceDetails';
import Doctors from './pages/Doctors';
import Contact from './pages/Contact';
import Admin from './pages/Admin';



const AppStyles = () => (
  <style>{`
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
}

.main-content-area {
  flex-grow: 1;
  padding-top: 80px; /* Offset for fixed floating header */
}

.main-content-area.admin-layout {
  padding-top: 0;
}

@media (max-width: 768px) {
  .main-content-area {
    padding-top: 80px; /* Offset remains the same for consistency */
  }
  .main-content-area.admin-layout {
    padding-top: 0;
  }
}

  `}</style>
);

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // Compute active page tab dynamically from URL path for active indicator support
  const getPageIdFromPath = (path) => {
    if (path === '/') return 'home';
    return path.substring(1); // e.g. '/about' -> 'about'
  };

  const currentPage = getPageIdFromPath(location.pathname);
  const isAdminPage = location.pathname.toLowerCase().startsWith('/admin');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Backwards compatible setCurrentPage callback routing handler
  const setCurrentPage = (pageId) => {
    navigate(pageId === 'home' ? '/' : `/${pageId}`);
  };

  return (
    <>
      <AppStyles />
      <div className="app-wrapper">
      {/* Navigation Header */}
      {!isAdminPage && <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />}
      
      {/* Main Dynamic Viewport with React Router */}
      <main className={`main-content-area ${isAdminPage ? 'admin-layout' : ''}`}>
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                setCurrentPage={setCurrentPage} 
                setSelectedDoctor={setSelectedDoctor} 
              />
            } 
          />
          <Route path="/about" element={<About setCurrentPage={setCurrentPage} />} />
          <Route path="/services" element={<Services setCurrentPage={setCurrentPage} />} />
          <Route 
            path="/services/:id" 
            element={
              <ServiceDetails 
                setCurrentPage={setCurrentPage} 
                setSelectedDoctor={setSelectedDoctor} 
              />
            } 
          />
          <Route 
            path="/doctors" 
            element={
              <Doctors 
                selectedDoctor={selectedDoctor} 
                setSelectedDoctor={setSelectedDoctor} 
              />
            } 
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>

      {/* Floating Sidebar Actions */}
      {!isAdminPage && <FloatingButtons setCurrentPage={setCurrentPage} />}

      {/* Footer Area */}
      {!isAdminPage && <Footer setCurrentPage={setCurrentPage} />}
    </div>
    </>
  );
}

export default App;
