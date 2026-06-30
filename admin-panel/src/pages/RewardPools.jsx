import { useState } from 'react';
import { rewardPoolsData, rewardMappings } from '../data/mockData';

export default function RewardPools({ onOpenModal }) {
  const [tab, setTab] = useState('overview');

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Reward Pool Management</h1>
          <p className="page-subtitle">Monitor 4 lifetime reward pools, balances, qualifications, and claims</p>
        </div>
      </div>

      <div className="tabs">
        <button className={`tab ${tab === 'overview' ? 'active' : ''}`} onClick={() => setTab('overview')}>Pool Overview</button>
        <button className={`tab ${tab === 'mappings' ? 'active' : ''}`} onClick={() => setTab('mappings')}>Reward Mappings</button>
        <button className={`tab ${tab === 'claims' ? 'active' : ''}`} onClick={() => setTab('claims')}>Claim Records</button>
      </div>

      {tab === 'overview' && (
        <>
          <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 24 }}>
            {rewardPoolsData.map((pool, i) => (
              <div className={`stat-card ${['gold', 'blue', 'purple', 'cyan'][i]}`} key={i} onClick={() => onOpenModal('reward-pool-detail', pool)}>
                <div className={`stat-icon ${['gold', 'blue', 'purple', 'cyan'][i]}`}>
                  <i className="fas fa-trophy"></i>
                </div>
                <div className="stat-label">{pool.id} — Qualification: {pool.qualification}</div>
                <div className="stat-value">{pool.balance}</div>
                <div style={{ marginTop: 8, fontSize: '0.78rem', color: '#94a3b8' }}>
                  {pool.qualified} qualified users · {pool.allocation} funding
                </div>
                <div className="progress-bar" style={{ marginTop: 10 }}>
                  <div className={`progress-fill ${['gold', 'gold', 'gold', 'gold'][i]}`} style={{ width: `${(parseInt(pool.claimed.replace(/[$,]/g, '')) / parseInt(pool.distributed.replace(/[$,]/g, ''))) * 100}%` }}></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: '0.72rem', color: '#64748b' }}>
                  <span>Claimed: {pool.claimed}</span>
                  <span>Distributed: {pool.distributed}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="card">
            <div className="card-header">
              <span className="card-title">Reward Pool Rules Summary</span>
            </div>
            <div className="card-body">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[
                  { rule: 'Funding Source', detail: '10% of Profit Wallet withdrawals' },
                  { rule: 'Pool 1 Allocation', detail: '40% of collected charge' },
                  { rule: 'Pool 2 Allocation', detail: '30% of collected charge' },
                  { rule: 'Pool 3 Allocation', detail: '20% of collected charge' },
                  { rule: 'Pool 4 Allocation', detail: '10% of collected charge' },
                  { rule: 'Qualification', detail: 'Self Volume + Direct Referral Volume' },
                  { rule: 'Claim Fee', detail: 'Free — No charges apply' },
                  { rule: 'Claim Destination', detail: 'Direct to connected wallet' },
                ].map((r, i) => (
                  <div className="detail-row" key={i}>
                    <span className="detail-label">{r.rule}</span>
                    <span className="detail-value">{r.detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {tab === 'mappings' && (
        <div className="card">
          <div className="card-header">
            <span className="card-title">Reward Mapping Records</span>
          </div>
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Mapping ID</th>
                  <th>User</th>
                  <th>Pool</th>
                  <th>Amount</th>
                  <th>Source WD</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {rewardMappings.map((m, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600, color: '#f59e0b' }}>{m.id}</td>
                    <td>{m.user}</td>
                    <td>{m.pool}</td>
                    <td style={{ fontWeight: 600 }}>{m.amount}</td>
                    <td style={{ color: '#94a3b8' }}>{m.source}</td>
                    <td style={{ color: '#64748b' }}>{m.date}</td>
                    <td><span className={`status ${m.status.toLowerCase()}`}>{m.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'claims' && (
        <div className="card">
          <div className="card-header">
            <span className="card-title">Claim Records</span>
          </div>
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr><th>Mapping ID</th><th>User</th><th>Pool</th><th>Amount</th><th>Claim Date</th><th>Destination</th><th>Status</th></tr>
              </thead>
              <tbody>
                {rewardMappings.filter(m => m.status === 'Claimed').map((m, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600, color: '#f59e0b' }}>{m.id}</td>
                    <td>{m.user}</td>
                    <td>{m.pool}</td>
                    <td style={{ fontWeight: 600 }}>{m.amount}</td>
                    <td>{m.date}</td>
                    <td><span className="wallet-addr">0x7a3B...4e2F</span></td>
                    <td><span className="status completed">Completed</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
