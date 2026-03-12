import LoadingSpinner from "../common/LoadingSpinner";

const ForecastDisplay = ({ forecast, loading }) => (
  <>
    <style>{`
      .wfore{background:#0f1523;border:1px solid rgba(255,255,255,0.06);border-radius:20px;padding:24px}
      .wfore-title{font-family:'DM Serif Display',serif;font-size:18px;color:#dde4f0;margin-bottom:18px}
      .wfore-list{display:flex;flex-direction:column;gap:9px}
      .wfore-row{display:grid;grid-template-columns:50px 1fr auto;align-items:center;gap:14px;
        padding:13px 16px;background:#161d2e;border:1px solid rgba(255,255,255,0.06);
        border-radius:11px;transition:border-color .15s}
      .wfore-row:hover{border-color:rgba(255,255,255,0.11)}
      .wfore-day{font-family:'DM Mono',monospace;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#5a6680}
      .wfore-ic{font-size:24px}
      .wfore-right{text-align:right}
      .wfore-hi{font-family:'DM Serif Display',serif;font-size:22px;color:#dde4f0}
      .wfore-lo{font-size:12px;color:#5a6680;margin-top:1px}
    `}</style>

    <div className="wfore">
      <div className="wfore-title">5-Day Forecast</div>
      {loading ? <LoadingSpinner /> : (
        <div className="wfore-list">
          {forecast.map(f => (
            <div className="wfore-row" key={f.day}>
              <div className="wfore-day">{f.day}</div>
              <div><span className="wfore-ic">{f.icon}</span></div>
              <div className="wfore-right">
                <div className="wfore-hi">{f.high}°</div>
                <div className="wfore-lo">{f.low}°</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </>
);

export default ForecastDisplay;