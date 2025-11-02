import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import productRobot from "@/assets/product-robot.png";
import productRobotCleaner from "@/assets/product-robot-cleaner.png";
import productMozaik from "@/assets/product-mozaik.png";
import productKemikalija from "@/assets/product-kemikalija.png";
import productFilterSystem from "@/assets/product-filter-system.png";
import productPumpSystem from "@/assets/product-pump-system.png";

const products = [
  {
    name: "Roboti",
    image: productRobot,
    category: "Roboti"
  },
  {
    name: "Roboti za čišćenje",
    image: productRobotCleaner,
    category: "Roboti"
  },
  {
    name: "Mozaik",
    image: productMozaik,
    category: "Mozaik"
  },
  {
    name: "Kemikalije",
    image: productKemikalija,
    category: "Kemikalije"
  },
  {
    name: "Filteri",
    image: productFilterSystem,
    category: "Filteri"
  },
  {
    name: "Pumpe",
    image: productPumpSystem,
    category: "Pumpe"
  },
];

const ProductCarousel = () => {
  return (
    <div className="max-w-3xl mx-auto mb-3 md:mb-4 px-12">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {products.map((product, index) => (
            <CarouselItem key={index} className="md:basis-1/3">
              <Link to={`/products?category=${encodeURIComponent(product.category)}`}>
                <div className="group relative overflow-hidden rounded-lg border border-primary/20 bg-card/30 hover:border-primary/50 transition-all hover:shadow-lg cursor-pointer">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-32 object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-2 text-center border-t border-primary/10">
                    <p className="font-medium text-xs text-foreground">{product.name}</p>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </Carousel>
    </div>
  );
};

export default ProductCarousel;
