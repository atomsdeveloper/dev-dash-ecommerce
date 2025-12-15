// Instance
import { InstanceStoreRepository } from "../../../repositories/store";

// Next Server
import { NextResponse } from "next/server";

export async function GET() {
  const categories = await InstanceStoreRepository.findAllCategories();

  return NextResponse.json(categories);
}
