<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>@yield('code') — @yield('title') | {{ config('app.name') }}</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  /* ── Tema default: Glassmorphism cerah ─────────────────────────────── */
  :root {
    --bg-1: #eef4ff;
    --bg-2: #fdf1f8;
    --bg-3: #fff9ec;
    --surface: rgba(232, 176, 176, 0.35);
    --surface-inner: rgba(255, 255, 255, 1);
    --border: rgba(255,255,255,0.55);
    --border-strong: rgba(255,255,255,0.85);
    --text: #1c1d2b;
    --muted: rgba(28,29,43,0.62);
    --hint: rgba(28,29,43,0.42);
    --accent: #378add;
    --danger: #e24b4a;
    --shadow-color: rgba(60,70,110,0.18);
  }

  /* ── Varian gelap: tetap kaca, tapi frosted-dark ────────────────────── */
  @media (prefers-color-scheme: dark) {
    :root {
      --bg-1: #0e1220;
      --bg-2: #141224;
      --bg-3: #0b1420;
      --surface: rgba(255,255,255,0.05);
      --surface-inner: rgba(255,255,255,0.06);
      --border: rgba(255,255,255,0.12);
      --border-strong: rgba(255,255,255,0.20);
      --text: #f2f2f5;
      --muted: rgba(242,242,245,0.66);
      --hint: rgba(242,242,245,0.4);
      --shadow-color: rgba(0,0,0,0.45);
    }
  }

  html, body {
    height: 100%;
    font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
    color: var(--text);
  }

  body {
    min-height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    overflow: hidden;
    position: relative;
    isolation: isolate;
    background: linear-gradient(135deg, var(--bg-1) 0%, var(--bg-2) 50%, var(--bg-3) 100%);
  }

  /* fixed noise overlay — never on scrolling content */
  .noise {
    position: fixed;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    opacity: 0.025;
    mix-blend-mode: overlay;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }

  /* ambient mesh glows — warna diturunkan dari satu accent (blob-color) agar tetap mudah di-custom per halaman, tapi terasa multi-warna & cerah */
  .orb {
    position: fixed;
    border-radius: 50%;
    filter: blur(90px);
    opacity: 0.5;
    pointer-events: none;
    z-index: 0;
    will-change: transform;
    animation: orbFloat 10s cubic-bezier(0.45,0.05,0.55,0.95) infinite;
  }
  .orb-1 {
    width: 460px; height: 460px;
    background: var(--orb-color, #378add);
    top: -140px; left: -120px;
    animation-delay: 0s;
  }
  .orb-2 {
    width: 380px; height: 380px;
    background: color-mix(in srgb, var(--orb-color, #378add) 55%, #ff8fc7 45%);
    bottom: -120px; right: -100px;
    animation-delay: 2.4s;
  }
  .orb-3 {
    width: 220px; height: 220px;
    background: color-mix(in srgb, var(--orb-color, #378add) 45%, #ffd66b 55%);
    bottom: 18%; left: 8%;
    animation-delay: 4.8s;
  }

  @keyframes orbFloat {
    0%, 100% { transform: translate3d(0,0,0) scale(1); }
    50% { transform: translate3d(0,-24px,0) scale(1.08); }
  }

  /* double-bezel glass shell */
  .shell {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 560px;
    padding: 6px;
    border-radius: 2.25rem;
    background: var(--surface);
    border: 1px solid var(--border);
    box-shadow: 0 8px 32px -8px var(--shadow-color);
    opacity: 0;
    transform: translateY(24px) scale(0.98);
    animation: shellIn 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s forwards;
  }

  @keyframes shellIn {
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  .card {
    background: var(--surface-inner);
    backdrop-filter: blur(28px) saturate(180%);
    -webkit-backdrop-filter: blur(28px) saturate(180%);
    border: 1px solid var(--border-strong);
    border-radius: calc(2.25rem - 6px);
    box-shadow: inset 0 1px 1px rgba(255,255,255,0.7), 0 30px 60px -20px var(--shadow-color);
    padding: 3.5rem 2.75rem;
    text-align: center;
    transition: opacity .4s cubic-bezier(0.32,0.72,0,1), transform .4s cubic-bezier(0.32,0.72,0,1);
  }
  .card.fading { opacity: 0; transform: scale(.97); }

  /* eyebrow */
  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 12px;
    border-radius: 999px;
    background: rgba(255,255,255,0.3);
    border: 1px solid var(--border);
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--hint);
    margin-bottom: 1.75rem;
  }
  .eyebrow svg { width: 11px; height: 11px; stroke: var(--hint); }

  /* icon — besar, jelas, tetap ambil warna dari --code-color via currentColor */
  .err-icon {
    width: auto;
    height: auto;
    margin: 0 auto 1.25rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--code-color, var(--accent));
  }
  .err-icon svg { width: 100%; height: 100%; stroke-width: 1.25; }

  .err-code {
    font-size: 6.5rem;
    font-weight: 700;
    letter-spacing: -0.05em;
    line-height: 1;
    cursor: pointer;
    user-select: none;
    display: inline-block;
    background: linear-gradient(180deg, var(--code-color, var(--accent)) 0%, color-mix(in srgb, var(--code-color, var(--accent)) 55%, transparent) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: transform .5s cubic-bezier(0.34,1.56,0.64,1);
  }
  .err-code:active { transform: scale(0.94); }

  .err-title {
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--text);
    margin: 1rem 0 .6rem;
    letter-spacing: -0.01em;
  }

  .err-desc {
    font-size: .95rem;
    color: var(--muted);
    line-height: 1.7;
    margin-bottom: 2.25rem;
  }

  .btn-row {
    display: flex;
    gap: 10px;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 2.25rem;
  }

  /* island buttons w/ button-in-button icon */
  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 6px 6px 6px 22px;
    border-radius: 999px;
    background: var(--btn-color, var(--accent));
    color: #fff;
    border: none;
    cursor: pointer;
    font-size: .875rem;
    font-weight: 500;
    text-decoration: none;
    box-shadow: 0 8px 20px -8px var(--btn-color, var(--accent));
    transition: transform .45s cubic-bezier(0.34,1.56,0.64,1), filter .3s ease;
  }
  .btn-primary .icon-wrap {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba(255,255,255,0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform .45s cubic-bezier(0.34,1.56,0.64,1);
  }
  .btn-primary .icon-wrap svg { width: 15px; height: 15px; stroke: #fff; stroke-width: 2; }
  .btn-primary:hover { filter: brightness(1.06); }
  .btn-primary:hover .icon-wrap { transform: translate(2px,-2px) scale(1.08); }
  .btn-primary:active { transform: scale(.97); }

  .btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 11px 20px;
    border-radius: 999px;
    background: rgba(255,255,255,0.25);
    color: var(--muted);
    border: 1px solid var(--border);
    cursor: pointer;
    font-size: .875rem;
    font-weight: 500;
    text-decoration: none;
    backdrop-filter: blur(6px);
    transition: background .3s ease, color .3s ease, border-color .3s ease, transform .3s cubic-bezier(0.32,0.72,0,1);
  }
  .btn-secondary svg { width: 14px; height: 14px; stroke-width: 2; transition: transform .3s cubic-bezier(0.34,1.56,0.64,1); }
  .btn-secondary:hover { background: rgba(255,255,255,0.4); color: var(--text); border-color: var(--border-strong); transform: translateY(-1px); }
  .btn-secondary:hover svg { transform: translateX(-3px); }
  .btn-secondary:active { transform: scale(.97); }

  /* timer */
  .timer-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    color: var(--hint);
    font-size: .82rem;
  }
  .timer-ring { position: relative; width: 30px; height: 30px; }
  .timer-ring svg { transform: rotate(-90deg); }
  .ring-track { fill: none; stroke: var(--border); stroke-width: 3; }
  .ring-prog { fill: none; stroke-width: 3; stroke-linecap: round; transition: stroke-dashoffset 1s linear; }
  .timer-num {
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
    font-size: 10px; font-weight: 600;
  }

  /* particles */
  .particle {
    position: fixed;
    width: 6px; height: 6px;
    border-radius: 50%;
    pointer-events: none;
    z-index: 3;
    will-change: transform, opacity;
    animation: particlePop .8s cubic-bezier(0.16,1,0.3,1) forwards;
  }
  @keyframes particlePop {
    0% { opacity: 1; transform: scale(1) translate(0,0); }
    100% { opacity: 0; transform: scale(0) translate(var(--dx), var(--dy)); }
  }

  .anim-bounce { animation: doBounce .6s cubic-bezier(0.34,1.56,0.64,1) both; }
  .anim-shake { animation: doShake .45s cubic-bezier(0.36,0.07,0.19,0.97) both; }
  @keyframes doBounce {
    0%,100% { transform: scale(1); }
    25% { transform: scale(1.12) rotate(-2deg); }
    55% { transform: scale(.94) rotate(2deg); }
    80% { transform: scale(1.03); }
  }
  @keyframes doShake {
    0%,100% { transform: translateX(0); }
    20% { transform: translateX(-9px); }
    40% { transform: translateX(9px); }
    60% { transform: translateX(-5px); }
    80% { transform: translateX(5px); }
  }

  @media (max-width: 640px) {
    .card { padding: 2.75rem 1.5rem; }
    .err-code { font-size: 5rem; }
    .err-icon { width: 220px; height: 220px; }
    .orb-1, .orb-2 { filter: blur(60px); }
  }
</style>
</head>
<body>

<div class="noise"></div>
<div class="orb orb-1" style="--orb-color: @yield('blob-color', '#378add')"></div>
<div class="orb orb-2" style="--orb-color: @yield('blob-color', '#378add')"></div>
<div class="orb orb-3" style="--orb-color: @yield('blob-color', '#378add')"></div>

<div class="shell">
  <div class="card" id="card">

    <!-- <div class="eyebrow">
      <svg viewBox="0 0 24 24" fill="none" stroke-width="1.5"><path d="M12 9v4M12 17h.01M10.29 3.86l-8.49 14.7A1 1 0 0 0 2.66 20h18.68a1 1 0 0 0 .86-1.44l-8.49-14.7a1 1 0 0 0-1.72 0Z" stroke-linecap="round" stroke-linejoin="round"/></svg>
      Error @yield('code')
    </div> -->

    <span class="err-icon" style="--code-color: @yield('code-color', 'var(--accent)')">@yield('icon')</span>

    <!-- <span class="err-code" style="--code-color: @yield('code-color', 'var(--accent)')" id="errCode" onclick="handleCodeClick(event)" title="Klik saya!">@yield('code')</span> -->

    <h1 class="err-title">@yield('title')</h1>
    <p class="err-desc">@yield('description')</p>

    <div class="btn-row">
      <a href="{{ url('/') }}" class="btn-primary" id="btnHome" style="--btn-color: @yield('btn-color', 'var(--accent)')">
        Kembali ke Home
        <span class="icon-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></svg>
        </span>
      </a>
      <button onclick="history.back()" class="btn-secondary">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="M11 18l-6-6 6-6"/></svg>
        Halaman sebelumnya
      </button>
    </div>

    <div class="timer-wrap">
      <div class="timer-ring">
        <svg width="30" height="30" viewBox="0 0 32 32">
          <circle class="ring-track" cx="16" cy="16" r="12"/>
          <circle class="ring-prog" id="ring" cx="16" cy="16" r="12" stroke="@yield('ring-color', 'var(--accent)')" stroke-dasharray="75.4" stroke-dashoffset="0"/>
        </svg>
        <div class="timer-num" style="color: @yield('code-color', 'var(--accent)')" id="tNum">5</div>
      </div>
      <span id="timerLabel">Redirect ke home dalam <strong id="tSec">5</strong> detik</span>
    </div>

  </div>
</div>

<script>
  const ANIMATION = '@yield('animation', 'bounce')';
  const COLORS = @json(\Illuminate\Support\Js::from(explode(',', trim('@yield('particle-colors', '#378add,#185fa5,#85b7eb')'))));
  const CIRCUMFERENCE = 75.4;
  let countdown = 5;
  let timer = null;

  function startTimer() {
    updateRing();
    timer = setInterval(() => {
      countdown--;
      updateRing();
      if (countdown <= 0) {
        clearInterval(timer);
        document.getElementById('timerLabel').innerHTML = '<strong>Sedang redirect...</strong>';
        document.getElementById('card').classList.add('fading');
        setTimeout(() => { window.location.href = '/'; }, 400);
      }
    }, 1000);
  }

  function updateRing() {
    document.getElementById('tNum').textContent = countdown;
    document.getElementById('tSec').textContent = countdown;
    const offset = CIRCUMFERENCE * (1 - countdown / 5);
    document.getElementById('ring').style.strokeDashoffset = offset;
  }

  function handleCodeClick(e) {
    const el = document.getElementById('errCode');
    el.classList.remove('anim-bounce', 'anim-shake');
    void el.offsetWidth;
    el.classList.add(ANIMATION === 'shake' ? 'anim-shake' : 'anim-bounce');
    spawnParticles(e);
    clearInterval(timer);
    countdown = 5;
    startTimer();
  }

  function spawnParticles(e) {
    for (let i = 0; i < 12; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const angle = (i / 12) * 360;
      const dist = 50 + Math.random() * 50;
      p.style.cssText = [
        `left:${e.clientX - 3}px`,
        `top:${e.clientY - 3}px`,
        `background:${COLORS[i % COLORS.length]}`,
        `--dx:${Math.cos(angle * Math.PI / 180) * dist}px`,
        `--dy:${Math.sin(angle * Math.PI / 180) * dist}px`,
        `animation-delay:${i * 20}ms`
      ].join(';');
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 900);
    }
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) clearInterval(timer);
    else startTimer();
  });

  startTimer();
</script>
</body>
</html>