import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { reportChartData } from '../data/mockData';

export default function Reports() {
  const [period, setPeriod] = useState('daily');
  const data = reportChartData[period] || reportChartData.daily;

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Reports & Analytics</h1>
          <p className="page-subtitle">Daily, weekly, and monthly platform analytics</p>
        </div>
        <button className="btn btn-primary btn-sm"><i className="fas fa-download" style={{ marginRight: 6 }}></i>Export Report</button>
      </div>

      <div className="tabs">
        <button className={`tab ${period === 'daily' ? 'active' : ''}`} onClick={() => setPeriod('daily')}>Daily</button>
        <button className={`tab ${period === 'weekly' ? 'active' : ''}`} onClick={() => setPeriod('weekly')}>Weekly</button>
      </div>

      <div className="grid-2" style={{ marginBottom: 24 }}>
        <div className="card">
          <div className="card-header"><span className="card-title">Volume Trend</span></div>
          <div className="card-body">
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} tickFormatter={v => `$${(v/1000)}k`} />
                  <Tooltip contentStyle={{ background: '#1a1f35', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} />
                  <Bar dataKey="volume" name="Volume" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header"><span className="card-title">Revenue Trend</span></div>
          <div className="card-body">
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} tickFormatter={v => `$${(v/1000)}k`} />
                  <Tooltip contentStyle={{ background: '#1a1f35', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} />
                  <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="grid-3">
        {[
          { title: 'Referral Growth', items: [{ l: 'New Referrals Today', v: '142' }, { l: 'Active Referrers', v: '4,218' }, { l: 'Avg Levels Qualified', v: '8.4' }] },
          { title: 'Reward Pool Growth', items: [{ l: 'New Charges Today', v: '$2,840' }, { l: 'Total Pool Balance', v: '$98,450' }, { l: 'Claims Today', v: '$1,250' }] },
          { title: 'Settlement Summary', items: [{ l: 'Settlements Today', v: '41' }, { l: 'Green Wins', v: '23 (56%)' }, { l: 'Red Wins', v: '18 (44%)' }] },
        ].map((section, i) => (
          <div className="card" key={i}>
            <div className="card-header"><span className="card-title">{section.title}</span></div>
            <div className="card-body">
              {section.items.map((item, j) => (
                <div className="detail-row" key={j}>
                  <span className="detail-label">{item.l}</span>
                  <span className="detail-value">{item.v}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
