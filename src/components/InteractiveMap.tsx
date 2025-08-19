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
        // Fallback if geolocation fails
        window.open('https://maps.google.com/?q=-15.7632057,-47.8728717+(LAMFO+-+FACE+-+UnB)', '_blank');
      });
    } else {
      // Fallback if geolocation is not supported
      window.open('https://maps.google.com/?q=-15.7632057,-47.8728717+(LAMFO+-+FACE+-+UnB)', '_blank');
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
      {/* Embedded Google Map */}
      <div className="aspect-video rounded-lg overflow-hidden mb-4">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3839.2934458657145!2d-47.87287168519158!3d-15.76320572602896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935a3a4b2c5a7cfb%3A0x7b2c8c4a8c1d5e3f!2sUniversidade%20de%20Bras%C3%ADlia%20-%20Campus%20Darcy%20Ribeiro!5e0!3m2!1spt!2sbr!4v1692728947123!5m2!1spt!2sbr"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Localização da UnB - Campus Darcy Ribeiro"
          className="rounded-lg"
        ></iframe>
      </div>
      
      <div className="space-y-3">
        <a
          href="https://maps.google.com/?q=-15.7632057,-47.8728717+(LAMFO+-+FACE+-+UnB)"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center"
        >
          Abrir no Google Maps
          <ExternalLink className="ml-2 h-4 w-4" />
        </a>
        
        <a
          href="https://waze.com/ul?ll=-15.7632057,-47.8728717&navigate=yes&zoom=17"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold flex items-center justify-center"
        >
          Abrir no Waze
          <ExternalLink className="ml-2 h-4 w-4" />
        </a>
        
        <button
          onClick={handleGPSNavigation}
          className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center"
        >
          Como Chegar (GPS)
          <Navigation className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
