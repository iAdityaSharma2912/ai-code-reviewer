import { useState, useEffect, useRef } from "react";

const THEME = {
  bg: "#070910",
  surface: "#0e1118",
  surfaceHigh: "#141820",
  border: "#1a2035",
  accent: "#3b82f6",
  accentGlow: "rgba(59,130,246,0.2)",
  accentGreen: "#22c55e",
  accentYellow: "#f59e0b",
  accentRed: "#ef4444",
  accentPurple: "#a855f7",
  accentCyan: "#06b6d4",
  text: "#e2e8f0",
  textMuted: "#4a5568",
  textDim: "#94a3b8",
};

const LANGS = ["python","javascript","typescript","java","cpp","c","go","rust","php","ruby","swift","kotlin","csharp"];

const SAMPLE = {
  python: `import sqlite3\n\nAPI_KEY = "sk-prod-abc123secret"  # hardcoded!\n\ndef get_user(username):\n    conn = sqlite3.connect("users.db")\n    query = "SELECT * FROM users WHERE name = '" + username + "'"\n    result = conn.execute(query)\n    return result.fetchall()\n\ndef find_duplicates(arr):\n    duplicates = []\n    for i in range(len(arr)):\n        for j in range(i+1, len(arr)):\n            if arr[i] == arr[j]:\n                duplicates.append(arr[i])\n    return duplicates\n\ndef divide(a, b):\n    return a / b`,
  javascript: `const SECRET = "mysupersecretkey123";\n\napp.get('/user', (req, res) => {\n  const id = req.query.id;\n  const query = \`SELECT * FROM users WHERE id = \${id}\`;\n  db.query(query, (err, result) => {\n    if (err) throw err;\n    res.json(result);\n  });\n});\n\nfunction processItems(items) {\n  let result = [];\n  for (let i = 0; i < items.length; i++) {\n    for (let j = 0; j < items.length; j++) {\n      if (items[i] === items[j]) result.push(items[i]);\n    }\n  }\n  return result;\n}`,
};

// ── SVG Icon Library ────────────────────────────────────────────────────────
const Icon = {
  // App logo — gear/cog
  Logo: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"/>
    </svg>
  ),
  // Wifi / connected
  Connected: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1" fill="currentColor"/>
    </svg>
  ),
  // X / no connection
  Disconnected: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="1" y1="1" x2="23" y2="23"/><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"/><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"/><path d="M10.71 5.05A16 16 0 0 1 22.56 9"/><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1" fill="currentColor"/>
    </svg>
  ),
  // Magnifier / search
  Search: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  // Folder / upload
  Upload: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
    </svg>
  ),
  // Refresh
  Sample: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.51"/>
    </svg>
  ),
  // Trash
  Clear: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
    </svg>
  ),
  // Bar chart / overview
  Overview: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
    </svg>
  ),
  // Bug
  Bug: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2l1.5 1.5"/><path d="M14.5 3.5L16 2"/><path d="M9 7.5a4 4 0 0 0-1 7.9V17a3 3 0 0 0 6 0v-1.6a4 4 0 0 0-1-7.9H9Z"/><path d="M6.5 10H4a1 1 0 0 0-1 1v1a4 4 0 0 0 4 4"/><path d="M17.5 10H20a1 1 0 0 1 1 1v1a4 4 0 0 1-4 4"/><path d="M8 14h8"/><path d="M9 5a3 3 0 0 1 6 0"/><path d="M8 21h8"/>
    </svg>
  ),
  // Shield
  Security: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>
    </svg>
  ),
  // Bolt / performance
  Performance: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  // Sparkles / refactor
  Refactor: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>
      <path d="M5 3v4"/><path d="M3 5h4"/><path d="M19 17v4"/><path d="M17 19h4"/>
    </svg>
  ),
  // Loader / spinner placeholder (static; spun via CSS)
  Loader: ({ size = 48 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
    </svg>
  ),
  // Check circle
  Check: ({ size = 38 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  ),
  // Warning triangle
  Warning: ({ size = 40 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  // Lightbulb / suggestion
  Fix: ({ size = 13 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/>
    </svg>
  ),
  // Chevron up/down
  ChevronUp: ({ size = 12 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="18 15 12 9 6 15"/>
    </svg>
  ),
  ChevronDown: ({ size = 12 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  ),
  // Retry
  Retry: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.51"/>
    </svg>
  ),
  // Severity dots — filled circle variants
  Critical: ({ size = 13 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#ef4444"/><line x1="12" y1="8" x2="12" y2="12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/><circle cx="12" cy="16" r="1.5" fill="#fff"/></svg>
  ),
  High: ({ size = 13 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#f59e0b"/><line x1="12" y1="7" x2="12" y2="13" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/><circle cx="12" cy="17" r="1.5" fill="#fff"/></svg>
  ),
  Medium: ({ size = 13 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#a855f7"/><line x1="8" y1="12" x2="16" y2="12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/></svg>
  ),
  Low: ({ size = 13 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#22c55e"/><polyline points="8,12 11,15 16,9" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
  ),
  Info: ({ size = 13 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#06b6d4"/><line x1="12" y1="16" x2="12" y2="12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/><circle cx="12" cy="8" r="1.5" fill="#fff"/></svg>
  ),
};

// severity → icon component
const SevIcon = ({ sev, size = 13 }) => {
  const map = { critical: Icon.Critical, high: Icon.High, medium: Icon.Medium, low: Icon.Low, info: Icon.Info };
  const C = map[sev] || Icon.Info;
  return <C size={size} />;
};

// tab → icon component
const TAB_ICONS = {
  overview: Icon.Overview,
  bugs: Icon.Bug,
  security: Icon.Security,
  performance: Icon.Performance,
  refactoring: Icon.Refactor,
};

// ── Animated Canvas Background ─────────────────────────────────────────────
function AnimatedBG() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener("resize", resize);

    const orbs = Array.from({ length: 5 }, (_, i) => ({
      x: Math.random() * W, y: Math.random() * H,
      r: 200 + Math.random() * 180,
      vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
      color: ["rgba(59,130,246,","rgba(168,85,247,","rgba(6,182,212,","rgba(59,130,246,","rgba(34,197,94,"][i],
      phase: Math.random() * Math.PI * 2,
    }));

    const nodes = Array.from({ length: 55 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      r: 1 + Math.random() * 1.5, opacity: 0.15 + Math.random() * 0.45,
    }));

    const fallers = Array.from({ length: 10 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      speed: 0.5 + Math.random() * 0.8, opacity: 0.03 + Math.random() * 0.05,
      chars: ["01","{}","[]","=>","<>","def","class","if","for","()","::","&&"],
      text: "", timer: 0,
    }));

    let t = 0;
    const draw = () => {
      t += 0.004;
      ctx.clearRect(0, 0, W, H);
      const COLS = 22, ROWS = 14;
      ctx.strokeStyle = "rgba(26,32,53,0.55)"; ctx.lineWidth = 1;
      for (let i = 0; i <= COLS; i++) { const x = (W/COLS)*i; ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
      for (let j = 0; j <= ROWS; j++) { const y = (H/ROWS)*j; ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }
      orbs.forEach(o => {
        o.x += o.vx; o.y += o.vy;
        if (o.x < -o.r) o.x = W+o.r; if (o.x > W+o.r) o.x = -o.r;
        if (o.y < -o.r) o.y = H+o.r; if (o.y > H+o.r) o.y = -o.r;
        const a = 0.028 + 0.012*Math.sin(t*1.4+o.phase);
        const g = ctx.createRadialGradient(o.x,o.y,0,o.x,o.y,o.r);
        g.addColorStop(0, o.color+a+")"); g.addColorStop(1, o.color+"0)");
        ctx.beginPath(); ctx.arc(o.x,o.y,o.r,0,Math.PI*2); ctx.fillStyle=g; ctx.fill();
      });
      nodes.forEach(n => {
        n.x+=n.vx; n.y+=n.vy;
        if (n.x<0||n.x>W) n.vx*=-1; if (n.y<0||n.y>H) n.vy*=-1;
      });
      for (let i=0;i<nodes.length;i++) for (let j=i+1;j<nodes.length;j++) {
        const dx=nodes[i].x-nodes[j].x, dy=nodes[i].y-nodes[j].y, d=Math.sqrt(dx*dx+dy*dy);
        if (d<110) { ctx.beginPath(); ctx.moveTo(nodes[i].x,nodes[i].y); ctx.lineTo(nodes[j].x,nodes[j].y); ctx.strokeStyle=`rgba(59,130,246,${0.07*(1-d/110)})`; ctx.lineWidth=0.5; ctx.stroke(); }
      }
      nodes.forEach(n => { ctx.beginPath(); ctx.arc(n.x,n.y,n.r,0,Math.PI*2); ctx.fillStyle=`rgba(99,179,255,${n.opacity})`; ctx.fill(); });
      ctx.font="11px 'Courier New',monospace";
      fallers.forEach(f => {
        f.y+=f.speed; f.timer++;
        if (f.timer%28===0) f.text=f.chars[Math.floor(Math.random()*f.chars.length)];
        if (f.y>H+30) { f.y=-20; f.x=Math.random()*W; }
        ctx.fillStyle=`rgba(59,130,246,${f.opacity})`; ctx.fillText(f.text,f.x,f.y);
      });
      const sy=(t*75)%H;
      const sg=ctx.createLinearGradient(0,sy-55,0,sy+55);
      sg.addColorStop(0,"rgba(59,130,246,0)"); sg.addColorStop(0.5,"rgba(59,130,246,0.022)"); sg.addColorStop(1,"rgba(59,130,246,0)");
      ctx.fillStyle=sg; ctx.fillRect(0,sy-55,W,110);
      animId=requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none" }} />;
}

// ── Syntax Highlighter ──────────────────────────────────────────────────────
function highlight(code, lang) {
  if (!code) return "";
  let h = code.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  const kwPy = /\b(def|class|import|from|return|if|else|elif|for|while|in|not|and|or|True|False|None|try|except|with|as|pass|break|continue|lambda|yield|global)\b/g;
  const kwJs = /\b(const|let|var|function|return|if|else|for|while|class|import|export|from|default|new|this|typeof|null|undefined|true|false|async|await|try|catch|throw|break|continue)\b/g;
  h = h.replace(/(["'`])(?:(?!\1)[^\\]|\\.)*\1/g, m => `<span style="color:#86efac">${m}</span>`);
  h = h.replace(/(\/\/.*$|#.*$)/gm, m => `<span style="color:#374151;font-style:italic">${m}</span>`);
  h = h.replace(lang==="python" ? kwPy : kwJs, m => `<span style="color:#93c5fd;font-weight:600">${m}</span>`);
  h = h.replace(/\b(\d+\.?\d*)\b/g, m => `<span style="color:#fda4af">${m}</span>`);
  return h;
}

// ── Score Ring ──────────────────────────────────────────────────────────────
function ScoreRing({ score }) {
  const r = 44, c = 2*Math.PI*r;
  const col = score>=75 ? THEME.accentGreen : score>=50 ? THEME.accentYellow : THEME.accentRed;
  return (
    <svg width="120" height="120" style={{ transform:"rotate(-90deg)", filter:`drop-shadow(0 0 14px ${col}55)` }}>
      <circle cx="60" cy="60" r={r} fill="none" stroke={THEME.border} strokeWidth="7"/>
      <circle cx="60" cy="60" r={r} fill="none" stroke={col} strokeWidth="7"
        strokeDasharray={`${(score/100)*c} ${c}`} strokeLinecap="round"
        style={{ transition:"stroke-dasharray 1.4s cubic-bezier(.4,0,.2,1)" }}/>
      <text x="60" y="60" textAnchor="middle" dominantBaseline="central"
        style={{ transform:"rotate(90deg) translate(0,-120px)", fill:col, fontSize:26, fontWeight:700, fontFamily:"monospace" }}>
        {score}
      </text>
    </svg>
  );
}

// ── Issue Card ──────────────────────────────────────────────────────────────
function IssueCard({ issue }) {
  const [open, setOpen] = useState(false);
  const cols = { critical:THEME.accentRed, high:THEME.accentYellow, medium:THEME.accentPurple, low:THEME.accentGreen, info:THEME.accentCyan };
  const col = cols[issue.severity] || THEME.accentCyan;
  return (
    <div onClick={() => setOpen(o=>!o)} style={{
      background: open ? THEME.surfaceHigh : "rgba(14,17,24,0.8)",
      border:`1px solid ${open ? col : THEME.border}`, borderRadius:10,
      padding:"13px 16px", cursor:"pointer", marginBottom:8,
      transition:"all .25s", boxShadow: open ? `0 0 18px ${col}18` : "none",
      backdropFilter:"blur(8px)"
    }}>
      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
        <SevIcon sev={issue.severity} size={15}/>
        <div style={{ flex:1 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
            <span style={{ color:THEME.text, fontWeight:600, fontSize:13 }}>{issue.title}</span>
            <span style={{ fontSize:10, fontWeight:700, padding:"2px 7px", borderRadius:20, background:col+"22", color:col, border:`1px solid ${col}44` }}>
              {(issue.severity||"info").toUpperCase()}
            </span>
            {issue.line && (
              <span style={{ fontSize:11, color:THEME.textMuted, display:"flex", alignItems:"center", gap:3 }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="15" y2="12"/><line x1="3" y1="18" x2="18" y2="18"/></svg>
                {issue.line}
              </span>
            )}
          </div>
          {!open && <p style={{ margin:"3px 0 0", color:THEME.textMuted, fontSize:12, lineHeight:1.4 }}>{issue.description?.slice(0,88)}{issue.description?.length>88?"…":""}</p>}
        </div>
        <span style={{ color:THEME.textMuted }}>
          {open ? <Icon.ChevronUp size={13}/> : <Icon.ChevronDown size={13}/>}
        </span>
      </div>
      {open && (
        <div style={{ marginTop:12, borderTop:`1px solid ${THEME.border}`, paddingTop:12 }}>
          <p style={{ color:THEME.textDim, fontSize:13, lineHeight:1.7, margin:"0 0 10px" }}>{issue.description}</p>
          {issue.suggestion && (
            <div style={{ background:THEME.accentGreen+"0e", border:`1px solid ${THEME.accentGreen}30`, borderRadius:8, padding:"9px 13px", marginBottom:8, display:"flex", alignItems:"flex-start", gap:7 }}>
              <span style={{ color:THEME.accentGreen, marginTop:1, flexShrink:0 }}><Icon.Fix size={13}/></span>
              <span style={{ color:THEME.accentGreen, fontSize:12, fontWeight:600, marginRight:4 }}>Fix:</span>
              <span style={{ color:THEME.textDim, fontSize:12 }}>{issue.suggestion}</span>
            </div>
          )}
          {issue.code_fix && (
            <pre style={{ marginTop:8, background:"#05070c", borderRadius:8, padding:"10px 14px", fontSize:11, color:"#86efac", fontFamily:"monospace", overflowX:"auto", border:`1px solid ${THEME.border}` }}>
              {issue.code_fix}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}

// ── MAIN APP ────────────────────────────────────────────────────────────────
export default function App() {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  const [code, setCode] = useState(SAMPLE.python);
  const [lang, setLang] = useState("python");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [error, setError] = useState(null);
  const textareaRef = useRef(null);
  const hlRef = useRef(null);

  const syncScroll = () => {
    if (hlRef.current && textareaRef.current) {
      hlRef.current.scrollTop = textareaRef.current.scrollTop;
      hlRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  const handleFile = e => {
    const file = e.target.files?.[0]; if (!file) return;
    const ext = file.name.split(".").pop().toLowerCase();
    const map = { py:"python",js:"javascript",ts:"typescript",java:"java",cpp:"cpp",c:"c",go:"go",rs:"rust",php:"php",rb:"ruby",swift:"swift",kt:"kotlin",cs:"csharp" };
    if (map[ext]) setLang(map[ext]);
    const r = new FileReader(); r.onload = ev => setCode(ev.target.result); r.readAsText(file);
  };

  const analyze = async () => {
    if (!code.trim()) return;
    if (!apiKey) {
      setError("API key missing. Add VITE_OPENROUTER_API_KEY to your .env file and restart the dev server.");
      setLoading(false);
      return;
    }
    setLoading(true); setResult(null); setError(null); setActiveTab("overview");

    const prompt = `You are an expert code reviewer. Analyze the following ${lang} code and respond ONLY with a valid JSON object. No markdown fences, no preamble, no explanation — just raw JSON.

Code:
\`\`\`${lang}
${code}
\`\`\`

Return EXACTLY this JSON structure:
{
  "score": <integer 0-100>,
  "scores": { "readability": <0-100>, "performance": <0-100>, "security": <0-100>, "best_practices": <0-100> },
  "summary": "<2-3 sentence assessment>",
  "bugs": [{ "title":"", "severity":"critical|high|medium|low", "line":<int|null>, "description":"", "suggestion":"", "code_fix":<string|null> }],
  "security": [{ "title":"", "severity":"critical|high|medium|low", "line":<int|null>, "description":"", "suggestion":"", "code_fix":<string|null> }],
  "performance": [{ "title":"", "severity":"high|medium|low", "line":<int|null>, "description":"", "suggestion":"", "code_fix":<string|null> }],
  "refactoring": [{ "title":"", "severity":"info", "line":<int|null>, "description":"", "suggestion":"", "code_fix":<string|null> }]
}`;

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
          "HTTP-Referer": window.location.href,
          "X-Title": "CodeScan AI"
        },
        body: JSON.stringify({ model:"openai/gpt-4o", max_tokens:2000, messages:[{ role:"user", content:prompt }] })
      });
      if (res.status===401) { setError("Invalid API key. Check your VITE_OPENROUTER_API_KEY in .env."); setLoading(false); return; }
      const data = await res.json();
      const raw = data.choices?.[0]?.message?.content || "";
      const parsed = JSON.parse(raw.replace(/```json|```/g,"").trim());
      setResult(parsed);
    } catch(e) {
      setError("Analysis failed. Check your API key and try again.");
    } finally { setLoading(false); }
  };

  const TABS = ["overview","bugs","security","performance","refactoring"];
  const counts = result ? { bugs:result.bugs?.length||0, security:result.security?.length||0, performance:result.performance?.length||0, refactoring:result.refactoring?.length||0 } : {};

  return (
    <div style={{ minHeight:"100vh", background:THEME.bg, color:THEME.text, fontFamily:"'JetBrains Mono','Fira Code',monospace", display:"flex", flexDirection:"column", position:"relative", overflow:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:5px;height:5px}
        ::-webkit-scrollbar-track{background:${THEME.surface}}
        ::-webkit-scrollbar-thumb{background:${THEME.border};border-radius:3px}
        textarea{resize:none;}
        .hl{position:absolute;top:0;left:0;right:0;bottom:0;pointer-events:none;white-space:pre;overflow:auto;padding:16px;font-size:13px;line-height:1.75;font-family:'JetBrains Mono',monospace;}
        .ci{position:relative;z-index:1;background:transparent!important;color:transparent!important;caret-color:${THEME.accent};white-space:pre;overflow:auto;padding:16px;font-size:13px;line-height:1.75;font-family:'JetBrains Mono',monospace;border:none;outline:none;width:100%;height:100%;}
        .gbtn{transition:all .2s;}
        .gbtn:hover:not(:disabled){box-shadow:0 0 30px ${THEME.accentGlow};transform:translateY(-1px);}
        .gbtn:active:not(:disabled){transform:translateY(0);}
        .tab{transition:all .2s;cursor:pointer;border:none;font-family:inherit;background:transparent;}
        .tab:hover{background:${THEME.surfaceHigh}!important;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes glow{0%,100%{box-shadow:0 0 18px ${THEME.accentGlow}}50%{box-shadow:0 0 36px rgba(59,130,246,0.38)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.45}}
        .fade-up{animation:fadeUp .4s ease forwards;}
        .bar{transition:width 1.3s cubic-bezier(.4,0,.2,1);}
        .glass{background:rgba(10,12,18,0.82);backdrop-filter:blur(18px);}
        select,input{font-family:inherit;}
      `}</style>

      <AnimatedBG />

      {/* ── Header ── */}
      <header className="glass" style={{ borderBottom:`1px solid ${THEME.border}`, padding:"13px 22px", display:"flex", alignItems:"center", justifyContent:"space-between", position:"relative", zIndex:10 }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ width:38, height:38, borderRadius:10, background:`linear-gradient(135deg,${THEME.accent},${THEME.accentPurple})`, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", boxShadow:`0 0 22px ${THEME.accentGlow}`, animation:"glow 3s ease infinite" }}>
            <Icon.Logo size={20}/>
          </div>
          <div>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:800, fontSize:19, letterSpacing:-.5 }}>
              CodeScan <span style={{ color:THEME.accent, textShadow:`0 0 18px ${THEME.accent}88` }}>AI</span>
            </div>
            <div style={{ color:THEME.textMuted, fontSize:10, letterSpacing:1 }}>INTELLIGENT CODE REVIEW</div>
          </div>
        </div>
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          {result && (
            <div style={{ padding:"5px 12px", borderRadius:20, background:THEME.accentGreen+"15", border:`1px solid ${THEME.accentGreen}33`, color:THEME.accentGreen, fontSize:11, fontWeight:700, display:"flex", alignItems:"center", gap:5 }}>
              <Icon.Overview size={11}/> Score: {result.score}/100
            </div>
          )}
          <div style={{ padding:"6px 14px", borderRadius:8, background:THEME.surfaceHigh, border:`1px solid ${apiKey ? THEME.accentGreen+"44" : THEME.accentRed+"55"}`, color: apiKey ? THEME.accentGreen : THEME.accentRed, fontSize:12, fontWeight:600, display:"flex", alignItems:"center", gap:7 }}>
            {apiKey ? <Icon.Connected size={13}/> : <Icon.Disconnected size={13}/>}
            {apiKey ? "API Connected" : "No API Key"}
          </div>
        </div>
      </header>

      {/* ── Body ── */}
      <div style={{ display:"flex", flex:1, height:"calc(100vh - 67px)", overflow:"hidden", position:"relative", zIndex:5 }}>

        {/* LEFT: Editor */}
        <div style={{ width:result||loading||error?"44%":"100%", borderRight:`1px solid ${THEME.border}`, display:"flex", flexDirection:"column", transition:"width .45s cubic-bezier(.4,0,.2,1)" }}>

          {/* Toolbar */}
          <div className="glass" style={{ padding:"10px 14px", borderBottom:`1px solid ${THEME.border}`, display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
            <select value={lang} onChange={e=>{setLang(e.target.value);setCode(SAMPLE[e.target.value]||"");}}
              style={{ background:THEME.surfaceHigh, border:`1px solid ${THEME.border}`, color:THEME.text, borderRadius:8, padding:"6px 10px", fontSize:12, cursor:"pointer" }}>
              {LANGS.map(l=><option key={l} value={l}>{l.charAt(0).toUpperCase()+l.slice(1)}</option>)}
            </select>

            <label style={{ padding:"6px 12px", borderRadius:8, background:THEME.surfaceHigh, border:`1px solid ${THEME.border}`, color:THEME.textDim, fontSize:12, cursor:"pointer", display:"flex", alignItems:"center", gap:6 }}>
              <input type="file" accept=".py,.js,.ts,.java,.cpp,.c,.go,.rs,.php,.rb,.swift,.kt,.cs" onChange={handleFile} style={{display:"none"}}/>
              <Icon.Upload size={13}/> Upload
            </label>

            <button onClick={()=>setCode(SAMPLE[lang]||SAMPLE.python)} style={{ padding:"6px 12px", borderRadius:8, background:"transparent", border:`1px solid ${THEME.border}`, color:THEME.textMuted, fontSize:12, cursor:"pointer", display:"flex", alignItems:"center", gap:6 }}>
              <Icon.Sample size={13}/> Sample
            </button>

            <button onClick={()=>{setCode("");setResult(null);setError(null);}} style={{ padding:"6px 12px", borderRadius:8, background:"transparent", border:`1px solid ${THEME.border}`, color:THEME.textMuted, fontSize:12, cursor:"pointer", display:"flex", alignItems:"center", gap:6 }}>
              <Icon.Clear size={13}/> Clear
            </button>

            <button className="gbtn" onClick={analyze} disabled={loading||!code.trim()||!apiKey} style={{
              marginLeft:"auto", padding:"8px 20px", borderRadius:8, border:"none",
              background:(loading||!code.trim()||!apiKey)?THEME.border:`linear-gradient(135deg,${THEME.accent},${THEME.accentPurple})`,
              color:(loading||!code.trim()||!apiKey)?THEME.textMuted:"#fff",
              fontSize:13, fontWeight:700, cursor:(loading||!code.trim()||!apiKey)?"not-allowed":"pointer",
              display:"flex", alignItems:"center", gap:7,
              boxShadow:(!loading&&code.trim()&&apiKey)?`0 0 22px ${THEME.accentGlow}`:"none"
            }}>
              {loading ? (
                <span style={{ display:"flex", alignItems:"center", gap:7, animation:"pulse 1s infinite" }}>
                  <span style={{ display:"inline-block", animation:"spin 1s linear infinite", color:"currentColor" }}><Icon.Loader size={14}/></span>
                  Analyzing…
                </span>
              ) : (
                <><Icon.Search size={14}/> Analyze Code</>
              )}
            </button>
          </div>

          {/* Code editor */}
          <div style={{ flex:1, overflow:"hidden", background:"rgba(4,6,11,0.92)", position:"relative" }}>
            <div className="hl" ref={hlRef} dangerouslySetInnerHTML={{__html:highlight(code,lang)+"\n"}}/>
            <textarea className="ci" ref={textareaRef} value={code} onChange={e=>setCode(e.target.value)} onScroll={syncScroll} spellCheck={false} placeholder={`// Paste your ${lang} code here…`}/>
          </div>

          <div className="glass" style={{ padding:"5px 14px", borderTop:`1px solid ${THEME.border}`, display:"flex", gap:18, fontSize:10, color:THEME.textMuted }}>
            <span>LINES: {code.split("\n").length}</span>
            <span>CHARS: {code.length}</span>
            <span>{lang.toUpperCase()}</span>
          </div>
        </div>

        {/* RIGHT: Results */}
        {(result||loading||error) && (
          <div className="fade-up" style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>

            {/* Tabs */}
            <div className="glass" style={{ display:"flex", borderBottom:`1px solid ${THEME.border}`, padding:"0 12px", gap:2, overflowX:"auto" }}>
              {TABS.map(t => {
                const TabIcon = TAB_ICONS[t];
                return (
                  <button key={t} className="tab" onClick={()=>setActiveTab(t)} style={{
                    padding:"13px 14px", color:activeTab===t?THEME.text:THEME.textMuted,
                    borderBottom:`2px solid ${activeTab===t?THEME.accent:"transparent"}`,
                    fontSize:12, fontWeight:activeTab===t?700:400, whiteSpace:"nowrap",
                    display:"flex", alignItems:"center", gap:6
                  }}>
                    <TabIcon size={13}/>
                    {t.charAt(0).toUpperCase()+t.slice(1)}
                    {counts[t]>0 && (
                      <span style={{ fontSize:9, padding:"1px 5px", borderRadius:10, fontWeight:800,
                        background:t==="security"?THEME.accentRed+"28":t==="bugs"?THEME.accentYellow+"28":THEME.accent+"28",
                        color:t==="security"?THEME.accentRed:t==="bugs"?THEME.accentYellow:THEME.accent }}>
                        {counts[t]}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div style={{ flex:1, overflow:"auto", padding:18 }}>

              {/* Loading */}
              {loading && (
                <div className="fade-up" style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100%", gap:18 }}>
                  <span style={{ color:THEME.accent, display:"inline-block", animation:"spin 1s linear infinite", filter:`drop-shadow(0 0 8px ${THEME.accent})` }}>
                    <Icon.Loader size={52}/>
                  </span>
                  <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:15, color:THEME.textDim }}>Analyzing your code…</div>
                  <div style={{ fontSize:11, color:THEME.textMuted }}>bugs · security · performance · quality</div>
                </div>
              )}

              {/* Error */}
              {error&&!loading && (
                <div className="fade-up" style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100%", gap:12 }}>
                  <span style={{ color:THEME.accentRed }}><Icon.Warning size={42}/></span>
                  <div style={{ color:THEME.accentRed, fontWeight:600, fontSize:14, textAlign:"center" }}>{error}</div>
                  <button onClick={analyze} style={{ padding:"8px 20px", borderRadius:8, background:THEME.accentRed+"18", border:`1px solid ${THEME.accentRed}50`, color:THEME.accentRed, cursor:"pointer", fontFamily:"inherit", fontSize:12, display:"flex", alignItems:"center", gap:6 }}>
                    <Icon.Retry size={13}/> Retry
                  </button>
                </div>
              )}

              {/* Overview tab */}
              {result&&!loading&&activeTab==="overview" && (
                <div className="fade-up">
                  <div style={{ display:"flex", gap:14, marginBottom:16, flexWrap:"wrap" }}>
                    {/* Score card */}
                    <div style={{ background:"rgba(14,17,24,0.92)", border:`1px solid ${THEME.border}`, borderRadius:14, padding:"20px 22px", display:"flex", alignItems:"center", gap:18, flex:1, minWidth:240, backdropFilter:"blur(10px)" }}>
                      <ScoreRing score={result.score}/>
                      <div>
                        <div style={{ fontSize:10, color:THEME.textMuted, marginBottom:4, letterSpacing:1 }}>OVERALL SCORE</div>
                        <div style={{ fontSize:26, fontWeight:700, color:result.score>=75?THEME.accentGreen:result.score>=50?THEME.accentYellow:THEME.accentRed }}>
                          {result.score}<span style={{ fontSize:12, color:THEME.textMuted }}>/100</span>
                        </div>
                        <p style={{ color:THEME.textDim, fontSize:12, lineHeight:1.5, maxWidth:170, marginTop:6 }}>{result.summary?.slice(0,100)}…</p>
                      </div>
                    </div>
                    {/* Issue count grid */}
                    <div style={{ background:"rgba(14,17,24,0.92)", border:`1px solid ${THEME.border}`, borderRadius:14, padding:"20px", display:"flex", gap:16, alignItems:"center", flexWrap:"wrap", backdropFilter:"blur(10px)" }}>
                      {[
                        [Icon.Bug,    "Bugs",     result.bugs?.length,        THEME.accentYellow],
                        [Icon.Security,"Security",result.security?.length,    THEME.accentRed],
                        [Icon.Performance,"Perf", result.performance?.length, THEME.accentPurple],
                        [Icon.Refactor,"Tips",    result.refactoring?.length, THEME.accentGreen],
                      ].map(([Ic,lb,cnt,col])=>(
                        <div key={lb} style={{ textAlign:"center", minWidth:56 }}>
                          <span style={{ color:col, display:"block", marginBottom:4 }}><Ic size={20}/></span>
                          <div style={{ fontSize:22, fontWeight:700, color:col, textShadow:`0 0 12px ${col}66` }}>{cnt}</div>
                          <div style={{ fontSize:10, color:THEME.textMuted }}>{lb}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Score breakdown */}
                  <div style={{ background:"rgba(14,17,24,0.92)", border:`1px solid ${THEME.border}`, borderRadius:14, padding:18, marginBottom:14, backdropFilter:"blur(10px)" }}>
                    <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:13, marginBottom:14, display:"flex", alignItems:"center", gap:7 }}>
                      <Icon.Overview size={14}/> Score Breakdown
                    </div>
                    {Object.entries(result.scores||{}).map(([k,v])=>{
                      const col=v>=75?THEME.accentGreen:v>=50?THEME.accentYellow:THEME.accentRed;
                      return (
                        <div key={k} style={{ marginBottom:11 }}>
                          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                            <span style={{ fontSize:12, color:THEME.textDim, textTransform:"capitalize" }}>{k.replace("_"," ")}</span>
                            <span style={{ fontSize:12, fontWeight:700, color:col }}>{v}/100</span>
                          </div>
                          <div style={{ height:5, background:THEME.border, borderRadius:3, overflow:"hidden" }}>
                            <div className="bar" style={{ height:"100%", width:`${v}%`, background:`linear-gradient(90deg,${col},${col}aa)`, borderRadius:3, boxShadow:`0 0 8px ${col}77` }}/>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Summary */}
                  <div style={{ background:"rgba(14,17,24,0.92)", border:`1px solid ${THEME.border}`, borderRadius:14, padding:18, backdropFilter:"blur(10px)" }}>
                    <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:13, marginBottom:10, display:"flex", alignItems:"center", gap:7 }}>
                      <Icon.Refactor size={14}/> AI Summary
                    </div>
                    <p style={{ color:THEME.textDim, fontSize:13, lineHeight:1.8 }}>{result.summary}</p>
                  </div>
                </div>
              )}

              {/* Issue tabs */}
              {result&&!loading&&activeTab!=="overview" && (
                <div className="fade-up">
                  {(result[activeTab]||[]).length===0 ? (
                    <div style={{ textAlign:"center", padding:"60px 20px", color:THEME.textMuted }}>
                      <span style={{ color:THEME.accentGreen, display:"block", margin:"0 auto 12px" }}><Icon.Check size={40}/></span>
                      <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:14, fontWeight:700, color:THEME.textDim }}>No {activeTab} issues found</div>
                      <div style={{ fontSize:12, marginTop:6 }}>This section looks clean!</div>
                    </div>
                  ) : (result[activeTab]||[]).map((issue,i)=><IssueCard key={i} issue={issue}/>)}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Empty state */}
        {!result&&!loading&&!error && (
          <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:14, padding:40 }}>
            <span style={{ color:THEME.accent, filter:"drop-shadow(0 0 24px rgba(59,130,246,0.5))", animation:"glow 3s ease infinite" }}>
              <Icon.Search size={52}/>
            </span>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:17, fontWeight:700, color:THEME.textDim }}>Paste code & click Analyze</div>
            <div style={{ fontSize:12, color:THEME.textMuted, textAlign:"center", maxWidth:280, lineHeight:1.7 }}>
              Detects bugs, security vulnerabilities,<br/>performance issues & quality improvements
            </div>
            {!apiKey && (
              <div style={{ marginTop:8, padding:"10px 18px", borderRadius:10, background:THEME.accentRed+"12", border:`1px solid ${THEME.accentRed}40`, color:THEME.accentRed, fontSize:12, textAlign:"center", lineHeight:1.6, display:"flex", alignItems:"center", gap:7 }}>
                <Icon.Warning size={14}/>
                Add <code style={{background:THEME.surfaceHigh, padding:"1px 5px", borderRadius:4, margin:"0 2px"}}>VITE_OPENROUTER_API_KEY</code>
                to your <code style={{background:THEME.surfaceHigh, padding:"1px 5px", borderRadius:4, margin:"0 2px"}}>.env</code> file and restart
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}