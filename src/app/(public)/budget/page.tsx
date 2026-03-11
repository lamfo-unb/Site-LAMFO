"use client";

import { useState } from "react";
import {
  Calculator,
  Send,
  CheckCircle,
  Building,
  Users,
  Brain,
  BarChart3,
  Target,
  ArrowRight
} from "lucide-react";

export default function Budget() {
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', phone: '',
    projectType: '', description: '', timeline: '', budget: '', objectives: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const projectTypes = [
    { value: 'machine-learning', label: 'Machine Learning e IA' },
    { value: 'data-analysis', label: 'Análise de Dados' },
    { value: 'financial-modeling', label: 'Modelagem Financeira' },
    { value: 'risk-assessment', label: 'Avaliação de Riscos' },
    { value: 'consulting', label: 'Consultoria Estratégica' },
    { value: 'research', label: 'Pesquisa Aplicada' },
    { value: 'other', label: 'Outro' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/budget', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert('Erro ao enviar solicitação: ' + data.error);
      }
    } catch {
      alert('Erro ao enviar solicitação. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-white rounded-xl border border-[var(--border)] p-8 text-center">
          <div className="w-14 h-14 rounded-full bg-[var(--green-50)] flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="h-7 w-7 text-[var(--green-500)]" />
          </div>
          <h2 className="text-2xl font-bold font-[family-name:var(--font-outfit)] text-[var(--foreground)] mb-3">
            Solicitação Enviada!
          </h2>
          <p className="text-[var(--muted)] mb-6 text-sm">
            Nossa equipe entrará em contato em até 48 horas para discutir seu projeto.
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({ name: '', email: '', company: '', phone: '', projectType: '', description: '', timeline: '', budget: '', objectives: '' });
            }}
            className="bg-[var(--navy-500)] text-white px-5 py-2.5 rounded-lg hover:bg-[var(--navy-600)] transition-colors text-sm font-semibold font-[family-name:var(--font-outfit)]"
          >
            Enviar Nova Solicitação
          </button>
        </div>
      </div>
    );
  }

  const services = [
    { icon: Brain, title: "Consultoria Especializada", description: "Orientação estratégica em machine learning, IA e análise quantitativa." },
    { icon: BarChart3, title: "Pesquisa Aplicada", description: "Pesquisas customizadas para resolver problemas específicos do seu negócio." },
    { icon: Target, title: "Soluções Personalizadas", description: "Ferramentas e modelos sob medida para as necessidades do seu projeto." },
  ];

  const inputClasses = "w-full px-4 py-2.5 text-sm border border-[var(--border)] rounded-lg bg-[var(--surface-subtle)] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--navy-500)]/20 focus:border-[var(--navy-300)] transition-all duration-200";

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero */}
      <div className="bg-[var(--navy-900)] text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--green-500)]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative">
          <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-5">
            <Calculator className="h-7 w-7 text-[var(--green-400)]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-outfit)] mb-4">
            Orce Sua Ideia
          </h1>
          <p className="text-[var(--navy-200)] leading-relaxed max-w-2xl mx-auto">
            Por intermédio da FINATEC, o LAMFO está capacitado a prestar serviços técnicos especializados
            de pesquisa para os setores público e privado. Aproveite toda a experiência da nossa equipe.
          </p>
        </div>
      </div>

      {/* Services */}
      <section className="py-16 bg-white border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold font-[family-name:var(--font-outfit)] uppercase tracking-widest text-[var(--green-500)] mb-2">
              Como podemos ajudar
            </p>
            <h2 className="text-3xl font-bold font-[family-name:var(--font-outfit)] text-[var(--foreground)]">
              Nossos Serviços
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="text-center p-6 bg-[var(--surface-subtle)] rounded-xl border border-[var(--border)]">
                  <div className="w-11 h-11 rounded-lg bg-[var(--navy-50)] flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-5 w-5 text-[var(--navy-500)]" />
                  </div>
                  <h3 className="text-base font-bold font-[family-name:var(--font-outfit)] text-[var(--foreground)] mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[var(--muted)]">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-white rounded-xl border border-[var(--border)] p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold font-[family-name:var(--font-outfit)] text-[var(--foreground)] mb-2">
                Solicite Seu Orçamento
              </h2>
              <p className="text-sm text-[var(--muted)]">
                Preencha os detalhes do seu projeto. Nossa equipe entrará em contato com uma proposta personalizada.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Nome Completo *</label>
                  <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} className={inputClasses} placeholder="Seu nome completo" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Email *</label>
                  <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className={inputClasses} placeholder="seu@email.com" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Empresa/Organização</label>
                  <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} className={inputClasses} placeholder="Nome da empresa" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Telefone</label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className={inputClasses} placeholder="(61) 99999-9999" />
                </div>
              </div>

              <div>
                <label htmlFor="projectType" className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Tipo de Projeto *</label>
                <select id="projectType" name="projectType" required value={formData.projectType} onChange={handleChange} className={inputClasses}>
                  <option value="">Selecione o tipo</option>
                  {projectTypes.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Descrição do Projeto *</label>
                <textarea id="description" name="description" required rows={4} value={formData.description} onChange={handleChange} className={inputClasses} placeholder="Descreva seu projeto, objetivos e requisitos..." />
              </div>

              <div>
                <label htmlFor="objectives" className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Objetivos e Resultados Esperados</label>
                <textarea id="objectives" name="objectives" rows={3} value={formData.objectives} onChange={handleChange} className={inputClasses} placeholder="Quais resultados você espera?" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="timeline" className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Prazo Desejado</label>
                  <input type="text" id="timeline" name="timeline" value={formData.timeline} onChange={handleChange} className={inputClasses} placeholder="Ex: 3 meses" />
                </div>
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Orçamento Aproximado</label>
                  <input type="text" id="budget" name="budget" value={formData.budget} onChange={handleChange} className={inputClasses} placeholder="Ex: R$ 50.000 - R$ 100.000" />
                </div>
              </div>

              <div className="text-center pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 bg-[var(--green-500)] text-white px-8 py-3 rounded-lg hover:bg-[var(--green-600)] transition-colors font-semibold font-[family-name:var(--font-outfit)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar Solicitação
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-14 bg-white border-t border-[var(--border)]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-xl font-bold font-[family-name:var(--font-outfit)] text-[var(--foreground)] mb-2">
            Tem Dúvidas?
          </h2>
          <p className="text-sm text-[var(--muted)] mb-5">
            Nossa equipe está pronta para esclarecer qualquer questão.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/contacts"
              className="inline-flex items-center justify-center gap-2 bg-[var(--surface-subtle)] text-[var(--foreground)] px-5 py-2.5 rounded-lg hover:bg-[var(--border)] transition-colors text-sm font-semibold font-[family-name:var(--font-outfit)] border border-[var(--border)]"
            >
              <Building className="h-4 w-4" />
              Contato
            </a>
            <a
              href="/contacts"
              className="inline-flex items-center justify-center gap-2 bg-[var(--navy-500)] text-white px-5 py-2.5 rounded-lg hover:bg-[var(--navy-600)] transition-colors text-sm font-semibold font-[family-name:var(--font-outfit)]"
            >
              <Users className="h-4 w-4" />
              Falar com a Equipe
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
