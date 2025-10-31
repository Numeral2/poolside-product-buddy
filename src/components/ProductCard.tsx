import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Sparkles, Eye } from "lucide-react";
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
  onAskAI?: (productName: string, selectedSize?: string) => void;
  productId?: string;
}

const ProductCard = ({ name, description, price, category, image, variants, onAskAI, productId }: ProductCardProps) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
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
    <Card className="overflow-hidden hover:shadow-xl transition-shadow border border-border/50 hover:border-border bg-card">
      
      
      {image && (
        <div className="h-56 overflow-hidden relative bg-muted/20">
          <img 
            src={image} 
            alt={name} 
            loading="lazy"
            className="w-full h-full object-contain p-3"
          />
        </div>
      )}
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-xl font-bold text-foreground">
            {displayName}
          </CardTitle>
          <Badge 
            variant="secondary"
            className="whitespace-nowrap font-semibold"
          >
            {category}
          </Badge>
        </div>
        <CardDescription className="text-sm leading-relaxed font-semibold text-foreground">
          {name}
        </CardDescription>
        
        {productId && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/product/${productId}`)}
            className="w-full text-xs gap-2 border-primary/30 hover:border-primary hover:bg-primary/5"
          >
            <Eye className="h-3.5 w-3.5" />
            Pogledaj Detalje
          </Button>
        )}
        
        {onAskAI && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const selectedVariantData = variants?.find(v => v.id === selectedVariant);
              onAskAI(name, selectedVariantData?.size);
            }}
            className="w-full text-xs gap-2 border-primary/30 hover:border-primary hover:bg-primary/5"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Pitaj AI o ovom proizvodu
          </Button>
        )}

        {variants && variants.length > 0 && (
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Veličina:</label>
            <Select value={selectedVariant} onValueChange={setSelectedVariant}>
              <SelectTrigger className="w-full bg-background border z-50 font-medium">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background border z-[100]">
                {variants.map((variant) => (
                  <SelectItem key={variant.id} value={variant.id} className="cursor-pointer font-medium">
                    {variant.size} - €{variant.price.toFixed(2)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {currentPrice && (
          <div className="flex items-center justify-between pt-2">
            <div className="text-3xl font-semibold text-foreground tracking-tight">
              €{currentPrice.toFixed(2)}
            </div>
            <Button
              onClick={handleAddToCart}
              className="font-bold shadow-md hover:shadow-lg transition-shadow"
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
