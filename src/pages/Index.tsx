import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ModernChatBot from "@/components/ModernChatBot";
import ProductCatalog from "@/components/ProductCatalog";
import { Sparkles, ShoppingCart, Facebook, Instagram, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import coolpoolLogo from "@/assets/coolpool-logo.png";
import astralpool from "@/assets/astralpool-logo.png";
import productRobot from "@/assets/product-robot.png";
import productMozaik from "@/assets/product-mozaik.png";
import productKemikalija from "@/assets/product-kemikalija.png";
import { cn } from "@/lib/utils";

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
  const [catalogOpen, setCatalogOpen] = useState(true);

  const openCatalog = (category?: string) => {
    setSelectedCategory(category);
    setCatalogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="hidden md:block">
        <ProductCatalog openCategory={selectedCategory} isOpen={catalogOpen} setIsOpen={setCatalogOpen} />
      </div>
      
      {/* Main content with transition */}
      <div className={cn(
        "transition-all duration-500",
        catalogOpen ? "md:ml-72" : "md:ml-0"
      )}>
        <Hero />
      
      
      {/* Main Content Section */}
      <section className="relative py-6 px-4 overflow-hidden">
        {/* Water Animation Background */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-primary/10 to-transparent animate-wave"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-primary/10 to-transparent animate-wave-delay"></div>
        </div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          {/* Company Brand with Underline and Logo */}
          <div className="text-center mb-6">
            <div className="inline-block">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                CoolPool d.o.o.
              </h2>
              <div className="h-1 w-full rounded-full" style={{ background: "var(--gradient-water)" }}></div>
            </div>
            <p className="text-sm text-muted-foreground mt-3 mb-4">
              Službeni partner vodećeg svjetskog proizvođača
            </p>
            <img 
              src={astralpool} 
              alt="AstralPool" 
              className="h-12 mx-auto object-contain"
            />
          </div>

          {/* Main Headline */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight">
              Otkrijte najmoderniju <span className="text-primary">AI online trgovinu</span> za bazene
            </h1>
            <p className="text-base text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Mjesto gdje tehnologija i kvaliteta rade za vas. Pronađite sve proizvode za održavanje i opremanje bazena.
            </p>
          </div>

          {/* Content Layout - Left: AI Assistant, Right: Features */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-8">
            {/* Left Side - AI Assistant */}
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-3">AI Asistent</h2>
                <div className="h-1 w-20 rounded-full mb-4" style={{ background: "var(--gradient-water)" }}></div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Naš AI asistent u manje od 5 sekundi preporučuje proizvode koji najbolje odgovaraju vašem bazenu — bez gubljenja vremena i s maksimalnom preciznošću.
                </p>
                <Button 
                  size="lg" 
                  className="w-full"
                  onClick={() => {
                    const chatbot = document.querySelector('[data-chatbot]') as HTMLButtonElement;
                    if (chatbot) chatbot.click();
                  }}
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Pokreni AI Asistenta
                </Button>
              </div>
            </div>

            {/* Right Side - Features */}
            <div className="space-y-3">
              <div className="flex gap-3 items-start">
                <div className="h-1 w-8 rounded-full mt-2 flex-shrink-0" style={{ background: "var(--gradient-water)" }}></div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Brza dostava</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Slanje istog ili idućeg dana — vaši proizvodi stižu brzo i sigurno.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="h-1 w-8 rounded-full mt-2 flex-shrink-0" style={{ background: "var(--gradient-water)" }}></div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Jednostavan povrat</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Povrat robe unutar 14 dana bez komplikacija.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="h-1 w-8 rounded-full mt-2 flex-shrink-0" style={{ background: "var(--gradient-water)" }}></div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Vrhunska kvaliteta</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Radimo s vodećim svjetskim proizvođačima opreme za bazene.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="h-1 w-8 rounded-full mt-2 flex-shrink-0" style={{ background: "var(--gradient-water)" }}></div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Stručna podrška</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Tim stručnjaka uvijek spreman pomoći s odabirom i savjetima.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Showcase */}
          <div className="grid grid-cols-3 gap-3 max-w-3xl mx-auto mb-6">
            <div className="group relative overflow-hidden rounded-lg border border-primary/20 bg-card/30 hover:border-primary/50 transition-all hover:shadow-lg">
              <img 
                src={productRobot} 
                alt="Robot za čišćenje bazena" 
                className="w-full h-32 object-contain p-2 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-2 text-center border-t border-primary/10">
                <p className="font-medium text-xs text-foreground">Roboti</p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-lg border border-primary/20 bg-card/30 hover:border-primary/50 transition-all hover:shadow-lg">
              <img 
                src={productMozaik} 
                alt="Mozaik za bazene" 
                className="w-full h-32 object-contain p-2 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-2 text-center border-t border-primary/10">
                <p className="font-medium text-xs text-foreground">Mozaik</p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-lg border border-primary/20 bg-card/30 hover:border-primary/50 transition-all hover:shadow-lg">
              <img 
                src={productKemikalija} 
                alt="Kemikalije za bazene" 
                className="w-full h-32 object-contain p-2 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-2 text-center border-t border-primary/10">
                <p className="font-medium text-xs text-foreground">Kemikalije</p>
              </div>
            </div>
          </div>
          
          {/* CTA Button */}
          <div className="flex justify-center">
            <Link to="/products">
              <Button size="lg" className="px-8">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Pregledaj Web Shop
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Manufacturers Section */}
      <section className="py-6 px-4 bg-muted/10">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-6">
            <h2 className="text-xl md:text-2xl font-bold mb-2">
              Proizvođači
            </h2>
            <p className="text-sm text-muted-foreground">
              Radimo s vodećim svjetskim brendovima
            </p>
          </div>
          
          {/* Scrolling Manufacturers */}
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll whitespace-nowrap">
              {[...manufacturers, ...manufacturers].map((manufacturer, index) => (
                <div 
                  key={index}
                  className="inline-flex items-center justify-center mx-3 px-4 py-2 bg-card/50 border border-border/50 hover:border-primary/50 transition-all text-center min-w-[120px]"
                >
                  <p className="font-medium text-xs text-foreground">{manufacturer}</p>
                </div>
              ))}
            </div>
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
