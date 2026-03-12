import { useState, useEffect, useCallback } from "react";
import ForecastDisplay from "./ForecastDisplay";
import LoadingSpinner from "../common/LoadingSpinner";
// import { getCurrentWeather, getForecast } from "../../services/weatherApi";

// Mock data - replace with real API when you have your key
const MOCK = {
  city:"San Francisco", temp:18, feels_like:16,
  humidity:72, wind:14, description:"Partly Cloudy", icon:"⛅",
};
const MOCK_FORECAST = [
  { day:"Mon", icon:"🌤", high:19, low:13 },
  { day:"Tue", icon:"🌧", high:15, low:11 },
  { day:"Wed", icon:"☀️", high:22, low:14 },
  { day:"Thu", icon:"🌦", high:17, low:12 },
  { day:"Fri", icon:"☀️", high:24, low:15 },
];

const WeatherWidget = () => {
  const [weather,  setWeather]  = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [query,    setQuery]    = useState("");
  const [error,    setError]    = useState("");

  const loadWeather = useCallback(async (city = "San Francisco") => {
    setLoading(true); setError("");
    try {
      // TODO: Uncomment when you have your OpenWeatherMap API key
      // const [w, f] = await Promise.all([getCurrentWeather(city), getForecast(city)]);
      // setWeather({ city: w.name, temp: Math.round(w.main.temp), feels_like: Math.round(w.main.feels_like),
      //   humidity: w.main.humidity, wind: Math.round(w.wind.speed * 3.6), description: w.weather[0].description });
      // setForecast(f.list.filter((_, i) => i % 8 === 0).slice(0, 5).map(d => ({
      //   day: new Date(d.dt * 1000).toLocaleDateString('en-US',{weekday:'short'}),
      //   icon: "🌤", high: Math.round(d.main.temp_max), low: Math.round(d.main.temp_min)
      // })));

      // Using mock data for now
      await new Promise(r => setTimeout(r, 600));
      const cityIcons = { "New York":"🌆","London":"🌧","Tokyo":"🏙","Paris":"🗼" };
      setWeather({ ...MOCK, city, icon: cityIcons[city] || "⛅" });
      setForecast(MOCK_FORECAST);
    } catch (err) {
      setError(err.message || "Could not load weather");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadWeather(); }, [loadWeather]);

  const handleSearch = () => {
    if (!query.trim()) { setError("Please enter a city name"); return; }
    loadWeather(query.trim()); setQuery("");
  };

  return (
    <>
      <style>{`
        .wgrid{display:grid;grid-template-columns:1fr 1.25fr;gap:16px;margin-bottom:20px}
        @media(max-width:900px){.wgrid{grid-template-columns:1fr}}
        .wmain{background:linear-gradient(155deg,#040d1e 0%,#061528 45%,#082340 100%);
          border:1px solid rgba(14,240,192,0.14);border-radius:20px;padding:26px;position:relative;overflow:hidden}
        .wmain::before{content:'';position:absolute;width:340px;height:340px;border-radius:50%;
          background:radial-gradient(circle,rgba(14,240,192,0.09) 0%,transparent 65%);
          top:-130px;right:-100px;pointer-events:none}
        .wsearch{display:flex;gap:8px;margin-bottom:26px;position:relative;z-index:1}
        .w-inp{flex:1;padding:10px 14px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);
          border-radius:9px;color:#dde4f0;font-family:'Bricolage Grotesque',sans-serif;font-size:14px;outline:none;transition:border-color .2s}
        .w-inp::placeholder{color:rgba(255,255,255,0.22)}
        .w-inp:focus{border-color:#0ef0c0;background:rgba(14,240,192,0.05)}
        .w-btn{padding:10px 15px;background:#0ef0c0;border:none;border-radius:9px;color:#04120e;font-size:15px;cursor:pointer;transition:all .2s}
        .w-btn:hover{background:#18ffd4;box-shadow:0 0 18px rgba(14,240,192,0.38)}
        .w-err{font-family:'DM Mono',monospace;font-size:12px;color:#fb7185;margin-bottom:12px;position:relative;z-index:1}
        .w-city{font-family:'DM Mono',monospace;font-size:11px;text-transform:uppercase;letter-spacing:2px;
          color:rgba(14,240,192,0.55);margin-bottom:4px;position:relative;z-index:1}
        .w-desc{font-size:15px;color:rgba(255,255,255,0.5);margin-bottom:22px;position:relative;z-index:1}
        .w-hero{display:flex;align-items:center;gap:14px;margin-bottom:26px;position:relative;z-index:1}
        .w-emoji{font-size:72px;line-height:1}
        .w-temp{font-family:'DM Serif Display',serif;font-size:74px;color:#dde4f0;line-height:1}
        .w-temp sup{font-size:28px;vertical-align:super}
        .w-stats{display:grid;grid-template-columns:1fr 1fr;gap:9px;position:relative;z-index:1}
        .w-stat{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:13px}
        .w-stat-l{font-family:'DM Mono',monospace;font-size:9px;text-transform:uppercase;letter-spacing:1.5px;color:rgba(255,255,255,0.3);margin-bottom:5px}
        .w-stat-v{font-size:18px;font-weight:600;color:#dde4f0}
      `}</style>

      <div className="wgrid">
        {/* Current weather */}
        <div className="wmain">
          <div className="wsearch">
            <input className="w-inp" placeholder="Search city…"
              value={query} onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSearch()} />
            <button className="w-btn" onClick={handleSearch}>🔍</button>
          </div>
          {error && <div className="w-err">⚠ {error}</div>}
          {loading ? <LoadingSpinner /> : weather && (
            <>
              <div className="w-city">{weather.city}</div>
              <div className="w-desc">{weather.description}</div>
              <div className="w-hero">
                <div className="w-emoji">{weather.icon}</div>
                <div className="w-temp">{weather.temp}<sup>°C</sup></div>
              </div>
              <div className="w-stats">
                {[["Feels Like",`${weather.feels_like}°C`],["Humidity",`${weather.humidity}%`],
                  ["Wind",`${weather.wind} km/h`],["Status",weather.description]].map(([l,v]) => (
                  <div className="w-stat" key={l}>
                    <div className="w-stat-l">{l}</div>
                    <div className="w-stat-v">{v}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Forecast */}
        <ForecastDisplay forecast={forecast} loading={loading} />
      </div>
    </>
  );
};

export default WeatherWidget;