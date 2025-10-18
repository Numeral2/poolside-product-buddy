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
      <div className="relative overflow-hidden py-6 -mt-20 z-20 glass-effect">
        <div className="flex animate-scroll whitespace-nowrap">
          {[...categories, ...categories].map((category, index) => (
            <Link
              key={index}
              to={`/products?category=${category}`}
              className="inline-flex items-center px-6 py-3 mx-2 glass-effect text-foreground text-sm font-bold shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-primary/20 hover:border-primary group"
            >
              <span className="group-hover:text-primary transition-colors">{category}</span>
            </Link>
          ))}
        </div>
      </div>
      
      {/* AI Search Section */}
      <section className="py-8 px-4 bg-gradient-to-b from-transparent to-muted/30">
        <div className="container mx-auto max-w-3xl text-center">
          <p className="text-lg md:text-xl text-foreground/90 mb-4">
            Ponude, cijene i kalkulacije za bazene — uz pomoć AI-a!<br />
            Pronađite sve informacije o bazenima jednostavno i brzo.
          </p>
          <button
            onClick={() => {
              const chatbot = document.querySelector('[data-chatbot]');
              if (chatbot instanceof HTMLElement) chatbot.click();
            }}
            className="px-8 py-3 rounded-full font-semibold text-base text-white shadow-md hover:scale-105 transition-all duration-300 inline-flex items-center gap-2 group bg-primary/90 hover:bg-primary"
          >
            <Search className="h-5 w-5 group-hover:scale-110 transition-transform" />
            AI Tražilica
          </button>
        </div>
      </section>
      
      {/* Partner Section */}
      <section className="py-12 px-4 bg-gradient-to-b from-transparent via-muted/30 to-muted/50">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
            <img src={coolpoolLogo} alt="CoolPool" className="h-20 w-auto object-contain" />
            <span className="text-3xl font-light text-foreground/60">+</span>
            <img src={astralPoolLogo} alt="AstralPool" className="h-16 w-auto object-contain" />
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              18+ godina s Vama i 1000+ izgrađenih bazena.
            </h2>
            <p className="text-lg text-foreground/90 leading-relaxed">
              Nudimo izgradnju bazena te proizvode za opremanje bazena.
            </p>
            <p className="text-lg text-foreground/90 leading-relaxed">
              Od 2006. godine specijalizirani smo za izgradnju i opremanje bazena. Kao glavni partner AstralPool Fluidra Group u Dalmaciji, nudimo vrhunsku opremu, profesionalnu ugradnju i potpunu tehničku podršku.
            </p>
            <p className="text-lg text-foreground/90 leading-relaxed">
              Uz nas dobivate kvalitetu, pouzdan servis i dugotrajan užitak u savršeno funkcionalnom bazenu.
            </p>
            <div className="flex gap-4 justify-center mt-6 flex-wrap">
            <button
              onClick={() => openCatalog("Bazeni")}
              className="relative overflow-hidden px-8 py-3 font-semibold text-white shadow-md hover:shadow-lg transition-all hover:scale-105 group min-w-[200px] h-[120px] flex items-center justify-center"
              style={{ background: "var(--gradient-water)" }}
            >
              <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
                <img src={pool1} alt="" className="w-full h-full object-cover" />
              </div>
              <span className="relative z-10 text-xl">Izgradnja</span>
            </button>
            <button
              onClick={() => openCatalog("Filteri")}
              className="relative overflow-hidden px-8 py-3 font-semibold text-white shadow-md hover:shadow-lg transition-all hover:scale-105 group min-w-[200px] h-[120px] flex items-center justify-center"
              style={{ background: "var(--gradient-water-deep)" }}
            >
              <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
                <img src={filter1} alt="" className="w-full h-full object-cover" />
              </div>
              <span className="relative z-10 text-xl">Oprema</span>
            </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Projects Section - Carousel */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8">
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
