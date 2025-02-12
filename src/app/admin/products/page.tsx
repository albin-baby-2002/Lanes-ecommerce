import ProductsView from "@/sections/admin/products/views/products-view";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const ProductsPage = async () => {
  return <ProductsView />;
};

export default ProductsPage;
