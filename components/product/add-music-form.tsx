import { useState } from "react";
import Input from "../forms/input";
import { MusicProductInput, ProductInput } from "@/types";
import SwitchToggle from "../ui/switch-toggle";
import ArrayInput from "../forms/ArrayInput";
import { t } from "@/utils/text";
import ImageArrayInput from "../forms/ImageArrayInput";
import AutocompleteDropdown from "../ui/autocomplete-dropdown";
import Button from "../ui/button";

interface AddMusicFormProps {
  type: string;
}

const MusicProductDefaults = {};

export default function AddMusicForm({ type }: AddMusicFormProps) {
  const [product, setProduct] = useState<MusicProductInput>({});
  const [isSingle, setIsSingle] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);


  let disabled: boolean =
    !product.name ||
    !product.artist ||
    (!product.album && !isSingle) ||
    (!product.cover && !isSingle) ||
    !product.price ||
    !product.genre ||
    loading;

  //handle inputs
  function handleInput(key: string, value: any) {
    setProduct((prevProduct) => {
      const newProduct = {
        ...prevProduct,
        [key]: value,
      };
      return newProduct;
    });

  }

  //send music to api
  function handleAddMusic() {}

  return (
    <div className="flex flex-col gap-4">
      {/* single | part of an album toggle - disbled when adding albums */}
      {type === "Track" && (
        <SwitchToggle
          state={isSingle}
          setState={setIsSingle}
          label="Track is a Single"
          className="my-4"
        />
      )}

      {/* name */}
      <Input
        id="music-product-name"
        label={`${type} Name`}
        onChange={(e) => handleInput("name", e.target.value)}
        value={product.name}
      />

      {/* price */}
      <Input
        id="music-product-price"
        label="Price"
        onChange={(e) => handleInput("price", e.target.value)}
        value={product.price}
      />

      {/* artist */}
      <Input
        id="music-product-artist"
        label="Artist Name"
        onChange={(e) => handleInput("artist", e.target.value)}
        value={product.artist}
      />

      {/* other artists  */}
      <ArrayInput
        label="Other Artists"
        handleInput={(artists: string[]) =>
          handleInput("other_artists", artists)
        }
        array={product.other_artists ? product.other_artists : []}
        placeholder="Enter Other Artist's Name & Press Enter To Add"
        inputType="text"
      />

      {/* select album drop down  */}
      <AutocompleteDropdown
        options={["1", "2", "3"]}
        selectedOption={product.album}
        setSelectedOption={(value) => handleInput("album", value)}
        label="Album"
      />

      {/* artists note */}
      <Input
        id="music-product-name"
        label="A Note To Your Listeners"
        onChange={(e) => handleInput("artists_note", e.target.value)}
        value={product.artists_note}
      />
      {/* producers */}
      <ArrayInput
        label={t("producers_input_label")}
        handleInput={(producers: string[]) =>
          handleInput("producers", producers)
        }
        array={product.producers ? product.producers : []}
        placeholder={t("producers_input_placeholder")}
        inputType="text"
      />

				{/* release date */}
				{/* TODO */}

      {/* genre */}
      <Input
        id="music-product-genre"
        label="Genre"
        onChange={(e) => handleInput("genre", e.target.value)}
        value={product.genre}
      />
      {/* cover upload */}

      <ImageArrayInput
        images={product.cover ? [product.cover] : []}
        setImages={(images) => handleInput("cover", images[0])}
        multiple={false}
      />

      {/* publish toggle */}
      {isSingle && (
        <SwitchToggle
          state={isSingle}
          setState={setIsSingle}
          label={t("publish_toggle_label")}
        />
      )}

      {/* submit button */}

      <Button
        isLoading={loading}
        type="button"
        className="w-full text-sm tracking-[0.2px]"
        onClick={() => handleAddMusic()}
        disabled={disabled}
      >
        {loading
          ? ""
          : success && product.is_published
          ? "Product Published"
          : success && !product.is_published
          ? "Draft Saved"
          : product.is_published
          ? "Publish"
          : "Save as Draft"}
      </Button>
    </div>
  );
}
