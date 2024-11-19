"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { TbCameraPlus } from "react-icons/tb";
import { toast } from "sonner";

interface TFileUploaderProps {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
}

const FileUploader: React.FC<TFileUploaderProps> = ({ files, onChange }) => {
  const [images, setImages] = useState([]);

  const imgSelectedForUploadRef = useRef(0);

  const handleDeleteImage = (imageNo: number) => {};

  const cloudinaryRef = useRef<any>();
  const imageWidgetRef = useRef<any>();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;

    if (cloudinaryRef.current) {
      console.log("got cloudinary");

      try {
        imageWidgetRef.current = cloudinaryRef.current.createUploadWidget(
          {
            cloudName: "dfm8vhuea",
            uploadPreset: "lmyyofoj",
            clientAllowedFormats: ["jpg", "jpeg", "png", "webP"],
            maxFiles: 1,
          },
          async function (error: any, result: any) {
            if (error) {
              toast.error("Failed to upload  Img");
            }
            if (result.info.public_id) {
              try {
                console.log(result.info.public_id);
              } catch (err: any) {
                toast.error(" Failed image Upload");
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
    <div className="gap- flex flex-col gap-3 justify-between mt-3">
      <div className="text-[15px] text-black/80">Product Images</div>
      <div
        className={`${images[0] ? "" : "border-[1px]"}  w-1/2 h-36 relative  rounded-[4px] border-input`}
      >
        {images[0] ? (
          <>
            <img
              className="h-full w-full object-cover"
              src={` https://res.cloudinary.com/dfm8vhuea/image/upload/${images[0]}`}
              alt=""
            />

            <div className="absolute right-2 top-2 cursor-pointer rounded-lg bg-black px-[6px] py-[6px] text-white">
              <FaTrashCan
                className="text-xs"
                onClick={() => {
                  handleDeleteImage(1);
                }}
              />
            </div>
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <TbCameraPlus
              className="cursor-pointer text-4xl text-gray-400"
              onClick={() => {
                imgSelectedForUploadRef.current = 1;

                imageWidgetRef.current.open();
              }}
            />
          </div>
        )}
      </div>{" "}
    </div>
  );
};

export default FileUploader;
