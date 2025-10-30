# PHP Backend za Bazeniplus.hr

Ovo je primjer PHP backend koda za tvoj VPS sa MySQL bazom.

## Instalacija

### 1. Postavi MySQL bazu

```bash
mysql -u root -p < database/schema.sql
```

### 2. Kopiraj API fajlove na VPS

Kopiraj sve fajlove iz `api/` direktorija u tvoj `/var/www/html/api/` (ili gdje god ti je root za website).

### 3. Konfiguriraj bazu u products.php

Otvori `api/products.php` i promijeni:

```php
$host = 'localhost';
$dbname = 'bazeniplus';
$username = 'root';
$password = 'tvoja_lozinka';
```

### 4. Postavi CORS (ako je potrebno)

Ako ti VPS vraća CORS greške, dodaj u Apache `.htaccess`:

```apache
Header set Access-Control-Allow-Origin "*"
Header set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
Header set Access-Control-Allow-Headers "Content-Type"
```

## Testiranje API-ja

```bash
# Svi proizvodi
curl http://tvoja-domena.hr/api/products.php

# Proizvod po ID-u
curl http://tvoja-domena.hr/api/products.php?id=1

# Po kategoriji
curl http://tvoja-domena.hr/api/products.php?category=Filteri

# Pretraga
curl http://tvoja-domena.hr/api/products.php?search=filter
```

## Frontend Konfiguracija

U tvom React projektu, dodaj u `.env` fajl:

```
VITE_API_URL=http://tvoja-domena.hr/api
```

## Struktura MySQL vs PostgreSQL

### PostgreSQL (Supabase) koristio:
- `UUID` za ID
- `JSONB` za složene podatke
- `ARRAY` za liste

### MySQL koristi:
- `VARCHAR(36)` za ID
- `TEXT` ili `JSON` za složene podatke
- Normalizirane tablice za liste

## Sigurnost

⚠️ **VAŽNO**: Ovo je osnovni primjer. Za produkciju dodaj:
- Prepared statements (već implementirano)
- Rate limiting
- Autentifikaciju za admin endpointe
- HTTPS
- Input validaciju
