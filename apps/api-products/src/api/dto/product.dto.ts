import type { Product } from "../../entities/product.entity.js";

export interface CreateProductDTO extends Omit<Product, 'id'> {
  
}

export interface UpdateProductDTO extends Partial<CreateProductDTO>{
  
}

export interface ResponseProductDTO extends Pick<Product, 'id' | 'name' | 'price'> {
  
}
