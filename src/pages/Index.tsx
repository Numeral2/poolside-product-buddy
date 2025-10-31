import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ModernChatBot from "@/components/ModernChatBot";
import ProductCatalog from "@/components/ProductCatalog";
import { Sparkles, ShoppingCart, Facebook, Instagram, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import coolpoolLogo from "@/assets/coolpool-logo.png";

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

const manufacturers = [
  "AstralPool",
  "Behncke",
  "Chemoform AG",
  "Hugo Lahme",
  "Idegis",
  "IML",
  "MTS Produkte",
  "Peraqua",
  "Praher",
  "Saci Pumps",
  "Seamaid",
  "Speck Pumps",
  "Zodiac",
];

const Index = () => {
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
        <Hero />
      
      {/* Scrolling Categories Section */}
      <div className="relative overflow-hidden py-3 -mt-20 z-20 glass-effect">
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
      
      {/* Main Content Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-background via-background to-muted/5">
        <div className="container mx-auto max-w-5xl">
          {/* Main Headline */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Otkrijte najmoderniju <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">AI online trgovinu</span> za bazene
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-2">
              Mjesto gdje tehnologija i kvaliteta rade za vas.
            </p>
            <p className="text-sm md:text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Pronađite sve proizvode za održavanje i opremanje bazena:<br/>
              <span className="font-semibold">kemikalije, robote za čišćenje, pumpe, filtere, mozaike, rasvjetu i mnogo više...</span>
            </p>
          </div>
          
          {/* AI Highlight */}
          <div className="text-center mb-12 p-6 rounded-2xl bg-gradient-to-br from-secondary/10 to-primary/5 border border-secondary/20">
            <p className="text-lg md:text-xl font-semibold text-foreground">
              Naš <span className="text-secondary font-bold">AI asistent</span> u manje od <span className="text-primary font-bold">5 sekundi</span> preporučuje proizvode koji najbolje odgovaraju vašem bazenu — bez gubljenja vremena i s maksimalnom preciznošću.
            </p>
          </div>
          
          {/* CTA Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {/* Web Shop CTA */}
            <Link to="/products">
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 p-8 border border-primary/30 hover:border-primary hover:shadow-2xl transition-all cursor-pointer h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex flex-col h-full">
                  <ShoppingCart className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-primary transition-colors">Web Shop</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed flex-grow">
                    Pregledajte naš kompletan asortiman premium opreme za bazene
                  </p>
                  <span className="inline-flex items-center text-lg font-bold text-primary group-hover:translate-x-2 transition-transform">
                    Otvori trgovinu →
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
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-secondary/10 to-secondary/5 p-8 border border-secondary/30 hover:border-secondary hover:shadow-2xl transition-all cursor-pointer h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative flex flex-col h-full">
                <Sparkles className="h-12 w-12 text-secondary mb-4" />
                <h3 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-secondary transition-colors">AI Asistent</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed flex-grow">
                  Brze i precizne preporuke proizvoda za vaš bazen u sekundama
                </p>
                <span className="inline-flex items-center text-lg font-bold text-secondary group-hover:translate-x-2 transition-transform">
                  Razgovarajte s AI →
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Manufacturers Section */}
      <section className="py-12 px-4 bg-muted/20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Proizvođači
            </h2>
            <p className="text-muted-foreground">
              Radimo s vodećim svjetskim brendovima
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {manufacturers.map((manufacturer, index) => (
              <div 
                key={index}
                className="bg-card p-4 rounded-lg border border-border hover:border-primary transition-all hover:shadow-md text-center"
              >
                <p className="font-semibold text-sm text-foreground">{manufacturer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
