export default function Security() {
  const flags = [
    { type: 'Duplicate Wallet', user: 'USR-00031', detail: 'Wallet 0x8dE7...3c5F linked to USR-00006', severity: 'High', time: '2 hours ago' },
    { type: 'Wash Trading', user: 'USR-00003', detail: 'Circular trades detected in POOL-3M series', severity: 'Critical', time: '4 hours ago' },
    { type: 'Referral Abuse', user: 'USR-00045', detail: 'Self-referral chain detected (3 accounts)', severity: 'High', time: '1 day ago' },
    { type: 'Rate Limit', user: 'USR-00082', detail: '200+ API calls in 60 seconds', severity: 'Medium', time: '1 day ago' },
    { type: 'Duplicate Telegram', user: 'USR-00091', detail: 'Same device fingerprint as USR-00012', severity: 'Medium', time: '2 days ago' },
  ];

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Security & Fraud Detection</h1>
          <p className="page-subtitle">Multi-account protection, wallet verification, and fraud monitoring</p>
        </div>
      </div>

      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {[
          { label: 'Active Flags', value: '5', icon: 'fa-flag', color: 'red' },
          { label: 'Accounts Suspended', value: '12', icon: 'fa-user-slash', color: 'gold' },
          { label: 'Fraud Detected', value: '3', icon: 'fa-shield-halved', color: 'purple' },
          { label: 'Security Score', value: '94%', icon: 'fa-lock', color: 'green' },
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
          <span className="card-title">Flagged Accounts & Alerts</span>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr><th>Type</th><th>User</th><th>Details</th><th>Severity</th><th>Detected</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {flags.map((f, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{f.type}</td>
                  <td style={{ color: '#f59e0b' }}>{f.user}</td>
                  <td style={{ color: '#94a3b8', maxWidth: 300 }}>{f.detail}</td>
                  <td><span className={`status ${f.severity === 'Critical' ? 'suspended' : f.severity === 'High' ? 'pending' : 'frozen'}`}>{f.severity}</span></td>
                  <td style={{ color: '#64748b' }}>{f.time}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <button className="btn btn-sm btn-outline">Investigate</button>
                      <button className="btn btn-sm btn-danger">Suspend</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <div className="card-header"><span className="card-title">Security Framework</span></div>
        <div className="card-body">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            {['Wallet Verification', 'Contract Verification', 'API Authentication', 'Encrypted Communication', 'Audit Logging', 'Rate Limiting', 'Fraud Detection', 'Multi-Account Detection', 'Settlement Immutability'].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0' }}>
                <i className="fas fa-check-circle" style={{ color: '#10b981' }}></i>
                <span style={{ fontSize: '0.85rem' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
