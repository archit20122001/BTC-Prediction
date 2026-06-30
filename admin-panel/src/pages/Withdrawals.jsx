import { useState } from 'react';
import { withdrawalsData } from '../data/mockData';

export default function Withdrawals() {
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = withdrawalsData.filter(w => {
    const matchesType = typeFilter === 'all' || w.type.toLowerCase() === typeFilter;
    const matchesStatus = statusFilter === 'all' || w.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesType && matchesStatus;
  });

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Withdrawals</h1>
          <p className="page-subtitle">Deposit wallet (0% fee) and Profit wallet (10% fee) withdrawals</p>
        </div>
      </div>

      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {[
          { label: 'Total Withdrawn', value: '$1.62M', icon: 'fa-arrow-right-from-bracket', color: 'gold' },
          { label: 'Pending', value: '$1,350', icon: 'fa-clock', color: 'blue' },
          { label: 'Charges Collected', value: '$162,000', icon: 'fa-percent', color: 'green' },
          { label: 'Failed (Retry Queue)', value: '$720', icon: 'fa-triangle-exclamation', color: 'red' },
        ].map((s, i) => (
          <div className={`stat-card ${s.color}`} key={i}>
            <div className={`stat-icon ${s.color}`}><i className={`fas ${s.icon}`}></i></div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">Withdrawal Records</span>
        </div>
        <div className="card-body" style={{ paddingBottom: 0 }}>
          <div className="filter-bar">
            <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
              <option value="all">All Types</option>
              <option value="deposit">Deposit Wallet</option>
              <option value="profit">Profit Wallet</option>
            </select>
            
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
              {/* NEW: Added Rejected option here */}
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr><th>WD ID</th><th>User</th><th>Wallet Type</th><th>Requested</th><th>Charge</th><th>Net Amount</th><th>Status</th><th>Date</th></tr>
            </thead>
            <tbody>
              {filtered.map((w, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600, color: '#f59e0b' }}>{w.id}</td>
                  <td>{w.user}</td>
                  <td><span className={`status ${w.type === 'Deposit' ? 'green-side' : 'purple'}`} style={w.type === 'Profit' ? { background: 'rgba(139,92,246,0.15)', color: '#8b5cf6' } : {}}>{w.type}</span></td>
                  <td style={{ fontWeight: 600 }}>{w.requested}</td>
                  <td style={{ color: w.charge === '$0' ? '#64748b' : '#ef4444' }}>{w.charge}</td>
                  <td style={{ fontWeight: 600, color: '#10b981' }}>{w.net}</td>
                  <td><span className={`status ${w.status.toLowerCase()}`}>{w.status}</span></td>
                  <td style={{ color: '#64748b' }}>{w.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}