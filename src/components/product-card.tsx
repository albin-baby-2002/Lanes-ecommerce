import { useMemo } from "react";
import ProductCarousel, { TImg } from "./product-carousel";
import StarRating from "./star-rating";
import { Divide } from "lucide-react";

interface TProps {
  name: string;
  price: number;
  discount: number;
  rating: number;
  images: TImg[];
}

const ProductCard: React.FC<TProps> = ({
  name,
  price,
  discount,
  rating,
  images,
}) => {
  return (
    <div>
      <ProductCarousel images={images} />

      {/* product details */}

      <div className="my-3 grid">
        {/* text with animation */}

        <div className="group relative max-w-full overflow-hidden hover:mb-1 hover:overflow-visible">
          <p className="max-w-[70%] overflow-hidden text-ellipsis text-nowrap py-2 font-bold delay-100 duration-100 ease-linear group-hover:w-0">
            {name}
          </p>

          <p className="absolute top-0 z-50 max-w-0 overflow-hidden overflow-ellipsis text-nowrap bg-black py-2 font-bold text-white transition-all duration-200 ease-linear group-hover:max-w-[120%] group-hover:px-3">
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

// child component

const Pricing = ({ price, discount }: { price: number; discount: number }) => {
  const discountedPrice = useMemo(
    () => price - (price * discount) / 100,
    [price, discount],
  );

  return (
    <div className="mt-2 flex items-center gap-3">
      <p className="font-bold">${discount ? discountedPrice : price}</p>
      {discount && (
        <>
          <p className="font-bold text-black/40 line-through">${price}</p>
          <div className="flex items-center rounded-xl bg-red-100 px-2 py-[2px] text-red-500">
            <p className="mt-[1px] text-[8px]">-{discount}%</p>
          </div>
        </>
      )}
    </div>
  );
};
