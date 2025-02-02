import type { ListResponse } from './common';

export interface Category {
   categoryId : number
   categoryName : String
}

export interface CategoryCreateInput {
   categoryName : String
}

export interface CategoryUpdateInput extends CategoryCreateInput {}

export interface CreateCategoryRequest extends CategoryCreateInput {}
export interface UpdateCategoryRequest extends CategoryUpdateInput {}

export interface GetAllCategorysResponse extends ListResponse<Category> {}
export interface GetCategoryByIdResponse extends Category {}
export interface CreateCategoryResponse extends GetCategoryByIdResponse {}
export interface UpdateCategoryResponse extends GetCategoryByIdResponse {}
