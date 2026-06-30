import { useState } from 'react';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import PoolManagement from './pages/PoolManagement';
import RewardPools from './pages/RewardPools';
import ReferralNetwork from './pages/ReferralNetwork';
import Settlements from './pages/Settlements';
import Withdrawals from './pages/Withdrawals';
import Reports from './pages/Reports';
import AuditLogs from './pages/AuditLogs';
import Security from './pages/Security';
import Settings from './pages/Settings';
import UserDetail from './pages/userDetail';
import Modal from './components/Modal';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'fa-chart-pie' },
  { id: 'users', label: 'User Management', icon: 'fa-users' },
  { id: 'pools', label: 'Pool Management', icon: 'fa-layer-group' },
  { id: 'rewards', label: 'Reward Pools', icon: 'fa-gift' },
  { id: 'referrals', label: 'Referral Network', icon: 'fa-sitemap' },
  { id: 'settlements', label: 'Settlements', icon: 'fa-file-invoice-dollar' },
  { id: 'withdrawals', label: 'Withdrawals', icon: 'fa-wallet' },
  { id: 'reports', label: 'Reports', icon: 'fa-chart-bar' },
  { id: 'audit', label: 'Audit Logs', icon: 'fa-shield-halved' },
  { id: 'security', label: 'Security', icon: 'fa-lock' },
  { id: 'settings', label: 'Settings', icon: 'fa-gear' },
];

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modal, setModal] = useState({ type: null, data: null });
  const [detailUser, setDetailUser] = useState(null);

  const openModal = (type, data) => setModal({ type, data });
  const closeModal = () => setModal({ type: null, data: null });

  const handleNavigate = (type, data) => {
    if (type === 'user-detail') {
      setDetailUser(data);
      setActivePage('user-detail');
    } else if (type === 'wallet-ledger') {
      setDetailUser(data);
      setActivePage('user-detail');
    }
  };

  const handleSidebarNav = (id) => {
    setActivePage(id);
    setSidebarOpen(false);
    setDetailUser(null);
  };

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <Dashboard />;
      case 'users': return <UserManagement onOpenModal={openModal} onNavigate={handleNavigate} />;
      case 'pools': return <PoolManagement onOpenModal={openModal} />;
      case 'rewards': return <RewardPools onOpenModal={openModal} />;
      case 'referrals': return <ReferralNetwork onOpenModal={openModal} />;
      case 'settlements': return <Settlements onOpenModal={openModal} />;
      case 'withdrawals': return <Withdrawals />;
      case 'reports': return <Reports />;
      case 'audit': return <AuditLogs />;
      case 'security': return <Security />;
      case 'settings': return <Settings />;
      case 'user-detail': return <UserDetail user={detailUser} />;
      default: return <Dashboard />;
    }
  };

  return (
    <>
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <div className="brand-icon"><i className="fa-brands fa-bitcoin"></i></div>
          <div>
            <span className="brand-name">BTC Predict</span>
            <span className="brand-sub">Admin Panel</span>
          </div>
        </div>
        <nav className="sidebar-nav">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${activePage === item.id ? 'active' : ''}`}
              onClick={() => handleSidebarNav(item.id)}
            >
              <i className={`fas ${item.icon}`}></i>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="admin-profile">
            <div className="admin-avatar">A</div>
            <div>
              <span className="admin-name">Admin</span>
              <span className="admin-role">Super Admin</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <i className="fas fa-bars"></i>
          </button>
          <div className="topbar-search">
            <i className="fas fa-search"></i>
            <input type="text" placeholder="Search users, pools, transactions..." />
          </div>
          <div className="topbar-actions">
            <button className="topbar-btn">
              <i className="fas fa-bell"></i>
              <span className="badge-dot"></span>
            </button>
            <button className="topbar-btn">
              <i className="fas fa-triangle-exclamation"></i>
              <span className="badge-dot"></span>
            </button>
            <div className="live-indicator"><span className="pulse"></span> Live</div>
          </div>
        </header>
        {renderPage()}
      </main>

      {modal.type && (
        <Modal
          type={modal.type}
          data={modal.data}
          onClose={closeModal}
          onNavigate={handleNavigate}
        />
      )}
    </>
  );
}
