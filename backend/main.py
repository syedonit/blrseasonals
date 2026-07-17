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
    return mysql.connector.connect(
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME"),
        port=int(os.getenv("DB_PORT", 27973)),
        ssl_ca='/etc/secrets/aiven-ca.pem',  # SSL certificate path on Render
        ssl_disabled=False
    )

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
        cursor.close()
        db.close()
        return {"status": "Database connected successfully!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/products")
def get_products():
    """Get all products"""
    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT * FROM products ORDER BY id")
        products = cursor.fetchall()
        cursor.close()
        db.close()
        return products
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/products/{product_id}")
def get_product(product_id: int):
    """Get single product by ID"""
    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT * FROM products WHERE id = %s", (product_id,))
        product = cursor.fetchone()
        cursor.close()
        db.close()
        
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        return product
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
