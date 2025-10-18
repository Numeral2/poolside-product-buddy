-- Create products table for pool products
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  features TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (everyone can view products)
CREATE POLICY "Products are viewable by everyone" 
ON public.products 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample pool products
INSERT INTO public.products (name, description, price, category, features) VALUES
('Crystal Clear Pool Filter', 'High-efficiency sand filter system for crystal clear water', 599.99, 'Filters', ARRAY['Multi-port valve', 'Easy backwash', 'Energy efficient', 'Durable construction']),
('AquaHeat Pool Heater', 'Smart heating system with temperature control', 1299.99, 'Heaters', ARRAY['Digital thermostat', 'Energy star rated', 'Quick heating', 'Weatherproof']),
('RoboClean Pool Vacuum', 'Automatic robotic pool cleaner with smart navigation', 899.99, 'Cleaners', ARRAY['AI navigation', 'Climbs walls', 'Energy efficient', 'Easy maintenance']),
('LED Pool Lights', 'Color-changing LED underwater lighting system', 299.99, 'Lighting', ARRAY['RGB colors', 'Remote control', 'Waterproof', 'Low energy']),
('ChemBalance Test Kit', 'Professional water chemistry testing kit', 89.99, 'Chemicals', ARRAY['pH testing', 'Chlorine strips', 'Easy to read', 'Accurate results']),
('Premium Pool Cover', 'Heavy-duty solar pool cover with heat retention', 449.99, 'Covers', ARRAY['UV resistant', 'Heat retention', 'Safety lock', 'Custom fit']);