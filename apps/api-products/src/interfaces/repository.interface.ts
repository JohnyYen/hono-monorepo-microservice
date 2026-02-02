import type { Product } from "../entities/product.entity.js";
import type { IRepository as IBaseRepository } from "@ignix/core";

// Extend the base IRepository from @ignix/core
export interface IProductRepository extends IBaseRepository<Product> {
  // You can add product-specific repository methods here if needed,
  // but for now, it just inherits all methods from IBaseRepository.
  // We keep getAll and getById for backward compatibility if they are used elsewhere
  // but they are functionally redundant with findAll and findById from IBaseRepository
  // If not used, they can be removed.
  getAll(): Promise<Product[]>;
  getById(id: number | string): Promise<Product | null>;
}
