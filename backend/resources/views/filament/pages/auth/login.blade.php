@php
    $renderHookScopes = $this->getRenderHookScopes();
@endphp

<div class="fi-login-split">
    {{ \Filament\Support\Facades\FilamentView::renderHook(\Filament\View\PanelsRenderHook::SIMPLE_LAYOUT_START, scopes: $renderHookScopes) }}

    {{-- Left: Form panel --}}
    <div class="fi-login-split__form-side">
        <div class="fi-login-split__form-wrap">

            <div class="fi-login-split__heading">
                <!-- <h1>{!! $this->getHeading() !!}</h1> -->
                <h1>Selamat Datang</h1>
                @if ($subheading = $this->getSubheading())
                    <!-- <p>{!! $subheading !!}</p> -->
                @endif
                    <p>Silakan masukkan kredensial Anda untuk melanjutkan</p>
            </div>

            {{ \Filament\Support\Facades\FilamentView::renderHook(\Filament\View\PanelsRenderHook::AUTH_LOGIN_FORM_BEFORE, scopes: $renderHookScopes) }}

            <div class="fi-login-split__form">
                {{ $this->content }}
            </div>

            {{ \Filament\Support\Facades\FilamentView::renderHook(\Filament\View\PanelsRenderHook::AUTH_LOGIN_FORM_AFTER, scopes: $renderHookScopes) }}

            <p class="fi-login-split__footer">
                Having trouble? <a href="mailto:support@bulanprb2026.id">Contact Support</a>
            </p>

        </div>

        <p class="fi-login-split__copyright">&copy; {{ date('Y') }} BULAN PRB. All rights reserved.</p>
    </div>

    {{-- Right: Visual panel --}}
    <div class="fi-login-split__visual-side" aria-hidden="true">
        <div class="fi-login-split__visual-grid"></div>

        <div class="fi-login-split__visual-card">
            <div class="fi-login-split__visual-icon">
                <img src="{{ asset('images/bnpb.png') }}" alt="Logo">
            </div>
            <h2 class="fi-login-split__visual-heading">BULAN PRB 2026</h2>
            <p class="fi-login-split__visual-copy">
                Portal manajemen konten terpadu untuk mengatur seluruh rangkaian Bulan Pengurangan Risiko Bencana 2026.
            </p>
            <div class="fi-login-split__visual-divider"></div>
        </div>
    </div>

    {{ \Filament\Support\Facades\FilamentView::renderHook(\Filament\View\PanelsRenderHook::SIMPLE_LAYOUT_END, scopes: $renderHookScopes) }}
</div>