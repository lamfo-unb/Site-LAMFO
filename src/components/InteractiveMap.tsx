"use client";

import { ExternalLink, Navigation } from "lucide-react";

export default function InteractiveMap() {
  const handleGPSNavigation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const destination = "-15.7632057,-47.8728717";
        const url = `https://maps.google.com/maps/dir/${latitude},${longitude}/${destination}`;
        window.open(url, '_blank');
      }, () => {
        window.open('https://maps.google.com/?q=-15.7632057,-47.8728717+(LAMFO+-+FACE+-+UnB)', '_blank');
      });
    } else {
      window.open('https://maps.google.com/?q=-15.7632057,-47.8728717+(LAMFO+-+FACE+-+UnB)', '_blank');
    }
  };

  return (
    <div className="bg-white rounded-xl border border-[var(--border)] overflow-hidden mb-4">
      <div className="aspect-video">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3839.2934458657145!2d-47.87287168519158!3d-15.76320572602896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935a3a4b2c5a7cfb%3A0x7b2c8c4a8c1d5e3f!2sUniversidade%20de%20Bras%C3%ADlia%20-%20Campus%20Darcy%20Ribeiro!5e0!3m2!1spt!2sbr!4v1692728947123!5m2!1spt!2sbr"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Localização da UnB - Campus Darcy Ribeiro"
        />
      </div>

      <div className="p-4 space-y-2">
        <a
          href="https://maps.google.com/?q=-15.7632057,-47.8728717+(LAMFO+-+FACE+-+UnB)"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-[var(--navy-500)] text-white px-4 py-2.5 rounded-lg hover:bg-[var(--navy-600)] transition-colors font-semibold font-[family-name:var(--font-outfit)] text-sm"
        >
          Google Maps
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
        <a
          href="https://waze.com/ul?ll=-15.7632057,-47.8728717&navigate=yes&zoom=17"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 border border-[var(--border)] text-[var(--foreground)] px-4 py-2.5 rounded-lg hover:bg-[var(--surface-subtle)] transition-colors font-semibold font-[family-name:var(--font-outfit)] text-sm"
        >
          Waze
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
        <button
          onClick={handleGPSNavigation}
          className="w-full flex items-center justify-center gap-2 bg-[var(--green-500)] text-white px-4 py-2.5 rounded-lg hover:bg-[var(--green-600)] transition-colors font-semibold font-[family-name:var(--font-outfit)] text-sm"
        >
          Como Chegar (GPS)
          <Navigation className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
