import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ModernChatBot from "@/components/ModernChatBot";
import ProductCatalog from "@/components/ProductCatalog";
import { Sparkles, ShoppingCart, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";

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

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="hidden md:block">
        <ProductCatalog openCategory={selectedCategory} />
      </div>
      
      {/* Main content with left margin for sidebar */}
      <div className="md:ml-72">
        <Hero onVideoEnd={() => {}} />
        
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
        
        {/* Main Hero Content Section with Water Animation */}
        <section className="relative py-20 px-4 bg-gradient-to-b from-background via-primary/5 to-background overflow-hidden">
          {/* Animated Water Waves Background */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 animate-wave" style={{
              background: 'radial-gradient(ellipse at center, hsl(var(--primary) / 0.3) 0%, transparent 70%)',
              animation: 'wave 8s ease-in-out infinite'
            }}></div>
            <div className="absolute inset-0 animate-wave-delay" style={{
              background: 'radial-gradient(ellipse at center, hsl(var(--secondary) / 0.2) 0%, transparent 70%)',
              animation: 'wave 8s ease-in-out infinite 2s'
            }}></div>
          </div>
          
          <div className="container mx-auto max-w-5xl relative z-10">
            {/* Main Headline with AI Focus */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 rounded-full glass-effect border border-primary/30 animate-float">
                <Sparkles className="h-6 w-6 text-primary animate-pulse" />
                <span className="text-sm font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  AI Powered Shopping Experience
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                  Otkrijte najmoderniju AI
                </span>
                <br />
                <span className="text-foreground">online trgovinu za bazene</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-4">
                Mjesto gdje tehnologija i kvaliteta rade za vas.
              </p>
              
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Pronađite sve proizvode za održavanje i opremanje bazena:
                <span className="font-semibold text-foreground"> kemikalije, robote za čišćenje, pumpe, filtere, mozaike, rasvjetu</span> i još 10 kategorija.
              </p>
            </div>
            
            {/* AI Highlight Box */}
            <div className="max-w-2xl mx-auto mb-12 p-8 rounded-2xl glass-effect border-2 border-primary/30 relative overflow-hidden group hover:border-primary/50 transition-all">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary mb-4 animate-glow-pulse">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-foreground">Naš AI asistent</h3>
                <p className="text-lg text-muted-foreground mb-4">
                  U manje od <span className="font-bold text-primary">5 sekundi</span> preporučuje proizvode koji najbolje odgovaraju vašem bazenu
                </p>
                <p className="text-sm text-muted-foreground italic">
                  Bez gubljenja vremena i s maksimalnom preciznošću
                </p>
              </div>
            </div>
            
            {/* CTA Cards - AI and Web Shop Focus */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* AI Assistant CTA - PRIMARY FOCUS */}
              <div 
                onClick={() => {
                  const chatbot = document.querySelector('[data-chatbot]') as HTMLButtonElement;
                  if (chatbot) chatbot.click();
                }}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent p-8 border-2 border-primary hover:border-primary hover:shadow-2xl transition-all cursor-pointer transform hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-all"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-primary/20 group-hover:bg-primary/30 transition-colors">
                      <Sparkles className="h-8 w-8 text-primary" />
                    </div>
                    <div className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold">
                      SMART
                    </div>
                  </div>
                  
                  <h3 className="text-3xl font-black mb-3 group-hover:text-primary transition-colors">
                    AI Asistent
                  </h3>
                  <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                    Brza AI preporuka proizvoda prilagođena vašem bazenu u samo 5 sekundi
                  </p>
                  <Button 
                    className="w-full font-bold text-lg group-hover:shadow-xl transition-all"
                    size="lg"
                    style={{ background: "var(--gradient-water)" }}
                  >
                    Razgovarajte s AI →
                  </Button>
                </div>
              </div>
              
              {/* Web Shop CTA */}
              <Link to="/products">
                <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-secondary/20 via-secondary/10 to-transparent p-8 border-2 border-secondary/50 hover:border-secondary hover:shadow-2xl transition-all cursor-pointer transform hover:scale-105 h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-full blur-3xl group-hover:bg-secondary/30 transition-all"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 rounded-xl bg-secondary/20 group-hover:bg-secondary/30 transition-colors">
                        <ShoppingCart className="h-8 w-8 text-secondary" />
                      </div>
                      <div className="px-3 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-bold">
                        PREMIUM
                      </div>
                    </div>
                    
                    <h3 className="text-3xl font-black mb-3 group-hover:text-secondary transition-colors">
                      Web Shop
                    </h3>
                    <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                      Pregledajte kompletnu ponudu premium opreme za bazene
                    </p>
                    <Button 
                      variant="outline"
                      className="w-full font-bold text-lg border-2 border-secondary/50 hover:bg-secondary/10 group-hover:shadow-xl transition-all"
                      size="lg"
                    >
                      Pregledajte Proizvode →
                    </Button>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="py-8 px-4 border-t border-border bg-muted/20">
          <div className="container mx-auto text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
              <Waves className="h-4 w-4 text-primary" />
              <span>© 2024 Bazeni Plus. Sva prava pridržana.</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Profesionalna oprema i AI asistent za vaš bazen
            </p>
          </div>
        </footer>
      </div>
      
      <ModernChatBot onOpenCatalog={setSelectedCategory} />
    </div>
  );
};

export default Index;
