import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ModernChatBot from "@/components/ModernChatBot";
import ProductCatalog from "@/components/ProductCatalog";
import AnimatedCounter from "@/components/AnimatedCounter";
import astralPoolLogo from "@/assets/astralpool-logo.png";
import coolpoolLogo from "@/assets/coolpool-logo.png";
import pool1 from "@/assets/pool-1.png";
import pool2 from "@/assets/pool-2.png";
import pool3 from "@/assets/pool-3.png";
import pool4 from "@/assets/pool-4.png";
import pool5 from "@/assets/pool-5.png";
import pool6 from "@/assets/pool-6.png";
import { Sparkles, Facebook, Instagram, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const categories = [
  "Bazeni",
  "SPA kade",
  "Saune",
  "Laghetto",
  "Filteri",
  "Pumpe",
  "Skimmeri",
  "Osnovna i ABS oprema",
  "PVC cijevi i fitinzi",
  "Rasvjeta",
  "Kemikalije",
  "Pribor za čišćenje",
  "Mozaik",
  "Materijal za oblaganje",
  "Doziranje i elektronika",
  "Efekti",
  "Inox ljestve",
  "Prekrivači",
  "Grijanje",
  "Roboti",
];

const featuredProjects = [
  {
    id: 1,
    name: "Luksuzna Vila s Infinity Bazenom",
    description: "Moderan dizajn s panoramskim pogledom i infinity rubom",
    category: "Infinity Bazeni",
    image: pool1,
  },
  {
    id: 2,
    name: "Nadzemni Bazen Premium",
    description: "Elegantna nadzemna konstrukcija s potpunom opremom",
    category: "Nadzemni Bazeni",
    image: pool2,
  },
  {
    id: 3,
    name: "Obiteljski Bazen",
    description: "Savršen bazen za obitelj s prostranom terasom",
    category: "Obiteljski Bazeni",
    image: pool3,
  },
  {
    id: 4,
    name: "Wellness Centar s Saunom",
    description: "Kompletno wellness rješenje za vaš dom",
    category: "Wellness",
    image: pool4,
  },
  {
    id: 5,
    name: "Hidromasažna Kada Premium",
    description: "Vrhunska hidromasažna kada za potpuno opuštanje",
    category: "Hidromasaža",
    image: pool5,
  },
  {
    id: 6,
    name: "Krovni Bazen",
    description: "Ekskluzivno rješenje za krovne terase",
    category: "Krovni Bazeni",
    image: pool6,
  },
];

const Index = () => {
  const [displayedProducts, setDisplayedProducts] = useState<any[]>([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [trendingProducts, setTrendingProducts] = useState<any[]>([]);

  useEffect(() => {
    loadTrendingProducts();
  }, []);

  const loadTrendingProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .limit(12)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTrendingProducts(data || []);
    } catch (error) {
      console.error('Error loading trending products:', error);
    }
  };

  const openCatalog = (category?: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="hidden md:block">
        <ProductCatalog openCategory={selectedCategory} />
      </div>
      
      {/* Main content with left margin for sidebar */}
      <div className="md:ml-72">
        <Hero onVideoEnd={() => setVideoEnded(true)} />
      {/* Scrolling Categories Section - overlapping video */}
      <div className="relative overflow-hidden py-2 -mt-16 z-20 glass-effect">
        <div className="flex animate-scroll whitespace-nowrap">
          {[...categories, ...categories].map((category, index) => (
            <Link
              key={index}
              to={`/products?category=${category}`}
              className="inline-flex items-center px-4 py-2 mx-2 glass-effect text-foreground text-xs font-bold shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-primary/20 hover:border-primary group"
            >
              <span className="group-hover:text-primary transition-colors">{category}</span>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Hero Content Section */}
      <section className="py-8 px-4 bg-gradient-to-b from-background to-muted/5">
        <div className="container mx-auto max-w-6xl">
          {/* Main Headline */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Profesionalna izgradnja i opremanje bazena
            </h1>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-3">
              Od 2006. godine specijalizirani smo za izgradnju i opremanje bazena. 
              Kao glavni partner AstralPool Fluidra Group u Dalmaciji, nudimo vrhunsku opremu, 
              profesionalnu ugradnju i potpunu tehničku podršku.
            </p>
            
            {/* Partner Logos - Inline */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <img src={coolpoolLogo} alt="CoolPool" loading="eager" className="h-8 md:h-10 w-auto object-contain" />
              <span className="text-lg text-muted-foreground">×</span>
              <img src={astralPoolLogo} alt="AstralPool" loading="eager" className="h-6 md:h-8 w-auto object-contain" />
            </div>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-card to-card/50 p-4 border border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg">
              <div className="relative">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent mb-1">
                  <AnimatedCounter end={18} suffix="+" />
                </div>
                <p className="text-[10px] md:text-xs uppercase tracking-wide font-semibold text-muted-foreground">Godina Iskustva</p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-card to-card/50 p-4 border border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg">
              <div className="relative">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent mb-1">
                  <AnimatedCounter end={1000} suffix="+" />
                </div>
                <p className="text-[10px] md:text-xs uppercase tracking-wide font-semibold text-muted-foreground">Izgrađenih Bazena</p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-card to-card/50 p-4 border border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg">
              <div className="relative">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent mb-1">
                  <AnimatedCounter end={100} suffix="%" />
                </div>
                <p className="text-[10px] md:text-xs uppercase tracking-wide font-semibold text-muted-foreground">Zadovoljnih Klijenata</p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-card to-card/50 p-4 border border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg">
              <div className="relative">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent mb-1">
                  <AnimatedCounter end={36} />
                </div>
                <p className="text-[10px] md:text-xs uppercase tracking-wide font-semibold text-muted-foreground">Stručan Djelatnik</p>
              </div>
            </div>
          </div>
          
          {/* CTA Cards Grid - Emphasized */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            {/* Web Shop CTA - PRIMARY */}
            <Link to="/products">
              <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 via-primary/15 to-primary/10 p-8 border-2 border-primary/50 hover:border-primary hover:shadow-2xl transition-all cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="text-4xl mb-3">🛒</div>
                  <h3 className="text-2xl font-extrabold mb-3 group-hover:text-primary transition-colors">Web Shop</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    Širok asortiman premium opreme i kemikalija za održavanje bazena
                  </p>
                  <span className="inline-flex items-center text-base font-bold text-primary group-hover:translate-x-2 transition-transform">
                    Pregledajte sada →
                  </span>
                </div>
              </div>
            </Link>
            
            {/* AI Assistant CTA - PRIMARY */}
            <div 
              onClick={() => {
                const chatbot = document.querySelector('[data-chatbot]') as HTMLButtonElement;
                if (chatbot) chatbot.click();
              }}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-secondary/20 via-secondary/15 to-secondary/10 p-8 border-2 border-secondary/50 hover:border-secondary hover:shadow-2xl transition-all cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <Sparkles className="h-10 w-10 text-secondary mb-3" />
                <h3 className="text-2xl font-extrabold mb-3 group-hover:text-secondary transition-colors">AI Asistent</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Pronađite opremu za veličinu i održavanje vašeg bazena
                </p>
                <span className="inline-flex items-center text-base font-bold text-secondary group-hover:translate-x-2 transition-transform">
                  Razgovarajte s AI →
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Projects Section */}
      <section className="py-8 px-4 bg-gradient-to-b from-muted/5 to-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Naši Izdvojeni Projekti
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              Pogledajte neke od naših najuspješnijih realizacija bazena, spa zona i wellness centara
            </p>
          </div>
          
          {/* Projects Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {featuredProjects.map((project) => (
              <Link 
                key={project.id}
                to="/projekti"
                className="group relative overflow-hidden rounded-lg border border-border hover:border-primary transition-all hover:shadow-xl"
              >
                <div className="aspect-[4/3] overflow-hidden bg-muted/20">
                  <img 
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <div className="inline-block px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-bold mb-1">
                      {project.category}
                    </div>
                    <h3 className="text-sm font-bold mb-1">{project.name}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{project.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/projekti">
              <Button 
                size="sm" 
                variant="outline"
                className="font-bold px-6 hover:bg-primary/5 transition-all"
              >
                Pogledaj Više Projekata
              </Button>
            </Link>
            <Link to="/izgradnja#contact-form">
              <Button 
                size="sm" 
                className="text-white font-bold px-6 shadow-lg hover:shadow-xl transition-all"
                style={{ background: "var(--gradient-water)" }}
              >
                Zatražite Ponudu
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Trending Products Carousel */}
      {trendingProducts.length > 0 && (
        <section className="py-8 px-4 bg-gradient-to-b from-background to-muted/5 overflow-hidden">
          <div className="container mx-auto max-w-6xl mb-6">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Istaknuti Proizvodi
              </h2>
              <p className="text-sm text-muted-foreground max-w-xl mx-auto mb-4">
                Najpopularnija oprema za bazene iz našeg asortimana
              </p>
              <Link to="/products">
                <Button 
                  variant="outline"
                  size="sm"
                  className="font-bold px-6 hover:bg-primary/5 transition-colors"
                >
                  Pogledajte Sve Proizvode →
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Auto-scrolling Products */}
          <div className="relative">
            <div className="flex gap-4 animate-scroll">
              {[...trendingProducts, ...trendingProducts].map((product, index) => (
                <Link
                  key={`${product.id}-${index}`}
                  to={`/product/${product.id}`}
                  className="flex-shrink-0 w-64 group"
                >
                  <div className="bg-card rounded-lg overflow-hidden border border-border hover:border-primary transition-all hover:shadow-lg h-full">
                    <div className="aspect-square bg-muted/10 overflow-hidden">
                      <img 
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <div className="inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold mb-2">
                        {product.category}
                      </div>
                      <h3 className="text-base font-bold mb-1 group-hover:text-primary transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-black text-primary">
                          €{product.price.toFixed(2)}
                        </span>
                        <span className="text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
                          Detalji →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* AI-Suggested Products Section */}
      {displayedProducts.length > 0 && (
        <section className="py-4 px-4 bg-muted/30">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4 text-foreground">
              Products We Think You'll Love
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayedProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="bg-card rounded-lg overflow-hidden border-2 border-border hover:border-primary transition-all hover:shadow-xl p-4"
                >
                  <h3 className="text-xl font-bold">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.description}</p>
                  <div className="text-2xl font-black text-primary mt-2">€{product.price?.toFixed(2)}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="relative overflow-hidden bg-gradient-to-b from-muted/50 to-muted border-t border-primary/20">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Company Info and Map */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <img src={coolpoolLogo} alt="CoolPool" loading="lazy" className="h-12 w-auto object-contain" />
              </div>
              <div className="text-muted-foreground text-sm leading-relaxed space-y-1">
                <p className="font-bold text-foreground">COOL POOL d.o.o.</p>
                <p>Kroz Smrdečac 31, 21000 Split</p>
                <p>OIB: 58469938489</p>
                <p className="font-semibold text-foreground mt-2">Adresa poslovanja:</p>
                <p>Slanice 22, 21000 Split</p>
                <p className="mt-2">
                  <a href="mailto:info@coolpool.hr" className="hover:text-primary transition-colors">
                    info@coolpool.hr
                  </a>
                </p>
                <p>
                  <a href="tel:+385956633214" className="hover:text-primary transition-colors">
                    +385 (0) 95 66 33 214
                  </a>
                </p>
              </div>
              <div className="mt-4 rounded-lg overflow-hidden border border-primary/20">
                <iframe
                  src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Bazeniplus+Split+Slanice+22&zoom=15"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Bazeniplus Location"
                />
              </div>
            </div>

            {/* Social Networks */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-bold text-foreground uppercase tracking-wider">
                  Društvene Mreže
                </h3>
                <div className="h-0.5 flex-1 max-w-[60px]" style={{ background: "var(--gradient-water)" }}></div>
              </div>
              <div className="flex gap-3">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group h-12 w-12 border border-primary/20 flex items-center justify-center transition-all hover:bg-primary/10"
                >
                  <Facebook className="h-5 w-5 text-primary" />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group h-12 w-12 border border-primary/20 flex items-center justify-center transition-all hover:bg-primary/10"
                >
                  <Instagram className="h-5 w-5 text-primary" />
                </a>
                <a 
                  href="https://wa.me" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group h-12 w-12 border border-primary/20 flex items-center justify-center transition-all hover:bg-primary/10"
                >
                  <MessageCircle className="h-5 w-5 text-primary" />
                </a>
              </div>
            </div>

            {/* Working Hours */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-bold text-foreground uppercase tracking-wider">
                  Radno Vrijeme
                </h3>
                <div className="h-0.5 flex-1 max-w-[60px]" style={{ background: "var(--gradient-water)" }}></div>
              </div>
              <div className="space-y-2">
                {[
                  { day: "Ponedjeljak", hours: "08–16" },
                  { day: "Utorak", hours: "08–16" },
                  { day: "Srijeda", hours: "08–16" },
                  { day: "Četvrtak", hours: "08–16" },
                  { day: "Petak", hours: "08–16" },
                  { day: "Subota", hours: "09–12" },
                  { day: "Nedjelja", hours: "Zatvoreno" },
                ].map((item, index) => (
                  <div 
                    key={item.day}
                    className="flex justify-between items-center p-2 border border-primary/10 hover:border-primary/30 transition-all"
                  >
                    <span className="text-muted-foreground text-sm">{item.day}</span>
                    <span className="font-semibold text-foreground text-sm">{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-primary/20 pt-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                CoolPool | © {new Date().getFullYear()} | Sva prava pridržana
              </p>
            </div>
          </div>
        </div>
      </footer>

        <ModernChatBot onOpenCatalog={openCatalog} />
      </div>
    </div>
  );
};

export default Index;
