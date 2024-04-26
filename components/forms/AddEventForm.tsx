import { EventFormData } from "@/types";
import { input } from "zod";
import Input from "./input";
import { Calendar } from "../ui/calendar";
import ImageArrayInput from "./ImageArrayInput";
import { useState } from "react";
import ImageInput from "./ImageInput";
import Button from "../ui/button";

interface AddEventFormProps {
  handleSubmit: () => void;
  formData: EventFormData | undefined;
  setFormData: React.Dispatch<React.SetStateAction<EventFormData | undefined>>;
  loading: boolean;
}

export default function AddEventForm({
  handleSubmit,
  formData,
  setFormData,
  loading,
}: AddEventFormProps) {
  const [eventCoverPreview, setEventCoverPreview] = useState<string>();

  return (
    <div className="relative flex flex-col gap-4">
      {/* title */}
      <h1 className="sticky top-0 w-full bg-light-400 py-4 text-center text-lg font-medium dark:bg-dark-100 ">
        Add Event
      </h1>

      <form action={handleSubmit} className=" flex flex-col gap-4 px-2">
        <Input
          id="name"
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
          }}
          name="name"
          label="Event Name"
        />
        <Input
          id="description"
          type="textarea"
          onChange={(e) => {
            setFormData({ ...formData, description: e.target.value });
          }}
          name="description"
          label="Event Description"
        />
        <div className="flex w-full gap-4">
          <Input
            id="price"
            type="number"
            onChange={(e) => {
              setFormData({ ...formData, price: e.target.value });
            }}
            name="price"
            label="Ticket Price"
            className="w-full"
          />
          <Input
            id="location"
            onChange={(e) => {
              setFormData({ ...formData, location: e.target.value });
            }}
            name="location"
            label="Event Location"
            className="w-full"
          />
        </div>
        <div className="flex w-full gap-4">
          <Input
            id="venue"
            onChange={(e) => {
              setFormData({ ...formData, venue: e.target.value });
            }}
            name="venue"
            label="Event Venue"
            className="w-full"
          />
          <Input
            id="host"
            onChange={(e) => {
              setFormData({ ...formData, host: e.target.value });
            }}
            name="host"
            label="Event Host"
            className="w-full"
          />
        </div>

        <div className="flex w-full gap-4">
          <Input
            id="start_date"
            type="date"
            onChange={(e) => {
              setFormData({ ...formData, start_date: e.target.value });
            }}
            name="start_date"
            label="Start Date"
            className="w-full"
          />
          <Input
            id="end_date"
            type="date"
            onChange={(e) => {
              setFormData({ ...formData, end_date: e.target.value });
            }}
            name="end_date"
            label="End Date"
            className="w-full"
          />
        </div>
        <div className="flex w-full gap-4">
          <Input
            id="start_time"
            type="time"
            onChange={(e) => {
              setFormData({ ...formData, start_time: e.target.value });
            }}
            name="start_date"
            label="Start Time"
            className="w-full"
          />
          <Input
            id="end_time"
            type="time"
            onChange={(e) => {
              setFormData({ ...formData, end_time: e.target.value });
            }}
            name="end_time"
            label="End TIme"
            className="w-full"
          />
        </div>
        <ImageInput
          imagePreview={eventCoverPreview}
          setImagePreview={setEventCoverPreview}
          image={formData?.cover}
          setImage={(image) => setFormData({ ...formData, cover: image })}
        />
        <Button
          usePending
          type="submit"
          className="relative w-full text-sm tracking-[0.2px] "
          // success={success}
          // disabled={success}
        >
          {/* {success && product.is_published
          ? "Product Published"
          : success && !product.is_published
            ? "Draft Saved"
            : product.is_published
              ? "Publish"
              : "Save as Draft"} */}
          Add Event
        </Button>
      </form>
    </div>
  );
}
