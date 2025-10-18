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
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 bg-card">
      {image && (
        <div className="h-64 overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
      )}
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-xl font-bold">{name}</CardTitle>
          <Badge className="bg-primary/10 text-primary hover:bg-primary/20 whitespace-nowrap">{category}</Badge>
        </div>
        <CardDescription className="text-base leading-relaxed">{description}</CardDescription>
        {price && (
          <div className="text-3xl font-bold text-primary pt-2">
            ${price.toFixed(2)}
          </div>
        )}
      </CardHeader>
    </Card>
  );
};

export default ProductCard;