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
    return <div className="text-center py-5"><p className="alert alert-warning">Product met ID {idNumber} is niet gevonden</p></div>;
  }
  
  const handelTerugNaarVorigePagina = () => {
    helpers.handelTerugNaarVorigePagina();
  }

  return (
    <AsyncData error={error} loading={isLoading}>
      <div className="container d-flex align-items-center justify-content-center min-vh-100">
        <div className="card shadow-lg p-4" style={{ maxWidth: '600px', width: '100%' }}>
          <div className="row g-3">
            <div className="col-12 text-center">
              <img 
                src={product.image ? `${baseApiUrl}/img/${product.image}` : '/placeholder.jpg'} 
                alt={`Picture of product: ${product.productName}`} 
                className="img-fluid rounded border"
                style={{ maxHeight: '250px', objectFit: 'cover' }}
              />
            </div>
            <div className="col-12">
              <h3 className="border-bottom pb-2 text-center">{product.productName}</h3>
              <p className="text-muted text-center">{product.description || 'Geen beschrijving beschikbaar'}</p>
              <h5 className="fw-bold text-primary">Prijs: ${product.unitPrice.toFixed(2)}</h5>
              <h6 className="mt-3">Geleverd door:</h6>
              <p>
                <Link to={`/products/suppliers/${product.supplier.supplierId}`} className="text-decoration-none fw-bold">
                  {product.supplier.firstName} {product.supplier.lastName}
                </Link>
              </p>
              <button className='text-center btn btn-primary' onClick={handelTerugNaarVorigePagina}>
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </AsyncData>
  );
}
