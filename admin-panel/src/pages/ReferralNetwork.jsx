import { usersData } from '../data/mockData';

const referralLevels = Array.from({ length: 20 }, (_, i) => ({
  level: i + 1,
  users: Math.max(0, Math.floor(Math.random() * 500) - i * 20),
  volume: `$${(Math.random() * 50000 + 1000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
  commission: `$${(Math.random() * 2000 + 50).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
  qualified: (i + 1) * 100 <= 15000,
  requiredVol: `$${((i + 1) * 100).toLocaleString()}`,
}));

export default function ReferralNetwork({ onOpenModal }) {
  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Referral Network</h1>
          <p className="page-subtitle">20-level referral structure — 1% per level from winning rewards</p>
        </div>
      </div>

      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {[
          { label: 'Total Referral Distributed', value: '$824,160', icon: 'fa-money-bill-transfer', color: 'gold' },
          { label: 'Qualified Levels Avg', value: '8.4', icon: 'fa-layer-group', color: 'green' },
          { label: 'Unqualified to Platform', value: '$198,420', icon: 'fa-building', color: 'purple' },
          { label: 'Active Referrers', value: '4,218', icon: 'fa-user-plus', color: 'blue' },
        ].map((s, i) => (
          <div className={`stat-card ${s.color}`} key={i}>
            <div className={`stat-icon ${s.color}`}><i className={`fas ${s.icon}`}></i></div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <span className="card-title">Level-Wise Breakdown</span>
          </div>
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr><th>Level</th><th>Users</th><th>Volume</th><th>Commission</th><th>Required</th><th>Status</th></tr>
              </thead>
              <tbody>
                {referralLevels.map((l, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>L{l.level}</td>
                    <td>{l.users}</td>
                    <td>{l.volume}</td>
                    <td style={{ fontWeight: 600, color: '#f59e0b' }}>{l.commission}</td>
                    <td style={{ color: '#64748b' }}>{l.requiredVol}</td>
                    <td><span className={`status ${l.qualified ? 'qualified' : 'not-qualified'}`}>{l.qualified ? 'Qualified' : 'Not Qualified'}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">Top Referrers</span>
          </div>
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr><th>User</th><th>Telegram</th><th>Directs</th><th>Total Earned</th><th>Levels Qualified</th></tr>
              </thead>
              <tbody>
                {usersData.slice(0, 6).map((u, i) => (
                  <tr key={i} onClick={() => onOpenModal('referral-tree', u)}>
                    <td style={{ fontWeight: 600, color: '#f59e0b' }}>{u.id}</td>
                    <td>{u.tgId}</td>
                    <td>{Math.floor(Math.random() * 50 + 5)}</td>
                    <td style={{ fontWeight: 600 }}>${(Math.random() * 10000 + 500).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                    <td>{Math.floor(Math.random() * 15 + 3)}/20</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card-body">
            <h3 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: 12 }}>Referral Rules</h3>
            {[
              { rule: 'Commission Source', val: '20% of winning reward' },
              { rule: 'Levels', val: '20 levels, 1% each' },
              { rule: 'Qualification', val: 'Self + Direct Vol ≥ Level × $100' },
              { rule: 'Unqualified Handling', val: 'Goes to Platform Profit Wallet' },
              { rule: 'Sponsor Change', val: 'Not allowed after registration' },
            ].map((r, i) => (
              <div className="detail-row" key={i}>
                <span className="detail-label">{r.rule}</span>
                <span className="detail-value">{r.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
