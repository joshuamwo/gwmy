import { EventFormData } from "@/types";
import Input from "./input";
import { useState } from "react";
import ImageInput from "./ImageInput";
import Button from "../ui/button";
import DropdownSelect from "../ui/dropdown-select";

interface AddEventFormProps {
  handleSubmit: (formData: FormData) => void;
  loading: boolean;
  eventCoverPreview?: string;
  setEventCoverPreview: (images: string | undefined) => void;
}

export default function AddEventForm({
  handleSubmit,
  loading,
  eventCoverPreview,
  setEventCoverPreview,
}: AddEventFormProps) {
  return (
    <div className="relative flex flex-col gap-4">
      {/* title */}
      <h1 className="sticky top-0 w-full bg-light-400 py-4 text-center text-lg font-medium dark:bg-dark-100 ">
        Add Event
      </h1>

      <form
        id="add_event_form"
        action={handleSubmit}
        className=" flex flex-col gap-4 px-2"
      >
        <Input id="event_name" name="event_name" label="Event Name" />
        <Input
          id="description"
          type="textarea"
          name="description"
          label="Event Description"
          required
        />
        <div className="flex w-full gap-4">
          <Input
            id="price"
            type="number"
            name="price"
            label="Ticket Price"
            className="w-full"
            required
          />
          <Input
            id="location"
            name="location"
            label="Event Location"
            className="w-full"
            required
          />
        </div>
        <div className="flex w-full gap-4">
          <Input
            id="venue"
            name="venue"
            label="Event Venue"
            className="w-full"
            required
          />
          <Input
            id="host"
            name="host"
            label="Event Host"
            className="w-full"
            required
          />
        </div>
        <div className="flex w-full gap-4">
          <Input
            id="start_date"
            type="date"
            name="start_date"
            label="Start Date"
            className="w-full"
            required
          />
          <Input
            id="end_date"
            type="date"
            name="end_date"
            label="End Date"
            className="w-full"
            required
          />
        </div>
        <div className="flex w-full gap-4">
          <Input
            id="start_time"
            type="time"
            name="start_time"
            label="Start Time"
            className="w-full"
            required
          />
          <Input
            id="end_time"
            type="time"
            name="end_time"
            label="End TIme"
            className="w-full"
            required
          />
        </div>
        <div className="flex w-full gap-4">
          <Input
            id="expiry_date_time"
            type="datetime-local"
            name="expiry_date_time"
            label="Event Expires On"
            className="w-full"
            required
          />

          <DropdownSelect
            options={[
              "Music",
              "Concert",
              "Theatre",
              "Play",
              "Seminar",
              "Conference",
            ]}
            label="Categories - select all that apply"
            name="categories"
            multiple
          />
        </div>

        <ImageInput
          imagePreview={eventCoverPreview}
          setImagePreview={setEventCoverPreview}
          name="cover"
          required
        />
        <Button
          usePending
          type="submit"
          className="relative w-full text-sm tracking-[0.2px] "
        >
          Add Event
        </Button>
      </form>
    </div>
  );
}
