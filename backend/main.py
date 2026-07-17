from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector
import os

app = FastAPI()

# CORS - Allow your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://blrseasonsal-1.onrender.com",
        "https://blrseasonals.shop",
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db_connection():
    """Connect to Aiven MySQL with SSL"""
    try:
        # Try different possible paths for the certificate
        cert_paths = [
            '/etc/secrets/aiven-ca.pem',  # Render Secret File
            'aiven-ca.pem',               # Local file
            './aiven-ca.pem',             # Current directory
            '/app/aiven-ca.pem',          # App directory
        ]
        
        cert_path = None
        for path in cert_paths:
            if os.path.exists(path):
                cert_path = path
                break
        
        if not cert_path:
            print("WARNING: SSL certificate not found! Connecting without SSL...")
            return mysql.connector.connect(
                host=os.getenv("DB_HOST"),
                user=os.getenv("DB_USER"),
                password=os.getenv("DB_PASSWORD"),
                database=os.getenv("DB_NAME"),
                port=int(os.getenv("DB_PORT", 27973)),
                ssl_disabled=True
            )
        
        print(f"Using SSL certificate: {cert_path}")
        return mysql.connector.connect(
            host=os.getenv("DB_HOST"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            database=os.getenv("DB_NAME"),
            port=int(os.getenv("DB_PORT", 27973)),
            ssl_ca=cert_path,
            ssl_disabled=False
        )
    except Exception as e:
        print(f"Connection error: {e}")
        raise e

@app.get("/")
def home():
    return {"message": "Backend Running Successfully"}

@app.get("/api/test")
def test_db():
    """Test database connection"""
    try:
        db = get_db_connection()
        cursor = db.cursor()
        cursor.execute("SELECT 1")
        result = cursor.fetchone()
        cursor.close()
        db.close()
        return {"status": "Database connected successfully!", "result": result}
    except Exception as e:
        return {"error": str(e), "details": "Check your database configuration"}

@app.get("/api/products")
def get_products():
    """Get all products - matches your actual table columns"""
    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)
        cursor.execute("""
            SELECT 
                id,
                title AS name,           -- Map title to name
                price,
                description,
                image AS image_url,      -- Map image to image_url
                category,
                inventory AS stock,
                featured,
                mrp,
                views,
                add_to_cart,
                purchases,
                created_at
            FROM products 
            ORDER BY id
        """)
        products = cursor.fetchall()
        cursor.close()
        db.close()
        return products
    except Exception as e:
        return {"error": str(e), "details": "Could not fetch products"}

@app.get("/api/products/{product_id}")
def get_product(product_id: int):
    """Get single product by ID"""
    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)
        cursor.execute("""
            SELECT 
                id,
                title AS name,
                price,
                description,
                image AS image_url,
                category,
                inventory AS stock,
                featured,
                mrp,
                views,
                add_to_cart,
                purchases,
                created_at
            FROM products 
            WHERE id = %s
        """, (product_id,))
        product = cursor.fetchone()
        cursor.close()
        db.close()
        
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        return product
    except Exception as e:
        return {"error": str(e)}
