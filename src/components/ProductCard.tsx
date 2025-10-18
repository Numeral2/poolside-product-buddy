import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface ProductCardProps {
  name: string;
  description: string;
  price: number;
  category: string;
  features: string[];
}

const ProductCard = ({ name, description, price, category, features }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/50">
      <div 
        className="h-48 bg-gradient-to-br from-primary to-secondary"
        style={{ background: 'var(--gradient-water)' }}
      />
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl mb-2">{name}</CardTitle>
            <Badge variant="secondary">{category}</Badge>
          </div>
          <div className="text-2xl font-bold text-primary">
            ${price.toFixed(2)}
          </div>
        </div>
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {features.slice(0, 3).map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ProductCard;