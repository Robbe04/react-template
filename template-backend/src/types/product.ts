import type { ListResponse } from './common';

export interface Product {
  productId : number
  productName : string
  unitPrice : number
  categoryId : number
  supplierId : number
  image : string,
  unitsInStock : number,
}

export interface ProductCreateInput {
  productName : string
  unitPrice : number
  categoryId : number
  supplierId : number
  image : string,
  unitsInStock : number,
}

export interface ProductUpdateInput extends ProductCreateInput {}

export interface CreateProductRequest extends ProductCreateInput {}
export interface UpdateProductRequest extends ProductUpdateInput {}

export interface GetAllProductsResponse extends ListResponse<Product> {}
export interface GetProductByIdResponse extends Product {}
export interface CreateProductResponse extends GetProductByIdResponse {}
export interface UpdateProductResponse extends GetProductByIdResponse {}
