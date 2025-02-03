import {prisma} from "../data"
import ServiceError from '../core/serviceError'; 
import handleDBError from './_handelDBError';
import { Product, ProductCreateInput, ProductUpdateInput } from "../types/product";

export const getAll = async () : Promise<Product[]>=> {
   return prisma.product.findMany({
      include : {
         category : true,
         supplier : true,
      }
   });
}

export const getById = async (id: number) : Promise<Product> => {
   const product = await prisma.product.findUnique({
     where: {
       productId : id,
     },
     include : {
      category : true,
      supplier : true,
     }
   });

   if (!product){
      throw ServiceError.notFound("No product with this Id exists");
   }

   return product
}

export const create = async (product : ProductCreateInput) : Promise<Product> => {
   try {
      return prisma.product.create({
         data : product
      })
   } catch (error : any){
      throw handleDBError(error)
   }

}

export const updateById = async (id: number, productChanges: ProductUpdateInput) : Promise<Product> => {
   const product = await prisma.product.findUnique({
     where: {
       productId : id,
     },
     include : {
      category : true,
      supplier : true,
     }
   });

   if (!product){
      throw ServiceError.notFound("No product with this Id exists")
   } 
   
   const updatedProduct = await prisma.product.update({
      where: {
         productId: id,
      },
      data: productChanges
   });

   return updatedProduct;
 };

 export const deleteById = async (id: number) : Promise<void> => {
   const product = await prisma.user.findUnique({
      where: {
        userId : id,
      }
    });

    if (!product){
      throw ServiceError.notFound("No product with this Id exists")
   } 

   await prisma.product.delete({
      where: {
         productId: id,
      }
   });
};
