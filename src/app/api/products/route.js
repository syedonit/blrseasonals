import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Construct the absolute path to your JSON file
    const filePath = path.join(process.cwd(), 'public', 'data', 'products.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const products = JSON.parse(fileContents);
    
    return NextResponse.json(products);
  } catch (error) {
    // If the file is missing or has an error, return an empty array
    console.error('Error loading products:', error);
    return NextResponse.json({ error: 'Products not found' }, { status: 500 });
  }
}
