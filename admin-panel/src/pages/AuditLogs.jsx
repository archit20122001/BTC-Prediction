import { useState } from 'react';
import { auditLogs } from '../data/mockData';

export default function AuditLogs() {
  const [actionFilter, setActionFilter] = useState('all');
  const filtered = auditLogs.filter(l => actionFilter === 'all' || l.action === actionFilter);

  const actionColors = {
    PoolSettled: '#10b981', RewardDistributed: '#3b82f6', PoolLocked: '#f59e0b',
    WithdrawalExecuted: '#8b5cf6', TradePlaced: '#06b6d4', UserSuspended: '#ef4444',
    ReferralPaid: '#3b82f6', RewardClaimed: '#10b981',
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Audit Logs</h1>
          <p className="page-subtitle">Complete audit trail — every financial event is traceable</p>
        </div>
        <button className="btn btn-outline btn-sm"><i className="fas fa-download" style={{ marginRight: 6 }}></i>Export Logs</button>
      </div>

      <div className="card">
        <div className="card-body" style={{ paddingBottom: 0 }}>
          <div className="filter-bar">
            <select value={actionFilter} onChange={e => setActionFilter(e.target.value)}>
              <option value="all">All Actions</option>
              {[...new Set(auditLogs.map(l => l.action))].map(a => <option key={a} value={a}>{a}</option>)}
            </select>
            <input type="text" placeholder="Search by reference ID..." />
            <input type="date" />
          </div>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr><th>Log ID</th><th>Action</th><th>Reference</th><th>User</th><th>Time</th><th>Description</th></tr>
            </thead>
            <tbody>
              {filtered.map((l, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600, color: '#64748b' }}>{l.id}</td>
                  <td><span style={{ color: actionColors[l.action] || '#f1f5f9', fontWeight: 600, fontSize: '0.82rem' }}>{l.action}</span></td>
                  <td style={{ color: '#f59e0b', fontWeight: 500 }}>{l.ref}</td>
                  <td>{l.user}</td>
                  <td style={{ color: '#64748b' }}>{l.time}</td>
                  <td style={{ color: '#94a3b8', maxWidth: 300 }}>{l.desc}</td>
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
              <button className="page-btn"><i className="fas fa-chevron-right"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
