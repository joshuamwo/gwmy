import { useState } from "react";
import { FormBgPattern } from "../auth/form-bg-pattern";
import ImageArrayInput from "../forms/ImageArrayInput";
import Input from "../forms/input";
import ImageInput from "../forms/ImageInput";
import Button from "../ui/button";

export default function AddArtistForm() {
  const [profilePicture, setProfilePicture] = useState<File>();
  const [profilePicturePreview, setProfilePicturePreview] = useState<string>();

  async function handleFormAction(formData: FormData) {
    profilePicture && formData.set("profile_picture", profilePicture);

    console.log(formData.get("profile_picture"));
  }

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
              <Input id="id_no" name="id_no" label="ID Number" required />
              <Input
                id="phone_no"
                name="phone_no"
                label="M-Pesa Number"
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
              <Button type="submit">Submit</Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
