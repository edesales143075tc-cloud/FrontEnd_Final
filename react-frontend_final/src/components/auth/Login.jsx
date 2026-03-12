import { useState } from "react";

const Login = ({ onLogin }) => {
  const [email, setEmail]     = useState("");
  const [pass, setPass]       = useState("");
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);
  const [serverErr, setServerErr] = useState("");

  // Validate form before submitting
  const validate = () => {
    const e = {};
    if (!email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email";
    if (!pass) e.pass = "Password is required";
    else if (pass.length < 6) e.pass = "Minimum 6 characters";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({}); setServerErr(""); setLoading(true);

    try {
      // TODO: Replace with real API call when backend is ready
      // const res = await loginUser({ email, password: pass });
      // localStorage.setItem("token", res.data.token);
      // onLogin(res.data.user);

      // Simulated login for now
      await new Promise(r => setTimeout(r, 1000));
    if (email.trim().toLowerCase() === "admin@school.edu" && pass.trim() === "password") {
  localStorage.setItem("token", "demo-token-123");
  onLogin({ name: "Admin User", role: "administrator", email });
      } else {
        setServerErr("Invalid credentials. Use admin@school.edu / password");
      }
    } catch (err) {
      setServerErr("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #06090f; }
        .lp { min-height: 100vh; display: grid; grid-template-columns: 55% 45%; font-family: 'Bricolage Grotesque', sans-serif; }
        @media(max-width:800px) { .lp { grid-template-columns: 1fr; } .lp-left { display: none; } }
        body::before { content:''; position:fixed; inset:0; z-index:0; pointer-events:none;
          background-image: linear-gradient(rgba(14,240,192,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(14,240,192,0.025) 1px, transparent 1px);
          background-size: 52px 52px; }
        .lp-left { background: linear-gradient(145deg,#060e20 0%,#081730 55%,#0b1e3a 100%);
          display:flex; flex-direction:column; justify-content:center; padding:80px 68px;
          position:relative; overflow:hidden; border-right:1px solid rgba(255,255,255,0.06); z-index:1; }
        .orb-a { position:absolute; width:480px; height:480px; border-radius:50%;
          background:radial-gradient(circle,rgba(14,240,192,0.11) 0%,transparent 65%);
          top:-180px; right:-120px; animation:breathe 7s ease-in-out infinite; }
        .orb-b { position:absolute; width:320px; height:320px; border-radius:50%;
          background:radial-gradient(circle,rgba(245,158,11,0.07) 0%,transparent 65%);
          bottom:-100px; left:-80px; animation:breathe 9s ease-in-out infinite reverse; }
        @keyframes breathe { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.18);opacity:0.65} }
        .lp-pill { display:inline-flex; align-items:center; gap:9px;
          background:rgba(14,240,192,0.09); border:1px solid rgba(14,240,192,0.22);
          color:#0ef0c0; font-family:'DM Mono',monospace; font-size:10px; letter-spacing:2.5px;
          text-transform:uppercase; padding:7px 16px; border-radius:100px; margin-bottom:44px; width:fit-content; position:relative; z-index:1; }
        .pill-dot { width:6px; height:6px; border-radius:50%; background:#0ef0c0;
          box-shadow:0 0 6px #0ef0c0; animation:pdot 1.6s ease-in-out infinite; }
        @keyframes pdot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.25;transform:scale(0.7)} }
        .lp-h1 { font-family:'DM Serif Display',serif; font-size:clamp(38px,4.5vw,62px); line-height:1.07;
          margin-bottom:22px; color:#dde4f0; position:relative; z-index:1; }
        .lp-h1 em { font-style:italic; color:#0ef0c0; text-shadow:0 0 48px rgba(14,240,192,0.45); }
        .lp-sub { font-size:16px; color:#5a6680; line-height:1.75; max-width:400px; margin-bottom:60px; position:relative; z-index:1; }
        .lp-metrics { display:flex; border:1px solid rgba(255,255,255,0.11); border-radius:20px;
          background:rgba(255,255,255,0.025); backdrop-filter:blur(10px); width:fit-content; overflow:hidden; position:relative; z-index:1; }
        .lp-metric { padding:20px 34px; border-right:1px solid rgba(255,255,255,0.06); }
        .lp-metric:last-child { border-right:none; }
        .metric-n { font-family:'DM Serif Display',serif; font-size:36px; color:#dde4f0; margin-bottom:4px; }
        .metric-l { font-family:'DM Mono',monospace; font-size:10px; text-transform:uppercase; letter-spacing:1.5px; color:#5a6680; }
        .lp-right { background:#0b0f1a; display:flex; flex-direction:column; justify-content:center; padding:80px 68px; position:relative; z-index:1; }
        @media(max-width:520px) { .lp-right { padding:52px 28px; } }
        .lp-form { max-width:370px; margin:0 auto; width:100%; }
        .eyebrow { font-family:'DM Mono',monospace; font-size:10px; letter-spacing:2.5px; text-transform:uppercase; color:#f59e0b; margin-bottom:12px; }
        .lp-title { font-family:'DM Serif Display',serif; font-size:38px; color:#dde4f0; margin-bottom:6px; line-height:1.1; }
        .lp-caption { font-size:14px; color:#5a6680; margin-bottom:38px; }
        .err-box { background:rgba(251,113,133,0.08); border:1px solid rgba(251,113,133,0.22); color:#fb7185;
          border-radius:14px; padding:11px 15px; font-size:13px; margin-bottom:22px; display:flex; gap:9px; }
        .fg { margin-bottom:18px; }
        .fg-label { display:block; font-family:'DM Mono',monospace; font-size:10px; letter-spacing:1.5px;
          text-transform:uppercase; color:#5a6680; margin-bottom:8px; }
        .fg-input { width:100%; padding:13px 15px; background:#0f1523; border:1px solid rgba(255,255,255,0.11);
          border-radius:14px; font-family:'Bricolage Grotesque',sans-serif; font-size:15px; color:#dde4f0; outline:none;
          transition:border-color .2s, box-shadow .2s, background .2s; }
        .fg-input::placeholder { color:#2a334a; }
        .fg-input:focus { border-color:#0ef0c0; background:rgba(14,240,192,0.035); box-shadow:0 0 0 3px rgba(14,240,192,0.07); }
        .fg-input.bad { border-color:#fb7185; }
        .fg-err { font-family:'DM Mono',monospace; font-size:11px; color:#fb7185; margin-top:6px; }
        .btn-login { width:100%; padding:14px; background:#0ef0c0; color:#04120e; border:none; border-radius:14px;
          cursor:pointer; font-family:'Bricolage Grotesque',sans-serif; font-size:15px; font-weight:700;
          margin-top:10px; transition:background .2s, box-shadow .2s, transform .15s; }
        .btn-login:hover { background:#18ffd4; box-shadow:0 4px 28px rgba(14,240,192,0.38); transform:translateY(-1px); }
        .btn-login:disabled { opacity:0.45; cursor:not-allowed; transform:none; }
        .demo-box { margin-top:22px; background:rgba(96,165,250,0.06); border:1px solid rgba(96,165,250,0.14);
          border-radius:14px; padding:14px 16px; font-size:13px; color:#5a6680; line-height:1.65; }
        .demo-box code { font-family:'DM Mono',monospace; font-size:12px; background:rgba(255,255,255,0.07);
          padding:2px 7px; border-radius:5px; color:#60a5fa; }
      `}</style>

      <div className="lp">
        {/* Left hero panel */}
        <div className="lp-left">
          <div className="orb-a" /><div className="orb-b" />
          <div className="lp-pill"><div className="pill-dot" />Academic Portal</div>
          <h1 className="lp-h1">Smart studies<br />start with <em>insight</em></h1>
          <p className="lp-sub">One unified dashboard for student records, course management, and live attendance tracking.</p>
          <div className="lp-metrics">
            {[["500+","Students"],["20","Courses"],["93%","Attendance"]].map(([n,l]) => (
              <div className="lp-metric" key={l}>
                <div className="metric-n">{n}</div>
                <div className="metric-l">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right form panel */}
        <div className="lp-right">
          <div className="lp-form">
            <div className="eyebrow">Secure Access</div>
            <h2 className="lp-title">Welcome back</h2>
            <p className="lp-caption">Sign in to access your dashboard</p>

            {serverErr && <div className="err-box">⚠ {serverErr}</div>}

            <div className="fg">
              <label className="fg-label">Email Address</label>
              <input className={`fg-input${errors.email ? " bad" : ""}`}
                type="email" placeholder="admin@school.edu"
                value={email} onChange={e => setEmail(e.target.value)} />
              {errors.email && <div className="fg-err">{errors.email}</div>}
            </div>

            <div className="fg">
              <label className="fg-label">Password</label>
              <input className={`fg-input${errors.pass ? " bad" : ""}`}
                type="password" placeholder="••••••••"
                value={pass} onChange={e => setPass(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSubmit()} />
              {errors.pass && <div className="fg-err">{errors.pass}</div>}
            </div>

            <button className="btn-login" onClick={handleSubmit} disabled={loading}>
              {loading ? "Signing in…" : "Sign In →"}
            </button>

            <div className="demo-box">
              Demo — email: <code>admin@school.edu</code><br />
              password: <code>password</code>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;