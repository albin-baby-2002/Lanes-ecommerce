import ProductsView from "@/sections/admin/products/views/products-view";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const ProductsPage = async ({
  searchParams,
}: {
  searchParams: { search: string };
}) => {
  return <ProductsView search={searchParams.search || ""} />;
};

export default ProductsPage;
