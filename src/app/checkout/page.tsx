"use client";
import BreadCrumb from "@/components/breadcrumb";
import CustomInputField, { FormFieldType } from "@/components/custom-input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BillingAddressSchema } from "@/lib/schemas";
import {  useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
const Checkout = () => {
  const form = useForm<z.infer<typeof BillingAddressSchema>>({
    resolver: zodResolver(BillingAddressSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });
  return (
    <div className="min-h-[calc(100vh-90px)]">
      <BreadCrumb routes={["Home", "Cart", "CheckOut"]} />

      <p className="font-integral_cf text-2xl font-bold tracking-wide">
        CHECKOUT
      </p>

      <div className="mt-8 flex gap-6">
        <div className="basis-[70%]">
          <Accordion type="single" className="border px-4" collapsible>
            <AccordionItem value="item-1" className="border-none">
              <AccordionTrigger className="font-bold hover:no-underline">
                Billing Addresss
              </AccordionTrigger>
              <AccordionContent className="flex flex-wrap gap-3">
                <Form {...form}>
                  <form>
                    <CustomInputField
                      control={form.control}
                      fieldType={FormFieldType.INPUT}
                      name="name"
                    />
                  </form>
                </Form>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="basis-[30%] border bg-ceramic">
          <p>Your Order</p>
        </div>
      </div>
    </div>
  );
};
export default Checkout;
