import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Star, MapPin, Phone, Clock, CheckCircle, Camera, Scissors, Sparkles, User, Coffee, Wifi, X, ChevronLeft, ChevronRight, Send, Calendar, Mail, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import heroVideoAsset from "@/assets/hero-video.mp4.asset.json";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [currentReview, setCurrentReview] = useState(0);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number }[]>([]);
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (Math.random() > 0.8) {
      const rect = e.currentTarget.getBoundingClientRect();
      const newParticle = {
        id: Date.now(),
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        size: Math.random() * 4 + 2,
      };
      setParticles((prev) => [...prev.slice(-20), newParticle]);
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
      }, 1000);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % (reviews?.length || 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const trackConversion = (location: string) => {
    console.log(`[Analytics] Conversão rastreada: Clique no botão de agendamento em ${location}`);
    // Aqui poderiam ser integrados eventos do GA4, Facebook Pixel, etc.
  };

  const revealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  } as const;

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  } as const;

  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  } as const;

  const services = [
    { title: "Corte Social", price: "R$ 60", icon: <Scissors className="w-6 h-6" />, desc: "Corte clássico e preciso." },
    { title: "Barba Terapia", price: "R$ 50", icon: <Sparkles className="w-6 h-6" />, desc: "Toalha quente e óleos essenciais." },
    { title: "Combo Premium", price: "R$ 100", icon: <User className="w-6 h-6" />, desc: "Corte e barba com tratamento completo." },
    { title: "Pigmentação", price: "R$ 40", icon: <CheckCircle className="w-6 h-6" />, desc: "Correção e definição de barba." },
  ];

  const galleryImages = [
    "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1621605815841-aa8b06888ad4?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1593702295094-272cddf93f63?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1503951914875-452162b09f6f?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1532710093739-9470acff878f?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1622286330918-0952179a65c1?q=80&w=800&auto=format&fit=crop",
  ];

  const reviews = [
    { name: "Carlos Andrade", text: "Ambiente impecável e atendimento de primeira. O melhor corte de Copacabana, sem dúvida.", rating: 5 },
    { name: "Roberto Silva", text: "A barba terapia é sensacional. Relaxamento total e resultado perfeito.", rating: 5 },
    { name: "Felipe Mendes", text: "Profissionais extremamente qualificados. O combo premium vale cada centavo.", rating: 5 },
    { name: "João Pedro", text: "Estilo e cuidado nos mínimos detalhes. Recomendo muito!", rating: 4 },
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Olá! Meu nome é ${formData.name}. Gostaria de agendar um horário.\n\nContato: ${formData.phone}\nEmail: ${formData.email}\nSolicitação: ${formData.message}`;
    const whatsappUrl = `https://wa.me/5521970378593?text=${encodeURIComponent(message)}`;
    
    toast.success("Redirecionando para o WhatsApp...");
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
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
            onClick={() => trackConversion("Navbar")}
            className="rounded-full bg-primary px-6 py-2 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-all"
          >
            AGENDAR
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section 
        id="início" 
        ref={heroRef}
        className="relative h-screen w-full flex items-center justify-center overflow-hidden perspective-1000"
      >
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover opacity-50"
            poster="https://images.unsplash.com/photo-1599351431202-180f0b4b268d?q=80&w=2000&auto=format&fit=crop"
          >
            <source src={heroVideoAsset.url} type="video/mp4" />
            <img
              src="https://images.unsplash.com/photo-1599351431202-180f0b4b268d?q=80&w=2000&auto=format&fit=crop"
              alt="Barbearia Premium"
              className="h-full w-full object-cover opacity-50"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/20" />
        </div>
        <motion.div
          style={{ opacity, scale, y }}
          initial={{ opacity: 0, y: 100, rotateX: 25, z: -100 }}
          animate={{ opacity: 1, y: 0, rotateX: 0, z: 0 }}
          transition={{ 
            duration: 1.2, 
            ease: [0.22, 1, 0.36, 1],
            opacity: { duration: 0.8 }
          }}
          onMouseMove={handleMouseMove}
          className="container z-10 px-6 text-center max-w-none transform-gpu relative"
        >
          {particles.map((p) => (
            <div
              key={p.id}
              className="particle"
              style={{
                left: p.x,
                top: p.y,
                width: p.size,
                height: p.size,
              }}
            />
          ))}
          <motion.h2 
            className="mb-6 text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-3d text-foreground cursor-default text-3d-hover"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Seu estilo começa nos detalhes.
          </motion.h2>
          <motion.p 
            className="mx-auto mb-10 max-w-4xl text-lg md:text-xl text-muted-foreground leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            "Mais do que um corte. Uma experiência pensada para quem valoriza presença, estilo e cuidado."
          </motion.p>
          <motion.div 
            className="flex flex-col md:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <a
              href="https://wa.me/5521970378593?text=Olá! Gostaria de agendar um horário na Barbearia Sá Ferreira."
              onClick={() => trackConversion("Hero")}
              className="rounded-full bg-primary px-10 py-4 font-bold text-primary-foreground hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/20"
            >
              AGENDAR HORÁRIO
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Confiança */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={revealVariants}
        className="py-12 border-y border-border/50 bg-secondary/30"
      >
        <div className="container mx-auto px-6 text-center">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex gap-1 text-primary">
              {[1, 2, 3, 4, 5].map((i) => <Star key={i} fill="currentColor" size={24} />)}
            </div>
            <p className="text-xl font-bold">4.9 • 168 avaliações</p>
            <p className="text-sm text-muted-foreground italic">"Experiência, precisão e estilo em cada atendimento."</p>
          </div>
        </div>
      </motion.section>

      {/* Sobre */}
      <section id="sobre" className="py-24 container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={revealVariants}
            className="rounded-2xl overflow-hidden shadow-2xl"
          >
            <img src="https://images.unsplash.com/photo-1503951914875-452162b09f6f?q=80&w=1000&auto=format&fit=crop" alt="Interior Barbearia" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: revealVariants.hidden,
              visible: { 
                ...revealVariants.visible, 
                transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } 
              }
            }}
          >
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-3d text-3d-hover cursor-default">Mais que uma barbearia. Seu momento.</h3>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              A Barbearia Sá Ferreira foi pensada para homens que não abrem mão de estilo, cuidado e uma experiência diferenciada.
            </p>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Em um ambiente moderno e acolhedor, cada atendimento é realizado com atenção aos detalhes, respeitando o estilo e a personalidade de cada cliente.
            </p>
            <a href="https://wa.me/5521970378593?text=Olá! Gostaria de agendar um horário." className="inline-block border border-primary px-8 py-3 text-primary hover:bg-primary hover:text-primary-foreground transition-all">AGENDAR MEU HORÁRIO</a>
          </motion.div>
        </div>
      </section>

      {/* Serviços */}
      <section id="serviços" className="py-24 bg-secondary/20">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={revealVariants}
            className="text-center mb-16"
          >
            <h3 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-3d text-3d-hover cursor-default">Nossos Serviços</h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Excelência técnica e os melhores produtos para garantir o resultado que você merece.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {services.map((service, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="group p-8 border border-border/50 bg-background/50 hover:bg-background transition-all hover:border-primary/50 rounded-xl"
              >
                <div className="text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h4 className="text-xl font-bold mb-2">{service.title}</h4>
                <p className="text-muted-foreground text-sm mb-4">{service.desc}</p>
                <p className="text-2xl font-bold text-primary">{service.price}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Galeria */}
      <section id="galeria" className="py-24 container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={revealVariants}
          className="text-center mb-16"
        >
          <h3 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-3d text-3d-hover cursor-default">Galeria</h3>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Confira alguns de nossos trabalhos e o ambiente exclusivo da Sá Ferreira.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="aspect-square overflow-hidden rounded-lg group cursor-pointer relative"
              onClick={() => setSelectedImage(img)}
            >
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                <Camera className="text-white w-8 h-8" />
              </div>
              <img 
                src={img} 
                alt={`Trabalho ${i + 1}`} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Avaliações */}
      <section id="avaliações" className="py-24 bg-secondary/10">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={revealVariants}
            className="text-center mb-16"
          >
            <h3 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-3d text-3d-hover cursor-default">O que dizem nossos clientes</h3>
            <div className="flex justify-center gap-1 text-primary mb-4">
              {[1, 2, 3, 4, 5].map((i) => <Star key={i} fill="currentColor" size={20} />)}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <div className="relative max-w-4xl mx-auto overflow-hidden px-4 md:px-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentReview}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="p-8 md:p-12 rounded-2xl border border-border/50 bg-background/50 flex flex-col items-center text-center shadow-xl"
                >
                  <div className="flex gap-1 text-primary mb-6">
                    {Array.from({ length: reviews[currentReview]?.rating || 0 }).map((_, idx) => (
                      <Star key={idx} fill="currentColor" size={24} />
                    ))}
                  </div>
                  <p className="text-xl md:text-2xl text-muted-foreground italic mb-8 leading-relaxed">
                    "{reviews[currentReview]?.text || ""}"
                  </p>
                  <p className="font-bold text-lg text-primary">— {reviews[currentReview]?.name || ""}</p>
                </motion.div>
              </AnimatePresence>
              
              <div className="flex justify-center gap-4 mt-8">
                <button 
                  onClick={() => setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length)}
                  className="w-12 h-12 rounded-full border border-border/50 flex items-center justify-center hover:border-primary hover:text-primary transition-all"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={() => setCurrentReview((prev) => (prev + 1) % reviews.length)}
                  className="w-12 h-12 rounded-full border border-border/50 flex items-center justify-center hover:border-primary hover:text-primary transition-all"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              <div className="flex justify-center gap-2 mt-6">
                {reviews.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentReview(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${currentReview === idx ? 'bg-primary w-4' : 'bg-border'}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Agendamento & Contato */}
      <section id="contato" className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={revealVariants}
            >
              <h3 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Agende seu horário</h3>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Pronto para transformar seu visual? Preencha o formulário ou fale conosco diretamente pelo WhatsApp.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold">Endereço</h4>
                    <p className="text-muted-foreground">Rua Sá Ferreira, Copacabana - Rio de Janeiro</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold">Horário</h4>
                    <p className="text-muted-foreground">Seg - Sex: 09h às 20h | Sáb: 09h às 18h</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold">WhatsApp</h4>
                    <p className="text-muted-foreground">(21) 97037-8593</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={revealVariants}
              className="p-8 rounded-2xl bg-secondary/30 border border-border/50"
            >
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nome</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Seu nome"
                      className="w-full bg-background border border-border/50 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">WhatsApp</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="(21) 00000-0000"
                      className="w-full bg-background border border-border/50 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <input 
                    type="email" 
                    required
                    placeholder="seu@email.com"
                    className="w-full bg-background border border-border/50 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Qual serviço deseja?</label>
                  <textarea 
                    rows={4}
                    placeholder="Descreva o serviço ou sua dúvida..."
                    className="w-full bg-background border border-border/50 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                >
                  <Send size={20} /> ENVIAR MENSAGEM
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Comodidades */}
      <section className="py-12 bg-secondary/10 border-y border-border/30">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-12 text-muted-foreground">
            <div className="flex items-center gap-3"><Coffee className="w-5 h-5 text-primary" /> <span>Café Expresso</span></div>
            <div className="flex items-center gap-3"><Wifi className="w-5 h-5 text-primary" /> <span>Wi-Fi Free</span></div>
            <div className="flex items-center gap-3"><Clock className="w-5 h-5 text-primary" /> <span>Agendamento Online</span></div>
            <div className="flex items-center gap-3"><MapPin className="w-5 h-5 text-primary" /> <span>Copacabana</span></div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-6 right-6 text-white bg-primary/20 hover:bg-primary/40 p-2 rounded-full transition-colors z-[110]"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </motion.button>
            <motion.img
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              src={selectedImage}
              alt="Preview ampliado"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mapa */}
      <section className="h-[400px] w-full grayscale hover:grayscale-0 transition-all duration-700">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3673.235552945781!2d-43.1931327!3d-22.9774163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9bd5400938363b%3A0xe5426173a11585!2sR.%20S%C3%A1%20Ferreira%2C%20Copacabana%2C%20Rio%20de%20Janeiro%20-%20RJ!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>

      {/* Footer */}
      <footer className="bg-secondary/30 pt-16 pb-8 border-t border-border/50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <h4 className="text-2xl font-bold tracking-tighter text-primary mb-6">SÁ FERREIRA</h4>
              <p className="text-muted-foreground mb-6 max-w-sm">
                Excelência em barbearia clássica e moderna no coração de Copacabana. Sua melhor experiência de cuidado masculino.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-background border border-border/50 flex items-center justify-center hover:border-primary transition-colors">
                  <MessageSquare size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-background border border-border/50 flex items-center justify-center hover:border-primary transition-colors">
                  <Mail size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h5 className="font-bold mb-6">Links Rápidos</h5>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><a href="#início" className="group flex items-center gap-2 hover:text-primary transition-all duration-300"><span className="w-0 group-hover:w-4 h-[1px] bg-primary transition-all"></span> Início</a></li>
                <li><a href="#sobre" className="group flex items-center gap-2 hover:text-primary transition-all duration-300"><span className="w-0 group-hover:w-4 h-[1px] bg-primary transition-all"></span> Sobre Nós</a></li>
                <li><a href="#serviços" className="group flex items-center gap-2 hover:text-primary transition-all duration-300"><span className="w-0 group-hover:w-4 h-[1px] bg-primary transition-all"></span> Serviços</a></li>
                <li><a href="#galeria" className="group flex items-center gap-2 hover:text-primary transition-all duration-300"><span className="w-0 group-hover:w-4 h-[1px] bg-primary transition-all"></span> Galeria</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold mb-6">Contato</h5>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li className="flex gap-3"><MapPin size={16} className="text-primary shrink-0" /> Rua Sá Ferreira, Copacabana</li>
                <li className="flex gap-3"><Phone size={16} className="text-primary shrink-0" /> (21) 97037-8593</li>
                <li className="flex gap-3"><Clock size={16} className="text-primary shrink-0" /> Seg - Sáb, 09h às 20h</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
            <p>© 2026 Barbearia Sá Ferreira. Todos os direitos reservados.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary">Termos de Uso</a>
              <a href="#" className="hover:text-primary">Privacidade</a>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/5521970378593?text=Olá! Gostaria de agendar um horário na Barbearia Sá Ferreira."
        onClick={() => trackConversion("Floating WhatsApp")}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-[#25D366] px-6 py-4 text-white shadow-xl hover:scale-110 transition-all animate-pulse"
      >
        <span className="hidden md:block font-bold">Agende seu horário</span>
      </a>
    </div>
  );
}
