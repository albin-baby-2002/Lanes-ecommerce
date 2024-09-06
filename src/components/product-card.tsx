import Star from "@/assets/icons/star";
import ProductCarousel from "./product-carousel";

const ProductCard = () => {
  return (
    <div>
      <ProductCarousel
        images={[
          { url: "/images/products/p1.svg", alt: "product" },
          { url: "/images/products/p1.svg", alt: "product" },
          { url: "/images/products/p1.svg", alt: "product" },
        ]}
      />

      {/* product details */}

      <div className="my-4 grid gap-2">
        <div className="delay- group relative max-w-full overflow-hidden hover:overflow-visible">
          <p className="max-w-[70%] py-2 overflow-hidden text-ellipsis text-nowrap font-bold delay-100 duration-100 ease-linear group-hover:w-0 ">
            T-shirt with Tape Details of what we need 
          </p>

          <p className="absolute top-0 z-50 max-w-0 overflow-hidden overflow-ellipsis text-nowrap  py-2 font-bold transition-all duration-200 ease-linear bg-black text-white group-hover:max-w-[120%] group-hover:px-3 ">
            T-shirt with Tape Details of what we need 
          </p>
        </div>

        <p className="font-bold">$120</p>
        
        <Star/>
      </div>
    </div>
  );
};

export default ProductCard;
