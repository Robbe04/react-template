import useSWR from "swr";
import * as api from "../../api/index";
import Product from "../../components/products/Product";
import AsyncData from "../../components/AsyncData";

export default function ProductsList() {
  const { data: products = [], isLoading: loading, error } = useSWR("products", api.getAll);

  return (
    <div className="container mt-4">
    <AsyncData error={error} loading={loading}>
      {Array.isArray(products) && products.length > 0 ? (
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))", 
          gap: "1rem", 
          justifyContent: "center" 
        }}>
          {products.map((product) => (
            <Product key={product.productId} product={product} />
          ))}
        </div>
      ) : (
        <p>No products available</p>
      )}
    </AsyncData>
    </div>
  );
}
