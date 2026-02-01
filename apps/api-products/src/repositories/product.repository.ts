import type { Product } from "../entities/product.entity.js";
import type { IProductRepository } from "../interfaces/repository.interface.js";

export class ProductRepository implements IProductRepository {
  async getAll(): Promise<Product[]> {
    return [];
  }

  async getById(id: string): Promise<Product> {
    return {
      id: "awedsff12",
      name: "Carne Re",
      price: 100,
    };
  }
}