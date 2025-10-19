import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ModernChatBot from "@/components/ModernChatBot";
import ProductCard from "@/components/ProductCard";
import ProductCatalog from "@/components/ProductCatalog";
import astralPoolLogo from "@/assets/astralpool-logo.png";
import coolpoolLogo from "@/assets/coolpool-logo.png";
import pool1 from "@/assets/pool-1.png";
import pool2 from "@/assets/pool-2.png";
import pool3 from "@/assets/pool-3.png";
import pool4 from "@/assets/pool-4.png";
import pool5 from "@/assets/pool-5.png";
import pool6 from "@/assets/pool-6.png";
import filter1 from "@/assets/filter-1.png";
import { Sparkles, Tag, Facebook, Instagram, MessageCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
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
      <div className="relative overflow-hidden py-4 -mt-16 z-20 glass-effect">
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
      
      {/* Stats Section with Partners */}
      <section className="py-12 px-4 bg-gradient-to-b from-muted/30 to-muted/50">
        <div className="container mx-auto max-w-5xl">
          {/* Partner Logos */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
            <img src={coolpoolLogo} alt="CoolPool" className="h-16 w-auto object-contain" />
            <span className="text-2xl font-light text-foreground/60">+</span>
            <img src={astralPoolLogo} alt="AstralPool" className="h-14 w-auto object-contain" />
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-6">
              <div 
                className="text-5xl font-bold mb-3"
                style={{ 
                  background: "var(--gradient-water)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                }}
              >
                18+
              </div>
              <p className="text-lg font-semibold">Godina Iskustva</p>
            </div>
            <div className="text-center p-6">
              <div 
                className="text-5xl font-bold mb-3"
                style={{ 
                  background: "var(--gradient-water)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                }}
              >
                1000+
              </div>
              <p className="text-lg font-semibold">Izgrađenih Bazena</p>
            </div>
            <div className="text-center p-6">
              <div 
                className="text-5xl font-bold mb-3"
                style={{ 
                  background: "var(--gradient-water)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                }}
              >
                100%
              </div>
              <p className="text-lg font-semibold">Zadovoljnih Klijenata</p>
            </div>
          </div>
          
          {/* Description */}
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-8">
            <p className="text-lg text-foreground/90 leading-relaxed font-medium">
              Nudimo izgradnju bazena te proizvode za opremanje bazena.
            </p>
            <p className="text-base text-foreground/80 leading-relaxed">
              Od 2006. godine specijalizirani smo za izgradnju i opremanje bazena. Kao glavni partner AstralPool Fluidra Group u Dalmaciji, nudimo vrhunsku opremu, profesionalnu ugradnju i potpunu tehničku podršku.
            </p>
            <p className="text-base text-foreground/80 leading-relaxed">
              Uz nas dobivate kvalitetu, pouzdan servis i dugotrajan užitak u savršeno funkcionalnom bazenu.
            </p>
          </div>
          
          {/* CTA Cards */}
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/izgradnja">
              <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 group w-[240px] h-[180px] cursor-pointer">
                <img 
                  src={pool1} 
                  alt="Izgradnja bazena" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div 
                  className="absolute inset-0 opacity-70 group-hover:opacity-60 transition-opacity"
                  style={{ background: "var(--gradient-water)" }}
                />
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-white p-4">
                  <span className="text-2xl mb-2">🏗️</span>
                  <span className="text-xl font-bold">Izgradnja</span>
                  <span className="text-xs mt-1 opacity-90">Saznajte više</span>
                </div>
              </div>
            </Link>
            
            <button
              onClick={() => openCatalog("Filteri")}
              className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 group w-[240px] h-[180px]"
            >
              <img 
                src={filter1} 
                alt="Oprema za bazene" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div 
                className="absolute inset-0 opacity-70 group-hover:opacity-60 transition-opacity"
                style={{ background: "var(--gradient-water-deep)" }}
              />
              <div className="relative z-10 h-full flex flex-col items-center justify-center text-white p-4">
                <span className="text-2xl mb-2">⚙️</span>
                <span className="text-xl font-bold">Oprema</span>
                <span className="text-xs mt-1 opacity-90">Pregledajte katalog</span>
              </div>
            </button>
          </div>
        </div>
      </section>
      
      {/* Featured Projects Section - Carousel */}
      <section className="py-8 bg-transparent">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">
            Naši Izdvojeni Projekti
          </h2>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent className="-ml-6">
              {featuredProjects.map((project) => (
                <CarouselItem key={project.id} className="pl-6 md:basis-1/2 lg:basis-1/3">
                  <div onClick={() => openCatalog(project.category)} className="cursor-pointer">
                    <ProductCard 
                      name={project.name}
                      description={project.description}
                      category={project.category}
                      image={project.image}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>
        <div className="text-center mt-8">
          <Link to="/products">
            <Button 
              size="lg" 
              className="text-white font-bold shadow-md hover:shadow-lg transition-all duration-300 text-lg px-8 py-6"
              style={{ background: "var(--gradient-water)" }}
            >
              Pogledajte Sve Proizvode
            </Button>
          </Link>
        </div>
      </section>
      
      {/* AI-Suggested Products Section */}
      {displayedProducts.length > 0 && (
        <section className="py-12 px-4 bg-muted/30">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-6 text-foreground">
              Products We Think You'll Love
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  category={product.category}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="relative overflow-hidden bg-gradient-to-b from-muted/50 to-muted border-t border-primary/20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Company Info and Map */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img src={coolpoolLogo} alt="CoolPool" className="h-20 w-auto object-contain" />
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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2887.8974315573835!2d16.457!3d43.513!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13355e2b4c6f8b3d%3A0x0!2sSlanice%2022%2C%2021000%2C%20Split!5e0!3m2!1sen!2shr!4v1234567890"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Cool Pool Location"
                />
              </div>
            </div>

            {/* Social Networks */}
            <div className="space-y-4">
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
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-bold text-foreground uppercase tracking-wider">
                  Radno Vrijeme
                </h3>
                <div className="h-0.5 flex-1 max-w-[60px]" style={{ background: "var(--gradient-water)" }}></div>
              </div>
              <div className="space-y-2">
                {[
                  { day: "Ponedjeljak", hours: "9:00 - 17:00" },
                  { day: "Utorak", hours: "9:00 - 17:00" },
                  { day: "Srijeda", hours: "9:00 - 17:00" },
                  { day: "Četvrtak", hours: "9:00 - 17:00" },
                  { day: "Petak", hours: "9:00 - 17:00" },
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
          <div className="border-t border-primary/20 pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                CoolPool | © {new Date().getFullYear()} | Sva prava pridržana
              </p>
              <div className="flex items-center gap-4">
                <img src={astralPoolLogo} alt="AstralPool" className="h-8 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity" />
              </div>
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
