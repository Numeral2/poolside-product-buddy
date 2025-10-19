import Navigation from "@/components/Navigation";
import ProductCatalog from "@/components/ProductCatalog";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import pool1 from "@/assets/pool-1.png";
import pool2 from "@/assets/pool-2.png";
import pool3 from "@/assets/pool-3.png";
import pool4 from "@/assets/pool-4.png";
import pool5 from "@/assets/pool-5.png";
import pool6 from "@/assets/pool-6.png";

const Izgradnja = () => {
  const poolTypes = [
    {
      id: 1,
      title: "Infinity Bazeni",
      description: "Moderan dizajn s beskrajnim rubom i panoramskim pogledom",
      image: pool1,
    },
    {
      id: 2,
      title: "Nadzemni Bazeni",
      description: "Brza montaža, ekonomično rješenje s vrhunskom kvalitetom",
      image: pool2,
    },
    {
      id: 3,
      title: "Obiteljski Bazeni",
      description: "Prostrani bazeni idealni za obitelji s djecom",
      image: pool3,
    },
    {
      id: 4,
      title: "Wellness Bazeni",
      description: "Kombinirani wellness prostori s bazenom i saunom",
      image: pool4,
    },
    {
      id: 5,
      title: "Hidromasažne Kade",
      description: "Vrhunska hidromasažna iskustva za potpuno opuštanje",
      image: pool5,
    },
    {
      id: 6,
      title: "Krovni Bazeni",
      description: "Ekskluzivna rješenja za krovne terase",
      image: pool6,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="hidden md:block">
        <ProductCatalog />
      </div>
      
      <div className="md:ml-72">
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container mx-auto max-w-6xl text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
              Izgradnja Bazena
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              18+ godina iskustva u izgradnji bazena.<br />
              Preko 1000 uspješno realiziranih projekata u Dalmaciji.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg"
                className="text-white font-bold shadow-md hover:shadow-lg transition-all duration-300"
                style={{ background: "var(--gradient-water)" }}
                onClick={() => {
                  const chatbot = document.querySelector('[data-chatbot]');
                  if (chatbot instanceof HTMLElement) chatbot.click();
                }}
              >
                Zatražite Ponudu
              </Button>
              <Link to="/products?category=Bazeni">
                <Button 
                  size="lg"
                  variant="outline"
                  className="font-bold"
                >
                  Pregledajte Proizvode
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Što Nudimo
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 glass-effect border border-primary/20">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: "var(--gradient-water)" }}>
                  <span className="text-3xl text-white">🏗️</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Projektiranje</h3>
                <p className="text-foreground/80">
                  Stručno projektiranje bazena prema vašim željama i prostoru
                </p>
              </div>
              <div className="text-center p-6 glass-effect border border-primary/20">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: "var(--gradient-water)" }}>
                  <span className="text-3xl text-white">🔧</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Izgradnja</h3>
                <p className="text-foreground/80">
                  Profesionalna izgradnja s vrhunskim materijalima i opremom
                </p>
              </div>
              <div className="text-center p-6 glass-effect border border-primary/20">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: "var(--gradient-water)" }}>
                  <span className="text-3xl text-white">🛠️</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Održavanje</h3>
                <p className="text-foreground/80">
                  Redovno servisiranje i održavanje za dugovječnost bazena
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pool Types Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Vrste Bazena
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {poolTypes.map((pool) => (
                <div 
                  key={pool.id}
                  className="group relative overflow-hidden rounded-lg border border-primary/20 hover:border-primary/50 transition-all cursor-pointer"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={pool.image} 
                      alt={pool.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 bg-card">
                    <h3 className="text-xl font-bold mb-2">{pool.title}</h3>
                    <p className="text-foreground/70">{pool.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-muted/30 to-muted/50">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Zašto Odabrati CoolPool?
            </h2>
            <div className="space-y-4 text-lg text-foreground/90 leading-relaxed">
              <p>
                ✓ <strong>18+ godina iskustva</strong> u industriji bazena
              </p>
              <p>
                ✓ <strong>1000+ izgrađenih bazena</strong> zadovoljnih klijenata
              </p>
              <p>
                ✓ <strong>Službeni AstralPool partner</strong> za Dalmaciju
              </p>
              <p>
                ✓ <strong>Vrhunska oprema</strong> svjetski poznatih brandova
              </p>
              <p>
                ✓ <strong>Stručni tim</strong> s certifikatima i referencama
              </p>
              <p>
                ✓ <strong>Potpuna podrška</strong> od projekta do održavanja
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Započnite Svoj Projekt Danas
            </h2>
            <p className="text-xl text-foreground/80 mb-8">
              Kontaktirajte nas za besplatnu konzultaciju i ponudu
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
                Kontaktirajte Nas
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

export default Izgradnja;
