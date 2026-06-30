import { useState } from 'react';

const txData = {
  deposit: [
    { id: 'DEP-0012', amount: '$2,500', method: 'USDT (ERC-20)', date: '2026-06-28', status: 'Completed' },
    { id: 'DEP-0011', amount: '$1,000', method: 'BTC', date: '2026-06-25', status: 'Completed' },
    { id: 'DEP-0010', amount: '$500', method: 'USDT (BEP-20)', date: '2026-06-22', status: 'Completed' },
    { id: 'DEP-0009', amount: '$3,200', method: 'ETH', date: '2026-06-18', status: 'Completed' },
    { id: 'DEP-0008', amount: '$750', method: 'USDT (ERC-20)', date: '2026-06-15', status: 'Failed' },
    { id: 'DEP-0007', amount: '$1,800', method: 'BTC', date: '2026-06-12', status: 'Completed' },
    { id: 'DEP-0006', amount: '$2,100', method: 'USDT (BEP-20)', date: '2026-06-08', status: 'Completed' },
    { id: 'DEP-0005', amount: '$600', method: 'ETH', date: '2026-06-05', status: 'Failed' },
  ],
  withdrawal: [
    { id: 'WD-0210', amount: '$1,200', method: 'Profit Wallet', date: '2026-06-27', status: 'Completed' },
    { id: 'WD-0209', amount: '$800', method: 'Deposit Wallet', date: '2026-06-24', status: 'Completed' },
    { id: 'WD-0208', amount: '$2,000', method: 'Profit Wallet', date: '2026-06-20', status: 'Pending' },
    { id: 'WD-0207', amount: '$500', method: 'Profit Wallet', date: '2026-06-17', status: 'Completed' },
    { id: 'WD-0206', amount: '$1,500', method: 'Profit Wallet', date: '2026-06-14', status: 'Failed' },
    { id: 'WD-0205', amount: '$3,200', method: 'Deposit Wallet', date: '2026-06-10', status: 'Completed' },
    { id: 'WD-0204', amount: '$950', method: 'Profit Wallet', date: '2026-06-07', status: 'Completed' },
    { id: 'WD-0203', amount: '$4,000', method: 'Profit Wallet', date: '2026-06-03', status: 'Pending' },
  ],
  reward: [
    { id: 'RPM-0410', pool: 'Pool 2', amount: '$83.33', date: '2026-06-28', status: 'Claimed' },
    { id: 'RPM-0409', pool: 'Pool 1', amount: '$50.00', date: '2026-06-28', status: 'Claimed' },
    { id: 'RPM-0408', pool: 'Pool 1', amount: '$50.00', date: '2026-06-28', status: 'Claimed' },
    { id: 'RPM-0407', pool: 'Pool 1', amount: '$62.50', date: '2026-06-26', status: 'Pending' },
    { id: 'RPM-0406', pool: 'Pool 3', amount: '$28.40', date: '2026-06-25', status: 'Expired' },
    { id: 'RPM-0405', pool: 'Pool 2', amount: '$105.00', date: '2026-06-23', status: 'Claimed' },
    { id: 'RPM-0404', pool: 'Pool 4', amount: '$45.20', date: '2026-06-21', status: 'Claimed' },
    { id: 'RPM-0403', pool: 'Pool 3', amount: '$72.80', date: '2026-06-18', status: 'Pending' },
  ],
};

const tabs = [
  { key: 'deposit', label: 'Deposits', icon: 'fa-arrow-down' },
  { key: 'withdrawal', label: 'Withdrawals', icon: 'fa-arrow-up' },
  { key: 'reward', label: 'Rewards', icon: 'fa-gift' },
];

const columns = {
  deposit: [
    { key: 'id', label: 'Tx ID' },
    { key: 'amount', label: 'Amount', cls: 'tx-amount' },
    { key: 'method', label: 'Method' },
    { key: 'date', label: 'Date' },
    { key: 'status', label: 'Status', badge: true },
  ],
  withdrawal: [
    { key: 'id', label: 'Tx ID' },
    { key: 'amount', label: 'Amount', cls: 'tx-amount' },
    { key: 'method', label: 'Source' },
    { key: 'date', label: 'Date' },
    { key: 'status', label: 'Status', badge: true },
  ],
  reward: [
    { key: 'id', label: 'Mapping' },
    { key: 'amount', label: 'Amount', cls: 'tx-amount' },
    { key: 'pool', label: 'Pool' },
    { key: 'date', label: 'Date' },
    { key: 'status', label: 'Status', badge: true },
  ],
};

function DetailFields({ fields }) {
  const FIELD_ICONS = {
    'User ID': 'fa-id-card', 'Telegram': 'fa-telegram', 'Wallet Address': 'fa-wallet',
    'Sponsor': 'fa-user-plus', 'Registration Date': 'fa-calendar', 'Status': 'fa-circle',
    'Deposit Wallet Balance': 'fa-coins', 'Profit Wallet Balance': 'fa-sack-dollar',
    'Total Trading Volume': 'fa-chart-line',
  };

  return (
    <div className="modal-fields">
      {fields.map((f, i) => {
        const icon = FIELD_ICONS[f.l] || 'fa-circle';
        const isStatus = f.l === 'Status';
        const isVol = ['Deposit Wallet Balance', 'Profit Wallet Balance', 'Total Trading Volume'].includes(f.l);
        return (
          <div className="modal-field" key={i}>
            <div className="modal-field-icon"><i className={`fas ${icon}`} /></div>
            <div className="modal-field-content">
              <span className="modal-field-label">{f.l}</span>
              <span className="modal-field-value">
                {isStatus ? (
                  <span className={`status ${String(f.v).toLowerCase().replace(/\s+/g, '-')}`}>{f.v}</span>
                ) : isVol ? (
                  <span className="vol-value">{f.v}</span>
                ) : (
                  f.v
                )}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function UserInfoCard({ user }) {
  return (
    <div className="card" style={{ marginBottom: 24 }}>
      <div className="card-header">
        <span className="card-title">
          <i className="fas fa-user" style={{ marginRight: 8, color: 'var(--accent-gold)' }} />
          Account Information
        </span>
        <span className={`status ${user.status.toLowerCase()}`}>{user.status}</span>
      </div>
      <div className="card-body">
        <DetailFields fields={[
          { l: 'User ID', v: user.id },
          { l: 'Telegram', v: user.tgId },
          { l: 'Wallet Address', v: user.wallet },
          { l: 'Sponsor', v: user.sponsor },
          { l: 'Registration Date', v: user.regDate },
          { l: 'Status', v: user.status },
          { l: 'Deposit Wallet Balance', v: user.depositBal },
          { l: 'Profit Wallet Balance', v: user.profitBal },
          { l: 'Total Trading Volume', v: user.volume },
        ]} />
      </div>
    </div>
  );
}

export default function UserDetail({ user }) {
  const [activeTab, setActiveTab] = useState('deposit');
  const [search, setSearch] = useState('');

  const rows = txData[activeTab] || [];
  const filtered = search
    ? rows.filter(r => Object.values(r).some(v => String(v).toLowerCase().includes(search.toLowerCase())))
    : rows;

  const totals = txData[activeTab].reduce((sum, r) => {
    const num = parseFloat(r.amount.replace(/[$,]/g, ''));
    return sum + num;
  }, 0);

  if (!user) return null;

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h1 className="page-title">User Details</h1>
          <p className="page-subtitle" style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
            <span>{user.id}</span>
            <span style={{ color: 'var(--text-muted)' }}>·</span>
            <span>{user.tgId}</span>
            <span style={{ color: 'var(--text-muted)' }}>·</span>
            <span className="wallet-addr">{user.wallet}</span>
          </p>
        </div>
      </div>

      <UserInfoCard user={user} />

      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div className="stat-card gold">
          <div className="stat-icon gold"><i className="fas fa-coins" /></div>
          <div className="stat-label">Total Deposit Volume</div>
          <div className="stat-value">$12,450</div>
        </div>
        <div className="stat-card blue">
          <div className="stat-icon blue"><i className="fas fa-arrow-up-from-bracket" /></div>
          <div className="stat-label">Total Withdrawn</div>
          <div className="stat-value">$14,150</div>
        </div>
        <div className="stat-card red">
          <div className="stat-icon red"><i className="fas fa-gift" /></div>
          <div className="stat-label">Total Rewards Claimed</div>
          <div className="stat-value">$464.93</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header" style={{ paddingBottom: 0, borderBottom: 'none' }}>
          <div className="tx-tabs">
            {tabs.map(t => (
              <button
                key={t.key}
                className={`tx-tab ${activeTab === t.key ? 'active' : ''}`}
                onClick={() => setActiveTab(t.key)}
              >
                <i className={`fas ${t.icon}`} />
                <span>{t.label}</span>
                <span className="tx-tab-count">{txData[t.key].length}</span>
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              padding: '8px 14px',
              background: 'var(--bg-input)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-primary)',
              fontSize: '0.85rem',
              fontFamily: 'inherit',
              outline: 'none',
              width: 200,
            }}
          />
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                {columns[activeTab].map(col => (
                  <th key={col.key}>{col.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={columns[activeTab].length} style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>
                    <i className="fas fa-search" style={{ display: 'block', fontSize: '2rem', marginBottom: 12, opacity: 0.3 }} />
                    No transactions found
                  </td>
                </tr>
              ) : (
                filtered.map((row, i) => (
                  <tr key={i}>
                    {columns[activeTab].map(col => (
                      <td key={col.key} className={col.cls || ''}>
                        {col.badge ? (
                          <span className={`status ${row[col.key].toLowerCase()}`}>{row[col.key]}</span>
                        ) : (
                          row[col.key]
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="card-body">
          <div className="pagination">
            <span>Showing {filtered.length} of {txData[activeTab].length} records</span>
            <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>
              Total: <span style={{ color: 'var(--accent-cyan)', fontFamily: '"Courier New", monospace' }}>${totals.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
