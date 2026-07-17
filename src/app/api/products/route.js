// TEMPORARILY COMMENTED OUT - MySQL connection issue
// const db = require('../../../lib


import productsData from '@/public/data/products.json';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(productsData);
}
