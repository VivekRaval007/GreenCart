import { Component } from "react";

// Surfaces render errors as visible text instead of a silent blank page.
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, info) {
    console.error("GreenCart crashed:", error, info);
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: "2rem", fontFamily: "monospace", background: "#fff3f0", minHeight: "100vh" }}>
          <h2 style={{ color: "#a8412f" }}>Something broke while rendering GreenCart</h2>
          <pre style={{ whiteSpace: "pre-wrap", background: "#fff", padding: "1rem", border: "1px solid #e4dcc8" }}>
            {this.state.error.message}
            {"\n\n"}
            {this.state.error.stack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}
