import { supabase } from "@/integrations/supabase/client";

const API_URL = import.meta.env.VITE_API_URL || '';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  features?: string[];
}

// Koristi PHP API ako je postavljen VITE_API_URL, inače Supabase
export const fetchProducts = async (): Promise<Product[]> => {
  if (API_URL) {
    try {
      const response = await fetch(`${API_URL}/products.php`);
      if (!response.ok) throw new Error('PHP API failed');
      const data = await response.json();
      return data;
    } catch (error) {
      console.warn('PHP API not available, falling back to Supabase');
    }
  }
  
  // Fallback na Supabase
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('category', { ascending: true });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const fetchProductById = async (id: string): Promise<Product | null> => {
  if (API_URL) {
    try {
      const response = await fetch(`${API_URL}/products.php?id=${id}`);
      if (!response.ok) throw new Error('PHP API failed');
      const data = await response.json();
      return data;
    } catch (error) {
      console.warn('PHP API not available, falling back to Supabase');
    }
  }
  
  // Fallback na Supabase
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};
