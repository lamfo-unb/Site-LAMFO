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
  const intervalDuration = 6000;

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

  useEffect(() => {
    if (!isPaused) {
      timeoutRef.current = setTimeout(nextSlide, intervalDuration);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current, isPaused, nextSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft': e.preventDefault(); prevSlide(); break;
        case 'ArrowRight': e.preventDefault(); nextSlide(); break;
        case ' ': e.preventDefault(); togglePlayPause(); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, togglePlayPause]);

  return (
    <section
      className="relative w-full overflow-hidden bg-[var(--navy-900)]"
      style={{ height: "70vh", minHeight: "500px", maxHeight: "800px" }}
      role="region"
      aria-label="Carrossel de imagens do LAMFO"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="flex transition-transform duration-1000 ease-in-out h-full"
        style={{ transform: `translateX(-${current * 100}%)` }}
        role="group"
        aria-live="polite"
        aria-atomic="false"
      >
        {images.map((image, i) => (
          <div
            key={i}
            className="min-w-full relative h-full"
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
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy-900)]/80 via-[var(--navy-900)]/20 to-[var(--navy-900)]/40" />
          </div>
        ))}
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm font-semibold font-[family-name:var(--font-outfit)] uppercase tracking-[0.2em] text-[var(--green-400)] mb-4">
            Universidade de Brasília
          </p>
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-outfit)] mb-4 leading-tight">
            Laboratório de Aprendizagem de Máquinas em Finanças e Organizações
          </h1>
          <p className="text-[var(--navy-200)] text-base md:text-lg max-w-2xl mx-auto mb-8">
            Think tank dedicado ao avanço da teoria de IA e promoção do uso ético da inteligência artificial
          </p>

          {/* Current slide info */}
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-lg px-5 py-3 border border-white/10">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--green-400)]" />
            <div className="text-left">
              <p className="text-white text-sm font-semibold font-[family-name:var(--font-outfit)]">
                {images[current].title}
              </p>
              <p className="text-[var(--navy-200)] text-xs">
                {images[current].description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-lg transition-colors duration-200 border border-white/10"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-lg transition-colors duration-200 border border-white/10"
        aria-label="Próximo slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Play/Pause */}
      <button
        onClick={togglePlayPause}
        className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg transition-colors duration-200 border border-white/10"
        aria-label={isPaused ? "Retomar apresentação automática" : "Pausar apresentação automática"}
      >
        {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              current === index
                ? 'bg-[var(--green-400)] w-8'
                : 'bg-white/30 hover:bg-white/50 w-1.5'
            }`}
            aria-label={`Ir para slide ${index + 1}`}
            aria-current={current === index ? 'true' : 'false'}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white/10">
        <div
          className="h-full bg-[var(--green-500)] transition-all duration-1000 ease-linear"
          style={{ width: `${((current + 1) / images.length) * 100}%` }}
        />
      </div>

      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {current + 1} de {images.length}: {images[current].title}
      </div>
    </section>
  );
}
