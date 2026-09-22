import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Globe, 
  Truck, 
  CheckCircle, 
  Search, 
  MessageSquare, 
  Send, 
  Layers, 
  Award, 
  ArrowRight, 
  Building, 
  CreditCard, 
  X, 
  Download,
  ChevronRight,
  Activity,
  MapPin,
  ShieldAlert,
  Mic,
  MicOff,
  Languages,
  AlertOctagon,
  Check
} from 'lucide-react';

// --- FULL COMPREHENSIVE GLOBAL COUNTRY LIST FOR ANALYTICS & TRACKING ---
const GLOBAL_COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia", 
  "Austria", "Azerbaijan", "Bahrain", "Bangladesh", "Belarus", "Belgium", "Belize", "Benin", 
  "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", 
  "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Chile", "China", "Colombia", 
  "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", 
  "Ecuador", "Egypt", "El Salvador", "Estonia", "Ethiopia", "Fiji", "Finland", "France", 
  "Georgia", "Germany", "Ghana", "Greece", "Guatemala", "Honduras", "Hong Kong", "Hungary", 
  "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", 
  "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", 
  "Lebanon", "Libya", "Lithuania", "Luxembourg", "Malaysia", "Maldives", "Mali", "Malta", 
  "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Morocco", "Mozambique", "Myanmar", 
  "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Nigeria", "North Macedonia", "Norway", 
  "Oman", "Pakistan", "Palestine", "Panama", "Paraguay", "Peru", "Philippines", "Poland", 
  "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saudi Arabia", "Senegal", "Serbia", 
  "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", 
  "Sudan", "Sweden", "Switzerland", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Tunisia", 
  "Turkey", "Turkmenistan", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", 
  "United States", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

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

// --- COMPLETE UI TRANSLATION DICTIONARY FOR REAL-TIME APP TRANSLATION ---
const UI_DICTIONARY = {
  Urdu: {
    "GLOBAL WHOLESALE MARKETPLACE": "عالمی ہول سیل مارکیٹ پلیس",
    "Home / Hub": "ہوم / ہب",
    "Marketplace Directory": "مارکیٹ ڈائرکٹری",
    "RFQ & Escrow Chat": "RFQ اور اسکرو چیٹ",
    "Fast-Track KYC ($100)": "فاسٹ ٹریک کے وائی سی ($100)",
    "Logistics Network": "لوجسٹکس نیٹ ورک",
    "Admin Audit Vault": "ایڈمن آڈٹ والٹ",
    "Sign In": "سائن ان کریں",
    "Join Global Trade": "عالمی تجارت میں شامل ہوں",
    "Sign Out": "سائن آؤٹ",
    "Global Wholesale": "عالمی ہول سیل",
    "B2B Marketplace": "بی ٹو بی مارکیٹ پلیس",
    "Hero_Description": "عالمی سرحد پار تجارت کی رکاوٹوں کو ختم کریں۔ تصدیق شدہ بین الاقوامی مینوفیکچررز سے سامان حاصل کریں، تمام علاقوں میں MOQ کی تفصیلات کا جائزہ لیں، اور تدریجی کمیشن فیس کے ساتھ محفوظ اسکرو کے ذریعے آرڈر مکمل کریں۔",
    "Explore Wholesale Directory": "ہول سیل ڈائرکٹری میں تلاش کریں",
    "Get Fast-Track Verified ($100)": "فاسٹ ٹریک تصدیق حاصل کریں ($100)",
    "MASTER ADMIN ESCROW": "ماسٹر ایڈمن اسکرو",
    "ONLINE": "آن لائن",
    "TIERED ESCROW COMMISSION RATES:": "اسکرو کمیشن کی تدریجی شرحیں:",
    "Anti-fraud AI chat & voice surveillance": "اینٹی فراڈ AI چیٹ اور صوتی نگرانی",
    "20% security penalty off-platform freeze": "پلیٹ فارم سے باہر رابطے پر 20٪ سیکورٹی پینلٹی فریز",
    "Verified Factory Suppliers": "تصدیق شدہ فیکٹری سپلائرز",
    "Verified_Desc": "مکمل اعتماد کے ساتھ سامان حاصل کریں۔ چین، جرمنی، جاپان اور پاکستان سمیت تمام صنعتی علاقوں میں ہر سپلائر کا مکمل معائنہ کیا جاتا ہے۔",
    "Transparent MOQ & Lead Times": "شفاف MOQ اور ڈیلیوری کا وقت",
    "MOQ_Desc": "کم از کم آرڈر کی مقدار (MOQ)، پروڈکشن لیڈ ٹائم، اور ٹائر ریٹنگ کی واضح معلومات کے ساتھ ہول سیل کی شرائط۔",
    "Integrated Freight Logistics": "مربوط فریٹ لوجسٹکس",
    "Freight_Desc": "اپنے سرگرم اسکرو آرڈرز کے ساتھ بحری، فضائی اور زمینی نقل و حمل کے عالمی شراکت داروں کو دیکھیں۔",
    "Global B2B Wholesale Directory": "عالمی بی ٹو بی ہول سیل ڈائرکٹری",
    "Marketplace_Sub": "تصدیق شدہ مینوفیکچررز اور آڈٹ شدہ کارخانوں سے براہ راست سامان حاصل کریں",
    "Search supplier, category, region...": "سپلائر، کیٹیگری، یا علاقہ تلاش کریں...",
    "All Categories": "تمام کیٹیگریز",
    "All Factory Regions": "تمام فیکٹری کے علاقے",
    "Request Wholesale Quote": "ہول سیل کوٹ کی درخواست کریں",
    "Active RFQ Channels": "سرگرم RFQ چینلز",
    "Lock Escrow": "اسکرو لاک کریں",
    "Escrow Locked": "اسکرو لاک ہو گیا",
    "Type or speak RFQ details...": "RFQ تفصیلات ٹائپ کریں یا بولیں...",
    "Send": "بھیجیں",
    "Translate": "ترجمہ",
    "Auto-Translate On": "خودکار ترجمہ فعال",
    "Fast-Track KYC Audit & Verification": "فاسٹ ٹریک کے وائی سی آڈٹ اور تصدیق",
    "KYC_Sub": "عام پروسیسنگ تاخیر سے بچیں۔ ترجیحی 24 گھنٹے کے کاروباری آڈٹ کے لیے ماسٹر ایڈمن والٹ میں $100 USDT جمع کروائیں۔",
    "Submit Fast-Track Application ($100 USD Fee Paid)": "فاسٹ ٹریک درخواست جمع کروائیں ($100 فیس ادا کی گئی)",
    "Global Freight & Integrated Logistics Network": "عالمی فریٹ اور مربوط لوجسٹکس نیٹ ورک",
    "Bind Logistics Partner": "لوجسٹکس پارٹنر کو منسلک کریں",
    "Admin Escrow Audit Vault": "ایڈمن اسکرو آڈٹ والٹ",
    "Master Admin Access Required": "ماسٹر ایڈمن رسائی درکار ہے"
  },
  "Roman Urdu": {
    "GLOBAL WHOLESALE MARKETPLACE": "GLOBAL WHOLESALE MARKETPLACE",
    "Home / Hub": "Home / Hub",
    "Marketplace Directory": "Marketplace Directory",
    "RFQ & Escrow Chat": "RFQ & Escrow Chat",
    "Fast-Track KYC ($100)": "Fast-Track KYC ($100)",
    "Logistics Network": "Logistics Network",
    "Admin Audit Vault": "Admin Audit Vault",
    "Sign In": "Sign In",
    "Join Global Trade": "Join Global Trade",
    "Sign Out": "Sign Out",
    "Global Wholesale": "Global Wholesale",
    "B2B Marketplace": "B2B Marketplace",
    "Hero_Description": "Global trade ki mushkilat ko khatam karein. Verified international manufacturers se maal mangwayein, MOQ details dekhein, aur tiered commission rates ke sath USDT escrow se payments karein.",
    "Explore Wholesale Directory": "Wholesale Directory Dekhein",
    "Get Fast-Track Verified ($100)": "Fast-Track Verified Ho Jayein ($100)",
    "MASTER ADMIN ESCROW": "MASTER ADMIN ESCROW",
    "ONLINE": "ONLINE",
    "TIERED ESCROW COMMISSION RATES:": "TIERED ESCROW COMMISSION RATES:",
    "Anti-fraud AI chat & voice surveillance": "Anti-fraud AI chat & voice surveillance",
    "20% security penalty off-platform freeze": "20% security penalty off-platform freeze",
    "Verified Factory Suppliers": "Verified Factory Suppliers",
    "Verified_Desc": "Mukammal aitmad ke sath sourcing karein. China, Germany, Japan, aur Pakistan ke tamam audited suppliers.",
    "Transparent MOQ & Lead Times": "Transparent MOQ & Lead Times",
    "MOQ_Desc": "Clear wholesale terms, visible Minimum Order Quantities (MOQ), aur production lead times.",
    "Integrated Freight Logistics": "Integrated Freight Logistics",
    "Freight_Desc": "Ocean, air, aur overland shipments ko apne active escrow orders se connect karein.",
    "Global B2B Wholesale Directory": "Global B2B Wholesale Directory",
    "Marketplace_Sub": "Audited factories aur verified manufacturers se direct khareedein",
    "Search supplier, category, region...": "Supplier, category, ya region dhoondein...",
    "All Categories": "All Categories",
    "All Factory Regions": "All Factory Regions",
    "Request Wholesale Quote": "Wholesale Quote Request Karein",
    "Active RFQ Channels": "Active RFQ Channels",
    "Lock Escrow": "Lock Escrow",
    "Escrow Locked": "Escrow Locked",
    "Type or speak RFQ details...": "RFQ ki tafseelat likhein ya bolein...",
    "Send": "Bhejein",
    "Translate": "Translate",
    "Auto-Translate On": "Auto-Translate On",
    "Fast-Track KYC Audit & Verification": "Fast-Track KYC Audit & Verification",
    "KYC_Sub": "Manual processing backlog se bachein. Priority 24-hour verification ke liye $100 USDT deposit karein.",
    "Submit Fast-Track Application ($100 USD Fee Paid)": "Fast-Track Application Form Jama Karein ($100 Paid)",
    "Global Freight & Integrated Logistics Network": "Global Freight & Integrated Logistics Network",
    "Bind Logistics Partner": "Logistics Partner Bind Karein",
    "Admin Escrow Audit Vault": "Admin Escrow Audit Vault",
    "Master Admin Access Required": "Master Admin Access Required"
  },
  Hindi: {
    "GLOBAL WHOLESALE MARKETPLACE": "ग्लोबल होलसेल मार्केटप्लेस",
    "Home / Hub": "होम / हब",
    "Marketplace Directory": "मार्केटप्लेस डायरेक्टरी",
    "RFQ & Escrow Chat": "आरएफक्यू एवं एस्क्रो चैट",
    "Fast-Track KYC ($100)": "फास्ट-ट्रैक केवाईसी ($100)",
    "Logistics Network": "लॉजिस्टिक्स नेटवर्क",
    "Admin Audit Vault": "एडमिन ऑडिट वॉल्ट",
    "Sign In": "साइन इन करें",
    "Join Global Trade": "ग्लोबल ट्रेड से जुड़ें",
    "Sign Out": "साइन आउट",
    "Global Wholesale": "ग्लोबल होलसेल",
    "B2B Marketplace": "बी2बी मार्केटप्लेस",
    "Hero_Description": "अंतरराष्ट्रीय व्यापार बाधाओं को दूर करें। सत्यापित वैश्विक निर्माताओं से स्रोत प्राप्त करें, MOQ विवरण का निरीक्षण करें और यूएसडीटी एस्क्रो के माध्यम से सुरक्षित व्यापार निष्पादित करें।",
    "Explore Wholesale Directory": "होलसेल डायरेक्टरी देखें",
    "Get Fast-Track Verified ($100)": "फास्ट-ट्रैक सत्यापित हों ($100)",
    "MASTER ADMIN ESCROW": "मास्टर एडमिन एस्क्रो",
    "ONLINE": "ऑनलाइन",
    "TIERED ESCROW COMMISSION RATES:": "स्तरीय एस्क्रो कमीशन दरें:",
    "Anti-fraud AI chat & voice surveillance": "एंटी-फ्रॉड एआई चैट और वॉयस निगरानी",
    "20% security penalty off-platform freeze": "20% सुरक्षा जुर्माना ऑफ-प्लेटफॉर्म फ्रीज",
    "Verified Factory Suppliers": "सत्यापित फैक्ट्री आपूर्तिकर्ता",
    "Verified_Desc": "पूर्ण विश्वास के साथ स्रोत प्राप्त करें। चीन, जर्मनी, जापान और पाकिस्तान में हर आपूर्तिकर्ता का कड़ाई से ऑडिट किया जाता है।",
    "Transparent MOQ & Lead Times": "पारदर्शी MOQ और लीड समय",
    "MOQ_Desc": "न्यूनतम ऑर्डर मात्रा (MOQ) और उत्पादन लीड समय के साथ पारदर्शी थोक शर्तें।",
    "Integrated Freight Logistics": "एकीकृत माल ढुलाई लॉजिस्टिक्स",
    "Freight_Desc": "समुद्री, हवाई और भूमि परिवहन को अपने सक्रिय एस्क्रो ऑर्डर से सीधे जोड़ें।",
    "Global B2B Wholesale Directory": "ग्लोबल बी2बी होलसेल डायरेक्टरी",
    "Marketplace_Sub": "सत्यापित वैश्विक निर्माताओं से सीधे स्रोत प्राप्त करें",
    "Search supplier, category, region...": "आपूर्तिकर्ता, श्रेणी या क्षेत्र खोजें...",
    "All Categories": "सभी श्रेणियां",
    "All Factory Regions": "सभी फैक्ट्री क्षेत्र",
    "Request Wholesale Quote": "थोक कोटेशन का अनुरोध करें",
    "Active RFQ Channels": "सक्रिय आरएफक्यू चैनल",
    "Lock Escrow": "एस्क्रो लॉक करें",
    "Escrow Locked": "एस्क्रो लॉक किया गया",
    "Type or speak RFQ details...": "आरएफक्यू विवरण टाइप करें या बोलें...",
    "Send": "भेजें",
    "Translate": "अनुवाद",
    "Auto-Translate On": "ऑटो-अनुवाद चालू",
    "Fast-Track KYC Audit & Verification": "फास्ट-ट्रैक केवाईसी ऑडिट एवं सत्यापन",
    "KYC_Sub": "24 घंटे के व्यावसायिक ऑडिट के लिए सीधे मास्टर एडमिन वॉल्ट में $100 USDT जमा करें।",
    "Submit Fast-Track Application ($100 USD Fee Paid)": "फास्ट-ट्रैक आवेदन जमा करें ($100 शुल्क भुगतान किया गया)",
    "Global Freight & Integrated Logistics Network": "ग्लोबल फ्रेट एवं एकीकृत लॉजिस्टिक्स नेटवर्क",
    "Bind Logistics Partner": "लॉजिस्टिक्स पार्टनर जोड़ें",
    "Admin Escrow Audit Vault": "एडमिन एस्क्रो ऑडिट वॉल्ट",
    "Master Admin Access Required": "मास्टर एडमिन एक्सेस आवश्यक"
  },
  Arabic: {
    "GLOBAL WHOLESALE MARKETPLACE": "سوق الجملة العالمي B2B",
    "Home / Hub": "الرئيسية / المركز",
    "Marketplace Directory": "دليل السوق",
    "RFQ & Escrow Chat": "طلبات العروض والدردشة المضمونة",
    "Fast-Track KYC ($100)": "التحقق السريع KYC ($100)",
    "Logistics Network": "شبكة اللوجستيات",
    "Admin Audit Vault": "خزنة تدقيق المسؤول",
    "Sign In": "تسجيل الدخول",
    "Join Global Trade": "الانضمام للتجارة العالمية",
    "Sign Out": "تسجيل الخروج",
    "Global Wholesale": "الجملة العالمية",
    "B2B Marketplace": "سوق B2B",
    "Hero_Description": "القضاء على عقبات التجارة العالمية عبر الحدود. احصل على المنتجات من مصنعين دوليين معتمدين، وتفحص تفاصيل الحد الأدنى للطلب، ونفذ المعاملات بأمان عبر الضمان المشفر.",
    "Explore Wholesale Directory": "استكشف دليل الجملة",
    "Get Fast-Track Verified ($100)": "احصل على التحقق السريع ($100)",
    "MASTER ADMIN ESCROW": "ضمان المسؤول الرئيسي",
    "ONLINE": "متصل",
    "TIERED ESCROW COMMISSION RATES:": "نسب عمولة الضمان المتدرجة:",
    "Anti-fraud AI chat & voice surveillance": "مراقبة الدردشة والصوت الذكية لمنع الاحتيال",
    "20% security penalty off-platform freeze": "تجميد عقوبة أمنية بنسبة 20٪ لمشاركة الاتصال الخارجي",
    "Verified Factory Suppliers": "موردو المصانع المعتمدون",
    "Verified_Desc": "احصل على المنتجات بثقة تامة. يتم تدقيق كل مورد بدقة عبر مناطق المصانع بما في ذلك الصين وألمانيا واليابان وباكستان.",
    "Transparent MOQ & Lead Times": "حد أدنى شفاف للطلب وأوقات التسليم",
    "MOQ_Desc": "شروط جملة واضحة مع الحد الأدنى لكميات الطلب (MOQ) وأوقات مهلة الإنتاج.",
    "Integrated Freight Logistics": "اللوجستيات والشحن المتكامل",
    "Freight_Desc": "ربط الشحنات البحرية والجوية والبرية بسلاسة من خلال شركاء الشحن العالميين المربوطين مباشرة بأوامر الضمان النشطة.",
    "Global B2B Wholesale Directory": "دليل الجملة العالمي B2B",
    "Marketplace_Sub": "الشراء مباشرة من المصانع المعتمدة والمصنعين الموثوقين",
    "Search supplier, category, region...": "البحث عن المورد أو الفئة أو المنطقة...",
    "All Categories": "جميع الفئات",
    "All Factory Regions": "جميع مناطق المصانع",
    "Request Wholesale Quote": "طلب عرض سعر بالجملة",
    "Active RFQ Channels": "قنوات طلبات العروض النشطة",
    "Lock Escrow": "قفل الضمان",
    "Escrow Locked": "الضمان مقفل",
    "Type or speak RFQ details...": "اكتب أو تحدث بتفاصيل الطلب...",
    "Send": "إرسال",
    "Translate": "ترجمة",
    "Auto-Translate On": "الترجمة التلقائية مفعلة",
    "Fast-Track KYC Audit & Verification": "تدقيق والتحقق السريع KYC",
    "KYC_Sub": "تجنب تراكم معالجة البيانات اليدوية. أودع 100 دولار USDT مباشرة في خزنة المسؤول للتدقيق في غضون 24 ساعة.",
    "Submit Fast-Track Application ($100 USD Fee Paid)": "تقديم طلب التحقق السريع (تم دفع 100 دولار)",
    "Global Freight & Integrated Logistics Network": "شبكة الشحن واللوجستيات العالمية المتكاملة",
    "Bind Logistics Partner": "ربط شريك اللوجستيات",
    "Admin Escrow Audit Vault": "خزنة تدقيق الضمان للمسؤول",
    "Master Admin Access Required": "مطلوب وصول المسؤول الرئيسي"
  },
  Chinese: {
    "GLOBAL WHOLESALE MARKETPLACE": "全球批发 B2B 市场",
    "Home / Hub": "首页 / 枢纽",
    "Marketplace Directory": "批发目录",
    "RFQ & Escrow Chat": "询价与托管聊天",
    "Fast-Track KYC ($100)": "快速 KYC 认证 ($100)",
    "Logistics Network": "全球物流网络",
    "Admin Audit Vault": "管理员审计金库",
    "Sign In": "登录",
    "Join Global Trade": "加入全球贸易",
    "Sign Out": "退出登录",
    "Global Wholesale": "全球批发",
    "B2B Marketplace": "B2B 交易平台",
    "Hero_Description": "消除跨境贸易壁垒。直接从经过认证的全球工厂采购，查看详细的最小起订量 (MOQ) 和生产周期，并通过阶梯式佣金 USDT 托管保护批量交易。",
    "Explore Wholesale Directory": "浏览批发目录",
    "Get Fast-Track Verified ($100)": "获取绿色通道认证 ($100)",
    "MASTER ADMIN ESCROW": "主管理员托管",
    "ONLINE": "在线",
    "TIERED ESCROW COMMISSION RATES:": "阶梯式托管佣金费率：",
    "Anti-fraud AI chat & voice surveillance": "防欺诈 AI 聊天与语音监控",
    "20% security penalty off-platform freeze": "平台外联系将触发 20% 自动安全冻结",
    "Verified Factory Suppliers": "经过认证的工厂供应商",
    "Verified_Desc": "充满信心地进行采购。我们在中国、德国、日本和巴基斯坦等工厂集中区对每家供应商进行严格审核。",
    "Transparent MOQ & Lead Times": "透明的 MOQ 与交货周期",
    "MOQ_Desc": "清晰的批发条款，显示最小起订量 (MOQ)、生产交货时间和等级评估。",
    "Integrated Freight Logistics": "集成货运物流",
    "Freight_Desc": "通过直接与您的托管订单相连的全球货运合作伙伴，无缝连接海运、空运和陆运。",
    "Global B2B Wholesale Directory": "全球 B2B 批发目录",
    "Marketplace_Sub": "直接从经过审核的工厂和经过认证的制造商处采购",
    "Search supplier, category, region...": "搜索供应商、品类或地区...",
    "All Categories": "所有品类",
    "All Factory Regions": "所有工厂地区",
    "Request Wholesale Quote": "请求批发报价",
    "Active RFQ Channels": "活跃的询价通道",
    "Lock Escrow": "锁定托管",
    "Escrow Locked": "托管已锁定",
    "Type or speak RFQ details...": "输入或语音说话描述询价细节...",
    "Send": "发送",
    "Translate": "翻译",
    "Auto-Translate On": "自动翻译已开启",
    "Fast-Track KYC Audit & Verification": "绿色通道 KYC 审核与认证",
    "KYC_Sub": "绕过标准人工审核排队。直接向主管理员金库存入 $100 USDT，享受 24 小时优先审核。",
    "Submit Fast-Track Application ($100 USD Fee Paid)": "提交绿色通道申请（已支付 $100 费用）",
    "Global Freight & Integrated Logistics Network": "全球货运与综合物流网络",
    "Bind Logistics Partner": "绑定物流合作伙伴",
    "Admin Escrow Audit Vault": "管理员托管审计金库",
    "Master Admin Access Required": "需要主管理员权限"
  }
};

const MOCK_CHAT_TRANSLATIONS = {
  Urdu: {
    "🔒 Encrypted Chat Channel Opened. Off-platform contact sharing triggers automatic 20% security audit escrow freeze.": "🔒 محفوظ بات چیت کا چینل کھل گیا۔ پلیٹ فارم سے باہر رابطے کا تبادلہ 20٪ سیکورٹی آڈٹ اسکرو فریز کو متحرک کرے گا۔",
    "We are looking to secure 10,000 units of ARM-x64 micro-controllers.": "ہم ARM-x64 مائیکرو کنٹرولرز کے 10,000 یونٹس حاصل کرنے کے خواہاں ہیں۔",
    "We can accommodate this volume with a 10-day production lead time.": "ہم 10 دن کے پروڈکشن لیڈ ٹائم کے ساتھ اس مقدار کو پورا کر سکتے ہیں۔"
  },
  "Roman Urdu": {
    "🔒 Encrypted Chat Channel Opened. Off-platform contact sharing triggers automatic 20% security audit escrow freeze.": "🔒 Encrypted chat channel khul gaya hai. Platform se bahar rabta share karne par automatic 20% security audit escrow freeze ho jayega.",
    "We are looking to secure 10,000 units of ARM-x64 micro-controllers.": "Hum ARM-x64 micro-controllers ke 10,000 units khareedna chahte hain.",
    "We can accommodate this volume with a 10-day production lead time.": "Hum 10 din ke production lead time ke sath yeh volume poora kar sakte hain."
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

  const [activeTab, setActiveTab] = useState('landing');
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [authRole, setAuthRole] = useState('Buyer');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');

  // Header Selectors State (Tracking Country & Dynamic Language Translation)
  const [selectedHeaderCountry, setSelectedHeaderCountry] = useState('United States');
  const [selectedHeaderLanguage, setSelectedHeaderLanguage] = useState('English');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All');

  const [suppliers] = useState(INITIAL_SUPPLIERS);
  const [rfqs, setRfqs] = useState(INITIAL_RFQS);
  const [escrowTxs, setEscrowTxs] = useState(INITIAL_ESCROW_TXS);
  
  const [fraudWarningBanner, setFraudWarningBanner] = useState(null);
  const [chatLanguage, setChatLanguage] = useState('English');
  const [autoTranslateEnabled, setAutoTranslateEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const [kycForm, setKycForm] = useState({
    entityName: '',
    regNumber: '',
    country: '',
    documentType: 'Certificate of Incorporation',
    fastTrackRequested: true,
    txHash: ''
  });
  const [kycSubmitted, setKycSubmitted] = useState(false);

  const [selectedRfq, setSelectedRfq] = useState(INITIAL_RFQS[0]);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'System', text: '🔒 Encrypted Chat Channel Opened. Off-platform contact sharing triggers automatic 20% security audit escrow freeze.', time: '10:00 AM' },
    { sender: 'TechCore USA LLC', text: 'We are looking to secure 10,000 units of ARM-x64 micro-controllers.', time: '10:02 AM' },
    { sender: 'Apex Industrial Tech Co.', text: 'We can accommodate this volume with a 10-day production lead time.', time: '10:05 AM' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [toast, setToast] = useState(null);

  // Helper for real-time app UI translation
  const t = (textKey) => {
    if (selectedHeaderLanguage === 'English' || !UI_DICTIONARY[selectedHeaderLanguage]) {
      return textKey;
    }
    return UI_DICTIONARY[selectedHeaderLanguage][textKey] || textKey;
  };

  const showToast = (msg, type = 'info') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const isAdminAuthorized = user && user.role === 'Admin';

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

  const detectOffPlatformContact = (text) => {
    const antiFraudRegex = /(?:phone|whatsapp|telegram|skype|wechat|email|gmail|yahoo|@|\+?\d[\d\s\-]{7,}\d|wa\.me|t\.me)/i;
    return antiFraudRegex.test(text);
  };

  const handleSecurityPenaltyTrigger = (detectedText) => {
    setFraudWarningBanner({
      rfqId: selectedRfq.id,
      detectedText: detectedText,
      timestamp: new Date().toLocaleTimeString()
    });

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

  const handleSendMessage = (textToSend = newMessage) => {
    if (!textToSend.trim()) return;

    const containsFraud = detectOffPlatformContact(textToSend);

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

  const toggleSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      showToast('Speech recognition is not supported in this browser.', 'warning');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    
    const langMap = { Urdu: 'ur-PK', 'Roman Urdu': 'ur-PK', Hindi: 'hi-IN', Chinese: 'zh-CN', Arabic: 'ar-SA' };
    recognition.lang = langMap[chatLanguage] || 'en-US';

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

  const handleDepositEscrow = (rfq) => {
    const rawVal = parseFloat(rfq.budget.replace(/[^0-9.]/g, '')) || 10000;
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

  const handleReleasePayout = (txId) => {
    if (!isAdminAuthorized) {
      showToast('Unauthorized: Admin rights required.', 'warning');
      return;
    }
    setEscrowTxs(prev => prev.map(tx => tx.id === txId ? { ...tx, status: 'RELEASED' } : tx));
    showToast(`Escrow ${txId} released! Net payout dispatched to supplier wallet.`, 'success');
  };

  const handleKycSubmit = (e) => {
    e.preventDefault();
    if (!kycForm.entityName || !kycForm.regNumber) {
      showToast('Please fill out required entity details', 'warning');
      return;
    }
    setKycSubmitted(true);
    showToast('Fast-Track Verification request submitted to Admin Vault.', 'success');
  };

  const filteredSuppliers = suppliers.filter(sup => {
    const matchesSearch = sup.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          sup.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          sup.region.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || sup.category === selectedCategory;
    const matchesRegion = selectedRegion === 'All' || sup.region.includes(selectedRegion);
    return matchesSearch && matchesCategory && matchesRegion;
  });

  const renderTranslatedText = (text) => {
    const lang = autoTranslateEnabled ? chatLanguage : selectedHeaderLanguage;
    if (lang === 'English') return text;
    if (MOCK_CHAT_TRANSLATIONS[lang] && MOCK_CHAT_TRANSLATIONS[lang][text]) {
      return MOCK_CHAT_TRANSLATIONS[lang][text];
    }
    return text;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      {toast && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-3 bg-slate-900 border border-emerald-500/40 text-slate-100 px-5 py-3 rounded-xl shadow-2xl backdrop-blur-xl animate-fade-in">
          <Activity className="w-5 h-5 text-emerald-400 animate-pulse" />
          <span className="text-sm font-medium">{toast.msg}</span>
        </div>
      )}

      {/* HEADER SECTION WITH COMPREHENSIVE COUNTRY & DYNAMIC LANGUAGE SELECTORS */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('landing')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-blue-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Globe className="w-6 h-6 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-emerald-400 bg-clip-text text-transparent">
              GHOURI <span className="text-emerald-400">B2B</span>
            </span>
            <span className="block text-[10px] tracking-widest text-slate-400 font-mono -mt-1">
              {t("GLOBAL WHOLESALE MARKETPLACE")}
            </span>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800/80">
          {[
            { id: 'landing', label: t("Home / Hub"), icon: Layers },
            { id: 'marketplace', label: t("Marketplace Directory"), icon: Building },
            { id: 'rfq', label: t("RFQ & Escrow Chat"), icon: MessageSquare },
            { id: 'kyc', label: t("Fast-Track KYC ($100)"), icon: ShieldCheck },
            { id: 'logistics', label: t("Logistics Network"), icon: Truck },
            { id: 'admin', label: t("Admin Audit Vault"), icon: Lock, protected: true }
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

        <div className="flex items-center gap-3">
          {/* Comprehensive Analytics Country Selector */}
          <div className="relative hidden sm:block">
            <select
              value={selectedHeaderCountry}
              onChange={(e) => {
                setSelectedHeaderCountry(e.target.value);
                showToast(`Analytics Tracking: Region updated to ${e.target.value}`, 'info');
              }}
              title="Analytics Origin Country Selector"
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs rounded-xl px-3 py-2 font-medium focus:outline-none focus:border-emerald-500 cursor-pointer transition max-w-[140px] truncate"
            >
              {GLOBAL_COUNTRIES.map((c) => (
                <option key={c} value={c}>
                  📍 {c}
                </option>
              ))}
            </select>
          </div>

          {/* Full Dynamic Real-Time UI Language Selector */}
          <div className="relative hidden sm:block">
            <select
              value={selectedHeaderLanguage}
              onChange={(e) => {
                const newLang = e.target.value;
                setSelectedHeaderLanguage(newLang);
                setChatLanguage(newLang);
                showToast(`App interface translated to ${newLang}`, 'success');
              }}
              title="Full Real-Time App UI Language Translator"
              className="bg-slate-900 border border-emerald-500/40 hover:border-emerald-400 text-emerald-400 text-xs rounded-xl px-3 py-2 font-semibold focus:outline-none focus:border-emerald-500 cursor-pointer transition"
            >
              <option value="English">🌐 English</option>
              <option value="Urdu">🇵🇰 Urdu (اردو)</option>
              <option value="Roman Urdu">🗣️ Roman Urdu</option>
              <option value="Hindi">🇮🇳 Hindi (हिंदी)</option>
              <option value="Arabic">🇸🇦 Arabic (العربية)</option>
              <option value="Chinese">🇨🇳 Chinese (中文)</option>
            </select>
          </div>

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
                {t("Sign Out")}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => { setAuthMode('login'); setShowAuthModal(true); }}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition"
              >
                {t("Sign In")}
              </button>
              <button
                onClick={() => { setAuthMode('signup'); setShowAuthModal(true); }}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 shadow-lg shadow-emerald-500/20 transition"
              >
                {t("Join Global Trade")}
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8">
        {activeTab === 'landing' && (
          <div className="space-y-16 py-6">
            <div className="relative rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-8 md:p-14 overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="max-w-2xl space-y-6 relative z-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium">
                  <ShieldCheck className="w-4 h-4" /> Multi-Sig Binance Pay Escrow Protection
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-white">
                  {t("Global Wholesale")} <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">{t("B2B Marketplace")}</span>
                </h1>
                <p className="text-slate-400 text-base md:text-lg leading-relaxed">
                  {t("Hero_Description")}
                </p>
                <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start pt-2">
                  <button 
                    onClick={() => setActiveTab('marketplace')}
                    className="px-6 py-3.5 rounded-xl bg-emerald-400 text-slate-950 font-bold text-sm hover:bg-emerald-300 transition flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                  >
                    {t("Explore Wholesale Directory")} <ArrowRight className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setActiveTab('kyc')}
                    className="px-6 py-3.5 rounded-xl bg-slate-900 text-slate-200 border border-slate-700 hover:border-slate-500 font-semibold text-sm transition flex items-center gap-2"
                  >
                    {t("Get Fast-Track Verified ($100)")}
                  </button>
                </div>
              </div>

              <div className="w-full md:w-80 bg-slate-950/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-xl relative z-10 space-y-4 text-left shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-mono text-slate-400">{t("MASTER ADMIN ESCROW")}</span>
                  <span className="inline-flex items-center gap-1.5 text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full font-mono border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span> {t("ONLINE")}
                  </span>
                </div>
                <div className="space-y-2">
                  <span className="text-[11px] text-slate-400">Binance Pay ID / USDT TRC20:</span>
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl font-mono text-emerald-400 font-bold text-sm tracking-wider flex items-center justify-between">
                    <span>1232772030</span>
                    <Lock className="w-4 h-4 text-slate-500" />
                  </div>
                </div>
                
                <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
                  <span className="text-[10px] font-mono text-slate-400 block font-bold">{t("TIERED ESCROW COMMISSION RATES:")}</span>
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
                  <p className="flex items-center gap-1 text-slate-300"><Check className="w-3.5 h-3.5 text-emerald-400" /> {t("Anti-fraud AI chat & voice surveillance")}</p>
                  <p className="flex items-center gap-1 text-slate-300"><Check className="w-3.5 h-3.5 text-emerald-400" /> {t("20% security penalty off-platform freeze")}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">{t("Verified Factory Suppliers")}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {t("Verified_Desc")}
                </p>
              </div>

              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">{t("Transparent MOQ & Lead Times")}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {t("MOQ_Desc")}
                </p>
              </div>

              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Truck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">{t("Integrated Freight Logistics")}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {t("Freight_Desc")}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'marketplace' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-2xl border border-slate-800">
              <div>
                <h2 className="text-2xl font-bold text-white">{t("Global B2B Wholesale Directory")}</h2>
                <p className="text-slate-400 text-sm">{t("Marketplace_Sub")}</p>
              </div>
              
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t("Search supplier, category, region...")}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
                >
                  <option value="All">{t("All Categories")}</option>
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
                  <option value="All">{t("All Factory Regions")}</option>
                  <option value="China">China</option>
                  <option value="Germany">Germany</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="Japan">Japan</option>
                </select>
              </div>
            </div>

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
                      {t("Request Wholesale Quote")} <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'rfq' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center justify-between">
                {t("Active RFQ Channels")}
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

            <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col h-[680px] relative">
              {fraudWarningBanner && fraudWarningBanner.rfqId === selectedRfq.id && (
                <div className="mb-4 bg-red-950/80 border border-red-500/50 text-red-200 p-4 rounded-xl flex items-start justify-between gap-3 animate-pulse shadow-xl">
                  <AlertOctagon className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                  <div className="text-xs space-y-1">
                    <p className="font-bold text-red-400 text-sm">SECURITY AUDIT WARNING: Off-Platform Contact Detected!</p>
                    <p>Flagged Content: <span className="font-mono bg-red-900/50 px-1.5 py-0.5 rounded text-white">"{fraudWarningBanner.detectedText}"</span></p>
                    <p className="text-[11px] text-red-300">
                      Automated <strong>20% Security Penalty Escrow Freeze</strong> has been enforced on this deal.
                    </p>
                  </div>
                  <button onClick={() => setFraudWarningBanner(null)} className="text-red-400 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

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

                <div className="flex flex-wrap items-center gap-2">
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
                      {autoTranslateEnabled ? t("Auto-Translate On") : t("Translate")}
                    </button>
                  </div>

                  {selectedRfq.escrowDeposited ? (
                    <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-xl text-emerald-400 text-xs font-mono">
                      <Lock className="w-3.5 h-3.5" /> {t("Escrow Locked")}
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleDepositEscrow(selectedRfq)}
                      className="px-4 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs transition flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
                    >
                      <CreditCard className="w-3.5 h-3.5" /> {t("Lock Escrow")}
                    </button>
                  )}
                </div>
              </div>

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

              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={toggleSpeechRecognition}
                  title="Voice Input Surveillance"
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
                  placeholder={isListening ? "Listening..." : t("Type or speak RFQ details...")}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />

                <button 
                  onClick={() => handleSendMessage()}
                  className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition flex items-center gap-2"
                >
                  <Send className="w-4 h-4" /> {t("Send")}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'kyc' && (
          <div className="max-w-3xl mx-auto space-y-8 py-4">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                <ShieldCheck className="w-4 h-4" /> Priority Gold Badge Verification
              </div>
              <h2 className="text-3xl font-extrabold text-white">{t("Fast-Track KYC Audit & Verification")}</h2>
              <p className="text-slate-400 text-sm max-w-xl mx-auto">
                {t("KYC_Sub")}
              </p>
            </div>

            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
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
                      <select 
                        value={kycForm.country || selectedHeaderCountry}
                        onChange={(e) => setKycForm({ ...kycForm, country: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                      >
                        {GLOBAL_COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
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
                    {t("Submit Fast-Track Application ($100 USD Fee Paid)")}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {activeTab === 'logistics' && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-2">
              <h2 className="text-2xl font-bold text-white">{t("Global Freight & Integrated Logistics Network")}</h2>
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
                    {t("Bind Logistics Partner")}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'admin' && (
          <div className="space-y-6">
            {!isAdminAuthorized ? (
              <div className="bg-slate-900/80 border border-amber-500/30 rounded-2xl p-8 text-center space-y-4 max-w-xl mx-auto my-12">
                <ShieldAlert className="w-12 h-12 text-amber-400 mx-auto" />
                <h3 className="text-xl font-bold text-white">{t("Master Admin Access Required")}</h3>
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
                      <h2 className="text-2xl font-bold text-white">{t("Admin Escrow Audit Vault")}</h2>
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

      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 px-6 text-center text-xs text-slate-500 font-mono">
        GHOURI B2B GLOBAL WHOLESALE ESCROW • MASTER ADMIN WALLET ID: <span className="text-emerald-400 font-bold">1232772030</span> • ALL RIGHTS RESERVED
      </footer>
    </div>
  );
}