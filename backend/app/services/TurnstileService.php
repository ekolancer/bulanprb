<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class TurnstileService
{
    public static function verify(?string $token): bool
    {
        if (empty($token)) {
            return false;
        }

        $secret = config('services.turnstile.secret_key');

        if (empty($secret)) {
            return true; // Skip if not configured
        }

        $response = Http::timeout(3)->retry(1, 200)->asForm()->post('https://challenges.cloudflare.com/turnstile/v0/siteverify', [
            'secret' => $secret,
            'response' => $token,
            'remoteip' => request()->ip(),
        ]);

        return $response->json('success', false);
    }
}
