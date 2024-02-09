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
import { useSupabase, userContext } from "@/context/supabase-context";
import resizeImage from "@/lib/resize-image";
import { AddMusic } from "@/app/actions/add-music";
import { useFormState, useFormStatus } from "react-dom";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useModalAction } from "../modals/modal-controller";

interface AddMusicFormProps {
  type: string;
  album?: {
    name: string;
    id: string;
  };
  action?: {
    onSuccess?: () => any;
    onFailure?: () => any;
  };
}

export default function AddMusicForm({
  type,
  album,
  action,
}: AddMusicFormProps) {
  const { supabase } = useSupabase();
  const [product, setProduct] = useState<MusicProductInput>({});
  const [isSingle, setIsSingle] = useState<boolean>(!album);
  const [success, setSuccess] = useState<boolean>(false);
  //image preview
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [userAlbums, setUserAlbums] = useState<any>();

  //route
  const router = useRouter();
  //close modal
  const { closeModal } = useModalAction();

  // form state and action
  const initialState: {
    ok: boolean | null;
    productType: string;
    error: {
      data: any;
      message: string;
      code: number;
    } | null;
    cover: string | null;
    track: string | null;
  } = {
    ok: null,
    productType: isSingle ? "SingleTrack" : type,
    error: null,
    cover: null,
    track: null,
  };

  //get user
  const user = userContext();

  // async function fetchAlbums() {
  //   // get albums
  //   const { data, error } = await supabase
  //     .from("albums")
  //     .select("*")
  //     .eq("owner", user?.id);
  //   console.log(data);
  // }

  // fetchAlbums();

  //adding music
  const [state, addMusic] = useFormState(AddMusic, initialState);
  function handleFormAction(formData: FormData) {
    //replace seleted image with resized image
    if (product.cover) {
      formData.set("cover", product.cover);
    }
    addMusic(formData);
  }

  //handle inputs
  async function handleInput(key: string, value: any) {
    setProduct((prevProduct) => {
      const newProduct = {
        ...prevProduct,
        [key]: value,
      };
      return newProduct;
    });

    //set state.cover to null of the user replaced the image
    if (state.cover && key === "cover") {
      //dete uploaded track from cloud bucket
      const filePath = state.cover.split("music-cover-images/")[1];
      await deleteFilesFromSupabase("music-cover-images", filePath);
      state.cover = null;
    }
    //set state.track to null of the user replaced the track
    if (state.track && key === "track") {
      //dete uploaded track from cloud bucket
      await deleteFilesFromSupabase("tracks", state.track);
      state.track = null;
    }
    return;
  }

  //delete files from supabase
  async function deleteFilesFromSupabase(bucket: string, filePath: string) {
    const { error } = await supabase.storage.from(bucket).remove([filePath]);
    if (error) {
      //TODO
      console.log(error);
    }
  }

  function gentlyShowUnauthorisedUserOut() {
    closeModal();
    router.push("/");
  }

  //handle success || failure of adding music
  useEffect(() => {
    if (state.ok === null) return;
    if (state.ok === true) {
      setSuccess(true);

      // refresh track
      action?.onSuccess && action.onSuccess();

      //reset the image field
      const imageInput = document.getElementById(
        "product-images-upload",
      ) as HTMLInputElement;

      //
      state.ok = null;
      state.error = null;

      //toast
      type === "Album"
        ? toast.success("Album Saved")
        : toast.success("Track Saved");

      //
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
      closeModal();
    } else {
      type === "Album"
        ? toast.error(
            state.error?.message ?? "Adding album failed! Try again later.",
          )
        : toast.error(
            state.error?.message ?? " Adding track failed! Try again later.",
          );

      //gently show unauthorised user out
      state.error?.code === 403 && gentlyShowUnauthorisedUserOut();
    }
  }, [state, state?.ok]);

  //update product type in state
  useEffect(() => {
    state.productType = type === "Track" && isSingle ? "SingleTrack" : type;
  }, [isSingle, type, state]);

  return (
    <form className="flex flex-col gap-4" action={handleFormAction}>
      <p>{state.ok}</p>
      <Toaster position="top-center" reverseOrder={false} />
      <input type="hidden" value={type} name="productType" />

      {/* single | part of an album toggle - unavailable for albums
      {type === "Track" && (
        <SwitchToggle
          state={isSingle ?? false}
          setState={setIsSingle}
          label="Track is a Single"
          className="my-4"
          name="isSingle"
        />
      )} */}
      {/* name */}
      <Input
        id="music-product-name"
        label={`${type} Name *`}
        onChange={(e) => handleInput("name", e.target.value)}
        name="name"
      />

      {/* price */}
      <Input
        id="music-product-price"
        label="Price *"
        type="number"
        onChange={(e) => handleInput("price", e.target.value)}
        name="price"
      />

      {/* artist */}
      <Input
        id="music-product-artist"
        label="Artist Name *"
        onChange={(e) => handleInput("artist", e.target.value)}
        name="artist"
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
        // <AutocompleteDropdown
        //   options={["1", "2", "3"]}
        //   selectedOption={product.album}
        //   setSelectedOption={(value) => handleInput("album", value)}
        //   label="Album *"
        //   name="album"
        //   required
        // />

        <input type="hidden" name="album" value={JSON.stringify(album)} />
      )}

      {/* artists note */}
      <Input
        id="music-product-name"
        label="A Note To Your Listeners"
        onChange={(e) => handleInput("artists_note", e.target.value)}
        value={product.artists_note}
        name="artists_note"
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
        label="Genre *"
        onChange={(e) => handleInput("genre", e.target.value)}
        value={product.genre}
        name="genre"
      />

      {/* cover upload */}

      {(isSingle || type === "Album") && (
        <ImageArrayInput
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
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
        disabled={success}
      >
        {success && product.is_published
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
