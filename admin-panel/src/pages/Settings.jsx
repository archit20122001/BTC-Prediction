import { useState } from 'react';

export default function Settings() {
  const [dojiFallback, setDojiFallback] = useState('green');

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Platform Settings</h1>
          <p className="page-subtitle">Core business rules and configuration — all financial actions are rule-driven</p>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header"><span className="card-title">Trading Rules</span></div>
          <div className="card-body">
            {[
              { l: 'Supported Asset', v: 'BTCUSD Spot' },
              { l: 'Data Source', v: 'TradingView Market Feed' },
              { l: 'Minimum Trade', v: '$1' },
              { l: 'Maximum Trade', v: '$1,000' },
              { l: 'Prediction Options', v: 'Green (Bullish) / Red (Bearish)' },
              { l: 'Settlement Basis', v: 'Open Price vs Close Price only' },
            ].map((r, i) => (
              <div className="detail-row" key={i}><span className="detail-label">{r.l}</span><span className="detail-value">{r.v}</span></div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header"><span className="card-title">Pool Configuration</span></div>
          <div className="card-body">
            {[
              { l: 'Pool A', v: '3 Minute BTC Candle' },
              { l: 'Pool B', v: '5 Minute BTC Candle' },
              { l: 'Pool C', v: '4 Hour BTC Candle' },
              { l: 'Pool D', v: '1 Day BTC Candle' },
              { l: 'Network', v: 'BNB Smart Chain (BSC)' },
              { l: 'Currency', v: 'USDT (BEP20)' },
            ].map((r, i) => (
              <div className="detail-row" key={i}><span className="detail-label">{r.l}</span><span className="detail-value">{r.v}</span></div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header"><span className="card-title">Distribution Rules</span></div>
          <div className="card-body">
            {[
              { l: 'User Reward', v: '70% of winning reward' },
              { l: 'Referral Network', v: '20% of winning reward' },
              { l: 'Platform Share', v: '10% of winning reward' },
              { l: 'Referral Levels', v: '20 Levels × 1% each' },
              { l: 'Deposit WD Fee', v: '0%' },
              { l: 'Profit WD Fee', v: '10%' },
            ].map((r, i) => (
              <div className="detail-row" key={i}><span className="detail-label">{r.l}</span><span className="detail-value">{r.v}</span></div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header"><span className="card-title">Edge Case Rules</span></div>
          <div className="card-body">
            <div className="detail-row">
              <span className="detail-label">Doji Fallback Rule</span>
              <select value={dojiFallback} onChange={e => setDojiFallback(e.target.value)}
                style={{ padding: '6px 12px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, color: 'var(--text-primary)', fontSize: '0.85rem' }}>
                <option value="green">Default Green</option>
                <option value="red">Default Red</option>
                <option value="cancel">Cancel Pool</option>
              </select>
            </div>
            {[
              { l: 'Empty Side Rule', v: 'Pool cancelled, stakes returned' },
              { l: 'Orphan Referral', v: 'Goes to Platform Profit Wallet' },
              { l: 'No Qualified Users (Reward)', v: 'Funds accumulate in pool' },
              { l: 'First Qualified User', v: 'Gets entire accumulated balance' },
            ].map((r, i) => (
              <div className="detail-row" key={i}><span className="detail-label">{r.l}</span><span className="detail-value">{r.v}</span></div>
            ))}
          </div>
        </div>

        <div className="card" style={{ gridColumn: 'span 2' }}>
          <div className="card-header"><span className="card-title">Reward Pool Qualification Thresholds</span></div>
          <div className="card-body">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
              {[
                { pool: 'Pool 1', vol: '$5,000', alloc: '40%', color: 'gold' },
                { pool: 'Pool 2', vol: '$25,000', alloc: '30%', color: 'blue' },
                { pool: 'Pool 3', vol: '$50,000', alloc: '20%', color: 'purple' },
                { pool: 'Pool 4', vol: '$100,000', alloc: '10%', color: 'cyan' },
              ].map((p, i) => (
                <div key={i} style={{ padding: 16, background: 'var(--bg-secondary)', borderRadius: 12, textAlign: 'center' }}>
                  <div className={`stat-icon ${p.color}`} style={{ margin: '0 auto 10px' }}><i className="fas fa-trophy"></i></div>
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>{p.pool}</div>
                  <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Qualification: {p.vol}</div>
                  <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Allocation: {p.alloc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
