import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider, useCart } from "@/contexts/CartContext";
import FlyToCartAnimation from "@/components/FlyToCartAnimation";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Projekti from "./pages/Projekti";
import NotFound from "./pages/NotFound";

const AppContent = () => {
  const { animationStart, clearAnimation } = useCart();

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/projekti" element={<Projekti />} />
        <Route path="/cart" element={<Cart />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <FlyToCartAnimation startPosition={animationStart} onComplete={clearAnimation} />
    </>
  );
};

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Funkcija koja briše "Edit with Lovable" badge
    const removeLovableBadge = () => {
      const badge = document.querySelector('a[href*="lovable.dev"]');
      if (badge) badge.remove();
    };

    // Pokušaj odmah obrisati badge ako već postoji
    removeLovableBadge();

    // Ako se pojavi kasnije (dinamički), automatski ga briši
    const observer = new MutationObserver(removeLovableBadge);
    observer.observe(document.body, { childList: true, subtree: true });

    // Zaustavi observer kad se komponenta unmounta
    return () => observer.disconnect();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </QueryClientProvider>
  );
};

export default App;
