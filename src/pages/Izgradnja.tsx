import Navigation from "@/components/Navigation";
import ProductCatalog from "@/components/ProductCatalog";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MapPin, X } from "lucide-react";
import pool1 from "@/assets/pool-1.png";
import pool2 from "@/assets/pool-2.png";
import pool3 from "@/assets/pool-3.png";
import pool4 from "@/assets/pool-4.png";
import pool5 from "@/assets/pool-5.png";
import pool6 from "@/assets/pool-6.png";
import projectBelEtage from "@/assets/project-bel-etage.png";
import projectBrela from "@/assets/project-brela.png";
import projectCamping from "@/assets/project-camping.png";
import projectDamianii from "@/assets/project-damianii.png";
import projectGava from "@/assets/project-gava.png";
import projectLokva from "@/assets/project-lokva.png";
import projectMarina from "@/assets/project-marina.png";
import projectDuce from "@/assets/project-duce.png";
import projectMakarska from "@/assets/project-makarska.png";

const Izgradnja = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPool, setSelectedPool] = useState<{ title: string; location: string; image: string } | null>(null);

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

  const poolTypes = [
    {
      id: 1,
      title: "Infinity Bazeni",
      description: "Moderan dizajn s beskrajnim rubom i panoramskim pogledom",
      image: pool1,
      location: "",
    },
    {
      id: 2,
      title: "Nadzemni Bazeni",
      description: "Brza montaža, ekonomično rješenje s vrhunskom kvalitetom",
      image: pool2,
      location: "",
    },
    {
      id: 3,
      title: "Obiteljski Bazeni",
      description: "Prostrani bazeni idealni za obitelji s djecom",
      image: pool3,
      location: "",
    },
    {
      id: 4,
      title: "Wellness Bazeni",
      description: "Kombinirani wellness prostori s bazenom i saunom",
      image: pool4,
      location: "",
    },
    {
      id: 5,
      title: "Hidromasažne Kade",
      description: "Vrhunska hidromasažna iskustva za potpuno opuštanje",
      image: pool5,
      location: "",
    },
    {
      id: 6,
      title: "Krovni Bazeni",
      description: "Ekskluzivna rješenja za krovne terase",
      image: pool6,
      location: "",
    },
    {
      id: 7,
      title: "Bel Etage Split",
      description: "Luksuzni infinity bazen s panoramskim pogledom",
      image: projectBelEtage,
      location: "Split",
    },
    {
      id: 8,
      title: "Vila Brela",
      description: "Elegantni privatni bazen s pogledom na more",
      image: projectBrela,
      location: "Brela",
    },
    {
      id: 9,
      title: "Camping Split",
      description: "Moderni javni bazeni za kampiste",
      image: projectCamping,
      location: "Camping Split",
    },
    {
      id: 10,
      title: "Hotel Damianii",
      description: "Luksuzni hotelski bazen uz obalu",
      image: projectDamianii,
      location: "Duće",
    },
    {
      id: 11,
      title: "Gava Resort",
      description: "Premium resort bazen s hidromasažom",
      image: projectGava,
      location: "Milna",
    },
    {
      id: 12,
      title: "Lokva Rogoznica",
      description: "Spektakularni infinity bazen uz kamp",
      image: projectLokva,
      location: "Lokva Rogoznica",
    },
    {
      id: 13,
      title: "Marina Residences",
      description: "Ekskluzivni privatni bazen s pogledom na marinu",
      image: projectMarina,
      location: "Marina",
    },
    {
      id: 14,
      title: "Duće Riviera",
      description: "Luksuzni krovni bazeni s pogledom na more",
      image: projectDuce,
      location: "Duće",
    },
    {
      id: 15,
      title: "Makarska Premium",
      description: "Moderna vila s rooftop infinity bazenom",
      image: projectMakarska,
      location: "Makarska",
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
                  const contactSection = document.getElementById('contact-form');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
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

        {/* Construction Process Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-transparent to-muted/30">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
              Proces Izgradnje Bazena
            </h2>
            <p className="text-lg text-center text-foreground/80 mb-12 max-w-3xl mx-auto">
              Izgradnja bazena počinje kvalitetnim planiranjem i završava preciznom izvedbom. 
              Cijeli proces obuhvaća nekoliko ključnih faza:
            </p>
            
            <div className="space-y-6">
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
                  className="glass-effect border border-primary/20 p-6 md:p-8 rounded-lg hover:border-primary/40 transition-all group"
                >
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div 
                      className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg group-hover:scale-110 transition-transform"
                      style={{ background: "var(--gradient-water)" }}
                    >
                      {step.number}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-bold mb-3 text-foreground">
                        {step.title}
                      </h3>
                      <p className="text-foreground/80 text-base md:text-lg leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-lg md:text-xl text-foreground/90 max-w-3xl mx-auto leading-relaxed font-medium">
                Rezultat je bazen koji kombinira funkcionalnost, estetiku i dugovječnost – 
                spreman za uživanje dugi niz godina.
              </p>
            </div>
          </div>
        </section>

        {/* Pool Types Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Naši Realizirani Projekti
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {poolTypes.map((pool) => (
                <div 
                  key={pool.id}
                  className="group relative overflow-hidden rounded-lg border border-primary/20 hover:border-primary/50 transition-all cursor-pointer"
                  onClick={() => pool.location && setSelectedPool(pool)}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={pool.image} 
                      alt={pool.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 bg-card">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-xl font-bold">{pool.title}</h3>
                      {pool.location && (
                        <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-foreground/70">{pool.description}</p>
                    {pool.location && (
                      <p className="text-sm text-primary mt-2 font-medium">{pool.location}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Location Dialog */}
        <Dialog open={!!selectedPool} onOpenChange={() => setSelectedPool(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-2xl">
                <MapPin className="h-6 w-6 text-primary" />
                {selectedPool?.title}
              </DialogTitle>
            </DialogHeader>
            {selectedPool && (
              <div className="space-y-4">
                <img 
                  src={selectedPool.image} 
                  alt={selectedPool.title}
                  className="w-full h-auto rounded-lg"
                />
                <div className="flex items-center gap-2 text-lg">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="font-semibold">Lokacija:</span>
                  <span className="text-primary">{selectedPool.location}</span>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

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

        {/* Contact Form Section */}
        <section id="contact-form" className="py-16 px-4 bg-gradient-to-b from-muted/30 to-transparent">
          <div className="container mx-auto max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Kontaktirajte Nas
              </h2>
              <p className="text-xl text-foreground/80">
                Za više informacija ili za ponudu obratite se našim profesionalnim tehničarima za bazene
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6 glass-effect p-8 rounded-lg border border-primary/20">
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
                  rows={6}
                  className="w-full resize-none"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full text-white font-bold shadow-md hover:shadow-lg transition-all duration-300 text-lg"
                style={{ background: isSubmitting ? "var(--muted)" : "var(--gradient-water)" }}
              >
                {isSubmitting ? "Šaljem..." : "Pošalji Upit"}
              </Button>
            </form>

            <div className="mt-12 text-center">
              <p className="text-lg text-foreground/80 mb-4">
                Ili nas nazovite direktno:
              </p>
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
