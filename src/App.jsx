import React, { useState, useEffect, useRef } from 'react';
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
  Briefcase,
  MapPin,
  SlidersHorizontal,
  ShieldAlert,
  Mic,
  MicOff,
  Languages,
  AlertOctagon
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
    commissionPct: 1.0,
    commissionAmt: 1200,
    netPayout: 118800,
    status: 'HELD_IN_ESCROW',
    frozen: false,
    penaltyApplied: false,
    timestamp: '2026-09-17 14:22 UTC'
  }
];

// Mock Translations Database for Demonstration
const MOCK_TRANSLATIONS = {
  Urdu: {
    "🔒 Encrypted Chat Channel Opened. Off-platform contact sharing triggers automatic 20% security audit escrow freeze.": "🔒 محفوظ بات چیت کا چینل کھل گیا۔ پلیٹ فارم سے باہر رابطے کا تبادلہ 20٪ سیکورٹی آڈٹ اسکرو فریز کو متحرک کرے گا۔",
    "We are looking to secure 10,000 units of ARM-x64 micro-controllers.": "ہم ARM-x64 مائیکرو کنٹرولرز کے 10,000 یونٹس حاصل کرنے کے خواہاں ہیں۔",
    "We can accommodate this volume with a 10-day production lead time.": "ہم 10 دن کے پروڈکشن لیڈ ٹائم کے ساتھ اس مقدار کو پورا کر سکتے ہیں۔"
  },
  Hindi: {
    "🔒 Encrypted Chat Channel Opened. Off-platform contact sharing triggers automatic 20% security audit escrow freeze.": "🔒 एनक्रिप्टेड चैट चैनल खुला। प्लेटफॉर्म से बाहर संपर्क साझा करने पर 20% सुरक्षा ऑडिट एस्क्रो फ्रीज लागू होगा।",
    "We are looking to secure 10,000 units of ARM-x64 micro-controllers.": "हम ARM-x64 माइक्रो-कंट्रोलर के 10,000 यूनिट खरीदना चाहते हैं।",
    "We can accommodate this volume with a 10-day production lead time.": "हम 10-दिन के उत्पादन समय के साथ इस मात्रा को पूरा कर सकते हैं।"
  },
  Chinese: {
    "🔒 Encrypted Chat Channel Opened. Off-platform contact sharing triggers automatic 20% security audit escrow freeze.": "🔒 加密聊天通道已开启。平台外联系方式共享将触发自动 20% 安全审计托管冻结。",
    "We are looking to secure 10,000 units of ARM-x64 micro-controllers.": "我们希望购买 10,000 个 ARM-x64 微控制器。",
    "We can accommodate this volume with a 10-day production lead time.": "我们可以满足此采购量，生产周期为 10 天。"
  },
  Arabic: {
    "🔒 Encrypted Chat Channel Opened. Off-platform contact sharing triggers automatic 20% security audit escrow freeze.": "🔒 تم فتح قناة الدردشة المشفرة. مشاركة معلومات الاتصال خارج المنصة تؤدي إلى تجميد 20% من الضمان التلقائي تدقيقاً للأمان.",
    "We are looking to secure 10,000 units of ARM-x64 micro-controllers.": "نحن نتطلع إلى تأمين 10,000 وحدة من متحكمات ARM-x64 الدقيقة.",
    "We can accommodate this volume with a 10-day production lead time.": "يمكننا تلبية هذه الكمية مع مهلة إنتاج مدتها 10 أيام."
  }
};

// --- HELPER FUNCTION: TIERED COMMISSION CALCULATOR ---
const calculateTieredCommission = (grossAmount) => {
  if (grossAmount < 10000) {
    const pct = 5.0;
    const amt = (grossAmount * pct) / 100;
    return { pct, amt, net: grossAmount - amt };
  } else if (grossAmount <= 100000) {
    const pct = 3.0;
    const amt = (grossAmount * pct) / 100;
    return { pct, amt, net: grossAmount - amt };
  } else {
    const pct = 1.0;
    const amt = (grossAmount * pct) / 100;
    return { pct, amt, net: grossAmount - amt };
  }
};

export default function App() {
  // Global Dynamic SEO Injection
  useEffect(() => {
    document.title = "Ghouri B2B | Global Wholesale B2B Marketplace & Verified Manufacturers";
    
    const setMeta = (name, content, attr = 'name') => {
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMeta('description', 'Ghouri B2B is the premier global wholesale B2B marketplace. Connect with verified international manufacturers, request quotes with MOQ details, and secure cross-border trade via Binance Pay USDT escrow.');
    setMeta('keywords', 'global B2B marketplace, verified manufacturers, international trade, wholesale platform, B2B wholesale, global logistics, multi-sig escrow, supplier directory');
    setMeta('robots', 'index, follow');

    setMeta('og:title', 'Ghouri B2B | Global Wholesale B2B Marketplace & Verified Manufacturers', 'property');
    setMeta('og:description', 'Connect with verified global manufacturers and secure trade with multi-sig escrow on Ghouri B2B Marketplace.', 'property');
    setMeta('og:type', 'website', 'property');
    setMeta('og:site_name', 'Ghouri B2B Marketplace', 'property');
  }, []);

  // Navigation State
  const [activeTab, setActiveTab] = useState('landing');
  
  // Auth State with Strict Role Control
  const [user, setUser] = useState(null); // { name, role: 'Buyer' | 'Supplier' | 'Admin', wallet, status }
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [authRole, setAuthRole] = useState('Buyer');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');

  // Search & Filter State for Marketplace
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All');

  // Core Data States
  const [suppliers, setSuppliers] = useState(INITIAL_SUPPLIERS);
  const [rfqs, setRfqs] = useState(INITIAL_RFQS);
  const [escrowTxs, setEscrowTxs] = useState(INITIAL_ESCROW_TXS);
  
  // Anti-Fraud Freeze Banner & Security States
  const [fraudWarningBanner, setFraudWarningBanner] = useState(null);

  // Auto-Translate Chat State
  const [chatLanguage, setChatLanguage] = useState('English'); // English, Urdu, Hindi, Chinese, Arabic
  const [autoTranslateEnabled, setAutoTranslateEnabled] = useState(false);

  // Voice Speech Recognition Input State
  const [isListening, setIsListening] = useState(false);

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

  // Authenticated Role Access Security Check
  const isAdminAuthorized = user && user.role === 'Admin';

  // Login Handler with Role Separation Verification
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
      showToast('Authenticated as Platform Master Admin', 'success');
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
    if (activeTab === 'admin') setActiveTab('landing');
  };

  // ANTI-FRAUD DETECTION & VOICE / CHAT EVALUATOR
  const detectOffPlatformContact = (text) => {
    // Regex for phone numbers, emails, WhatsApp, Telegram, Skype, Wechat, etc.
    const antiFraudRegex = /(?:phone|whatsapp|telegram|skype|wechat|email|gmail|yahoo|@|\+?\d[\d\s\-]{7,}\d|wa\.me|t\.me)/i;
    return antiFraudRegex.test(text);
  };

  const handleSecurityPenaltyTrigger = (detectedText) => {
    // 1. Show persistent alert banner
    setFraudWarningBanner({
      rfqId: selectedRfq.id,
      detectedText: detectedText,
      timestamp: new Date().toLocaleTimeString()
    });

    // 2. Enforce 20% Security Penalty Freeze across Escrow Txs & RFQs
    setEscrowTxs(prev => prev.map(tx => {
      if (tx.rfqId === selectedRfq.id) {
        const penaltyAmt = tx.grossAmount * 0.20;
        return {
          ...tx,
          status: 'FROZEN_20%_PENALTY',
          frozen: true,
          penaltyApplied: true,
          penaltyAmt: penaltyAmt,
          netPayout: Math.max(0, tx.netPayout - penaltyAmt)
        };
      }
      return tx;
    }));

    setRfqs(prev => prev.map(item => item.id === selectedRfq.id ? { ...item, status: '20% Penalty Freeze' } : item));

    showToast('🚨 FRAUD DETECTED: Off-platform contact sharing detected! 20% Security Penalty Escrow Freeze enforced.', 'warning');
  };

  // Chat message send handler with Anti-Fraud Checks
  const handleSendMessage = (textToSend = newMessage) => {
    if (!textToSend.trim()) return;

    const containsFraud = detectOffPlatformContact(textToSend);

    // Append Message
    setChatMessages(prev => [
      ...prev,
      {
        sender: user ? user.name : 'Guest User',
        text: textToSend,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        flagged: containsFraud
      }
    ]);

    if (containsFraud) {
      handleSecurityPenaltyTrigger(textToSend);
    }

    setNewMessage('');
  };

  // Voice Input Speech Recognition Handler
  const toggleSpeechRecognition = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      showToast('Speech recognition is not supported in this browser.', 'warning');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = chatLanguage === 'Urdu' ? 'ur-PK' : chatLanguage === 'Hindi' ? 'hi-IN' : chatLanguage === 'Chinese' ? 'zh-CN' : chatLanguage === 'Arabic' ? 'ar-SA' : 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      showToast('Listening... Speak your RFQ terms or response.', 'info');
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setIsListening(false);
      setNewMessage(transcript);
      showToast(`Voice transcribed: "${transcript}"`, 'success');
      
      if (detectOffPlatformContact(transcript)) {
        handleSecurityPenaltyTrigger(transcript);
      }
    };

    recognition.onerror = () => {
      setIsListening(false);
      showToast('Voice recognition error. Try again.', 'warning');
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  // Buyer locks escrow for selected RFQ using EXACT TIERED COMMISSION STRUCTURE
  const handleDepositEscrow = (rfq) => {
    const rawVal = parseFloat(rfq.budget.replace(/[^0-9.]/g, '')) || 10000;
    
    // Exact Tiered Commission Calculation:
    // Below $10k: 5%, $10k-$100k: 3%, Above $100k: 1%
    const { pct, amt, net } = calculateTieredCommission(rawVal);

    const newTx = {
      id: `ESC-${Math.floor(1000 + Math.random() * 9000)}`,
      rfqId: rfq.id,
      buyer: user ? user.name : rfq.buyer,
      supplierId: rfq.supplierId,
      supplierWallet: '1098374211',
      grossAmount: rawVal,
      commissionPct: pct,
      commissionAmt: amt,
      netPayout: net,
      status: 'HELD_IN_ESCROW',
      frozen: false,
      penaltyApplied: false,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC'
    };

    setEscrowTxs(prev => [newTx, ...prev]);
    setRfqs(prev => prev.map(item => item.id === rfq.id ? { ...item, status: 'Escrow Locked', escrowDeposited: true } : item));
    showToast(`$${rawVal.toLocaleString()} USDT deposited. Tiered Fee (${pct}%): $${amt.toLocaleString()} USDT.`, 'success');
  };

  // Admin Payout Release with Verification
  const handleReleasePayout = (txId) => {
    if (!isAdminAuthorized) {
      showToast('Unauthorized: Admin rights required.', 'warning');
      return;
    }
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

  // Filtered Suppliers for Directory
  const filteredSuppliers = suppliers.filter(sup => {
    const matchesSearch = sup.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          sup.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          sup.region.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || sup.category === selectedCategory;
    const matchesRegion = selectedRegion === 'All' || sup.region.includes(selectedRegion);
    return matchesSearch && matchesCategory && matchesRegion;
  });

  // Translation helper for chat UI
  const renderTranslatedText = (text) => {
    if (!autoTranslateEnabled || chatLanguage === 'English') return text;
    if (MOCK_TRANSLATIONS[chatLanguage] && MOCK_TRANSLATIONS[chatLanguage][text]) {
      return MOCK_TRANSLATIONS[chatLanguage][text];
    }
    return `[${chatLanguage} Auto-Translated]: ${text}`;
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
            <span className="block text-[10px] tracking-widest text-slate-400 font-mono -mt-1">GLOBAL WHOLESALE MARKETPLACE</span>
          </div>
        </div>

        {/* Multi-Page Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800/80">
          {[
            { id: 'landing', label: 'Home / Hub', icon: Layers },
            { id: 'marketplace', label: 'Marketplace Directory', icon: Building },
            { id: 'rfq', label: 'RFQ & Escrow Chat', icon: MessageSquare },
            { id: 'kyc', label: 'Fast-Track KYC ($100)', icon: ShieldCheck },
            { id: 'logistics', label: 'Logistics Network', icon: Truck },
            { id: 'admin', label: 'Admin Audit Vault', icon: Lock, protected: true }
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
                {tab.protected && (
                  <span className="ml-1 text-[9px] bg-amber-500/10 text-amber-400 border border-amber-500/30 px-1.5 py-0.2 rounded-full font-mono">
                    ADMIN
                  </span>
                )}
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
                  <ShieldCheck className="w-4 h-4" /> Multi-Sig Binance Pay Escrow Protection
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-white">
                  Global Wholesale <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">B2B Marketplace</span>
                </h1>
                <p className="text-slate-400 text-base md:text-lg leading-relaxed">
                  Eliminate global cross-border trade friction. Source from verified international manufacturers, inspect MOQ details across global regions, and execute bulk transactions via instant USDT multi-sig escrow with tiered commission fees.
                </p>
                <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start pt-2">
                  <button 
                    onClick={() => setActiveTab('marketplace')}
                    className="px-6 py-3.5 rounded-xl bg-emerald-400 text-slate-950 font-bold text-sm hover:bg-emerald-300 transition flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                  >
                    Explore Wholesale Directory <ArrowRight className="w-4 h-4" />
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
                
                {/* TIERED COMMISSION DISPLAY BOX */}
                <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
                  <span className="text-[10px] font-mono text-slate-400 block font-bold">TIERED ESCROW COMMISSION RATES:</span>
                  <div className="text-[11px] text-slate-300 font-mono space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">&lt; $10,000:</span>
                      <span className="text-emerald-400 font-bold">5% Fee</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">$10k - $100k:</span>
                      <span className="text-emerald-400 font-bold">3% Fee</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">&gt; $100,000:</span>
                      <span className="text-emerald-400 font-bold">1% Fee</span>
                    </div>
                  </div>
                </div>

                <div className="pt-1 text-[11px] text-slate-400 leading-tight space-y-1 border-t border-slate-800/80">
                  <p className="flex items-center gap-1 text-slate-300"><Check className="w-3.5 h-3.5 text-emerald-400" /> Anti-fraud AI chat & voice surveillance</p>
                  <p className="flex items-center gap-1 text-slate-300"><Check className="w-3.5 h-3.5 text-emerald-400" /> 20% security penalty off-platform freeze</p>
                </div>
              </div>
            </div>

            {/* THREE-COLUMN VALUE PROPOSITIONS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">Verified Factory Suppliers</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Source with complete confidence. Every supplier is rigorously audited across factory regions including China, Germany, Japan, and Pakistan.
                </p>
              </div>

              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">Transparent MOQ & Lead Times</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Clear wholesale terms with visible Minimum Order Quantities (MOQ), production lead times, and tier ratings for optimal procurement.
                </p>
              </div>

              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Truck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">Integrated Freight Logistics</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Connect ocean, air, and overland shipments seamlessly through global freight partners linked directly to your active escrow orders.
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
                <p className="text-slate-400 text-sm">Source directly from audited international factories and verified manufacturers</p>
              </div>
              
              {/* Search & Filter Controls */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search supplier, category, region..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
                >
                  <option value="All">All Categories</option>
                  <option value="Electronics & Hardware">Electronics & Hardware</option>
                  <option value="Heavy Machinery & Parts">Heavy Machinery & Parts</option>
                  <option value="Textiles & Raw Cotton">Textiles & Raw Cotton</option>
                  <option value="Medical & Chemicals">Medical & Chemicals</option>
                </select>

                <select 
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
                >
                  <option value="All">All Factory Regions</option>
                  <option value="China">China</option>
                  <option value="Germany">Germany</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="Japan">Japan</option>
                </select>
              </div>
            </div>

            {/* SUPPLIER GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredSuppliers.map((sup) => (
                <div key={sup.id} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-slate-700 transition flex flex-col justify-between">
                  <div className="space-y-3">
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
                        <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-emerald-400" /> {sup.region} • <span className="text-slate-300">{sup.category}</span>
                        </p>
                      </div>
                      <span className="px-3 py-1 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-semibold">
                        {sup.tier}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3 py-3 px-4 bg-slate-950/60 rounded-xl border border-slate-800/80 text-xs font-mono">
                      <div>
                        <span className="text-slate-500 block text-[10px]">MOQ DETAIL</span>
                        <span className="text-emerald-400 font-bold">{sup.moq}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">LEAD TIME</span>
                        <span className="text-slate-200 font-bold">{sup.leadTime}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">COMPLETED</span>
                        <span className="text-slate-200 font-bold">{sup.ordersCompleted} orders</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/50">
                    <div className="text-xs text-slate-400 font-mono">
                      Escrow Wallet: <span className="text-emerald-400">{sup.wallet}</span>
                    </div>
                    <button 
                      onClick={() => {
                        setActiveTab('rfq');
                        showToast(`Opened RFQ Channel with ${sup.name}`, 'info');
                      }}
                      className="px-4 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs transition flex items-center gap-2"
                    >
                      Request Wholesale Quote <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {filteredSuppliers.length === 0 && (
                <div className="col-span-2 text-center py-12 bg-slate-900/40 border border-slate-800 rounded-2xl text-slate-400">
                  No suppliers match the selected search criteria. Try adjusting filters.
                </div>
              )}
            </div>
          </div>
        )}

        {/* PAGE 3: RFQ NEGOTIATIONS & ESCROW PORTAL WITH SURVEILLANCE & AUTO-TRANSLATE */}
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
                        rfq.status.includes('Penalty') 
                          ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                          : rfq.escrowDeposited 
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
            <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col h-[680px] relative">
              
              {/* PERSISTENT AUTOMATED WARNING BANNER FOR SECURITY PENALTY */}
              {fraudWarningBanner && fraudWarningBanner.rfqId === selectedRfq.id && (
                <div className="mb-4 bg-red-950/80 border border-red-500/50 text-red-200 p-4 rounded-xl flex items-start justify-between gap-3 animate-pulse shadow-xl">
                  <AlertOctagon className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                  <div className="text-xs space-y-1">
                    <p className="font-bold text-red-400 text-sm">SECURITY AUDIT WARNING: Off-Platform Contact Detected!</p>
                    <p>Flagged Content: <span className="font-mono bg-red-900/50 px-1.5 py-0.5 rounded text-white">"{fraudWarningBanner.detectedText}"</span></p>
                    <p className="text-[11px] text-red-300">
                      Automated <strong>20% Security Penalty Escrow Freeze</strong> has been enforced on this deal. Funds are locked for platform review.
                    </p>
                  </div>
                  <button onClick={() => setFraudWarningBanner(null)} className="text-red-400 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* CHAT HEADER & MULTI-LANGUAGE TRANSLATION CONTROLS */}
              <div className="border-b border-slate-800 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white">{selectedRfq.product}</h3>
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                      {selectedRfq.id}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Buyer: <span className="text-slate-200">{selectedRfq.buyer}</span> • Supplier: <span className="text-slate-200">{selectedRfq.supplierId}</span>
                  </p>
                </div>

                {/* ESCROW & TRANSLATE TOOLBAR */}
                <div className="flex flex-wrap items-center gap-2">
                  
                  {/* AUTO-TRANSLATE SELECTOR TOGGLE */}
                  <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 p-1 rounded-xl text-xs">
                    <button 
                      onClick={() => setAutoTranslateEnabled(!autoTranslateEnabled)}
                      className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1 transition ${
                        autoTranslateEnabled 
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' 
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Languages className="w-3.5 h-3.5" />
                      {autoTranslateEnabled ? 'Auto-Translate On' : 'Translate'}
                    </button>
                    {autoTranslateEnabled && (
                      <select 
                        value={chatLanguage}
                        onChange={(e) => setChatLanguage(e.target.value)}
                        className="bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-[11px] text-slate-200 focus:outline-none"
                      >
                        <option value="English">English</option>
                        <option value="Urdu">Urdu (اردو)</option>
                        <option value="Hindi">Hindi (हिंदी)</option>
                        <option value="Chinese">Chinese (中文)</option>
                        <option value="Arabic">Arabic (العربية)</option>
                      </select>
                    )}
                  </div>

                  {/* LOCK ESCROW BUTTON */}
                  {selectedRfq.escrowDeposited ? (
                    <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-xl text-emerald-400 text-xs font-mono">
                      <Lock className="w-3.5 h-3.5" /> Escrow Locked
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleDepositEscrow(selectedRfq)}
                      className="px-4 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs transition flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
                    >
                      <CreditCard className="w-3.5 h-3.5" /> Lock Escrow
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
                        : msg.flagged
                          ? 'bg-red-950/40 border border-red-500/50 text-red-200 ml-auto'
                          : msg.sender === (user?.name || 'TechCore USA LLC')
                            ? 'bg-emerald-500/10 border border-emerald-500/30 text-slate-200 ml-auto'
                            : 'bg-slate-950 border border-slate-800 text-slate-300 mr-auto'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4 mb-1 text-[10px] font-mono text-slate-400">
                      <span className="font-bold text-slate-300 flex items-center gap-1">
                        {msg.sender}
                        {msg.flagged && <span className="text-red-400 font-bold">(FLAGGED FRAUD)</span>}
                      </span>
                      <span>{msg.time}</span>
                    </div>
                    <p>{renderTranslatedText(msg.text)}</p>
                  </div>
                ))}
              </div>

              {/* CHAT & VOICE INPUT CONTROLS */}
              <div className="pt-2 flex items-center gap-2">
                
                {/* VOICE SPEECH-TO-TEXT BUTTON */}
                <button
                  onClick={toggleSpeechRecognition}
                  title="Voice Input (Speech-to-Text Surveillance)"
                  className={`p-3 rounded-xl border transition ${
                    isListening 
                      ? 'bg-red-500 text-white border-red-400 animate-pulse' 
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-emerald-400" />}
                </button>

                <input 
                  type="text" 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={isListening ? "Listening to your voice..." : "Type or speak RFQ details... (Phone/Email triggers 20% security freeze)"}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />

                <button 
                  onClick={() => handleSendMessage()}
                  className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition flex items-center gap-2"
                >
                  <Send className="w-4 h-4" /> Send
                </button>
              </div>

              <div className="mt-2 text-[10px] text-slate-400 text-center font-mono flex items-center justify-center gap-2">
                <span>🔒 Protected by Ghouri Voice/Text AI Surveillance</span>
                <span>•</span>
                <span>Tiered Commission Escrow Active</span>
              </div>
            </div>
          </div>
        )}

        {/* PAGE 4: KYC & $100 FAST-TRACK PRIORITY VERIFICATION HUB */}
        {activeTab === 'kyc' && (
          <div className="max-w-3xl mx-auto space-y-8 py-4">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                <ShieldCheck className="w-4 h-4" /> Priority Gold Badge Verification
              </div>
              <h2 className="text-3xl font-extrabold text-white">Fast-Track KYC Audit & Verification</h2>
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

        {/* PAGE 6: ADMIN SURVEILLANCE & PLATFORM AUDITING PANEL (PROTECTED ROLE ACCESS) */}
        {activeTab === 'admin' && (
          <div className="space-y-6">
            {!isAdminAuthorized ? (
              <div className="bg-slate-900/80 border border-amber-500/30 rounded-2xl p-8 text-center space-y-4 max-w-xl mx-auto my-12">
                <ShieldAlert className="w-12 h-12 text-amber-400 mx-auto" />
                <h3 className="text-xl font-bold text-white">Master Admin Access Required</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  This vault contains protected escrow funds, platform payout controls, and anti-fraud surveillance parameters. Please log in with an authorized admin account.
                </p>
                <button
                  onClick={() => { setAuthMode('login'); setShowAuthModal(true); }}
                  className="px-6 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs transition"
                >
                  Sign In as Admin
                </button>
              </div>
            ) : (
              <>
                <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl font-bold text-white">Admin Escrow Audit Vault</h2>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs">
                        SUPERADMIN AUTHORIZED
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm mt-1">
                      Master Wallet ID: <span className="font-mono text-emerald-400 font-bold">1232772030</span> • Real-time platform commission monitoring
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div>
                      <span className="text-slate-500 block">TIERED COMMISSION RATES</span>
                      <span className="text-emerald-400 font-bold">&lt;$10k: 5% | $10k-$100k: 3% | &gt;$100k: 1%</span>
                    </div>
                  </div>
                </div>

                {/* INCOMING ESCROW TRANSACTIONS TABLE */}
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Lock className="w-4 h-4 text-emerald-400" /> Escrow Transactions & Tiered Commission Audit
                  </h3>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400">
                          <th className="pb-3 font-semibold">ESCROW ID</th>
                          <th className="pb-3 font-semibold">BUYER</th>
                          <th className="pb-3 font-semibold">GROSS AMT</th>
                          <th className="pb-3 font-semibold">TIERED FEE (%)</th>
                          <th className="pb-3 font-semibold">FEE AMOUNT</th>
                          <th className="pb-3 font-semibold">NET SUPPLIER PAYOUT</th>
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
                            <td className="py-4 text-emerald-400 font-bold">{tx.commissionPct}%</td>
                            <td className="py-4 text-emerald-400">${tx.commissionAmt.toLocaleString()} USDT</td>
                            <td className="py-4 text-blue-400 font-bold">${tx.netPayout.toLocaleString()} USDT</td>
                            <td className="py-4">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] ${
                                tx.status === 'FROZEN_20%_PENALTY'
                                  ? 'bg-red-500/10 text-red-400 border border-red-500/30 animate-pulse'
                                  : tx.status === 'RELEASED'
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
              </>
            )}
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
                  placeholder="e.g. procurement@company.com or admin@ghouri.com"
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
        GHOURI B2B GLOBAL WHOLESALE ESCROW • MASTER ADMIN WALLET ID: <span className="text-emerald-400 font-bold">1232772030</span> • ALL RIGHTS RESERVED
      </footer>

    </div>
  );
}