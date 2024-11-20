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
import ileUploader from "../image-uploader";
import { LuPlus } from "react-icons/lu";
import { TbCameraPlus } from "react-icons/tb";
import { FaPlus } from "react-icons/fa";
import ImageUploader from "../image-uploader";
import { TProductData } from "@/sections/admin/products/add-edit-product-modal";
import { productVariantImages } from "@/drizzle/schema";
import { productsReducers } from "@/store/slices/admin/products";

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
  form: UseFormReturn<TProductData>;
}) => {
  const values = form.watch();

  const dispatch = useDispatch<AppDispatch>();

  const handleImage = (
    type: "add" | "delete",
    image?: string,
    imageIdx?: number,
  ) => {
    const productVariants = values.productVariants;
    const currentVariant = productVariants[currentPage - 1];

    let updatedImages;

    if (type === "delete" && imageIdx) {
      updatedImages =
        currentVariant?.productVariantImages?.filter(
          (val, idx) => idx !== imageIdx,
        ) || [];
    } else if (type === "add") {
      if (image && imageIdx !== undefined) {
        updatedImages = currentVariant?.productVariantImages?.map(
          (val, idx) => {
            return idx === imageIdx ? image : val;
          },
        );
      } else {
        updatedImages = [...currentVariant.productVariantImages, ""];
      }
    }

    const updatedVariant = {
      ...currentVariant,
      productVariantImages: updatedImages || [],
    };

    const updatedVariants = productVariants.map((val, idx) => {
      return idx === currentPage - 1 ? updatedVariant : val;
    });

    form.setValue("productVariants", updatedVariants);

    if (image) {
      dispatch(productsReducers.toggleShowAddProduct());
    }
  };

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

      <div className="text-[15px] text-black/80">Product Images</div>

      <div className="grid grid-cols-3 gap-y-4 gap-2">
        {values?.productVariants?.[currentPage - 1].productVariantImages?.map(
          (img, idx) => {
            return (
              <ImageUploader
                key={idx}
                imageUrl={img}
                handleDelete={() => {
                  handleImage("delete", "", idx);
                }}
                onSuccessfullUpload={(image) => handleImage("add", image, idx)}
                toggleModal={() =>
                  dispatch(productsReducers.toggleShowAddProduct())
                }
              />
            );
          },
        )}

        <AddImage onClick={() => handleImage("add")} />
      </div>
    </>
  );
};

const AddImage = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      onClick={onClick}
      className={`relative h-[185px] w-[135px] cursor-pointer rounded-[4px] border-[1px] border-input`}
    >
      <div className="flex h-full w-full items-center justify-center">
        <LuPlus className="cursor-pointer text-4xl text-gray-400" />
      </div>
    </div>
  );
};
