import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import bazeniPlusLogo from "@/assets/bazeniplus-nav-logo.png";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={bazeniPlusLogo} alt="BazeniPlus" className="h-10 w-auto object-contain" />
        </Link>
        
        <div className="flex items-center gap-6">
          <Link 
            to="/" 
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            Home
          </Link>
          <Link 
            to="/products" 
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            Products
          </Link>
          <div className="flex gap-3">
            <Link to="/signin">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="sm" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;