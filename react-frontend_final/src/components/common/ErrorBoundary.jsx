import { Component } from "react";

// Catches errors in child components so the whole app doesn't crash
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: 40, textAlign: "center",
          color: "#fb7185", fontFamily: "monospace"
        }}>
          <h2>⚠ Something went wrong</h2>
          <p style={{ color: "#6b7a99", marginTop: 10 }}>
            {this.state.error?.message || "Unknown error"}
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            style={{
              marginTop: 20, padding: "10px 24px",
              background: "#0ef0c0", color: "#04120e",
              border: "none", borderRadius: 8,
              cursor: "pointer", fontWeight: 700
            }}>
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;