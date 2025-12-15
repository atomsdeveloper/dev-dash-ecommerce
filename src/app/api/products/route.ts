// Instance
import { InstanceStoreRepository } from "../../../repositories/store";

// Next Server
import { NextResponse } from "next/server";

export async function GET() {
  const products = await InstanceStoreRepository.findAllProducts();

  return NextResponse.json(products);
}
