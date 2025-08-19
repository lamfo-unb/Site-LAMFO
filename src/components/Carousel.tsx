"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

interface CarouselImage {
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

const images: CarouselImage[] = [
  {
    src: "/banners/palestra-joao.jpeg",
    alt: "Palestra do João sobre machine learning em finanças",
    title: "Palestra Especial",
    description: "Insights sobre machine learning aplicado ao setor financeiro"
  },
  {
    src: "/banners/campus-party.jpeg",
    alt: "Participação do LAMFO na Campus Party",
    title: "Campus Party 2024",
    description: "Nossa participação no maior evento de tecnologia do Brasil"
  },
  {
    src: "/banners/artigo-revista.jpeg",
    alt: "Artigo publicado em revista científica",
    title: "Publicação Científica",
    description: "Novo artigo publicado em revista internacional"
  },
  {
    src: "/banners/encontro-networking.jpeg",
    alt: "Encontro de networking do laboratório",
    title: "Networking LAMFO",
    description: "Conectando pesquisadores e profissionais da área"
  },
  {
    src: "/banners/artigo.jpeg",
    alt: "Pesquisa em andamento no laboratório",
    title: "Pesquisa Inovadora",
    description: "Desenvolvendo soluções para o futuro das finanças"
  },
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalDuration = 6000; // 6 segundos

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  const togglePlayPause = useCallback(() => {
    setIsPaused(prev => !prev);
  }, []);

  // Auto-play logic
  useEffect(() => {
    if (!isPaused) {
      timeoutRef.current = setTimeout(nextSlide, intervalDuration);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current, isPaused, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          prevSlide();
          break;
        case 'ArrowRight':
          e.preventDefault();
          nextSlide();
          break;
        case ' ':
          e.preventDefault();
          togglePlayPause();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, togglePlayPause]);

  return (
    <section
      className="relative w-full overflow-hidden bg-gray-900"
      style={{ height: "70vh", minHeight: "500px", maxHeight: "800px" }}
      role="region"
      aria-label="Carrossel de imagens do LAMFO"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main carousel container */}
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
        role="group"
        aria-live="polite"
        aria-atomic="false"
      >
        {images.map((image, i) => (
          <div
            key={i}
            className="min-w-full relative"
            style={{ height: "70vh", minHeight: "500px", maxHeight: "800px" }}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} de ${images.length}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover object-center"
              priority={i === 0}
              sizes="100vw"
              quality={85}
            />
            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
          </div>
        ))}
      </div>

      {/* Main content overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
            Bem-vindo ao LAMFO
          </h1>
          <p className="text-white text-base md:text-lg lg:text-xl font-light mb-6 drop-shadow-md max-w-2xl">
            Laboratório de Aprendizagem de Máquinas em Finanças e Organizações
          </p>
          
          {/* Current slide info */}
          <div className="bg-black/40 backdrop-blur-sm rounded-lg px-4 py-3 max-w-md mx-auto">
            <h2 className="text-white text-lg font-semibold mb-1">
              {images[current].title}
            </h2>
            <p className="text-gray-200 text-sm">
              {images[current].description}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Próximo slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Play/Pause button */}
      <button
        onClick={togglePlayPause}
        className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label={isPaused ? "Retomar apresentação automática" : "Pausar apresentação automática"}
      >
        {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 ${
              current === index
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Ir para slide ${index + 1}`}
            aria-current={current === index ? 'true' : 'false'}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <div
          className="h-full bg-white transition-all duration-1000 ease-linear"
          style={{
            width: `${((current + 1) / images.length) * 100}%`,
          }}
        />
      </div>

      {/* Screen reader announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {current + 1} de {images.length}: {images[current].title}
      </div>
    </section>
  );
}