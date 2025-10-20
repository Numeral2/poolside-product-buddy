-- Fix incorrect image URLs for filter products
UPDATE products 
SET image_url = '/images/filter-1.png' 
WHERE image_url = '/src/assets/filter-astral-aster.png';

UPDATE products 
SET image_url = '/images/filter-3.png' 
WHERE image_url = '/src/assets/kvarcni-pijesak.png';

UPDATE products 
SET image_url = '/images/filter-2.png' 
WHERE image_url = '/src/assets/filter-staklo.png';