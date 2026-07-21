@php
    $diskFree = disk_free_space('/');
    $diskTotal = disk_total_space('/');
    $diskUsed = $diskTotal - $diskFree;
    $diskPercent = round(($diskUsed / $diskTotal) * 100, 1);
    
    function formatBytes($bytes, $precision = 2) {
        $units = ['B', 'KB', 'MB', 'GB', 'TB'];
        $bytes = max($bytes, 0);
        $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
        $pow = min($pow, count($units) - 1);
        $bytes /= pow(1024, $pow);
        return round($bytes, $precision) . ' ' . $units[$pow];
    }
    
    $diskFreeFormatted = formatBytes($diskFree);
    $diskTotalFormatted = formatBytes($diskTotal);
@endphp

<div class="px-6 py-4 mt-auto mb-3 border-t border-gray-100 dark:border-white/5 space-y-4 glass-sidebar-footer">
    {{-- Clock --}}
    <!-- <div x-data="{ 
        time: '', 
        date: '',
        update() {
            const now = new Date();
            this.time = now.toLocaleTimeString('id-id', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
            this.date = now.toLocaleDateString('id-id', { weekday: 'short', day: 'numeric', month: 'short' });
        }
    }" x-init="update(); setInterval(() => update(), 1000)" class="space-y-0.5">
        <p class="text-[9px] uppercase tracking-[0.15em] text-gray-500 dark:text-gray-400 font-bold opacity-70" x-text="date"></p>
        <p class="text-xl font-black tabular-nums tracking-tighter text-primary-600 dark:text-primary-400 font-heading leading-none" x-text="time"></p>
    </div> -->

    {{-- Storage --}}
    <div class="space-y-2">
        <div class="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
            <span class="text-gray-500 dark:text-gray-400 opacity-80">Storage</span>
            <span class="{{ $diskPercent > 90 ? 'text-danger-500' : ($diskPercent > 70 ? 'text-warning-500' : 'text-success-500') }}">
                {{ $diskPercent }}%
            </span>
        </div>
        
        <div class="h-1 w-full bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden shadow-inner">
            <div x-data="{ percent: {{ $diskPercent }} }"
                 x-init="setTimeout(() => { $el.style.width = percent + '%' }, 100)"
                 class="h-full rounded-full transition-all duration-1000 ease-out 
                {{ $diskPercent > 90 ? 'bg-danger-500' : ($diskPercent > 70 ? 'bg-warning-500' : 'bg-success-500') }}" 
                 style="width: 0%;">
            </div>
        </div>
        
        <div class="flex justify-between text-[9px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-tighter opacity-70">
            <span>Free: {{ $diskFreeFormatted }}</span>
            <span>Total: {{ $diskTotalFormatted }}</span>
        </div>
    </div>
</div>

<style>
    /* Hide footer info when sidebar is collapsed (optional, but cleaner) */
    .fi-sidebar-collapsed .glass-sidebar-footer {
        display: none;
    }
</style>
