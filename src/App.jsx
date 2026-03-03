import './App.css'

function App() {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="logo">
          <span className="logo-icon">⚔</span> AZAR ZONE
        </div>
        <nav className="nav">
          <span className="nav-item active">Home</span>
          <span className="nav-item">Territory</span>
          <span className="nav-item">Squad</span>
        </nav>
      </header>

      <main className="dashboard-main">
        <section className="welcome-section">
          <p className="welcome-tag">— Azar Anna's Dashboard</p>
          <h1 className="welcome-title">
            "Naan inga irundhale, ellam set."
          </h1>
          <p className="welcome-subtitle">
            Control full-a irukku. Edhavadhu problem-na kelunga — one call, one move.
          </p>
        </section>

        <section className="quote-section">
          <blockquote className="rowdy-quote">
            "Rowdy nu solla theriyuma? Naan dhan rowdy. Respect kudunga — problem illa."
          </blockquote>
        </section>

        <section className="cards">
          <div className="card card-red">
            <span className="card-label">Status</span>
            <span className="card-value">FULL POWER</span>
          </div>
          <div className="card">
            <span className="card-label">Territory</span>
            <span className="card-value">LOCKED</span>
          </div>
          <div className="card">
            <span className="card-label">Squad</span>
            <span className="card-value">READY</span>
          </div>
        </section>

        <section className="cta-section">
          <p className="cta-text">
            <strong>Anna dialogue:</strong> "Dashboard edit panna theriyuma? <code>src/App.jsx</code> open pannunga — naan solli kodutha maadhiri pannunga."
          </p>
        </section>
      </main>

      <footer className="dashboard-footer">
        <span>© AZAR ZONE — Respect only. No drama.</span>
      </footer>
    </div>
  )
}

export default App
