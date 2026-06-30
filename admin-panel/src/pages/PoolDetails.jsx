import React, { useState } from 'react';

export default function PoolDetails({ data, onBack }) {
    const [activeVolumeTab, setActiveVolumeTab] = useState('green');

    if (!data) return <div>Loading...</div>;

    const cleanNumber = (val) => Number(String(val).replace(/[^0-9.-]+/g, '')) || 0;

    const greenVolNum = cleanNumber(data.greenVol);
    const totalVolNum = cleanNumber(data.total);
    const redVolNum = cleanNumber(data.redVol);

    const greenPct = totalVolNum > 0 ? Math.round((greenVolNum / totalVolNum) * 100) : 0;
    const redPct = totalVolNum > 0 ? Math.round((redVolNum / totalVolNum) * 100) : 0;

    const userDeposits = data.deposits || [
        { userId: 'USR-2941', wallet: '0x71C...3a29', amount: '$4,200', side: 'up', route: 'Profit Wallet' },
        { userId: 'USR-8812', wallet: '0x88F...9b11', amount: '$1,850', side: 'down', route: 'Personal Wallet' },
        { userId: 'USR-0432', wallet: '0x99A...4c22', amount: '$6,400', side: 'up', route: 'Personal Wallet' },
        { userId: 'USR-7731', wallet: '0x11B...5d33', amount: '$9,200', side: 'down', route: 'Profit Wallet' },
    ];

    const displayedDeposits = userDeposits.filter(user => {
        const isGreenSide = user.side.toLowerCase() === 'up' || user.side.toLowerCase() === 'green';
        return activeVolumeTab === 'green' ? isGreenSide : !isGreenSide;
    });

    return (
        <div className="page-content flex-col">

            <div className="page-header">
                <div>
                    <h1 className="page-title">Pool Details</h1>
                    <p className="page-subtitle">{data.id}</p>
                </div>
                <button className="btn btn-outline" onClick={onBack}>
                    <i className="fas fa-arrow-left" style={{ marginRight: '6px' }} /> Back
                </button>
            </div>

            <div className="card flex-col" style={{ marginBottom: '20px' }}>
                <div className="card-header" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '14px' }}>
                    <span className="card-title" style={{ margin: 0 }}>Pool Information</span>
                </div>
                <div className="card-body">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                        <InfoField icon="fa-cube" label="Pool ID" value={data.id} />
                        <InfoField icon="fa-tag" label="Pool Type" value={data.type} />
                        <InfoField icon="fa-clock" label="Open Time" value={data.openTime} />
                        <InfoField icon="fa-lock" label="Lock Time" value={data.lockTime} />
                        <InfoField icon="fa-clock" label="Close Time" value={data.closeTime} />
                        <InfoField icon="fa-circle" label="Status" value={data.status} isStatus />
                    </div>
                </div>
            </div>

            <div className="card flex-col" style={{ marginBottom: '20px' }}>
                <div className="card-header" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '14px' }}>
                    <span className="card-title" style={{ margin: 0 }}>Volume Breakdown</span>
                </div>
                <div className="card-body">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                        <InfoField icon="fa-arrow-trend-up" label="Green Volume" value={data.greenVol} valueColor="var(--accent-green, #10b981)" />
                        <InfoField icon="fa-arrow-trend-down" label="Red Volume" value={data.redVol} valueColor="var(--accent-red, #ef4444)" />
                        <InfoField icon="fa-users" label="Green Participants" value={data.greenCount} />
                        <InfoField icon="fa-users" label="Red Participants" value={data.redCount} />
                        <InfoField icon="fa-chart-bar" label="Total Volume" value={data.total} valueColor="var(--accent-blue, #3b82f6)" />
                    </div>

                    <div className="volume-bars" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <span style={{ width: '60px', fontWeight: 'bold', color: '#fff' }}>Green</span>
                            <div style={{ flex: 1, background: 'rgba(255, 255, 255, 0.05)', height: '12px', borderRadius: '6px', overflow: 'hidden' }}>
                                <div style={{ width: `${greenPct}%`, background: 'var(--accent-green, #10b981)', height: '100%', borderRadius: '6px' }} />
                            </div>
                            <span style={{ width: '40px', textAlign: 'right', color: '#94a3b8' }}>{greenPct}%</span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <span style={{ width: '60px', fontWeight: 'bold', color: '#fff' }}>Red</span>
                            <div style={{ flex: 1, background: 'rgba(255, 255, 255, 0.05)', height: '12px', borderRadius: '6px', overflow: 'hidden' }}>
                                <div style={{ width: `${redPct}%`, background: 'var(--accent-red, #ef4444)', height: '100%', borderRadius: '6px' }} />
                            </div>
                            <span style={{ width: '40px', textAlign: 'right', color: '#94a3b8' }}>{redPct}%</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card flex-col" style={{ marginBottom: '20px' }}>
                <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '14px' }}>
                    <span className="card-title" style={{ margin: 0 }}>Participant Allocations</span>

                    <div style={{
                        position: 'relative',
                        display: 'flex',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        padding: '4px',
                        width: '240px',
                        height: '40px',
                        boxSizing: 'border-box',
                        userSelect: 'none'
                    }}>

                        <div style={{
                            position: 'absolute',
                            top: '3px',
                            bottom: '3px',
                            left: '3px',
                            width: 'calc(50% - 3px)',
                            background: activeVolumeTab === 'green' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                            border: activeVolumeTab === 'green' ? '1px solid #10b981' : '1px solid #ef4444',
                            borderRadius: '9px',
                            transform: activeVolumeTab === 'green' ? 'translateX(0)' : 'translateX(100%)',
                            transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.25s, border-color 0.25s',
                            zIndex: 1
                        }} />

                        <button
                            onClick={() => setActiveVolumeTab('green')}
                            style={{
                                flex: 1,
                                background: 'none',
                                border: 'none',
                                color: activeVolumeTab === 'green' ? '#10b981' : '#94a3b8',
                                fontWeight: 600,
                                fontSize: '13px',
                                letterSpacing: '0.5px',
                                cursor: 'pointer',
                                position: 'relative',
                                zIndex: 2,
                                transition: 'color 0.2s ease',
                                textTransform: 'uppercase'
                            }}
                        >
                            Green Vol
                        </button>

                        <button
                            onClick={() => setActiveVolumeTab('red')}
                            style={{
                                flex: 1,
                                background: 'none',
                                border: 'none',
                                color: activeVolumeTab === 'red' ? '#ef4444' : '#94a3b8',
                                fontWeight: 600,
                                fontSize: '13px',
                                letterSpacing: '0.5px',
                                cursor: 'pointer',
                                position: 'relative',
                                zIndex: 2,
                                transition: 'color 0.2s ease',
                                textTransform: 'uppercase'
                            }}
                        >
                            Red Vol
                        </button>
                    </div>
                </div>

                <div className="table-wrapper">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th style={{ paddingLeft: '24px' }}>User ID</th>
                                <th>Wallet Address</th>
                                <th style={{ textAlign: 'right', paddingRight: '24px' }}>Allocation Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedDeposits.length > 0 ? (
                                displayedDeposits.map((user, idx) => {
                                    const isGreenSide = user.side.toLowerCase() === 'up' || user.side.toLowerCase() === 'green';
                                    return (
                                        <tr key={idx} style={{ background: 'transparent' }}>
                                            <td style={{ fontWeight: 600, color: '#f59e0b', paddingLeft: '24px' }}>
                                                {user.userId}
                                            </td>
                                            <td style={{ color: '#94a3b8', fontFamily: 'monospace', fontSize: '13px' }}>
                                                {user.wallet || 'N/A'}
                                            </td>
                                            <td style={{ textAlign: 'right', paddingRight: '24px' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
                                                    <span style={{
                                                        fontWeight: 700,
                                                        fontSize: '15px',
                                                        color: isGreenSide ? 'var(--accent-green, #10b981)' : 'var(--accent-red, #ef4444)'
                                                    }}>
                                                        {user.amount}
                                                    </span>
                                                    <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>
                                                        via {user.route}
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="3" style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                                        No participants in this volume pool.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {data.status === 'Open' && (
                <div style={{ marginTop: '10px' }}>
                    <button className="btn btn-danger">
                        <i className="fas fa-lock" style={{ marginRight: '6px' }} /> Emergency Lock
                    </button>
                </div>
            )}
        </div>
    );
}

function InfoField({ icon, label, value, isStatus, valueColor }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)', padding: '16px', borderRadius: '12px' }}>
            <div style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '10px', color: '#94a3b8' }}>
                <i className={`fas ${icon}`}></i>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 600, letterSpacing: '0.5px' }}>{label}</span>
                {isStatus ? (
                    <span className={`status ${String(value).toLowerCase().replace(/\s+/g, '-')}`} style={{ alignSelf: 'flex-start' }}>
                        {value}
                    </span>
                ) : (
                    <span style={{ fontSize: '16px', fontWeight: '700', color: valueColor || '#fff' }}>
                        {value}
                    </span>
                )}
            </div>
        </div>
    );
}