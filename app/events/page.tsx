"use client";

import { SpinnerIcon } from "@/components/icons/spinner-icon";
import EventCard from "@/components/ui/event-card";
import { useSupabase } from "@/context/supabase-context";
import { Event } from "@/types";
import { useEffect, useState } from "react";

export default function EventPage() {
  const { supabase } = useSupabase();

  const [fetching, setFetching] = useState(true);
  const [events, setEvents] = useState<Event[]>();

  async function fetchEvents() {
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .returns<Event[]>();

      if (error) {
        throw error;
      } else {
        console.log("events", data);
        setEvents(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setFetching(false);
    }
  }

  useEffect(() => {
    fetchEvents();
  }, [undefined]);

  return (
    <div className="h-full w-full">
      {!fetching && events && (
        <div className="grid p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 ">
          {events.map((event) => {
            return <EventCard event={event} key={event.id} />;
          })}
        </div>
      )}
      {!fetching && !events && (
        <div className="flex h-full w-full items-center justify-center">
          <h1>No Events at the moment. Check back later.</h1>
        </div>
      )}
      {fetching && (
        <div className="flex h-full w-full items-center justify-center ">
          <SpinnerIcon className="h-5 w-5 animate-spin " />
        </div>
      )}
    </div>
  );
}
