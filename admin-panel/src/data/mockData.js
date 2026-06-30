// Mock data for all admin panel pages
export const dashboardStats = [
  { label: 'Total Users', value: '24,819', change: '+12.5%', up: true, icon: 'fa-users', color: 'blue' },
  { label: 'Active Users', value: '8,432', change: '+8.3%', up: true, icon: 'fa-user-check', color: 'green' },
  { label: "Today's Volume", value: '$184,290', change: '+23.1%', up: true, icon: 'fa-chart-line', color: 'gold' },
  { label: 'Total Deposits', value: '$2.84M', change: '+5.7%', up: true, icon: 'fa-arrow-down', color: 'cyan' },
  { label: 'Total Withdrawals', value: '$1.62M', change: '+3.2%', up: true, icon: 'fa-arrow-up', color: 'purple' },
  { label: 'Platform Revenue', value: '$412,580', change: '+18.4%', up: true, icon: 'fa-coins', color: 'gold' },
  { label: 'Referral Distribution', value: '$824,160', change: '+14.2%', up: true, icon: 'fa-sitemap', color: 'blue' },
  { label: 'Reward Pool Balance', value: '$98,450', change: '-2.1%', up: false, icon: 'fa-gift', color: 'red' },
];

export const volumeChartData = [
  { name: 'Mon', volume: 42000, users: 1200 },
  { name: 'Tue', volume: 58000, users: 1450 },
  { name: 'Wed', volume: 51000, users: 1380 },
  { name: 'Thu', volume: 73000, users: 1620 },
  { name: 'Fri', volume: 89000, users: 1890 },
  { name: 'Sat', volume: 95000, users: 2100 },
  { name: 'Sun', volume: 78000, users: 1750 },
];

export const poolDistributionData = [
  { name: '3-Min', value: 45, fill: '#f59e0b' },
  { name: '5-Min', value: 30, fill: '#3b82f6' },
  { name: '4-Hour', value: 15, fill: '#8b5cf6' },
  { name: '1-Day', value: 10, fill: '#10b981' },
];

export const recentTrades = [
  { pool: 'POOL-3M-20260629-0042', type: '3 Min', greenVol: '$12,450', redVol: '$9,830', status: 'Open', result: '-', time: '11:33 AM' },
  { pool: 'POOL-5M-20260629-0018', type: '5 Min', greenVol: '$28,100', redVol: '$31,200', status: 'Locked', result: '-', time: '11:30 AM' },
  { pool: 'POOL-3M-20260629-0041', type: '3 Min', greenVol: '$15,680', redVol: '$14,920', status: 'Completed', result: 'Green', time: '11:27 AM' },
  { pool: 'POOL-4H-20260629-0003', type: '4 Hour', greenVol: '$45,200', redVol: '$52,100', status: 'Open', result: '-', time: '08:00 AM' },
  { pool: 'POOL-1D-20260629-0001', type: '1 Day', greenVol: '$88,400', redVol: '$76,300', status: 'Open', result: '-', time: '00:00 AM' },
];

export const usersData = [
  { id: 'USR-00001', tgId: '@alextrader', wallet: '0x7a3B...4e2F', sponsor: 'USR-00000', regDate: '2026-01-15', status: 'Active', depositBal: '$4,280', profitBal: '$12,650', volume: '$89,200' },
  { id: 'USR-00002', tgId: '@cryptoking', wallet: '0x9cD1...8b3A', sponsor: 'USR-00001', regDate: '2026-01-18', status: 'Active', depositBal: '$1,500', profitBal: '$8,340', volume: '$62,100' },
  { id: 'USR-00003', tgId: '@btcwhale', wallet: '0x2eF5...1d7C', sponsor: 'USR-00001', regDate: '2026-02-01', status: 'Suspended', depositBal: '$0', profitBal: '$3,200', volume: '$28,400' },
  { id: 'USR-00004', tgId: '@moonshot', wallet: '0x5bA8...9e4D', sponsor: 'USR-00002', regDate: '2026-02-10', status: 'Active', depositBal: '$7,120', profitBal: '$21,890', volume: '$145,600' },
  { id: 'USR-00005', tgId: '@diamondhand', wallet: '0x1fC3...6a2E', sponsor: 'USR-00002', regDate: '2026-02-14', status: 'Active', depositBal: '$980', profitBal: '$5,670', volume: '$41,300' },
  { id: 'USR-00006', tgId: '@hodlmaster', wallet: '0x8dE7...3c5F', sponsor: 'USR-00003', regDate: '2026-03-01', status: 'Frozen', depositBal: '$2,340', profitBal: '$0', volume: '$15,800' },
  { id: 'USR-00007', tgId: '@satoshi99', wallet: '0x4aB2...7f1G', sponsor: 'USR-00004', regDate: '2026-03-15', status: 'Active', depositBal: '$11,200', profitBal: '$34,500', volume: '$210,400' },
  { id: 'USR-00008', tgId: '@bullrunner', wallet: '0x6cD9...2e8H', sponsor: 'USR-00004', regDate: '2026-04-02', status: 'Active', depositBal: '$3,450', profitBal: '$9,120', volume: '$72,600' },
];

export const poolsData = [
  { id: 'POOL-3M-20260629-0042', type: '3 Min', asset: 'BTC', openTime: '11:33:00', lockTime: '11:34:30', closeTime: '11:36:00', status: 'Open', greenVol: '$12,450', redVol: '$9,830', greenCount: 42, redCount: 38, total: '$22,280' },
  { id: 'POOL-5M-20260629-0018', type: '5 Min', asset: 'PAXG', openTime: '11:30:00', lockTime: '11:33:00', closeTime: '11:35:00', status: 'Locked', greenVol: '$28,100', redVol: '$31,200', greenCount: 85, redCount: 92, total: '$59,300' },
  { id: 'POOL-3M-20260629-0041', type: '3 Min', asset: 'BTC', openTime: '11:27:00', lockTime: '11:28:30', closeTime: '11:30:00', status: 'Completed', greenVol: '$15,680', redVol: '$14,920', greenCount: 55, redCount: 48, total: '$30,600', result: 'Green' },
  { id: 'POOL-4H-20260629-0003', type: '4 Hour', asset: 'PAXG', openTime: '08:00:00', lockTime: '11:00:00', closeTime: '12:00:00', status: 'Open', greenVol: '$45,200', redVol: '$52,100', greenCount: 320, redCount: 298, total: '$97,300' },
  { id: 'POOL-1D-20260629-0001', type: '1 Day', asset: 'BTC', openTime: '00:00:00', lockTime: '20:00:00', closeTime: '00:00:00', status: 'Open', greenVol: '$88,400', redVol: '$76,300', greenCount: 612, redCount: 584, total: '$164,700' },
  { id: 'POOL-3M-20260629-0040', type: '3 Min', asset: 'PAXG', openTime: '11:24:00', lockTime: '11:25:30', closeTime: '11:27:00', status: 'Completed', greenVol: '$8,900', redVol: '$11,200', greenCount: 31, redCount: 40, total: '$20,100', result: 'Red' },
  { id: 'POOL-5M-20260629-0019', type: '5 Min', asset: 'BTC', openTime: '11:20:00', lockTime: '11:23:00', closeTime: '11:25:00', status: 'Open', greenVol: '$18,750', redVol: '$22,100', greenCount: 62, redCount: 71, total: '$40,850' },
  { id: 'POOL-3M-20260629-0043', type: '3 Min', asset: 'PAXG', openTime: '11:18:00', lockTime: '11:19:30', closeTime: '11:21:00', status: 'Locked', greenVol: '$9,200', redVol: '$7,850', greenCount: 28, redCount: 24, total: '$17,050' },
  { id: 'POOL-4H-20260629-0004', type: '4 Hour', asset: 'BTC', openTime: '07:00:00', lockTime: '10:00:00', closeTime: '11:00:00', status: 'Open', greenVol: '$156,300', redVol: '$142,800', greenCount: 890, redCount: 812, total: '$299,100' },
  { id: 'POOL-1D-20260629-0002', type: '1 Day', asset: 'PAXG', openTime: '00:00:00', lockTime: '20:00:00', closeTime: '00:00:00', status: 'Locked', greenVol: '$234,500', redVol: '$198,300', greenCount: 1240, redCount: 1085, total: '$432,800' },
  { id: 'POOL-3M-20260629-0044', type: '3 Min', asset: 'BTC', openTime: '11:15:00', lockTime: '11:16:30', closeTime: '11:18:00', status: 'Completed', greenVol: '$21,300', redVol: '$19,850', greenCount: 68, redCount: 62, total: '$41,150', result: 'Green' },
  { id: 'POOL-5M-20260629-0020', type: '5 Min', asset: 'PAXG', openTime: '11:10:00', lockTime: '11:13:00', closeTime: '11:15:00', status: 'Open', greenVol: '$35,600', redVol: '$38,200', greenCount: 102, redCount: 115, total: '$73,800' },
  { id: 'POOL-4H-20260629-0005', type: '4 Hour', asset: 'BTC', openTime: '06:00:00', lockTime: '09:00:00', closeTime: '10:00:00', status: 'Completed', greenVol: '$67,800', redVol: '$71,200', greenCount: 425, redCount: 398, total: '$139,000', result: 'Red' },
  { id: 'POOL-3M-20260629-0045', type: '3 Min', asset: 'PAXG', openTime: '11:12:00', lockTime: '11:13:30', closeTime: '11:15:00', status: 'Locked', greenVol: '$14,500', redVol: '$16,200', greenCount: 45, redCount: 52, total: '$30,700' },
  { id: 'POOL-1D-20260629-0003', type: '1 Day', asset: 'BTC', openTime: '00:00:00', lockTime: '20:00:00', closeTime: '00:00:00', status: 'Completed', greenVol: '$312,400', redVol: '$287,600', greenCount: 1890, redCount: 1652, total: '$600,000', result: 'Green' },
  { id: 'POOL-5M-20260629-0021', type: '5 Min', asset: 'BTC', openTime: '11:05:00', lockTime: '11:08:00', closeTime: '11:10:00', status: 'Open', greenVol: '$42,100', redVol: '$38,900', greenCount: 128, redCount: 118, total: '$81,000' },
  { id: 'POOL-3M-20260629-0046', type: '3 Min', asset: 'PAXG', openTime: '11:00:00', lockTime: '11:01:30', closeTime: '11:03:00', status: 'Open', greenVol: '$11,700', redVol: '$13,400', greenCount: 36, redCount: 41, total: '$25,100' },
];

export const rewardPoolsData = [
  { id: 'Pool 1', qualification: '$5,000', allocation: '40%', balance: '$42,180', qualified: 128, distributed: '$312,400', claimed: '$298,200', pending: '$14,200' },
  { id: 'Pool 2', qualification: '$25,000', allocation: '30%', balance: '$28,650', qualified: 45, distributed: '$186,300', claimed: '$172,100', pending: '$14,200' },
  { id: 'Pool 3', qualification: '$50,000', allocation: '20%', balance: '$18,420', qualified: 12, distributed: '$94,800', claimed: '$88,600', pending: '$6,200' },
  { id: 'Pool 4', qualification: '$100,000', allocation: '10%', balance: '$9,200', qualified: 4, distributed: '$38,500', claimed: '$35,200', pending: '$3,300' },
];

export const rewardMappings = [
  { id: 'RPM-000412', user: 'USR-00007', pool: 'Pool 1', amount: '$125.00', source: 'WD-002184', date: '2026-06-29', status: 'Unclaimed' },
  { id: 'RPM-000411', user: 'USR-00004', pool: 'Pool 1', amount: '$125.00', source: 'WD-002184', date: '2026-06-29', status: 'Unclaimed' },
  { id: 'RPM-000410', user: 'USR-00001', pool: 'Pool 2', amount: '$83.33', source: 'WD-002183', date: '2026-06-28', status: 'Claimed' },
  { id: 'RPM-000409', user: 'USR-00007', pool: 'Pool 1', amount: '$50.00', source: 'WD-002180', date: '2026-06-28', status: 'Claimed' },
  { id: 'RPM-000408', user: 'USR-00002', pool: 'Pool 1', amount: '$50.00', source: 'WD-002180', date: '2026-06-28', status: 'Claimed' },
];

export const settlementsData = [
  { id: 'SET-004821', pool: 'POOL-3M-20260629-0041', winner: 'Green', losingPool: '$14,920', userReward: '$10,444', referral: '$2,984', platform: '$1,492', date: '11:30 AM' },
  { id: 'SET-004820', pool: 'POOL-3M-20260629-0040', winner: 'Red', losingPool: '$8,900', userReward: '$6,230', referral: '$1,780', platform: '$890', date: '11:27 AM' },
  { id: 'SET-004819', pool: 'POOL-5M-20260629-0017', winner: 'Green', losingPool: '$22,400', userReward: '$15,680', referral: '$4,480', platform: '$2,240', date: '11:25 AM' },
  { id: 'SET-004818', pool: 'POOL-3M-20260629-0039', winner: 'Red', losingPool: '$18,600', userReward: '$13,020', referral: '$3,720', platform: '$1,860', date: '11:21 AM' },
  { id: 'SET-004817', pool: 'POOL-3M-20260629-0038', winner: 'Green', losingPool: '$6,200', userReward: '$4,340', referral: '$1,240', platform: '$620', date: '11:18 AM' },
];

export const withdrawalsData = [
  { id: 'WD-002190', user: 'USR-00007', type: 'Profit', requested: '$2,000', charge: '$200', net: '$1,800', status: 'Completed', date: '2026-06-29 11:20' },
  { id: 'WD-002189', user: 'USR-00004', type: 'Deposit', requested: '$500', charge: '$0', net: '$500', status: 'Completed', date: '2026-06-29 10:45' },
  { id: 'WD-002188', user: 'USR-00008', type: 'Profit', requested: '$1,500', charge: '$150', net: '$1,350', status: 'Pending', date: '2026-06-29 10:30' },
  { id: 'WD-002187', user: 'USR-00002', type: 'Deposit', requested: '$1,000', charge: '$0', net: '$1,000', status: 'Completed', date: '2026-06-29 09:15' },
  { id: 'WD-002186', user: 'USR-00001', type: 'Profit', requested: '$5,000', charge: '$500', net: '$4,500', status: 'Completed', date: '2026-06-28 22:30' },
  { id: 'WD-002185', user: 'USR-00005', type: 'Profit', requested: '$800', charge: '$80', net: '$720', status: 'Failed', date: '2026-06-28 20:10' },
];

export const auditLogs = [
  { id: 'LOG-028401', action: 'PoolSettled', ref: 'POOL-3M-0041', user: 'System', time: '11:30:01 AM', desc: 'Pool settled - Winner: Green' },
  { id: 'LOG-028400', action: 'RewardDistributed', ref: 'SET-004821', user: 'System', time: '11:30:00 AM', desc: 'Settlement rewards distributed to 55 winners' },
  { id: 'LOG-028399', action: 'PoolLocked', ref: 'POOL-5M-0018', user: 'System', time: '11:30:00 AM', desc: 'Pool locked for settlement' },
  { id: 'LOG-028398', action: 'WithdrawalExecuted', ref: 'WD-002190', user: 'USR-00007', time: '11:20:15 AM', desc: 'Profit wallet withdrawal $2,000' },
  { id: 'LOG-028397', action: 'TradePlaced', ref: 'POOL-3M-0042', user: 'USR-00004', time: '11:19:42 AM', desc: 'Green prediction $250' },
  { id: 'LOG-028396', action: 'UserSuspended', ref: 'USR-00003', user: 'Admin', time: '11:15:00 AM', desc: 'Account suspended - Wash trading detected' },
  { id: 'LOG-028395', action: 'ReferralPaid', ref: 'SET-004820', user: 'System', time: '11:27:02 AM', desc: 'Referral commissions distributed L1-L8' },
  { id: 'LOG-028394', action: 'RewardClaimed', ref: 'RPM-000410', user: 'USR-00001', time: '11:10:30 AM', desc: 'Reward Pool 2 claim $83.33' },
];

export const reportChartData = {
  daily: [
    { name: 'Jun 23', volume: 142000, revenue: 14200 },
    { name: 'Jun 24', volume: 168000, revenue: 16800 },
    { name: 'Jun 25', volume: 155000, revenue: 15500 },
    { name: 'Jun 26', volume: 189000, revenue: 18900 },
    { name: 'Jun 27', volume: 201000, revenue: 20100 },
    { name: 'Jun 28', volume: 176000, revenue: 17600 },
    { name: 'Jun 29', volume: 184000, revenue: 18400 },
  ],
  weekly: [
    { name: 'W22', volume: 820000, revenue: 82000 },
    { name: 'W23', volume: 945000, revenue: 94500 },
    { name: 'W24', volume: 1020000, revenue: 102000 },
    { name: 'W25', volume: 1180000, revenue: 118000 },
    { name: 'W26', volume: 1215000, revenue: 121500 },
  ],
};
