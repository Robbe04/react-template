import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import * as api from "../../api/index";
import AsyncData from '../../components/AsyncData';
import * as helpers from "../../../helpers/helpers";

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
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <div className="card" style={{ width: '18rem' }}>
          <img 
            src={product.image ? `${baseApiUrl}/img/${product.image}` : "/placeholder.jpg"} 
            alt={`Picture of product: ${product.productName}`} 
            onError={(e) => e.target.src = "/placeholder.jpg"} // Fallback bij error
          />
          <div className="card-body text-center">
            <h5 className="card-title">{product.productName}</h5>
            <p className="card-text">{product.description || 'No description available'}</p>
            <p className="card-text">
              Delivered by: {product.supplier.firstName} {product.supplier.lastName}
            </p>
            <button className="btn btn-primary">More Info</button>
          </div>
        </div>
      </div>
    </AsyncData>
  );
}
