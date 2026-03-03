import './App.css'

function App() {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="logo">Dashboard</div>
        <nav className="nav">
          <span className="nav-item active">Home</span>
          <span className="nav-item">Reports</span>
          <span className="nav-item">Settings</span>
        </nav>
      </header>

      <main className="dashboard-main">
        <section className="welcome-section">
          <h1 className="welcome-title">Welcome back</h1>
          <p className="welcome-subtitle">
            Here’s what’s happening with your project today.
          </p>
        </section>

        <section className="cards">
          <div className="card">
            <span className="card-label">Overview</span>
            <span className="card-value">Ready</span>
          </div>
          <div className="card">
            <span className="card-label">Status</span>
            <span className="card-value">Active</span>
          </div>
          <div className="card">
            <span className="card-label">Quick start</span>
            <span className="card-value">Go</span>
          </div>
        </section>

        <section className="cta-section">
          <p>Get started by editing <code>src/App.jsx</code></p>
        </section>
      </main>
    </div>
  )
}

export default App
