let audioCtx = null

function getContext() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  return audioCtx
}

function whiteNoise() {
  const ctx = getContext()
  const bufferSize = 2 * ctx.sampleRate
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1
  const source = ctx.createBufferSource()
  source.buffer = buffer
  source.loop = true
  const gain = ctx.createGain()
  gain.gain.value = 0.08
  source.connect(gain)
  gain.connect(ctx.destination)
  source.start(0)
  return () => { source.stop(); source.disconnect(); gain.disconnect() }
}

function pinkNoise() {
  const ctx = getContext()
  const bufferSize = 2 * ctx.sampleRate
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  let b0 = 0, b1 = 0, b2 = 0
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1
    b0 = 0.99886 * b0 + white * 0.0555179
    b1 = 0.99332 * b1 + white * 0.0750759
    b2 = 0.96900 * b2 + white * 0.1538520
    data[i] = (b0 + b1 + b2) * 0.2
  }
  const source = ctx.createBufferSource()
  source.buffer = buffer
  source.loop = true
  const gain = ctx.createGain()
  gain.gain.value = 0.12
  source.connect(gain)
  gain.connect(ctx.destination)
  source.start(0)
  return () => { source.stop(); source.disconnect(); gain.disconnect() }
}

function rain() {
  const ctx = getContext()
  const bufferSize = 2 * ctx.sampleRate
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    const n = Math.random() * 2 - 1
    data[i] = n * (0.3 + 0.7 * Math.sin(i * 0.0001) * Math.sin(i * 0.0003))
  }
  const filter = ctx.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = 1200
  filter.Q.value = 0.5
  const source = ctx.createBufferSource()
  source.buffer = buffer
  source.loop = true
  source.connect(filter)
  const gain = ctx.createGain()
  gain.gain.value = 0.1
  filter.connect(gain)
  gain.connect(ctx.destination)
  source.start(0)
  return () => { source.stop(); source.disconnect(); filter.disconnect(); gain.disconnect() }
}

function nature() {
  const ctx = getContext()
  const bufferSize = 2 * ctx.sampleRate
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    const n = (Math.random() * 2 - 1) * Math.sin(i * 0.0002)
    data[i] = n * 0.4
  }
  const filter = ctx.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = 800
  const source = ctx.createBufferSource()
  source.buffer = buffer
  source.loop = true
  source.connect(filter)
  const gain = ctx.createGain()
  gain.gain.value = 0.12
  filter.connect(gain)
  gain.connect(ctx.destination)
  source.start(0)
  return () => { source.stop(); source.disconnect(); filter.disconnect(); gain.disconnect() }
}

function tapping() {
  const ctx = getContext()
  const interval = 0.4
  const decay = 0.05
  let nextTime = ctx.currentTime
  const timeouts = []

  function tap() {
    const now = ctx.currentTime
    if (now < nextTime) return
    nextTime = now + interval
    const buffer = ctx.createBuffer(1, ctx.sampleRate * decay, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / data.length)
    }
    const source = ctx.createBufferSource()
    source.buffer = buffer
    const gain = ctx.createGain()
    gain.gain.value = 0.15
    source.connect(gain)
    gain.connect(ctx.destination)
    source.start(now)
    source.stop(now + decay)
  }

  tap()
  const id = setInterval(tap, interval * 1000)
  timeouts.push(id)

  return () => {
    timeouts.forEach(clearInterval)
  }
}

function binaural() {
  const ctx = getContext()
  const left = ctx.createOscillator()
  const right = ctx.createOscillator()
  left.frequency.value = 200
  right.frequency.value = 205
  left.type = 'sine'
  right.type = 'sine'
  const merger = ctx.createChannelMerger(2)
  const gainL = ctx.createGain()
  const gainR = ctx.createGain()
  gainL.gain.value = 0.06
  gainR.gain.value = 0.06
  left.connect(gainL)
  right.connect(gainR)
  gainL.connect(merger, 0, 0)
  gainR.connect(merger, 0, 1)
  merger.connect(ctx.destination)
  left.start(0)
  right.start(0)
  return () => {
    left.stop()
    right.stop()
    left.disconnect()
    right.disconnect()
    gainL.disconnect()
    gainR.disconnect()
    merger.disconnect()
  }
}

function whisper() {
  const ctx = getContext()
  const bufferSize = 2 * ctx.sampleRate
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    const n = Math.random() * 2 - 1
    const mod = 0.5 + 0.5 * Math.sin(i * 0.0005) * Math.sin(i * 0.00011)
    data[i] = n * mod * 0.25
  }
  const filter = ctx.createBiquadFilter()
  filter.type = 'bandpass'
  filter.frequency.value = 800
  filter.Q.value = 0.5
  const source = ctx.createBufferSource()
  source.buffer = buffer
  source.loop = true
  source.connect(filter)
  const gain = ctx.createGain()
  gain.gain.value = 0.1
  filter.connect(gain)
  gain.connect(ctx.destination)
  source.start(0)
  return () => { source.stop(); source.disconnect(); filter.disconnect(); gain.disconnect() }
}

const players = {
  'White Noise': whiteNoise,
  'Rain': rain,
  'Nature': nature,
  'Tapping': tapping,
  'Binaural': binaural,
  'Whisper': whisper,
}

export function playSound(name) {
  const fn = players[name]
  if (!fn) return null
  const ctx = getContext()
  if (ctx.state === 'suspended') ctx.resume()
  return fn()
}

export function stopSound(stopFn) {
  if (typeof stopFn === 'function') stopFn()
}
