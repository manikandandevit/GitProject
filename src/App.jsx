import { useState, useRef } from 'react'
import { playSound, stopSound } from './sounds'
import './App.css'

function App() {
  const [playing, setPlaying] = useState(null)
  const stopRef = useRef(null)

  const categories = [
    { name: 'Rain', icon: '🌧️', desc: 'Soft rain on glass' },
    { name: 'Whisper', icon: '💤', desc: 'Gentle whispers' },
    { name: 'Tapping', icon: '👆', desc: 'Soft tapping sounds' },
    { name: 'Nature', icon: '🍃', desc: 'Forest & birds' },
    { name: 'White Noise', icon: '〰️', desc: 'Calm static' },
    { name: 'Binaural', icon: '🎧', desc: '3D relaxation' },
  ]

  function handleCardClick(name) {
    if (playing === name) {
      stopSound(stopRef.current)
      stopRef.current = null
      setPlaying(null)
      return
    }
    stopSound(stopRef.current)
    stopRef.current = null
    const stopFn = playSound(name)
    if (stopFn) {
      stopRef.current = stopFn
      setPlaying(name)
    }
  }

  return (
    <div className="asmr">
      <header className="asmr-header">
        <div className="logo">ASMR</div>
        <nav className="nav">
          <a href="#home">Home</a>
          <a href="#sounds">Sounds</a>
          <a href="#about">About</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-bg" aria-hidden="true" />
          <h1 className="hero-title">Relax. Listen. Feel.</h1>
          <p className="hero-subtitle">
            Soft sounds for sleep, focus & calm. Pick a sound and unwind.
          </p>
          {playing && (
            <p className="hero-playing">
              Now playing: <strong>{playing}</strong> — click again to stop
            </p>
          )}
        </section>

        <section className="sounds" id="sounds">
          <h2 className="section-title">Sound categories</h2>
          <div className="sound-grid">
            {categories.map((cat) => (
              <button
                key={cat.name}
                className={`sound-card ${playing === cat.name ? 'sound-card-playing' : ''}`}
                type="button"
                onClick={() => handleCardClick(cat.name)}
              >
                <span className="sound-icon">{cat.icon}</span>
                <span className="sound-name">{cat.name}</span>
                <span className="sound-desc">{cat.desc}</span>
                {playing === cat.name && <span className="sound-badge">Playing</span>}
              </button>
            ))}
          </div>
        </section>

        <section className="about" id="about">
          <p className="about-text">
            Use headphones for the best experience. Find a quiet place, close your eyes, and let the sounds ease you.
          </p>
        </section>
      </main>

      <footer className="asmr-footer">
        <span>ASMR — for relaxation only.</span>
      </footer>
    </div>
  )
}

export default App
