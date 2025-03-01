import ProductViewById from "@/sections/product-details/views/product-view-by-id";

type TProps = { params: { id: string } };

const ProductDetails = ({ params }: TProps) => {
  return <ProductViewById id={params.id} />;
};

export default ProductDetails;
