import { useState, useEffect } from "react";
import { ChevronRight, Package, Wrench, Droplets, Sun, Shield, X } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    title: "Izgradnja",
    icon: Package,
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
  isOpen: boolean;
  onClose: () => void;
  openCategory?: string;
}

const ProductCatalog = ({ isOpen, onClose, openCategory }: ProductCatalogProps) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  useEffect(() => {
    if (openCategory) {
      // Find which section contains this category
      const section = catalogSections.find(s => 
        s.categories.some(cat => cat.toLowerCase().includes(openCategory.toLowerCase()))
      );
      if (section) {
        setExpandedSection(section.title);
      }
    }
  }, [openCategory]);

  const toggleSection = (title: string) => {
    setExpandedSection(expandedSection === title ? null : title);
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 animate-fade-in"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 h-full w-80 bg-background border-r shadow-2xl z-50 transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-foreground">Katalog Proizvoda</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="p-4 space-y-2">
            {catalogSections.map((section) => {
              const Icon = section.icon;
              const isExpanded = expandedSection === section.title;

              return (
                <div key={section.title} className="space-y-1">
                  <button
                    onClick={() => toggleSection(section.title)}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg flex items-center justify-center"
                           style={{ background: "var(--gradient-water)" }}>
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-semibold text-foreground">{section.title}</span>
                    </div>
                    <ChevronRight
                      className={cn(
                        "h-5 w-5 text-muted-foreground transition-transform",
                        isExpanded && "rotate-90"
                      )}
                    />
                  </button>

                  {isExpanded && (
                    <div className="ml-11 space-y-1 animate-fade-in">
                      {section.categories.map((category) => (
                        <Link
                          key={category}
                          to={`/products?category=${encodeURIComponent(category)}`}
                          onClick={onClose}
                          className={cn(
                            "block px-4 py-2 rounded-md text-sm text-foreground/80 hover:text-foreground hover:bg-muted/50 transition-colors",
                            openCategory?.toLowerCase() === category.toLowerCase() && "bg-primary/10 text-primary font-medium"
                          )}
                        >
                          {category}
                        </Link>
                      ))}
                    </div>
                  )}
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
