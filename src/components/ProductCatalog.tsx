import { useState, useEffect } from "react";
import { ChevronRight, Package, Wrench, Droplets, Sun, Shield, FolderOpen } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";


interface CatalogSection {
  title: string;
  icon: any;
  categories: string[];
}

const catalogSections: CatalogSection[] = [
  {
    title: "Projekti",
    icon: FolderOpen,
    categories: ["Bazeni", "SPA kade", "Saune", "Laghetto"]
  },
  {
    title: "Filtracija",
    icon: Droplets,
    categories: ["Filteri", "Pumpe", "Skimmeri"]
  },
  {
    title: "Oprema",
    icon: Wrench,
    categories: [
      "Osnovna i ABS oprema",
      "PVC cijevi i fitinzi",
      "Rasvjeta",
      "Pribor za čišćenje",
      "Mozaik",
      "Materijal za oblaganje",
      "Inox ljestve",
      "Prekrivači"
    ]
  },
  {
    title: "Održavanje",
    icon: Shield,
    categories: ["Kemikalije", "Roboti", "Doziranje i elektronika"]
  },
  {
    title: "Dodaci",
    icon: Sun,
    categories: ["Grijanje", "Efekti"]
  }
];

interface ProductCatalogProps {
  openCategory?: string;
}

const ProductCatalog = ({ openCategory }: ProductCatalogProps) => {
  // All sections expanded by default except "Projekti"
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(catalogSections.filter(s => s.title !== "Projekti").map(s => s.title))
  );

  useEffect(() => {
    if (openCategory) {
      // Find which section contains this category and expand it
      const section = catalogSections.find(s => 
        s.categories.some(cat => cat.toLowerCase().includes(openCategory.toLowerCase()))
      );
      if (section) {
        setExpandedSections(prev => new Set(prev).add(section.title));
      }
    }
  }, [openCategory]);

  const toggleSection = (title: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(title)) {
        next.delete(title);
      } else {
        next.add(title);
      }
      return next;
    });
  };

  return (
    <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-72 bg-background/95 backdrop-blur-md border-r shadow-lg z-30 flex flex-col overflow-hidden">
      <div className="flex items-center justify-center p-4 border-b">
        <div className="flex flex-col gap-1">
          <div className="h-0.5 w-8 bg-foreground"></div>
          <div className="h-0.5 w-8 bg-foreground"></div>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-3 space-y-2">
            {catalogSections.map((section) => {
              const Icon = section.icon;
              const isExpanded = expandedSections.has(section.title);

              return (
                <div key={section.title} className="space-y-1">
                  <button
                    onClick={() => toggleSection(section.title)}
                    className="w-full flex items-center justify-between p-2 hover:bg-muted transition-colors group"
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 flex items-center justify-center"
                           style={{ background: "var(--gradient-water)" }}>
                        <Icon className="h-3.5 w-3.5 text-white" />
                      </div>
                      <span className="font-semibold text-sm text-foreground">{section.title}</span>
                    </div>
                    <ChevronRight
                      className={cn(
                        "h-5 w-5 text-muted-foreground transition-transform duration-300",
                        isExpanded && "rotate-90"
                      )}
                    />
                  </button>

                  <div 
                    className={cn(
                      "ml-9 space-y-0.5 overflow-hidden transition-all duration-300",
                      isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    {section.categories.map((category) => (
                      <Link
                        key={category}
                        to={section.title === "Projekti" ? `/projekti?category=${encodeURIComponent(category)}` : `/products?category=${encodeURIComponent(category)}`}
                        className={cn(
                          "block px-3 py-1.5 text-xs text-foreground/80 hover:text-foreground hover:bg-muted/50 transition-colors",
                          openCategory?.toLowerCase() === category.toLowerCase() && "bg-primary/10 text-primary font-medium"
                        )}
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>

        
      </ScrollArea>
    </div>
  );
};

export default ProductCatalog;
