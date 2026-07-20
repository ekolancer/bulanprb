<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('code') — @yield('title') | {{ config('app.name') }}</title>
    <style>
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
            --bg:       #f8f8f7;
            --surface:  #ffffff;
            --border:   rgba(0,0,0,0.08);
            --text:     #1a1a18;
            --muted:    #6b6b67;
            --hint:     #9b9b97;
            --accent:   #378add;
            --danger:   #e24b4a;
            --radius:   12px;
        }

        @media (prefers-color-scheme: dark) {
            :root {
                --bg:      #18181a;
                --surface: #232325;
                --border:  rgba(255,255,255,0.08);
                --text:    #f0f0ee;
                --muted:   #9b9b97;
                --hint:    #6b6b67;
            }
        }

        body {
            font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
            background: var(--bg);
            color: var(--text);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            overflow: hidden;
            position: relative;
        }

        /* floating blobs */
        .blob {
            position: fixed;
            border-radius: 50%;
            filter: blur(80px);
            opacity: 0.12;
            pointer-events: none;
            animation: blobFloat 8s ease-in-out infinite;
        }
        .blob-1 {
            width: 400px; height: 400px;
            background: var(--blob-color, #378add);
            top: -100px; left: -100px;
            animation-delay: 0s;
        }
        .blob-2 {
            width: 300px; height: 300px;
            background: var(--blob-color, #378add);
            bottom: -80px; right: -80px;
            animation-delay: 3s;
        }
        .blob-3 {
            width: 180px; height: 180px;
            background: var(--blob-color, #378add);
            bottom: 20%; left: 10%;
            animation-delay: 5s;
        }
        @keyframes blobFloat {
            0%, 100% { transform: translateY(0) scale(1); }
            50%       { transform: translateY(-20px) scale(1.06); }
        }

        /* card */
        .card {
            background: var(--surface);
            border: 0.5px solid var(--border);
            border-radius: 20px;
            padding: 3rem 2.5rem;
            max-width: 540px;
            width: 100%;
            text-align: center;
            position: relative;
            z-index: 2;
            transition: opacity .3s, transform .3s;
        }

        /* icon */
        .err-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
            display: block;
            line-height: 1;
        }

        /* big code */
        .err-code {
            font-size: 7rem;
            font-weight: 700;
            letter-spacing: -4px;
            line-height: 1;
            cursor: pointer;
            user-select: none;
            display: inline-block;
            transition: transform .1s;
        }
        .err-code:hover { opacity: .88; }

        /* text */
        .err-title {
            font-size: 1.5rem;
            font-weight: 600;
            color: var(--text);
            margin: 1rem 0 .5rem;
        }
        .err-desc {
            font-size: .975rem;
            color: var(--muted);
            line-height: 1.65;
            margin-bottom: 2rem;
        }

        /* buttons */
        .btn-row {
            display: flex;
            gap: 10px;
            justify-content: center;
            flex-wrap: wrap;
            margin-bottom: 2rem;
        }
        .btn-primary {
            display: inline-flex;
            align-items: center;
            gap: 7px;
            padding: 11px 24px;
            border-radius: 8px;
            background: var(--btn-color, #378add);
            color: #fff;
            border: none;
            cursor: pointer;
            font-size: .9rem;
            font-weight: 500;
            text-decoration: none;
            transition: opacity .2s, transform .2s;
        }
        .btn-primary:hover { opacity: .85; transform: translateY(-2px); }
        .btn-primary:active { transform: scale(.97); }

        .btn-secondary {
            display: inline-flex;
            align-items: center;
            gap: 7px;
            padding: 11px 20px;
            border-radius: 8px;
            background: transparent;
            color: var(--muted);
            border: 0.5px solid var(--border);
            cursor: pointer;
            font-size: .9rem;
            font-weight: 500;
            text-decoration: none;
            transition: all .2s;
        }
        .btn-secondary:hover {
            background: var(--bg);
            color: var(--text);
            border-color: var(--hint);
        }

        /* timer */
        .timer-wrap {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            color: var(--hint);
            font-size: .85rem;
        }
        .timer-ring { position: relative; width: 32px; height: 32px; }
        .timer-ring svg { transform: rotate(-90deg); }
        .ring-track { fill: none; stroke: var(--border); stroke-width: 3; }
        .ring-prog  {
            fill: none;
            stroke-width: 3;
            stroke-linecap: round;
            transition: stroke-dashoffset 1s linear;
        }
        .timer-num {
            position: absolute;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 11px;
            font-weight: 600;
        }

        /* particles */
        .particle {
            position: fixed;
            width: 8px; height: 8px;
            border-radius: 50%;
            pointer-events: none;
            animation: particlePop .7s ease-out forwards;
        }
        @keyframes particlePop {
            0%   { opacity: 1; transform: scale(1) translate(0, 0); }
            100% { opacity: 0; transform: scale(0) translate(var(--dx), var(--dy)); }
        }

        /* animations */
        .anim-bounce {
            animation: doBounce .5s cubic-bezier(.36,.07,.19,.97) both;
        }
        .anim-shake {
            animation: doShake .4s cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes doBounce {
            0%,100% { transform: scale(1); }
            20%      { transform: scale(1.14); }
            50%      { transform: scale(.9); }
            70%      { transform: scale(1.05); }
        }
        @keyframes doShake {
            0%,100% { transform: translateX(0); }
            20%      { transform: translateX(-10px); }
            40%      { transform: translateX(10px); }
            60%      { transform: translateX(-6px); }
            80%      { transform: translateX(6px); }
        }

        /* fade-out on redirect */
        .fading { opacity: 0; transform: scale(.97); }
    </style>
</head>
<body>
    <div class="blob blob-1" style="--blob-color: @yield('blob-color', '#378add')"></div>
    <div class="blob blob-2" style="--blob-color: @yield('blob-color', '#378add')"></div>
    <div class="blob blob-3" style="--blob-color: @yield('blob-color', '#378add')"></div>

    <div class="card" id="card">
        <span class="err-icon">@yield('icon')</span>

        <span
            class="err-code"
            style="color: @yield('code-color', 'var(--accent)')"
            id="errCode"
            onclick="handleCodeClick(event)"
            title="Klik saya!"
        >@yield('code')</span>

        <h1 class="err-title">@yield('title')</h1>
        <p class="err-desc">@yield('description')</p>

        <div class="btn-row">
            <a href="{{ url('/') }}" class="btn-primary" id="btnHome"
               style="background: @yield('btn-color', 'var(--accent)')">
                🏠 Kembali ke Home
            </a>
            <button onclick="history.back()" class="btn-secondary">
                ← Halaman sebelumnya
            </button>
        </div>

        <div class="timer-wrap">
            <div class="timer-ring">
                <svg width="32" height="32" viewBox="0 0 32 32">
                    <circle class="ring-track" cx="16" cy="16" r="12"/>
                    <circle class="ring-prog" id="ring" cx="16" cy="16" r="12"
                        stroke="@yield('ring-color', 'var(--accent)')"
                        stroke-dasharray="75.4"
                        stroke-dashoffset="0"/>
                </svg>
                <div class="timer-num" style="color: @yield('code-color', 'var(--accent)')" id="tNum">5</div>
            </div>
            <span id="timerLabel">Redirect ke home dalam <strong id="tSec">5</strong> detik</span>
        </div>
    </div>

    <script>
        const ANIMATION  = '@yield('animation', 'bounce')';
        const CODE       = '@yield('code')';
        const COLORS     = @json(\Illuminate\Support\Js::from(explode(',', trim('@yield('particle-colors', '#378add,#185fa5,#85b7eb')'))));
        const CIRCUMFERENCE = 75.4;
        let countdown = 5;
        let timer     = null;

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
            document.getElementById('tNum').textContent  = countdown;
            document.getElementById('tSec').textContent  = countdown;
            const offset = CIRCUMFERENCE * (1 - countdown / 5);
            document.getElementById('ring').style.strokeDashoffset = offset;
        }

        function handleCodeClick(e) {
            const el = document.getElementById('errCode');
            el.classList.remove('anim-bounce', 'anim-shake');
            void el.offsetWidth;
            el.classList.add(ANIMATION === 'shake' ? 'anim-shake' : 'anim-bounce');
            spawnParticles(e);
            // reset timer on interact
            clearInterval(timer);
            countdown = 5;
            startTimer();
        }

        function spawnParticles(e) {
            for (let i = 0; i < 12; i++) {
                const p  = document.createElement('div');
                p.className = 'particle';
                const angle = (i / 12) * 360;
                const dist  = 50 + Math.random() * 50;
                p.style.cssText = [
                    `left:${e.clientX - 4}px`,
                    `top:${e.clientY - 4}px`,
                    `background:${COLORS[i % COLORS.length]}`,
                    `--dx:${Math.cos(angle * Math.PI / 180) * dist}px`,
                    `--dy:${Math.sin(angle * Math.PI / 180) * dist}px`,
                    `animation-delay:${i * 20}ms`
                ].join(';');
                document.body.appendChild(p);
                setTimeout(() => p.remove(), 800);
            }
        }

        // pause timer when tab not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) clearInterval(timer);
            else startTimer();
        });

        startTimer();
    </script>
</body>
</html>
