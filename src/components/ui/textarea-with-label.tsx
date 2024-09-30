import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent } from "react";

interface TProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}
export function TextareaWithLabel({
  label,
  placeholder,
  value,
  onChange,
}: TProps) {
  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="message">{label} </Label>
      <Textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        id="message"
      />
    </div>
  );
}
