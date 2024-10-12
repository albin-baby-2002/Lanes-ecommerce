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
        <DialogFooter >
        <div className=" w-full mt-2">

          <Button className=" bg-ceramic text-black">Add Review</Button>
        </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddReview;
