import { Link } from "react-router-dom";
import * as helpers from "../../../helpers/helpers";

const baseApiUrl = helpers.VITE_API_URL;

export default function Product({ product }) {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="text-center">
      <img
        src={`${baseApiUrl}/img/${product.image}`}
        alt={`Picture of product: ${product.productName}`}
        width={"200px"}
        height={"200px"}
        style={{objectFit : "cover"}}
      />
      </div>
      <div className="card-body">
        <h5 className="card-title">{product.productName}</h5>
        <p className="card-text">
          Delivered by:{" "}
          <Link to={`/products/suppliers/${product.supplier.supplierId}`}>
            {product.supplier.firstName} {product.supplier.lastName}
          </Link>
        </p>
        <p className="card-text">
          Price: ${product.unitPrice}
        </p>
        <div className="text-center">
          <Link to={`/products/${product.productId}`} className="btn btn-primary">
            View Product
          </Link>
        </div>
      </div>
    </div>
  );
}
