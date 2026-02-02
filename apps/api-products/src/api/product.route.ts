import { Hono } from "hono";
import { ProductService, ResultProductService } from "../services/product.service.js";
import { ProductRepository } from "../repositories/product.repository.js";
import { createRoutes, APIHandler, type IAPIHandler, type IRepository, type IService, type ServiceError } from '@ignix/core'
import type { Product } from "../entities/product.entity.js";
import type { CreateProductDTO, ResponseProductDTO, UpdateProductDTO } from "./dto/product.dto.js";

const router = new Hono()

const service = new ProductService(new ProductRepository());

router.get('/', async (c) => {
  const products = await service.getAllProducts();
  return c.json(products);
});

router.get('/:id', async (c) => {
  const id = c.req.param("id");
  
  const product = await service.getByIdProduct(id);
  return c.json(product)
})

router.post('/', async (c) => {
  const body = await c.req.json();
  const product = await service.createProduct(body);
  return c.json(product);
})

router.put('/:id', async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json<UpdateProductDTO>();
  
  const product = await service.updateProduct(id, body);
  return c.json(product);
})

router.delete('/:id', async (c) => {
  const id = c.req.param("id");
  const product = await service.deleteProduct(id);
  return c.json(product);
})

export default router;
