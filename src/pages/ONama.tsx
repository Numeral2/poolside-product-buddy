import Navigation from "@/components/Navigation";
import ProductCatalog from "@/components/ProductCatalog";
import { Button } from "@/components/ui/button";
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
      
      <div className="md:ml-72 pt-20">
        {/* Hero Section */}
        <section className="relative py-16 px-4 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container mx-auto max-w-6xl text-center">
            <img 
              src={coolpoolLogo} 
              alt="CoolPool" 
              className="h-24 w-auto mx-auto mb-8 object-contain"
            />
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
              O Nama
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
              Vaš partner za bazene od 2006. godine
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  18+ Godina Iskustva
                </h2>
                <div className="space-y-4 text-lg text-foreground/90 leading-relaxed">
                  <p>
                    COOL POOL d.o.o. je vodeća tvrtka u Dalmaciji specijalizirana za izgradnju i opremanje bazena. Od 2006. godine pružamo vrhunske usluge našim klijentima, gradeći povjerenje kvalitetom i predanošću.
                  </p>
                  <p>
                    Kao glavni partner <strong>AstralPool Fluidra Group</strong> za regiju Dalmacije, nudimo najkvalitetniju opremu na tržištu uz stručnu podršku i servis.
                  </p>
                  <p>
                    Naš tim čine iskusni stručnjaci koji su realizirali preko <strong>1000 projekata</strong>, od malih obiteljskih bazena do velikih luksuznih kompleksa.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src={pool1} 
                  alt="Pool project 1" 
                  className="rounded-lg shadow-lg w-full h-48 object-cover"
                />
                <img 
                  src={pool2} 
                  alt="Pool project 2" 
                  className="rounded-lg shadow-lg w-full h-48 object-cover mt-8"
                />
                <img 
                  src={pool3} 
                  alt="Pool project 3" 
                  className="rounded-lg shadow-lg w-full h-48 object-cover col-span-2"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-muted/30 to-muted/50">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-8">
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
                <p className="text-xl font-semibold">Godina Iskustva</p>
              </div>
              <div className="p-8">
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
                <p className="text-xl font-semibold">Izgrađenih Bazena</p>
              </div>
              <div className="p-8">
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
                <p className="text-xl font-semibold">Zadovoljnih Klijenata</p>
              </div>
            </div>
          </div>
        </section>

        {/* Partnership Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Naše Partnerstvo
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
              <img src={coolpoolLogo} alt="CoolPool" className="h-20 w-auto object-contain" />
              <span className="text-3xl font-light text-foreground/60">+</span>
              <img src={astralPoolLogo} alt="AstralPool" className="h-16 w-auto object-contain" />
            </div>
            <p className="text-lg text-foreground/90 leading-relaxed max-w-2xl mx-auto">
              Kao službeni partner AstralPool Fluidra Group, jednog od vodećih svjetskih proizvođača opreme za bazene, 
              garantiramo vrhunsku kvalitetu i najnovije tehnološke inovacije za vaš bazen.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Naše Vrijednosti
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 glass-effect border border-primary/20">
                <div className="text-3xl mb-4">🎯</div>
                <h3 className="text-xl font-bold mb-3">Kvaliteta</h3>
                <p className="text-foreground/80">
                  Koristimo samo najbolje materijale i opremu od renomiranih proizvođača
                </p>
              </div>
              <div className="p-6 glass-effect border border-primary/20">
                <div className="text-3xl mb-4">💎</div>
                <h3 className="text-xl font-bold mb-3">Profesionalnost</h3>
                <p className="text-foreground/80">
                  Naš tim stručnjaka osigurava vrhunsku izvedbu svakog projekta
                </p>
              </div>
              <div className="p-6 glass-effect border border-primary/20">
                <div className="text-3xl mb-4">🤝</div>
                <h3 className="text-xl font-bold mb-3">Pouzdanost</h3>
                <p className="text-foreground/80">
                  Uz nas ste sigurni - od projektiranja do održavanja
                </p>
              </div>
              <div className="p-6 glass-effect border border-primary/20">
                <div className="text-3xl mb-4">⚡</div>
                <h3 className="text-xl font-bold mb-3">Inovativnost</h3>
                <p className="text-foreground/80">
                  Pratimo najnovije trendove i tehnologije u industriji bazena
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Kontaktirajte Nas
            </h2>
            <p className="text-xl text-foreground/80 mb-8">
              Javite nam se i započnite put do vašeg savršenog bazena
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg"
                className="text-white font-bold shadow-md hover:shadow-lg transition-all duration-300 text-lg px-8"
                style={{ background: "var(--gradient-water)" }}
                onClick={() => {
                  const chatbot = document.querySelector('[data-chatbot]');
                  if (chatbot instanceof HTMLElement) chatbot.click();
                }}
              >
                AI Asistent
              </Button>
              <a href="tel:+385956633214">
                <Button 
                  size="lg"
                  variant="outline"
                  className="font-bold text-lg px-8"
                >
                  +385 (0) 95 66 33 214
                </Button>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ONama;
