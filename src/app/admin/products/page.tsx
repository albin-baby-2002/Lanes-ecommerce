import ProductsView from "@/sections/admin/products/views/products-view";

interface TProps {
  searchParams: {
    search?: string;
  };
}

const ProductsPage = async ({ searchParams }: TProps) => {
  return <ProductsView search={searchParams.search || ""} />;
};

export default ProductsPage;
