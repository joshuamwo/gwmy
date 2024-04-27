"use client";

import { addEvent } from "@/app/actions/add-event";
import { uploadImages } from "@/app/actions/upload-images";
import AddEventForm from "@/components/forms/AddEventForm";
import { useSupabase } from "@/context/supabase-context";
import { EventFormData } from "@/types";
import { set } from "date-fns";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";

export default function AddEventPage() {
  //event formData state
  const [formData, setFormData] = useState<EventFormData>();
  const [eventCoverPreview, setEventCoverPreview] = useState<string>();
  const [loading, setLoading] = useState(false);

  const { supabase } = useSupabase();

  let initialState: {
    ok?: boolean;
    error?: string;
    status?: number;
  } = {};

  const [state, handleAddEvent] = useFormState(addEvent, initialState);

  async function handleSubmit(formData: FormData) {
    console.log(formData.get("categories"));
    handleAddEvent(formData);
    return;
  }

  //handle success || failure of adding music
  useEffect(() => {
    if (state.ok === undefined) return;
    if (state.ok === true) {
      //reset the image field
      const imageInput = document.getElementById(
        "product-images-upload",
      ) as HTMLInputElement;

      //
      state.ok = undefined;
      state.error = undefined;

      //success toast
      toast.success("Event Added");

      //reset form and image preview
      (document.getElementById("add_event_form") as HTMLFormElement).reset();
      setEventCoverPreview(undefined);
    } else {
      //error toast
      console.log(state.error);
      toast.error("Failed to add event. Please try again");
    }
  }, [state, state.ok, state.error, state.status]);

  return (
    <div>
      <div className="p-4">
        <AddEventForm
          handleSubmit={handleSubmit}
          loading={loading}
          eventCoverPreview={eventCoverPreview}
          setEventCoverPreview={setEventCoverPreview}
        />
      </div>
    </div>
  );
}
