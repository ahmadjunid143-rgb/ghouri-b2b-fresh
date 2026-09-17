import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  TrendingUp, 
  Globe, 
  Truck, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  Search, 
  Filter, 
  MessageSquare, 
  Send, 
  DollarSign, 
  Layers, 
  Users, 
  Award, 
  ArrowRight, 
  Building, 
  CreditCard, 
  Cpu, 
  Eye, 
  Check, 
  X, 
  Download,
  ChevronRight,
  ExternalLink,
  Shield,
  Activity,
  Briefcase
} from 'lucide-react';

// --- INITIAL MOCK DATA ---
const INITIAL_SUPPLIERS = [
  {
    id: 'SUP-9021',
    name: 'Apex Industrial Tech Co.',
    region: 'Shenzhen, China',
    category: 'Electronics & Hardware',
    tier: 'Gold Tier',
    verified: true,
    rating: 4.9,
    ordersCompleted: 1420,
    wallet: '1098374211',
    moq: '500 Units',
    leadTime: '7-12 Days'
  },
  {
    id: 'SUP-4412',
    name: 'Bavaria Precision Motors GMBH',
    region: 'Munich, Germany',
    category: 'Heavy Machinery & Parts',
    tier: 'Platinum Tier',
    verified: true,
    rating: 5.0,
    ordersCompleted: 890,
    wallet: '8872103922',
    moq: '10 Units',
    leadTime: '14-21 Days'
  },
  {
    id: 'SUP-7730',
    name: 'Indus Valley Commodities Ltd',
    region: 'Karachi, Pakistan',
    category: 'Textiles & Raw Cotton',
    tier: 'Verified Supplier',
    verified: true,
    rating: 4.8,
    ordersCompleted: 2150,
    wallet: '5541098233',
    moq: '1,000 Yards',
    leadTime: '5-10 Days'
  },
  {
    id: 'SUP-3301',
    name: 'Tokyo BioPharma & Reagents',
    region: 'Tokyo, Japan',
    category: 'Medical & Chemicals',
    tier: 'Platinum Tier',
    verified: true,
    rating: 4.9,
    ordersCompleted: 640,
    wallet: '9920182734',
    moq: '100 Liters',
    leadTime: '3-7 Days'
  }
];

const INITIAL_RFQS = [
  {
    id: 'RFQ-8812',
    product: 'Custom Micro-Controller Chips (ARM-x64)',
    quantity: '10,000 Units',
    budget: '$45,000 USDT',
    buyer: 'TechCore USA LLC',
    supplierId: 'SUP-9021',
    status: 'In Negotiation',
    lockedRate: '$4.50 / Unit',
    escrowDeposited: false
  },
  {
    id: 'RFQ-9934',
    product: 'Industrial High-Torque Electric Motors',
    quantity: '50 Units',
    budget: '$120,000 USDT',
    buyer: 'Global Robotics Corp',
    supplierId: 'SUP-4412',
    status: 'Escrow Locked',
    lockedRate: '$2,400 / Unit',
    escrowDeposited: true
  }
];

const INITIAL_ESCROW_TXS = [
  {
    id: 'ESC-5011',
    rfqId: 'RFQ-9934',
    buyer: 'Global Robotics Corp',
    supplierId: 'SUP-4412',
    supplierWallet: '8872103922',
    grossAmount: 120000,
    commissionPct: 2.5,
    commissionAmt: 3000,
    netPayout: 117000,
    status: 'HELD_IN_ESCROW', // HELD_IN_ESCROW, RELEASED, REFUNDED
    timestamp: '2026-09-17 14:22 UTC'
  }
];

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState('landing');
  
  // Auth State
  const [user, setUser] = useState(null); // { name, role: 'Buyer' | 'Supplier' | 'Admin', wallet, status }
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [authRole, setAuthRole] = useState('Buyer');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');

  // Core Data States
  const [suppliers, setSuppliers] = useState(INITIAL_SUPPLIERS);
  const [rfqs, setRfqs] = useState(INITIAL_RFQS);
  const [escrowTxs, setEscrowTxs] = useState(INITIAL_ESCROW_TXS);
  
  // KYC Fast-Track Application States
  const [kycForm, setKycForm] = useState({
    entityName: '',
    regNumber: '',
    country: '',
    documentType: 'Certificate of Incorporation',
    fastTrackRequested: true,
    txHash: ''
  });
  const [kycSubmitted, setKycSubmitted] = useState(false);

  // Active RFQ Negotiation Chat Mock
  const [selectedRfq, setSelectedRfq] = useState(INITIAL_RFQS[0]);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'System', text: '🔒 Encrypted Chat Channel Opened. Off-platform contact sharing triggers automatic 20% security audit escrow freeze.', time: '10:00 AM' },
    { sender: 'TechCore USA LLC', text: 'We are looking to secure 10,000 units of ARM-x64 micro-controllers.', time: '10:02 AM' },
    { sender: 'Apex Industrial Tech Co.', text: 'We can accommodate this volume with a 10-day production lead time.', time: '10:05 AM' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  
  // Notification Toast
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'info') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Login handler
  const handleAuth = (e) => {
    e.preventDefault();
    if (!authEmail) return;
    
    if (authEmail.toLowerCase().includes('admin')) {
      setUser({
        name: 'Ghouri Master Admin',
        role: 'Admin',
        wallet: '1232772030',
        status: 'Superuser'
      });
      showToast('Logged in as Platform Master Admin', 'success');
    } else {
      setUser({
        name: authEmail.split('@')[0] || 'Enterprise User',
        role: authRole,
        wallet: authRole === 'Supplier' ? '9988221100' : '4455667788',
        status: 'Verified Standard'
      });
      showToast(`Welcome back, ${authEmail.split('@')[0]} (${authRole})`, 'success');
    }
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setUser(null);
    showToast('Signed out of session', 'info');
    setActiveTab('landing');
  };

  // Chat message send handler
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Check anti-fraud pattern (e.g. phone/email/telegram detection)
    const antiFraudRegex = /(?:phone|whatsapp|telegram|email|@|\+?\d{8,})/i;
    if (antiFraudRegex.test(newMessage)) {
      showToast('⚠️ WARNING: Off-platform communication flags account for 20% penalty freeze!', 'warning');
    }

    setChatMessages(prev => [
      ...prev,
      {
        sender: user ? user.name : 'Guest User',
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setNewMessage('');
  };

  // Buyer locks escrow for selected RFQ
  const handleDepositEscrow = (rfq) => {
    const rawVal = parseFloat(rfq.budget.replace(/[^0-9.]/g, '')) || 10000;
    const commPct = 2.5;
    const commAmt = (rawVal * commPct) / 100;
    const net = rawVal - commAmt;

    const newTx = {
      id: `ESC-${Math.floor(1000 + Math.random() * 9000)}`,
      rfqId: rfq.id,
      buyer: user ? user.name : rfq.buyer,
      supplierId: rfq.supplierId,
      supplierWallet: '1098374211',
      grossAmount: rawVal,
      commissionPct: commPct,
      commissionAmt: commAmt,
      netPayout: net,
      status: 'HELD_IN_ESCROW',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC'
    };

    setEscrowTxs(prev => [newTx, ...prev]);
    setRfqs(prev => prev.map(item => item.id === rfq.id ? { ...item, status: 'Escrow Locked', escrowDeposited: true } : item));
    showToast(`$${rawVal.toLocaleString()} USDT deposited into Admin Escrow (ID: 1232772030)`, 'success');
  };

  // Admin Payout Release
  const handleReleasePayout = (txId) => {
    setEscrowTxs(prev => prev.map(tx => tx.id === txId ? { ...tx, status: 'RELEASED' } : tx));
    showToast(`Escrow ${txId} released! Net payout dispatched to supplier wallet.`, 'success');
  };

  // Fast track submit
  const handleKycSubmit = (e) => {
    e.preventDefault();
    if (!kycForm.entityName || !kycForm.regNumber) {
      showToast('Please fill out required entity details', 'warning');
      return;
    }
    setKycSubmitted(true);
    showToast('Fast-Track Verification request submitted to Admin Vault.', 'success');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      
      {/* GLOBAL TOAST NOTIFICATION */}
      {toast && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-3 bg-slate-900 border border-emerald-500/40 text-slate-100 px-5 py-3 rounded-xl shadow-2xl backdrop-blur-xl animate-fade-in">
          <Activity className="w-5 h-5 text-emerald-400 animate-pulse" />
          <span className="text-sm font-medium">{toast.msg}</span>
        </div>
      )}

      {/* TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('landing')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-blue-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Globe className="w-6 h-6 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-emerald-400 bg-clip-text text-transparent">
              GHOURI <span className="text-emerald-400">B2B</span>
            </span>
            <span className="block text-[10px] tracking-widest text-slate-400 font-mono -mt-1">GLOBAL WHOLESALE ESCROW</span>
          </div>
        </div>

        {/* Multi-Page Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800/80">
          {[
            { id: 'landing', label: 'Home / Hub', icon: Layers },
            { id: 'marketplace', label: 'Marketplace', icon: Building },
            { id: 'rfq', label: 'RFQ & Escrow Chat', icon: MessageSquare },
            { id: 'kyc', label: 'Fast-Track KYC ($100)', icon: ShieldCheck },
            { id: 'logistics', label: 'Logistics Partner', icon: Truck },
            { id: 'admin', label: 'Admin Audit Vault', icon: Lock }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  isActive 
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* User Auth Section */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-xl">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xs">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-xs font-semibold text-slate-200 leading-none">{user.name}</p>
                <p className="text-[10px] text-emerald-400 font-mono mt-0.5">{user.role} • {user.status}</p>
              </div>
              <button 
                onClick={handleLogout} 
                className="text-xs text-slate-400 hover:text-slate-200 ml-2 border-l border-slate-800 pl-3 py-1"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => { setAuthMode('login'); setShowAuthModal(true); }}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition"
              >
                Sign In
              </button>
              <button
                onClick={() => { setAuthMode('signup'); setShowAuthModal(true); }}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 shadow-lg shadow-emerald-500/20 transition"
              >
                Join Global Trade
              </button>
            </div>
          )}
        </div>
      </header>

      {/* MOBILE NAV STRIP */}
      <div className="lg:hidden flex overflow-x-auto gap-2 bg-slate-900 p-2 border-b border-slate-800 no-scrollbar">
        {[
          { id: 'landing', label: 'Home' },
          { id: 'marketplace', label: 'Marketplace' },
          { id: 'rfq', label: 'RFQ Chat' },
          { id: 'kyc', label: 'KYC Verification' },
          { id: 'logistics', label: 'Logistics' },
          { id: 'admin', label: 'Admin Vault' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-medium ${
              activeTab === tab.id ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'text-slate-400'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* DYNAMIC PAGE ROUTING CONTENT */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8">

        {/* PAGE 1: LANDING & AUTH HUB */}
        {activeTab === 'landing' && (
          <div className="space-y-16 py-6">
            {/* HERO SECTION */}
            <div className="relative rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-8 md:p-14 overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="max-w-2xl space-y-6 relative z-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium">
                  <ShieldCheck className="w-4 h-4" /> Hardcoded Binance Pay Escrow Protection
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-white">
                  The World's Best Global Wholesale <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">B2B Marketplace</span>
                </h1>
                <p className="text-slate-400 text-base md:text-lg leading-relaxed">
                  Eliminate global cross-border trade friction. Execute bulk procurement backed by instant USDT TRC20 multi-sig escrow, anti-fraud locked negotiations, and $100 fast-track supplier verification.
                </p>
                <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start pt-2">
                  <button 
                    onClick={() => setActiveTab('marketplace')}
                    className="px-6 py-3.5 rounded-xl bg-emerald-400 text-slate-950 font-bold text-sm hover:bg-emerald-300 transition flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                  >
                    Explore Wholesale Catalog <ArrowRight className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setActiveTab('kyc')}
                    className="px-6 py-3.5 rounded-xl bg-slate-900 text-slate-200 border border-slate-700 hover:border-slate-500 font-semibold text-sm transition flex items-center gap-2"
                  >
                    Get Fast-Track Verified ($100)
                  </button>
                </div>
              </div>

              {/* LIVE ADMIN ESCROW HIGHLIGHT BOX */}
              <div className="w-full md:w-80 bg-slate-950/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-xl relative z-10 space-y-4 text-left shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-mono text-slate-400">MASTER ADMIN ESCROW</span>
                  <span className="inline-flex items-center gap-1.5 text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full font-mono border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span> ONLINE
                  </span>
                </div>
                <div className="space-y-2">
                  <span className="text-[11px] text-slate-400">Binance Pay ID / USDT TRC20:</span>
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl font-mono text-emerald-400 font-bold text-sm tracking-wider flex items-center justify-between">
                    <span>1232772030</span>
                    <Lock className="w-4 h-4 text-slate-500" />
                  </div>
                </div>
                <div className="pt-1 text-[11px] text-slate-400 leading-tight space-y-1">
                  <p className="flex items-center gap-1 text-slate-300"><Check className="w-3.5 h-3.5 text-emerald-400" /> Standard Fee: 2.5% per deal</p>
                  <p className="flex items-center gap-1 text-slate-300"><Check className="w-3.5 h-3.5 text-emerald-400" /> Guaranteed anti-fraud escrow lock</p>
                  <p className="flex items-center gap-1 text-slate-300"><Check className="w-3.5 h-3.5 text-emerald-400" /> Automated digital PDF invoice</p>
                </div>
              </div>
            </div>

            {/* THREE-COLUMN VALUE PROPOSITIONS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">Locked Anti-Fraud RFQ Chat</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Negotiate directly with factories. Platform surveillance blocks illegal off-site transfers with a enforced 20% penalty audit mechanism.
                </p>
              </div>

              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">$100 Priority Fast-Track KYC</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Skip the 14-day manual backlog. Pay $100 directly to Admin Vault for priority 24-hour verification, unlocking Gold supplier badges.
                </p>
              </div>

              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Truck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">Global Freight Logistics Hub</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Seamlessly bridge ocean, air, and rail transit routes through our integrated freight partner network with built-in escrow milestones.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* PAGE 2: B2B MARKETPLACE & SUPPLIER DIRECTORY */}
        {activeTab === 'marketplace' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-2xl border border-slate-800">
              <div>
                <h2 className="text-2xl font-bold text-white">Global B2B Wholesale Directory</h2>
                <p className="text-slate-400 text-sm">Source directly from audited factories and certified international manufacturers</p>
              </div>
              
              {/* Search & Filter Bar */}
              <div className="flex items-center gap-3">
                <div className="relative flex-1 md:w-72">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input 
                    type="text" 
                    placeholder="Search electronics, textiles..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-semibold text-slate-300 hover:border-slate-700">
                  <Filter className="w-4 h-4 text-slate-400" /> Filter
                </button>
              </div>
            </div>

            {/* SUPPLIER GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {suppliers.map((sup) => (
                <div key={sup.id} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-slate-700 transition">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-white">{sup.name}</h3>
                        {sup.verified && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                            <CheckCircle className="w-3 h-3" /> VERIFIED
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{sup.region} • <span className="text-slate-300">{sup.category}</span></p>
                    </div>
                    <span className="px-3 py-1 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-semibold">
                      {sup.tier}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 py-3 px-4 bg-slate-950/60 rounded-xl border border-slate-800/80 text-xs font-mono">
                    <div>
                      <span className="text-slate-500 block text-[10px]">MOQ</span>
                      <span className="text-slate-200 font-bold">{sup.moq}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">LEAD TIME</span>
                      <span className="text-slate-200 font-bold">{sup.leadTime}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">ORDERS</span>
                      <span className="text-slate-200 font-bold">{sup.ordersCompleted} fulfilled</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="text-xs text-slate-400 font-mono">
                      Binance Pay Bound: <span className="text-emerald-400">{sup.wallet}</span>
                    </div>
                    <button 
                      onClick={() => {
                        setActiveTab('rfq');
                        showToast(`Opened RFQ Channel with ${sup.name}`, 'info');
                      }}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition flex items-center gap-2"
                    >
                      Request Quote <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PAGE 3: RFQ NEGOTIATIONS & ESCROW PORTAL */}
        {activeTab === 'rfq' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* LEFT: RFQ SELECTOR LIST */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center justify-between">
                Active RFQ Channels
                <span className="text-xs text-emerald-400 font-mono">{rfqs.length} Active</span>
              </h3>
              <div className="space-y-3">
                {rfqs.map((rfq) => (
                  <div 
                    key={rfq.id}
                    onClick={() => setSelectedRfq(rfq)}
                    className={`p-4 rounded-xl border cursor-pointer transition ${
                      selectedRfq.id === rfq.id 
                        ? 'bg-slate-800/80 border-emerald-500/50 shadow-md' 
                        : 'bg-slate-950/40 border-slate-800/80 hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                      <span>{rfq.id}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                        rfq.escrowDeposited 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                          : 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                      }`}>
                        {rfq.status}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-slate-200 mt-2">{rfq.product}</p>
                    <div className="flex items-center justify-between text-xs text-slate-400 mt-2">
                      <span>Qty: {rfq.quantity}</span>
                      <span className="text-emerald-400 font-mono font-bold">{rfq.budget}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: LOCKED CHAT & ESCROW DEPOSIT ACTION HUB */}
            <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col h-[620px]">
              
              {/* CHAT HEADER */}
              <div className="border-b border-slate-800 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white">{selectedRfq.product}</h3>
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                      {selectedRfq.id}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Buyer: <span className="text-slate-200">{selectedRfq.buyer}</span> • Assigned Supplier: <span className="text-slate-200">{selectedRfq.supplierId}</span>
                  </p>
                </div>

                {/* LOCK ESCROW BUTTON */}
                <div>
                  {selectedRfq.escrowDeposited ? (
                    <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-4 py-2 rounded-xl text-emerald-400 text-xs font-mono">
                      <Lock className="w-4 h-4" /> Escrow Locked in Admin Vault
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleDepositEscrow(selectedRfq)}
                      className="px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs transition flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                    >
                      <CreditCard className="w-4 h-4" /> Deposit to Admin Escrow ({selectedRfq.budget})
                    </button>
                  )}
                </div>
              </div>

              {/* CHAT MESSAGES BODY */}
              <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-2 my-2 border-b border-slate-800/80">
                {chatMessages.map((msg, idx) => (
                  <div 
                    key={idx} 
                    className={`p-3.5 rounded-2xl max-w-xl text-xs leading-relaxed ${
                      msg.sender === 'System' 
                        ? 'bg-blue-500/10 border border-blue-500/30 text-blue-300 mx-auto text-center w-full'
                        : msg.sender === (user?.name || 'TechCore USA LLC')
                          ? 'bg-emerald-500/10 border border-emerald-500/30 text-slate-200 ml-auto'
                          : 'bg-slate-950 border border-slate-800 text-slate-300 mr-auto'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4 mb-1 text-[10px] font-mono text-slate-400">
                      <span className="font-bold text-slate-300">{msg.sender}</span>
                      <span>{msg.time}</span>
                    </div>
                    <p>{msg.text}</p>
                  </div>
                ))}
              </div>

              {/* CHAT INPUT AREA */}
              <div className="pt-2 flex items-center gap-3">
                <input 
                  type="text" 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type negotiation details... (Off-platform contact sharing triggers 20% penalty audit)"
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
                <button 
                  onClick={handleSendMessage}
                  className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition flex items-center gap-2"
                >
                  <Send className="w-4 h-4" /> Send
                </button>
              </div>

              <div className="mt-2 text-[10px] text-slate-400 text-center font-mono">
                🔒 Protected by Ghouri Multi-Sig Surveillance • Admin Master Escrow Wallet ID: <span className="text-emerald-400">1232772030</span>
              </div>
            </div>
          </div>
        )}

        {/* PAGE 4: KYC & $100 FAST-TRACK PRIORITY VERIFICATION HUB */}
        {activeTab === 'kyc' && (
          <div className="max-w-3xl mx-auto space-y-8 py-4">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                <ShieldCheck className="w-4 h-4" /> Instant VIP Trust Score Boost
              </div>
              <h2 className="text-3xl font-extrabold text-white">Priority Fast-Track KYC Verification</h2>
              <p className="text-slate-400 text-sm max-w-xl mx-auto">
                Bypass standard manual processing backlogs. Deposit $100 USDT directly to the Master Admin Vault for priority 24-hour business auditing.
              </p>
            </div>

            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
              
              {/* ADMIN PAYMENT ADDRESS BANNER */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">FAST-TRACK AUDIT PAYMENT ADDRESS:</span>
                  <span className="text-emerald-400 font-bold">$100.00 USDT (TRC20)</span>
                </div>
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-between font-mono text-sm text-emerald-400">
                  <span>Binance Pay ID / USDT TRC20: <strong className="text-white">1232772030</strong></span>
                  <Lock className="w-4 h-4 text-slate-500" />
                </div>
              </div>

              {kycSubmitted ? (
                <div className="p-8 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center space-y-3">
                  <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h3 className="text-lg font-bold text-white">Application Received for VIP Review</h3>
                  <p className="text-xs text-slate-300 max-w-md mx-auto">
                    Your $100 Fast-Track submission has been routed to Admin ID <span className="font-mono text-emerald-400">1232772030</span>. Expect status update within 24 hours.
                  </p>
                  <button 
                    onClick={() => setKycSubmitted(false)}
                    className="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold"
                  >
                    Submit Another Application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleKycSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Registered Business Entity Name</label>
                      <input 
                        type="text" 
                        required
                        value={kycForm.entityName}
                        onChange={(e) => setKycForm({ ...kycForm, entityName: e.target.value })}
                        placeholder="e.g. Apex Global Trade Ltd"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Tax / Registration Number</label>
                      <input 
                        type="text" 
                        required
                        value={kycForm.regNumber}
                        onChange={(e) => setKycForm({ ...kycForm, regNumber: e.target.value })}
                        placeholder="e.g. REG-9902182"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Country of Jurisdiction</label>
                      <input 
                        type="text" 
                        required
                        value={kycForm.country}
                        onChange={(e) => setKycForm({ ...kycForm, country: e.target.value })}
                        placeholder="e.g. United States / Germany"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Document Proof Type</label>
                      <select 
                        value={kycForm.documentType}
                        onChange={(e) => setKycForm({ ...kycForm, documentType: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                      >
                        <option>Certificate of Incorporation</option>
                        <option>International Tax License</option>
                        <option>Chamber of Commerce Registry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">$100 Fast-Track Payment TxHash / Binance Order ID</label>
                    <input 
                      type="text" 
                      required
                      value={kycForm.txHash}
                      onChange={(e) => setKycForm({ ...kycForm, txHash: e.target.value })}
                      placeholder="Paste Binance Pay Transaction ID or USDT TRC20 Hash"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs font-mono text-emerald-400 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs transition shadow-lg shadow-emerald-500/20"
                  >
                    Submit Fast-Track Application ($100 USD Fee Paid)
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* PAGE 5: GLOBAL LOGISTICS & PARTNER REFERRAL HUB */}
        {activeTab === 'logistics' && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-2">
              <h2 className="text-2xl font-bold text-white">Global Freight & Integrated Logistics Network</h2>
              <p className="text-slate-400 text-sm">
                Connect your B2B escrow orders with verified air, ocean, and intermodal freight partners worldwide.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Maersk Global Cargo', mode: 'Ocean Container Freight', speed: '18-25 Days', rate: '$1,800 / TEU' },
                { name: 'DHL Air Logistics VIP', mode: 'Express Air Cargo', speed: '3-5 Days', rate: '$4.20 / Kg' },
                { name: 'DB Schenker Overland', mode: 'Rail & Intermodal Trucking', speed: '7-10 Days', rate: '$850 / Pallet' }
              ].map((log, i) => (
                <div key={i} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{log.name}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{log.mode}</p>
                  </div>
                  <div className="space-y-1.5 pt-2 border-t border-slate-800/80 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Transit Speed:</span>
                      <span className="text-slate-200">{log.speed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Est. Rate:</span>
                      <span className="text-emerald-400 font-bold">{log.rate}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => showToast(`Linked ${log.name} to active RFQ Escrow order`, 'success')}
                    className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition"
                  >
                    Bind Logistics Partner
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PAGE 6: ADMIN SURVEILLANCE & PLATFORM AUDITING PANEL */}
        {activeTab === 'admin' && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-white">Admin Escrow Audit Vault</h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs">
                    SUPERADMIN ACCESS
                  </span>
                </div>
                <p className="text-slate-400 text-sm mt-1">
                  Master Wallet ID: <span className="font-mono text-emerald-400 font-bold">1232772030</span> • Real-time platform commission monitoring
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div>
                  <span className="text-slate-500 block">TIERED COMMISSION</span>
                  <span className="text-emerald-400 font-bold">2.5% Flat Rate</span>
                </div>
                <div className="border-l border-slate-800 pl-4">
                  <span className="text-slate-500 block">TOTAL IN VAULT</span>
                  <span className="text-white font-bold">$120,000.00 USDT</span>
                </div>
              </div>
            </div>

            {/* INCOMING ESCROW TRANSACTIONS TABLE */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-400" /> Incoming Escrow & Release Controls
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="pb-3 font-semibold">ESCROW ID</th>
                      <th className="pb-3 font-semibold">BUYER</th>
                      <th className="pb-3 font-semibold">GROSS AMT</th>
                      <th className="pb-3 font-semibold">ADMIN FEE (2.5%)</th>
                      <th className="pb-3 font-semibold">SUPPLIER PAYOUT</th>
                      <th className="pb-3 font-semibold">STATUS</th>
                      <th className="pb-3 font-semibold text-right">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {escrowTxs.map((tx) => (
                      <tr key={tx.id} className="hover:bg-slate-800/30">
                        <td className="py-4 font-bold text-white">{tx.id}</td>
                        <td className="py-4">{tx.buyer}</td>
                        <td className="py-4 text-slate-200">${tx.grossAmount.toLocaleString()} USDT</td>
                        <td className="py-4 text-emerald-400">${tx.commissionAmt.toLocaleString()} USDT</td>
                        <td className="py-4 text-blue-400">${tx.netPayout.toLocaleString()} USDT</td>
                        <td className="py-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] ${
                            tx.status === 'RELEASED'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                              : 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                          }`}>
                            {tx.status}
                          </span>
                        </td>
                        <td className="py-4 text-right space-x-2">
                          {tx.status === 'HELD_IN_ESCROW' && (
                            <button
                              onClick={() => handleReleasePayout(tx.id)}
                              className="px-3 py-1.5 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-sans font-bold text-xs transition"
                            >
                              Release Payout
                            </button>
                          )}
                          <button
                            onClick={() => showToast(`Generated PDF Invoice for ${tx.id}`, 'info')}
                            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-sans font-semibold text-xs transition inline-flex items-center gap-1"
                          >
                            <Download className="w-3 h-3" /> Invoice
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* AUTHENTICATION MODAL */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-6 relative shadow-2xl">
            <button 
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white">
                {authMode === 'login' ? 'Sign In to Ghouri B2B' : 'Create Enterprise Account'}
              </h3>
              <p className="text-xs text-slate-400">Access multi-sig escrow and global wholesale catalog</p>
            </div>

            {/* ROLE SELECTOR */}
            <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setAuthRole('Buyer')}
                className={`py-2 rounded-lg transition ${authRole === 'Buyer' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-slate-400'}`}
              >
                Wholesale Buyer
              </button>
              <button
                type="button"
                onClick={() => setAuthRole('Supplier')}
                className={`py-2 rounded-lg transition ${authRole === 'Supplier' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-slate-400'}`}
              >
                Factory Supplier
              </button>
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Corporate Email</label>
                <input 
                  type="email" 
                  required
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  placeholder="e.g. procurement@company.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
                <input 
                  type="password" 
                  required
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs transition shadow-lg shadow-emerald-500/20"
              >
                {authMode === 'login' ? 'Authenticate Account' : 'Register Wholesale Portal'}
              </button>
            </form>

            <div className="text-center text-xs text-slate-500">
              {authMode === 'login' ? (
                <span>Need an account? <button onClick={() => setAuthMode('signup')} className="text-emerald-400 hover:underline">Sign up</button></span>
              ) : (
                <span>Already registered? <button onClick={() => setAuthMode('login')} className="text-emerald-400 hover:underline">Sign in</button></span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 px-6 text-center text-xs text-slate-500 font-mono">
        GHOURI B2B GLOBAL WHOLESALE ESCROW • ADMIN MASTER WALLET ID: <span className="text-emerald-400 font-bold">1232772030</span> • ALL RIGHTS RESERVED
      </footer>

    </div>
  );
}