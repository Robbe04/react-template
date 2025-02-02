import type { ListResponse } from './common';

export interface Supplier {
   supplierId : number
   firstName : String 
   lastName : String  
   company : String  
}

export interface SupplierCreateInput {
   firstName : String 
   lastName : String  
   company : String 
}

export interface SupplierUpdateInput extends SupplierCreateInput {}

export interface CreateSupplierRequest extends SupplierCreateInput {}
export interface UpdateSupplierRequest extends SupplierUpdateInput {}

export interface GetAllSuppliersResponse extends ListResponse<Supplier> {}
export interface GetSupplierByIdResponse extends Supplier {}
export interface CreateSupplierResponse extends GetSupplierByIdResponse {}
export interface UpdateSupplierResponse extends GetSupplierByIdResponse {}

