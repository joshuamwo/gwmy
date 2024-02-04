import { useState } from "react";
import Button from "../ui/button";
import { ImageCourosel, ImageSlide } from "../ui/image-courosel";
import { DeleteIcon } from "../icons/delete-icon";
import Image from "next/image";
import ImagePreview from "../ui/ImagePreview";
import resizeImage from "@/lib/resize-image";
import { useFormState } from "react-dom";

interface ImageInputProps {
  images: File[];
  setImages: (images: File[]) => void;
  multiple: boolean;
  label?: string;
  name?: string;
  required?: boolean;
  imagePreview: string[];
  setImagePreview: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function ImageArrayInput({
  images,
  setImages,
  multiple,
  label,
  name,
	required,
	imagePreview,
		setImagePreview,
}: ImageInputProps) {


  // Image input and preview set
  const handleImageInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // e.preventDefault();

    //set image preview
    if (e.target.files) {
      if (images && !multiple) {
        const image = e.target.files[0];
        //resize image
        // Resize each image to ensure consistency and possibly reduce upload time
        const resizedImageBlob = await resizeImage(image, 795, 480);

        // Convert each resized image blob to a File
        const fileName = `${self.crypto.randomUUID()}`;
        const resizedImage: File = new File([resizedImageBlob], fileName, {
          type: "image/png",
        });

        const imageUrl = window.URL.createObjectURL(resizedImage);
        console.log(e.target.files);
        setImages([resizedImage]);
        setImagePreview([imageUrl]);
        // setField("cover", resizedImage);
        return;
      }

      const files = e.target.files;
      const fileArray = Array.from(files).map((file) =>
        window.URL.createObjectURL(file),
      );

      setImagePreview([...imagePreview, ...fileArray]);
      //if images is not null, apped new image file otherwise setImages(files)
      const imageArray = Array.from(files);
      images ? setImages([...images, ...imageArray]) : setImages(imageArray);
    }
  };

  //image input remove
  const handleImageInputRemove = (index: number) => {
    // remove image from preview
    if (imagePreview.length === 1) {
      setImagePreview([]);
      setImages([]);
      return;
    }
    const newImagePreview = imagePreview.filter((image, i) => i !== index);
    setImagePreview(newImagePreview);
    // remove image from images
    const newImages = images?.filter((image, i) => i !== index);
    setImages(newImages);
  };

  return (
    <>
      {/* image preview */}
      {imagePreview.length !== 0 && (
        <div className="!mt-5 w-full">
          <ImageCourosel>
            {imagePreview.map((image, index) => (
              <ImageSlide key={index}>
                {/* delete image */}
                {multiple && (
                  <div className="absolute right-2 top-2 z-50">
                    <Button
                      variant="icon"
                      onClick={() => handleImageInputRemove(index)}
                      className="h-10 w-10 rounded-full bg-dark-300 hover:bg-red-500 dark:bg-dark-400"
                    >
                      <DeleteIcon className="h-5 w-5 text-white opacity-80 hover:scale-125 hover:animate-pulse hover:opacity-100 " />
                    </Button>
                  </div>
                )}
                <div className="mb-4 flex h-60 w-full items-center justify-center">
                  <Image
                    src={image}
                    className="object-cover"
                    fill
                    style={{
                      objectFit: "cover",
                    }}
                    alt={`image ${index}`}
                  />
                </div>
              </ImageSlide>
            ))}
          </ImageCourosel>
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
          {multiple && imagePreview.length == 0
            ? `Upload ${label ?? "Images"}`
            : multiple && imagePreview.length > 0
              ? "Add Images"
              : !multiple && imagePreview.length == 0
                ? `Upload ${label ?? "Image"}`
                : "Replace Image"}
          <input
            type="file"
            id="product-images-upload"
            className="absolute left-0 right-0 h-full opacity-0 "
            onChange={(e) => handleImageInput(e)}
            multiple={multiple}
            aria-hidden
            accept="image/*"
            name={name}
            // required={required}
          />
          {/* <input
            type="hidden"
            id="product-images-dummy"
            className="absolute left-0 right-0 h-full opacity-0"
            aria-hidden
            name="null"
            required={required}
            value={images[0]?.name}
          /> */}
        </label>
      </Button>
    </>
  );
}
