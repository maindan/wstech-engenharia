export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.93.95-3.48-.22-.36a9.4 9.4 0 0 1-1.45-5.02c0-5.2 4.24-9.43 9.45-9.43a9.38 9.38 0 0 1 9.44 9.44c0 5.2-4.24 9.43-9.45 9.43m8.04-17.47A11.3 11.3 0 0 0 12.04.7C5.77.7.67 5.79.67 12.06c0 2 .52 3.96 1.52 5.68L.57 23.6l6-1.57a11.33 11.33 0 0 0 5.47 1.4h.01c6.26 0 11.36-5.1 11.37-11.37 0-3.03-1.18-5.89-3.33-8.03" />
    </svg>
  );
}

export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function Gear({ className }: { className?: string }) {
  // Engrenagem simplificada, inspirada no símbolo da logo
  const teeth = Array.from({ length: 10 }, (_, i) => i * 36);
  return (
    <svg viewBox="0 0 200 200" aria-hidden className={className} fill="currentColor">
      {teeth.map((deg) => (
        <rect key={deg} x="88" y="4" width="24" height="34" rx="5" transform={`rotate(${deg} 100 100)`} />
      ))}
      <path fillRule="evenodd" d="M100 26a74 74 0 1 1 0 148 74 74 0 0 1 0-148Zm0 34a40 40 0 1 0 0 80 40 40 0 0 0 0-80Z" />
    </svg>
  );
}
