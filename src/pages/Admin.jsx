import React, { useState, useEffect } from 'react';
import { 
  Lock, User, Mail, Calendar, Phone, Activity, LogOut, Check, X, 
  MessageSquare, Edit3, ShieldAlert, Sparkles, RefreshCw, KeyRound, Search, Clock,
  Star, Trash2, Image, Briefcase
} from 'lucide-react';
import logo from '../assets/logo.svg';
import { getIconComponent } from './Services';

const AdminStyles = () => (
  <style>{`
/* Admin Login Page */
.admin-login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: radial-gradient(circle at 50% 50%, #0f172a 0%, #090d16 100%);
  position: relative;
  overflow: hidden;
}

.admin-login-page::before {
  content: '';
  position: absolute;
  width: 300px;
  height: 300px;
  background: var(--primary);
  filter: blur(150px);
  opacity: 0.15;
  top: 20%;
  left: 30%;
  border-radius: 50%;
  pointer-events: none;
}

.admin-login-page::after {
  content: '';
  position: absolute;
  width: 250px;
  height: 250px;
  background: #3b82f6;
  filter: blur(130px);
  opacity: 0.1;
  bottom: 20%;
  right: 30%;
  border-radius: 50%;
  pointer-events: none;
}

.login-card {
  width: 100%;
  max-width: 420px;
  padding: 3.5rem 2.5rem;
  border-radius: var(--radius-lg);
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  z-index: 10;
}

.login-header {
  margin-bottom: 2.25rem;
}

.login-logo-img {
  height: 72px;
  width: auto;
  margin-bottom: 1.25rem;
  filter: drop-shadow(0 0 12px rgba(16, 185, 129, 0.3));
}

.login-header h2 {
  font-size: 2rem;
  font-weight: 800;
  color: var(--bg-white);
  margin-bottom: 8px;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #ffffff 0%, #94a3b8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.login-header p {
  color: #94a3b8;
  font-size: 0.95rem;
  line-height: 1.5;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.login-form .form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.login-form label {
  color: #cbd5e1;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.login-card .input-icon {
  position: absolute;
  left: 14px;
  color: #64748b;
  transition: var(--transition-fast);
}

.login-card .input-wrapper input {
  width: 100%;
  height: 48px;
  padding: 0 16px 0 44px;
  border-radius: var(--radius-sm);
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(255, 255, 255, 0.03);
  color: var(--bg-white);
  font-size: 0.95rem;
  outline: none;
  transition: var(--transition-normal);
}

.login-card .input-wrapper input:focus {
  background-color: rgba(255, 255, 255, 0.05);
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
}

.login-card .input-wrapper input:focus + .input-icon,
.login-card .input-wrapper:focus-within .input-icon {
  color: var(--primary);
}

.login-error-alert {
  background-color: rgba(239, 68, 68, 0.1);
  color: #f87171;
  border: 1px solid rgba(239, 68, 68, 0.2);
  padding: 10px 14px;
  border-radius: var(--radius-sm);
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 10px;
}

.btn-login {
  height: 48px;
  width: 100%;
  margin-top: 8px;
  background: linear-gradient(135deg, var(--primary) 0%, #10b981 100%);
  border: none;
  color: var(--bg-white);
  font-weight: 700;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: var(--transition-normal);
  box-shadow: 0 4px 14px rgba(16, 185, 129, 0.3);
}

.btn-login:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
}

.btn-login:active {
  transform: translateY(0);
}

/* Authorised Admin Dashboard Layout */
.admin-dashboard-layout {
  display: flex;
  min-height: 100vh;
  background-color: var(--bg-light);
}

/* Sidebar Navigation Panel */
.dashboard-sidebar {
  width: 260px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  padding: 2rem 1.5rem;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 800;
  margin-bottom: 2rem;
  letter-spacing: -0.01em;
}

.sidebar-user-info {
  background-color: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 12px 16px;
  border-radius: var(--radius-md);
  margin-bottom: 2.5rem;
}

.welcome-text {
  font-size: 0.75rem;
  text-transform: uppercase;
  color: var(--text-light);
  letter-spacing: 0.05em;
  font-weight: 600;
}

.user-name {
  font-family: var(--font-heading);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--bg-white);
  margin-top: 2px;
}

.sidebar-nav-menu {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-grow: 1;
}

.nav-menu-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  height: 48px;
  padding: 0 16px;
  border-radius: var(--radius-sm);
  background: transparent;
  border: none;
  color: var(--text-light);
  font-family: var(--font-heading);
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  text-align: left;
  transition: var(--transition-fast);
}

.nav-menu-btn:hover {
  background-color: rgba(255, 255, 255, 0.05);
  color: var(--bg-white);
}

.nav-menu-btn.active {
  background-color: var(--primary);
  color: var(--bg-white);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
}

.sidebar-footer {
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding-top: 1.5rem;
}

.nav-menu-btn-alt {
  display: flex;
  align-items: center;
  gap: 10px;
  background: none;
  border: none;
  color: var(--text-light);
  font-family: var(--font-heading);
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  padding: 6px 12px;
  text-align: left;
  transition: var(--transition-fast);
}

.nav-menu-btn-alt:hover {
  color: var(--primary);
}

.btn-logout-sidebar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 44px;
  width: 100%;
  border-radius: var(--radius-sm);
  background-color: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.15);
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: var(--transition-normal);
}

.btn-logout-sidebar:hover {
  background-color: #ef4444;
  color: var(--bg-white);
}

/* Main Dashboard Panel */
.dashboard-main-panel {
  flex-grow: 1;
  padding: 2.5rem;
  overflow-y: auto;
  max-height: 100vh;
}

.dashboard-main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  gap: 20px;
}

.header-info h2 {
  font-size: 2rem;
  font-weight: 800;
  color: var(--secondary);
  letter-spacing: -0.01em;
}

.header-info p {
  color: var(--text-medium);
  font-size: 0.95rem;
}

.btn-refresh {
  padding: 0.6rem 1.25rem;
  font-size: 0.9rem;
}

/* Stats Summary Widgets Grid */
.stats-widgets-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.stat-widget-card {
  padding: 1.75rem;
  border-radius: var(--radius-md);
  background: var(--bg-white);
  border: 1px solid var(--border-color);
  box-shadow: var(--card-shadow);
}

.widget-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.widget-title {
  font-family: var(--font-heading);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text-medium);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.widget-value {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--secondary);
  line-height: 1.1;
  margin-bottom: 6px;
}

.widget-note {
  font-size: 0.8rem;
  color: var(--text-light);
  font-weight: 500;
}

/* Lists and Tables Container */
.recent-list-container {
  padding: 2rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  background: var(--bg-white);
  box-shadow: var(--card-shadow);
}

.recent-list-container h3 {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--secondary);
  margin-bottom: 1.5rem;
}

.empty-table-prompt {
  padding: 3rem;
  text-align: center;
  color: var(--text-medium);
}

.empty-table-prompt p {
  margin-top: 10px;
  font-weight: 500;
}

/* Table styling */
.responsive-table-wrapper {
  width: 100%;
  overflow-x: auto;
}

.admin-data-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.9rem;
}

.admin-data-table th,
.admin-data-table td {
  padding: 14px 16px;
  border-bottom: 1px solid var(--border-color);
}

.admin-data-table th {
  font-family: var(--font-heading);
  font-weight: 700;
  color: var(--secondary);
  background-color: var(--bg-light);
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
}

.admin-data-table tbody tr:hover {
  background-color: rgba(226, 232, 240, 0.2);
}

.row-unread {
  background-color: rgba(16, 185, 129, 0.02);
}

.slot-badge {
  background-color: var(--bg-light);
  border: 1px solid var(--border-color);
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 600;
}

/* Status Badges */
.status-badge-visual {
  display: inline-block;
  padding: 4px 10px;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.status-badge-visual.pending { background-color: #fef3c7; color: #d97706; }
.status-badge-visual.confirmed { background-color: #d1fae5; color: #059669; }
.status-badge-visual.cancelled { background-color: #fee2e2; color: #dc2626; }
.status-badge-visual.completed { background-color: #e2e8f0; color: #475569; }

/* Small action buttons */
.action-button-group-inline {
  display: flex;
  gap: 8px;
}

.btn-action-small {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-sm);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition-fast);
}

.btn-action-small.confirm { background-color: #d1fae5; color: #059669; }
.btn-action-small.confirm:hover { background-color: #059669; color: var(--bg-white); }

.btn-action-small.cancel { background-color: #fee2e2; color: #dc2626; }
.btn-action-small.cancel:hover { background-color: #dc2626; color: var(--bg-white); }

.btn-action-small.complete { background-color: var(--primary-glow); color: var(--primary); }
.btn-action-small.complete:hover { background-color: var(--primary); color: var(--bg-white); }

.btn-action-small.reset { background-color: #e2e8f0; color: #475569; }
.btn-action-small.reset:hover { background-color: #475569; color: var(--bg-white); }

/* Table control bar */
.table-controls-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 1.5rem;
  background-color: var(--bg-white);
  padding: 12px 16px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
}

.admin-search-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  flex-grow: 1;
  max-width: 400px;
}

.admin-search-wrapper .search-icon {
  position: absolute;
  left: 12px;
  color: var(--text-light);
}

.admin-search-wrapper input {
  width: 100%;
  height: 38px;
  padding: 0 12px 0 38px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
  font-size: 0.9rem;
  outline: none;
}

.admin-filter-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-heading);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text-medium);
}

.admin-filter-wrapper select {
  height: 38px;
  padding: 0 12px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
  outline: none;
  font-weight: 600;
}

.appointments-list-table-card {
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  background: var(--bg-white);
  box-shadow: var(--card-shadow);
}

/* Doctors Manager Dashboard */
.doctors-manager-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.doc-admin-card {
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
  padding: 1.5rem;
  background-color: var(--bg-white);
  box-shadow: var(--card-shadow);
  display: flex;
  flex-direction: column;
}

.doc-admin-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 12px;
  margin-bottom: 12px;
}

.doc-admin-header h4 {
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--secondary);
}

.btn-edit-doc-admin {
  background: none;
  border: none;
  color: var(--primary);
  cursor: pointer;
  transition: var(--transition-fast);
}

.btn-edit-doc-admin:hover {
  color: var(--primary-hover);
  transform: scale(1.1);
}

.doc-admin-info-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 0.85rem;
  color: var(--text-medium);
}

.doc-timings-badge-box {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: var(--bg-light);
  border: 1px solid var(--border-color);
  padding: 6px 10px;
  border-radius: var(--radius-sm);
  color: var(--secondary);
  font-weight: 600;
}

.doc-timings-badge-box svg {
  color: var(--primary);
}

.doc-bio-preview {
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 54px;
}

/* Inquiry Tracker */
.inquiries-list-table-card {
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  background: var(--bg-white);
  box-shadow: var(--card-shadow);
}

.inquiry-message-cell-preview {
  max-width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--text-medium);
}

.btn-toggle-inquiry-read {
  border: none;
  padding: 4px 10px;
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition-fast);
}

.btn-toggle-inquiry-read.unread { background-color: var(--primary-glow); color: var(--primary); }
.btn-toggle-inquiry-read.unread:hover { background-color: var(--primary); color: var(--bg-white); }

.btn-toggle-inquiry-read.read { background-color: var(--bg-light); color: var(--text-light); }
.btn-toggle-inquiry-read.read:hover { background-color: var(--border-color); color: var(--text-medium); }

/* Modal Modifiers */
.admin-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(10, 17, 40, 0.6);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 2000;
  padding: 2rem 1.5rem;
  overflow-y: auto;
}

.close-modal-btn {
  background: none;
  border: none;
  color: var(--text-medium);
  cursor: pointer;
  padding: 0;
  transition: var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-modal-btn:hover {
  color: var(--secondary);
}

.doc-admin-avatar-box {
  width: 50px;
  height: 50px;
  border-radius: var(--radius-sm);
  overflow: hidden;
  background-color: var(--bg-light);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-color);
  margin-right: 12px;
  flex-shrink: 0;
}

.doc-admin-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.doc-admin-initials {
  font-family: var(--font-heading);
  font-weight: 800;
  color: var(--primary);
  font-size: 1.25rem;
}

.sidebar-logo-img {
  height: 56px;
  width: auto;
  object-fit: contain;
}

.sidebar-brand-text {
  display: flex;
  flex-direction: column;
}

.sidebar-brand-text .brand-title {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--bg-white);
  line-height: 1.1;
  letter-spacing: -0.01em;
}

.sidebar-brand-text .brand-subtitle {
  font-size: 0.55rem;
  font-weight: 700;
  color: var(--primary);
  text-transform: uppercase;
  letter-spacing: 0.03em;
  margin-top: 2px;
  line-height: 1.2;
}

.admin-modal-container {
  width: 100%;
  max-width: 600px;
  background: var(--bg-white);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  box-shadow: var(--box-shadow-lg);
  padding: 2.5rem;
  margin: auto;
}

.admin-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.admin-modal-header h3 {
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--secondary);
}

.admin-modal-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.admin-modal-form .form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.admin-modal-form .form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.admin-modal-form label {
  font-family: var(--font-heading);
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text-medium);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.admin-modal-form input,
.admin-modal-form select {
  height: 44px;
  padding: 0 14px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
  background-color: var(--bg-light);
  font-size: 0.95rem;
  outline: none;
  transition: var(--transition-fast);
}

.admin-modal-form input:focus,
.admin-modal-form select:focus {
  background-color: var(--bg-white);
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--primary-glow);
}

.admin-modal-form textarea {
  padding: 10px 14px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
  background-color: var(--bg-light);
  font-size: 0.95rem;
  outline: none;
  transition: var(--transition-fast);
  resize: vertical;
}

.admin-modal-form textarea:focus {
  background-color: var(--bg-white);
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--primary-glow);
}

.btn-save-modal {
  height: 48px;
  margin-top: 1rem;
}

/* Modal Alerts */
.modal-error-alert {
  background-color: #fee2e2;
  color: #991b1b;
  padding: 10px 14px;
  border-radius: var(--radius-sm);
  font-size: 0.85rem;
}

.modal-success-alert {
  background-color: #d1fae5;
  color: #065f46;
  padding: 10px 14px;
  border-radius: var(--radius-sm);
  font-size: 0.85rem;
}

/* Responsive Rules */
@media (max-width: 1024px) {
  .doctors-manager-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .admin-dashboard-layout {
    flex-direction: column;
  }
  
  .dashboard-sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    padding: 1.5rem;
  }
  
  .sidebar-user-info {
    margin-bottom: 1.5rem;
  }
  
  .sidebar-nav-menu {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 1.5rem;
  }
  
  .nav-menu-btn {
    width: auto;
    flex-grow: 1;
    height: 40px;
    justify-content: center;
    font-size: 0.85rem;
  }
  
  .dashboard-main-panel {
    padding: 1.5rem;
    max-height: none;
    overflow-y: visible;
  }
  
  .stats-widgets-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .table-controls-bar {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
  
  .doctors-manager-grid {
    grid-template-columns: 1fr;
  }
}

  `}</style>
);

export default function Admin() {
  const [token, setToken] = useState(sessionStorage.getItem('adminToken') || '');
  const [username, setUsername] = useState(sessionStorage.getItem('adminUsername') || '');
  const [loginInputs, setLoginInputs] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  
  // Dashboard view selection: 'summary', 'appointments', 'doctors', 'inquiries'
  const [activeTab, setActiveTab] = useState('summary');
  
  // Dynamic SQL Data state
  const [stats, setStats] = useState({ appointments: { total: 0, pending: 0 }, inquiries: { total: 0, unread: 0 }, doctorsCount: 0 });
  const [appointments, setAppointments] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [doctors, setDoctors] = useState([]);
  
  // Loading and action feedbacks
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Modals for edits
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [doctorForm, setDoctorForm] = useState({
    name: '',
    qualifications: '',
    specialty: '',
    category: 'General Medicine',
    experience: '',
    timings: '',
    bio: '',
    image_url: '',
    status: 'Active',
    availability: 'In Hospital',
    sort_order: 10
  });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newUsername: '', newPassword: '' });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [photoInputType, setPhotoInputType] = useState('upload'); // 'upload' or 'url'
  
  // Testimonials management state
  const [testimonials, setTestimonials] = useState([]);
  const [showTestimonialModal, setShowTestimonialModal] = useState(false);
  const [isTestimonialCreate, setIsTestimonialCreate] = useState(true);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [testimonialForm, setTestimonialForm] = useState({
    patient_name: '',
    location: '',
    rating: 5,
    comment: ''
  });

  // Banners management state
  const [banners, setBanners] = useState([]);
  const [showBannerModal, setShowBannerModal] = useState(false);
  const [isBannerCreate, setIsBannerCreate] = useState(true);
  const [editingBanner, setEditingBanner] = useState(null);
  const [bannerForm, setBannerForm] = useState({
    title: '',
    subtitle: '',
    description: '',
    cta: '',
    image_url: ''
  });

  // Services management state
  const [services, setServices] = useState([]);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [isServiceCreate, setIsServiceCreate] = useState(true);
  const [editingService, setEditingService] = useState(null);
  const [serviceModalTab, setServiceModalTab] = useState('basic');
  const [serviceForm, setServiceForm] = useState({
    name: '',
    tagline: '',
    short_desc: '',
    icon_name: 'Stethoscope',
    image_url: '',
    specialist_category: '',
    stats: [{ value: '', label: '' }],
    details: '',
    why_choose_us: [{ title: '', text: '', icon: 'ShieldCheck' }],
    conditions: [''],
    facilities: [''],
    equipments: [''],
    faqs: [{ q: '', a: '' }]
  });

  const handleAuthError = (errMessage) => {
    if (errMessage === 'Invalid Token' || errMessage === 'Access Denied: No Token Provided') {
      sessionStorage.removeItem('adminToken');
      sessionStorage.removeItem('adminUsername');
      setToken('');
      setUsername('');
      setActiveTab('summary');
      alert('Session expired. Please log in again.');
      return true;
    }
    return false;
  };

  // Fetch Dashboard Stats & Lists
  const fetchData = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const headers = { 'Authorization': `Bearer ${token}` };
      
      const fetchJson = async (url, options = {}) => {
        const res = await fetch(url, options);
        const contentType = res.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) {
          const text = await res.text();
          console.error(`Error: Endpoint ${url} returned non-JSON response (status ${res.status}):`, text.slice(0, 300));
          throw new SyntaxError(`Unexpected token '<', "${text.slice(0, 30)}" is not valid JSON`);
        }
        return res.json();
      };

      // 1. Fetch Stats
      const statsData = await fetchJson('/api/admin/stats', { headers });
      if (statsData.error) {
        if (handleAuthError(statsData.error)) return;
      } else {
        setStats(statsData);
      }
      
      // 2. Fetch Appointments
      const apptData = await fetchJson('/api/admin/appointments', { headers });
      if (apptData.error) {
        if (handleAuthError(apptData.error)) return;
      } else {
        setAppointments(apptData);
      }

      // 3. Fetch Inquiries
      const inqData = await fetchJson('/api/admin/inquiries', { headers });
      if (inqData.error) {
        if (handleAuthError(inqData.error)) return;
      } else {
        setInquiries(inqData);
      }

      // 4. Fetch Doctors
      const docData = await fetchJson('/api/doctors');
      if (!docData.error) setDoctors(docData);

      // 5. Fetch Testimonials
      const testData = await fetchJson('/api/testimonials');
      if (!testData.error) setTestimonials(testData);

      // 6. Fetch Banners
      const bannersData = await fetchJson('/api/banners');
      if (!bannersData.error) setBanners(bannersData);

      // 7. Fetch Services
      const servicesData = await fetchJson('/api/services');
      if (!servicesData.error) setServices(servicesData);
    } catch (err) {
      console.error('Failed to retrieve dashboard records:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    if (!loginInputs.username || !loginInputs.password) {
      setLoginError('Username and password are required.');
      return;
    }

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginInputs)
      });
      const data = await res.json();
      if (data.error) {
        setLoginError(data.error);
        return;
      }

      // Save token to sessionStorage
      sessionStorage.setItem('adminToken', data.token);
      sessionStorage.setItem('adminUsername', data.username);
      setToken(data.token);
      setUsername(data.username);
      setLoginInputs({ username: '', password: '' });
    } catch (err) {
      setLoginError('Network error connecting to Express server.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminToken');
    sessionStorage.removeItem('adminUsername');
    setToken('');
    setUsername('');
    setActiveTab('summary');
  };

  // Appointment Actions: Confirm, Cancel, Complete
  const handleUpdateAppointment = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/admin/appointments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        fetchData(); // Refresh logs
      } else {
        if (!handleAuthError(data.error)) {
          alert('Failed: ' + data.error);
        }
      }
    } catch (err) {
      console.error('Error updating appointment slot:', err);
    }
  };

  // Inquiry actions: Mark Read / Unread
  const handleToggleInquiry = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Unread' ? 'Read' : 'Unread';
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        fetchData();
      } else {
        handleAuthError(data.error);
      }
    } catch (err) {
      console.error('Error toggling inquiry read state:', err);
    }
  };

  // Photo upload handler
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('photo', file);

    setUploadingPhoto(true);
    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setDoctorForm(prev => ({ ...prev, image_url: data.fileUrl }));
      } else {
        if (!handleAuthError(data.error)) {
          alert('Upload failed: ' + data.error);
        }
      }
    } catch (err) {
      console.error('Error uploading photo:', err);
      alert('Error uploading photo to server.');
    } finally {
      setUploadingPhoto(false);
    }
  };

  // Doctor management click & submit routines
  const handleAddDoctorClick = () => {
    setIsCreateMode(true);
    setEditingDoctor(null);
    setPhotoInputType('upload');
    setDoctorForm({
      name: '',
      qualifications: '',
      specialty: '',
      category: 'General Medicine',
      experience: '',
      timings: '',
      bio: '',
      image_url: '',
      status: 'Active',
      availability: 'In Hospital',
      sort_order: 10
    });
    setShowDoctorModal(true);
  };

  const handleEditDoctorClick = (doc) => {
    setIsCreateMode(false);
    setEditingDoctor(doc);
    if (doc.image_url && doc.image_url.startsWith('/uploaded-doctor-')) {
      setPhotoInputType('upload');
    } else if (doc.image_url) {
      setPhotoInputType('url');
    } else {
      setPhotoInputType('upload');
    }
    setDoctorForm({
      name: doc.name || '',
      qualifications: doc.qualifications || '',
      specialty: doc.specialty || '',
      category: doc.category || 'General Medicine',
      experience: doc.experience || '',
      timings: doc.timings || '',
      bio: doc.bio || '',
      image_url: doc.image_url || '',
      status: doc.status || 'Active',
      availability: doc.availability || 'In Hospital',
      sort_order: doc.sort_order !== undefined ? doc.sort_order : 10
    });
    setShowDoctorModal(true);
  };

  const handleDoctorFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isCreateMode ? '/api/admin/doctors' : `/api/admin/doctors/${editingDoctor.id}`;
      const method = isCreateMode ? 'POST' : 'PUT';
      
      const res = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(doctorForm)
      });
      const data = await res.json();
      if (data.success) {
        setShowDoctorModal(false);
        setEditingDoctor(null);
        fetchData();
      } else {
        if (!handleAuthError(data.error)) {
          alert((isCreateMode ? 'Create' : 'Update') + ' failed: ' + data.error);
        }
      }
    } catch (err) {
      console.error('Error submitting doctor form:', err);
    }
  };

  const handleDeleteDoctorClick = async (id) => {
    if (!window.confirm('Are you sure you want to delete this doctor profile? This action cannot be undone.')) {
      return;
    }
    try {
      const res = await fetch(`/api/admin/doctors/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        fetchData();
      } else {
        if (!handleAuthError(data.error)) {
          alert('Delete failed: ' + data.error);
        }
      }
    } catch (err) {
      console.error('Error deleting doctor profile:', err);
    }
  };

  // Testimonials Handlers
  const handleAddTestimonialClick = () => {
    setIsTestimonialCreate(true);
    setEditingTestimonial(null);
    setTestimonialForm({
      patient_name: '',
      location: '',
      rating: 5,
      comment: ''
    });
    setShowTestimonialModal(true);
  };

  const handleEditTestimonialClick = (t) => {
    setIsTestimonialCreate(false);
    setEditingTestimonial(t);
    setTestimonialForm({
      patient_name: t.patient_name,
      location: t.location,
      rating: t.rating,
      comment: t.comment
    });
    setShowTestimonialModal(true);
  };

  const handleTestimonialFormChange = (e) => {
    const { name, value } = e.target;
    setTestimonialForm({
      ...testimonialForm,
      [name]: name === 'rating' ? parseInt(value, 10) : value
    });
  };

  const handleTestimonialFormSubmit = async (e) => {
    e.preventDefault();
    if (!testimonialForm.patient_name || !testimonialForm.location || !testimonialForm.comment) {
      alert('Patient name, location, and review comment are required.');
      return;
    }

    try {
      const url = isTestimonialCreate ? '/api/admin/testimonials' : `/api/admin/testimonials/${editingTestimonial.id}`;
      const method = isTestimonialCreate ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(testimonialForm)
      });

      const data = await res.json();
      if (data.success) {
        setShowTestimonialModal(false);
        fetchData();
      } else {
        if (!handleAuthError(data.error)) {
          alert('Failed to save testimonial: ' + data.error);
        }
      }
    } catch (err) {
      console.error('Error submitting testimonial form:', err);
    }
  };

  const handleDeleteTestimonialClick = async (id) => {
    if (!window.confirm('Are you sure you want to delete this patient testimonial?')) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        fetchData();
      } else {
        if (!handleAuthError(data.error)) {
          alert('Delete failed: ' + data.error);
        }
      }
    } catch (err) {
      console.error('Error deleting testimonial:', err);
    }
  };

  // Banners Handlers
  const handleAddBannerClick = () => {
    setIsBannerCreate(true);
    setEditingBanner(null);
    setPhotoInputType('upload');
    setBannerForm({
      title: '',
      subtitle: '',
      description: '',
      cta: '',
      image_url: ''
    });
    setShowBannerModal(true);
  };

  const handleEditBannerClick = (b) => {
    setIsBannerCreate(false);
    setEditingBanner(b);
    setPhotoInputType(b.image_url.startsWith('/uploaded-') ? 'upload' : 'url');
    setBannerForm({
      title: b.title,
      subtitle: b.subtitle,
      description: b.description,
      cta: b.cta,
      image_url: b.image_url
    });
    setShowBannerModal(true);
  };

  const handleBannerFormSubmit = async (e) => {
    e.preventDefault();
    if (!bannerForm.title || !bannerForm.subtitle || !bannerForm.description || !bannerForm.cta || !bannerForm.image_url) {
      alert('All banner fields are required, including the image.');
      return;
    }

    try {
      const url = isBannerCreate ? '/api/admin/banners' : `/api/admin/banners/${editingBanner.id}`;
      const method = isBannerCreate ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bannerForm)
      });

      const data = await res.json();
      if (data.success) {
        setShowBannerModal(false);
        fetchData();
      } else {
        if (!handleAuthError(data.error)) {
          alert('Failed to save banner: ' + data.error);
        }
      }
    } catch (err) {
      console.error('Error submitting banner form:', err);
    }
  };

  const handleDeleteBannerClick = async (id) => {
    if (!window.confirm('Are you sure you want to delete this home banner?')) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/banners/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        fetchData();
      } else {
        if (!handleAuthError(data.error)) {
          alert('Delete failed: ' + data.error);
        }
      }
    } catch (err) {
      console.error('Error deleting banner:', err);
    }
  };

  const handleBannerPhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('photo', file);

    setUploadingPhoto(true);
    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setBannerForm(prev => ({ ...prev, image_url: data.fileUrl }));
      } else {
        if (!handleAuthError(data.error)) {
          alert('Upload failed: ' + data.error);
        }
      }
    } catch (err) {
      console.error('Error uploading banner photo:', err);
      alert('Photo upload failed.');
    } finally {
      setUploadingPhoto(false);
    }
  };

  // Services management click & submit routines
  const handleAddServiceClick = () => {
    setIsServiceCreate(true);
    setEditingService(null);
    setPhotoInputType('upload');
    setServiceModalTab('basic');
    setServiceForm({
      name: '',
      tagline: '',
      short_desc: '',
      icon_name: 'Stethoscope',
      image_url: '',
      specialist_category: '',
      stats: [{ value: '', label: '' }],
      details: '',
      why_choose_us: [{ title: '', text: '', icon: 'ShieldCheck' }],
      conditions: [''],
      facilities: [''],
      equipments: [''],
      faqs: [{ q: '', a: '' }]
    });
    setShowServiceModal(true);
  };

  const handleEditServiceClick = (srv) => {
    setIsServiceCreate(false);
    setEditingService(srv);
    setPhotoInputType(srv.image_url?.startsWith('/uploaded-') ? 'upload' : 'url');
    setServiceModalTab('basic');
    
    const parseField = (field, defaultVal) => {
      if (typeof field === 'string') {
        try {
          return JSON.parse(field);
        } catch (e) {
          return defaultVal;
        }
      }
      return field || defaultVal;
    };

    setServiceForm({
      name: srv.name || '',
      tagline: srv.tagline || '',
      short_desc: srv.short_desc || '',
      icon_name: srv.icon_name || 'Stethoscope',
      image_url: srv.image_url || '',
      specialist_category: srv.specialist_category || '',
      stats: parseField(srv.stats, [{ value: '', label: '' }]),
      details: srv.details || '',
      why_choose_us: parseField(srv.why_choose_us, [{ title: '', text: '', icon: 'ShieldCheck' }]),
      conditions: parseField(srv.conditions, ['']),
      facilities: parseField(srv.facilities, ['']),
      equipments: parseField(srv.equipments, ['']),
      faqs: parseField(srv.faqs, [{ q: '', a: '' }])
    });
    setShowServiceModal(true);
  };

  const handleServiceFormSubmit = async (e) => {
    e.preventDefault();
    if (!serviceForm.name || !serviceForm.tagline || !serviceForm.short_desc || !serviceForm.icon_name || !serviceForm.image_url || !serviceForm.specialist_category) {
      alert('Please fill out all required service fields.');
      return;
    }

    try {
      const url = isServiceCreate ? '/api/admin/services' : `/api/admin/services/${editingService.id}`;
      const method = isServiceCreate ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(serviceForm)
      });

      const data = await res.json();
      if (data.success) {
        setShowServiceModal(false);
        fetchData();
      } else {
        if (!handleAuthError(data.error)) {
          alert('Failed to save service: ' + data.error);
        }
      }
    } catch (err) {
      console.error('Error submitting service form:', err);
    }
  };

  const handleDeleteServiceClick = async (id) => {
    if (!window.confirm('Are you sure you want to delete this clinical service? All dynamic details will be removed.')) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/services/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        fetchData();
      } else {
        if (!handleAuthError(data.error)) {
          alert('Delete failed: ' + data.error);
        }
      }
    } catch (err) {
      console.error('Error deleting service:', err);
    }
  };

  const handleServicePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('photo', file);

    setUploadingPhoto(true);
    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setServiceForm(prev => ({ ...prev, image_url: data.fileUrl }));
      } else {
        if (!handleAuthError(data.error)) {
          alert('Upload failed: ' + data.error);
        }
      }
    } catch (err) {
      console.error('Error uploading service photo:', err);
      alert('Photo upload failed.');
    } finally {
      setUploadingPhoto(false);
    }
  };

  // Admin Profile Modification (Username and Password)
  const handlePasswordChangeSubmit = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');
    if (!passwordForm.currentPassword) {
      setPasswordError('Current password is required to verify identity.');
      return;
    }
    if (!passwordForm.newUsername && !passwordForm.newPassword) {
      setPasswordError('Please provide a new username or a new password to update.');
      return;
    }

    try {
      const res = await fetch('/api/admin/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newUsername: passwordForm.newUsername,
          newPassword: passwordForm.newPassword
        })
      });
      const data = await res.json();
      if (data.error) {
        if (!handleAuthError(data.error)) {
          setPasswordError(data.error);
        }
        return;
      }
      setPasswordSuccess('Admin profile updated successfully. Logging out to apply changes...');
      setPasswordForm({ currentPassword: '', newUsername: '', newPassword: '' });
      setTimeout(() => {
        setShowPasswordModal(false);
        setPasswordSuccess('');
        handleLogout(); // Force relogin with new credentials
      }, 2000);
    } catch (err) {
      setPasswordError('Error modifying credentials.');
    }
  };

  // Search/Filters for Appointments list
  const filteredAppointments = appointments.filter(appt => {
    const matchesSearch = appt.patient_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          appt.patient_phone.includes(searchQuery) ||
                          appt.doctor_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          appt.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || appt.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Login Panel Render
  if (!token) {
    return (
      <>
        <AdminStyles />
        <div className="admin-login-page animate-fade-in">
          <div className="login-card glass-panel">
            <div className="login-header text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <img src="/logo_brand.png" alt="Logo" className="login-logo-img animate-float" style={{ margin: 0, height: '72px', width: 'auto' }} />
              </div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--bg-white)', marginBottom: '8px' }}>Admin Portal</h2>
              <p>Enter administrator credentials to login to the clinic dashboard.</p>
            </div>

            <form onSubmit={handleLoginSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="loginUsername">Username</label>
                <div className="input-wrapper">
                  <User size={18} className="input-icon" />
                  <input 
                    type="text" 
                    id="loginUsername" 
                    placeholder="Enter username"
                    value={loginInputs.username}
                    onChange={(e) => setLoginInputs({ ...loginInputs, username: e.target.value })}
                    required 
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="loginPassword">Password</label>
                <div className="input-wrapper">
                  <Lock size={18} className="input-icon" />
                  <input 
                    type="password" 
                    id="loginPassword" 
                    placeholder="••••••••"
                    value={loginInputs.password}
                    onChange={(e) => setLoginInputs({ ...loginInputs, password: e.target.value })}
                    required 
                  />
                </div>
              </div>

              {loginError && (
                <div className="login-error-alert animate-fade-in">
                  <ShieldAlert size={18} />
                  <span>{loginError}</span>
                </div>
              )}

              <button type="submit" className="btn btn-primary btn-login">
                Authorize Login
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }

  // Authorised Dashboard Panel Render
  return (
    <>
      <AdminStyles />
      <div className="admin-dashboard-layout animate-fade-in">
      {/* Sidebar Nav */}
      <aside className="dashboard-sidebar bg-navy-gradient text-white">
        <div className="sidebar-brand" style={{ justifyContent: 'center' }}>
          <img src="/logo_brand.png" alt="Logo" className="sidebar-logo-img" />
        </div>
        
        <div className="sidebar-user-info">
          <p className="welcome-text">Logged in as:</p>
          <p className="user-name">{username}</p>
        </div>

        <nav className="sidebar-nav-menu">
          <button 
            onClick={() => setActiveTab('summary')}
            className={`nav-menu-btn ${activeTab === 'summary' ? 'active' : ''}`}
          >
            <Sparkles size={18} />
            <span>Dashboard Stats</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('appointments')}
            className={`nav-menu-btn ${activeTab === 'appointments' ? 'active' : ''}`}
          >
            <Calendar size={18} />
            <span>Appointments ({stats.appointments.pending})</span>
          </button>

          <button 
            onClick={() => setActiveTab('doctors')}
            className={`nav-menu-btn ${activeTab === 'doctors' ? 'active' : ''}`}
          >
            <Activity size={18} />
            <span>Doctors Schedule</span>
          </button>

          <button 
            onClick={() => setActiveTab('inquiries')}
            className={`nav-menu-btn ${activeTab === 'inquiries' ? 'active' : ''}`}
          >
            <MessageSquare size={18} />
            <span>Inquiries ({stats.inquiries.unread})</span>
          </button>

          <button 
            onClick={() => setActiveTab('testimonials')}
            className={`nav-menu-btn ${activeTab === 'testimonials' ? 'active' : ''}`}
          >
            <Star size={18} />
            <span>Testimonials</span>
          </button>

          <button 
            onClick={() => setActiveTab('banners')}
            className={`nav-menu-btn ${activeTab === 'banners' ? 'active' : ''}`}
          >
            <Image size={18} />
            <span>Home Banners</span>
          </button>

          <button 
            onClick={() => setActiveTab('services')}
            className={`nav-menu-btn ${activeTab === 'services' ? 'active' : ''}`}
          >
            <Briefcase size={18} />
            <span>Clinical Services</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <button onClick={() => setShowPasswordModal(true)} className="nav-menu-btn-alt">
            <KeyRound size={16} />
            <span>Admin Settings</span>
          </button>
          
          <button onClick={handleLogout} className="btn-logout-sidebar">
            <LogOut size={16} />
            <span>Log Out Portal</span>
          </button>
        </div>
      </aside>

      {/* Main Dashboard Panel */}
      <main className="dashboard-main-panel">
        <header className="dashboard-main-header">
          <div className="header-info">
            <h2>Hospital Dashboard</h2>
            <p>Admin control center for slot schedules, doctor profiles, and messages.</p>
          </div>
          <button onClick={fetchData} className="btn btn-outline btn-refresh">
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            <span>Refresh Records</span>
          </button>
        </header>

        {/* Dynamic Views */}
        <div className="dashboard-content-container">

          {/* VIEW 1: Summary Widgets */}
          {activeTab === 'summary' && (
            <div className="dashboard-tab-view tab-summary animate-fade-in">
              <div className="stats-widgets-grid">
                
                {/* Widget 1 */}
                <div className="stat-widget-card glass-panel">
                  <div className="widget-header">
                    <span className="widget-title">Pending Slots</span>
                    <Calendar size={20} className="text-red" />
                  </div>
                  <div className="widget-value text-gradient-alt">{stats.appointments.pending}</div>
                  <div className="widget-note">Awaiting clinical confirmation</div>
                </div>

                {/* Widget 2 */}
                <div className="stat-widget-card glass-panel">
                  <div className="widget-header">
                    <span className="widget-title">Total Bookings</span>
                    <Activity size={20} className="text-blue" />
                  </div>
                  <div className="widget-value">{stats.appointments.total}</div>
                  <div className="widget-note">Stored appointment logs</div>
                </div>

                {/* Widget 3 */}
                <div className="stat-widget-card glass-panel">
                  <div className="widget-header">
                    <span className="widget-title">Unread Messages</span>
                    <MessageSquare size={20} className="text-purple" />
                  </div>
                  <div className="widget-value">{stats.inquiries.unread}</div>
                  <div className="widget-note">Inquiry form responses</div>
                </div>

                {/* Widget 4 */}
                <div className="stat-widget-card glass-panel">
                  <div className="widget-header">
                    <span className="widget-title">Clinical Specialties</span>
                    <Activity size={20} className="text-emerald" style={{ color: 'var(--primary)' }} />
                  </div>
                  <div className="widget-value">{stats.servicesCount || services.length}</div>
                  <div className="widget-note">Active clinical services</div>
                </div>
              </div>

              {/* Recent Pending Table */}
              <div className="recent-list-container glass-panel">
                <h3>Awaiting Confirmation</h3>
                {appointments.filter(a => a.status === 'Pending').length === 0 ? (
                  <div className="empty-table-prompt">
                    <Check size={28} className="text-primary" />
                    <p>All appointment requests have been processed!</p>
                  </div>
                ) : (
                  <div className="responsive-table-wrapper">
                    <table className="admin-data-table">
                      <thead>
                        <tr>
                          <th>Patient</th>
                          <th>Phone</th>
                          <th>Doctor</th>
                          <th>Date</th>
                          <th>Slot</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {appointments.filter(a => a.status === 'Pending').slice(0, 5).map((appt) => (
                          <tr key={appt.id}>
                            <td><strong>{appt.patient_name}</strong></td>
                            <td>{appt.patient_phone}</td>
                            <td>{appt.doctor_name}</td>
                            <td>{appt.booking_date}</td>
                            <td><span className="slot-badge">{appt.booking_time_slot}</span></td>
                            <td>
                              <div className="action-button-group-inline">
                                <button 
                                  onClick={() => handleUpdateAppointment(appt.id, 'Confirmed')}
                                  className="btn-action-small confirm"
                                  title="Confirm Appointment"
                                >
                                  <Check size={16} />
                                </button>
                                <button 
                                  onClick={() => handleUpdateAppointment(appt.id, 'Cancelled')}
                                  className="btn-action-small cancel"
                                  title="Cancel Appointment"
                                >
                                  <X size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* VIEW 2: Appointments Manager */}
          {activeTab === 'appointments' && (
            <div className="dashboard-tab-view tab-appointments animate-fade-in">
              <div className="table-controls-bar">
                {/* Search */}
                <div className="admin-search-wrapper">
                  <Search size={18} className="search-icon" />
                  <input 
                    type="text" 
                    placeholder="Search by patient, phone or doctor..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Filter */}
                <div className="admin-filter-wrapper">
                  <span>Status:</span>
                  <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="All">All Slots</option>
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="appointments-list-table-card glass-panel">
                {filteredAppointments.length === 0 ? (
                  <p className="no-data-text text-center">No appointment logs found matching search criteria.</p>
                ) : (
                  <div className="responsive-table-wrapper">
                    <table className="admin-data-table">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Patient Name</th>
                          <th>Mobile</th>
                          <th>Doctor / Specialty</th>
                          <th>Date</th>
                          <th>Slot</th>
                          <th>Status</th>
                          <th>Action Trigger</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredAppointments.map((appt) => (
                          <tr key={appt.id}>
                            <td>#{appt.id}</td>
                            <td><strong>{appt.patient_name}</strong></td>
                            <td>{appt.patient_phone}</td>
                            <td>
                              <div>{appt.doctor_name}</div>
                              <small className="text-muted">{appt.specialty}</small>
                            </td>
                            <td>{appt.booking_date}</td>
                            <td><span className="slot-badge">{appt.booking_time_slot}</span></td>
                            <td>
                              <span className={`status-badge-visual ${appt.status.toLowerCase()}`}>
                                {appt.status}
                              </span>
                            </td>
                            <td>
                              <div className="action-button-group-inline">
                                {appt.status === 'Pending' && (
                                  <>
                                    <button 
                                      onClick={() => handleUpdateAppointment(appt.id, 'Confirmed')}
                                      className="btn-action-small confirm"
                                      title="Confirm"
                                    >
                                      <Check size={16} />
                                    </button>
                                    <button 
                                      onClick={() => handleUpdateAppointment(appt.id, 'Cancelled')}
                                      className="btn-action-small cancel"
                                      title="Cancel"
                                    >
                                      <X size={16} />
                                    </button>
                                  </>
                                )}
                                {appt.status === 'Confirmed' && (
                                  <>
                                    <button 
                                      onClick={() => handleUpdateAppointment(appt.id, 'Completed')}
                                      className="btn-action-small complete"
                                      title="Mark Completed"
                                    >
                                      <Check size={16} />
                                    </button>
                                    <button 
                                      onClick={() => handleUpdateAppointment(appt.id, 'Cancelled')}
                                      className="btn-action-small cancel"
                                      title="Cancel"
                                    >
                                      <X size={16} />
                                    </button>
                                  </>
                                )}
                                {appt.status === 'Cancelled' && (
                                  <button 
                                    onClick={() => handleUpdateAppointment(appt.id, 'Pending')}
                                    className="btn-action-small reset"
                                    title="Re-open Pending"
                                  >
                                    <RefreshCw size={14} />
                                  </button>
                                )}
                                {appt.status === 'Completed' && (
                                  <span className="text-muted font-bold text-xs">Closed</span>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* VIEW 3: Doctors Availability Manager */}
          {activeTab === 'doctors' && (
            <div className="dashboard-tab-view tab-doctors animate-fade-in">
              <div className="table-controls-bar" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--secondary)' }}>Clinical Consultants List</h3>
                <button 
                  onClick={handleAddDoctorClick} 
                  className="btn btn-primary"
                  style={{ height: '38px', padding: '0 16px', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <Sparkles size={16} />
                  <span>Add New Doctor</span>
                </button>
              </div>

              <div className="appointments-list-table-card glass-panel" style={{ padding: '1.5rem' }}>
                {doctors.length === 0 ? (
                  <p className="no-data-text text-center">No doctor records found in database.</p>
                ) : (
                  <div className="responsive-table-wrapper">
                    <table className="admin-data-table">
                      <thead>
                        <tr>
                          <th style={{ width: '50px' }}>#</th>
                          <th style={{ width: '80px' }}>Image</th>
                          <th>Doctor Name</th>
                          <th>Service / Category</th>
                          <th>Specialization / Specialty</th>
                          <th>Status</th>
                          <th>Availability</th>
                          <th style={{ width: '70px' }}>Sort</th>
                          <th style={{ width: '100px' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {doctors.map((doc, idx) => (
                          <tr key={doc.id}>
                            <td>{idx + 1}</td>
                            <td>
                              <div style={{ width: '48px', height: '48px', borderRadius: '50%', overflow: 'hidden', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-light)' }}>
                                {doc.image_url ? (
                                  <img src={doc.image_url} alt={doc.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                  <span style={{ fontWeight: 'bold', color: 'var(--primary)', fontSize: '1.1rem' }}>
                                    {doc.name ? doc.name.split(' ').slice(-1)[0][0] : 'D'}
                                  </span>
                                )}
                              </div>
                            </td>
                            <td>
                              <div><strong>{doc.name}</strong></div>
                              <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '2px' }}>{doc.experience} Experience</div>
                            </td>
                            <td>
                              <span className="status-badge-visual confirmed" style={{ fontSize: '0.75rem', textTransform: 'uppercase', padding: '4px 10px', backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6', border: 'none' }}>
                                {doc.category || 'General'}
                              </span>
                            </td>
                            <td>
                              <div>{doc.specialty}</div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-medium)', fontStyle: 'italic', marginTop: '2px' }}>{doc.qualifications}</div>
                            </td>
                            <td>
                              <span 
                                className={`status-badge-visual ${doc.status === 'Active' ? 'confirmed' : 'cancelled'}`}
                                style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}
                              >
                                {doc.status || 'Active'}
                              </span>
                            </td>
                            <td>
                              <span 
                                className="status-badge-visual"
                                style={{ 
                                  fontSize: '0.75rem', 
                                  textTransform: 'uppercase', 
                                  backgroundColor: doc.availability === 'In Hospital' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)', 
                                  color: doc.availability === 'In Hospital' ? 'var(--primary)' : 'var(--accent)'
                                }}
                              >
                                {doc.availability || 'In Hospital'}
                              </span>
                            </td>
                            <td>
                              <strong>{doc.sort_order !== undefined ? doc.sort_order : 10}</strong>
                            </td>
                            <td>
                              <div className="action-button-group-inline">
                                <button 
                                  onClick={() => handleEditDoctorClick(doc)}
                                  className="btn-action-small"
                                  title="Edit Profile"
                                  style={{ backgroundColor: '#06b6d4', color: '#ffffff' }}
                                >
                                  <Edit3 size={15} />
                                </button>
                                <button 
                                  onClick={() => handleDeleteDoctorClick(doc.id)}
                                  className="btn-action-small cancel"
                                  title="Delete Doctor"
                                >
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* VIEW 4: Patient Inquiries Form Tracker */}
          {activeTab === 'inquiries' && (
            <div className="dashboard-tab-view tab-inquiries animate-fade-in">
              <div className="inquiries-list-table-card glass-panel">
                {inquiries.length === 0 ? (
                  <p className="no-data-text text-center">No inquiry messages submitted from Contact form.</p>
                ) : (
                  <div className="responsive-table-wrapper">
                    <table className="admin-data-table">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Inquirer Name</th>
                          <th>Mobile Phone</th>
                          <th>Email</th>
                          <th>Submitted Date</th>
                          <th>Message Details</th>
                          <th>Read Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inquiries.map((inq) => (
                          <tr key={inq.id} className={inq.status === 'Unread' ? 'row-unread' : ''}>
                            <td>#{inq.id}</td>
                            <td><strong>{inq.name}</strong></td>
                            <td>{inq.phone}</td>
                            <td>{inq.email ? <a href={`mailto:${inq.email}`}>{inq.email}</a> : <span className="text-muted">None</span>}</td>
                            <td>{inq.created_at.split(' ')[0]}</td>
                            <td>
                              <div className="inquiry-message-cell-preview" title={inq.message}>
                                {inq.message}
                              </div>
                            </td>
                            <td>
                              <button 
                                onClick={() => handleToggleInquiry(inq.id, inq.status)}
                                className={`btn-toggle-inquiry-read ${inq.status.toLowerCase()}`}
                              >
                                {inq.status === 'Unread' ? 'Mark Read' : 'Mark Unread'}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* VIEW 5: Patient Testimonials Manager */}
          {activeTab === 'testimonials' && (
            <div className="dashboard-tab-view tab-testimonials animate-fade-in">
              <div className="tab-view-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 className="tab-title">Patient Testimonials ({testimonials.length})</h2>
                <button onClick={handleAddTestimonialClick} className="btn btn-primary" style={{ padding: '0.6rem 1.25rem' }}>
                  <Sparkles size={16} />
                  <span>Add Testimonial</span>
                </button>
              </div>

              <div className="testimonials-list-table-card glass-panel" style={{ padding: '2rem' }}>
                {testimonials.length === 0 ? (
                  <p className="no-data-text text-center">No patient testimonials found in database.</p>
                ) : (
                  <div className="admin-testimonials-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                    {testimonials.map((t) => (
                      <div key={t.id} className="admin-testimonial-card glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <div style={{ display: 'flex', gap: '2px' }}>
                              {Array.from({ length: 5 }).map((_, idx) => (
                                <Star 
                                  key={idx} 
                                  size={16} 
                                  fill={idx < t.rating ? "var(--accent)" : "none"} 
                                  stroke={idx < t.rating ? "var(--accent)" : "var(--border-color)"} 
                                />
                              ))}
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button 
                                onClick={() => handleEditTestimonialClick(t)} 
                                style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer' }}
                                title="Edit"
                              >
                                <Edit3 size={16} />
                              </button>
                              <button 
                                onClick={() => handleDeleteTestimonialClick(t.id)} 
                                style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                                title="Delete"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                          <p style={{ fontStyle: 'italic', fontSize: '0.95rem', color: 'var(--text-medium)', marginBottom: '1rem', lineHeight: '1.5' }}>
                            "{t.comment}"
                          </p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
                          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary-glow)', color: 'var(--primary)', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>
                            {t.patient_name ? t.patient_name[0].toUpperCase() : 'P'}
                          </div>
                          <div>
                            <h5 style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--secondary)' }}>{t.patient_name}</h5>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>{t.location}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* VIEW 6: Home Banners customization */}
          {activeTab === 'banners' && (
            <div className="dashboard-tab-view tab-banners animate-fade-in">
              <div className="tab-view-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 className="tab-title">Home Banners ({banners.length})</h2>
                <button onClick={handleAddBannerClick} className="btn btn-primary" style={{ padding: '0.6rem 1.25rem' }}>
                  <Sparkles size={16} />
                  <span>Add New Banner</span>
                </button>
              </div>

              <div className="banners-list-table-card glass-panel" style={{ padding: '2rem' }}>
                {banners.length === 0 ? (
                  <p className="no-data-text text-center">No home banners configured in database.</p>
                ) : (
                  <div className="admin-banners-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
                    {banners.map((b) => (
                      <div key={b.id} className="admin-banner-card glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative', overflow: 'hidden' }}>
                        
                        {/* Banner Image Preview */}
                        <div style={{ width: '100%', height: '140px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', backgroundColor: 'var(--navy-dark)', position: 'relative' }}>
                          <img 
                            src={b.image_url} 
                            alt={b.title} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                            onError={(e) => { e.target.src = '/hero_caring_doctors.png'; }}
                          />
                          <div style={{ position: 'absolute', top: '8px', right: '8px', display: 'flex', gap: '6px' }}>
                            <button 
                              onClick={() => handleEditBannerClick(b)} 
                              style={{ background: 'var(--bg-white)', border: 'none', color: 'var(--primary)', cursor: 'pointer', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--card-shadow)' }}
                              title="Edit Banner"
                            >
                              <Edit3 size={14} />
                            </button>
                            <button 
                              onClick={() => handleDeleteBannerClick(b.id)} 
                              style={{ background: 'var(--bg-white)', border: 'none', color: '#ef4444', cursor: 'pointer', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--card-shadow)' }}
                              title="Delete Banner"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>

                        {/* Banner content */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{b.subtitle}</span>
                          <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--secondary)', margin: 0 }}>{b.title}</h4>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-medium)', lineHeight: '1.4', margin: '4px 0' }}>{b.description}</p>
                          <div style={{ marginTop: '4px' }}>
                            <span style={{ fontSize: '0.75rem', padding: '4px 8px', borderRadius: '4px', backgroundColor: 'var(--primary-glow)', color: 'var(--primary)', fontWeight: '700' }}>
                              Button: {b.cta}
                            </span>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* VIEW 7: Clinical Services Manager */}
          {activeTab === 'services' && (
            <div className="dashboard-tab-view tab-services animate-fade-in">
              <div className="table-controls-bar" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--secondary)' }}>Clinical Specialties</h3>
                <button 
                  onClick={handleAddServiceClick} 
                  className="btn btn-primary"
                  style={{ height: '38px', padding: '0 16px', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <Sparkles size={16} />
                  <span>Add New Specialty</span>
                </button>
              </div>

              <div className="appointments-list-table-card glass-panel" style={{ padding: '1.5rem' }}>
                {services.length === 0 ? (
                  <p className="no-data-text text-center">No service records found in database.</p>
                ) : (
                  <div className="responsive-table-wrapper">
                    <table className="admin-data-table">
                      <thead>
                        <tr>
                          <th style={{ width: '50px' }}>#</th>
                          <th style={{ width: '80px' }}>Image</th>
                          <th>Service Specialty</th>
                          <th>Category</th>
                          <th>Icon</th>
                          <th>Tagline & Description</th>
                          <th style={{ width: '100px' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {services.map((srv, idx) => (
                          <tr key={srv.id}>
                            <td>{idx + 1}</td>
                            <td>
                              <div style={{ width: '56px', height: '36px', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-light)' }}>
                                {srv.image_url ? (
                                  <img src={srv.image_url} alt={srv.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                  <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>No Img</span>
                                )}
                              </div>
                            </td>
                            <td>
                              <strong>{srv.name}</strong>
                            </td>
                            <td>
                              <span className="status-badge-visual confirmed" style={{ fontSize: '0.75rem', textTransform: 'uppercase', padding: '4px 10px', backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6', border: 'none' }}>
                                {srv.specialist_category}
                              </span>
                            </td>
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary)' }}>
                                {getIconComponent(srv.icon_name, 18)}
                                <span style={{ fontSize: '0.85rem', color: 'var(--text-medium)' }}>{srv.icon_name}</span>
                              </div>
                            </td>
                            <td>
                              <div style={{ fontWeight: '600', color: 'var(--secondary)', fontSize: '0.85rem' }}>{srv.tagline}</div>
                              <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '2px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '350px' }} title={srv.short_desc}>
                                {srv.short_desc}
                              </div>
                            </td>
                            <td>
                              <div className="action-button-group-inline">
                                <button 
                                  onClick={() => handleEditServiceClick(srv)}
                                  className="btn-action-small"
                                  title="Edit Service"
                                  style={{ backgroundColor: '#06b6d4', color: '#ffffff' }}
                                >
                                  <Edit3 size={15} />
                                </button>
                                <button 
                                  onClick={() => handleDeleteServiceClick(srv.id)}
                                  className="btn-action-small cancel"
                                  title="Delete Service"
                                >
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* MODAL 1: Add/Edit Doctor Profile */}
      {showDoctorModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-container glass-panel animate-fade-in">
            <div className="admin-modal-header">
              <h3>{isCreateMode ? 'Add New Doctor' : 'Edit Doctor Profile'}</h3>
              <button onClick={() => { setShowDoctorModal(false); setEditingDoctor(null); }} className="close-modal-btn">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleDoctorFormSubmit} className="admin-modal-form">
              <div className="form-group">
                <label>Doctor Name</label>
                <input 
                  type="text" 
                  value={doctorForm.name}
                  onChange={(e) => setDoctorForm({ ...doctorForm, name: e.target.value })}
                  placeholder="e.g. Dr. John Doe"
                  required
                />
              </div>

              <div className="form-group">
                <label>Qualifications</label>
                <input 
                  type="text" 
                  value={doctorForm.qualifications}
                  onChange={(e) => setDoctorForm({ ...doctorForm, qualifications: e.target.value })}
                  placeholder="e.g. MBBS, MD"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Specialty</label>
                  <input 
                    type="text" 
                    value={doctorForm.specialty}
                    onChange={(e) => setDoctorForm({ ...doctorForm, specialty: e.target.value })}
                    placeholder="e.g. Pediatrics & Neonatology"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={doctorForm.category}
                    onChange={(e) => setDoctorForm({ ...doctorForm, category: e.target.value })}
                    required
                  >
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="General Medicine">General Medicine</option>
                    <option value="Gynecology">Gynecology</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Anesthesia">Anesthesia</option>
                    <option value="General Surgery">General Surgery</option>
                    <option value="Visiting Specialists">Visiting Specialists</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Experience</label>
                  <input 
                    type="text" 
                    value={doctorForm.experience}
                    onChange={(e) => setDoctorForm({ ...doctorForm, experience: e.target.value })}
                    placeholder="e.g. 10+ Years"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Consultation Timings</label>
                  <input 
                    type="text" 
                    value={doctorForm.timings}
                    onChange={(e) => setDoctorForm({ ...doctorForm, timings: e.target.value })}
                    placeholder="e.g. 10:00 AM - 1:00 PM"
                    required
                  />
                </div>
              </div>

              <div className="form-row" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
                <div className="form-group">
                  <label>Profile Status</label>
                  <select
                    value={doctorForm.status}
                    onChange={(e) => setDoctorForm({ ...doctorForm, status: e.target.value })}
                    required
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Availability</label>
                  <select
                    value={doctorForm.availability}
                    onChange={(e) => setDoctorForm({ ...doctorForm, availability: e.target.value })}
                    required
                  >
                    <option value="In Hospital">In Hospital</option>
                    <option value="Out of Hospital">Out of Hospital</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Sort Order</label>
                  <input 
                    type="number" 
                    value={doctorForm.sort_order}
                    onChange={(e) => setDoctorForm({ ...doctorForm, sort_order: parseInt(e.target.value, 10) || 0 })}
                    placeholder="e.g. 10"
                    required
                    min="0"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Photo Input Type</label>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                  <button 
                    type="button"
                    onClick={() => setPhotoInputType('upload')}
                    style={{
                      flex: 1,
                      height: '38px',
                      borderRadius: 'var(--radius-sm)',
                      border: photoInputType === 'upload' ? '2.5px solid var(--primary)' : '1px solid var(--border-color)',
                      backgroundColor: photoInputType === 'upload' ? 'var(--primary-glow)' : 'var(--bg-light)',
                      color: photoInputType === 'upload' ? 'var(--primary)' : 'var(--text-medium)',
                      fontWeight: '700',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      transition: 'var(--transition-fast)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <span>Upload Image File</span>
                  </button>
                  <button 
                    type="button"
                    onClick={() => setPhotoInputType('url')}
                    style={{
                      flex: 1,
                      height: '38px',
                      borderRadius: 'var(--radius-sm)',
                      border: photoInputType === 'url' ? '2.5px solid var(--primary)' : '1px solid var(--border-color)',
                      backgroundColor: photoInputType === 'url' ? 'var(--primary-glow)' : 'var(--bg-light)',
                      color: photoInputType === 'url' ? 'var(--primary)' : 'var(--text-medium)',
                      fontWeight: '700',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      transition: 'var(--transition-fast)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <span>Image Path / URL</span>
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: 'var(--bg-light)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  {doctorForm.image_url && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--bg-white)', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                      <img src={doctorForm.image_url} alt="Preview" style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '50%', border: '1px solid var(--border-color)' }} />
                      <div style={{ flexGrow: 1, fontSize: '0.85rem', color: 'var(--text-medium)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        <strong>Active:</strong> {doctorForm.image_url}
                      </div>
                      <button 
                        type="button" 
                        onClick={() => setDoctorForm({ ...doctorForm, image_url: '' })} 
                        style={{ border: 'none', background: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem' }}
                      >
                        Clear
                      </button>
                    </div>
                  )}

                  {photoInputType === 'upload' ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '0.75rem', color: 'var(--text-medium)', textTransform: 'none', fontWeight: '600', letterSpacing: 'normal' }}>
                        Select local image to upload:
                      </label>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <div style={{ position: 'relative', overflow: 'hidden', display: 'inline-block' }}>
                          <button type="button" className="btn btn-outline" style={{ height: '40px', padding: '0 16px', fontSize: '0.85rem', margin: 0, fontWeight: '700' }}>
                            Choose Photo File
                          </button>
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handlePhotoUpload} 
                            style={{ position: 'absolute', top: 0, left: 0, opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }} 
                          />
                        </div>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-light)', fontWeight: '500' }}>
                          {uploadingPhoto ? 'Uploading photo...' : 'No file chosen'}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '0.75rem', color: 'var(--text-medium)', textTransform: 'none', fontWeight: '600', letterSpacing: 'normal' }}>
                        PHOTO IMAGE PATH / URL
                      </label>
                      <input 
                        type="text" 
                        value={doctorForm.image_url}
                        onChange={(e) => setDoctorForm({ ...doctorForm, image_url: e.target.value })}
                        placeholder="e.g. /doctor_doe.jpg or https://example.com/photo.jpg"
                        style={{ height: '40px', fontSize: '0.9rem', backgroundColor: 'var(--bg-white)', width: '100%' }}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>Expertise Biography</label>
                <textarea 
                  rows="4"
                  value={doctorForm.bio}
                  onChange={(e) => setDoctorForm({ ...doctorForm, bio: e.target.value })}
                  placeholder="Tell us about the doctor's experience, specialization details..."
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary btn-save-modal">
                {isCreateMode ? 'Add Doctor Profile' : 'Save Doctor details'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Admin Settings */}
      {showPasswordModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-container glass-panel animate-fade-in">
            <div className="admin-modal-header">
              <h3>Admin Settings</h3>
              <button onClick={() => setShowPasswordModal(false)} className="close-modal-btn">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handlePasswordChangeSubmit} className="admin-modal-form">
              <div className="form-group">
                <label>Current Password (required to verify)</label>
                <input 
                  type="password" 
                  placeholder="Enter current password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>New Username (leave blank if unchanged)</label>
                <input 
                  type="text" 
                  placeholder="Enter new username"
                  value={passwordForm.newUsername || ''}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newUsername: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>New Password (leave blank if unchanged)</label>
                <input 
                  type="password" 
                  placeholder="Enter new password"
                  value={passwordForm.newPassword || ''}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                />
              </div>

              {passwordError && (
                <div className="modal-error-alert animate-fade-in">
                  <span>{passwordError}</span>
                </div>
              )}

              {passwordSuccess && (
                <div className="modal-success-alert animate-fade-in">
                  <span>{passwordSuccess}</span>
                </div>
              )}

              <button type="submit" className="btn btn-primary btn-save-modal">
                Update Settings
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: Add/Edit Patient Testimonial */}
      {showTestimonialModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-container glass-panel animate-fade-in" style={{ maxWidth: '450px' }}>
            <div className="admin-modal-header">
              <h3>{isTestimonialCreate ? 'Add Testimonial' : 'Edit Testimonial'}</h3>
              <button onClick={() => setShowTestimonialModal(false)} className="close-modal-btn">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleTestimonialFormSubmit} className="admin-modal-form" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div className="form-group">
                <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-medium)', textTransform: 'uppercase' }}>Patient Name</label>
                <input 
                  type="text" 
                  name="patient_name"
                  value={testimonialForm.patient_name}
                  onChange={handleTestimonialFormChange}
                  placeholder="e.g. Ravi Kumar"
                  required
                />
              </div>

              <div className="form-group">
                <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-medium)', textTransform: 'uppercase' }}>Location / City</label>
                <input 
                  type="text" 
                  name="location"
                  value={testimonialForm.location}
                  onChange={handleTestimonialFormChange}
                  placeholder="e.g. Palakollu"
                  required
                />
              </div>

              <div className="form-group">
                <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-medium)', textTransform: 'uppercase' }}>Star Rating</label>
                <select 
                  name="rating"
                  value={testimonialForm.rating}
                  onChange={handleTestimonialFormChange}
                  required
                >
                  <option value={5}>5 Stars (Excellent)</option>
                  <option value={4}>4 Stars (Good)</option>
                  <option value={3}>3 Stars (Average)</option>
                  <option value={2}>2 Stars (Poor)</option>
                  <option value={1}>1 Star (Terrible)</option>
                </select>
              </div>

              <div className="form-group">
                <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-medium)', textTransform: 'uppercase' }}>Review Comment</label>
                <textarea 
                  name="comment"
                  value={testimonialForm.comment}
                  onChange={handleTestimonialFormChange}
                  placeholder="Share the patient's experience..."
                  required
                  style={{ minHeight: '100px', resize: 'vertical' }}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-save-modal" style={{ height: '44px', marginTop: '10px' }}>
                {isTestimonialCreate ? 'Save Testimonial' : 'Update Testimonial'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: Add/Edit Home Banner */}
      {showBannerModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-container glass-panel animate-fade-in" style={{ maxWidth: '500px' }}>
            <div className="admin-modal-header">
              <h3>{isBannerCreate ? 'Add Home Banner' : 'Edit Home Banner'}</h3>
              <button onClick={() => setShowBannerModal(false)} className="close-modal-btn">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleBannerFormSubmit} className="admin-modal-form" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div className="form-group">
                <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-medium)', textTransform: 'uppercase' }}>Main Title</label>
                <input 
                  type="text" 
                  value={bannerForm.title}
                  onChange={(e) => setBannerForm({ ...bannerForm, title: e.target.value })}
                  placeholder="e.g. Your Health, Our Responsiblity"
                  required
                />
              </div>

              <div className="form-group">
                <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-medium)', textTransform: 'uppercase' }}>Subtitle / Header Tag</label>
                <input 
                  type="text" 
                  value={bannerForm.subtitle}
                  onChange={(e) => setBannerForm({ ...bannerForm, subtitle: e.target.value })}
                  placeholder="e.g. New Life Emergency & Super Specialty Hospital"
                  required
                />
              </div>

              <div className="form-group">
                <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-medium)', textTransform: 'uppercase' }}>Description Paragraph</label>
                <textarea 
                  value={bannerForm.description}
                  onChange={(e) => setBannerForm({ ...bannerForm, description: e.target.value })}
                  placeholder="Explain services, hours, or welcome message..."
                  required
                  style={{ minHeight: '80px', resize: 'vertical' }}
                />
              </div>

              <div className="form-group">
                <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-medium)', textTransform: 'uppercase' }}>CTA Button Label</label>
                <input 
                  type="text" 
                  value={bannerForm.cta}
                  onChange={(e) => setBannerForm({ ...bannerForm, cta: e.target.value })}
                  placeholder="e.g. Meet Our Team"
                  required
                />
              </div>

              {/* Photo Choice Option Picker (File Upload or Image URL) */}
              <div className="form-group">
                <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-medium)', textTransform: 'uppercase' }}>Banner Slide Photo</label>
                
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                  <button 
                    type="button"
                    onClick={() => setPhotoInputType('upload')}
                    style={{
                      flex: 1,
                      height: '38px',
                      borderRadius: 'var(--radius-sm)',
                      border: photoInputType === 'upload' ? '2.5px solid var(--primary)' : '1px solid var(--border-color)',
                      backgroundColor: photoInputType === 'upload' ? 'var(--primary-glow)' : 'var(--bg-light)',
                      color: photoInputType === 'upload' ? 'var(--primary)' : 'var(--text-medium)',
                      fontWeight: '700',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      transition: 'var(--transition-fast)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <span>Upload Image File</span>
                  </button>
                  <button 
                    type="button"
                    onClick={() => setPhotoInputType('url')}
                    style={{
                      flex: 1,
                      height: '38px',
                      borderRadius: 'var(--radius-sm)',
                      border: photoInputType === 'url' ? '2.5px solid var(--primary)' : '1px solid var(--border-color)',
                      backgroundColor: photoInputType === 'url' ? 'var(--primary-glow)' : 'var(--bg-light)',
                      color: photoInputType === 'url' ? 'var(--primary)' : 'var(--text-medium)',
                      fontWeight: '700',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      transition: 'var(--transition-fast)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <span>Image Path / URL</span>
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: 'var(--bg-light)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  {bannerForm.image_url && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--bg-white)', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                      <img src={bannerForm.image_url} alt="Preview" style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--border-color)' }} />
                      <div style={{ flexGrow: 1, fontSize: '0.85rem', color: 'var(--text-medium)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        <strong>Active:</strong> {bannerForm.image_url}
                      </div>
                      <button 
                        type="button" 
                        onClick={() => setBannerForm({ ...bannerForm, image_url: '' })} 
                        style={{ border: 'none', background: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem' }}
                      >
                        Clear
                      </button>
                    </div>
                  )}

                  {photoInputType === 'upload' ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '0.75rem', color: 'var(--text-medium)', textTransform: 'none', fontWeight: '600', letterSpacing: 'normal' }}>
                        Select local image to upload:
                      </label>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <div style={{ position: 'relative', overflow: 'hidden', display: 'inline-block' }}>
                          <button type="button" className="btn btn-outline" style={{ height: '40px', padding: '0 16px', fontSize: '0.85rem', margin: 0, fontWeight: '700' }}>
                            Choose Photo File
                          </button>
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleBannerPhotoUpload} 
                            style={{ position: 'absolute', top: 0, left: 0, opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }} 
                          />
                        </div>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-light)', fontWeight: '500' }}>
                          {uploadingPhoto ? 'Uploading photo...' : 'No file chosen'}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '0.75rem', color: 'var(--text-medium)', textTransform: 'none', fontWeight: '600', letterSpacing: 'normal' }}>
                        PHOTO IMAGE PATH / URL
                      </label>
                      <input 
                        type="text" 
                        value={bannerForm.image_url}
                        onChange={(e) => setBannerForm({ ...bannerForm, image_url: e.target.value })}
                        placeholder="e.g. /hero_caring_doctors.png or https://example.com/photo.jpg"
                        style={{ height: '40px', fontSize: '0.9rem', backgroundColor: 'var(--bg-white)', width: '100%' }}
                      />
                    </div>
                  )}
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-save-modal" style={{ height: '44px', marginTop: '10px' }}>
                {isBannerCreate ? 'Save Home Banner' : 'Update Home Banner'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 5: Add/Edit Specialty Service details */}
      {showServiceModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-container glass-panel animate-fade-in" style={{ maxWidth: '650px' }}>
            <div className="admin-modal-header">
              <h3>{isServiceCreate ? 'Add Specialty Service' : 'Edit Specialty Service'}</h3>
              <button onClick={() => { setShowServiceModal(false); setEditingService(null); }} className="close-modal-btn">
                <X size={24} />
              </button>
            </div>

            {/* Modal Sub-Tabs Navigation for complex structure */}
            <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', marginBottom: '20px', gap: '4px' }}>
              {['basic', 'lists', 'marketing', 'faqs'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setServiceModalTab(tab)}
                  style={{
                    padding: '8px 16px',
                    background: 'none',
                    border: 'none',
                    borderBottom: serviceModalTab === tab ? '3px solid var(--primary)' : '3px solid transparent',
                    color: serviceModalTab === tab ? 'var(--primary)' : 'var(--text-medium)',
                    fontWeight: '700',
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'var(--transition-fast)'
                  }}
                >
                  {tab === 'basic' ? 'Basic Info' : tab === 'lists' ? 'Procedures & Facilities' : tab === 'marketing' ? 'Stats & Reasons' : 'FAQs'}
                </button>
              ))}
            </div>
            
            <form onSubmit={handleServiceFormSubmit} className="admin-modal-form">
              {/* SUBTAB 1: Basic Info */}
              {serviceModalTab === 'basic' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div className="form-group">
                    <label>Specialty Name</label>
                    <input 
                      type="text" 
                      value={serviceForm.name}
                      onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                      placeholder="e.g. Pediatrics & Neonatology"
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Tagline</label>
                      <input 
                        type="text" 
                        value={serviceForm.tagline}
                        onChange={(e) => setServiceForm({ ...serviceForm, tagline: e.target.value })}
                        placeholder="e.g. Dedicated critical care..."
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Specialist Doctor Category</label>
                      <input 
                        type="text" 
                        value={serviceForm.specialist_category}
                        onChange={(e) => setServiceForm({ ...serviceForm, specialist_category: e.target.value })}
                        placeholder="e.g. Pediatrics"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row" style={{ gridTemplateColumns: '1.2fr 1fr' }}>
                    <div className="form-group">
                      <label>Lucide Icon Name</label>
                      <select 
                        value={serviceForm.icon_name}
                        onChange={(e) => setServiceForm({ ...serviceForm, icon_name: e.target.value })}
                        required
                      >
                        <option value="Heart">Heart</option>
                        <option value="Award">Award</option>
                        <option value="ShieldCheck">ShieldCheck</option>
                        <option value="Activity">Activity</option>
                        <option value="Sparkles">Sparkles</option>
                        <option value="Phone">Phone</option>
                        <option value="Brain">Brain</option>
                        <option value="Dna">Dna</option>
                        <option value="Stethoscope">Stethoscope</option>
                      </select>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '1.2rem', padding: '10px', backgroundColor: 'var(--bg-light)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', height: '44px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-light)' }}>Preview:</span>
                      <span style={{ color: 'var(--primary)' }}>{getIconComponent(serviceForm.icon_name, 22)}</span>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--secondary)' }}>{serviceForm.icon_name}</span>
                    </div>
                  </div>

                  {/* Photo Input Picker */}
                  <div className="form-group">
                    <label>Service Cover Photo</label>
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                      <button 
                        type="button"
                        onClick={() => setPhotoInputType('upload')}
                        style={{
                          flex: 1,
                          height: '38px',
                          borderRadius: 'var(--radius-sm)',
                          border: photoInputType === 'upload' ? '2.5px solid var(--primary)' : '1px solid var(--border-color)',
                          backgroundColor: photoInputType === 'upload' ? 'var(--primary-glow)' : 'var(--bg-light)',
                          color: photoInputType === 'upload' ? 'var(--primary)' : 'var(--text-medium)',
                          fontWeight: '700',
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <span>Upload Photo File</span>
                      </button>
                      <button 
                        type="button"
                        onClick={() => setPhotoInputType('url')}
                        style={{
                          flex: 1,
                          height: '38px',
                          borderRadius: 'var(--radius-sm)',
                          border: photoInputType === 'url' ? '2.5px solid var(--primary)' : '1px solid var(--border-color)',
                          backgroundColor: photoInputType === 'url' ? 'var(--primary-glow)' : 'var(--bg-light)',
                          color: photoInputType === 'url' ? 'var(--primary)' : 'var(--text-medium)',
                          fontWeight: '700',
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <span>Image Path / URL</span>
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: 'var(--bg-light)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                      {serviceForm.image_url && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--bg-white)', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                          <img src={serviceForm.image_url} alt="Preview" style={{ width: '56px', height: '36px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
                          <div style={{ flexGrow: 1, fontSize: '0.85rem', color: 'var(--text-medium)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            <strong>Active:</strong> {serviceForm.image_url}
                          </div>
                          <button 
                            type="button" 
                            onClick={() => setServiceForm({ ...serviceForm, image_url: '' })} 
                            style={{ border: 'none', background: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem' }}
                          >
                            Clear
                          </button>
                        </div>
                      )}

                      {photoInputType === 'upload' ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <label style={{ fontSize: '0.75rem', color: 'var(--text-medium)', textTransform: 'none', fontWeight: '600', letterSpacing: 'normal' }}>
                            Select local image to upload:
                          </label>
                          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <div style={{ position: 'relative', overflow: 'hidden', display: 'inline-block' }}>
                              <button type="button" className="btn btn-outline" style={{ height: '40px', padding: '0 16px', fontSize: '0.85rem', margin: 0, fontWeight: '700' }}>
                                Choose Photo File
                              </button>
                              <input 
                                type="file" 
                                accept="image/*" 
                                onChange={handleServicePhotoUpload} 
                                style={{ position: 'absolute', top: 0, left: 0, opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }} 
                              />
                            </div>
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-light)', fontWeight: '500' }}>
                              {uploadingPhoto ? 'Uploading photo...' : 'No file chosen'}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <label style={{ fontSize: '0.75rem', color: 'var(--text-medium)', textTransform: 'none', fontWeight: '600', letterSpacing: 'normal' }}>
                            PHOTO IMAGE PATH / URL
                          </label>
                          <input 
                            type="text" 
                            value={serviceForm.image_url}
                            onChange={(e) => setServiceForm({ ...serviceForm, image_url: e.target.value })}
                            placeholder="e.g. /service_gynecology.png or https://example.com/photo.jpg"
                            style={{ height: '40px', fontSize: '0.9rem', backgroundColor: 'var(--bg-white)', width: '100%' }}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Short Description (Card Summary)</label>
                    <textarea 
                      rows="2"
                      value={serviceForm.short_desc}
                      onChange={(e) => setServiceForm({ ...serviceForm, short_desc: e.target.value })}
                      placeholder="Brief summary showing in public grid card..."
                      required
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label>Detailed Description</label>
                    <textarea 
                      rows="4"
                      value={serviceForm.details}
                      onChange={(e) => setServiceForm({ ...serviceForm, details: e.target.value })}
                      placeholder="Full overview details showing in service page..."
                      required
                    ></textarea>
                  </div>
                </div>
              )}

              {/* SUBTAB 2: Procedures, Facilities & Equipments */}
              {serviceModalTab === 'lists' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxHeight: '420px', overflowY: 'auto', paddingRight: '6px' }}>
                  
                  {/* Conditions List */}
                  <div style={{ border: '1px solid var(--border-color)', padding: '15px', borderRadius: 'var(--radius-md)' }}>
                    <h4 style={{ margin: '0 0 10px 0', fontSize: '0.9rem', fontWeight: 800, color: 'var(--secondary)' }}>Procedures & Care List</h4>
                    {serviceForm.conditions.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                        <input 
                          type="text" 
                          value={item}
                          onChange={(e) => {
                            const newList = [...serviceForm.conditions];
                            newList[idx] = e.target.value;
                            setServiceForm({ ...serviceForm, conditions: newList });
                          }}
                          placeholder="e.g. High-Risk Pregnancies"
                          required
                        />
                        <button 
                          type="button" 
                          onClick={() => {
                            const newList = serviceForm.conditions.filter((_, i) => i !== idx);
                            setServiceForm({ ...serviceForm, conditions: newList });
                          }}
                          className="btn-action-small cancel"
                          style={{ height: '44px', width: '44px', flexShrink: 0 }}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                    <button 
                      type="button" 
                      onClick={() => setServiceForm({ ...serviceForm, conditions: [...serviceForm.conditions, ''] })}
                      className="btn btn-outline"
                      style={{ height: '34px', fontSize: '0.8rem', padding: '0 12px', width: 'auto', marginTop: '4px' }}
                    >
                      + Add Procedure
                    </button>
                  </div>

                  {/* Facilities List */}
                  <div style={{ border: '1px solid var(--border-color)', padding: '15px', borderRadius: 'var(--radius-md)' }}>
                    <h4 style={{ margin: '0 0 10px 0', fontSize: '0.9rem', fontWeight: 800, color: 'var(--secondary)' }}>Facilities & Infrastructure</h4>
                    {serviceForm.facilities.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                        <input 
                          type="text" 
                          value={item}
                          onChange={(e) => {
                            const newList = [...serviceForm.facilities];
                            newList[idx] = e.target.value;
                            setServiceForm({ ...serviceForm, facilities: newList });
                          }}
                          placeholder="e.g. 4D Fetal Ultrasound Scans"
                          required
                        />
                        <button 
                          type="button" 
                          onClick={() => {
                            const newList = serviceForm.facilities.filter((_, i) => i !== idx);
                            setServiceForm({ ...serviceForm, facilities: newList });
                          }}
                          className="btn-action-small cancel"
                          style={{ height: '44px', width: '44px', flexShrink: 0 }}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                    <button 
                      type="button" 
                      onClick={() => setServiceForm({ ...serviceForm, facilities: [...serviceForm.facilities, ''] })}
                      className="btn btn-outline"
                      style={{ height: '34px', fontSize: '0.8rem', padding: '0 12px', width: 'auto', marginTop: '4px' }}
                    >
                      + Add Facility
                    </button>
                  </div>

                  {/* Equipments List */}
                  <div style={{ border: '1px solid var(--border-color)', padding: '15px', borderRadius: 'var(--radius-md)' }}>
                    <h4 style={{ margin: '0 0 10px 0', fontSize: '0.9rem', fontWeight: 800, color: 'var(--secondary)' }}>Advanced Equipment & Technologies</h4>
                    {serviceForm.equipments.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                        <input 
                          type="text" 
                          value={item}
                          onChange={(e) => {
                            const newList = [...serviceForm.equipments];
                            newList[idx] = e.target.value;
                            setServiceForm({ ...serviceForm, equipments: newList });
                          }}
                          placeholder="e.g. GE Voluson 4D Ultrasound Machine"
                          required
                        />
                        <button 
                          type="button" 
                          onClick={() => {
                            const newList = serviceForm.equipments.filter((_, i) => i !== idx);
                            setServiceForm({ ...serviceForm, equipments: newList });
                          }}
                          className="btn-action-small cancel"
                          style={{ height: '44px', width: '44px', flexShrink: 0 }}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                    <button 
                      type="button" 
                      onClick={() => setServiceForm({ ...serviceForm, equipments: [...serviceForm.equipments, ''] })}
                      className="btn btn-outline"
                      style={{ height: '34px', fontSize: '0.8rem', padding: '0 12px', width: 'auto', marginTop: '4px' }}
                    >
                      + Add Technology
                    </button>
                  </div>

                </div>
              )}

              {/* SUBTAB 3: Stats & Why Choose Us */}
              {serviceModalTab === 'marketing' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxHeight: '420px', overflowY: 'auto', paddingRight: '6px' }}>
                  
                  {/* Stats list */}
                  <div style={{ border: '1px solid var(--border-color)', padding: '15px', borderRadius: 'var(--radius-md)' }}>
                    <h4 style={{ margin: '0 0 10px 0', fontSize: '0.9rem', fontWeight: 800, color: 'var(--secondary)' }}>Specialty Key Stats</h4>
                    {serviceForm.stats.map((stat, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
                        <input 
                          type="text" 
                          value={stat.value} 
                          onChange={(e) => {
                            const newStats = [...serviceForm.stats];
                            newStats[idx] = { ...newStats[idx], value: e.target.value };
                            setServiceForm({ ...serviceForm, stats: newStats });
                          }}
                          placeholder="Value (e.g. 10,000+)"
                          required
                          style={{ flex: 1 }}
                        />
                        <input 
                          type="text" 
                          value={stat.label} 
                          onChange={(e) => {
                            const newStats = [...serviceForm.stats];
                            newStats[idx] = { ...newStats[idx], label: e.target.value };
                            setServiceForm({ ...serviceForm, stats: newStats });
                          }}
                          placeholder="Label (e.g. Deliveries)"
                          required
                          style={{ flex: 2 }}
                        />
                        <button 
                          type="button" 
                          onClick={() => {
                            const newStats = serviceForm.stats.filter((_, i) => i !== idx);
                            setServiceForm({ ...serviceForm, stats: newStats });
                          }}
                          className="btn-action-small cancel"
                          style={{ height: '44px', width: '44px', flexShrink: 0 }}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                    <button 
                      type="button" 
                      onClick={() => setServiceForm({ ...serviceForm, stats: [...serviceForm.stats, { value: '', label: '' }] })}
                      className="btn btn-outline"
                      style={{ height: '34px', fontSize: '0.8rem', padding: '0 12px', width: 'auto', marginTop: '4px' }}
                    >
                      + Add Stat Card
                    </button>
                  </div>

                  {/* Why Choose Us reasons */}
                  <div style={{ border: '1px solid var(--border-color)', padding: '15px', borderRadius: 'var(--radius-md)' }}>
                    <h4 style={{ margin: '0 0 10px 0', fontSize: '0.9rem', fontWeight: 800, color: 'var(--secondary)' }}>Why Choose Us reasons</h4>
                    {serviceForm.why_choose_us.map((item, idx) => (
                      <div key={idx} style={{ border: '1px solid var(--border-color)', padding: '14px', borderRadius: '4px', marginBottom: '12px', display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: 'var(--bg-light)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-medium)' }}>Reason #{idx + 1}</span>
                          <button 
                            type="button" 
                            onClick={() => {
                              const newItems = serviceForm.why_choose_us.filter((_, i) => i !== idx);
                              setServiceForm({ ...serviceForm, why_choose_us: newItems });
                            }}
                            style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                          >
                            <X size={14} /> Remove
                          </button>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '10px' }}>
                          <div className="form-group" style={{ margin: 0 }}>
                            <label style={{ fontSize: '0.7rem' }}>Title</label>
                            <input 
                              type="text" 
                              value={item.title} 
                              onChange={(e) => {
                                const newItems = [...serviceForm.why_choose_us];
                                newItems[idx] = { ...newItems[idx], title: e.target.value };
                                setServiceForm({ ...serviceForm, why_choose_us: newItems });
                              }}
                              placeholder="e.g. Maternal Comfort"
                              required
                              style={{ height: '38px', fontSize: '0.85rem' }}
                            />
                          </div>
                          <div className="form-group" style={{ margin: 0 }}>
                            <label style={{ fontSize: '0.7rem' }}>Icon</label>
                            <select 
                              value={item.icon} 
                              onChange={(e) => {
                                const newItems = [...serviceForm.why_choose_us];
                                newItems[idx] = { ...newItems[idx], icon: e.target.value };
                                setServiceForm({ ...serviceForm, why_choose_us: newItems });
                              }}
                              style={{ height: '38px', fontSize: '0.85rem' }}
                            >
                              <option value="Heart">Heart</option>
                              <option value="Award">Award</option>
                              <option value="ShieldCheck">ShieldCheck</option>
                              <option value="Activity">Activity</option>
                              <option value="Sparkles">Sparkles</option>
                              <option value="Phone">Phone</option>
                              <option value="Brain">Brain</option>
                              <option value="Dna">Dna</option>
                              <option value="Stethoscope">Stethoscope</option>
                            </select>
                          </div>
                        </div>
                        <div className="form-group" style={{ margin: 0 }}>
                          <label style={{ fontSize: '0.7rem' }}>Reason Description</label>
                          <textarea 
                            rows="2"
                            value={item.text} 
                            onChange={(e) => {
                              const newItems = [...serviceForm.why_choose_us];
                              newItems[idx] = { ...newItems[idx], text: e.target.value };
                              setServiceForm({ ...serviceForm, why_choose_us: newItems });
                            }}
                            placeholder="Description details..."
                            required
                            style={{ fontSize: '0.85rem', padding: '6px 10px' }}
                          />
                        </div>
                      </div>
                    ))}
                    <button 
                      type="button" 
                      onClick={() => setServiceForm({ ...serviceForm, why_choose_us: [...serviceForm.why_choose_us, { title: '', text: '', icon: 'ShieldCheck' }] })}
                      className="btn btn-outline"
                      style={{ height: '34px', fontSize: '0.8rem', padding: '0 12px', width: 'auto', marginTop: '4px' }}
                    >
                      + Add Reason
                    </button>
                  </div>

                </div>
              )}

              {/* SUBTAB 4: FAQs */}
              {serviceModalTab === 'faqs' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxHeight: '420px', overflowY: 'auto', paddingRight: '6px' }}>
                  {serviceForm.faqs.map((faq, idx) => (
                    <div key={idx} style={{ border: '1px solid var(--border-color)', padding: '14px', borderRadius: '4px', marginBottom: '12px', display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: 'var(--bg-light)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-medium)' }}>FAQ #{idx + 1}</span>
                        <button 
                          type="button" 
                          onClick={() => {
                            const newFaqs = serviceForm.faqs.filter((_, i) => i !== idx);
                            setServiceForm({ ...serviceForm, faqs: newFaqs });
                          }}
                          style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                        >
                          <X size={14} /> Remove
                        </button>
                      </div>
                      <div className="form-group" style={{ margin: 0 }}>
                        <label style={{ fontSize: '0.7rem' }}>Question</label>
                        <input 
                          type="text" 
                          value={faq.q} 
                          onChange={(e) => {
                            const newFaqs = [...serviceForm.faqs];
                            newFaqs[idx] = { ...newFaqs[idx], q: e.target.value };
                            setServiceForm({ ...serviceForm, faqs: newFaqs });
                          }}
                          placeholder="e.g. What constitutes a high-risk pregnancy?"
                          required
                          style={{ height: '38px', fontSize: '0.85rem' }}
                        />
                      </div>
                      <div className="form-group" style={{ margin: 0 }}>
                        <label style={{ fontSize: '0.7rem' }}>Answer Text</label>
                        <textarea 
                          rows="3"
                          value={faq.a} 
                          onChange={(e) => {
                            const newFaqs = [...serviceForm.faqs];
                            newFaqs[idx] = { ...newFaqs[idx], a: e.target.value };
                            setServiceForm({ ...serviceForm, faqs: newFaqs });
                          }}
                          placeholder="FAQ details answer..."
                          required
                          style={{ fontSize: '0.85rem', padding: '6px 10px' }}
                        />
                      </div>
                    </div>
                  ))}
                  <button 
                    type="button" 
                    onClick={() => setServiceForm({ ...serviceForm, faqs: [...serviceForm.faqs, { q: '', a: '' }] })}
                    className="btn btn-outline"
                    style={{ height: '34px', fontSize: '0.8rem', padding: '0 12px', width: 'auto', alignSelf: 'flex-start' }}
                  >
                    + Add FAQ Item
                  </button>
                </div>
              )}

              <button type="submit" className="btn btn-primary btn-save-modal" style={{ height: '48px', marginTop: '1.5rem' }}>
                {isServiceCreate ? 'Save Clinical Service' : 'Save Service changes'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
    </>
  );
}
