import type { IRepository } from "@ignix/core";
import type { Product } from "../entities/product.entity.js";
import productsData from "../data.json"; // Importa los datos de prueba

export class ProductRepository implements IRepository<Product> {
  // Asegúrate de que los datos sean una copia para no modificar el import directamente
  private products: Product[] = JSON.parse(JSON.stringify(productsData));
  private nextId: number =
    this.products.length > 0
      ? Math.max(...this.products.map((p) => Number(p.id))) + 1
      : 1;

  async findAll(options?: any): Promise<Product[]> {
    // Implementación simple para findAll.
    // Podrías añadir lógica para `options` (filtrado, paginación) aquí.
    return Promise.resolve([...this.products]); // Devuelve una copia para evitar mutaciones externas
  }

  async findById(id: string | number): Promise<Product | null> {
    const foundProduct = this.products.find(
      (product) => product.id === String(id),
    );
    return Promise.resolve(foundProduct ? { ...foundProduct } : null); // Devuelve una copia
  }

  async findOne(options: any): Promise<Product | null> {
    // Implementación básica, asumiendo que options puede ser un objeto con propiedades de Product
    // Ejemplo: findOne({ name: "Laptop" })
    const foundProduct = this.products.find((product) => {
      for (const key in options) {
        if ((product as any)[key] !== options[key]) {
          return false;
        }
      }
      return true;
    });
    return Promise.resolve(foundProduct ? { ...foundProduct } : null); // Devuelve una copia
  }

  async create(data: Omit<Product, "id">): Promise<Product> {
    const newProduct: Product = {
      id: String(this.nextId++), // ID simple autoincremental
      ...data,
    };
    this.products.push(newProduct);
    return Promise.resolve({ ...newProduct }); // Devuelve una copia
  }

  async update(
    id: string | number,
    data: Partial<Product>,
  ): Promise<Product | null> {
    const index = this.products.findIndex(
      (product) => product.id === String(id),
    );
    if (index === -1) {
      return Promise.resolve(null);
    }
    this.products[index] = { ...this.products[index], ...data };
    return Promise.resolve({ ...this.products[index] }); // Devuelve una copia del producto actualizado
  }

  async hardDelete(id: string | number): Promise<boolean> {
    const initialLength = this.products.length;
    this.products = this.products.filter(
      (product) => product.id !== String(id),
    );
    return Promise.resolve(this.products.length < initialLength);
  }

  async softDelete(id: string | number): Promise<boolean> {
    // Para una implementación real de soft delete, Product debería tener una propiedad 'deleted: boolean'
    // Para este ejemplo de datos en memoria, implementamos un hard delete,
    // ya que no hay un campo 'deleted' en la interfaz Product.
    return this.hardDelete(id);
  }

  async restore(id: string | number): Promise<boolean> {
    // La restauración solo tiene sentido si hay un soft delete real.
    // Como no hay soft delete en este ejemplo, no se puede restaurar.
    return Promise.resolve(false);
  }

  async count(options?: any): Promise<number> {
    // Implementación simple, devuelve el conteo total.
    // Podrías añadir lógica para `options` (filtrado) aquí.
    return Promise.resolve(this.products.length);
  }

  // Los métodos getAll y getById que tenías ya están cubiertos por findAll y findById
  // Si deseas mantenerlos para una interfaz específica (ej. IProductRepository), puedes adaptarlos:
  async getAll(): Promise<Product[]> {
    return this.findAll();
  }

  async getById(id: string): Promise<Product | null> {
    return this.findById(id);
  }
}
