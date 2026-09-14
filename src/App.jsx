import React, { useState } from 'react';
import {
  Search,
  ShieldCheck,
  Globe,
  TrendingUp,
  Package,
  Award,
  Building2,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Sliders,
  Menu,
  X,
  Zap,
  Gift,
  DollarSign,
  Truck,
  Check,
  Eye,
  FileText,
  Clock,
  ArrowUpRight
} from 'lucide-react';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchCategory, setSearchCategory] = useState('Products');
  const [dealAmount, setDealAmount] = useState(25000);
  const [roleView, setRoleView] = useState('buyer'); // 'buyer' | 'supplier'
  const [activeStep, setActiveStep] = useState(2); // 1 to 5 tracker step
  const [rfqModalOpen, setRfqModalOpen] = useState(false);
  
  // Custom RFQ Simulator state
  const [rfqQty, setRfqQty] = useState(1000);
  const [rfqUnitPrice, setRfqUnitPrice] = useState(15);

  // Dynamic Tiered Escrow/Commission Logic (Deducted from Supplier Payout)
  const calculateCommission = (subtotal) => {
    let rateNum = 0.05;
    let rateStr = '5%';
    let tierName = 'Starter Tier (< $10K)';

    if (subtotal < 10000) {
      rateNum = 0.05;
      rateStr = '5%';
      tierName = 'Starter Tier (< $10K)';
    } else if (subtotal <= 100000) {
      rateNum = 0.03;
      rateStr = '3%';
      tierName = 'Growth Tier ($10K - $100K)';
    } else {
      rateNum = 0.01;
      rateStr = '1%';
      tierName = 'Enterprise Tier (> $100K)';
    }

    const fee = subtotal * rateNum;
    const netPayout = subtotal - fee;

    return {
      rateStr,
      rateNum,
      tierName,
      fee,
      buyerPayable: subtotal, // Buyer pays 100% exact subtotal with 0 fees
      supplierPayout: netPayout
    };
  };

  const calcResult = calculateCommission(dealAmount);
  const rfqSubtotal = rfqQty * rfqUnitPrice;
  const rfqCalc = calculateCommission(rfqSubtotal);

  const trackerSteps = [
    { id: 1, label: 'Order Placed', desc: 'RFQ Accepted & Contract Signed' },
    { id: 2, label: 'Escrow Funded', desc: 'Buyer Paid 100% Subtotal to Lock' },
    { id: 3, label: 'Dispatched', desc: 'Supplier Shipped Goods' },
    { id: 4, label: 'Customs Cleared', desc: 'Verified Import/Export Docs' },
    { id: 5, label: 'Delivered', desc: 'Escrow Released to Supplier' },
  ];

  const categories = [
    { name: 'Industrial Machinery', items: '120k+ Products', icon: Building2 },
    { name: 'Textiles & Apparel', items: '85k+ Products', icon: Package },
    { name: 'Chemicals & Raw Materials', items: '45k+ Products', icon: Sliders },
    { name: 'Consumer Electronics', items: '210k+ Products', icon: TrendingUp },
    { name: 'Agriculture & Food', items: '60k+ Products', icon: Award },
    { name: 'Logistics & Trade Services', items: '15k+ Providers', icon: Globe },
  ];

  const featuredSuppliers = [
    {
      name: 'Apex Industrial Corp.',
      country: 'Germany',
      rating: '4.9',
      verified: true,
      category: 'CNC Machinery & Robotics',
      transactions: '1,200+ Deals',
      unitPrice: 120
    },
    {
      name: 'Zhejiang Global Fabrics Co.',
      country: 'China',
      rating: '4.8',
      verified: true,
      category: 'Organic Cotton & Silk',
      transactions: '3,400+ Deals',
      unitPrice: 8
    },
    {
      name: 'Indus Agri Exporters',
      country: 'Pakistan',
      rating: '4.9',
      verified: true,
      category: 'Bulk Rice & Spices',
      transactions: '890+ Deals',
      unitPrice: 25
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white pb-12">
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 px-4 py-2 text-center text-xs sm:text-sm font-medium">
        <span>🎉 100% Free Platform Subscription | Empowering Global Small & Medium Suppliers & Buyers</span>
        <a href="#calculator" className="underline ml-2 font-semibold hover:text-slate-200">
          Check Settlement Rates &rarr;
        </a>
      </div>

      {/* 2. NAVIGATION BAR */}
      <nav className="border-b border-slate-800 bg-slate-950/90 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white p-2 rounded-lg font-black tracking-wider text-xl shadow-lg shadow-blue-500/20">
              GB
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white">Ghouri</span>
              <span className="text-xl font-light text-blue-500 ml-1">B2B</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
            <a href="#tracker" className="hover:text-blue-400 transition-colors">Live Order Tracker</a>
            <a href="#categories" className="hover:text-blue-400 transition-colors">Categories</a>
            <a href="#calculator" className="hover:text-blue-400 transition-colors">Economics & Pricing</a>
            <a href="#suppliers" className="hover:text-blue-400 transition-colors">Verified Suppliers</a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button className="text-sm font-medium text-slate-300 hover:text-white px-3 py-2 transition-colors">
              Sign In
            </button>
            <button className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-md transition-all active:scale-95">
              Register Business Free
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-300 hover:text-white p-2"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-slate-800 flex flex-col gap-3 text-sm font-medium">
            <a href="#tracker" onClick={() => setMobileMenuOpen(false)}>Live Order Tracker</a>
            <a href="#categories" onClick={() => setMobileMenuOpen(false)}>Categories</a>
            <a href="#calculator" onClick={() => setMobileMenuOpen(false)}>Economics & Pricing</a>
            <a href="#suppliers" onClick={() => setMobileMenuOpen(false)}>Verified Suppliers</a>
            <div className="flex flex-col gap-2 pt-2 border-t border-slate-800">
              <button className="w-full text-left py-2 text-slate-300">Sign In</button>
              <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold active:scale-95">
                Register Business Free
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* 3. HERO SECTION */}
      <section className="relative pt-8 sm:pt-12 pb-16 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full text-xs font-semibold text-blue-400">
              <ShieldCheck size={16} /> Verified Cross-Border B2B Escrow Marketplace
            </div>
            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              The World's Best B2B Marketplace for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">Global Small & Medium Suppliers and Buyers</span>
            </h1>

            <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
              100% Free Platform Subscription | Empowering Global Small & Medium Suppliers & Buyers. Buyers pay 0 extra fees; platform commission is deducted strictly from supplier payouts upon trade settlement.
            </p>

            {/* TRUST BADGE BAR */}
            <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl flex flex-col sm:flex-row items-start sm:items-center gap-3 max-w-2xl">
              <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg shrink-0">
                <Gift size={20} />
              </div>
              <div className="text-xs sm:text-sm text-slate-300">
                <strong className="text-emerald-400 font-semibold block">0% Subscription Fees & 0% Buyer Platform Markups</strong>
                Transparent tiered commission deducted solely on successful payout settlement.
              </div>
            </div>

            {/* SEARCH BAR */}
            <div className="bg-slate-900 border border-slate-800 p-2 rounded-xl shadow-2xl max-w-2xl">
              <div className="flex flex-col sm:flex-row gap-2">
                <select
                  value={searchCategory}
                  onChange={(e) => setSearchCategory(e.target.value)}
                  className="bg-slate-800 text-slate-200 text-xs sm:text-sm font-semibold rounded-lg px-3 py-2.5 outline-none border border-slate-700"
                >
                  <option>Products</option>
                  <option>Suppliers</option>
                  <option>Buyers (RFQs)</option>
                </select>
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 text-slate-500" size={18} />
                  <input
                    type="text"
                    placeholder="Search by product name, CAS number, or keyword..."
                    className="w-full bg-transparent pl-10 pr-4 py-2.5 text-slate-100 placeholder-slate-500 outline-none text-xs sm:text-sm"
                  />
                </div>
                <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-2.5 rounded-lg text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-95">
                  Search <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* METRICS */}
            <div className="pt-2 flex flex-wrap items-center gap-5 text-xs font-medium text-slate-400">
              <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-emerald-400" /> Buyer Pays Exact Subtotal</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-emerald-400" /> Insured Escrow Vault</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-emerald-400" /> Automated Customs Docs</span>
            </div>
          </div>

          <div className="md:col-span-5">
            {/* LIVE STREAM SIDEBAR */}
            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 shadow-xl space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">Live Escrow Stream</span>
                <span className="text-xs text-emerald-400 flex items-center gap-1 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span> Real-time
                </span>
              </div>
              {[
                { from: 'Buyer in UAE', item: '50 MT Refined Sugar', subtotal: '$24,500', buyerFee: '$0', status: 'Escrow Locked' },
                { from: 'Buyer in USA', item: '10,000 Pcs Cotton Hoodies', subtotal: '$42,000', buyerFee: '$0', status: 'Customs Cleared' },
                { from: 'Buyer in Germany', item: '2x CNC Milling Machines', subtotal: '$115,000', buyerFee: '$0', status: 'In Transit' },
              ].map((trade, idx) => (
                <div key={idx} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 text-xs">
                  <div className="flex justify-between text-slate-200 font-semibold mb-1">
                    <span>{trade.item}</span>
                    <span className="text-blue-400">{trade.subtotal}</span>
                  </div>
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>{trade.from}</span>
                    <span className="text-emerald-400 font-medium">Buyer Fee: {trade.buyerFee}</span>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-900 flex justify-between items-center text-[11px]">
                    <span className="text-slate-500">Status: {trade.status}</span>
                    <span className="text-slate-400 font-mono">Ghouri B2B Escrow</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. IN-APP LIVE ORDER & ESCROW/SHIPMENT TRACKER (KFC STYLE) */}
      <section id="tracker" className="py-12 px-4 sm:px-8 max-w-7xl mx-auto border-t border-slate-900">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">In-App Live Tracker</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Active Shipment & Settlement Pipeline</h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">Real-time status viewable by both counter-parties. Zero external SMS/fake triggers.</p>
            </div>

            {/* Buyer vs Supplier View Toggle */}
            <div className="bg-slate-950 p-1.5 rounded-xl border border-slate-800 flex items-center gap-1 self-start md:self-auto">
              <button
                onClick={() => setRoleView('buyer')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  roleView === 'buyer'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Buyer View
              </button>
              <button
                onClick={() => setRoleView('supplier')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  roleView === 'supplier'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Supplier View
              </button>
            </div>
          </div>

          {/* ACTIVE STEP SELECTOR & TIMELINE */}
          <div className="mb-8">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
              {trackerSteps.map((step) => {
                const isPassed = step.id <= activeStep;
                const isCurrent = step.id === activeStep;
                return (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(step.id)}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      isCurrent
                        ? 'bg-blue-600/10 border-blue-500 text-white shadow-lg shadow-blue-500/10'
                        : isPassed
                        ? 'bg-slate-950 border-slate-800 text-slate-300'
                        : 'bg-slate-950/40 border-slate-900 text-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider font-mono">Step {step.id}</span>
                      {isPassed && <CheckCircle2 size={14} className="text-emerald-400" />}
                    </div>
                    <div className="font-bold text-xs truncate">{step.label}</div>
                  </button>
                );
              })}
            </div>

            {/* PROGRESS BAR */}
            <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800 p-0.5">
              <div
                className="bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${(activeStep / 5) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* FINANCIAL SETTLEMENT BREAKDOWN (Dynamic based on Role View) */}
          <div className="bg-slate-950 rounded-xl p-5 border border-slate-800">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-4 mb-4">
              <div>
                <span className="text-xs text-slate-400">Order ID: <strong className="text-slate-200 font-mono">#GB-89240-TX</strong></span>
                <h3 className="text-lg font-bold text-white mt-0.5">Order Summary: 5,000 Pcs Organic Cotton Shirts</h3>
              </div>
              <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold rounded-full">
                Current Status: Step {activeStep} - {trackerSteps[activeStep - 1].label}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Left Column: Role-Specific Financial View */}
              <div className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-300 uppercase tracking-wider">
                    {roleView === 'buyer' ? 'Buyer Financial Breakdown' : 'Supplier Settlement Breakdown'}
                  </span>
                  <span className="text-emerald-400 font-mono font-bold">
                    {roleView === 'buyer' ? '0 Extra Platform Fee' : 'Net Settlement View'}
                  </span>
                </div>

                <div className="flex justify-between text-xs py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Product Quantity x Unit Price</span>
                  <span className="text-slate-200 font-mono">5,000 Pcs x $10.00</span>
                </div>

                <div className="flex justify-between text-xs py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Gross Product Subtotal</span>
                  <span className="text-slate-100 font-bold font-mono">$50,000.00</span>
                </div>

                {roleView === 'buyer' ? (
                  <>
                    <div className="flex justify-between text-xs py-1 border-b border-slate-800/60 text-emerald-400">
                      <span>Buyer Subscription / Platform Fee</span>
                      <span className="font-mono">$0.00 (100% Free)</span>
                    </div>
                    <div className="flex justify-between text-sm pt-2 font-bold text-white">
                      <span>Total Amount Payable to Escrow</span>
                      <span className="text-blue-400 font-mono">$50,000.00</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between text-xs py-1 border-b border-slate-800/60 text-amber-400">
                      <span>Tiered Platform Fee (3% Growth Tier)</span>
                      <span className="font-mono">-$1,500.00</span>
                    </div>
                    <div className="flex justify-between text-sm pt-2 font-bold text-white">
                      <span>Net Supplier Payout (on Step 5)</span>
                      <span className="text-emerald-400 font-mono">$48,500.00</span>
                    </div>
                  </>
                )}
              </div>

              {/* Right Column: Step Description & Action Panel */}
              <div className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Step Action Details</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {trackerSteps[activeStep - 1].desc}. Both parties can upload and inspect shipping waybills and customs compliance documents directly inside Ghouri B2B.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-mono">In-App Vault Protection</span>
                  <button
                    onClick={() => setActiveStep(activeStep < 5 ? activeStep + 1 : 1)}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95"
                  >
                    Simulate Next Step <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PRICING & TIERED COMMISSION CALCULATOR */}
      <section id="calculator" className="py-12 px-4 sm:px-8 max-w-7xl mx-auto border-t border-slate-900">
        <div className="bg-gradient-to-r from-slate-900 via-blue-950/30 to-slate-900 p-6 sm:p-10 rounded-2xl border border-slate-800">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Strict SME Trade Economics</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Transparent Supplier Commission Tiers</h2>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Buyers pay exact subtotal with 0% extra fees. Commission is deducted solely from supplier payout upon delivery:
              </p>

              <div className="space-y-2 font-mono text-xs text-slate-300">
                <div className="p-2.5 bg-slate-950/80 rounded-lg border border-slate-800 flex justify-between">
                  <span>Trades &lt; $10,000:</span>
                  <strong className="text-blue-400">5% Supplier Fee</strong>
                </div>
                <div className="p-2.5 bg-slate-950/80 rounded-lg border border-slate-800 flex justify-between">
                  <span>Trades $10,000 – $100,000:</span>
                  <strong className="text-blue-400">3% Supplier Fee</strong>
                </div>
                <div className="p-2.5 bg-slate-950/80 rounded-lg border border-slate-800 flex justify-between">
                  <span>Trades &gt; $100,000:</span>
                  <strong className="text-blue-400">1% Supplier Fee</strong>
                </div>
              </div>

              <div className="pt-2">
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Interactive Trade Value Slider: <span className="text-blue-400 font-bold">${dealAmount.toLocaleString()}</span>
                </label>
                <input
                  type="range"
                  min="1000"
                  max="200000"
                  step="1000"
                  value={dealAmount}
                  onChange={(e) => setDealAmount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <span className="text-xs text-slate-400">Calculated Rate Tier</span>
                  <span className="text-xs font-bold px-2.5 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full">
                    {calcResult.tierName}
                  </span>
                </div>

                <div className="flex justify-between items-center border-b border-slate-800 pb-2 text-xs">
                  <span className="text-slate-400">Buyer Total Payable (100% Subtotal)</span>
                  <span className="text-sm font-bold text-white">${calcResult.buyerPayable.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center border-b border-slate-800 pb-2 text-xs">
                  <span className="text-slate-400">Supplier Commission Rate</span>
                  <span className="text-xs font-bold text-amber-400">{calcResult.rateStr}</span>
                </div>

                <div className="flex justify-between items-center border-b border-slate-800 pb-2 text-xs">
                  <span className="text-slate-400">Deducted Platform Commission</span>
                  <span className="text-xs font-bold text-amber-400">-${calcResult.fee.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center pt-2 text-sm font-bold">
                  <span className="text-slate-200">Net Supplier Settlement Payout</span>
                  <span className="text-emerald-400 font-mono">${calcResult.supplierPayout.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CATEGORIES SECTION */}
      <section id="categories" className="py-12 px-4 sm:px-8 max-w-7xl mx-auto border-t border-slate-900">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Explore Market Sectors</h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">Direct access to verified international exporters and manufacturers.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <div
                key={index}
                className="bg-slate-900/60 border border-slate-800 p-5 rounded-xl hover:border-blue-500/50 hover:bg-slate-900 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-600/10 text-blue-400 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm group-hover:text-blue-400 transition-colors">{cat.name}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{cat.items}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. VERIFIED SUPPLIERS & RFQ MODAL TRIGGER */}
      <section id="suppliers" className="py-12 px-4 sm:px-8 max-w-7xl mx-auto border-t border-slate-900">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Featured Global Suppliers</h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">Audit-verified exporters ready for instant RFQ quotation.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {featuredSuppliers.map((supplier, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-white text-base">{supplier.name}</h3>
                  <p className="text-xs text-slate-400">{supplier.country} • {supplier.category}</p>
                </div>
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] px-2 py-0.5 rounded font-semibold flex items-center gap-1">
                  <ShieldCheck size={12} /> Verified
                </span>
              </div>
              <div className="pt-3 border-t border-slate-800/80 flex justify-between items-center text-xs">
                <span className="text-slate-400">Orders: <strong className="text-slate-200">{supplier.transactions}</strong></span>
                <span className="text-amber-400 font-bold">★ {supplier.rating}</span>
              </div>
              <button
                onClick={() => setRfqModalOpen(true)}
                className="w-full mt-4 bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/20 text-xs font-semibold py-2.5 rounded-lg transition-all active:scale-95"
              >
                Request Quote & Calculate Breakdown
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 8. RFQ BREAKDOWN MODAL */}
      {rfqModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setRfqModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <div>
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">In-App RFQ Estimator</span>
              <h3 className="text-xl font-bold text-white mt-1">Transparent Quote Breakdown</h3>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Target Quantity (Pcs/Units)</label>
                <input
                  type="number"
                  value={rfqQty}
                  onChange={(e) => setRfqQty(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Target Unit Price ($)</label>
                <input
                  type="number"
                  value={rfqUnitPrice}
                  onChange={(e) => setRfqUnitPrice(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono"
                />
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">Gross Product Subtotal:</span>
                <span className="text-slate-100 font-bold">${rfqSubtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-emerald-400">
                <span>Buyer Platform Extra Fee:</span>
                <span>$0.00 (0%)</span>
              </div>
              <div className="flex justify-between text-amber-400">
                <span>Supplier Fee ({rfqCalc.rateStr} Tier):</span>
                <span>-${rfqCalc.fee.toLocaleString()}</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-sm text-white">
                <span>Buyer Payable:</span>
                <span className="text-blue-400">${rfqCalc.buyerPayable.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-white">
                <span>Supplier Net Payout:</span>
                <span className="text-emerald-400">${rfqCalc.supplierPayout.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setRfqModalOpen(false)}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-lg text-xs transition-all active:scale-95"
              >
                Confirm & Send In-App RFQ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 9. FOOTER */}
      <footer className="border-t border-slate-900 bg-slate-950 pt-12 pb-8 px-4 sm:px-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-blue-600 text-white p-1.5 rounded font-black text-sm">GB</div>
              <span className="text-base font-bold text-white">Ghouri B2B</span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed mb-3">
              100% Free Platform Subscription | Empowering Global Small & Medium Suppliers & Buyers with transparent tiered settlement and in-app escrow tracking.
            </p>
            <p className="text-xs text-slate-500">© 2026 Ghouri B2B Trade Network Inc. All rights reserved.</p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-2 uppercase tracking-wider">Solutions</h4>
            <ul className="space-y-1.5 text-xs">
              <li><a href="#tracker" className="hover:text-white">Live Order Tracker</a></li>
              <li><a href="#calculator" className="hover:text-white">Tiered Settlement</a></li>
              <li><a href="#" className="hover:text-white">Customs Clearance</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-2 uppercase tracking-wider">Marketplace</h4>
            <ul className="space-y-1.5 text-xs">
              <li><a href="#categories" className="hover:text-white">All Sectors</a></li>
              <li><a href="#suppliers" className="hover:text-white">Verified Suppliers</a></li>
              <li><a href="#" className="hover:text-white">RFQ Engine</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-2 uppercase tracking-wider">Legal & Trust</h4>
            <ul className="space-y-1.5 text-xs">
              <li><a href="#" className="hover:text-white">Escrow Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white">Dispute Vault</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}