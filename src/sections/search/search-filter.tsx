"use client";
import FilterIcon from "@/assets/icons/filter-icon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import React, { useEffect, useMemo, useState } from "react";

//------------------------------------------------------------------------

type TFilters = "category" | "gender" | "price-range";

const CATEGORIES = ["T-Shirts", "Shorts", "Shirts", "Jeans", "Hoodie"];

const PRICE_RANGE = {
  all: { min: 0, max: 99999 },
  "500-1000": { min: 500, max: 1000 },
  "1000-1500": { min: 1000, max: 1500 },
  "1500-2000": { min: 1500, max: 2000 },
};

const SIZES = ["S", "M", "L", "XL", "XXL"] as const;

const STYLES = ["Casual", "Formal", "Party", "Gym"] as const;

const SIZES_MAP = {
  S: "Small",
  M: "Medium",
  L: "Large",
  XL: "Extra Large",
  XXL: "XXL",
};

type TPriceRangeKeys = keyof typeof PRICE_RANGE;

type TSizes = (typeof SIZES)[number];

type TStyles = (typeof STYLES)[number];
//------------------------------------------------------------------------

const SearchFilter = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const searchParams = useSearchParams();

  const router = useRouter();
  const sizesParams = searchParams.get("sizes");
  const stylesParams = searchParams.get("styles");

  const [sizes, setSizes] = useState<TSizes[]>([]);
  const [styles, setStyles] = useState<TStyles[]>([]);

  const selectedPriceRange = useMemo(() => {
    let range = "";

    for (const [key, value] of Object.entries(PRICE_RANGE)) {
      if (
        value.max === Number(searchParams.get("max-price")) &&
        value.min === Number(searchParams.get("min-price"))
      ) {
        range = key;
        break;
      }
    }

    return range;
  }, [searchParams]);

  const handleSizeChange = (val: TSizes) => {
    if (!sizes.includes(val)) {
      setSizes((prev) => {
        return [...prev, val];
      });
      return;
    }

    setSizes((prev) => {
      return prev.filter((item) => item !== val);
    });
  };

  const handleFilterChange = (val: string, filter: TFilters) => {
    console.log("handle filter change called");
    const params = new URLSearchParams(searchParams.toString());

    switch (filter) {
      case "category":
        params.set("category", val);
        break;

      case "gender":
        params.set("gender", val);
        break;

      case "price-range":
        params.set("min-price", PRICE_RANGE[val as TPriceRangeKeys].min + "");
        params.set("max-price", PRICE_RANGE[val as TPriceRangeKeys].max + "");
        break;
    }

    params.set("page", "1");
    router.push("/search?" + params, { scroll: false });
  };

  const handleStylesChange = (val: TStyles) => {
    if (!styles.includes(val)) {
      setStyles((prev) => {
        return [...prev, val];
      });
      return;
    }

    setStyles((prev) => {
      return prev.filter((item) => item !== val);
    });
  };

  useEffect(() => {
    setSizes((sizesParams?.split(",") as TSizes[]) || []);

    setStyles((stylesParams?.split(",") as TStyles[]) || []);
  }, [sizesParams, stylesParams]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("sizes", sizes.join(","));
    params.set("page", "1");
    router.push("/search?" + params, { scroll: false });

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sizes]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("styles", styles.join(","));
    params.set("page", "1");
    router.push("/search?" + params, { scroll: false });
  }, [styles]);

  return (
    <div
      className={cn(
        "absolute left-0 top-0 z-50 block min-h-screen w-screen -translate-y-[100%] bg-white p-4 transition-all duration-300 ease-in md:static md:z-0 md:w-auto md:translate-y-0 md:p-0",
        {
          "translate-y-0": open,
        },
      )}
    >
      <div className="h-max rounded-2xl border-black/10 px-4 pt-4 md:border">
        <div>
          {/* heading  */}

          <div className="flex items-center justify-between border-b border-black/10 pb-4">
            <p className="font-bold">Filters</p>
            <div className="hidden md:block">
              <FilterIcon />
            </div>
            <div className="md:hidden">
              <X
                onClick={onClose}
                size={20}
                strokeWidth={2.8}
                className="cursor-pointer md:hidden"
              />
            </div>
          </div>

          {/* select category */}

          <RadioGroup
            onValueChange={(val) => {
              handleFilterChange(val, "category");
            }}
            value={searchParams.get("category") || ""}
            className="space-y-2 border-b py-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={""} id={"all"} />
              <Label htmlFor={"all"} className="text-black/60">
                All Products
              </Label>
            </div>
            {CATEGORIES.map((val, idx) => {
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

          {/* gender select */}
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-bold hover:no-underline">
                Gender
              </AccordionTrigger>{" "}
              <AccordionContent>
                {" "}
                <RadioGroup
                  onValueChange={(val) => {
                    handleFilterChange(val, "gender");
                  }}
                  value={searchParams.get("gender") || ""}
                  className="space-y-2 pb-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={""} id={"all"} />
                    <Label htmlFor={"all"} className="text-black/60">
                      All
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={"Men"} id={"Men"} />
                    <Label htmlFor={"Men"} className="text-black/60">
                      Men
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={"Women"} id={"Women"} />
                    <Label htmlFor={"Women"} className="text-black/60">
                      Women
                    </Label>
                  </div>
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* price select */}

          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-bold hover:no-underline">
                Price
              </AccordionTrigger>
              <AccordionContent>
                <RadioGroup
                  onValueChange={(val) => {
                    handleFilterChange(val, "price-range");
                  }}
                  value={selectedPriceRange}
                  className="space-y-2 pb-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={"all"} id={"all"} />
                    <Label htmlFor={"all"} className="text-black/60">
                      All Range
                    </Label>
                  </div>

                  {Object.keys(PRICE_RANGE).map((val, idx) => {
                    if (val === "all") return null;
                    return (
                      <div
                        key={idx + val}
                        className="flex items-center space-x-2"
                      >
                        <RadioGroupItem value={val} id={val} />
                        <Label htmlFor={val} className="text-black/60">
                          {"₹" + val}
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
                {SIZES.map((val, idx) => {
                  return (
                    <div
                      onClick={() => handleSizeChange(val)}
                      key={idx + val}
                      className={cn(
                        "cursor-pointer rounded-3xl bg-ceramic px-4 py-2 text-sm text-black/70",
                        {
                          "bg-black text-white": sizes && sizes.includes(val),
                        },
                      )}
                    >
                      {SIZES_MAP[val] || val}
                    </div>
                  );
                })}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* dress style */}

          <Accordion type="single" collapsible>
            <AccordionItem className="border-b" value="item-1">
              <AccordionTrigger className="font-bold hover:no-underline">
                Dress Style
              </AccordionTrigger>
              <AccordionContent className="Grid gap-3 space-y-4">
                {STYLES.map((val, idx) => {
                  return (
                    <div key={idx} className="flex items-center space-x-2">
                      <Checkbox
                        id={val}
                        checked={styles.includes(val)}
                        onCheckedChange={() => {
                          handleStylesChange(val);
                        }}
                      />
                      <label
                        htmlFor={val}
                        className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {val}
                      </label>
                    </div>
                  );
                })}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div
            onClick={() => {
              router.push("/search");
            }}
            className="mb-1 flex cursor-pointer items-center justify-center gap-3 py-6 text-black/80 md:py-[20px]"
          >
            <p className="font-bold">Clear Filters</p>
            <X
              size={20}
              strokeWidth={2.8}
              className="mt-[2px] hidden md:flex"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
