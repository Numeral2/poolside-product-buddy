<?php
// products.php - API za proizvode (MySQL verzija)

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=UTF-8');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Konfiguracija baze
$host = 'localhost';
$dbname = 'bazeniplus';
$username = 'root';
$password = 'tvoja_lozinka';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
    exit();
}

// GET zahtjev - dohvati proizvode
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    
    // Dohvati jedan proizvod po ID-u
    if (isset($_GET['id'])) {
        $id = $_GET['id'];
        $stmt = $pdo->prepare("SELECT * FROM products WHERE id = :id");
        $stmt->execute(['id' => $id]);
        $product = $stmt->fetch();
        
        if ($product) {
            echo json_encode(['product' => $product]);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Product not found']);
        }
        exit();
    }
    
    // Dohvati proizvode po kategoriji
    if (isset($_GET['category'])) {
        $category = $_GET['category'];
        $stmt = $pdo->prepare("SELECT * FROM products WHERE category = :category ORDER BY name ASC");
        $stmt->execute(['category' => $category]);
        $products = $stmt->fetchAll();
        
        echo json_encode(['products' => $products]);
        exit();
    }
    
    // Pretraži proizvode
    if (isset($_GET['search'])) {
        $search = '%' . $_GET['search'] . '%';
        $stmt = $pdo->prepare("
            SELECT * FROM products 
            WHERE name LIKE :search 
            OR description LIKE :search 
            OR category LIKE :search 
            ORDER BY name ASC
        ");
        $stmt->execute(['search' => $search]);
        $products = $stmt->fetchAll();
        
        echo json_encode(['products' => $products]);
        exit();
    }
    
    // Dohvati sve proizvode
    $stmt = $pdo->query("SELECT * FROM products ORDER BY category ASC, name ASC");
    $products = $stmt->fetchAll();
    
    echo json_encode(['products' => $products]);
    exit();
}

// Ostale metode (POST, PUT, DELETE) za buduću implementaciju
http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
