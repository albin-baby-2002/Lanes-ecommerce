import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { TextareaWithLabel } from "@/components/ui/textarea-with-label";
import React, { ChangeEvent, useState } from "react";
import RatinInput from "./components/rating-input";
import RatingInput from "./components/rating-input";

interface TProps {
  open: boolean;
  handleClose: () => void;
}

const AddReview: React.FC<TProps> = ({ open, handleClose }) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReview(e.target.value);
  };

  const handleRatingChange = (val: number) => {
    setRating(val);
  };
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4"> Add Your Review</DialogTitle>
          <DialogDescription>
            Your Review Will Be Posted Publicily
          </DialogDescription>
          <div className=" pt-3">
            <RatingInput rating={rating} setRating={handleRatingChange} />
            <Textarea
            className=" mt-4"
              value={review}
              onChange={onChange}
              placeholder="write your review here........"
            />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddReview;