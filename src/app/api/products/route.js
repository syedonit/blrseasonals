import { Pool } from "pg";
import { NextResponse } from "next/server";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function GET() {
  try {
    const result = await pool.query(
      "SELECT * FROM products ORDER BY id"
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Database error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch products",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
