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
    <div className="min-w-screen flex min-h-screen items-center justify-center bg-pink-600 p-4">
      {/* the ticket */}
      {ticket && (
        <div className="flex rotate-90 scale-75 bg-white shadow-lg shadow-dark-300 xs:scale-90 sm:rotate-0 sm:scale-100">
          <div className=" flex">
            <div className="h-full w-[300px] bg-[url('https://media.pitchfork.com/photos/60db53e71dfc7ddc9f5086f9/1:1/w_1656,h_1656,c_limit/Olivia-Rodrigo-Sour-Prom.jpg')] bg-cover font-liches font-bold opacity-80 sm:w-[300px] ">
              <p className="absolute flex h-full -rotate-180 justify-around py-3 text-center text-base tracking-[0.15em] text-dark-800 [writing-mode:vertical-rl] ">
                <span className="">ADMIT ONE</span>
                <span className="!text-light-300">ADMIT ONE</span>{" "}
                <span className="">ADMIT ONE</span>
              </p>
              <div className="flex h-full w-full items-end justify-end  p-1.5 text-xl  tracking-wide text-white  ">
                <p className=" ">#{ticket.ticket_number}</p>
              </div>
            </div>
          </div>
          <div className="flex min-w-[500px] flex-col justify-between justify-items-stretch px-10 py-3 text-center ">
            <p className="flex items-center justify-around border-y border-dark-200 py-1.5 font-liches font-medium text-dark-300 ">
              <span className="w-[100px] text-left text-lg ">TUESDAY</span>
              <span className="w-[100px] text-[20px] font-semibold text-pink-500  ">
                JUNE 29TH
              </span>
              <span className="w-[100px] text-right text-lg ">2021</span>
            </p>
            {/* event name */}
            <div className=" font-nanum text-dark-200 ">
              <h1 className="text-6xl font-semibold tracking-widest text-purple-700 ">
                {" "}
                Malkias Summit{" "}
              </h1>
              <h2 className="text-5xl  text-pink-500 ">
                {ticket.holders_name}
              </h2>
            </div>
            <div className=" py-3 font-liches text-xl font-medium tracking-widest text-purple-700 ">
              <p>
                8:00 PM <span>TO</span> 11:00 PM
              </p>
              <p>
                DOORS <span>@</span> 7:00 PM
              </p>
            </div>
            <p className="flex w-full items-center justify-around border-t border-dark-200 pt-2 font-liches text-[20px] text-dark-200 ">
              <span>Lifepool Chapel</span>
              <span className="separator">
                <SmileyIcon className="h-7 w-7 stroke-2 " />
              </span>
              <span>Embakasi, Nairobi</span>
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
