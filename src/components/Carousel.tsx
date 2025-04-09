"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const images = [
    "/banners/palestra-joao.jpeg",
    "/banners/campus-party.jpeg",
    "/banners/artigo-revista.jpeg",
    "/banners/encontro-networking.jpeg",
    "/banners/artigo.jpeg",
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000); // muda a cada 5 segundos

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current]);

  return (
    <div
    className="relative w-full overflow-hidden"
    style={{ height: "calc(100vh - 69px)" }}
    >
    <div
        className="flex transition-transform duration-1000"
        style={{ transform: `translateX(-${current * 100}%)` }}
    >
        {images.map((src, i) => (
        <div key={i} className="min-w-full relative" style={{ height: "calc(100vh - 69px)" }}>
            <Image
            src={src}
            alt={`Slide ${i + 1}`}
            fill
            className="object-cover object-center"
            priority={i === 0}
            />
        </div>
        ))}
    </div>

    {/* Texto centralizado */}
    <div className="absolute inset-0 flex items-center justify-center">
        <h2 className="text-white text-4xl md:text-5xl font-bold bg-black/40 px-6 py-3 rounded">
        Bem-vindo ao LAMFO
        </h2>
    </div>
    </div>
  );
}
