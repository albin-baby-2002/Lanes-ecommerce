"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import MinusIcon from "@/assets/icons/minus-icon";
import PlusIcon from "@/assets/icons/plus-icon";
import { toast } from "sonner";

const AddToCart = () => {
  const [count, setCount] = useState(1);

  const increment = () => {
    if (count < 5) {
      setCount((count) => count + 1);
    } else {
      toast.error("You cannot order more than 5 items at a time");
    }
  };

  const decrement = () => {
    if (count >1 ) {
      setCount((count) => count - 1);
    }
  };

  return (
    <div className="flex gap-5 pt-6 text-lg text-black/60">
      <div className="flex items-center gap-3 rounded-full bg-ceramic px-3">
        <Button onClick={decrement} size={"icon"} variant={"ghost"}>
          <MinusIcon />
        </Button>

        <p>{count}</p>

        <Button size={"icon"} variant={"ghost"} onClick={increment}>
          <PlusIcon />
        </Button>
      </div>

      <Button className="max-w-80 grow rounded-full py-[28px] text-lg">
        Add to Cart
      </Button>
    </div>
  );
};

export default AddToCart;
