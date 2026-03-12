// Reusable loading spinner component
const LoadingSpinner = () => {
  return (
    <div style={{
      display: "flex", alignItems: "center",
      justifyContent: "center", minHeight: "200px"
    }}>
      <div style={{
        width: 40, height: 40,
        border: "3px solid rgba(255,255,255,0.1)",
        borderTop: "3px solid #0ef0c0",
        borderRadius: "50%",
        animation: "spin 0.7s linear infinite"
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default LoadingSpinner;