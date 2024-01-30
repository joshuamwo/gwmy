import { useState } from "react";
import Button from "../ui/button";
import { ImageCourosel, ImageSlide } from "../ui/image-courosel";
import { DeleteIcon } from "../icons/delete-icon";
import Image from "next/image";
import ImagePreview from "../ui/ImagePreview";

interface ImageInputProps {
  images: File[];
  setImages: (images: File[]) => void;
  multiple: boolean;
  label?: string;
  name?: string;
  required?: boolean;
}

export default function ImageArrayInput({
  images,
  setImages,
  multiple,
  label,
  name,
  required,
}: ImageInputProps) {
  //image preview
  const [imagePreview, setImagePreview] = useState<string[]>([]);

  // Image input and preview set
  const handleImageInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // e.preventDefault();

    //set image preview
    if (e.target.files) {
      if (images && !multiple) {
        const image = e.target.files[0];
        const imageUrl = window.URL.createObjectURL(image);
        console.log(e.target.files);
        setImages([image]);
        setImagePreview([imageUrl]);
        return;
      }
      const files = e.target.files;
      const fileArray = Array.from(files).map((file) =>
        window.URL.createObjectURL(file)
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
        <div className="w-full !mt-5">
          <ImageCourosel>
            {imagePreview.map((image, index) => (
              <ImageSlide key={index}>
                {/* delete image */}
                {multiple && (
                  <div className="absolute top-2 right-2 z-50">
                    <Button
                      variant="icon"
                      onClick={() => handleImageInputRemove(index)}
                      className="w-10 h-10 rounded-full bg-dark-300 dark:bg-dark-400 hover:bg-red-500"
                    >
                      <DeleteIcon className="h-5 w-5 text-white opacity-80 hover:opacity-100 hover:animate-pulse hover:scale-125 " />
                    </Button>
                  </div>
                )}
                <div className="w-full h-60 flex justify-center items-center mb-4">
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
        className="w-full text-sm !p-0 h-12  tracking-[0.2px]"
        variant="outline"
      >
        <label
          htmlFor="product-images-upload"
          className="w-full relative h-full flex justify-center items-center "
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
            className="opacity-0 absolute left-0 right-0 h-full "
            onChange={(e) => handleImageInput(e)}
            multiple={multiple}
            aria-hidden
            accept="image/*"
            required={required}
            name={name}
          />
        </label>
      </Button>
    </>
  );
}
