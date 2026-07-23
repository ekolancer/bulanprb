// Admin panel — Filament backend (Laravel), served under /admin.
//
// Frontend and backend share the same domain in production via reverse proxy
// (e.g. Nginx routes /admin and /api to Laravel, everything else to the React
// build). A relative path works in every environment without extra config.
export const adminPanelUrl = '/admin';
