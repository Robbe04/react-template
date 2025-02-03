import { KoaContext, KoaRouter, TemplateAppContext, TemplateAppState } from "../types/koa";
import * as productService from "../service/product"
import { IdParams } from "../types/common";
import Router from "@koa/router";
import Joi from "joi";
import validate from '../core/validation';
import { CreateProductRequest, CreateProductResponse, GetAllProductsResponse, GetProductByIdResponse, UpdateProductRequest, UpdateProductResponse } from "../types/product";


const getAllProducts = async (ctx: KoaContext<GetAllProductsResponse>) => {
   const products = await productService.getAll();
   ctx.body = {
     items: products,
   };
 };

 getAllProducts.validationScheme = null;

const getProductById = async (ctx : KoaContext<GetProductByIdResponse, IdParams>) => {
   const product = await productService.getById(Number(ctx.params.id));
   ctx.body = product
}

getProductById.validationScheme = {
   params: {
      id: Joi.number().integer().positive(),
   },
}

const createProduct = async (ctx : KoaContext<CreateProductResponse, void, CreateProductRequest>) => {
   const product = await productService.create(ctx.request.body);
   ctx.body = product;
   ctx.status = 201;
}

createProduct.validationScheme = {
   body : {
      productName : Joi.string(),
      lastName : Joi.string(),
      emailadres : Joi.string().email(),
   }
}

const updateProduct = async (ctx : KoaContext<UpdateProductResponse, IdParams, UpdateProductRequest>) => {
   const product = await productService.updateById(Number(ctx.params.id), ctx.request.body);
   ctx.body = product
}

updateProduct.validationScheme = {
   params : {
      id : Joi.number().integer().positive()
   },
   body : {
      productName: Joi.string(),
      unitPrice: Joi.number().positive(),
      categoryId: Joi.number().integer().positive(),
      supplierId: Joi.number().integer().positive(),
      image: Joi.string()
   }
}

const deleteProduct = async (ctx : KoaContext<void, IdParams>) => {
   await productService.deleteById(Number(ctx.params.id));
   ctx.status = 204; 
}

deleteProduct.validationScheme = {
   params : {
      id : Joi.number().integer().positive()
   }
}

export default (parent: KoaRouter) => {
   const router = new Router<TemplateAppState, TemplateAppContext>({
     prefix: '/products',
   });

   router.get("/", validate(getAllProducts.validationScheme), getAllProducts);
   router.get("/:id", validate(getProductById.validationScheme), getProductById);
   router.post("/", validate(createProduct.validationScheme), createProduct);
   router.put("/:id", validate(updateProduct.validationScheme), updateProduct);
   router.delete("/:id", validate(deleteProduct.validationScheme), deleteProduct);

   parent.use(router.routes()).use(router.allowedMethods());
};
