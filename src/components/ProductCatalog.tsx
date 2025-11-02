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
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(catalogSections.map(s => s.title))
  );

  useEffect(() => {
    if (openCategory) {
      const section = catalogSections.find(s => 
        s.categories.some(cat => cat.toLowerCase().includes(openCategory.toLowerCase()))
      );
      if (section) {
        setExpandedSections(prev => new Set(prev).add(section.title));
        setIsOpen(true);
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
      {/* Collapsed Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed left-0 top-16 h-[calc(100vh-4rem)] w-12 bg-background/80 backdrop-blur-sm border-r border-primary/20 z-30 flex flex-col items-center justify-center gap-1 hover:bg-background/95 transition-all duration-300",
          isOpen && "opacity-0 pointer-events-none"
        )}
      >
        <div className="h-0.5 w-6 bg-foreground rounded-full"></div>
        <div className="h-0.5 w-6 bg-foreground rounded-full"></div>
      </button>

      {/* Expanded Catalog */}
      <div 
        className={cn(
          "fixed left-0 top-16 h-[calc(100vh-4rem)] w-72 bg-background/95 backdrop-blur-md border-r shadow-lg z-40 flex flex-col overflow-hidden transition-transform duration-500 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="flex flex-col gap-1">
              <div className="h-0.5 w-6 bg-foreground rounded-full"></div>
              <div className="h-0.5 w-6 bg-foreground rounded-full"></div>
            </div>
            <span className="text-sm font-semibold">Katalog</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
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
                    className="w-full flex items-center justify-between p-2 hover:bg-muted transition-colors group rounded"
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 flex items-center justify-center rounded"
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
                      "ml-9 space-y-0.5 overflow-hidden transition-all duration-500 ease-in-out",
                      isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    {section.categories.map((category) => (
                      <Link
                        key={category}
                        to={`/products?category=${encodeURIComponent(category)}`}
                        className={cn(
                          "block px-3 py-1.5 text-xs text-foreground/80 hover:text-foreground hover:bg-muted/50 transition-colors rounded",
                          openCategory?.toLowerCase() === category.toLowerCase() && "bg-primary/10 text-primary font-medium"
                        )}
                        onClick={() => setIsOpen(false)}
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

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default ProductCatalog;
