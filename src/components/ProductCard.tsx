import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface ProductVariant {
  id: string;
  size: string;
  price: number;
}

interface ProductCardProps {
  name: string;
  description: string;
  price?: number;
  category: string;
  image?: string;
  variants?: ProductVariant[];
}

const ProductCard = ({ name, description, price, category, image, variants }: ProductCardProps) => {
  const [selectedVariant, setSelectedVariant] = useState<string>(
    variants && variants.length > 0 ? variants[0].id : ""
  );

  const currentPrice = variants && variants.length > 0
    ? variants.find(v => v.id === selectedVariant)?.price || variants[0].price
    : price;

  const displayName = variants && variants.length > 0
    ? name.replace(/\s+\d+$/, "")
    : name;

  return (
    <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 border-border hover:border-primary/50 bg-card relative">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
           style={{ background: "var(--gradient-glass)" }} />
      
      {image && (
        <div className="h-72 overflow-hidden relative bg-muted/30">
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 p-4"
          />
        </div>
      )}
      <CardHeader className="space-y-4 relative z-10">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
            {displayName}
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

        {variants && variants.length > 0 && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Odaberite veličinu:</label>
            <Select value={selectedVariant} onValueChange={setSelectedVariant}>
              <SelectTrigger className="w-full bg-background/80 backdrop-blur-sm border-2 z-50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background border-2 z-[100]">
                {variants.map((variant) => (
                  <SelectItem key={variant.id} value={variant.id} className="cursor-pointer">
                    {variant.size} - €{variant.price.toFixed(2)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {currentPrice && (
          <div className="text-3xl font-bold pt-2"
               style={{ 
                 background: "var(--gradient-water)",
                 WebkitBackgroundClip: "text",
                 WebkitTextFillColor: "transparent",
                 backgroundClip: "text"
               }}>
            €{currentPrice.toFixed(2)}
          </div>
        )}
      </CardHeader>
    </Card>
  );
};

export default ProductCard;