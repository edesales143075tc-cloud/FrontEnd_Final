import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const DATA = [
  { month:"Aug", enrolled:412 }, { month:"Sep", enrolled:487 },
  { month:"Oct", enrolled:501 }, { month:"Nov", enrolled:498 },
  { month:"Dec", enrolled:455 }, { month:"Jan", enrolled:523 },
  { month:"Feb", enrolled:541 }, { month:"Mar", enrolled:558 },
];

// Custom tooltip popup styling
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background:"#161d2e", border:"1px solid rgba(255,255,255,0.11)", borderRadius:12, padding:"10px 16px" }}>
      <div style={{ fontFamily:"DM Mono,monospace", fontSize:11, color:"#5a6680", marginBottom:6 }}>{label}</div>
      <div style={{ fontSize:14, color:"#dde4f0" }}>Enrolled: <strong style={{ color:"#0ef0c0" }}>{payload[0].value}</strong></div>
    </div>
  );
};

const EnrollmentChart = ({ full }) => (
  <>
    <div style={{ fontFamily:"DM Serif Display,serif", fontSize:18, color:"#dde4f0", marginBottom:4 }}>Monthly Enrollment</div>
    <div style={{ fontSize:13, color:"#5a6680", marginBottom:20 }}>Students enrolled per month</div>
    <ResponsiveContainer width="100%" height={full ? 360 : 210}>
      <BarChart data={DATA}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
        <XAxis dataKey="month" tick={{ fill:"#5a6680", fontSize:11, fontFamily:"DM Mono,monospace" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill:"#5a6680", fontSize:11, fontFamily:"DM Mono,monospace" }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill:"rgba(14,240,192,0.05)" }} />
        <Bar dataKey="enrolled" name="Enrolled" fill="#0ef0c0" radius={[6,6,0,0]} />
      </BarChart>
    </ResponsiveContainer>
  </>
);

export default EnrollmentChart;