import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import React, { ChangeEvent, useState } from "react";
import RatingInput from "./components/rating-input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { addReview } from "@/lib/actions/client";
import Image from "next/image";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";

interface TProps {
  open: boolean;
  variantId: string;
  handleClose: () => void;
}

const AddReview: React.FC<TProps> = ({ open, variantId, handleClose }) => {
  const { pending } = useFormStatus();

  const router = useRouter();

  //local states

  const [submitting, setSubmitting] = useState(false);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReview(e.target.value);
  };

  const handleRatingChange = (val: number) => {
    setRating(val);
  };

  const handleAddReview = async () => {
    try {
      setSubmitting(true);
      // submit logic for adding new category

      let resp = await addReview(variantId, review, rating);

      if (!resp?.success) {
        setSubmitting(false);
        return toast.error(resp?.message);
      }

      toast.success(resp.message);

      router.refresh();

      setSubmitting(false);
    } catch (error) {
      toast.error("Unexpected error! Try Again !");
      setSubmitting(false);
      console.log(error);
    }
  };
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4"> Add Your Review</DialogTitle>
          <DialogDescription>
            Your Review Will Be Posted Publicily
          </DialogDescription>
        </DialogHeader>
        <div className="pt-3">
          <RatingInput rating={rating} setRating={handleRatingChange} />
          <Textarea
            className="mt-4"
            value={review}
            onChange={onChange}
            placeholder="write your review here........"
          />
        </div>
        <DialogFooter>
          <div className="mt-2 w-full">
            <Button
            onClick={handleAddReview}
              className={cn("bg-ceramic text-black", {
                "bg-black text-white": submitting || pending,
              })}
            >
              {(submitting || pending) && (
                <Image
                  height={24}
                  width={24}
                  className="mr-2"
                  alt="svg"
                  src={"/loaders/circular-loader.svg"}
                />
              )}
              Add Review
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddReview;
