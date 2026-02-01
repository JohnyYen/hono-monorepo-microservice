import type { Product } from "../entities/product.entity.js";

export interface IRepository<T> {
  getAll(): Promise<T[]>;
  getById(id: number | string): Promise<T>;
}

export interface IProductRepository extends IRepository<Product>{}