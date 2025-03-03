import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { BillingAddressSchema } from "@/lib/zod-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { addNewBillingAddress } from "@/lib/actions/client";
import Image from "next/image";
import { z } from "zod";
import AddEditAddressForm from "@/components/forms/add-edit-address";

export type TBillingAddressFormData = z.infer<typeof BillingAddressSchema>;

const AddNewAddress = () => {
  const router = useRouter();

  //local states

  const [submitting, setSubmitting] = useState(false);

  const { pending } = useFormStatus();

  const form = useForm<TBillingAddressFormData>({
    resolver: zodResolver(BillingAddressSchema),
  });

  async function onSubmit(data: TBillingAddressFormData) {
    try {
      setSubmitting(true);


      let resp = await addNewBillingAddress(data);

      if (!resp.success) {
        setSubmitting(false);
        return toast.error(resp.message);
      }

      toast.success("Successfully added new address");

      router.refresh();

      setSubmitting(false);

      form.reset({});

      router.refresh();
    } catch (error) {
      toast.error("Unexpected error! Try Again !");
      setSubmitting(false);
      console.log(error);
    }
  }

  return (
    <AccordionItem value="item-2" className="border px-4">
      <AccordionTrigger className="font-bold hover:no-underline">
        Add New Address
      </AccordionTrigger>
      <AccordionContent className="flex flex-wrap gap-3 border-t px-1 py-4">
        <AddEditAddressForm form={form} />

        <Button
          className="my-4"
          onClick={form.handleSubmit(onSubmit, (e) => {
            const firstKey = Object.keys(e)[0];

            // @ts-ignore not needed to check for undefined
            toast.error(firstKey + ' '+e[firstKey].message );
          })}
        >
          {" "}
          {(submitting || pending) && (
            <Image
            unoptimized
              height={24}
              width={24}
              className="mr-2"
              alt="svg"
              src={"/loaders/circular-loader.svg"}
            />
          )}
          Create Address
        </Button>
      </AccordionContent>
    </AccordionItem>
  );
};

export default AddNewAddress;
