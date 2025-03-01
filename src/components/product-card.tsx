"use client";

import ProductCarousel from "./product-carousel";
import StarRating from "./star-rating";
import { Pricing } from "./pricing";
import { useRouter } from "next/navigation";

//--------------------------------------------------

interface TProps {
  name: string;
  price: number;
  discount: number;
  rating: number;
  images: string[];
  variantId: string;
}

//--------------------------------------------------

const ProductCard: React.FC<TProps> = ({
  name,
  price,
  discount,
  rating,
  images,
  variantId,
}) => {
  const router = useRouter();
  const handleNavigate = () => {
    router.push("/product-detail/" + variantId);
  };

  //--------------------------------------------------

  return (
    <div onClick={handleNavigate}>
      <ProductCarousel images={images} />
      <div className="my-3 grid text-sm">
        {/* text with animation */}

        <div className="group relative max-w-full overflow-hidden hover:mb-1 hover:overflow-visible">
          <p className="max-w-[70%] overflow-hidden text-ellipsis text-nowrap py-2 font-bold delay-100 duration-100 ease-linear group-hover:w-0">
            {name}
          </p>

          <p className="absolute top-0 z-50 max-w-0 overflow-hidden overflow-ellipsis text-nowrap bg-white py-2 font-bold transition-all duration-200 ease-linear group-hover:max-w-[120%]">
            {name}
          </p>
        </div>

        <StarRating rating={rating} />
        <Pricing price={price} discount={discount} />
      </div>
    </div>
  );
};

export default ProductCard;
