import { useEffect, useState } from "react";
import Input from "../forms/input";
import { MusicProductInput, ProductInput } from "@/types";
import SwitchToggle from "../ui/switch-toggle";
import ArrayInput from "../forms/ArrayInput";
import { t } from "@/utils/text";
import ImageArrayInput from "../forms/ImageArrayInput";
import AutocompleteDropdown from "../ui/autocomplete-dropdown";
import Button from "../ui/button";
import TrackInput from "../forms/TrackInput";
import { useSupabase } from "@/context/supabase-context";
import resizeImage from "@/lib/resize-image";
import { AddMusic } from "@/app/actions/add-music";
import { useFormState, useFormStatus } from "react-dom";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useModalAction } from "../modals/modal-controller";

interface AddMusicFormProps {
  type: string;
}

export default function AddMusicForm({ type }: AddMusicFormProps) {
  const [product, setProduct] = useState<MusicProductInput>({});
  const [isSingle, setIsSingle] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  //route
  const router = useRouter();
  //close modal
  const { closeModal } = useModalAction();

  // form state and action
  const initialState: {
    data: {
      id: string;
    } | null;
    error: {
      message: string;
      code: number;
    } | null;
  } = {
    data: null,
    error: null,
  };
  const [state, addMusic] = useFormState(AddMusic, initialState);

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

  function gentlyShowUnauthorisedUserOut() {
    closeModal();
    router.push("/");
  }

  //handle success || failure of adding music
  useEffect(() => {
    console.log(state);
    if (state?.data?.id) {
      setSuccess(true);
      type === "Album"
        ? toast.success("Album Saved")
        : toast.success("Track Saved");
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    } else if (state?.error?.message) {
      type === "Album"
        ? toast.error(state.error.message)
        : toast.error(state.error.message);

      //gently show unauthorised user out
      state.error.code === 403 && gentlyShowUnauthorisedUserOut();
    }
  }, [state, state?.data, state?.error]);

  return (
    <form className="flex flex-col gap-4" action={addMusic}>
      <p>{state?.data?.id}</p>
      <Toaster position="top-center" reverseOrder={false} />
      <input type="hidden" value={type} name="productType" />

      {/* single | part of an album toggle - unavailable for albums */}
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
        // value={product.name}
        name="name"
      />

      {/* price */}
      <Input
        id="music-product-price"
        label="Price"
        type="number"
        onChange={(e) => handleInput("price", e.target.value)}
        // value={product.price}
        name="price"
      />

      {/* artist */}
      <Input
        id="music-product-artist"
        label="Artist Name"
        onChange={(e) => handleInput("artist", e.target.value)}
        name="artist"
        // value={product.artist}
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
        name="other_artists"
      />

      {/* select album drop down - unavailable for single tracks & albums  */}

      {!isSingle && type === "Track" && (
        <AutocompleteDropdown
          options={["1", "2", "3"]}
          selectedOption={product.album}
          setSelectedOption={(value) => handleInput("album", value)}
          label="Album"
          name="album"
          required
        />
      )}

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
        name="producers"
        formInputId="producers-hidden-input"
      />

      {/* release date */}
      {/* TODO */}

      {/* genre */}
      <Input
        id="music-product-genre"
        label="Genre"
        onChange={(e) => handleInput("genre", e.target.value)}
        value={product.genre}
        name="genre"
      />

      {/* cover upload */}

      {(isSingle || type === "Album") && (
        <ImageArrayInput
          key="cover-image-input"
          images={product.cover ? [product.cover] : []}
          setImages={(images) => handleInput("cover", images[0])}
          multiple={false}
          label="Cover"
          name="cover"
          required
        />
      )}

      {/* track */}

      {type === "Track" && (
        <TrackInput
          key="music-file-input"
          trackFile={product.track}
          handleInput={(file) => handleInput("track", file)}
          name="track"
          required
        />
      )}

      {/* publish toggle - unavailable for albums */}
      {type === "Track" && (
        <SwitchToggle
          state={product.is_published ?? false}
          setState={(value) => handleInput("is_published", value)}
          label={t("publish_toggle_label")}
          name="is_published"
        />
      )}

      {/* submit button */}

      <Button
        usePending
        type="submit"
        className="relative w-full text-sm tracking-[0.2px] "
        success={success}
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
    </form>
  );
}
