@php
    $user = auth()->user();
    $hour = now()->timezone('Asia/Jakarta')->format('H');
    $greeting = 'Selamat datang kembali';
    
    if ($hour >= 5 && $hour < 11) {
        $greeting = 'Selamat pagi';
    } elseif ($hour >= 11 && $hour < 15) {
        $greeting = 'Selamat siang';
    } elseif ($hour >= 15 && $hour < 18) {
        $greeting = 'Selamat sore';
    } else {
        $greeting = 'Selamat malam';
    }
    
    $imageUrl = asset('images/welcome.png');
@endphp

<div class="relative mt-4 mb-8">
    <div class="glass-card relative overflow-hidden p-4 md:p-6 rounded-[1.5rem] border border-white/40 dark:border-slate-800/50 bg-white/30 dark:bg-slate-900/40 backdrop-blur-xl shadow-xl transition-all duration-500 hover:shadow-indigo-500/10 group">
        
        <div class="absolute -top-20 -right-20 w-48 h-48 bg-indigo-500/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-indigo-500/20 transition-all duration-1000"></div>
        <div class="absolute -bottom-20 -left-20 w-48 h-48 bg-purple-500/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-purple-500/20 transition-all duration-1000"></div>

        <div class="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            
            <!-- Sisi Kiri: Karakter & Greeting -->
            <div class="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                <div class="relative shrink-0">
                    <div class="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full scale-110 animate-pulse"></div>
                    <img src="{{ $imageUrl }}" 
                         alt="Welcome Character" 
                         class="w-28 h-28 md:w-36 md:h-36 object-contain relative z-10 drop-shadow-[0_15px_25px_rgba(79,70,229,0.25)] group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
                </div>

                <div class="space-y-1">
                    <h1 class="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                        {{ $greeting }}, <span class="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-300">{{ $user->name }}!</span>
                    </h1>
                    <p class="text-xs md:text-sm font-semibold text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed"> 
                        <span class="block mt-0.5 text-slate-400 dark:text-slate-500 italic">"Tetap Semangat & Jaga Integritas"</span>
                    </p>
                </div>
            </div>

            <!-- Sisi Kanan: Jam & Cuaca -->
            <div class="flex flex-row md:flex-col items-center md:items-end gap-5 md:gap-1.5 bg-white/40 dark:bg-black/20 p-4 rounded-2xl border border-white/60 dark:border-slate-800 shadow-lg backdrop-blur-md">
                <div class="text-right hidden sm:block">
                    <p class="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-0.5">
                        {{ now()->translatedFormat('l, d F Y') }}
                    </p>
                    <p class="text-xl font-black text-slate-900 dark:text-white font-mono tracking-tighter" id="digital-clock">
                        {{ now()->format('H:i') }} <span class="text-indigo-500 text-base uppercase">{{ now()->format('A') }}</span>
                    </p>
                </div>
                
                <div class="flex items-center gap-3 border-l md:border-l-0 md:border-t border-slate-200 dark:border-slate-700 pl-4 md:pl-0 md:pt-1.5 w-full md:justify-end">
                    <div class="text-right">
                        <p class="text-[9px] font-black text-slate-700 dark:text-slate-300" id="weather-desc">Memuat cuaca...</p>
                        <p class="text-[9px] font-bold text-indigo-500" id="weather-temp">--°C</p>
                    </div>
                    <div class="relative w-8 h-8 flex items-center justify-center" id="weather-icon-container">
                        <img src="" id="weather-icon" alt="Weather" class="w-8 h-8 relative z-10 animate-bounce" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const clockEl = document.getElementById('digital-clock');
        if (clockEl) {
            clockEl.innerHTML = `${hours}:${minutes} <span class="text-indigo-500 text-base uppercase">${ampm}</span>`;
        }
    }
    setInterval(updateClock, 1000);

    async function fetchWeather() {
        try {
            const apiKey = '16d6a2f69b77466f97075322261204';
            const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Jakarta&aqi=yes`);
            const data = await response.json();
            const current = data.current;
            const temp = Math.round(current.temp_c);
            const desc = current.condition.text;
            const iconUrl = 'https:' + current.condition.icon;
            const aqi = Math.round(current.air_quality.pm2_5);
            let aqiStatus = 'Baik';
            let aqiColor = 'text-emerald-500';
            if (aqi > 50) aqiStatus = 'Sedang', aqiColor = 'text-amber-500';
            if (aqi > 100) aqiStatus = 'Buruk', aqiColor = 'text-rose-500';
            document.getElementById('weather-desc').innerText = desc;
            document.getElementById('weather-temp').innerHTML = `${temp}°C <span class="mx-0.5">•</span> <span class="${aqiColor}">AQI ${aqi}</span>`;
            document.getElementById('weather-icon').src = iconUrl;
        } catch (error) {
            console.error(error);
            document.getElementById('weather-desc').innerText = 'Offline';
        }
    }
    fetchWeather();
    setInterval(fetchWeather, 900000);
</script>
