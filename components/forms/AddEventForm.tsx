import { EventFormData } from "@/types";
import { input } from "zod";
import Input from "./input";

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
  return (
    <form action={handleSubmit} className="flex flex-col gap-4">
      {/* title */}
      <h1 className="text-2xl font-medium ">Add Event</h1>
      <div>
        <Input
          id="start_date_time"
          type="datetime-local"
          onChange={(e) => {
            const timestamp = new Date(e.target.value);
            console.log("value", timestamp);
          }}
          name="start_date_time"
          label="Start Date & Time"
        />
      </div>
    </form>
  );
}
