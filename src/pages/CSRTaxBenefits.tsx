import React, { useState } from 'react';
import {
  ShieldCheck,
  Download,
  Building2,
  CheckCircle2,
  Calculator,
  Eye,
  X,
  FileCheck,
  Send,
  Award,
} from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import {
  CSR_STATUTORY_CREDENTIALS,
  COMPLIANCE_DOCUMENTS,
  calculateCSRImpact,
  CSRComplianceDoc,
} from '../data/csrCompliance';

const DOCUMENT_CARD_THEMES = [
  // Card 1 — Section 80G: Electric Green
  {
    bgClass: 'bg-brand-green',
    borderClass: 'border-2 border-brand-slate/20 hover:border-brand-slate hover:shadow-2xl',
    titleClass: 'text-brand-black',
    descClass: 'text-brand-black/85',
    numeralClass: 'text-brand-black',
    badgeBg: 'bg-brand-black text-white',
    metaClass: 'text-brand-black/75 border-brand-black/15',
    refClass: 'text-brand-black',
    btnViewClass: 'bg-brand-black hover:bg-brand-slate text-white',
    btnDownloadClass: 'bg-white hover:bg-brand-alabaster text-brand-black',
  },
  // Card 2 — Section 12A: Vibrant Cyan
  {
    bgClass: 'bg-brand-cyan',
    borderClass: 'border-2 border-brand-slate/20 hover:border-brand-slate hover:shadow-2xl',
    titleClass: 'text-brand-black',
    descClass: 'text-brand-black/85',
    numeralClass: 'text-brand-black',
    badgeBg: 'bg-brand-black text-white',
    metaClass: 'text-brand-black/75 border-brand-black/15',
    refClass: 'text-brand-black',
    btnViewClass: 'bg-brand-black hover:bg-brand-slate text-white',
    btnDownloadClass: 'bg-white hover:bg-brand-alabaster text-brand-black',
  },
  // Card 3 — MCA CSR-1: Vibrant Chartreuse Lime
  {
    bgClass: 'bg-brand-lime',
    borderClass: 'border-2 border-brand-slate/20 hover:border-brand-slate hover:shadow-2xl',
    titleClass: 'text-brand-black',
    descClass: 'text-brand-black/85',
    numeralClass: 'text-brand-black',
    badgeBg: 'bg-brand-black text-white',
    metaClass: 'text-brand-black/75 border-brand-black/15',
    refClass: 'text-brand-black',
    btnViewClass: 'bg-brand-black hover:bg-brand-slate text-white',
    btnDownloadClass: 'bg-white hover:bg-brand-alabaster text-brand-black',
  },
  // Card 4 — Form 10BE: Deep Slate
  {
    bgClass: 'bg-brand-slate',
    borderClass: 'border-2 border-white/10 hover:border-brand-green hover:shadow-2xl',
    titleClass: 'text-white',
    descClass: 'text-white/80',
    numeralClass: 'text-brand-green',
    badgeBg: 'bg-brand-green text-brand-black',
    metaClass: 'text-white/70 border-white/15',
    refClass: 'text-brand-green',
    btnViewClass: 'bg-white/15 hover:bg-white text-white hover:text-brand-black border border-white/20',
    btnDownloadClass: 'bg-brand-green hover:bg-brand-lime text-brand-black',
  },
  // Card 5 — Audited Financial Statements: Forest Emerald
  {
    bgClass: 'bg-brand-emerald',
    borderClass: 'border-2 border-brand-emerald hover:border-brand-black hover:shadow-2xl',
    titleClass: 'text-white',
    descClass: 'text-white/90',
    numeralClass: 'text-brand-lime',
    badgeBg: 'bg-brand-lime text-brand-black',
    metaClass: 'text-white/80 border-white/20',
    refClass: 'text-white',
    btnViewClass: 'bg-brand-black hover:bg-brand-slate text-white',
    btnDownloadClass: 'bg-white hover:bg-brand-lime text-brand-black',
  },
  // Card 6 — Standard Corporate MoU: Deep Black
  {
    bgClass: 'bg-brand-black',
    borderClass: 'border-2 border-white/20 hover:border-brand-cyan hover:shadow-2xl',
    titleClass: 'text-white',
    descClass: 'text-white/80',
    numeralClass: 'text-brand-cyan',
    badgeBg: 'bg-brand-cyan text-brand-black',
    metaClass: 'text-white/70 border-white/15',
    refClass: 'text-brand-cyan',
    btnViewClass: 'bg-white/15 hover:bg-white text-white hover:text-brand-black border border-white/20',
    btnDownloadClass: 'bg-brand-cyan hover:bg-white text-brand-black',
  },
  // Card 7 — Geotagged Utilization Certificate: Vibrant Chartreuse Lime
  {
    bgClass: 'bg-brand-lime',
    borderClass: 'border-2 border-brand-slate/20 hover:border-brand-slate hover:shadow-2xl',
    titleClass: 'text-brand-black',
    descClass: 'text-brand-black/85',
    numeralClass: 'text-brand-black',
    badgeBg: 'bg-brand-black text-white',
    metaClass: 'text-brand-black/75 border-brand-black/15',
    refClass: 'text-brand-black',
    btnViewClass: 'bg-brand-black hover:bg-brand-slate text-white',
    btnDownloadClass: 'bg-white hover:bg-brand-alabaster text-brand-black',
  },
  // Card 8 — Trust PAN, TAN & Darpan: Vibrant Cyan
  {
    bgClass: 'bg-brand-cyan',
    borderClass: 'border-2 border-brand-slate/20 hover:border-brand-slate hover:shadow-2xl',
    titleClass: 'text-brand-black',
    descClass: 'text-brand-black/85',
    numeralClass: 'text-brand-black',
    badgeBg: 'bg-brand-black text-white',
    metaClass: 'text-brand-black/75 border-brand-black/15',
    refClass: 'text-brand-black',
    btnViewClass: 'bg-brand-black hover:bg-brand-slate text-white',
    btnDownloadClass: 'bg-white hover:bg-brand-alabaster text-brand-black',
  },
];

const DARK_CARD_BACKGROUNDS = ['bg-brand-slate', 'bg-brand-black', 'bg-brand-emerald'];

export const CSRTaxBenefits: React.FC = () => {
  const [budgetInput, setBudgetInput] = useState<number>(250000);
  const [selectedDoc, setSelectedDoc] = useState<CSRComplianceDoc | null>(null);
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string | null>(null);

  // Corporate Proposal Form State
  const [companyName, setCompanyName] = useState('TechVentures India Pvt Ltd');
  const [csrHeadName, setCsrHeadName] = useState('Pooja Nambiar');
  const [csrEmail, setCsrEmail] = useState('pooja.n@techventures.in');
  const [csrPhone, setCsrPhone] = useState('+91 98480 55192');
  const [csrEstimatedBudget, setCsrEstimatedBudget] = useState('₹5,00,000 – ₹15,00,000');
  const [csrFocusArea, setCsrFocusArea] = useState('School Midday Nutrition & Child Growth');
  const [isProposalSubmitted, setIsProposalSubmitted] = useState(false);

  const calculated = calculateCSRImpact(budgetInput);

  const handleDownloadDoc = (doc: CSRComplianceDoc) => {
    setDownloadSuccessMessage(`Downloading: ${doc.title} (${doc.referenceNumber})...`);
    setTimeout(() => {
      setDownloadSuccessMessage(null);
    }, 4000);
  };

  const handleProposalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProposalSubmitted(true);
  };

  return (
    <div className="bg-brand-black text-white min-h-screen">
      {/* =====================================================================
          HERO SECTION — CORPORATE CSR & 80G TAX BENEFITS
      ====================================================================== */}
      <section className="bg-brand-black pt-28 sm:pt-36 pb-16 sm:pb-24 border-b border-white/10">
        <div className="max-w-340 mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <ScrollReveal>
            <span className="text-xs font-mono-tabular font-bold uppercase tracking-[0.22em] text-brand-green block mb-3">
              STATUTORY COMPLIANCE · COMPANIES ACT SECTION 135 · INCOME TAX ACT
            </span>

            <h1 className="font-display-sans uppercase text-4xl sm:text-6xl lg:text-7xl font-black tracking-[-0.04em] leading-[0.92] text-white">
              MAXIMIZE YOUR <span className="text-brand-green">CSR IMPACT.</span>
              <br />
              100% AUDITED · 50% TAX EXEMPTION.
            </h1>

            <p className="mt-5 text-base sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Zero Hunger Initiative is certified by the Ministry of Corporate Affairs (MCA CSR-1) and the Income Tax Department (Section 80G & 12A). We provide comprehensive legal documentation, Form 10BE certificates, and CA-audited utilization reports for corporates.
            </p>

            {/* 4 Statutory Pills */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <span className="px-4 py-2 rounded-full bg-brand-slate border border-brand-green/40 font-mono-tabular text-xs font-bold text-white">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-green inline-block mr-1.5 -mt-0.5" />
                80G Reg: {CSR_STATUTORY_CREDENTIALS.section80G.regNumber}
              </span>
              <span className="px-4 py-2 rounded-full bg-brand-slate border border-brand-cyan/40 font-mono-tabular text-xs font-bold text-white">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-cyan inline-block mr-1.5 -mt-0.5" />
                12A Exemption: {CSR_STATUTORY_CREDENTIALS.section12A.regNumber}
              </span>
              <span className="px-4 py-2 rounded-full bg-brand-slate border border-brand-lime/40 font-mono-tabular text-xs font-bold text-white">
                <Building2 className="w-3.5 h-3.5 text-brand-lime inline-block mr-1.5 -mt-0.5" />
                MCA CSR-1: {CSR_STATUTORY_CREDENTIALS.mcaCSR1.regNumber}
              </span>
              <span className="px-4 py-2 rounded-full bg-brand-slate border border-white/20 font-mono-tabular text-xs font-bold text-white">
                <Award className="w-3.5 h-3.5 text-brand-green inline-block mr-1.5 -mt-0.5" />
                NITI Aayog Darpan: {CSR_STATUTORY_CREDENTIALS.darpanId.regNumber}
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =====================================================================
          SECTION 1 — INTERACTIVE CSR TAX SAVINGS & IMPACT CALCULATOR
      ====================================================================== */}
      <section className="py-16 sm:py-24 border-b border-white/10 bg-brand-slate">
        <div className="max-w-340 mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Input & Budget Selector */}
            <div className="lg:col-span-6">
              <ScrollReveal>
                <div className="flex items-center gap-2 mb-2">
                  <Calculator className="w-4 h-4 text-brand-green" />
                  <span className="font-mono-tabular text-xs font-bold uppercase tracking-widest text-brand-green">
                    INTERACTIVE CSR & TAX CALCULATOR
                  </span>
                </div>
                <h2 className="font-display-sans uppercase text-3xl sm:text-5xl font-black text-white leading-tight">
                  Calculate Your Corporate Tax Benefits & Meal Count
                </h2>
                <p className="mt-4 text-sm sm:text-base text-white/80 leading-relaxed">
                  Enter your proposed CSR budget or charitable donation. See your direct 50% tax deduction under Section 80G, net outlay, and the number of daily nutritious child meals funded.
                </p>

                {/* Preset Chips */}
                <div className="mt-6">
                  <label className="block text-xs font-mono-tabular font-bold uppercase text-white/60 mb-2">
                    Quick Preset Budgets:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[50000, 100000, 250000, 500000, 1000000, 2500000].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setBudgetInput(val)}
                        className={`px-3.5 py-1.5 rounded-lg font-mono-tabular text-xs font-bold transition-all cursor-pointer ${
                          budgetInput === val
                            ? 'bg-brand-green text-brand-black'
                            : 'bg-brand-black text-white/80 border border-white/15 hover:border-white/40'
                        }`}
                      >
                        ₹{(val / 100000).toFixed(val >= 100000 ? 1 : 2)} Lakh
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Number Input */}
                <div className="mt-6 p-4 rounded-xl bg-brand-black border border-white/15">
                  <label className="block text-xs font-mono-tabular font-bold uppercase text-white/60 mb-1">
                    Or Enter Exact CSR Amount (INR ₹):
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="font-mono-tabular text-2xl font-bold text-brand-green">₹</span>
                    <input
                      type="number"
                      min={5000}
                      step={5000}
                      value={budgetInput}
                      onChange={(e) => setBudgetInput(Math.max(0, Number(e.target.value)))}
                      className="w-full bg-transparent font-display-sans text-3xl sm:text-4xl font-black text-white focus:outline-none"
                    />
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right: Calculated Metrics Display Card */}
            <div className="lg:col-span-6">
              <ScrollReveal delay={0.15}>
                <div className="rounded-[20px] bg-brand-black border border-white/15 p-6 sm:p-9 shadow-2xl">
                  <div className="pb-4 border-b border-white/12 flex items-center justify-between">
                    <span className="font-mono-tabular text-xs font-bold uppercase tracking-widest text-brand-lime">
                      PROJECTED IMPACT & AUDIT METRICS
                    </span>
                    <span className="px-3 py-1 rounded-md bg-brand-green text-brand-black font-mono-tabular text-[11px] font-bold uppercase">
                      {calculated.label}
                    </span>
                  </div>

                  {/* 2 Big Numbers: Meals & Tax Savings */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                    <div className="p-5 rounded-[14px] bg-brand-green text-brand-slate">
                      <span className="font-mono-tabular text-xs font-bold uppercase opacity-85 block">
                        HOT CHILD MEALS FUNDED
                      </span>
                      <div className="font-display-sans text-4xl sm:text-5xl font-black mt-1 leading-none">
                        {calculated.mealsServed.toLocaleString('en-IN')}
                      </div>
                      <span className="text-[11px] font-mono-tabular font-semibold mt-1 block">
                        ₹25 / Balanced Pediatric Meal
                      </span>
                    </div>

                    <div className="p-5 rounded-[14px] bg-brand-cyan text-brand-slate">
                      <span className="font-mono-tabular text-xs font-bold uppercase opacity-85 block">
                        ESTIMATED 80G TAX BENEFIT
                      </span>
                      <div className="font-display-sans text-4xl sm:text-5xl font-black mt-1 leading-none">
                        ₹{calculated.taxSavings80GInr.toLocaleString('en-IN')}
                      </div>
                      <span className="text-[11px] font-mono-tabular font-semibold mt-1 block">
                        50% Deduction under Sec 80G(5)
                      </span>
                    </div>
                  </div>

                  {/* Summary Breakdown Ledger */}
                  <div className="space-y-2.5 font-mono-tabular text-xs border-t border-b border-white/10 py-4">
                    <div className="flex justify-between text-white/80">
                      <span>Total CSR Grant Amount:</span>
                      <span className="text-white font-bold">₹{budgetInput.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-white/80">
                      <span>Eligible 80G Tax Deduction Base (50%):</span>
                      <span className="text-brand-green font-bold">₹{(budgetInput * 0.5).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-white/80">
                      <span>Effective Net Cost to Corporate:</span>
                      <span className="text-brand-lime font-bold">₹{calculated.effectiveCostInr.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-white/80">
                      <span>Full Child School Quarters Nourished:</span>
                      <span className="text-white font-bold">{calculated.beneficiariesCount} Children</span>
                    </div>
                  </div>

                  {/* Corporate Deliverables */}
                  <div className="mt-5">
                    <span className="font-mono-tabular text-[11px] font-bold uppercase tracking-wider text-white/60 block mb-2">
                      Included Corporate Deliverables:
                    </span>
                    <ul className="space-y-1.5 text-xs text-white/85">
                      {calculated.brandingDeliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-green shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2 — THE STATUTORY DOCUMENT VAULT
          "we provide whatever document want from our end"
      ====================================================================== */}
      <section className="bg-white text-brand-black py-20 sm:py-28 border-y border-brand-slate/10">
        <div className="max-w-340 mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-mono-tabular font-bold uppercase tracking-[0.2em] text-brand-emerald block mb-2">
              RADICAL TRANSPARENCY & STATUTORY VAULT
            </span>
            <h2 className="font-display-sans uppercase text-3xl sm:text-5xl font-black text-brand-black">
              We Provide Whatever Document You Need
            </h2>
            <p className="mt-3 text-sm sm:text-base text-brand-slate/80 leading-relaxed font-medium">
              From 80G tax clearance to Chartered Accountant audited annual balance sheets and bilateral CSR MoUs—all official files are readily available for immediate review, compliance audit, and download.
            </p>

            {downloadSuccessMessage && (
              <div className="mt-4 p-3.5 rounded-[10px] bg-brand-emerald text-white font-mono-tabular text-xs font-bold uppercase shadow-sm">
                {downloadSuccessMessage}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {COMPLIANCE_DOCUMENTS.map((doc, idx) => {
              const theme = DOCUMENT_CARD_THEMES[idx % DOCUMENT_CARD_THEMES.length];
              const isDarkCard = DARK_CARD_BACKGROUNDS.includes(theme.bgClass);
              const dividerClass = isDarkCard ? 'border-white/15' : 'border-brand-black/15';

              return (
                <div
                  key={doc.id}
                  className={`rounded-[18px] ${theme.bgClass} ${theme.borderClass} p-6 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 shadow-md`}
                >
                  <div>
                    <div className={`flex items-center justify-between pb-3 border-b ${dividerClass}`}>
                      <span className={`px-2.5 py-0.5 rounded-sm font-mono-tabular text-[10px] font-bold ${theme.badgeBg}`}>
                        {doc.badgeText}
                      </span>
                      <span className={`font-mono-tabular text-[10px] font-bold ${isDarkCard ? 'text-white/70' : 'text-brand-black/70'}`}>
                        {doc.fileSize}
                      </span>
                    </div>

                    <h3 className={`font-display-sans uppercase text-lg font-black mt-4 leading-tight transition-colors ${theme.titleClass}`}>
                      {doc.title}
                    </h3>

                    <p className={`mt-2.5 text-xs leading-relaxed font-medium ${theme.descClass}`}>
                      {doc.description}
                    </p>

                    <div className={`mt-4 pt-3 border-t font-mono-tabular text-[10px] ${dividerClass} ${theme.metaClass}`}>
                      <div>Ref: <strong className={theme.refClass}>{doc.referenceNumber}</strong></div>
                      <div>Validity: <strong className={theme.refClass}>{doc.validity}</strong></div>
                    </div>
                  </div>

                  <div className={`mt-6 pt-3 border-t flex items-center gap-2 ${dividerClass}`}>
                    <button
                      type="button"
                      onClick={() => setSelectedDoc(doc)}
                      className={`flex-1 py-2.5 px-3 rounded-lg font-mono-tabular text-[11px] font-bold uppercase tracking-wider inline-flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs ${theme.btnViewClass}`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Doc</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDownloadDoc(doc)}
                      className={`py-2.5 px-3 rounded-lg font-mono-tabular text-[11px] font-bold uppercase tracking-wider inline-flex items-center justify-center transition-all cursor-pointer shadow-xs ${theme.btnDownloadClass}`}
                      title={`Download ${doc.title}`}
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 3 — CUSTOM CSR PROPOSAL & BILATERAL MOU REQUEST FORM
      ====================================================================== */}
      <section className="py-20 sm:py-28 bg-brand-slate border-t border-white/10">
        <div className="max-w-340 mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <ScrollReveal>
                <span className="text-xs font-mono-tabular font-bold uppercase tracking-widest text-brand-lime block mb-2">
                  PARTNER WITH ZERO HUNGER INITIATIVE
                </span>
                <h2 className="font-display-sans uppercase text-3xl sm:text-5xl font-black text-white leading-tight">
                  Request a Tailored CSR Proposal & MoU
                </h2>
                <p className="mt-4 text-sm sm:text-base text-white/80 leading-relaxed">
                  Our institutional CSR desk prepares custom program proposals, detailed budget annexures, quarterly milestones, and employee engagement roadmaps for Board CSR Committee approvals.
                </p>

                <div className="mt-8 space-y-4 font-mono-tabular text-xs text-white/85">
                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-brand-black border border-white/10">
                    <FileCheck className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Board-Ready CSR Proposal Deck</strong>
                      <span className="text-white/70">Tailored with specific district metrics, beneficiary demographics & KPIs.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-brand-black border border-white/10">
                    <ShieldCheck className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Form 10BE & AIS Tax Compliance Guarantee</strong>
                      <span className="text-white/70">Directly synchronized with Income Tax Department Annual Information Statement.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-brand-black border border-white/10">
                    <Award className="w-4 h-4 text-brand-lime shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Third-Party CA Utilization Audits</strong>
                      <span className="text-white/70">Geotagged distribution photos, headmaster receipts & zero-leakage ledger.</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right: Proposal Request Form */}
            <div className="lg:col-span-7">
              <ScrollReveal delay={0.15}>
                <div className="rounded-[20px] bg-brand-black border border-white/15 p-6 sm:p-10 shadow-2xl">
                  {isProposalSubmitted ? (
                    <div className="py-8 text-center">
                      <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center bg-brand-green text-brand-black">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <span className="text-xs font-mono-tabular font-bold uppercase tracking-widest text-brand-green">
                        PROPOSAL PACKET DISPATCHED
                      </span>
                      <h3 className="font-display-sans uppercase text-3xl font-black text-white mt-2">
                        Thank You, {csrHeadName}!
                      </h3>
                      <p className="mt-3 text-sm text-white/80 max-w-md mx-auto leading-relaxed">
                        We have logged the CSR inquiry for <strong className="text-white">{companyName}</strong>. A customized proposal deck, draft bilateral MoU, and complete 80G/12A/CSR-1 compliance dossier has been emailed to <strong className="text-brand-green">{csrEmail}</strong>.
                      </p>
                      <button
                        type="button"
                        onClick={() => setIsProposalSubmitted(false)}
                        className="mt-6 px-6 py-3 rounded-[10px] bg-brand-green text-brand-black font-mono-tabular text-xs font-bold uppercase tracking-wider cursor-pointer"
                      >
                        Submit Another Corporate Inquiry
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleProposalSubmit} className="space-y-4">
                      <div className="pb-3 border-b border-white/10">
                        <span className="text-xs font-mono-tabular font-bold uppercase tracking-widest text-brand-green">
                          CORPORATE CSR INQUIRY
                        </span>
                        <h3 className="font-display-sans uppercase text-2xl font-black text-white mt-0.5">
                          Get Instant Compliance Kit & Draft MoU
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono-tabular font-bold uppercase text-white/70 mb-1">
                            Company / Entity Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className="w-full rounded-lg bg-brand-slate border border-white/20 px-3.5 py-2.5 text-xs text-white focus:outline-1 focus:-outline-offset-1 focus:outline-brand-green"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono-tabular font-bold uppercase text-white/70 mb-1">
                            CSR Lead / Officer Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={csrHeadName}
                            onChange={(e) => setCsrHeadName(e.target.value)}
                            className="w-full rounded-lg bg-brand-slate border border-white/20 px-3.5 py-2.5 text-xs text-white focus:outline-1 focus:-outline-offset-1 focus:outline-brand-green"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono-tabular font-bold uppercase text-white/70 mb-1">
                            Corporate Work Email *
                          </label>
                          <input
                            type="email"
                            required
                            value={csrEmail}
                            onChange={(e) => setCsrEmail(e.target.value)}
                            className="w-full rounded-lg bg-brand-slate border border-white/20 px-3.5 py-2.5 text-xs text-white focus:outline-1 focus:-outline-offset-1 focus:outline-brand-green"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono-tabular font-bold uppercase text-white/70 mb-1">
                            Phone / Mobile *
                          </label>
                          <input
                            type="tel"
                            required
                            value={csrPhone}
                            onChange={(e) => setCsrPhone(e.target.value)}
                            className="w-full rounded-lg bg-brand-slate border border-white/20 px-3.5 py-2.5 text-xs text-white focus:outline-1 focus:-outline-offset-1 focus:outline-brand-green"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono-tabular font-bold uppercase text-white/70 mb-1">
                            Estimated CSR Allocation (FY 2026–27) *
                          </label>
                          <select
                            value={csrEstimatedBudget}
                            onChange={(e) => setCsrEstimatedBudget(e.target.value)}
                            className="w-full rounded-lg bg-brand-slate border border-white/20 px-3.5 py-2.5 text-xs text-white focus:outline-1 focus:-outline-offset-1 focus:outline-brand-green"
                          >
                            <option value="₹1,00,000 – ₹5,00,000">₹1,00,000 – ₹5,00,000</option>
                            <option value="₹5,00,000 – ₹15,00,000">₹5,00,000 – ₹15,00,000</option>
                            <option value="₹15,00,000 – ₹50,00,000">₹15,00,000 – ₹50,00,000</option>
                            <option value="₹50,00,000+ (Anchor Partner)">₹50,00,000+ (Anchor Partner)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-mono-tabular font-bold uppercase text-white/70 mb-1">
                            Preferred Impact Focus *
                          </label>
                          <select
                            value={csrFocusArea}
                            onChange={(e) => setCsrFocusArea(e.target.value)}
                            className="w-full rounded-lg bg-brand-slate border border-white/20 px-3.5 py-2.5 text-xs text-white focus:outline-1 focus:-outline-offset-1 focus:outline-brand-green"
                          >
                            <option value="School Midday Nutrition & Child Growth">School Midday Nutrition & Child Growth</option>
                            <option value="Public Hospital Caregiver Courtyard Dining">Public Hospital Caregiver Courtyard Dining</option>
                            <option value="Emergency Flood Relief & Mobile Kitchens">Emergency Flood Relief & Mobile Kitchens</option>
                            <option value="Women Homestead Farming Cooperatives">Women Homestead Farming Cooperatives</option>
                          </select>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-4 px-6 rounded-xl bg-brand-green hover:bg-brand-lime text-brand-black font-mono-tabular text-xs font-black uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-colors cursor-pointer mt-2"
                      >
                        <Send className="w-4 h-4" />
                        <span>Send Proposal Deck & Compliance Kit</span>
                      </button>
                    </form>
                  )}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          DOCUMENT PREVIEW MODAL
      ====================================================================== */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl rounded-[20px] bg-brand-slate border border-white/20 p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/12">
              <div>
                <span className="font-mono-tabular text-xs font-bold text-brand-green uppercase tracking-wider">
                  STATUTORY DOCUMENT PREVIEW
                </span>
                <h3 className="font-display-sans uppercase text-2xl font-black text-white mt-1">
                  {selectedDoc.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDoc(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="my-6 p-6 rounded-[14px] bg-brand-black border border-white/10 space-y-4">
              <div className="grid grid-cols-2 gap-4 font-mono-tabular text-xs">
                <div>
                  <span className="text-white/60 block">DOCUMENT REGISTRATION / REF NO:</span>
                  <span className="text-brand-lime font-bold text-sm">{selectedDoc.referenceNumber}</span>
                </div>
                <div>
                  <span className="text-white/60 block">STATUTORY VALIDITY:</span>
                  <span className="text-white font-bold">{selectedDoc.validity}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 text-xs text-white/80 leading-relaxed">
                <strong className="text-white block mb-1">Official Summary:</strong>
                {selectedDoc.description}
              </div>

              <div className="pt-3 border-t border-white/10 text-[11px] font-mono-tabular text-white/60">
                Issued to: Zero Hunger Initiative Trust · Principal Commissioner of Income Tax / MCA V3 Portal Validated.
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={() => setSelectedDoc(null)}
                className="px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono-tabular text-xs font-bold uppercase cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  handleDownloadDoc(selectedDoc);
                  setSelectedDoc(null);
                }}
                className="px-6 py-2.5 rounded-lg bg-brand-green hover:bg-brand-lime text-brand-black font-mono-tabular text-xs font-black uppercase inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Document (PDF)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};