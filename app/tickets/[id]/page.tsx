"use client";

import { SmileyIcon } from "@/components/icons/smiley-icon";
import "./styles.css";
import { useSupabase } from "@/context/supabase-context";
import { useEffect, useState } from "react";

interface Ticket {
  holders_name: string;
  ticket_number: string;
}

export default function Ticket({ params }: { params: { id: string } }) {
  const ticketId = params.id;

  const [ticket, setTicket] = useState<Ticket>();

  //fetch ticket & event from supabase
  const { supabase } = useSupabase();

  async function fetchTicket() {
    try {
      const { data, error } = await supabase
        .from("tickets")
        .select("*")
        .eq("id", ticketId);
      if (error) throw error;
      console.log(data);
      setTicket(data[0]);
    } catch (error) {
      console.error("Error fetching ticket", error);
    }
  }

  useEffect(() => {
    fetchTicket();
  }, [undefined]);

  return (
    <div className="min-w-screen flex min-h-screen items-center justify-center bg-pink-600 p-4 dark:bg-pink-600">
      {/* the ticket */}
      {ticket && (
        <div className="flex rotate-90 scale-75 bg-pink-600 shadow-lg shadow-dark-300 xs:scale-90 sm:rotate-0 sm:scale-100">
          <div className=" flex">
            <div className="ml-7 h-full w-[250px] bg-opacity-80 bg-[url('https://cdn-az.allevents.in/events1/banners/039e456619af4a1c7d596d1cc7b29bb0d125a6cecaa51fcdfb46f79e4aad958c-rimg-w768-h960-dc162035-gmir?v=1713581427')] bg-cover font-liches font-bold sm:w-[250px] ">
              <p className="absolute -ml-6 flex h-full -rotate-180 justify-around py-3 text-center text-base tracking-[0.15em] text-light-600 [writing-mode:vertical-rl] ">
                <span className="opacity-80">ADMIT ONE</span>
                <span className="!text-light-300">ADMIT ONE</span>{" "}
                <span className="opacity-80">ADMIT ONE</span>
              </p>
              <div className="flex h-full w-full items-end justify-end  p-1.5 text-xl  tracking-wide text-white  ">
                <p className=" ">#{ticket.ticket_number}</p>
              </div>
            </div>
          </div>
          <div className="flex min-w-[500px] flex-col justify-between justify-items-stretch bg-light-300 px-10 py-3 text-center ">
            <p className="flex items-center justify-around border-y border-dark-200 py-1.5 font-liches font-medium text-dark-300 ">
              <span className="w-[100px] text-left text-lg ">FRI - SUN</span>
              <span className="w-[100px] text-[20px] font-semibold text-pink-500  ">
                APR 26 - 28
              </span>
              <span className="w-[100px] text-right text-lg ">2024</span>
            </p>
            {/* event name */}
            <div className=" font-nanum text-dark-200 ">
              <h1 className="text-6xl font-semibold tracking-widest text-indigo-700 ">
                {" "}
                Malkia Summit{" "}
              </h1>
              <h2 className="text-5xl  text-pink-500 ">
                {ticket.holders_name}
              </h2>
            </div>
            <div className=" py-3 font-liches text-xl font-medium tracking-widest text-indigo-700 ">
              <p>
                9:00 AM <span>TO</span> 5:00 PM
              </p>
              <p>
                Friday <span>TO</span> Sunday
              </p>
            </div>
            <p className="flex w-full items-center justify-around border-t border-dark-200 pt-2 font-liches text-[20px] text-dark-200 ">
              <span>Lifepool Chapel</span>
              <span className="separator">
                <SmileyIcon className="h-7 w-7 stroke-2 " />
              </span>
              <span>NOONKOPIR, Kitengela</span>
            </p>
          </div>

          {/* right */}
          <div className="relative flex items-center justify-center bg-pink-600 p-4 ">
            <p className="absolute right-0 flex h-full -rotate-180 justify-around py-3 text-center font-liches text-base text-lg tracking-[0.15em] text-light-200 [writing-mode:vertical-lr] ">
              #{ticket.ticket_number}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
