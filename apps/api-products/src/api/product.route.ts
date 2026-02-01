import { Hono } from "hono";
import { ProductService } from "../services/product.service.js";
import type { IProductRepository } from "../interfaces/repository.interface.js";
import { ProductRepository } from "../repositories/product.repository.js";


export const router = new Hono()

const repo : IProductRepository = new ProductRepository()
const service = new ProductService(repo)

router.get('/', async (c) => {
  const products = await service.getAllProducts();
  return c.json(products);
});
