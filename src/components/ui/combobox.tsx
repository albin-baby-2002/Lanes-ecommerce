"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface TProps {
  label?: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  showSearch?: boolean;
  className?:string
}

export const Combobox: React.FC<TProps> = ({
  label,
  options,
  value,
  onChange,
  showSearch = false,
  className
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("lg:w-[200px] justify-between",className)}
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : label || "Select Option"}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" w-[150px] lg:w-[200px] ml-[18px] sm:ml-0 sm:mr-[18px]  p-0">
        <Command>
          {showSearch && (
            <CommandInput placeholder="Search option..." className="h-9" />
          )}
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {option.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
