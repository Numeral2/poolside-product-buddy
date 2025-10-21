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
              alt="CoolPool Hrvatska" 
              className="h-24 w-auto mx-auto mb-8 object-contain"
            />
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
              Dobrodošli u CoolPool Hrvatska
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
              Lidera u izgradnji bazena, sauna i wellness rješenja po mjeri
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Naša Misija
                </h2>
                <div className="space-y-4 text-lg text-foreground/90 leading-relaxed">
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

        {/* AI Pools Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-muted/30 to-muted/50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                AI Bazeni – Prvi u Hrvatskoj 🤖
              </h2>
              <div className="max-w-4xl mx-auto space-y-4 text-lg text-foreground/90 leading-relaxed">
                <p>
                  Ponosno predstavljamo <strong>prvi hrvatski AI sustav za planiranje i opremanje bazena.</strong>
                </p>
                <p>
                  Naš pametni asistent omogućuje vam da unesete dimenzije bazena, željeni pH, tip pročišćavanja i pumpanja, a AI odmah preporuči najbolje proizvode i opremu prema vašim potrebama.
                </p>
                <p className="font-semibold">
                  Sve preporuke su personalizirane, brze i besplatne.
                </p>
              </div>
            </div>
            
            <div className="p-8 glass-effect border border-primary/20 rounded-lg max-w-3xl mx-auto text-center">
              <div className="text-4xl mb-4">💬</div>
              <p className="text-xl font-semibold mb-2">
                Pitajte naš AI bilo što o bazenima, saunama, opremi i održavanju
              </p>
              <p className="text-foreground/80">
                Dostupno 24/7, potpuno besplatno
              </p>
            </div>
          </div>
        </section>

        {/* Webshop Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Webshop – Sve za Vaš Bazen na Jednom Mjestu 🛒
            </h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-foreground/90 leading-relaxed mb-8 text-center">
                Na našem webshopu pronađite širok izbor:
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 glass-effect border border-primary/20 rounded-lg text-center">
                  <div className="text-3xl mb-4">💧</div>
                  <h3 className="font-bold mb-2">Oprema za bazene</h3>
                  <p className="text-sm text-foreground/80">
                    Pumpe, filteri, rasvjeta, kemikalije
                  </p>
                </div>
                <div className="p-6 glass-effect border border-primary/20 rounded-lg text-center">
                  <div className="text-3xl mb-4">🧖</div>
                  <h3 className="font-bold mb-2">Saune i wellness</h3>
                  <p className="text-sm text-foreground/80">
                    Kompletan asortiman za vaš wellness
                  </p>
                </div>
                <div className="p-6 glass-effect border border-primary/20 rounded-lg text-center">
                  <div className="text-3xl mb-4">⚡</div>
                  <h3 className="font-bold mb-2">Automatika</h3>
                  <p className="text-sm text-foreground/80">
                    Automatsko održavanje i ušteda energije
                  </p>
                </div>
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
