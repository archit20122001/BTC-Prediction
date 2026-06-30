function DetailFields({ fields }) {
  const FIELD_ICONS = {
    'User ID': 'fa-id-card', 'Telegram': 'fa-telegram', 'Wallet Address': 'fa-wallet',
    'Sponsor': 'fa-user-plus', 'Registration Date': 'fa-calendar', 'Status': 'fa-circle',
    'Deposit Wallet Balance': 'fa-coins', 'Profit Wallet Balance': 'fa-sack-dollar',
    'Total Trading Volume': 'fa-chart-line', 'Pool ID': 'fa-cube', 'Pool Type': 'fa-tag',
    'Open Time': 'fa-clock', 'Lock Time': 'fa-lock', 'Close Time': 'fa-clock',
    'Green Volume': 'fa-arrow-trend-up', 'Red Volume': 'fa-arrow-trend-down',
    'Green Participants': 'fa-users', 'Red Participants': 'fa-users',
    'Total Volume': 'fa-chart-bar', 'Settlement ID': 'fa-file-invoice', 'Pool': 'fa-cube',
    'Winner Side': 'fa-trophy', 'Losing Pool Amount': 'fa-coins',
    'User Reward (70%)': 'fa-gift', 'Referral Distribution (20%)': 'fa-sitemap',
    'Platform Share (10%)': 'fa-building', 'Settlement Time': 'fa-calendar',
    'Qualification Threshold': 'fa-arrow-up', 'Funding Allocation': 'fa-coins',
    'Current Balance': 'fa-wallet', 'Qualified Users': 'fa-users',
    'Total Distributed': 'fa-arrow-right', 'Total Claimed': 'fa-check',
    'Pending Claims': 'fa-clock', 'Result': 'fa-flag',
  };

  return (
    <div className="modal-fields">
      {fields.map((f, i) => {
        const icon = FIELD_ICONS[f.l] || 'fa-circle';
        const isStatusOrResult = ['Status', 'Winner Side', 'Result'].includes(f.l);
        const isVol = ['Green Volume', 'Red Volume', 'Total Volume', 'Losing Pool Amount',
          'User Reward (70%)', 'Referral Distribution (20%)', 'Platform Share (10%)',
          'Deposit Wallet Balance', 'Profit Wallet Balance', 'Current Balance',
          'Funding Allocation', 'Total Distributed', 'Total Claimed', 'Pending Claims',
        ].includes(f.l);
        return (
          <div className="modal-field" key={i}>
            <div className="modal-field-icon">
              <i className={`fas ${icon}`}></i>
            </div>
            <div className="modal-field-content">
              <span className="modal-field-label">{f.l}</span>
              <span className="modal-field-value">
                {isStatusOrResult ? (
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

export default function Modal({ type, data, onClose, onNavigate }) {
  if (!type || !data) return null;

  const renderContent = () => {
    switch (type) {
      case 'user-detail':
        return (
          <>
            <div className="modal-accent-bar gold" />
            <div className="modal-header">
              <div className="modal-header-left">
                <div className="modal-header-icon gold"><i className="fas fa-user" /></div>
                <div>
                  <div className="modal-title">User Details</div>
                  <div className="modal-subtitle">{data.id}</div>
                </div>
              </div>
              <button className="modal-close" onClick={onClose}><i className="fas fa-times" /></button>
            </div>
            <div className="modal-body">
              <div className="modal-actions-footer" style={{ borderTop: 'none', paddingTop: 0, marginTop: 0 }}>
                <div className="modal-actions-left">
                  <button className="btn btn-outline btn-sm"><i className="fas fa-history" /> Trade History</button>
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => onNavigate?.('wallet-ledger', data)}
                  >
                    <i className="fas fa-wallet" /> Wallet Ledger
                  </button>
                  <button className="btn btn-outline btn-sm"><i className="fas fa-sitemap" /> Referral Tree</button>
                </div>
                {data.status === 'Active' && (
                  <div className="modal-actions-right">
                    <button className="btn btn-sm" style={{ background: 'var(--accent-blue-dim)', color: 'var(--accent-blue)', border: '1px solid transparent' }}>
                      <i className="fas fa-snowflake" /> Freeze
                    </button>
                    <button className="btn btn-danger btn-sm"><i className="fas fa-ban" /> Suspend</button>
                  </div>
                )}
              </div>
            </div>
          </>
        );

      case 'pool-detail':
        return (
          <>
            <div className="modal-accent-bar blue" />
            <div className="modal-header">
              <div className="modal-header-left">
                <div className="modal-header-icon blue"><i className="fas fa-layer-group" /></div>
                <div>
                  <div className="modal-title">Pool Details</div>
                  <div className="modal-subtitle">{data.id}</div>
                </div>
              </div>
              <button className="modal-close" onClick={onClose}><i className="fas fa-times" /></button>
            </div>
            <div className="modal-body">
              <div className="modal-section">
                <div className="modal-section-title">Pool Information</div>
                <DetailFields fields={[
                  { l: 'Pool ID', v: data.id },
                  { l: 'Pool Type', v: data.type },
                  { l: 'Open Time', v: data.openTime },
                  { l: 'Lock Time', v: data.lockTime },
                  { l: 'Close Time', v: data.closeTime },
                  { l: 'Status', v: data.status },
                  ...(data.result ? [{ l: 'Result', v: data.result }] : []),
                ]} />
              </div>
              <div className="modal-divider" />
              <div className="modal-section">
                <div className="modal-section-title">Volume Breakdown</div>
                <DetailFields fields={[
                  { l: 'Green Volume', v: data.greenVol },
                  { l: 'Red Volume', v: data.redVol },
                  { l: 'Green Participants', v: data.greenCount },
                  { l: 'Red Participants', v: data.redCount },
                  { l: 'Total Volume', v: data.total },
                ]} />
                <div className="volume-bar-group">
                  <div className="volume-bar-row">
                    <span className="volume-bar-label">Green</span>
                    <div className="volume-bar-track">
                      <div className="volume-bar-fill green" style={{ width: `${(data.greenVol / data.total) * 100}%` }} />
                    </div>
                    <span className="volume-bar-pct">{Math.round((data.greenVol / data.total) * 100)}%</span>
                  </div>
                  <div className="volume-bar-row">
                    <span className="volume-bar-label">Red</span>
                    <div className="volume-bar-track">
                      <div className="volume-bar-fill red" style={{ width: `${(data.redVol / data.total) * 100}%` }} />
                    </div>
                    <span className="volume-bar-pct">{Math.round((data.redVol / data.total) * 100)}%</span>
                  </div>
                </div>
              </div>
              {data.status === 'Open' && (
                <div className="modal-actions-footer">
                  <button className="btn btn-danger btn-sm"><i className="fas fa-lock" /> Emergency Lock</button>
                </div>
              )}
            </div>
          </>
        );

      case 'referral-tree':
        return (
          <>
            <div className="modal-accent-bar purple" />
            <div className="modal-header">
              <div className="modal-header-left">
                <div className="modal-header-icon purple"><i className="fas fa-sitemap" /></div>
                <div>
                  <div className="modal-title">Referral Tree</div>
                  <div className="modal-subtitle">{data.id} · {data.tgId}</div>
                </div>
              </div>
              <button className="modal-close" onClick={onClose}><i className="fas fa-times" /></button>
            </div>
            <div className="modal-body">
              <div className="modal-section">
                <div className="modal-section-title">Network Hierarchy</div>
                <div className="tree-root-node">
                  <div className="tree-card gold">
                    <div className="tree-avatar">A</div>
                    <div className="tree-info">
                      <span className="tree-name">{data.id}</span>
                      <span className="tree-tag">{data.tgId}</span>
                    </div>
                    <span className="tree-wallet">{data.wallet}</span>
                  </div>
                </div>
                <div className="tree-children">
                  {['USR-00010', 'USR-00011', 'USR-00012'].map((child, i) => (
                    <div className="tree-branch" key={i}>
                      <div className="tree-line" />
                      <div className="tree-card blue">
                        <div className="tree-avatar sm">U</div>
                        <div className="tree-info">
                          <span className="tree-name">{child}</span>
                          <span className="tree-tag">@user{10 + i}</span>
                        </div>
                        <span className="status active">Active</span>
                      </div>
                      {i === 0 && (
                        <div className="tree-children">
                          {['USR-00020', 'USR-00021'].map((gc, j) => (
                            <div className="tree-branch" key={j}>
                              <div className="tree-line" />
                              <div className="tree-card purple">
                                <div className="tree-avatar sm">U</div>
                                <div className="tree-info">
                                  <span className="tree-name">{gc}</span>
                                  <span className="tree-tag">@user{20 + j}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        );

      case 'settlement-detail':
        return (
          <>
            <div className="modal-accent-bar green" />
            <div className="modal-header">
              <div className="modal-header-left">
                <div className="modal-header-icon green"><i className="fas fa-file-invoice-dollar" /></div>
                <div>
                  <div className="modal-title">Settlement Details</div>
                  <div className="modal-subtitle">{data.id}</div>
                </div>
              </div>
              <button className="modal-close" onClick={onClose}><i className="fas fa-times" /></button>
            </div>
            <div className="modal-body">
              <div className="modal-section">
                <div className="modal-section-title">Settlement Overview</div>
                <DetailFields fields={[
                  { l: 'Settlement ID', v: data.id },
                  { l: 'Pool', v: data.pool },
                  { l: 'Winner Side', v: data.winner },
                  { l: 'Settlement Time', v: data.date },
                ]} />
              </div>
              <div className="modal-divider" />
              <div className="modal-section">
                <div className="modal-section-title">Distribution Breakdown</div>
                <div className="dist-bars">
                  <div className="dist-bar">
                    <div className="dist-bar-header">
                      <span className="dist-bar-label">User Reward (70%)</span>
                      <span className="dist-bar-value">{data.userReward}</span>
                    </div>
                    <div className="dist-bar-track">
                      <div className="dist-bar-fill" style={{ width: '70%', background: 'var(--accent-green)' }} />
                    </div>
                  </div>
                  <div className="dist-bar">
                    <div className="dist-bar-header">
                      <span className="dist-bar-label">Referral Distribution (20%)</span>
                      <span className="dist-bar-value">{data.referral}</span>
                    </div>
                    <div className="dist-bar-track">
                      <div className="dist-bar-fill" style={{ width: '20%', background: 'var(--accent-blue)' }} />
                    </div>
                  </div>
                  <div className="dist-bar">
                    <div className="dist-bar-header">
                      <span className="dist-bar-label">Platform Share (10%)</span>
                      <span className="dist-bar-value">{data.platform}</span>
                    </div>
                    <div className="dist-bar-track">
                      <div className="dist-bar-fill" style={{ width: '10%', background: 'var(--accent-gold)' }} />
                    </div>
                  </div>
                  <div className="dist-total">
                    <span>Total Distributed</span>
                    <span className="dist-total-value">{data.losingPool}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        );

      case 'reward-pool-detail':
        return (
          <>
            <div className="modal-accent-bar purple" />
            <div className="modal-header">
              <div className="modal-header-left">
                <div className="modal-header-icon purple"><i className="fas fa-gift" /></div>
                <div>
                  <div className="modal-title">Reward Pool</div>
                  <div className="modal-subtitle">{data.id}</div>
                </div>
              </div>
              <button className="modal-close" onClick={onClose}><i className="fas fa-times" /></button>
            </div>
            <div className="modal-body">
              <div className="modal-section">
                <div className="modal-section-title">Pool Configuration</div>
                <DetailFields fields={[
                  { l: 'Pool', v: data.id },
                  { l: 'Qualification Threshold', v: data.qualification },
                  { l: 'Funding Allocation', v: data.allocation },
                  { l: 'Current Balance', v: data.balance },
                ]} />
              </div>
              <div className="modal-divider" />
              <div className="modal-section">
                <div className="modal-section-title">Distribution Status</div>
                <DetailFields fields={[
                  { l: 'Qualified Users', v: data.qualified },
                  { l: 'Total Distributed', v: data.distributed },
                  { l: 'Total Claimed', v: data.claimed },
                  { l: 'Pending Claims', v: data.pending },
                ]} />
                <div className="claim-progress">
                  <div className="claim-progress-header">
                    <span>Claim Progress</span>
                    <span>{data.claimed} / {data.distributed}</span>
                  </div>
                  <div className="claim-progress-track">
                    <div className="claim-progress-fill" style={{ width: `${(parseInt(data.claimed.replace(/[^0-9]/g, '')) / parseInt(data.distributed.replace(/[^0-9]/g, ''))) * 100}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        {renderContent()}
      </div>
    </div>
  );
}
