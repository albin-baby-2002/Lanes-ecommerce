import React, { useEffect } from "react";
import { Form } from "../ui/form";
import CustomInputField, { FormFieldType } from "../custom-input";
import { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { ON_DISCOUNT_OPTIONS } from "./add-edit-category";
import { SelectItem } from "../ui/select";
import { LuPlus } from "react-icons/lu";
import ImageUploader from "../image-uploader";
import { TProductData } from "@/sections/admin/products/add-edit-product-modal";
import { productsReducers } from "@/store/slices/admin/products";
import { MdAdd } from "react-icons/md";
import { Button } from "../ui/button";
import {  PiTrashBold } from "react-icons/pi";
import { cn } from "@/lib/utils";

//----------------------------------------------------------------------------------------------------

interface TProps {
  form: UseFormReturn<any>;
  productVariantFields: TProductVariantField;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

type TProductVariantField = UseFieldArrayReturn<
  {
    name: string;
    description: string;
    categories: string[];
    discount: number;
    onDiscount: boolean;
    productVariants: {
      color: string;
      size: string;
      inventoryCount: number;
      price: number;
      onSale: boolean;
      productVariantImages: string[];
    }[];
  },
  "productVariants",
  "id"
>;

//----------------------------------------------------------------------------------------------------

const AddEditProductForm: React.FC<TProps> = ({
  form,
  productVariantFields,
  currentPage,
  setCurrentPage,
}) => {
  // redux states and hooks

  const { categoryOptions } = useSelector((state: RootState) => state.products);

  const HandleVariant = (type: "add" | "delete") => {
    // add a new variant

    if (type === "add") {
      return productVariantFields.append({
        color: "",
        inventoryCount: 0,
        onSale: false,
        price: 0,
        productVariantImages: [],
        size: "",
      });
    }

    if (type === "delete") {
      productVariantFields.remove(currentPage - 1);
      return setCurrentPage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    console.log(productVariantFields);
  }, [productVariantFields]);

  //----------------------------------------------------------------------------------------------------

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
                dataType="boolean"
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

        {/*  product variant form  */}

        {currentPage >= 1 &&
          productVariantFields?.fields?.map((val, idx) => {
            return (
              <ProductVariant
                key={idx}
                HandleVariant={HandleVariant}
                form={form}
                currentPage={idx + 1}
                className={cn({ hidden: idx !== currentPage - 1 })}
              />
            );
          })}
      </form>
    </Form>
  );
};

export default AddEditProductForm;

//----------------------------------------------------------------------------------------------------

interface HandleImageParams {
  type: "add" | "delete";
  image?: string;
  imageIdx?: number;
}

interface TProductVariantProps {
  currentPage: number;
  HandleVariant: (type: "add" | "delete") => void;
  form: UseFormReturn<TProductData>;
  className?: string;
}

//----------------------------------------------------------------------------------------------------

const ProductVariant = ({
  currentPage,
  form,
  HandleVariant,
  className,
}: TProductVariantProps) => {
  // react hooks

  const values = form.watch();

  const dispatch = useDispatch<AppDispatch>();

  const productVariants = values.productVariants;

  const imageError =
    form?.formState?.errors?.productVariants?.[currentPage - 1]
      ?.productVariantImages?.message;

  //----------------------------------------------------------------------------------------------------

  // fn to handle image add or delete

  const handleImage = ({ type, image, imageIdx }: HandleImageParams) => {
    const currentVariant = productVariants[currentPage - 1];

    if (!currentVariant) return;

    const updateImages = () => {
      if (type === "delete" && imageIdx !== undefined) {
        // Remove image by index
        return (
          currentVariant.productVariantImages?.filter(
            (_, idx) => idx !== imageIdx,
          ) || []
        );
      }

      if (type === "add") {
        if (image && imageIdx !== undefined) {
          // Replace existing image by index
          return currentVariant.productVariantImages?.map((val, idx) =>
            idx === imageIdx ? image : val,
          );
        }
        // Add new empty image
        return [...(currentVariant.productVariantImages || []), ""];
      }

      return currentVariant.productVariantImages || [];
    };

    const updatedVariant = {
      ...currentVariant,
      productVariantImages: updateImages(),
    };

    const updatedVariants = productVariants.map((variant, idx) =>
      idx === currentPage - 1 ? updatedVariant : variant,
    );

    form.setValue("productVariants", updatedVariants);

    if (image && type === "add") {
      dispatch(productsReducers.toggleShowAddProduct());
    }
  };

  //----------------------------------------------------------------------------------------------------

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex min-h-9 items-center justify-between rounded-sm bg-ceramic px-3">
        <p className="font-bold text-black/70">
          {" "}
          Product Variant : {currentPage}
        </p>

        {productVariants?.length === currentPage && (
          <div className="flex gap-3">
            <IconButton onClick={() => HandleVariant("add")}>
              <MdAdd size={"22px"} className="leading-[0]" />
            </IconButton>
            {currentPage !== 1 && (
              <IconButton onClick={() => HandleVariant("delete")}>
                <PiTrashBold size={"18px"} />
              </IconButton>
            )}
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <CustomInputField
          control={form.control}
          fieldType={FormFieldType.COLOR}
          name={`productVariants.${currentPage - 1}.color`}
          placeholder="#2fas1"
          label="Color"
          className="flex-grow-0 basis-1/2"
        />

        <CustomInputField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name={`productVariants.${currentPage - 1}.size`}
          placeholder="M/XL/L"
          label="Size"
          className="flex-grow-0 basis-1/2"
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
          label="On Sale"
          dataType="boolean"
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

      {/* images  */}

      <div className="text-[15px] text-black/80">Product Images</div>

      {/* image error */}

      {imageError && (
        <p className="text-sm font-medium text-destructive">{imageError}</p>
      )}

      <div className="grid grid-cols-3 gap-2 gap-y-4">
        {values?.productVariants?.[currentPage - 1].productVariantImages?.map(
          (img, idx) => {
            return (
              <ImageUploader
                key={idx}
                imageUrl={img}
                handleDelete={() => {
                  handleImage({ type: "delete", image: "", imageIdx: idx });
                }}
                onSuccessfullUpload={(image) =>
                  handleImage({ type: "add", image, imageIdx: idx })
                }
                toggleModal={() =>
                  dispatch(productsReducers.toggleShowAddProduct())
                }
              />
            );
          },
        )}

        <AddImage onClick={() => handleImage({ type: "add" })} />
      </div>
    </div>
  );
};

//----------------------------------------------------------------------------------------------------

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

const IconButton = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Button
      className="flex min-h-0 min-w-0 gap-1 bg-ceramic p-0 font-Sen font-semibold leading-[0] text-black/60 hover:bg-ceramic"
      onClick={onClick}
      size={"sm"}
    >
      {children}
    </Button>
  );
};
