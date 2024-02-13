import { useState } from "react";
import Button from "../ui/button";
import { ImageCourosel, ImageSlide } from "../ui/image-courosel";
import { DeleteIcon } from "../icons/delete-icon";
import Image from "next/image";
import ImagePreview from "../ui/ImagePreview";
import resizeImage from "@/lib/resize-image";
import { useFormState } from "react-dom";
import { classnames } from "@/utils/classnames";

interface ImageInputProps {
  image?: File;
  setImage: (images: File | undefined) => void;
  label?: string;
  name?: string;
  required?: boolean;
  imagePreview?: string;
  setImagePreview: (images: string | undefined) => void;
  rounded?: boolean;
}

export default function ImageInput({
  image,
  setImage,
  label,
  name,
  required,
  imagePreview,
  setImagePreview,
  rounded,
}: ImageInputProps) {
  //

  // Image input and preview set
  const handleImageInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    //resize, set image state & preview

    if (e.target.files) {
      const image = e.target.files[0];

      const type = image.type;

      // Resize each image to ensure consistency and possibly reduce upload time
      const resizedImageBlob = await resizeImage(image, 795, 480);

      // Convert each resized image blob to a File
      const fileName = `${self.crypto.randomUUID()}`;
      const resizedImage: File = new File([resizedImageBlob], fileName, {
        type: type,
      });

      const imageUrl = window.URL.createObjectURL(resizedImage);
      setImage(resizedImage);
      setImagePreview(imageUrl);
      return;
    }
  };

  //image input remove
  const handleImageInputRemove = () => {
    // remove image preview and set image to null

    setImagePreview(undefined);
    setImage(undefined);
    return;
  };

  return (
    <div>
      {/* image preview */}

      {imagePreview && (
        <div className="mb-4 flex justify-center">
          <div
            className={
              rounded ? "relative aspect-square h-60 " : "relative h-60 w-full "
            }
          >
            <Image
              src={imagePreview}
              className={rounded ? "rounded-full object-cover" : "object-cover"}
              fill
              // style={{
              //   objectFit: "cover",
              // }}
              alt="profile_picture_preview"
            />
          </div>
        </div>
      )}

      {/* Add images */}
      <Button
        type="button"
        className="h-12 w-full !p-0 text-sm  tracking-[0.2px]"
        variant="outline"
      >
        <label
          htmlFor="product-images-upload"
          className="relative flex h-full w-full items-center justify-center "
        >
          {!imagePreview ? `Upload ${label ?? "Image"}` : "Replace Image"}
          <input
            type="file"
            id="product-images-upload"
            className="absolute left-0 right-0 h-full opacity-0 "
            onChange={(e) => handleImageInput(e)}
            aria-hidden
            accept="image/*"
            name={name}
            required={required}
          />
        </label>
      </Button>
    </div>
  );
}
