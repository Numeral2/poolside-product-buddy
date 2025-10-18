import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  name: string;
  description: string;
  price?: number;
  category: string;
  image?: string;
}

const ProductCard = ({ name, description, price, category, image }: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden transition-all duration-500 hover:-translate-y-3 border-2 border-border hover:border-primary/50 bg-card relative h-full">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
           style={{ background: "var(--gradient-glass)" }} />
      
      {image && (
        <div className="h-48 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
          />
          <div className="absolute top-3 right-3 z-20">
            <Badge 
              className="whitespace-nowrap font-bold text-xs backdrop-blur-md"
              style={{ 
                background: "var(--gradient-water)",
                color: "white",
                border: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
              }}
            >
              {category}
            </Badge>
          </div>
        </div>
      )}
      <CardHeader className="space-y-3 relative z-10 p-5">
        <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors leading-tight">
          {name}
        </CardTitle>
        <CardDescription className="text-sm leading-relaxed line-clamp-2">
          {description}
        </CardDescription>
        {price && (
          <div className="text-2xl font-bold pt-2"
               style={{ 
                 background: "var(--gradient-water)",
                 WebkitBackgroundClip: "text",
                 WebkitTextFillColor: "transparent",
                 backgroundClip: "text"
               }}>
            ${price.toFixed(2)}
          </div>
        )}
      </CardHeader>
    </Card>
  );
};

export default ProductCard;