import { IoMdCheckmark } from "react-icons/io";
import StarRating from "./star-rating";
import { TReview } from "@/sections/product-details/all-reviews";

const TestimonialCard = ({ review }: { review: TReview }) => {
  return (
    <div className="min-h-[220px] min-w-[400px] flex flex-col justify-between rounded-xl border border-black/10 p-8">
      <div className=" space-y-4">
        <div className="flex items-center gap-3 ">
          <p className="text-xl font-bold">
            {review.firstName + " " + review.lastName}
          </p>

          <div className="flex size-6 items-center justify-center rounded-[50%] bg-green-450">
            <IoMdCheckmark className="rounded-full" size={16} color="#FFFF" />
          </div>
        </div>

        <p className="text-black/60">{review.review}</p>
      </div>

      <StarRating className=" " rating={review.rating || 0} />
    </div>
  );
};

export default TestimonialCard;
