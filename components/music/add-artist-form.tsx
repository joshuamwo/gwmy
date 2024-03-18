import { useEffect, useState } from "react";
import { FormBgPattern } from "../auth/form-bg-pattern";
import Input from "../forms/input";
import ImageInput from "../forms/ImageInput";
import Button from "../ui/button";
import { addArtist } from "@/app/actions/add-artist";
import { useFormState } from "react-dom";
import { useModalAction, useModalState } from "../modals/modal-controller";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AddArtistForm({
  onSuccess,
}: {
  onSuccess?: () => any;
}) {
  console.log(onSuccess);
  const [profilePicture, setProfilePicture] = useState<File>();
  const [profilePicturePreview, setProfilePicturePreview] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { closeModal } = useModalAction();

  //initial state
  const initialState: {
    ok: boolean | null;
    error: {
      data: any;
      message: string;
      code: number;
    } | null;
    profile_picture: string | null;
  } = {
    ok: null,
    error: null,
    profile_picture: null,
  };

  //handleform action
  const [state, newArtist] = useFormState(addArtist, initialState);
  async function handleFormAction(formData: FormData) {
    try {
      setLoading(true);
      //add profile picture to formData
      profilePicture && formData.set("profile_picture", profilePicture);

      //send data to server
      newArtist(formData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  //kick out the user
  const router = useRouter();
  function gentlyShowUnauthorisedUserOut() {
    toast.error("How did you get here?");
    closeModal();
    router.push("/");
  }

  //handle success || failure of adding music
  useEffect(() => {
    if (state.ok === null) return;
    if (state.ok === true) {
      // refresh artists
      onSuccess && onSuccess();
      //reset the image field
      const imageInput = document.getElementById(
        "product-images-upload",
      ) as HTMLInputElement;

      //
      state.ok = null;
      state.error = null;

      //toast

      toast.success("Artist Added");

      //
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
      closeModal();
    } else {
      toast.error("Failed to add artist, try again later.");

      //gently show unauthorised user out
      state.error?.code === 403 && gentlyShowUnauthorisedUserOut();
    }
  }, [state, state?.ok]);

  return (
    <form action={handleFormAction}>
      <div className="bg-light px-6 pb-8 pt-10 dark:bg-dark-300 sm:px-8 lg:p-12">
        <FormBgPattern className="absolute bottom-0 left-0 hidden text-light dark:text-dark-300 dark:opacity-60 xs:flex" />
        <div className="relative z-10 flex items-center">
          <div className="w-full shrink-0 text-left md:w-[380px]">
            <div className="flex flex-col pb-5 text-center lg:pb-9 xl:pb-10 xl:pt-2">
              <h2 className="text-lg font-medium tracking-[-0.3px] text-dark dark:text-light lg:text-xl">
                Add Artist
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <Input
                  id="first_name"
                  name="first_name"
                  label="First Name"
                  required
                />
                <Input
                  id="last_name"
                  name="last_name"
                  label="Last Name"
                  required
                />
              </div>
              <Input id="alias" name="alias" label="Alias" required />
              <Input
                id="id_number"
                name="id_number"
                label="ID Number"
                required
              />
              <Input
                id="phone_number"
                name="phone_number"
                label="M-Pesa Number 07**/01**"
                required
              />
              <Input
                id="recording_label"
                name="recording_label"
                label="Recording Label"
              />
              <ImageInput
                image={profilePicture}
                imagePreview={profilePicturePreview}
                setImage={(image) => setProfilePicture(image)}
                setImagePreview={(preview) => setProfilePicturePreview(preview)}
                label="Profile Picture"
                name="profile_picture"
                rounded
                required
              />
              <Button
                type="submit"
                isLoading={loading}
                usePending
                disabled={loading}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
