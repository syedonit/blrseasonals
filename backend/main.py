from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db_connection():
    return mysql.connector.connect(
    host=os.getenv("DB_HOST"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    database=os.getenv("DB_NAME"),
    port=int(os.getenv("DB_PORT")),
    ssl_disabled=False
)

@app.get("/")
def home():
    return {"message": "Backend Running Successfully"}

@app.get("/products")
def get_products():
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)

    cursor.execute("""
        SELECT *
        FROM products
        ORDER BY id
    """)

    products = cursor.fetchall()

    cursor.close()
    db.close()

    return products

@app.get("/products/{product_id}")
def get_product(product_id: int):
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)

    cursor.execute(
        "SELECT * FROM products WHERE id = %s",
        (product_id,)
    )

    product = cursor.fetchone()

    cursor.close()
    db.close()

    return product