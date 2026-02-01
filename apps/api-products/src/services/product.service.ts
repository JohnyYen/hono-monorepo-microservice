import type { Product } from "../entities/product.entity.js";
import type { IProductRepository } from "../interfaces/repository.interface.js";

export class ProductService {
  constructor(private readonly repo: IProductRepository) {}

  async getAllProducts() {
    return await this.repo.getAll();
  }

  async getByIdProduct(id : string) {
    return await this.repo.getById(id);
  }
}
