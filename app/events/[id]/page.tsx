"use client";

import { useSupabase, userContext } from "@/context/supabase-context";
import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/button";
import Input from "@/components/forms/input";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Event {
  id: string;
  name: string;
  cover: string;
  price: string;
  host: string;
  start_date: string;
  end_date: string;
}

interface TicketingFormData {
  name?: string;
  phone?: string;
}

export default function Event({ params }: { params: { id: string } }) {
  const eventId = params.id;

  const user = userContext();

  const router = useRouter();

  const [event, setEvent] = useState<Event>();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<TicketingFormData>();

  //fetch event from supabase
  const { supabase } = useSupabase();
  const fetchEvent = async () => {
    try {
      const { error, data } = await supabase
        .from("events")
        .select("*")
        .eq("id", eventId);

      if (error) throw error;
      setEvent(data[0]);
    } catch (error) {
      // console.error("Error fetching event", error);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [undefined]);

  async function handleTicketing() {
    if (!formData || !formData.name || !formData.phone) return;
    setTimeout(() => {
      setLoading(true);
    }, 5);
    try {
      const { data, error } = await supabase
        .from("tickets")
        .insert([
          {
            holders_name: formData.name,
            phone: formData.phone,
            event_id: event?.id,
          },
        ])
        .select();

      if (error) {
        throw error;
      }
      toast.success("Ticket purchased, redirecting to ticket...");
      setTimeout(() => {
        router.push(`/tickets/${data[0].id}`);
      }, 200);
    } catch (error) {
      toast.error("Failed to purchase ticket, please try again");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {event && (
        <div className="flex flex-col gap-7">
          {/* Album name and cover */}

          <div className="flex min-h-[200px] items-end bg-light-600  dark:bg-dark-400 md:h-[50vh] ">
            <div className="flex w-full flex-col items-start gap-2 pb-4 sm:flex-row sm:items-end sm:pl-4 ">
              <div className="relative h-[100vw] min-h-[150px] w-[100vw] min-w-[150px] rounded shadow sm:h-[30vw] sm:max-h-[45vh] sm:w-[40vw] sm:max-w-[48vh] ">
                <Image
                  src={event.cover}
                  alt={event.name}
                  fill
                  className="rounded object-cover shadow-lg "
                />
              </div>

              <div className="flex w-full items-end justify-between px-2 sm:h-[30vw] sm:items-end sm:px-2 ">
                <div className="order-2 -mb-2 flex justify-end sm:mb-0">
                  <div className=" flex flex-col items-center gap-2 rounded-lg  bg-light-400 pt-2 text-sm  font-medium shadow  dark:bg-dark-300 ">
                    <span className="px-4">FRI - SUN</span>
                    <span className="px-2 text-xl font-semibold text-brand ">
                      26 - 28
                    </span>
                    <span className="px-4">APRIL</span>
                    <span className="	w-full rounded-b bg-brand py-2 text-center font-semibold text-light-200">
                      FREE
                    </span>
                  </div>
                </div>

                <div className="order-1 flex flex-col gap-2 pl-4  md:gap-4">
                  <h3 className=" font-medium">Event</h3>
                  <h1 className="text-3xl font-bold xs:text-2xl sm:text-3xl md:text-4xl  lg:text-5xl">
                    {event.name}{" "}
                  </h1>
                  <h3 className="flex flex-wrap gap-2 text-base font-medium">
                    <span>{event.host}</span>
                    {/* {track.other_artists &&
                    track.other_artists.map((artist, index) => (
                      <span key={index}>• {artist}</span>
                    ))} */}
                    {/*  */}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* actions */}
          <div className=" ">
            <h1 className="px-4 text-2xl font-medium text-dark-300 dark:text-light-800">
              Get your ticket 👇
            </h1>
            {/* get ticket form */}

            <form
              action={handleTicketing}
              className="flex w-full flex-col gap-7 p-4"
            >
              <div className="flex w-full flex-col gap-4 sm:flex-row ">
                <Input
                  id="name"
                  name="name"
                  required
                  label="Enter your name"
                  placeholder="Enter your name"
                  className="w-full"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <Input
                  id="phone"
                  name="phone"
                  required
                  label="Enter your phone number"
                  placeholder="07********	"
                  className="w-full"
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>

              <div className="flex w-full justify-end">
                <Button
                  type="submit"
                  isLoading={loading}
                  className="relative h-10 w-44 rounded-full"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Get Ticket"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
