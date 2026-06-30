import { useState } from 'react';
import { usersData } from '../data/mockData';

export default function UserManagement({ onOpenModal, onNavigate }) {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = usersData.filter(u => {
    if (filter !== 'all' && u.status.toLowerCase() !== filter) return false;
    if (search && !u.id.toLowerCase().includes(search.toLowerCase()) && !u.tgId.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  // Helper function to handle copying text
  const handleCopy = (text, e) => {
    e.stopPropagation(); // Prevents triggering row clicks if you add them later
    navigator.clipboard.writeText(text);
    // Optional: Add your own toast notification here
    // alert('Copied to clipboard!'); 
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h1 className="page-title">User Management</h1>
          <p className="page-subtitle">View, suspend, and manage platform users</p>
        </div>
        <button className="btn btn-outline btn-sm">
          <i className="fas fa-download" style={{ marginRight: 6 }}></i>Export CSV
        </button>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">All Users ({filtered.length})</span>
        </div>
        <div className="card-body" style={{ paddingBottom: 0 }}>
          <div className="filter-bar">
            <input
              type="text"
              placeholder="Search by ID or Telegram..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <select value={filter} onChange={e => setFilter(e.target.value)}>
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="frozen">Frozen</option>
            </select>
          </div>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Telegram</th>
                <th>Wallet</th>
                <th>Sponsor</th>
                <th>Deposit Bal</th>
                <th>Profit Bal</th>
                <th>Volume</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600, color: '#f59e0b' }}>{u.id}</td>
                  <td>{u.tgId}</td>

                  {/* UPDATED WALLET COLUMN */}
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="wallet-addr">{u.wallet}</span>
                      <button
                        className="btn-icon"
                        title="Copy Wallet Address"
                        onClick={(e) => handleCopy(u.wallet, e)}
                        style={{
                          padding: 0,
                          background: 'transparent',
                          border: 'none',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <i className="fa-slab-press fa-regular fa-copy" style={{ color: '#94a3b8', cursor: 'pointer', fontSize: '0.9em' }}></i>
                      </button>
                    </div>
                  </td>
                  <td style={{ color: '#94a3b8' }}>{u.sponsor}</td>
                  <td>{u.depositBal}</td>
                  <td>{u.profitBal}</td>
                  <td style={{ fontWeight: 600 }}>{u.volume}</td>
                  <td><span className={`status ${u.status.toLowerCase()}`}>{u.status}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <button className="btn-icon" title="View Details" onClick={e => { e.stopPropagation(); onNavigate?.('user-detail', u); }}>
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="btn-icon" title="Suspend" onClick={e => e.stopPropagation()}>
                        <i className="fas fa-ban"></i>
                      </button>
                      <button className="btn-icon" title="View Tree" onClick={e => { e.stopPropagation(); onOpenModal('referral-tree', u); }}>
                        <i className="fas fa-sitemap"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card-body">
          <div className="pagination">
            <span>Showing 1-{filtered.length} of {filtered.length}</span>
            <div className="pagination-btns">
              <button className="page-btn"><i className="fas fa-chevron-left"></i></button>
              <button className="page-btn active">1</button>
              <button className="page-btn">2</button>
              <button className="page-btn">3</button>
              <button className="page-btn"><i className="fas fa-chevron-right"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}