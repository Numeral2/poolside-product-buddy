import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
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
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<string>(
    variants && variants.length > 0 ? variants[0].id : ""
  );

  const currentPrice = variants && variants.length > 0
    ? variants.find(v => v.id === selectedVariant)?.price || variants[0].price
    : price;

  const displayName = variants && variants.length > 0
    ? name.replace(/\s+\d+$/, "")
    : name;

  const currentDescription = useMemo(() => {
    if (!variants || variants.length === 0) return description;
    
    const selectedVariantData = variants.find(v => v.id === selectedVariant);
    if (!selectedVariantData) return description;
    
    // For Lisboa filters: replace "model XXX" with current size
    if (name.includes('Lisboa')) {
      return description.replace(/model\s+\d+/i, `model ${selectedVariantData.size}`);
    }
    
    // For Astral Aster filters: replace "model XXX" with current size
    if (name.includes('Astral Aster')) {
      return description.replace(/model\s+\d+/i, `model ${selectedVariantData.size}`);
    }
    
    // For multiventil: replace size specification in description
    if (name.includes('multiventil')) {
      return description.replace(/\d+\s*½?\s*"/g, selectedVariantData.size);
    }
    
    // For mm-based products (Kvarcni pijesak, Filter staklo): replace granulacije XXmm
    if (description.includes('granulacije')) {
      return description.replace(/granulacije\s+[\d.-]+mm/i, `granulacije ${selectedVariantData.size}`);
    }
    
    // Default: replace last number with current size
    return description.replace(/\d+(?=[^\d]*$)/, selectedVariantData.size);
  }, [variants, selectedVariant, description, name]);

  const handleAddToCart = () => {
    if (!currentPrice) return;
    
    const selectedVariantData = variants?.find(v => v.id === selectedVariant);
    
    addToCart({
      id: name,
      name: displayName,
      price: currentPrice,
      category,
      image,
      variantId: selectedVariantData?.id,
      variantSize: selectedVariantData?.size,
    });
  };

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
      <CardHeader className="space-y-2 relative z-10">
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
          {currentDescription}
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
          <div className="flex items-center justify-between pt-2">
            <div className="text-3xl font-bold"
                 style={{ 
                   background: "var(--gradient-water)",
                   WebkitBackgroundClip: "text",
                   WebkitTextFillColor: "transparent",
                   backgroundClip: "text"
                 }}>
              €{currentPrice.toFixed(2)}
            </div>
            <Button
              onClick={handleAddToCart}
              className="text-white font-bold"
              style={{ background: "var(--gradient-water)" }}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Dodaj
            </Button>
          </div>
        )}
      </CardHeader>
    </Card>
  );
};

export default ProductCard;