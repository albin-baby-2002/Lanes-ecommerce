import ProductViewById from "@/sections/product-details/views/product-view-by-id";

const ProductDetails = ({ params }: { params: { id: string } }) => {
  return <ProductViewById id={params.id} />;
};

export default ProductDetails;
