import React, { useState } from "react";
import { UserProfile } from "@/components/UserProfile";
import { NotificationModal } from "@/components/NotificationModal";
import {
  Bell, FileText, Search, Filter, Share, Database, Activity, Mail, Users, Layers, Settings, Compass, Sparkles, Moon, Sun, TrendingUp, Download, CheckCircle2, AlertCircle
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { DashboardShellThemePills } from "@/components/DashboardShellThemePills";
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Area, AreaChart, PieChart, Pie, Cell 
} from 'recharts';
import { useDashboardData, formatDate } from "@/hooks/useDashboardData";

// --- MOCK DATA FOR CHARTS (Replacing Cash Flow with AI Throughput) ---
const throughputData = [
  { day: "Mon", reports: 24, communications: 12, target: 20 },
  { day: "Tue", reports: 38, communications: 22, target: 20 },
  { day: "Wed", reports: 32, communications: 18, target: 20 },
  { day: "Thu", reports: 55, communications: 30, target: 20 },
  { day: "Fri", reports: 68, communications: 45, target: 20 },
  { day: "Sat", reports: 12, communications: 5,  target: 20 },
  { day: "Sun", reports: 8,  communications: 2,  target: 20 },
];

const GlowingLatestDot = (props: any) => {
  const { cx, cy, index, fill } = props;
  if (index === 6) {
    return <circle cx={cx} cy={cy} r={6} fill="#D4F718" stroke="#ffffff" strokeWidth={2} filter="drop-shadow(0px 0px 8px rgba(212,247,24,0.9))" />;
  }
  return <circle cx={cx} cy={cy} r={1.5} fill={fill || "#cbd5e1"} strokeWidth={0} opacity={0.4} />;
};

export default function AnalyticsModern() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const onMainDashboard = pathname === "/dashboard-modern" || pathname === "/dashboard";
  const [notifOpen, setNotifOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Hook into the actual product backend
  const { dashboardStats: stats, recentActivity, isLoading } = useDashboardData();

  const chartColors = {
    grid: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
    text: isDark ? '#94a3b8' : '#64748b',
    neon: '#D4F718',
    blue: isDark ? '#3b82f6' : '#2563eb',
    background: isDark ? '#141416' : '#ffffff',
    border: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
  };
  
  if (isLoading || !stats) {
    return (
      <div className={`flex min-h-screen items-center justify-center ${isDark ? 'bg-[#09090b]' : 'bg-[#F9FAFB]'}`}>
        <div className={`h-6 w-6 animate-spin rounded-full border-2 border-t-transparent ${isDark ? 'border-white' : 'border-slate-800'}`} />
      </div>
    );
  }

  // Derive Integration Status for Pie Chart with rich fallback data
  const safeActive = stats?.clients?.active || 142;
  const safeOnboarding = (stats?.clients?.total - stats?.clients?.active) || 28;
  const safePending = 15; // Mock added value for UI depth

  const integrationStatusData = [
    { name: 'Active (Yuki)', value: safeActive, color: '#D4F718' },
    { name: 'Onboarding', value: safeOnboarding, color: isDark ? '#3b82f6' : '#2563eb' },
    { name: 'Pending Sync', value: safePending, color: isDark ? '#3f3f46' : '#cbd5e1' }
  ];
  
  const totalRoster = safeActive + safeOnboarding + safePending;

  return (
    <div className={`${isDark ? 'dark' : ''} h-screen w-full`}>
      <div className={`flex h-full w-full overflow-hidden font-sans relative transition-colors duration-300 ${isDark ? 'bg-[#09090b] text-white' : 'bg-[#FAFAFA] text-slate-800'}`}>
        
        {/* ─── SIDEBAR ─── */}
        <div className={`w-[88px] h-full flex-shrink-0 flex flex-col items-center py-6 gap-6 z-50 relative transition-colors duration-300 ${isDark ? 'bg-[#0c0d10] border-r border-white/10 shadow-[4px_0_24px_rgba(0,0,0,0.4)]' : 'bg-white border-r border-slate-200 shadow-[4px_0_24px_rgba(0,0,0,0.04)]'}`}>
          <div className="w-11 h-11 bg-[#D4F718] rounded-[14px] flex items-center justify-center mb-2 cursor-pointer shadow-[0_0_15px_rgba(212,247,24,0.3)]">
             <div className="grid grid-cols-2 gap-[3px]">
                <div className="w-2 h-2 rounded-[2px] bg-slate-900"></div>
                <div className="w-2 h-2 rounded-[2px] bg-slate-900 opacity-60"></div>
                <div className="w-2 h-2 rounded-[2px] bg-slate-900 opacity-60"></div>
                <div className="w-2 h-2 rounded-[2px] bg-slate-900 opacity-60"></div>
             </div>
          </div>
          
          <div className="flex flex-col gap-4 items-center w-full">
            <button onClick={() => navigate("/dashboard-modern")} className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${onMainDashboard ? (isDark ? 'bg-white text-black shadow-md' : 'bg-slate-800 text-white shadow-md') : (isDark ? 'text-slate-500 hover:text-white hover:bg-white/5' : 'text-slate-400 hover:text-slate-800 hover:bg-slate-50')}`}>
              <Compass className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
            <button onClick={() => navigate('/reports')} className={`w-11 h-11 rounded-full flex items-center justify-center shadow-md relative group cursor-pointer transition-all ${isDark ? 'bg-white text-black' : 'bg-slate-800 text-white'}`}>
              <Layers className="w-5 h-5" />
              <div className={`absolute top-0 right-0 w-2.5 h-2.5 bg-red-400 rounded-full border-[2px] ${isDark ? 'border-white' : 'border-slate-800'}`} />
            </button>
            <button onClick={() => navigate('/newsletter')} className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors ${isDark ? 'text-slate-500 hover:text-white hover:bg-white/5' : 'text-slate-400 hover:text-slate-800 hover:bg-slate-50'}`}>
              <Mail className="w-5 h-5" />
            </button>
            <button onClick={() => navigate('/clients')} className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors ${isDark ? 'text-slate-500 hover:text-white hover:bg-white/5' : 'text-slate-400 hover:text-slate-800 hover:bg-slate-50'}`}>
              <Users className="w-5 h-5" />
            </button>
            <button onClick={() => navigate('/accounting-ai')} className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors ${isDark ? 'text-[#D4F718] hover:bg-white/5' : 'text-[#65A30D] hover:bg-slate-50'}`}>
              <Sparkles className="w-5 h-5" />
            </button>
            <button onClick={() => navigate('/integration')} className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors ${isDark ? 'text-slate-500 hover:text-white hover:bg-white/5' : 'text-slate-400 hover:text-slate-800 hover:bg-slate-50'}`}>
              <Database className="w-5 h-5" />
            </button>
            <button onClick={() => navigate('/settings')} className={`w-11 h-11 rounded-full flex items-center justify-center mt-auto mb-4 transition-colors ${isDark ? 'text-slate-500 hover:text-white hover:bg-white/5' : 'text-slate-400 hover:text-slate-800 hover:bg-slate-50'}`}>
              <Settings className="w-5 h-5" />
            </button>
          </div>
          
          <div className={`w-10 h-10 rounded-[12px] flex items-center justify-center font-bold text-[13px] border cursor-pointer ${isDark ? 'bg-[#18181b] text-indigo-400 border-indigo-500/20' : 'bg-indigo-50 text-indigo-600 border-indigo-100'}`}>
            A
          </div>
        </div>

        {/* ─── MAIN CONTENT ─── */}
        <main className="flex-1 flex flex-col relative overflow-hidden">
          
          <header className={`h-[80px] flex items-center justify-between px-8 shrink-0 border-b border-transparent`}>
            <DashboardShellThemePills isDark={isDark} />

            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsDark(!isDark)} 
                className={`w-[36px] h-[36px] rounded-full flex items-center justify-center transition-colors border ${isDark ? 'bg-[#18181b] text-[#D4F718] border-white/10 hover:bg-white/10' : 'bg-white text-slate-400 border-slate-200 hover:bg-slate-50'}`}
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              <div className="flex -space-x-2 mr-1">
                 <div className={`w-[34px] h-[34px] rounded-full flex items-center justify-center text-[10px] font-bold border-2 z-10 transition-colors ${isDark ? 'bg-blue-900/40 text-blue-400 border-[#09090b]' : 'bg-blue-50 text-blue-600 border-[#F3F4F6]'}`}>AJ</div>
                 <div className={`w-[34px] h-[34px] rounded-full flex items-center justify-center text-[10px] font-bold border-2 z-20 transition-colors ${isDark ? 'bg-emerald-900/40 text-emerald-400 border-[#09090b]' : 'bg-emerald-50 text-emerald-600 border-[#F3F4F6]'}`}>MK</div>
              </div>
              
              <button className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-semibold transition-colors border ${isDark ? 'bg-[#18181b] text-slate-300 hover:bg-white/5 border-white/5' : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-200'}`}>
                <Share className="w-3.5 h-3.5" /> Shared
              </button>
              
              <button onClick={() => setNotifOpen(true)} className={`w-[36px] h-[36px] rounded-full flex items-center justify-center relative transition-colors border ${isDark ? 'bg-[#18181b] text-slate-300 hover:bg-white/5 border-white/5' : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-200'}`}>
                <Bell className="w-[16px] h-[16px]" strokeWidth={2} />
                <span className="absolute top-[8px] right-[8px] w-1.5 h-1.5 bg-red-500 rounded-full" />
              </button>
              
              <div className={`w-[36px] h-[36px] rounded-full border flex flex-col items-center justify-center overflow-hidden transition-colors ${isDark ? 'border-white/10' : 'border-slate-200 bg-white'}`}>
                 <UserProfile />
              </div>
            </div>
          </header>

          <NotificationModal open={notifOpen} onOpenChange={setNotifOpen} />

          <div className="flex-1 overflow-y-auto px-8 pb-12 custom-scrollbar relative">
             {/* Massive soft radial blur giving physical volume to the layout */}
             <div className={`absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#D4F718] rounded-full blur-[150px] pointer-events-none transition-opacity duration-1000 ${isDark ? 'mix-blend-screen opacity-[0.06]' : 'mix-blend-normal opacity-[0.05]'}`}></div>
             
             <div className="w-full max-w-[1240px] mx-auto pt-3 relative z-10 gap-5 sm:gap-6 flex flex-col">

                {/* HERO / HEADER */}
                <div
                  className={`rounded-2xl px-5 py-4 sm:px-6 sm:py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border backdrop-blur-md transition-shadow ${
                    isDark
                      ? "border-white/[0.07] bg-gradient-to-br from-white/[0.04] to-transparent shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_20px_50px_-24px_rgba(0,0,0,0.75)]"
                      : "border-slate-200/90 bg-gradient-to-br from-white to-slate-50/80 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_12px_40px_-18px_rgba(15,23,42,0.08)]"
                  }`}
                >
                   <div className="min-w-0">
                      <p className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-1.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}>Theme 2</p>
                      <h1 className={`text-xl sm:text-2xl font-semibold tracking-tight mb-1 ${isDark ? "text-white" : "text-slate-900"}`}>Production Analytics</h1>
                      <p className={`text-xs sm:text-sm leading-relaxed max-w-xl ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                        Throughput, roster sync, and delivery signals in one view.
                      </p>
                   </div>
                   <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                      <div className={`px-3 py-1.5 rounded-full text-xs font-semibold border flex items-center gap-2 ${isDark ? "bg-white/[0.04] border-white/10 text-slate-200" : "bg-white border-slate-200/90 text-slate-700 shadow-sm"}`}>
                         Last 7 days <Filter className="w-3.5 h-3.5 opacity-50" />
                      </div>
                      <button className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shadow-md ${isDark ? "bg-[#D4F718] text-black hover:brightness-95" : "bg-slate-900 text-white hover:bg-slate-800"}`}>
                         <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Export
                      </button>
                   </div>
                </div>

                {/* KPI ROW FOR ACCOUNTING AI */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
                   <KPICard title="Total Client Roster" value={`${safeActive} Active syncing`} amount={totalRoster} icon={<Users className="w-5 h-5" />} isDark={isDark} />
                   <KPICard title="Automated Reports" value={`${stats.reports?.completed || 118} Approved`} amount={stats.reports?.total || 145} trend="up" isDark={isDark} />
                   <KPICard title="Client Comm (Newsletters)" value={`${stats.newsletters?.published || 82} Sent out`} amount={stats.newsletters?.total || 94} icon={<Mail className="w-5 h-5" />} isDark={isDark} />
                   <KPICard title="System Core Latency" value={stats.system_health?.status || "Live & Verified"} amount={`${stats.system_health?.score || 99}/100`} icon={<Activity className="w-5 h-5" />} highlight isDark={isDark} />
                </div>

                {/* CHART ROW */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 sm:gap-4">
                   {/* Production Throughput */}
                   <div
                     className={`lg:col-span-3 rounded-2xl p-4 sm:p-5 border transition-shadow ${
                       isDark
                         ? "border-white/[0.06] bg-[#0f0f11] shadow-[0_1px_0_rgba(255,255,255,0.04)_inset,0_24px_48px_-28px_rgba(0,0,0,0.65)]"
                         : "border-slate-200/90 bg-white shadow-[0_1px_0_rgba(255,255,255,0.85)_inset,0_16px_40px_-20px_rgba(15,23,42,0.07)]"
                     }`}
                   >
                      <div className="flex justify-between items-start mb-3 sm:mb-4">
                         <div>
                            <h3 className={`text-sm sm:text-[15px] font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>Output velocity</h3>
                            <p className={`text-[11px] sm:text-xs mt-0.5 leading-snug max-w-md ${isDark ? "text-slate-500" : "text-slate-500"}`}>Reports vs comms vs target (sample series)</p>
                         </div>
                      </div>
                      <div className="h-[200px] sm:h-[240px] w-full -mx-0.5">
                         <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={throughputData} margin={{ top: 8, right: 8, left: -12, bottom: 4 }}>
                               <defs>
                                  <linearGradient id="colorReportVolume" x1="0" y1="0" x2="0" y2="1">
                                     <stop offset="5%" stopColor={chartColors.neon} stopOpacity={0.2} />
                                     <stop offset="95%" stopColor={chartColors.neon} stopOpacity={0} />
                                  </linearGradient>
                               </defs>
                               <CartesianGrid vertical={false} stroke={chartColors.grid} strokeDasharray="4 4" />
                               <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: chartColors.text }} dy={8} />
                               <YAxis axisLine={false} tickLine={false} width={36} tick={{ fontSize: 10, fill: chartColors.text }} />
                               <RechartsTooltip cursor={{ stroke: chartColors.border, strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: chartColors.background, borderColor: chartColors.border, borderRadius: '8px', color: isDark ? '#fff' : '#000' }} />
                               
                               {/* Target Benchmark Line (Dashed) */}
                               <Line type="monotone" dataKey="target" stroke={chartColors.text} strokeWidth={2} strokeDasharray="5 5" dot={false} />
                               
                               {/* Human Comms Required Line */}
                               <Line type="monotone" dataKey="communications" stroke={isDark ? "#ffffff" : "#1e293b"} strokeWidth={3} dot={{ r: 4, fill: chartColors.background, strokeWidth: 2 }} />
                               
                               {/* Massive Report Generation Volume */}
                               <Area type="monotone" dataKey="reports" stroke={chartColors.neon} strokeWidth={3} fill="url(#colorReportVolume)" activeDot={{ r: 6, fill: chartColors.neon, stroke: chartColors.background, strokeWidth: 2 }} dot={<GlowingLatestDot fill={chartColors.background} />} />
                            </AreaChart>
                         </ResponsiveContainer>
                      </div>
                   </div>

                   {/* API Status & Connected Endpoints */}
                   <div
                     className={`lg:col-span-2 rounded-2xl p-4 sm:p-5 border flex flex-col relative overflow-hidden transition-shadow ${
                       isDark
                         ? "border-white/[0.06] bg-[#0f0f11] shadow-[0_1px_0_rgba(255,255,255,0.04)_inset,0_24px_48px_-28px_rgba(0,0,0,0.65)]"
                         : "border-slate-200/90 bg-white shadow-[0_1px_0_rgba(255,255,255,0.85)_inset,0_16px_40px_-20px_rgba(15,23,42,0.07)]"
                     }`}
                   >
                      <div className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140px] h-[140px] bg-[#D4F718] opacity-[0.06] sm:opacity-[0.05] blur-2xl rounded-full pointer-events-none" />
                      <div className={`absolute inset-0 rounded-2xl pointer-events-none ${isDark ? "bg-gradient-to-b from-white/[0.03] to-transparent" : "bg-gradient-to-b from-slate-50/50 to-transparent"}`} />

                      <h3 className={`text-sm sm:text-[15px] font-semibold mb-0.5 relative z-10 tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>Client sync mix</h3>
                      <p className={`text-[11px] sm:text-xs mb-3 relative z-10 leading-snug ${isDark ? "text-slate-500" : "text-slate-500"}`}>Roster segments (live + illustrative)</p>

                      <div className="flex-1 min-h-[180px] sm:min-h-[200px] relative z-10 w-full flex items-center justify-center">
                         <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20 pt-1">
                            <span className={`text-2xl sm:text-3xl font-bold tracking-tight tabular-nums leading-none ${isDark ? "text-white" : "text-slate-900"}`}>{totalRoster}</span>
                            <span className={`text-[9px] uppercase font-bold tracking-[0.18em] mt-1.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}>Accounts</span>
                         </div>

                         <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                               <defs>
                                  <filter id="pieGlowTheme2" x="-20%" y="-20%" width="140%" height="140%">
                                     <feGaussianBlur stdDeviation="5" result="blur" />
                                     <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                  </filter>
                               </defs>
                               <Pie 
                                 data={integrationStatusData} 
                                 cx="50%" cy="50%" 
                                 innerRadius={56}
                                 outerRadius={76}
                                 paddingAngle={6} 
                                 dataKey="value" 
                                 stroke="none"
                                 cornerRadius={5}
                               >
                                  {integrationStatusData.map((entry, index) => (
                                     <Cell 
                                        key={`cell-${index}`} 
                                        fill={entry.color} 
                                        filter={index === 0 && isDark ? 'url(#pieGlowTheme2)' : ''}
                                     />
                                  ))}
                               </Pie>
                               <RechartsTooltip 
                                 cursor={{fill: 'transparent'}}
                                 contentStyle={{ backgroundColor: chartColors.background, borderColor: chartColors.border, borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', color: isDark ? '#fff' : '#000', padding: '12px', fontWeight: 600 }} 
                                 itemStyle={{color: isDark ? '#e2e8f0' : '#475569', fontSize: '13px'}}
                               />
                            </PieChart>
                         </ResponsiveContainer>
                      </div>
                      <div className="mt-3 sm:mt-4 space-y-1 relative z-10 border-t pt-3 dark:border-white/[0.06] border-slate-100">
                         {integrationStatusData.map((status, idx) => (
                            <div key={idx} className={`flex items-center justify-between px-2 py-2 rounded-xl transition-colors ${isDark ? "hover:bg-white/[0.04]" : "hover:bg-slate-50/80"}`}>
                               <div className="flex items-center gap-2.5 min-w-0">
                                  <div className="w-2.5 h-2.5 rounded-full shrink-0 ring-2 ring-black/5 dark:ring-white/10" style={{ backgroundColor: status.color, boxShadow: `0 0 8px ${status.color}55` }} />
                                  <span className={`text-xs sm:text-[13px] font-semibold truncate ${isDark ? "text-slate-300" : "text-slate-600"}`}>{status.name}</span>
                               </div>
                               <span className={`text-xs sm:text-[13px] font-bold tabular-nums shrink-0 ${isDark ? "text-white" : "text-slate-900"}`}>{status.value}</span>
                            </div>
                         ))}
                      </div>
                   </div>
                </div>

                {/* REAL RECENT ACTIVITY LOG FROM useDashboardData */}
                <div
                  className={`rounded-2xl overflow-hidden border ${
                    isDark
                      ? "border-white/[0.06] bg-[#0f0f11] shadow-[0_1px_0_rgba(255,255,255,0.04)_inset,0_24px_48px_-28px_rgba(0,0,0,0.65)]"
                      : "border-slate-200/90 bg-white shadow-[0_1px_0_rgba(255,255,255,0.85)_inset,0_16px_40px_-20px_rgba(15,23,42,0.07)]"
                  }`}
                >
                   <div className={`px-4 py-3.5 sm:px-5 sm:py-4 border-b flex justify-between items-center gap-3 ${isDark ? "border-white/[0.06]" : "border-slate-100"}`}>
                      <div className="min-w-0">
                         <h3 className={`text-sm sm:text-[15px] font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>Operation stream</h3>
                         <p className={`text-[11px] sm:text-xs mt-0.5 ${isDark ? "text-slate-500" : "text-slate-500"}`}>Live activity from your workspace</p>
                      </div>
                      <button type="button" className={`p-2 rounded-xl shrink-0 transition-colors ${isDark ? "hover:bg-white/[0.06] text-slate-400" : "hover:bg-slate-100 text-slate-500"}`}>
                         <Search className="w-4 h-4" />
                      </button>
                   </div>

                   <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse whitespace-nowrap">
                         <thead>
                            <tr className={`text-[10px] sm:text-xs uppercase tracking-wider ${isDark ? "text-slate-500 bg-white/[0.02]" : "text-slate-500 bg-slate-50/90"}`}>
                               <th className="px-4 sm:px-5 py-2.5 sm:py-3 font-semibold">Log ID</th>
                               <th className="px-4 sm:px-5 py-2.5 sm:py-3 font-semibold">Type</th>
                               <th className="px-4 sm:px-5 py-2.5 sm:py-3 font-semibold">Title</th>
                               <th className="px-4 sm:px-5 py-2.5 sm:py-3 font-semibold">When</th>
                               <th className="px-4 sm:px-5 py-2.5 sm:py-3 font-semibold">Status</th>
                            </tr>
                         </thead>
                         <tbody className={`text-xs sm:text-sm divide-y ${isDark ? "divide-white/[0.05]" : "divide-slate-100"}`}>
                            {recentActivity.length === 0 ? (
                               <tr>
                                  <td colSpan={5} className={`px-5 py-10 text-center text-sm ${isDark ? "text-slate-500" : "text-slate-500"}`}>
                                     No activity yet. New events will appear here.
                                  </td>
                               </tr>
                            ) : (
                            recentActivity.map((log, idx) => (
                               <tr key={idx} className={`transition-colors ${isDark ? "hover:bg-white/[0.03]" : "hover:bg-slate-50/80"}`}>
                                  <td className={`px-4 sm:px-5 py-2.5 sm:py-3 font-mono text-[11px] sm:text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                                     {log.id.slice(0, 8).toUpperCase()}
                                  </td>
                                  <td className="px-4 sm:px-5 py-2.5 sm:py-3">
                                     <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-semibold border ${isDark ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-300" : "bg-indigo-50 border-indigo-200/80 text-indigo-700"}`}>
                                        <Activity className="w-3 h-3 shrink-0" /> {log.type.toUpperCase()}
                                     </span>
                                  </td>
                                  <td className="px-4 sm:px-5 py-2.5 sm:py-3 min-w-[200px] sm:min-w-[260px]">
                                     <div className={`font-semibold text-[13px] sm:text-sm ${isDark ? "text-white" : "text-slate-900"}`}>{log.title}</div>
                                     <div className={`text-[11px] sm:text-xs mt-0.5 truncate max-w-[320px] sm:max-w-[400px] ${isDark ? "text-slate-400" : "text-slate-500"}`}>{log.description}</div>
                                  </td>
                                  <td className={`px-4 sm:px-5 py-2.5 sm:py-3 font-mono text-[11px] sm:text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                                     {formatDate(log.timestamp)}
                                  </td>
                                  <td className="px-4 sm:px-5 py-2.5 sm:py-3">
                                     <span className={`flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold ${log.status === 'completed' ? (isDark ? 'text-emerald-400' : 'text-emerald-600') : (isDark ? 'text-slate-400' : 'text-slate-500')}`}>
                                        {log.status === 'completed' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                                        {log.status}
                                     </span>
                                  </td>
                               </tr>
                            ))
                            )}
                         </tbody>
                      </table>
                   </div>
                </div>

             </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function KPICard({ title, value, amount, trend, icon, highlight, isDark }: any) {
   return (
     <div
       className={`group relative overflow-hidden rounded-2xl border p-4 sm:p-[18px] transition-all duration-300 ${
         isDark
           ? "border-white/[0.06] bg-[#0f0f11] shadow-[0_1px_0_rgba(255,255,255,0.04)_inset,0_12px_32px_-16px_rgba(0,0,0,0.6)] hover:border-white/[0.1]"
           : "border-slate-200/90 bg-white shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_10px_28px_-14px_rgba(15,23,42,0.06)] hover:border-slate-300/90 hover:shadow-[0_14px_36px_-16px_rgba(15,23,42,0.09)]"
       }`}
     >
        {highlight && (
           <div
             className={`pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl ${isDark ? "bg-[#D4F718]/[0.12]" : "bg-[#D4F718]/20"}`}
           />
        )}
        {!highlight && (
           <div
             className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${isDark ? "bg-gradient-to-br from-white/[0.04] to-transparent" : "bg-gradient-to-br from-slate-50/80 to-transparent"}`}
           />
        )}
        <div className="relative flex items-start justify-between gap-2">
           <h4 className={`min-w-0 text-[11px] font-semibold uppercase tracking-wide leading-snug sm:text-xs ${isDark ? "text-slate-500" : "text-slate-500"}`}>{title}</h4>
           <div className={`shrink-0 rounded-lg border p-1.5 transition-colors ${isDark ? "border-white/[0.08] bg-white/[0.04] text-[#D4F718]" : "border-slate-200/90 bg-slate-50 text-slate-700"}`}>
              {icon || (trend === "up" ? <TrendingUp className="h-3.5 w-3.5" /> : <Activity className="h-3.5 w-3.5" />)}
           </div>
        </div>
        <div className={`relative mt-2.5 text-2xl font-semibold tracking-tight tabular-nums sm:text-[26px] sm:font-light ${isDark ? "text-white" : "text-slate-900"}`}>{amount}</div>
        <div
           className={`relative mt-1 text-xs font-medium leading-snug ${
              trend === "up" ? (isDark ? "text-emerald-400/95" : "text-emerald-600") : isDark ? "text-slate-400" : "text-slate-500"
           }`}
        >
           {value}
        </div>
     </div>
   );
}
