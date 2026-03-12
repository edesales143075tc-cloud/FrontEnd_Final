import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const DATA = [
  { name:"Mathematics", students:134, color:"#f59e0b" },
  { name:"Sciences",    students:98,  color:"#06b6d4" },
  { name:"Literature",  students:87,  color:"#a78bfa" },
  { name:"History",     students:76,  color:"#34d399" },
  { name:"Arts",        students:63,  color:"#fb7185" },
  { name:"Computing",   students:100, color:"#60a5fa" },
];

const CourseDistributionChart = ({ full }) => (
  <>
    <div style={{ fontFamily:"DM Serif Display,serif", fontSize:18, color:"#dde4f0", marginBottom:4 }}>Course Distribution</div>
    <div style={{ fontSize:13, color:"#5a6680", marginBottom:20 }}>Students per department</div>
    <div style={{ display:"grid", gridTemplateColumns: full ? "1fr 1fr" : "1fr", gap:24, alignItems:"center" }}>
      <ResponsiveContainer width="100%" height={full ? 300 : 210}>
        <PieChart>
          <Pie data={DATA} dataKey="students" nameKey="name"
            cx="50%" cy="50%" outerRadius={full ? 110 : 80} innerRadius={full ? 46 : 30}>
            {DATA.map((c, i) => <Cell key={i} fill={c.color} />)}
          </Pie>
          <Tooltip contentStyle={{ background:"#161d2e", border:"1px solid rgba(255,255,255,0.11)", borderRadius:10, color:"#dde4f0" }} />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend - only shown in full view */}
      {full && (
        <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
          {DATA.map(c => (
            <div key={c.name} style={{ display:"flex", alignItems:"center", gap:10,
              padding:"10px 14px", background:"#161d2e", border:"1px solid rgba(255,255,255,0.06)", borderRadius:10 }}>
              <div style={{ width:10, height:10, borderRadius:3, background:c.color, flexShrink:0 }} />
              <span style={{ flex:1, fontSize:13, color:"#dde4f0" }}>{c.name}</span>
              <span style={{ fontFamily:"DM Mono,monospace", fontSize:13, color:"#5a6680" }}>{c.students}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  </>
);

export default CourseDistributionChart;