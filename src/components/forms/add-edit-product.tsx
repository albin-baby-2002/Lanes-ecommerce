import React, { useEffect } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import CustomInputField, { FormFieldType } from "../custom-input";
import { FieldArrayWithId, UseFormReturn } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { ON_DISCOUNT_OPTIONS } from "./add-edit-category";
import { SelectItem } from "../ui/select";
import { Input } from "../ui/input";
import FileUploader from "../file-uploader";

interface TProps {
  form: UseFormReturn<any>;
  productVariantFields: TProductVariantField;
  currentPage: number;
}

type TProductVariantField = FieldArrayWithId<
  {
    categories: string[];
    description: string;
    name: string;
    discount: number;
    onDiscount: "True" | "False";
    productVariants: {
      size: string;
      color: string;
      inventoryCount: number;
      price: number;
      onSale: "True" | "False";
      productVariantImages: string[];
    }[];
  },
  "productVariants",
  "id"
>[];

const AddEditProductForm: React.FC<TProps> = ({
  form,
  productVariantFields,
  currentPage,
}) => {
  // redux states and hooks

  const dispatch = useDispatch<AppDispatch>();

  const { categoryOptions } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    console.log(productVariantFields, "prdvar");
  }, [productVariantFields]);

  return (
    <Form {...form}>
      <form className="grid w-full gap-4">
        {currentPage === 0 && (
          <>
            <CustomInputField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name="name"
              placeholder="Enter Product Name"
              label="Product Name"
            />

            <CustomInputField
              control={form.control}
              fieldType={FormFieldType.TEXTAREA}
              name="description"
              placeholder="Type Your Description"
              label="Description"
            />

            <div className="flex gap-3">
              <CustomInputField<string>
                control={form.control}
                fieldType={FormFieldType.MULTI_SELECT}
                options={categoryOptions}
                name="categories"
                placeholder="Select Category"
                label="Categories"
              />

              <CustomInputField
                control={form.control}
                fieldType={FormFieldType.SELECT}
                name="onDiscount"
                placeholder="Select"
                label="On Discount"
              >
                {ON_DISCOUNT_OPTIONS.map((item) => (
                  <SelectItem
                    key={item.label}
                    value={item.Value}
                    className="cursor-pointer hover:bg-slate-600"
                  >
                    <div className="flex items-center gap-2">
                      <p>{item.label}</p>
                    </div>
                  </SelectItem>
                ))}
              </CustomInputField>
            </div>

            <CustomInputField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name="discount"
              placeholder="10"
              dataType="number"
              label="Discount (%)"
            />
          </>
        )}

        {currentPage >= 1 && (
          <ProductVariant form={form} currentPage={currentPage} />
        )}
      </form>
    </Form>
  );
};

export default AddEditProductForm;

const ProductVariant = ({
  currentPage,
  form,
}: {
  currentPage: number;
  form: UseFormReturn<any>;
}) => {
  return (
    <>
      <div className="mb-4 font-medium">Base Variant Details</div>

      <div className="flex gap-3">
        <CustomInputField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name={`productVariants.${currentPage - 1}.color`}
          placeholder="#2fas1"
          label="Color"
        />
        <CustomInputField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name={`productVariants.${currentPage - 1}.size`}
          placeholder="M/XL/L"
          label="Size"
        />
      </div>

      <div className="flex gap-3">
        <CustomInputField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name={`productVariants.${currentPage - 1}.inventoryCount`}
          placeholder="10"
          dataType="number"
          label="Inventory Count"
        />

        <CustomInputField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name={`productVariants.${currentPage - 1}.price`}
          placeholder="10"
          dataType="number"
          label="Price"
        />
      </div>

      <div className="flex gap-3">
        <CustomInputField
          control={form.control}
          fieldType={FormFieldType.SELECT}
          name={`productVariants.${currentPage - 1}.onSale`}
          placeholder="Select"
          label="On Discount"
        >
          {ON_DISCOUNT_OPTIONS.map((item) => (
            <SelectItem
              key={item.label}
              value={item.Value}
              className="cursor-pointer hover:bg-slate-600"
            >
              <div className="flex items-center gap-2">
                <p>{item.label}</p>
              </div>
            </SelectItem>
          ))}
        </CustomInputField>
      </div>

      <FileUploader />
    </>
  );
};
