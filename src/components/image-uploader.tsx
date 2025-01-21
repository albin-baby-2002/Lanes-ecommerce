"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { TbCameraPlus } from "react-icons/tb";
import { toast } from "sonner";

interface TImageUploaderProps {
  imageUrl?: string;
  onSuccessfullUpload: (image: string) => void;
  toggleModal: () => void;
  handleDelete?: () => void;
}

const ImageUploader: React.FC<TImageUploaderProps> = ({
  imageUrl,
  onSuccessfullUpload,
  handleDelete,
  toggleModal,
}) => {
  const cloudinaryRef = useRef<any>();
  const imageWidgetRef = useRef<any>();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;

    if (cloudinaryRef.current && !imageWidgetRef.current) {
      try {
        imageWidgetRef.current = cloudinaryRef.current.createUploadWidget(
          {
            cloudName: "dfm8vhuea",
            uploadPreset: "lmyyofoj",
            croppingAspectRatio: 0.76 / 1,
            showCompletedButton: true,
            autoMinimize: true,
            preBatch: (cb, _data) => {
              cb();
              toggleModal();
            },
            clientAllowedFormats: ["jpg", "avif", "jpeg", "png", "webP"],
            multiple: true,
            maxFiles: 4,
          },
          async function (error: any, result: any) {
            if (error) {
              toast.error("Failed to upload  Img");

              toggleModal();
            }
            if (result.info.public_id) {
              console.log(result, "result of img");
              try {
                onSuccessfullUpload(result.info.public_id);
              } catch (err: any) {
                toast.error(" Failed image Upload");
                toggleModal();
              }
            }
          },
        );
      } catch (error) {
        console.log(error, "error cloudinary");
      }
    }
  }, []);

  return (
    <div
      className={`relative z-40 h-[185px] w-[135px] cursor-pointer rounded-[4px] border-[1px] border-input`}
    >
      {imageUrl ? (
        <>
          <div className="relative h-full w-full">
            <Image
              fill
              className="h-full w-full object-cover"
              src={` https://res.cloudinary.com/dfm8vhuea/image/upload/${imageUrl}`}
              alt=""
            />
          </div>
          <div
            onClick={handleDelete}
            className="absolute right-2 top-2 cursor-pointer rounded-lg bg-black px-[6px] py-[6px] text-white"
          >
            <FaTrashCan className="text-xs" />
          </div>
        </>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <TbCameraPlus
            className="cursor-pointer text-4xl text-gray-400"
            onClick={() => {
              imageWidgetRef.current.open();
              toggleModal();
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
