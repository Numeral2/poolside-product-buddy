import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";

interface FlyToCartAnimationProps {
  startPosition: { x: number; y: number } | null;
  onComplete: () => void;
}

const FlyToCartAnimation = ({ startPosition, onComplete }: FlyToCartAnimationProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (startPosition) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        onComplete();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [startPosition, onComplete]);

  if (!isAnimating || !startPosition) return null;

  // Get cart icon position
  const cartElement = document.querySelector('[data-cart-icon]');
  const cartRect = cartElement?.getBoundingClientRect();

  if (!cartRect) return null;

  const endX = cartRect.left + cartRect.width / 2;
  const endY = cartRect.top + cartRect.height / 2;

  return (
    <div
      className="fixed pointer-events-none z-[9999]"
      style={{
        left: startPosition.x,
        top: startPosition.y,
        animation: `flyToCart 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
        '--end-x': `${endX - startPosition.x}px`,
        '--end-y': `${endY - startPosition.y}px`,
      } as React.CSSProperties}
    >
      <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center shadow-lg">
        <ShoppingCart className="h-5 w-5 text-primary-foreground" />
      </div>
    </div>
  );
};

export default FlyToCartAnimation;
