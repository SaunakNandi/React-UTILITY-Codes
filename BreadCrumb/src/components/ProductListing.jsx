import { useLocation } from "react-router-dom";
import ProductComponent from "./ProductComponent";

export default function ProductListing() {
  const location = useLocation();
  const { data } = location.state || null;
  return <>{data && <ProductComponent products={data} />}</>;
}
