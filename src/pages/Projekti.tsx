import Navigation from "@/components/Navigation";
import ProductCatalog from "@/components/ProductCatalog";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MapPin } from "lucide-react";
import projectBelEtage from "@/assets/project-bel-etage.png";
import projectBrela from "@/assets/project-brela.png";
import projectCamping from "@/assets/project-camping.png";
import projectDamianii from "@/assets/project-damianii.png";
import projectGava from "@/assets/project-gava.png";
import projectLokva from "@/assets/project-lokva.png";
import projectMarina from "@/assets/project-marina.png";
import projectDuce from "@/assets/project-duce.png";
import projectMakarska from "@/assets/project-makarska.png";

const Projekti = () => {
  const [selectedProject, setSelectedProject] = useState<{ title: string; location: string; image: string } | null>(null);

  const projectImages = [
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
              Naši Realizirani Projekti
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              Preko 1000 uspješno realiziranih projekata u Dalmaciji.<br />
              Pogledajte neke od naših najljepših bazena.
            </p>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectImages.map((project) => (
                <div 
                  key={project.id}
                  className="group relative overflow-hidden rounded-lg border border-primary/20 hover:border-primary/50 transition-all cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 bg-card">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-xl font-bold">{project.title}</h3>
                      <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                    </div>
                    <p className="text-foreground/70">{project.description}</p>
                    <p className="text-sm text-primary mt-2 font-medium">{project.location}</p>
                  </div>
                </div>
              ))}
            </div>
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
    </div>
  );
};

export default Projekti;
