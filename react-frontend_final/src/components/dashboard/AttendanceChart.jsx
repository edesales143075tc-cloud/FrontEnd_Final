import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const DATA = [
  { week:"W1", present:94, absent:6  }, { week:"W2", present:91, absent:9  },
  { week:"W3", present:96, absent:4  }, { week:"W4", present:88, absent:12 },
  { week:"W5", present:93, absent:7  }, { week:"W6", present:97, absent:3  },
  { week:"W7", present:90, absent:10 }, { week:"W8", present:95, absent:5  },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background:"#161d2e", border:"1px solid rgba(255,255,255,0.11)", borderRadius:12, padding:"10px 16px" }}>
      <div style={{ fontFamily:"DM Mono,monospace", fontSize:11, color:"#5a6680", marginBottom:8 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ display:"flex", alignItems:"center", gap:8, fontSize:14, color:"#dde4f0", marginBottom:4 }}>
          <div style={{ width:8, height:8, borderRadius:"50%", background:p.color }} />
          {p.name}: <strong style={{ color:p.color }}>{p.value}%</strong>
        </div>
      ))}
    </div>
  );
};

const AttendanceChart = ({ full }) => (
  <>
    <div style={{ fontFamily:"DM Serif Display,serif", fontSize:18, color:"#dde4f0", marginBottom:4 }}>Attendance Trends</div>
    <div style={{ fontSize:13, color:"#5a6680", marginBottom:20 }}>Weekly present vs absent %</div>
    <ResponsiveContainer width="100%" height={full ? 360 : 210}>
      <LineChart data={DATA}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
        <XAxis dataKey="week" tick={{ fill:"#5a6680", fontSize:11, fontFamily:"DM Mono,monospace" }} axisLine={false} tickLine={false} />
        <YAxis domain={[0,100]} tick={{ fill:"#5a6680", fontSize:11, fontFamily:"DM Mono,monospace" }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize:12, fontFamily:"DM Mono,monospace", color:"#5a6680" }} />
        <Line type="monotone" dataKey="present" name="Present" stroke="#0ef0c0" strokeWidth={2.5} dot={{ r:4, fill:"#0ef0c0", strokeWidth:0 }} activeDot={{ r:7 }} />
        <Line type="monotone" dataKey="absent"  name="Absent"  stroke="#fb7185" strokeWidth={2.5} dot={{ r:4, fill:"#fb7185", strokeWidth:0 }} activeDot={{ r:7 }} />
      </LineChart>
    </ResponsiveContainer>
  </>
);

export default AttendanceChart;