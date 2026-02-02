import { BaseService } from "@ignix/core";
import type { Product } from "../entities/product.entity.js";
import type { IProductRepository } from "../interfaces/repository.interface.js";
import type {
  CreateProductDTO,
  UpdateProductDTO,
} from "../api/dto/product.dto.js";

// Si `ResultProductService` necesita ser usado, asegúrate de que tenga los métodos
// necesarios o que `BaseService` los implemente y el `repo` se inyecte correctamente.
// Por ahora, asumimos que ProductService es el que se está usando para la lógica de negocio.
export class ResultProductService extends BaseService<Product> {}

export class ProductService {
  constructor(private readonly repo: IProductRepository) {}

  async getAllProducts(): Promise<Product[]> {
    return await this.repo.findAll(); // Usamos findAll del IRepository base
  }

  async getByIdProduct(id: string): Promise<Product | null> {
    return await this.repo.findById(id); // Usamos findById del IRepository base
  }

  async createProduct(data: CreateProductDTO): Promise<Product> {
    return await this.repo.create(data);
  }

  async updateProduct(
    id: string,
    data: UpdateProductDTO,
  ): Promise<Product | null> {
    return await this.repo.update(id, data);
  }

  async deleteProduct(id: string): Promise<boolean> {
    return await this.repo.hardDelete(id); // Usamos hardDelete del IRepository base
  }
}
