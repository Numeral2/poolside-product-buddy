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
    <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 border-border hover:border-primary/50 bg-card relative">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
           style={{ background: "var(--gradient-glass)" }} />
      
      {image && (
        <div className="h-64 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
      )}
      <CardHeader className="space-y-3 relative z-10">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
            {name}
          </CardTitle>
          <Badge 
            className="whitespace-nowrap font-semibold"
            style={{ 
              background: "var(--gradient-water)",
              color: "white",
              border: "none"
            }}
          >
            {category}
          </Badge>
        </div>
        <CardDescription className="text-base leading-relaxed">
          {description}
        </CardDescription>
        {price && (
          <div className="text-3xl font-bold pt-2"
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