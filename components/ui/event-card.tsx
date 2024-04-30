import { Event } from "@/types";
import Image from "next/image";
import { LocationIcon } from "./location-icon";
import { ClockIcon } from "./clock-icon";
import Link from "next/link";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  formatDate(event.end_date);

  function formatDate(dateString: string) {
    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const dayOfWeek = daysOfWeek[date.getDay()];

    const formattedDate = {
      day,
      month,
      dayOfWeek,
    };
    console.log(formattedDate);
    return formattedDate;
  }

  function formatTime(timeString: string) {
    const [hours, minutes] = timeString.split(":");
    let formattedTime;
    if (Number(hours) < 12) {
      formattedTime = `${parseInt(hours)}:${minutes} AM`;
    } else if (hours === "12") {
      formattedTime = `12:${minutes} PM`;
    } else {
      formattedTime = `${parseInt(hours) - 12}:${minutes} PM`;
    }
    return formattedTime;
  }

  const start_date = formatDate(event.start_date);
  const end_date = formatDate(event.end_date);

  return (
    <Link
      href={`/events/view/${event.id}`}
      className="flex w-full	flex-col items-center gap-2 rounded text-dark-300 shadow-lg transition-all  duration-300 hover:opacity-90 hover:shadow-2xl dark:text-light-600 "
    >
      {/* image */}
      <div className="group relative aspect-[4/5] h-full w-full  rounded ">
        <Image
          src={event.cover}
          alt={`${event.name} cover image`}
          className="rounded-t object-cover "
          fill
        />
        <div className="absolute bottom-2 right-2  z-10 flex flex-col items-center gap-2 rounded bg-light-300 pt-2 text-xs font-medium  shadow  transition-all  duration-500 group-hover:opacity-0  dark:bg-dark-400 ">
          <div className="flex flex-col items-center gap-2 px-1">
            <span className="px-1 ">
              {start_date.dayOfWeek === end_date.dayOfWeek
                ? start_date.dayOfWeek
                : `${start_date.dayOfWeek} - ${end_date.dayOfWeek}`}
            </span>

            <span className=" px-1	text-base font-semibold text-brand">
              {start_date.day === end_date.day
                ? start_date.day
                : `${start_date.day} - ${end_date.day}`}
            </span>

            <span className="px-1 ">
              {start_date.month === end_date.month
                ? start_date.month
                : `${start_date.month} - ${end_date.month}`}
            </span>
          </div>
          <span className="w-full rounded-b bg-brand py-2 text-center font-bold text-light-600 ">
            {Number(event.price) > 0 ? `Ksh ${event.price}` : "FREE"}
          </span>
        </div>
      </div>

      {/* events details */}
      <div className="flex w-full items-center gap-1 px-3 pb-2 ">
        <div className="flex flex-col gap-1">
          <h1 className="text-base font-semibold ">
            {event.name.toUpperCase()}
          </h1>

          <span className="flex gap-1 text-xs font-medium">
            <LocationIcon className="h-4 w-4" />
            {event.location}
          </span>
          <span className="flex gap-1 text-xs font-medium">
            <ClockIcon className="h-4 w-4" />
            {`${formatTime(event.start_time)} - ${formatTime(event.end_time)}`}
          </span>
        </div>
      </div>
    </Link>
  );
}
