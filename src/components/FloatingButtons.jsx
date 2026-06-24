import React, { useState, useEffect } from 'react';
import { Stethoscope, Calendar, MessageSquare, ChevronUp } from 'lucide-react';

export default function FloatingButtons({ setCurrentPage }) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSidebarClick = (pageId) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <style>{`
        /* Left Docked Slide-out Sidebar Container */
        .sidebar-actions-container {
          position: fixed;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          z-index: 999;
          background-color: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-top-right-radius: 20px;
          border-bottom-right-radius: 20px;
          border: 1px solid rgba(226, 232, 240, 0.8);
          border-left: none;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
          overflow: hidden;
          width: 60px; /* Collapsed width: shows icons only */
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Hover expansion */
        .sidebar-actions-container:hover {
          width: 200px; /* Expanded width to reveal labels */
        }

        /* Sidebar Item */
        .sidebar-item {
          display: flex;
          align-items: center;
          width: 100%;
          height: 60px;
          border: none;
          background: transparent;
          cursor: pointer;
          padding: 0;
          transition: background-color 0.2s ease;
          border-bottom: 1px solid rgba(226, 232, 240, 0.5);
          outline: none;
          text-align: left;
          position: relative;
          text-decoration: none;
        }

        .sidebar-item:last-child {
          border-bottom: none;
        }

        /* Left vertical accent indicator bar on hover */
        .sidebar-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 4px;
          height: 100%;
          background-color: transparent;
          transition: background-color 0.2s ease;
        }

        /* Icon Wrapper */
        .sidebar-icon-wrapper {
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform 0.2s ease;
        }

        /* Label text next to icons */
        .sidebar-label {
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--secondary);
          white-space: nowrap;
          opacity: 0;
          transform: translateX(-10px);
          transition: opacity 0.2s ease, transform 0.2s ease;
          pointer-events: none;
        }

        /* Reveal labels on hover */
        .sidebar-actions-container:hover .sidebar-label {
          opacity: 1;
          transform: translateX(0);
          transition-delay: 0.05s;
        }

        /* Specific item hover colors & indicator bars */
        .medical-team-item:hover { background-color: rgba(59, 130, 246, 0.05); }
        .medical-team-item:hover::before { background-color: #3b82f6; }
        .medical-team-item:hover .sidebar-label { color: #3b82f6; }

        .schedule-visit-item:hover { background-color: rgba(239, 68, 68, 0.05); }
        .schedule-visit-item:hover::before { background-color: #ef4444; }
        .schedule-visit-item:hover .sidebar-label { color: #ef4444; }

        .get-in-touch-item:hover { background-color: rgba(139, 92, 246, 0.05); }
        .get-in-touch-item:hover::before { background-color: #8b5cf6; }
        .get-in-touch-item:hover .sidebar-label { color: #8b5cf6; }

        .quick-chat-item:hover { background-color: rgba(37, 211, 102, 0.05); }
        .quick-chat-item:hover::before { background-color: #25d366; }
        .quick-chat-item:hover .sidebar-label { color: #25d366; }

        /* Icon specific color styles */
        .text-blue { color: #3b82f6; }
        .text-red { color: #ef4444; }
        .text-purple { color: #8b5cf6; }
        .text-green { color: #25d366; }

        /* Micro-interaction on icon when hovered */
        .sidebar-item:hover .sidebar-icon-wrapper {
          transform: scale(1.05);
        }

        /* Scroll to Top Button (Separated in Bottom Right) */
        .scroll-top-btn {
          position: fixed;
          right: 24px;
          bottom: 24px;
          width: 48px;
          height: 48px;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
          transition: var(--transition-normal);
          cursor: pointer;
          z-index: 999;
          background-color: var(--bg-white);
          color: var(--secondary);
          border: 1px solid var(--border-color);
          opacity: 0;
          pointer-events: none;
          transform: translateY(20px);
        }

        .scroll-top-btn.visible {
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0);
        }

        .scroll-top-btn:hover {
          background-color: var(--secondary);
          color: var(--bg-white);
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
        }

        /* Mobile responsive rules */
        @media (max-width: 768px) {
          .sidebar-actions-container {
            width: 48px;
          }
          
          .sidebar-actions-container:hover {
            width: 48px; /* Disable expanding labels on mobile to avoid layout breaking */
          }
          
          .sidebar-item {
            height: 48px;
          }
          
          .sidebar-icon-wrapper {
            width: 48px;
            height: 48px;
          }
          
          .sidebar-label {
            display: none;
          }
          
          .scroll-top-btn {
            right: 16px;
            bottom: 16px;
            width: 40px;
            height: 40px;
          }
        }
      `}</style>

      {/* Left Docked Slide-out Sidebar */}
      <div className="sidebar-actions-container">
        
        {/* Item 1: Medical Team */}
        <button 
          onClick={() => handleSidebarClick('doctors')} 
          className="sidebar-item medical-team-item"
          aria-label="Medical Team"
        >
          <div className="sidebar-icon-wrapper text-blue">
            <Stethoscope size={24} />
          </div>
          <span className="sidebar-label">Medical Team</span>
        </button>

        {/* Item 2: Schedule Visit */}
        <button 
          onClick={() => handleSidebarClick('contact')} 
          className="sidebar-item schedule-visit-item"
          aria-label="Schedule Visit"
        >
          <div className="sidebar-icon-wrapper text-red">
            <Calendar size={24} />
          </div>
          <span className="sidebar-label">Schedule Visit</span>
        </button>

        {/* Item 3: Get In Touch */}
        <button 
          onClick={() => handleSidebarClick('contact')} 
          className="sidebar-item get-in-touch-item"
          aria-label="Get In Touch"
        >
          <div className="sidebar-icon-wrapper text-purple">
            <MessageSquare size={24} />
          </div>
          <span className="sidebar-label">Get In Touch</span>
        </button>

        {/* Item 4: Quick Chat (WhatsApp) */}
        <a 
          href="https://wa.me/918143919199?text=Hello%20New%20Life%20Hospital,%20I%20would%20like%20to%20inquire%20about%20booking%20an%20appointment." 
          target="_blank" 
          rel="noopener noreferrer"
          className="sidebar-item quick-chat-item"
          aria-label="Quick Chat on WhatsApp"
        >
          <div className="sidebar-icon-wrapper text-green">
            {/* WhatsApp Custom Path SVG */}
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              stroke="none"
            >
              <path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.761.459 3.479 1.332 5.003L2 22l5.143-1.348a9.923 9.923 0 0 0 4.869 1.28c5.506 0 9.988-4.482 9.988-9.988C22 6.482 17.518 2 12.012 2zm0 18.288c-1.579 0-3.125-.425-4.481-1.229l-.321-.19-3.328.873.889-3.245-.208-.332A8.204 8.204 0 0 1 3.28 11.99c0-4.54 3.7-8.24 8.24-8.24 4.54 0 8.24 3.7 8.24 8.24-1.002 4.54-3.7 8.298-8.24 8.298zM16.89 14.37c-.267-.134-1.583-.781-1.828-.87-.245-.09-.423-.134-.6.134-.178.267-.69.87-.847 1.047-.156.178-.312.2-.579.067-.267-.134-1.129-.416-2.15-1.328-.794-.708-1.329-1.583-1.485-1.85-.156-.267-.017-.412.117-.545.12-.12.267-.312.4-.468.134-.156.178-.267.267-.446.09-.178.045-.335-.022-.468-.067-.134-.6-1.446-.823-1.984-.216-.519-.434-.447-.6-.447H8.2c-.178 0-.468.067-.713.335-.245.268-.936.915-.936 2.23 0 1.316.958 2.587 1.092 2.766.134.179 1.885 2.879 4.568 4.037.638.276 1.136.441 1.524.564.64.203 1.222.175 1.682.107.513-.077 1.583-.647 1.806-1.272.223-.625.223-1.16.156-1.272-.067-.112-.245-.178-.512-.312z" />
            </svg>
          </div>
          <span className="sidebar-label">Quick Chat</span>
        </a>
      </div>

      {/* Scroll to Top (Separated in Bottom Right) */}
      <button 
        onClick={scrollToTop} 
        className={`floating-btn scroll-top-btn ${showScrollTop ? 'visible' : ''}`}
        aria-label="Scroll to Top"
        title="Back to Top"
      >
        <ChevronUp size={24} />
      </button>
    </>
  );
}
