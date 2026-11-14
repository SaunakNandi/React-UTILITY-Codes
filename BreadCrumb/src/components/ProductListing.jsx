import { useLocation } from "react-router-dom";
import ProductComponent from "./ProductComponent";

export default function ProductListing() {
  const location = useLocation();
  const initialData = location.state?.data || null;
  const [products, setProducts] = useState(initialData);
  const [loading, setLoading] = useState(!initialData);

  useEffect(() => {
    // ⚡ 2. Fast-path: If HomePage already passed the data, skip the network call!
    if (products) return;

    // 🔄 3. Fallback: If user came from BreadCrumbs or refreshed, fetch the data!
    async function fetchProducts() {
      try {
        setLoading(true);
        const res = await fetch("https://dummyjson.com/products");
        const result = await res.json();
        setProducts(result.products);
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [products]);

  if (loading) return <p>Loading products...</p>;
  return <>{products && <ProductComponent products={products} />}</>;
}
