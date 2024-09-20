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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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
          <Accordion
            className="space-y-4"
            defaultValue="item-1"
            type="single"
            collapsible
          >
            <AccordionItem value="item-1" className="border px-4">
              <AccordionTrigger className="font-bold hover:no-underline">
                Billing Addresss
              </AccordionTrigger>
              <AccordionContent className="flex flex-wrap gap-3 border-t">
                <RadioGroup
                  defaultValue="comfortable "
                  className="space-y-5 py-4 text-lg"
                >
                  <div className="flex space-x-4">
                    <RadioGroupItem className="mt-2" value={"cod"} id={"cod"} />
                    <div className="font-medium">
                      <p>Flat 45/5, 22 Sector</p>
                      <p> North Junction</p>
                      <p> New Delhi, India</p>
                      <p>Pincode : 6846288</p>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <RadioGroupItem className="mt-2" value={"cod"} id={"cod"} />
                    <div className="font-medium">
                      <p>Flat 45/5, 22 Sector</p>
                      <p> North Junction</p>
                      <p> New Delhi, India</p>
                      <p>Pincode : 6846288</p>
                    </div>
                  </div>
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border px-4">
              <AccordionTrigger className="font-bold hover:no-underline">
                Add New Address
              </AccordionTrigger>
              <AccordionContent className="flex flex-wrap gap-3 border-t px-1 py-4">
                <Form {...form}>
                  <form className=" grid gap-4 w-full">
                    <div className=" flex w-full  gap-5">
                      <CustomInputField
                        control={form.control}
                        fieldType={FormFieldType.INPUT}
                        name="name"
                        placeholder="37-B, SkyLine Axios"
                        label="First Name"
                      />
                      <CustomInputField
                        control={form.control}
                        fieldType={FormFieldType.INPUT}
                        name="name"
                        placeholder="37-B, SkyLine Axios"
                        label="Last Name"
                      />
                    </div>
                      <CustomInputField
                        control={form.control}
                        fieldType={FormFieldType.INPUT}
                        name="name"
                        placeholder="37-B, SkyLine Axios"
                        label="AddressLine"
                      />
                  </form>
                </Form>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="basis-[30%] border bg-ceramic p-6">
          <p className="border-b border-black pb-4 font-bold">Your Order</p>

          <div className="mt-6 grid gap-4 border-b border-black/30 pb-4">
            <div className="flex font-semibold">
              <div className="basis-3/4">
                <p>Product</p>
              </div>
              <div className="basis-1/4 text-right">
                <p>Total</p>
              </div>
            </div>

            {/* products */}

            <div className="flex">
              <div className="basis-3/4">
                <p>Tshirt - Polo</p>
              </div>
              <div className="basis-1/4 text-right">
                <p>$45</p>
              </div>
            </div>

            <div className="flex">
              <div className="basis-3/4">
                <p>Tshirt - Polo</p>
              </div>
              <div className="basis-1/4 text-right">
                <p>$45</p>
              </div>
            </div>
          </div>
          <div className="mt-4 flex border-b border-black/30 pb-4 font-semibold text-slate-500">
            <div className="basis-2/3">
              <p> Shipping</p>
            </div>
            <div className="basis-1/3 text-right">
              <p>Free Shipping</p>
            </div>
          </div>
          <div className="mt-4 flex pb-4 font-semibold">
            <div className="basis-2/3">
              <p> Grand Total</p>
            </div>
            <div className="basis-1/3 text-right">
              <p>$45</p>
            </div>
          </div>

          <p className="mt-4 font-bold text-slate-500">Your Payment Method</p>
          <RadioGroup
            defaultValue="comfortable "
            className="space-y-2 py-4 text-lg"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={"cod"} id={"cod"} />
              <Label
                htmlFor={"cod"}
                className="text-base font-bold text-black/60"
              >
                Cash On Delivery
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value={"online payment"} id={"online payment"} />
              <Label
                htmlFor={"online payment"}
                className="text-base font-bold text-black/60"
              >
                Online Payment
              </Label>
            </div>
          </RadioGroup>
          <p className="mt-4 text-slate-500">
            Disclaimer: Cancelling the order after 2 days of placing the order
            will attract cancellation charges
          </p>
          <Button className="mt-6 h-auto w-full py-4 text-base font-bold">
            Place Your Order
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Checkout;
