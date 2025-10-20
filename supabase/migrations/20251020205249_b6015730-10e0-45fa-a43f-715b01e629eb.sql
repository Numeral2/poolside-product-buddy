-- Update image URLs for Kvarcni pijesak products
UPDATE products 
SET image_url = '/images/kvarcni-pijesak.png'
WHERE name LIKE 'Kvarcni pijesak%';

-- Update image URLs for Filter Astral Aster products
UPDATE products 
SET image_url = '/images/filter-astral-aster.png'
WHERE name LIKE 'Filter Astral Aster%';