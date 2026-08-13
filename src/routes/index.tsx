import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Star, MapPin, Phone, Instagram, Clock, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-20 items-center justify-between px-6">
          <h1 className="text-2xl font-bold tracking-tighter text-primary">SÁ FERREIRA</h1>
          <div className="hidden gap-8 md:flex">
            {["Início", "Sobre", "Serviços", "Galeria", "Avaliações", "Localização"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium hover:text-primary transition-colors">
                {item}
              </a>
            ))}
          </div>
          <a
            href="https://wa.me/5521970378593?text=Olá! Gostaria de agendar um horário na Barbearia Sá Ferreira."
            className="rounded-full bg-primary px-6 py-2 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-all"
          >
            AGENDAR
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section id="início" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1599351431202-180f0b4b268d?q=80&w=2000&auto=format&fit=crop"
            alt="Barbearia Premium"
            className="h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-background/20" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container z-10 px-6 text-center"
        >
          <p className="mb-4 text-xs font-bold tracking-[0.2em] text-primary">BARBEARIA PREMIUM EM COPACABANA</p>
          <h2 className="mb-6 text-6xl md:text-8xl font-bold tracking-tighter">Seu estilo começa nos detalhes.</h2>
          <p className="mx-auto mb-10 max-w-lg text-lg text-muted-foreground">"Mais do que um corte. Uma experiência pensada para quem valoriza presença, estilo e cuidado."</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/5521970378593?text=Olá! Gostaria de agendar um horário na Barbearia Sá Ferreira."
              className="rounded-full bg-primary px-10 py-4 font-bold text-primary-foreground hover:bg-primary/90 transition-all"
            >
              AGENDAR HORÁRIO
            </a>
          </div>
        </motion.div>
      </section>

      {/* Confiança */}
      <section className="py-12 border-y border-border/50 bg-secondary/30">
        <div className="container mx-auto px-6 text-center">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex gap-1 text-primary">
              {[1, 2, 3, 4, 5].map((i) => <Star key={i} fill="currentColor" size={24} />)}
            </div>
            <p className="text-xl font-bold">4.9 • 168 avaliações</p>
            <p className="text-sm text-muted-foreground italic">"Experiência, precisão e estilo em cada atendimento."</p>
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="py-24 container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img src="https://images.unsplash.com/photo-1503951914875-452162b09f6f?q=80&w=1000&auto=format&fit=crop" alt="Interior Barbearia" className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Mais que uma barbearia. Seu momento.</h3>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              A Barbearia Sá Ferreira foi pensada para homens que não abrem mão de estilo, cuidado e uma experiência diferenciada.
            </p>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Em um ambiente moderno e acolhedor, cada atendimento é realizado com atenção aos detalhes, respeitando o estilo e a personalidade de cada cliente.
            </p>
            <a href="#" className="inline-block border border-primary px-8 py-3 text-primary hover:bg-primary hover:text-primary-foreground transition-all">AGENDAR MEU HORÁRIO</a>
          </div>
        </div>
      </section>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/5521970378593?text=Olá! Gostaria de agendar um horário na Barbearia Sá Ferreira."
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-[#25D366] px-6 py-4 text-white shadow-xl hover:scale-105 transition-all animate-pulse"
      >
        <span className="hidden md:block font-bold">Agende seu horário</span>
      </a>
    </div>
  );
}
