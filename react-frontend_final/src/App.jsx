import { useState } from "react";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import ErrorBoundary from "./components/common/ErrorBoundary";

function App() {
  const savedUser = localStorage.getItem("user");
  const [user, setUser] = useState(
    savedUser ? JSON.parse(savedUser) : null
  );

  const handleLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <ErrorBoundary>
      {user
        ? <Dashboard user={user} onLogout={handleLogout} />
        : <Login onLogin={handleLogin} />}
    </ErrorBoundary>
  );
}

export default App;