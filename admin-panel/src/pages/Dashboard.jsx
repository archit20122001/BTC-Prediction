import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { dashboardStats, volumeChartData, poolDistributionData, recentTrades } from '../data/mockData';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#1a1f35', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '10px 14px' }}>
        <p style={{ color: '#94a3b8', fontSize: '0.75rem', marginBottom: 4 }}>{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color, fontSize: '0.85rem', fontWeight: 600 }}>
            {p.name}: {typeof p.value === 'number' && p.name === 'Volume' ? `$${p.value.toLocaleString()}` : p.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Platform overview and key metrics</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-outline btn-sm"><i className="fas fa-download" style={{ marginRight: 6 }}></i>Export</button>
          <button className="btn btn-primary btn-sm"><i className="fas fa-refresh" style={{ marginRight: 6 }}></i>Refresh</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {dashboardStats.map((stat, i) => (
          <div className={`stat-card ${stat.color}`} key={i}>
            <div className={`stat-icon ${stat.color}`}>
              <i className={`fas ${stat.icon}`}></i>
            </div>
            <div className="stat-label">{stat.label}</div>
            <div className="stat-value">{stat.value}</div>
            <span className={`stat-change ${stat.up ? 'up' : 'down'}`}>
              <i className={`fas fa-arrow-${stat.up ? 'up' : 'down'}`}></i>
              {stat.change}
            </span>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid-2" style={{ marginBottom: 24 }}>
        <div className="card">
          <div className="card-header">
            <span className="card-title">Trading Volume (7 Days)</span>
            <button className="btn btn-outline btn-sm">Weekly</button>
          </div>
          <div className="card-body">
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={volumeChartData}>
                  <defs>
                    <linearGradient id="volGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} tickFormatter={v => `$${(v/1000)}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="volume" name="Volume" stroke="#f59e0b" fill="url(#volGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">Pool Type Distribution</span>
          </div>
          <div className="card-body" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="chart-container" style={{ display: 'flex', alignItems: 'center' }}>
              <ResponsiveContainer width="60%" height="100%">
                <PieChart>
                  <Pie data={poolDistributionData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value">
                    {poolDistributionData.map((entry, index) => (
                      <Cell key={index} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ flex: 1 }}>
                {poolDistributionData.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: item.fill }}></div>
                    <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{item.name}</span>
                    <span style={{ marginLeft: 'auto', fontWeight: 600, fontSize: '0.85rem' }}>{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Pools */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">Recent Trade Pools</span>
          <button className="btn btn-outline btn-sm">View All Pools</button>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Pool ID</th>
                <th>Type</th>
                <th>Green Volume</th>
                <th>Red Volume</th>
                <th>Status</th>
                <th>Result</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {recentTrades.map((t, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600, color: '#f59e0b' }}>{t.pool}</td>
                  <td>{t.type}</td>
                  <td style={{ color: '#10b981' }}>{t.greenVol}</td>
                  <td style={{ color: '#ef4444' }}>{t.redVol}</td>
                  <td><span className={`status ${t.status.toLowerCase()}`}>{t.status}</span></td>
                  <td>{t.result !== '-' ? <span className={`status ${t.result.toLowerCase()}-side`}>{t.result}</span> : '-'}</td>
                  <td style={{ color: '#64748b' }}>{t.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
