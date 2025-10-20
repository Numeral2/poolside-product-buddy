import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, ChevronDown, ShoppingCart, Search } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import coolpoolLogo from "@/assets/coolpool-logo.png";

const Navigation = () => {
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/98 backdrop-blur-md border-b border-border/50 shadow-sm">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="absolute left-4 top-1.5 flex items-center flex-shrink-0">
          <img src={coolpoolLogo} alt="CoolPool" className="h-10 w-auto object-contain" />
        </Link>
        
        <div className="flex items-center gap-4 ml-auto">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden lg:flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Pretraži proizvode..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 w-48 h-8 text-sm"
              />
            </div>
          </form>
          <Link 
            to="/" 
            className="text-sm text-foreground hover:text-primary transition-colors font-medium hidden md:block"
          >
            Početna
          </Link>
          
          <Link 
            to="/o-nama" 
            className="text-sm text-foreground hover:text-primary transition-colors font-medium hidden md:block"
          >
            O nama
          </Link>

          <Link 
            to="/izgradnja" 
            className="text-sm text-foreground hover:text-primary transition-colors font-medium hidden md:block"
          >
            Izgradnja bazena
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-sm text-foreground hover:text-primary transition-colors font-medium flex items-center gap-1 hidden md:flex">
                Web Shop
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64 bg-background z-50">
              <DropdownMenuLabel className="text-primary font-bold">Oprema za bazene</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link to="/products?category=Filteri" className="w-full cursor-pointer">Filteri</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/products?category=Pumpe" className="w-full cursor-pointer">Pumpe</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/products?category=Skimmeri" className="w-full cursor-pointer">Skimmeri</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/products?category=Osnovna i ABS oprema" className="w-full cursor-pointer">Osnovna i ABS oprema</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/products?category=PVC cijevi i fitinzi" className="w-full cursor-pointer">PVC cijevi i fitinzi</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/products?category=Rasvjeta" className="w-full cursor-pointer">Rasvjeta</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/products?category=Kemikalije" className="w-full cursor-pointer">Kemikalije</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/products?category=Pribor za čišćenje" className="w-full cursor-pointer">Pribor za čišćenje</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/products?category=Mozaik" className="w-full cursor-pointer">Mozaik</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/products?category=Materijal za oblaganje" className="w-full cursor-pointer">Materijal za oblaganje</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/products?category=Doziranje i elektronika" className="w-full cursor-pointer">Doziranje i elektronika</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/products?category=Efekti" className="w-full cursor-pointer">Efekti</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/products?category=Inox ljestve" className="w-full cursor-pointer">Inox ljestve</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/products?category=Prekrivači" className="w-full cursor-pointer">Prekrivači</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/products?category=Grijanje" className="w-full cursor-pointer">Grijanje</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/products?category=Roboti" className="w-full cursor-pointer">Roboti</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1 text-sm h-8 px-2 md:hidden">
                <Menu className="h-4 w-4" />
                Meni
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link to="/" className="w-full">Početna</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/o-nama" className="w-full">O nama</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/izgradnja" className="w-full">Izgradnja</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/products" className="w-full">Web Shop</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link to="/cart" className="relative">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-10 w-10 p-0"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full text-xs flex items-center justify-center text-white font-bold"
                      style={{ background: "var(--gradient-water)" }}>
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;