import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Read the file directly from the filesystem
    const filePath = path.join(process.cwd(), 'public', 'data', 'products.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const products = JSON.parse(fileContents);
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error loading products:', error);
    // Return empty array if file doesn't exist
    return NextResponse.json([]);
  }
}
