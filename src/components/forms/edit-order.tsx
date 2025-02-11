"use client";
import CustomInputField, { FormFieldType } from "@/components/custom-input";
import { Form } from "@/components/ui/form";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SelectItem } from "../ui/select";
import { PaymentStatusEnum, ShippingStatusEnum } from "@/lib/zod-schema";

const EditOrderForm = ({ form }: { form: UseFormReturn<any> }) => {
  return (
    <Form {...form}>
      <form className="grid w-full gap-4">
        <div className="flex w-full gap-5">
          <CustomInputField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="orderItemInternalId"
            disabled
            label="Order ID"
          />

          <CustomInputField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="price"
            disabled
            label="Price"
            dataType="number"
          />
        </div>

        <CustomInputField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="quantity"
          label="Quantity"
          dataType="number"
        />
        <CustomInputField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="total"
          label="Total"
          dataType="number"
        />

        <CustomInputField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="totalDiscount"
          label="Total Discount"
          dataType="number"
        />

        <div className="flex w-full gap-5">
          <CustomInputField
            control={form.control}
            fieldType={FormFieldType.SELECT}
            name="paymentStatus"
            placeholder="Select"
            label="Payment Status"
          >
            {Object.values(PaymentStatusEnum.Enum).map((item) => (
              <SelectItem
                key={item}
                value={item}
                className="cursor-pointer hover:bg-slate-600"
              >
                <div className="flex items-center gap-2">
                  <p>{item}</p>
                </div>
              </SelectItem>
            ))}
          </CustomInputField>

          <CustomInputField
            control={form.control}
            fieldType={FormFieldType.SELECT}
            name="shippingStatus"
            placeholder="Select"
            label="Shipping Status"
          >
            {Object.values(ShippingStatusEnum.Enum).map((item) => (
              <SelectItem
                key={item}
                value={item}
                className="cursor-pointer hover:bg-slate-600"
              >
                <div className="flex items-center gap-2">
                  <p>{item}</p>
                </div>
              </SelectItem>
            ))}
          </CustomInputField>
        </div>
      </form>
    </Form>
  );
};

export default EditOrderForm;
