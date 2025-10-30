-- MySQL Schema za bazeniplus.hr
-- Kreiranje baze podataka

CREATE DATABASE IF NOT EXISTS bazeniplus CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE bazeniplus;

-- Tablica proizvoda
CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Primjer unosa podataka
INSERT INTO products (id, name, description, price, category, image_url) VALUES
('1', 'Filter IML Lisboa 450', 'Visokokvalitetni filter za bazene, model 450', 599.00, 'Filteri', '/images/filter-lisboa.png'),
('2', 'Filter IML Lisboa 500', 'Visokokvalitetni filter za bazene, model 500', 699.00, 'Filteri', '/images/filter-lisboa.png'),
('3', 'Filter Astral Aster 500', 'Profesionalni peščani filter, model 500', 799.00, 'Filteri', '/images/filter-astral-aster.png'),
('4', 'Kvarcni pijesak 0.4-0.8mm', 'Premium kvarcni pijesak za filtraciju, granulacije 0.4-0.8mm', 45.00, 'Materijal za oblaganje', '/images/kvarcni-pijesak-new.png'),
('5', 'Kvarcni pijesak 0.7-1.2mm', 'Premium kvarcni pijesak za filtraciju, granulacije 0.7-1.2mm', 45.00, 'Materijal za oblaganje', '/images/kvarcni-pijesak-new.png');

-- Indeksi za bolju performansu
CREATE INDEX idx_price ON products(price);
CREATE FULLTEXT INDEX idx_search ON products(name, description);
