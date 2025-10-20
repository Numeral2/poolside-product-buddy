-- Update image URLs for Kvarcni pijesak products
UPDATE products 
SET image_url = '/images/kvarcni-pijesak-new.png'
WHERE name LIKE 'Kvarcni pijesak%';

-- Update image URLs for Filter staklo products
UPDATE products 
SET image_url = '/images/filter-staklo-new.png'
WHERE name LIKE 'Filter staklo%';