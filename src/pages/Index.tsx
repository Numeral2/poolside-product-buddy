import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ModernChatBot from "@/components/ModernChatBot";
import ProductCarousel from "@/components/ProductCarousel";
import { Sparkles, ShoppingCart, Facebook, Instagram, MessageCircle, Shield, Truck, HeadphonesIcon, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  const openCatalog = () => {};

  return (
    <div className="min-h-screen bg-background relative">
      <Navigation />
      
      {/* Main content - centered */}
      <div className="w-full">
        <Hero onVideoEnd={() => {}} onOpenCatalog={() => {}} catalogOpen={false} />
      
      
      {/* Main Content Section */}
      <section className="relative py-8 md:py-12 px-4 overflow-hidden">
        {/* Water Animation Background */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-primary/10 to-transparent animate-wave"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-primary/10 to-transparent animate-wave-delay"></div>
        </div>
        
        <div className="container mx-auto max-w-7xl relative z-10">
          {/* Main Headline */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Vaš pouzdani partner za <span className="text-primary">bazene i wellness</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Više od 20 godina iskustva u projektiranju, izgradnji i održavanju bazena. 
              Pružamo kompletna rješenja s vodećim svjetskim brendovima.
            </p>
          </div>

          {/* Key Benefits Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Truck className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Brza Dostava</h3>
                <p className="text-sm text-muted-foreground">
                  Isporuka istog ili sljedećeg radnog dana za sve dostupne proizvode
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Garancija Kvalitete</h3>
                <p className="text-sm text-muted-foreground">
                  Svi proizvodi imaju službenu garanciju proizvođača i certifikate
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <HeadphonesIcon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Stručna Podrška</h3>
                <p className="text-sm text-muted-foreground">
                  Naš tim stručnjaka dostupan je za savjete i tehničku podršku
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">20+ Godina Iskustva</h3>
                <p className="text-sm text-muted-foreground">
                  Realizirali smo stotine projekata od privatnih do hotelskih bazena
                </p>
              </CardContent>
            </Card>
          </div>

          {/* AI Assistant Section */}
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 md:p-12 mb-12 text-center border border-primary/20">
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-6">
                <Sparkles className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">AI Asistent za Vaš Bazen</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Naš AI asistent u manje od 5 sekundi preporučuje proizvode koji najbolje odgovaraju vašem bazenu. 
                Postavite pitanje o održavanju, kemiji vode, opremi ili bilo čemu drugom — odgovor dolazi odmah!
              </p>
              <Button 
                size="lg" 
                className="text-lg px-8"
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

          {/* Services Section */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Naše Usluge</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Nudimo kompletna rješenja za vaš bazen - od projektiranja do redovnog održavanja
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-primary/20">
                <CardContent className="pt-6">
                  <h3 className="font-bold text-xl mb-3">Projektiranje i Izgradnja</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Dizajniramo i gradimo bazene prema vašim željama - od malih privatnih do velikih hotelskih kompleksa.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• 3D vizualizacija projekta</li>
                    <li>• Profesionalna ugradnja</li>
                    <li>• Turnkey rješenja</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardContent className="pt-6">
                  <h3 className="font-bold text-xl mb-3">Oprema i Pribor</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Najveći izbor opreme za bazene - filtri, pumpe, rasvjeta, kemikalije i sav potreban pribor.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Vodećih svjetski brendovi</li>
                    <li>• Garancija i servis</li>
                    <li>• Stručno savjetovanje</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardContent className="pt-6">
                  <h3 className="font-bold text-xl mb-3">Održavanje i Servis</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Redovno održavanje, popravci, zimski servis i sve što vaš bazen treba za dugotrajnost.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Analiza kvalitete vode</li>
                    <li>• Servisni ugovori</li>
                    <li>• Hitne intervencije</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Product Showcase */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Naši Proizvodi</h2>
              <p className="text-muted-foreground">
                Pregledajte našu ponudu proizvoda po kategorijama
              </p>
            </div>
            <ProductCarousel />
          </div>
          
          {/* CTA Button */}
          <div className="flex justify-center">
            <Link to="/products">
              <Button 
                size="lg" 
                className="text-lg px-10"
              >
                <ShoppingCart className="mr-2 h-6 w-6" />
                Pogledajte Sve Proizvode
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Manufacturers Section */}
      <section className="py-3 md:py-4 px-4 bg-muted/10">
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
