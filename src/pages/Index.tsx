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
      <section className="py-12 px-4 bg-gradient-to-b from-background to-muted/10">
        <div className="container mx-auto max-w-7xl">
          {/* Main Headline */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Profesionalna izgradnja i opremanje bazena
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-4">
              Od 2006. godine specijalizirani smo za izgradnju i opremanje bazena. 
              <br className="hidden md:block" />
              Kao glavni partner AstralPool Fluidra Group u Dalmaciji, nudimo vrhunsku opremu, 
              profesionalnu ugradnju i potpunu tehničku podršku.
            </p>
            
            {/* Partner Logos - Inline */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <img src={coolpoolLogo} alt="CoolPool" loading="eager" className="h-10 md:h-14 w-auto object-contain" />
              <span className="text-2xl text-muted-foreground">×</span>
              <img src={astralPoolLogo} alt="AstralPool" loading="eager" className="h-8 md:h-12 w-auto object-contain" />
            </div>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-card via-card to-primary/5 p-8 border-2 border-primary/20 hover:border-primary/50 transition-all hover:shadow-2xl hover:scale-105">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform"></div>
              <div className="relative">
                <div className="text-5xl md:text-6xl font-black bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent mb-3">
                  <AnimatedCounter end={18} suffix="+" />
                </div>
                <p className="text-sm md:text-base uppercase tracking-wide font-bold text-foreground/80">Godina Iskustva</p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-card via-card to-primary/5 p-8 border-2 border-primary/20 hover:border-primary/50 transition-all hover:shadow-2xl hover:scale-105">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform"></div>
              <div className="relative">
                <div className="text-5xl md:text-6xl font-black bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent mb-3">
                  <AnimatedCounter end={1000} suffix="+" />
                </div>
                <p className="text-sm md:text-base uppercase tracking-wide font-bold text-foreground/80">Izgrađenih Bazena</p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-card via-card to-primary/5 p-8 border-2 border-primary/20 hover:border-primary/50 transition-all hover:shadow-2xl hover:scale-105">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform"></div>
              <div className="relative">
                <div className="text-5xl md:text-6xl font-black bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent mb-3">
                  <AnimatedCounter end={100} suffix="%" />
                </div>
                <p className="text-sm md:text-base uppercase tracking-wide font-bold text-foreground/80">Zadovoljnih Klijenata</p>
              </div>
            </div>
          </div>
          
          {/* CTA Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Web Shop CTA */}
            <Link to="/products">
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/15 via-primary/10 to-primary/5 p-10 border-2 border-primary/40 hover:border-primary hover:shadow-2xl transition-all cursor-pointer h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="text-5xl mb-4">🛒</div>
                  <h3 className="text-3xl font-extrabold mb-4 group-hover:text-primary transition-colors">Web Shop</h3>
                  <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                    Širok asortiman premium opreme i kemikalija za održavanje bazena
                  </p>
                  <span className="inline-flex items-center text-xl font-bold text-primary group-hover:translate-x-2 transition-transform">
                    Pregledajte sada →
                  </span>
                </div>
              </div>
            </Link>
            
            {/* AI Assistant CTA */}
            <div 
              onClick={() => {
                const chatbot = document.querySelector('[data-chatbot]') as HTMLButtonElement;
                if (chatbot) chatbot.click();
              }}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-secondary/15 via-secondary/10 to-secondary/5 p-10 border-2 border-secondary/40 hover:border-secondary hover:shadow-2xl transition-all cursor-pointer h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <Sparkles className="h-12 w-12 text-secondary mb-4" />
                <h3 className="text-3xl font-extrabold mb-4 group-hover:text-secondary transition-colors">AI Asistent</h3>
                <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                  Pronađite opremu za veličinu i održavanje vašeg bazena
                </p>
                <span className="inline-flex items-center text-xl font-bold text-secondary group-hover:translate-x-2 transition-transform">
                  Razgovarajte s AI →
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Projects Section */}
      <section className="py-12 px-4 bg-gradient-to-b from-muted/10 to-background">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Naši Izdvojeni Projekti
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Pogledajte neke od naših najuspješnijih realizacija bazena, spa zona i wellness centara
            </p>
          </div>
          
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProjects.map((project) => (
              <Link 
                key={project.id}
                to="/projekti"
                className="group relative overflow-hidden rounded-2xl border-2 border-border hover:border-primary transition-all hover:shadow-2xl"
              >
                <div className="aspect-[4/3] overflow-hidden bg-muted/20">
                  <img 
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold mb-3">
                      {project.category}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{project.name}</h3>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/projekti">
              <Button 
                size="lg" 
                variant="outline"
                className="font-bold px-10 py-6 text-lg rounded-xl hover:bg-primary/5 transition-all"
              >
                Pogledaj Više Projekata
              </Button>
            </Link>
            <Link to="/izgradnja#contact-form">
              <Button 
                size="lg" 
                className="text-white font-bold px-10 py-6 text-lg rounded-xl shadow-lg hover:shadow-2xl transition-all"
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
        <section className="py-12 px-4 bg-gradient-to-b from-background to-muted/10 overflow-hidden">
          <div className="container mx-auto max-w-7xl mb-8">
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Istaknuti Proizvodi
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                Najpopularnija oprema za bazene iz našeg asortimana
              </p>
              <Link to="/products">
                <Button 
                  variant="outline"
                  className="font-bold px-8 hover:bg-primary/5 transition-colors"
                >
                  Pogledajte Sve Proizvode →
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Auto-scrolling Products */}
          <div className="relative">
            <div className="flex gap-6 animate-scroll">
              {[...trendingProducts, ...trendingProducts].map((product, index) => (
                <Link
                  key={`${product.id}-${index}`}
                  to={`/product/${product.id}`}
                  className="flex-shrink-0 w-80 group"
                >
                  <div className="bg-card rounded-2xl overflow-hidden border-2 border-border hover:border-primary transition-all hover:shadow-xl">
                    <div className="aspect-square bg-muted/10 overflow-hidden">
                      <img 
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-3">
                        {product.category}
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-black text-primary">
                          €{product.price.toFixed(2)}
                        </span>
                        <span className="text-sm font-bold text-primary group-hover:translate-x-1 transition-transform">
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
