import { useState, useEffect } from "react";
import { ChevronRight, Wrench, Droplets, Sun, Shield, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";


interface CatalogSection {
  title: string;
  icon: any;
  categories: string[];
}

const catalogSections: CatalogSection[] = [
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
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const ProductCatalog = ({ openCategory, isOpen, setIsOpen }: ProductCatalogProps) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (openCategory) {
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
    <>
      {/* Static Catalog Sidebar */}
      <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-background border-r shadow-lg z-40 flex flex-col overflow-hidden">
        <div className="flex items-center gap-2 p-4 border-b bg-muted/30">
          <div className="flex flex-col gap-1">
            <div className="h-0.5 w-5 bg-foreground rounded-full"></div>
            <div className="h-0.5 w-5 bg-foreground rounded-full"></div>
          </div>
          <span className="text-sm font-semibold uppercase tracking-wide">Katalog</span>
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
                    className="w-full flex items-center justify-between p-2.5 hover:bg-muted/50 transition-colors group rounded-md"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 flex items-center justify-center rounded-md"
                           style={{ background: "var(--gradient-water)" }}>
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-semibold text-sm text-foreground">{section.title}</span>
                    </div>
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 text-muted-foreground transition-transform duration-300",
                        isExpanded && "rotate-90"
                      )}
                    />
                  </button>

                  <div 
                    className={cn(
                      "ml-10 space-y-0.5 overflow-hidden transition-all duration-300 ease-in-out",
                      isExpanded ? "max-h-[500px] opacity-100 mb-2" : "max-h-0 opacity-0"
                    )}
                  >
                    {section.categories.map((category) => (
                      <Link
                        key={category}
                        to={`/products?category=${encodeURIComponent(category)}`}
                        className={cn(
                          "block px-3 py-2 text-sm text-foreground/70 hover:text-foreground hover:bg-muted/70 transition-colors rounded-md",
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
    </>
  );
};

export default ProductCatalog;
