import ServiceError from '../core/serviceError';

const handleDBError = (error: any) => {
  const { code = '', message } = error;

  // code voor unieke waarden
  if (code === 'P2002') {
    switch (true) {
      case message.includes('user.emailadres'): 
        throw ServiceError.validationFailed('There is already a user with this email address');
      case message.includes('supplier.company'):
        throw ServiceError.validationFailed('A supplier with this company name already exists');
      case message.includes('product.productName'):
        throw ServiceError.validationFailed('A product with this name already exists');
      case message.includes('category.categoryName'):
        throw ServiceError.validationFailed('A category with this name already exists');
      default:
        throw ServiceError.validationFailed('This item already exists');
    }
  }

  // code voor niet bestaande referenties
  if (code === 'P2025') {
    switch (true) {
      case message.includes('fk_product_supplier'):
        throw ServiceError.notFound('This supplier does not exist');
      case message.includes('fk_product_category'):
        throw ServiceError.notFound('This category does not exist');
      case message.includes('product'):
        throw ServiceError.notFound('No product with this id exists');
      case message.includes('supplier'):
        throw ServiceError.notFound('No supplier with this id exists');
      case message.includes('category'):
        throw ServiceError.notFound('No category with this id exists');
      case message.includes('user'):
        throw ServiceError.notFound('No user with this id exists');
    }
  }

  // code voor foreign key conflicten
  if (code === 'P2003') {
    switch (true) {
      case message.includes('categoryId'):
        throw ServiceError.conflict('This category does not exist or is still linked to products');
      case message.includes('supplierId'):
        throw ServiceError.conflict('This supplier does not exist or is still linked to products');
    }
  }

  throw error;
};

export default handleDBError;
