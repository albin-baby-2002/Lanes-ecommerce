import FilterIcon from "@/assets/icons/filter-icon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import React from "react";

const categories = ["T-shirts", "Shorts", "Shirts", "Jeans", "Hoodie"];

const prices = ["500-1000", "1000-1500", "1500-2000"];

const sizes = ["XX-Small", "X-Small", "Small", "Medium", "Large"];

const styles = ['Casual','Formal','Party','Gym']

const SearchFilter = () => {
  return (
    <div className="rounded-2xl border border-black/10 px-4 py-4 h-max">
      <div>
        {/* heading  */}

        <div className="flex items-center justify-between border-b border-black/10 pb-4">
          <p className="font-bold">Filters</p>
          <FilterIcon />
        </div>

        {/* select category */}

        <RadioGroup
          defaultValue="comfortable "
          className="space-y-2 border-b py-4"
        >
          {categories.map((val, idx) => {
            return (
              <div key={idx} className="flex items-center space-x-2">
                <RadioGroupItem value={val} id={val} />
                <Label htmlFor={val} className="text-black/60">
                  {val}
                </Label>
              </div>
            );
          })}
        </RadioGroup>

        {/* price select */}

        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-bold hover:no-underline">
              Price
            </AccordionTrigger>
            <AccordionContent>
              <RadioGroup
                defaultValue="comfortable "
                className="space-y-2 pb-4"
              >
                {prices.map((val, idx) => {
                  return (
                    <div key={idx} className="flex items-center space-x-2">
                      <RadioGroupItem value={val} id={val} />
                      <Label htmlFor={val} className="text-black/60">
                        {"$" + val}
                      </Label>
                    </div>
                  );
                })}
              </RadioGroup>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* sizes */}

        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-bold hover:no-underline">
              Sizes
            </AccordionTrigger>
            <AccordionContent className="flex flex-wrap gap-3">
              {sizes.map((val, idx) => {
                return (
                  <div
                    key={idx}
                    className="rounded-3xl bg-ceramic px-4 py-2 text-sm text-black/70"
                  >
                    {val}
                  </div>
                );
              })}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* dress style */}

        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-bold hover:no-underline">
              Dress Style
            </AccordionTrigger>
            <AccordionContent className="Grid space-y-4 gap-3">
              {styles.map((val, idx) => {
                return (
                  <div key={idx} className="flex items-center space-x-2">
                    <Checkbox id={val}  />
                    <label
                      htmlFor={val}
                      className=" font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {val}
                    </label>
                  </div>
                );
              })}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <div className=" pt-6 pb-2 flex justify-center">
            <Button className=" w-full rounded-full">Apply Filters</Button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
