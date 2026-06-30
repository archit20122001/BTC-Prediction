import { settlementsData } from '../data/mockData';

export default function Settlements({ onOpenModal }) {
  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Settlements</h1>
          <p className="page-subtitle">Automatic pool settlement records — 70% User / 20% Referral / 10% Platform</p>
        </div>
      </div>

      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {[
          { label: 'Settlements Today', value: '41', icon: 'fa-gavel', color: 'gold' },
          { label: 'User Rewards Paid', value: '$128,420', icon: 'fa-hand-holding-dollar', color: 'green' },
          { label: 'Referral Distributed', value: '$36,692', icon: 'fa-sitemap', color: 'blue' },
          { label: 'Platform Revenue', value: '$18,346', icon: 'fa-building-columns', color: 'purple' },
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
          <span className="card-title">Settlement Records</span>
          <div className="filter-bar" style={{ marginBottom: 0 }}>
            <select><option>Today</option><option>This Week</option><option>This Month</option></select>
          </div>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Settlement ID</th>
                <th>Pool</th>
                <th>Winner</th>
                <th>Losing Pool</th>
                <th>User Reward (70%)</th>
                <th>Referral (20%)</th>
                <th>Platform (10%)</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {settlementsData.map((s, i) => (
                <tr key={i} onClick={() => onOpenModal('settlement-detail', s)}>
                  <td style={{ fontWeight: 600, color: '#f59e0b' }}>{s.id}</td>
                  <td style={{ fontSize: '0.78rem' }}>{s.pool}</td>
                  <td><span className={`status ${s.winner.toLowerCase()}-side`}>{s.winner}</span></td>
                  <td style={{ fontWeight: 600 }}>{s.losingPool}</td>
                  <td style={{ color: '#10b981', fontWeight: 600 }}>{s.userReward}</td>
                  <td style={{ color: '#3b82f6' }}>{s.referral}</td>
                  <td style={{ color: '#8b5cf6' }}>{s.platform}</td>
                  <td style={{ color: '#64748b' }}>{s.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
