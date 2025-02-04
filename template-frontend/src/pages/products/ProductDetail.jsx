import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import * as api from "../../api/index";
import AsyncData from '../../components/AsyncData';
import * as helpers from "../../../helpers/helpers";
import { Link } from 'react-router-dom';
const baseApiUrl = helpers.VITE_API_URL;

export default function ProductDetail() {
  const { id } = useParams();
  const idNumber = Number(id);

  const { data: products = [], error, isLoading } = useSWR("products", api.getAll);

  const product = products.find(product => product.productId === idNumber);
  
  if (!product) {
    return <p>Product met id {idNumber} is niet gevonden</p>;
  }

  return (
<AsyncData error={error} loading={isLoading}>
  <div className="d-flex align-items-center justify-content-center min-vh-100">
    <div className="border border-light p-4" style={{ maxWidth: '600px', width: '100%' }}>
      <div className="d-flex align-items-start">
        <div className="product-image me-3">
          <img 
            src={product.image ? `${baseApiUrl}/img/${product.image}` : '/placeholder.jpg'} 
            alt={`Picture of product: ${product.productName}`} 
            className="img-fluid"
          />
        </div>
        <div className="product-details flex-grow-1 d-flex flex-column">
          <h3 className="border-bottom pb-2 mb-3">{product.productName}</h3>
          <div className="mt-auto">
            <h5>Delivered by: <Link to={`/products/suppliers/${product.supplier.supplierId}`}>{product.supplier.firstName} {product.supplier.lastName}</Link></h5>
            <p>{product.description || 'No description available'}</p>
            <p>Price: ${product.unitPrice}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</AsyncData>
  );
}
