import { useState } from 'react';
import { poolsData } from '../data/mockData';

export default function PoolManagement({ onNavigate }) {
  const [filters, setFilters] = useState({
    BTC: { '3 Min': false, '5 Min': false, '4 Hour': false, '1 Day': false, Open: false },
    PAXG: { '3 Min': false, '5 Min': false, '4 Hour': false, '1 Day': false, Open: false },
  });

  const [lockedPools, setLockedPools] = useState({});
  const [activeTab, setActiveTab] = useState('active');

  const handleLock = (poolId) => {
    setLockedPools(prev => ({
      ...prev,
      [poolId]: !prev[poolId]
    }));
  };

  const toggleFilter = (asset, filter) => {
    setFilters(prev => ({
      ...prev,
      [asset]: {
        ...prev[asset],
        [filter]: !prev[asset][filter]
      }
    }));
  };

  const filtered = poolsData.filter(p => {
    const status = p.status.toLowerCase();
    if (activeTab === 'history' && status !== 'completed') return false;
    if (activeTab === 'active' && status === 'completed') return false;

    const isAnyFilterActive = Object.values(filters).some(assetObj =>
      Object.values(assetObj).some(isActive => isActive)
    );

    if (!isAnyFilterActive) return true;

    const assetFilters = filters[p.asset];
    if (!assetFilters) return false;

    const activeTags = Object.keys(assetFilters).filter(key => assetFilters[key]);
    if (activeTags.length === 0) return false;

    const activeTypes = activeTags.filter(tag => tag !== 'Open');
    const hasOpenFilter = activeTags.includes('Open');

    const matchesType = activeTypes.length === 0 || activeTypes.includes(p.type);
    const matchesStatus = !hasOpenFilter || status === 'open';

    return matchesType && matchesStatus;
  });

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Pool Management</h1>
          <p className="page-subtitle">Monitor trading pools, volumes, and settlements</p>
        </div>
        <button className="btn btn-danger btn-sm"><i className="fas fa-lock" style={{ marginRight: 6 }}></i>Emergency Lock All</button>
      </div>

      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {[
          { label: 'Active Pools', value: '3', icon: 'fa-play-circle', color: 'green' },
          { label: 'Locked Pools', value: '1', icon: 'fa-lock', color: 'gold' },
          { label: 'Completed Today', value: '41', icon: 'fa-check-circle', color: 'blue' },
          { label: 'Total Volume Today', value: '$184,290', icon: 'fa-chart-bar', color: 'purple' },
        ].map((s, i) => (
          <div className={`stat-card ${s.color}`} key={i}>
            <div className={`stat-icon ${s.color}`}><i className={`fas ${s.icon}`}></i></div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '14px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <span className="card-title" style={{ margin: 0 }}>Trade Pools</span>

          <div style={{
            position: 'relative',
            display: 'flex',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '4px',
            width: '240px',
            height: '44px',
            boxSizing: 'border-box',
            userSelect: 'none'
          }}>

            <div style={{
              position: 'absolute',
              top: '3px',
              bottom: '3px',
              left: '3px',
              width: 'calc(50% - 3px)',
              background: activeTab === 'active' ? '#1e3a2f' : '#3a2a18',
              border: activeTab === 'active' ? '1px solid #10b981' : '1px solid #f59e0b',
              borderRadius: '9px',
              transform: activeTab === 'active' ? 'translateX(0)' : 'translateX(100%)',
              transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.2s, border-color 0.2s',
              zIndex: 1
            }} />

            <button
              onClick={() => setActiveTab('active')}
              style={{
                flex: 1,
                background: 'none',
                border: 'none',
                color: activeTab === 'active' ? '#10b981' : '#94a3b8',
                fontWeight: 600,
                fontSize: '14px',
                letterSpacing: '0.5px',
                cursor: 'pointer',
                position: 'relative',
                zIndex: 2,
                transition: 'color 0.2s ease',
                textTransform: 'uppercase'
              }}
            >
              Active
            </button>

            <button
              onClick={() => setActiveTab('history')}
              style={{
                flex: 1,
                background: 'none',
                border: 'none',
                color: activeTab === 'history' ? '#f59e0b' : '#94a3b8',
                fontWeight: 600,
                fontSize: '14px',
                letterSpacing: '0.5px',
                cursor: 'pointer',
                position: 'relative',
                zIndex: 2,
                transition: 'color 0.2s ease',
                textTransform: 'uppercase'
              }}
            >
              History
            </button>
          </div>
        </div>

        <div className="card-body" style={{ paddingBottom: 0, paddingTop: '20px' }}>
          <div className="filter-bar" style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px', alignItems: 'flex-start' }}>

            {Object.keys(filters).map(asset => (
              <div key={asset} style={{ display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'flex-start', width: '100%' }}>
                <strong style={{ minWidth: '60px', textAlign: 'left', color: '#fff' }}>{asset}:</strong>

                {Object.keys(filters[asset]).map(filterKey => {
                  const isChecked = filters[asset][filterKey];
                  return (
                    <label key={filterKey} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', margin: 0, color: '#94a3b8', fontSize: '14px' }}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleFilter(asset, filterKey)}
                        style={{
                          appearance: 'none',
                          WebkitAppearance: 'none',
                          width: '16px',
                          height: '16px',
                          border: '1px solid rgba(255, 255, 255, 0.25)',
                          borderRadius: '4px',
                          outline: 'none',
                          backgroundColor: isChecked ? '#f59e0b' : 'transparent',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'background-color 0.15s ease'
                        }}
                      />
                      {filterKey}
                    </label>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Pool ID</th>
                <th>Type</th>
                <th>Asset</th>
                <th>Open</th>
                <th>Lock</th>
                <th>Close</th>
                <th>Green Vol</th>
                <th>Red Vol</th>
                <th>🟢</th>
                <th>🔴</th>
                <th>Total</th>
                <th>Status</th>
                <th>Result</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr
                  key={i}
                  onClick={() => onNavigate('pool-detail', p)}
                  style={{ cursor: 'pointer' }}
                >
                  <td style={{ fontWeight: 600, color: '#f59e0b' }}>{p.id}</td>
                  <td>{p.type}</td>
                  <td>{p.asset}</td>
                  <td style={{ color: '#64748b' }}>{p.openTime}</td>
                  <td style={{ color: '#64748b' }}>{p.lockTime}</td>
                  <td style={{ color: '#64748b' }}>{p.closeTime}</td>
                  <td style={{ color: '#10b981', fontWeight: 600 }}>{p.greenVol}</td>
                  <td style={{ color: '#ef4444', fontWeight: 600 }}>{p.redVol}</td>
                  <td>{p.greenCount}</td>
                  <td>{p.redCount}</td>
                  <td style={{ fontWeight: 700 }}>{p.total}</td>
                  <td><span className={`status ${p.status.toLowerCase()}`}>{p.status}</span></td>
                  <td>{p.result ? <span className={`status ${p.result.toLowerCase()}-side`}>{p.result}</span> : '-'}</td>
                  <td>
                    <button
                      className={`btn btn-sm ${lockedPools[p.id] ? 'btn-danger' : 'btn-warning'}`}
                      onClick={(e) => { e.stopPropagation(); handleLock(p.id); }}
                    >
                      <i className={`fas ${lockedPools[p.id] ? 'fa-lock' : 'fa-lock'}`}></i> {lockedPools[p.id] ? 'Locked' : 'Lock'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}