import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import productRobot from "@/assets/product-robot.png";
import productMozaik from "@/assets/product-mozaik.png";
import productKemikalija from "@/assets/product-kemikalija.png";
import productFilterSystem from "@/assets/product-filter-system.png";
import productPumpSystem from "@/assets/product-pump-system.png";
import productSkimmer from "@/assets/product-skimmer.png";
import productAbsOprema from "@/assets/product-abs-oprema.png";
import productPvcPipe from "@/assets/product-pvc-pipe.png";
import productRasvjeta from "@/assets/product-rasvjeta.png";
import productCleaning from "@/assets/product-cleaning.png";
import productOblaganje from "@/assets/product-oblaganje.png";

const products = [
  {
    name: "Roboti",
    image: productRobot,
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
  {
    name: "Skimmeri",
    image: productSkimmer,
    category: "Skimmeri"
  },
  {
    name: "Osnovna i ABS oprema",
    image: productAbsOprema,
    category: "Osnovna i ABS oprema"
  },
  {
    name: "PVC cijevi i fitinzi",
    image: productPvcPipe,
    category: "PVC cijevi i fitinzi"
  },
  {
    name: "Rasvjeta",
    image: productRasvjeta,
    category: "Rasvjeta"
  },
  {
    name: "Pribor za čišćenje",
    image: productCleaning,
    category: "Pribor za čišćenje"
  },
  {
    name: "Materijal za oblaganje",
    image: productOblaganje,
    category: "Materijal za oblaganje"
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
