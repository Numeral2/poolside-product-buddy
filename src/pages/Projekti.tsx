import Navigation from "@/components/Navigation";
import ProductCatalog from "@/components/ProductCatalog";
import ModernChatBot from "@/components/ModernChatBot";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import projectBelEtage from "@/assets/project-bel-etage.png";
import projectBrela from "@/assets/project-brela.png";
import projectCamping from "@/assets/project-camping.png";
import projectDamianii from "@/assets/project-damianii.png";
import projectGava from "@/assets/project-gava.png";
import projectLokva from "@/assets/project-lokva.png";
import projectMarina from "@/assets/project-marina.png";
import projectDuce from "@/assets/project-duce.png";
import projectMakarska from "@/assets/project-makarska.png";
import spaKade from "@/assets/spa-kade.png";
import sauna from "@/assets/sauna.png";
import laghetto from "@/assets/laghetto.png";

const Projekti = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category") || "Bazeni";
  const [activeCategory, setActiveCategory] = useState<string>(categoryFromUrl);
  const [selectedProject, setSelectedProject] = useState<{ title: string; location: string; image: string } | null>(null);

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setActiveCategory(category);
    }
  }, [searchParams]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setSearchParams({ category });
  };

  const allProjects = {
    "Bazeni": [
      {
        id: 1,
        title: "Bel Etage Split",
        description: "Luksuzni infinity bazen s panoramskim pogledom",
        image: projectBelEtage,
        location: "Split",
      },
      {
        id: 2,
        title: "Vila Brela",
        description: "Elegantni privatni bazen s pogledom na more",
        image: projectBrela,
        location: "Brela",
      },
      {
        id: 3,
        title: "Camping Split",
        description: "Moderni javni bazeni za kampiste",
        image: projectCamping,
        location: "Camping Split",
      },
      {
        id: 4,
        title: "Hotel Damianii",
        description: "Luksuzni hotelski bazen uz obalu",
        image: projectDamianii,
        location: "Duće",
      },
      {
        id: 5,
        title: "Gava Resort",
        description: "Premium resort bazen s hidromasažom",
        image: projectGava,
        location: "Milna",
      },
      {
        id: 6,
        title: "Lokva Rogoznica",
        description: "Spektakularni infinity bazen uz kamp",
        image: projectLokva,
        location: "Lokva Rogoznica",
      },
      {
        id: 7,
        title: "Marina Residences",
        description: "Ekskluzivni privatni bazen s pogledom na marinu",
        image: projectMarina,
        location: "Marina",
      },
      {
        id: 8,
        title: "Duće Riviera",
        description: "Luksuzni krovni bazeni s pogledom na more",
        image: projectDuce,
        location: "Duće",
      },
      {
        id: 9,
        title: "Makarska Premium",
        description: "Moderna vila s rooftop infinity bazenom",
        image: projectMakarska,
        location: "Makarska",
      },
    ],
    "SPA kade": [
      {
        id: 10,
        title: "Luksuzna SPA Kada",
        description: "Vrhunska hidromasažna kada za potpuno opuštanje",
        image: spaKade,
        location: "",
      },
    ],
    "Saune": [
      {
        id: 11,
        title: "Moderna Sauna",
        description: "Elegantna wellness sauna s vrhunskom opremom",
        image: sauna,
        location: "",
      },
    ],
    "Laghetto": [
      {
        id: 12,
        title: "Prirodni Bazen Laghetto",
        description: "Ekološki pristup prirodnih jezera s elegancijom bazena",
        image: laghetto,
        location: "",
      },
    ],
  };

  const currentProjects = allProjects[activeCategory as keyof typeof allProjects] || allProjects["Bazeni"];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="hidden md:block">
        <ProductCatalog />
      </div>
      
      <div className="md:ml-72">
        {/* Hero Section */}
        <section className="relative py-6 md:py-8 px-4 pt-24 md:pt-44 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container mx-auto max-w-6xl text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
              Naši Projekti
            </h1>
            <p className="text-base md:text-lg text-foreground/80 mb-4 max-w-3xl mx-auto leading-relaxed">
              Preko 1000 uspješno realiziranih projekata u Dalmaciji.<br />
              Pogledajte neke od naših najljepših radova.
            </p>
          </div>
        </section>

        {/* Projects Tabs */}
        <section className="py-4 md:py-6 px-4">
          <div className="container mx-auto max-w-6xl">
            <Tabs value={activeCategory} onValueChange={handleCategoryChange} className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-4 md:mb-6">
                <TabsTrigger value="Bazeni">
                  Bazeni
                </TabsTrigger>
                <TabsTrigger value="SPA kade">
                  SPA Kade
                </TabsTrigger>
                <TabsTrigger value="Saune">
                  Saune
                </TabsTrigger>
                <TabsTrigger value="Laghetto">
                  Laghetto
                </TabsTrigger>
              </TabsList>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentProjects.map((project) => (
                  <div 
                    key={project.id}
                    className="group relative overflow-hidden rounded-lg border border-primary/20 hover:border-primary/50 transition-colors cursor-pointer"
                    onClick={() => project.location && setSelectedProject(project)}
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6 bg-card">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-xl font-bold">{project.title}</h3>
                        {project.location && (
                          <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-foreground/70">{project.description}</p>
                      {project.location && (
                        <p className="text-sm text-primary mt-2 font-medium">{project.location}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Tabs>
          </div>
        </section>

        {/* Project Location Dialog */}
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-2xl">
                <MapPin className="h-6 w-6 text-primary" />
                {selectedProject?.title}
              </DialogTitle>
            </DialogHeader>
            {selectedProject && (
              <div className="space-y-4">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  loading="lazy"
                  className="w-full h-auto rounded-lg"
                />
                <div className="flex items-center gap-2 text-lg">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="font-semibold">Lokacija:</span>
                  <span className="text-primary">{selectedProject.location}</span>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
      <ModernChatBot onOpenCatalog={() => {}} />
    </div>
  );
};

export default Projekti;
