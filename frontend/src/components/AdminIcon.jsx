import React from 'react';

// Admin login icon — user profile silhouette with a login-arrow accent badge.
export const AdminIcon = ({ className = 'w-7 h-7' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <filter id="admin-icon-shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#0f172a" floodOpacity="0.12" />
      </filter>
    </defs>

    {/* Background circle */}
    <circle cx="50" cy="50" r="44" fill="transparent" stroke="#cbd5e1" strokeWidth="2.5" filter="url(#admin-icon-shadow)" />

    {/* User silhouette */}
    <g fill="#b1b1b1ff" transform="translate(-2, -2)">
      <circle cx="48" cy="38" r="13" />
      <path d="M26 68C26 58.6112 33.6112 51 43 51H53C62.3888 51 70 58.6112 70 68V70H26V68Z" />
    </g>

    {/* Login accent badge */}
    <circle cx="68" cy="68" r="16" fill="#2563eb" stroke="#ffffff" strokeWidth="2.5" />

    {/* Login arrow */}
    <g fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M62 68H73" />
      <path d="M69 64L73 68L69 72" />
    </g>
  </svg>
);
