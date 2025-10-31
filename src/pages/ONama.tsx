import Navigation from "@/components/Navigation";
import ProductCatalog from "@/components/ProductCatalog";
import ModernChatBot from "@/components/ModernChatBot";
import { Button } from "@/components/ui/button";
import { Sparkles, MessageCircle, ShoppingBag, Droplets, Waves, Zap, Target, Award, Handshake, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import coolpoolLogo from "@/assets/coolpool-logo.png";
import astralPoolLogo from "@/assets/astralpool-logo.png";
import pool1 from "@/assets/pool-1.png";
import pool2 from "@/assets/pool-2.png";
import pool3 from "@/assets/pool-3.png";

const ONama = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="hidden md:block">
        <ProductCatalog />
      </div>
      
      <div className="md:ml-72 pt-20 md:pt-24">
        {/* Hero Section */}
        <section className="relative py-4 md:py-6 px-4 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container mx-auto max-w-6xl text-center">
            <img 
              src={coolpoolLogo} 
              alt="CoolPool Hrvatska" 
              loading="eager"
              className="h-20 w-auto mx-auto mb-6 object-contain"
            />
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
              Dobrodošli u CoolPool Hrvatska
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
              Lidera u izgradnji bazena, sauna i wellness rješenja po mjeri
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-4 md:py-6 px-4">
          <div className="container mx-auto max-w-6xl">
              <div className="grid md:grid-cols-2 lg:gap-6 gap-4 items-center">
              <div>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4">
                  Naša Misija
                </h2>
                <div className="space-y-2 md:space-y-3 text-sm md:text-base text-foreground/90 leading-relaxed">
                  <p>
                    <strong>Svaki kupac je na prvom mjestu.</strong> Gradimo bazene po vašim željama, mjerama i viziji, koristeći najnovije tehnologije i kvalitetne materijale koji garantiraju dugotrajnost i eleganciju.
                  </p>
                  <p>
                    CoolPool spaja stručnost, preciznost i moderni dizajn. Naši stručnjaci prate svaki korak – od ideje do završne kapljice vode.
                  </p>
                  <p>
                    Nudimo kompletna rješenja za privatne i javne bazene, uključujući filtraciju, pročišćavanje vode, rasvjetu, grijanje i automatizaciju.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 md:gap-3">
                <img 
                  src={pool1} 
                  alt="Pool project 1" 
                  loading="lazy"
                  className="rounded-lg shadow-lg w-full h-32 md:h-40 object-cover"
                />
                <img 
                  src={pool2} 
                  alt="Pool project 2" 
                  loading="lazy"
                  className="rounded-lg shadow-lg w-full h-32 md:h-40 object-cover md:mt-6"
                />
                <img 
                  src={pool3} 
                  alt="Pool project 3" 
                  loading="lazy"
                  className="rounded-lg shadow-lg w-full h-32 md:h-40 object-cover col-span-2"
                />
              </div>
            </div>
          </div>
        </section>

        {/* AI Pools Section */}
        <section className="py-4 md:py-6 px-4 bg-gradient-to-b from-muted/30 to-muted/50">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center justify-center gap-2 md:gap-3 mb-4 md:mb-6">
              <Sparkles className="w-6 md:w-8 h-6 md:h-8 text-primary" />
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">
                Ai za bazene - prvi u Hrvatskoj
              </h2>
            </div>
            
            <div className="max-w-4xl mx-auto space-y-2 md:space-y-3 text-sm md:text-base text-foreground/90 leading-relaxed mb-4 md:mb-6">
              <p className="text-center">
                Ponosno predstavljamo <strong>prvi hrvatski AI sustav za planiranje i opremanje bazena.</strong>
              </p>
              <p className="text-center">
                Naš pametni asistent omogućuje vam da unesete dimenzije bazena, željeni pH, tip pročišćavanja i pumpanja, a AI odmah preporuči najbolje proizvode i opremu prema vašim potrebama.
              </p>
              <p className="text-center font-semibold">
                Sve preporuke su personalizirane, brze i besplatne.
              </p>
            </div>
            
            <div 
              className="p-6 glass-effect border border-primary/20 rounded-lg max-w-3xl mx-auto cursor-pointer hover:border-primary/40 transition-all hover:scale-[1.02] duration-200"
              onClick={() => {
                const chatbot = document.querySelector('[data-chatbot]');
                if (chatbot instanceof HTMLElement) chatbot.click();
              }}
            >
              <div className="flex items-center justify-center gap-3 mb-3">
                <MessageCircle className="w-7 h-7 text-primary" />
                <p className="text-lg font-semibold">
                  Pitajte naš AI bilo što o bazenima, saunama, opremi i održavanju
                </p>
              </div>
              <p className="text-center text-foreground/80 text-sm">
                Dostupno 24/7, potpuno besplatno
              </p>
            </div>
          </div>
        </section>

        {/* Webshop Section */}
        <section className="py-6 md:py-8 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center justify-center gap-3 mb-4 md:mb-6">
              <ShoppingBag className="w-8 h-8 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold">
                Webshop – Sve za Vaš Bazen
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
              <div className="p-5 glass-effect border border-primary/20 rounded-lg hover:border-primary/40 transition-all hover:scale-105 duration-200">
                <div className="flex justify-center mb-3">
                  <div className="p-2.5 rounded-full bg-primary/10">
                    <Droplets className="w-7 h-7 text-primary" />
                  </div>
                </div>
                <h3 className="font-bold text-center mb-1.5 text-base">Oprema za bazene</h3>
                <p className="text-sm text-foreground/80 text-center">
                  Pumpe, filteri, rasvjeta, kemikalije
                </p>
              </div>
              <div className="p-5 glass-effect border border-primary/20 rounded-lg hover:border-primary/40 transition-all hover:scale-105 duration-200">
                <div className="flex justify-center mb-3">
                  <div className="p-2.5 rounded-full bg-primary/10">
                    <Waves className="w-7 h-7 text-primary" />
                  </div>
                </div>
                <h3 className="font-bold text-center mb-1.5 text-base">Saune i wellness</h3>
                <p className="text-sm text-foreground/80 text-center">
                  Kompletan asortiman za wellness
                </p>
              </div>
              <div className="p-5 glass-effect border border-primary/20 rounded-lg hover:border-primary/40 transition-all hover:scale-105 duration-200">
                <div className="flex justify-center mb-3">
                  <div className="p-2.5 rounded-full bg-primary/10">
                    <Zap className="w-7 h-7 text-primary" />
                  </div>
                </div>
                <h3 className="font-bold text-center mb-1.5 text-base">Automatika</h3>
                <p className="text-sm text-foreground/80 text-center">
                  Automatsko održavanje i ušteda
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-4 md:py-6 px-4 bg-gradient-to-b from-muted/30 to-muted/50">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-5">
                <div 
                  className="text-4xl md:text-5xl font-bold mb-2"
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
              <div className="p-5">
                <div 
                  className="text-4xl md:text-5xl font-bold mb-2"
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
              <div className="p-5">
                <div 
                  className="text-4xl md:text-5xl font-bold mb-2"
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
          </div>
        </section>

        {/* Partnership Section */}
        <section className="py-6 md:py-8 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
              Naše Partnerstvo
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6">
              <img src={coolpoolLogo} alt="CoolPool" loading="lazy" className="h-16 w-auto object-contain" />
              <span className="text-2xl font-light text-foreground/60">+</span>
              <img src={astralPoolLogo} alt="AstralPool" loading="lazy" className="h-14 w-auto object-contain" />
            </div>
            <p className="text-base text-foreground/90 leading-relaxed max-w-2xl mx-auto">
              Kao službeni partner AstralPool Fluidra Group, jednog od vodećih svjetskih proizvođača opreme za bazene, 
              garantiramo vrhunsku kvalitetu i najnovije tehnološke inovacije za vaš bazen.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-6 md:py-8 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 md:mb-6">
              Naše Vrijednosti
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-5 glass-effect border border-primary/20 rounded-lg hover:border-primary/40 transition-all hover:scale-105 duration-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-full bg-primary/10">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold">Kvaliteta</h3>
                </div>
                <p className="text-sm text-foreground/80">
                  Koristimo samo najbolje materijale i opremu od renomiranih proizvođača
                </p>
              </div>
              <div className="p-5 glass-effect border border-primary/20 rounded-lg hover:border-primary/40 transition-all hover:scale-105 duration-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-full bg-primary/10">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold">Profesionalnost</h3>
                </div>
                <p className="text-sm text-foreground/80">
                  Naš tim stručnjaka osigurava vrhunsku izvedbu svakog projekta
                </p>
              </div>
              <div className="p-5 glass-effect border border-primary/20 rounded-lg hover:border-primary/40 transition-all hover:scale-105 duration-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-full bg-primary/10">
                    <Handshake className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold">Pouzdanost</h3>
                </div>
                <p className="text-sm text-foreground/80">
                  Uz nas ste sigurni - od projektiranja do održavanja
                </p>
              </div>
              <div className="p-5 glass-effect border border-primary/20 rounded-lg hover:border-primary/40 transition-all hover:scale-105 duration-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-full bg-primary/10">
                    <Lightbulb className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold">Inovativnost</h3>
                </div>
                <p className="text-sm text-foreground/80">
                  Pratimo najnovije trendove i tehnologije u industriji bazena
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-6 md:py-8 px-4">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Kontaktirajte Nas
            </h2>
            <p className="text-base text-foreground/80 mb-6">
              Javite nam se i započnite put do vašeg savršenog bazena
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/izgradnja#contact-form">
                <Button 
                  size="lg"
                  className="text-white font-bold shadow-md hover:shadow-lg transition-all duration-300 text-base px-6"
                  style={{ background: "var(--gradient-water)" }}
                >
                  Kontaktirajte Nas
                </Button>
              </Link>
              <a href="tel:+385956633214">
                <Button 
                  size="lg"
                  variant="outline"
                  className="font-bold text-base px-6"
                >
                  +385 (0) 95 66 33 214
                </Button>
              </a>
            </div>
          </div>
        </section>
      </div>
      <ModernChatBot onOpenCatalog={() => {}} />
    </div>
  );
};

export default ONama;
