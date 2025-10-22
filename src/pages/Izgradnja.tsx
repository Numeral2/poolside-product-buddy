import Navigation from "@/components/Navigation";
import ProductCatalog from "@/components/ProductCatalog";
import ModernChatBot from "@/components/ModernChatBot";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const Izgradnja = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (window.location.hash === '#contact-form') {
      setTimeout(() => {
        const element = document.getElementById('contact-form');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject) {
      toast({
        title: "Greška",
        description: "Molimo popunite sva obavezna polja",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: formData,
      });

      if (error) throw error;

      toast({
        title: "Uspješno poslano!",
        description: "Primili smo vašu poruku i odgovorit ćemo vam uskoro.",
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error: any) {
      console.error('Error sending email:', error);
      toast({
        title: "Greška",
        description: "Došlo je do greške. Molimo pokušajte ponovo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="hidden md:block">
        <ProductCatalog />
      </div>
      
      <div className="md:ml-72">
        {/* Hero Section */}
        <section className="relative py-10 md:py-12 px-4 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container mx-auto max-w-6xl text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Izgradnja Bazena
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 mb-6 max-w-3xl mx-auto leading-relaxed">
              18+ godina iskustva u izgradnji bazena.<br />
              Preko 1000 uspješno realiziranih projekata u Dalmaciji.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button 
                size="default"
                className="text-white font-bold shadow-md hover:shadow-lg transition-all duration-300"
                style={{ background: "var(--gradient-water)" }}
                onClick={() => {
                  const contactSection = document.getElementById('contact-form');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                Zatražite Ponudu
              </Button>
              <Link to="/projekti">
                <Button 
                  size="default"
                  variant="outline"
                  className="font-bold"
                >
                  Naši Projekti
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-8 md:py-10 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Što Nudimo
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-5 glass-effect border border-primary/20">
                <div className="w-14 h-14 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ background: "var(--gradient-water)" }}>
                  <span className="text-2xl text-white">🏗️</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Projektiranje</h3>
                <p className="text-sm text-foreground/80">
                  Stručno projektiranje bazena prema vašim željama i prostoru
                </p>
              </div>
              <div className="text-center p-5 glass-effect border border-primary/20">
                <div className="w-14 h-14 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ background: "var(--gradient-water)" }}>
                  <span className="text-2xl text-white">🔧</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Izgradnja</h3>
                <p className="text-sm text-foreground/80">
                  Profesionalna izgradnja s vrhunskim materijalima i opremom
                </p>
              </div>
              <div className="text-center p-5 glass-effect border border-primary/20">
                <div className="w-14 h-14 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ background: "var(--gradient-water)" }}>
                  <span className="text-2xl text-white">🛠️</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Održavanje</h3>
                <p className="text-sm text-foreground/80">
                  Redovno servisiranje i održavanje za dugovječnost bazena
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Construction Process Section */}
        <section className="py-8 md:py-10 px-4 bg-gradient-to-b from-transparent to-muted/30">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
              Proces Izgradnje Bazena
            </h2>
            <p className="text-base text-center text-foreground/80 mb-8 max-w-3xl mx-auto">
              Izgradnja bazena počinje kvalitetnim planiranjem i završava preciznom izvedbom. 
              Cijeli proces obuhvaća nekoliko ključnih faza:
            </p>
            
            <div className="space-y-4">
              {[
                {
                  number: "01",
                  title: "Planiranje i projektiranje",
                  description: "Definiraju se dimenzije, oblik i pozicija bazena te priprema tehnička dokumentacija i izbor materijala."
                },
                {
                  number: "02",
                  title: "Iskop i priprema terena",
                  description: "Provodi se iskop, izravnavanje i priprema podloge uz postavljanje drenaže i armature."
                },
                {
                  number: "03",
                  title: "Izrada konstrukcije",
                  description: "Ovisno o tipu bazena (betonski, panelni, folijski), gradi se osnovna struktura koja osigurava čvrstoću i dugotrajnost."
                },
                {
                  number: "04",
                  title: "Instalacije i hidroizolacija",
                  description: "Ugrađuju se sustavi za filtraciju, cirkulaciju, rasvjetu i grijanje, a zatim se izvodi hidroizolacija."
                },
                {
                  number: "05",
                  title: "Završni radovi",
                  description: "Postavlja se završna obloga – keramika, mozaik ili PVC folija – te se bazen puni vodom i testira."
                }
              ].map((step) => (
                <div 
                  key={step.number}
                  className="glass-effect border border-primary/20 p-5 md:p-6 rounded-lg hover:border-primary/40 transition-all group"
                >
                  <div className="flex flex-col md:flex-row gap-4 items-start">
                    <div 
                      className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white shadow-lg group-hover:scale-110 transition-transform"
                      style={{ background: "var(--gradient-water)" }}
                    >
                      {step.number}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-bold mb-2 text-foreground">
                        {step.title}
                      </h3>
                      <p className="text-foreground/80 text-sm md:text-base leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-base md:text-lg text-foreground/90 max-w-3xl mx-auto leading-relaxed">
                Rezultat je bazen koji kombinira funkcionalnost, estetiku i dugovječnost – 
                spreman za uživanje dugi niz godina.
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-8 md:py-10 px-4 bg-gradient-to-b from-muted/30 to-muted/50">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Zašto Odabrati CoolPool?
            </h2>
            <div className="space-y-3 text-base text-foreground/90 leading-relaxed">
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

        {/* Contact Form Section */}
        <section id="contact-form" className="py-8 md:py-10 px-4 bg-gradient-to-b from-muted/30 to-transparent">
          <div className="container mx-auto max-w-3xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Kontaktirajte Nas
              </h2>
              <p className="text-base text-foreground/80">
                Za više informacija ili za ponudu obratite se našim profesionalnim tehničarima za bazene
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5 glass-effect p-6 rounded-lg border border-primary/20">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Vaše ime <span className="text-destructive">*</span>
                </label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Unesite vaše ime"
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Vaša e-pošta <span className="text-destructive">*</span>
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="vasa@email.com"
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Predmet <span className="text-destructive">*</span>
                </label>
                <Input
                  id="subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Upit o izgradnji bazena"
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Vaša poruka (opcionalno)
                </label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Unesite vašu poruku..."
                  rows={5}
                  className="w-full resize-none"
                />
              </div>

              <Button
                type="submit"
                size="default"
                disabled={isSubmitting}
                className="w-full text-white font-bold shadow-md hover:shadow-lg transition-all duration-300"
                style={{ background: isSubmitting ? "var(--muted)" : "var(--gradient-water)" }}
              >
                {isSubmitting ? "Šaljem..." : "Pošalji Upit"}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-base text-foreground/80 mb-3">
                Ili nas nazovite direktno:
              </p>
              <a href="tel:+385956633214">
                <Button 
                  size="default"
                  variant="outline"
                  className="font-bold px-6"
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

export default Izgradnja;
