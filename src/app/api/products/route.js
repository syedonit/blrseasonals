import { NextResponse } from 'next/server';

// DO NOT hardcode - use environment variables
// Go to Vercel and add these:
// DATABASE_URL = postgresql://neondb_owner:npg_jS12UmbGeLQs@ep-wild-field-a6iyz9fw-pooler.us-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require
export async function GET() {
  try {
    // If you have a PostgreSQL driver installed:
    // npm install @vercel/postgres
    
    // Option 1: If using @vercel/postgres
    // const { sql } = require('@vercel/postgres');
    // const products = await sql`SELECT * FROM products`;
    
    // Option 2: If using direct fetch (if Neon exposes REST API)
    // For now, return test data until we connect properly
    const products = [
      { id: 1, title: "Test Product", price: 100, mrp: 200 },
      // ... your products here
    ];
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
  }
}
