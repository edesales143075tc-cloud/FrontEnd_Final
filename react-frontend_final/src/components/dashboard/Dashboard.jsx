import { useState, useEffect } from "react";
import EnrollmentChart from "./EnrollmentChart";
import CourseDistributionChart from "./CourseDistributionChart";
import AttendanceChart from "./AttendanceChart";
import WeatherWidget from "../weather/WeatherWidget";
import LoadingSpinner from "../common/LoadingSpinner";

// Mock data - replace with API calls when backend is ready
const STATS = [
  { ic:"🎓", n:"558", l:"Total Students",  ch:"+12 this month", c:"#0ef0c0" },
  { ic:"📚", n:"20",  l:"Active Courses",   ch:"6 departments",  c:"#60a5fa" },
  { ic:"📋", n:"93%", l:"Avg Attendance",   ch:"This semester",  c:"#f59e0b" },
  { ic:"📅", n:"5",   l:"Upcoming Events",  ch:"Next 30 days",   c:"#fb7185" },
];

const NAV = [
  { id:"overview",   ic:"◈", lbl:"Overview"   },
  { id:"students",   ic:"◉", lbl:"Students"   },
  { id:"courses",    ic:"◐", lbl:"Courses"    },
  { id:"attendance", ic:"◑", lbl:"Attendance" },
  { id:"weather",    ic:"◌", lbl:"Weather"    },
];

const TITLES = {
  overview:"Dashboard Overview", students:"Student Enrollment",
  courses:"Course Distribution", attendance:"Attendance Trends",
  weather:"Weather Forecast"
};

const Dashboard = ({ user, onLogout }) => {
  const [tab, setTab]   = useState("overview");
  const [busy, setBusy] = useState(true);

  // Simulate loading when switching tabs
  useEffect(() => {
    setBusy(true);
    const t = setTimeout(() => setBusy(false), 700);
    return () => clearTimeout(t);
  }, [tab]);

  const now = new Date().toLocaleDateString("en-US", {
    weekday:"long", year:"numeric", month:"long", day:"numeric"
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Bricolage Grotesque',sans-serif;background:#06090f;color:#dde4f0;-webkit-font-smoothing:antialiased}
        body::before{content:'';position:fixed;inset:0;z-index:0;pointer-events:none;
          background-image:linear-gradient(rgba(14,240,192,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(14,240,192,0.02) 1px,transparent 1px);
          background-size:52px 52px}
        ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-track{background:#0b0f1a} ::-webkit-scrollbar-thumb{background:#2a334a;border-radius:4px}
        .shell{display:flex;min-height:100vh;position:relative;z-index:1}
        /* Sidebar */
        .sb{width:252px;flex-shrink:0;background:#0b0f1a;border-right:1px solid rgba(255,255,255,0.06);
          display:flex;flex-direction:column;padding:26px 14px;position:sticky;top:0;height:100vh;overflow-y:auto}
        @media(max-width:960px){.sb{display:none}}
        .sb-brand{display:flex;align-items:center;gap:11px;padding:0 8px;margin-bottom:42px}
        .sb-mark{width:36px;height:36px;border-radius:10px;flex-shrink:0;
          background:linear-gradient(135deg,#0ef0c0 0%,#0891b2 100%);
          display:flex;align-items:center;justify-content:center;font-size:17px;
          box-shadow:0 0 22px rgba(14,240,192,0.28)}
        .sb-name{font-family:'DM Serif Display',serif;font-size:21px;color:#dde4f0}
        .sb-name b{color:#0ef0c0;font-weight:400;font-style:italic}
        .sb-section{font-family:'DM Mono',monospace;font-size:9px;letter-spacing:2.5px;text-transform:uppercase;
          color:#2a334a;padding:0 10px;margin:22px 0 7px}
        .sb-item{display:flex;align-items:center;gap:11px;padding:10px 12px;border-radius:10px;width:100%;
          border:1px solid transparent;background:none;cursor:pointer;font-family:'Bricolage Grotesque',sans-serif;
          font-size:14px;font-weight:500;color:#5a6680;transition:all .16s;text-align:left;position:relative;margin-bottom:2px}
        .sb-item:hover{background:rgba(255,255,255,0.04);color:#dde4f0}
        .sb-item.on{background:rgba(14,240,192,0.08);border-color:rgba(14,240,192,0.18);color:#0ef0c0}
        .sb-item.on::before{content:'';position:absolute;left:-14px;top:50%;transform:translateY(-50%);
          width:3px;height:18px;background:#0ef0c0;border-radius:0 3px 3px 0;box-shadow:0 0 10px #0ef0c0}
        .sb-ic{font-size:15px;width:20px;text-align:center;flex-shrink:0}
        .sb-foot{margin-top:auto;padding-top:18px;border-top:1px solid rgba(255,255,255,0.06)}
        .sb-user{display:flex;align-items:center;gap:11px;padding:10px}
        .sb-ava{width:34px;height:34px;border-radius:9px;flex-shrink:0;
          background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);
          display:flex;align-items:center;justify-content:center;font-weight:800;font-size:15px;color:#1a0a00}
        .sb-uname{font-size:13px;font-weight:600;color:#dde4f0}
        .sb-urole{font-family:'DM Mono',monospace;font-size:10px;color:#5a6680;margin-top:2px}
        /* Main */
        .main{flex:1;padding:36px 30px;min-width:0;overflow-x:hidden}
        @media(max-width:600px){.main{padding:24px 16px}}
        .topbar{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:32px;gap:14px}
        .tb-eyebrow{font-family:'DM Mono',monospace;font-size:10px;text-transform:uppercase;letter-spacing:2px;color:#0ef0c0;margin-bottom:7px}
        .tb-title{font-family:'DM Serif Display',serif;font-size:30px;color:#dde4f0;line-height:1.1}
        .tb-date{font-size:13px;color:#5a6680;margin-top:6px}
        .btn-out{padding:9px 18px;flex-shrink:0;background:transparent;border:1px solid rgba(255,255,255,0.11);
          border-radius:10px;cursor:pointer;font-family:'Bricolage Grotesque',sans-serif;font-size:13px;
          font-weight:600;color:#5a6680;transition:all .18s;white-space:nowrap}
        .btn-out:hover{border-color:#fb7185;color:#fb7185;background:rgba(251,113,133,0.05)}
        /* Mobile tabs */
        .mtabs{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:26px}
        .mtab{padding:8px 16px;border-radius:100px;border:1px solid rgba(255,255,255,0.11);
          background:none;cursor:pointer;font-family:'Bricolage Grotesque',sans-serif;
          font-size:13px;font-weight:500;color:#5a6680;transition:all .15s}
        .mtab.on{background:#0ef0c0;color:#04120e;border-color:#0ef0c0;font-weight:700}
        .mtab:hover:not(.on){color:#dde4f0}
        /* Stat cards */
        .stat-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(185px,1fr));gap:14px;margin-bottom:24px}
        .stat-card{background:#0f1523;border:1px solid rgba(255,255,255,0.06);border-radius:20px;
          padding:22px 20px;position:relative;overflow:hidden;transition:border-color .2s,transform .2s}
        .stat-card:hover{border-color:rgba(255,255,255,0.11);transform:translateY(-2px)}
        .stat-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;
          background:var(--cline);box-shadow:0 0 14px var(--cline)}
        .stat-ic{font-size:20px;margin-bottom:14px;display:block;opacity:0.85}
        .stat-n{font-family:'DM Serif Display',serif;font-size:42px;color:#dde4f0;line-height:1;margin-bottom:5px}
        .stat-l{font-family:'DM Mono',monospace;font-size:10px;text-transform:uppercase;letter-spacing:1px;color:#5a6680}
        .stat-ch{font-size:11px;color:#0ef0c0;margin-top:7px}
        /* Chart cards */
        .cgrid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px}
        @media(max-width:900px){.cgrid{grid-template-columns:1fr}}
        .cspan{grid-column:1/-1}
        .cc{background:#0f1523;border:1px solid rgba(255,255,255,0.06);border-radius:20px;padding:24px;transition:border-color .2s}
        .cc:hover{border-color:rgba(255,255,255,0.11)}
        .cc-title{font-family:'DM Serif Display',serif;font-size:18px;color:#dde4f0;margin-bottom:4px}
        .cc-sub{font-size:13px;color:#5a6680;margin-bottom:20px}
        @keyframes up-in{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        .u0{animation:up-in .4s ease both}
        .u1{animation:up-in .4s .06s ease both}
        .u2{animation:up-in .4s .12s ease both}
        .u3{animation:up-in .4s .18s ease both}
      `}</style>

      <div className="shell">
        {/* Sidebar */}
        <aside className="sb">
          <div className="sb-brand">
            <div className="sb-mark">🏫</div>
            <div className="sb-name">Edu<b>Dash</b></div>
          </div>
          <div className="sb-section">Navigation</div>
          {NAV.map(n => (
            <button key={n.id}
              className={`sb-item${tab===n.id?" on":""}`}
              onClick={() => setTab(n.id)}>
              <span className="sb-ic">{n.ic}</span>{n.lbl}
            </button>
          ))}
          <div className="sb-foot">
            <div className="sb-user">
              <div className="sb-ava">{user.name[0]}</div>
              <div>
                <div className="sb-uname">{user.name}</div>
                <div className="sb-urole">{user.role}</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="main">
          <div className="topbar">
            <div>
              <div className="tb-eyebrow">{TITLES[tab]}</div>
              <h1 className="tb-title">{TITLES[tab]}</h1>
              <div className="tb-date">{now}</div>
            </div>
            <button className="btn-out" onClick={onLogout}>↩ Sign Out</button>
          </div>

          {/* Mobile nav tabs */}
          <div className="mtabs">
            {NAV.map(n => (
              <button key={n.id}
                className={`mtab${tab===n.id?" on":""}`}
                onClick={() => setTab(n.id)}>{n.lbl}</button>
            ))}
          </div>

          {busy ? <LoadingSpinner /> : (
            <>
              {tab === "overview" && (
                <>
                  <div className="stat-grid">
                    {STATS.map((s,i) => (
                      <div key={s.l} className={`stat-card u${i}`} style={{"--cline":s.c}}>
                        <span className="stat-ic">{s.ic}</span>
                        <div className="stat-n">{s.n}</div>
                        <div className="stat-l">{s.l}</div>
                        <div className="stat-ch">↑ {s.ch}</div>
                      </div>
                    ))}
                  </div>
                  <div className="cgrid">
                    <div className="cc u0"><EnrollmentChart /></div>
                    <div className="cc u1"><CourseDistributionChart /></div>
                    <div className="cc cspan u2"><AttendanceChart /></div>
                  </div>
                </>
              )}
              {tab === "students"   && <div className="cc u0"><EnrollmentChart full /></div>}
              {tab === "courses"    && <div className="cc u0"><CourseDistributionChart full /></div>}
              {tab === "attendance" && <div className="cc u0"><AttendanceChart full /></div>}
              {tab === "weather"    && <WeatherWidget />}
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default Dashboard;