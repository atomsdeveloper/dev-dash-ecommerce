// Methods Repository
import { PrismaStoreRepository } from "./prisma-store-repository";

// Interface
import { StoreRepository } from "./store-repository";

// Singleton Pattern
export const InstanceStoreRepository: StoreRepository =
  new PrismaStoreRepository();
