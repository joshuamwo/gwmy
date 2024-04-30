"use client";

import { SmileyIcon } from "@/components/icons/smiley-icon";
import "./styles.css";
import { useSupabase } from "@/context/supabase-context";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Event } from "@/types";
import Image from "next/image";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Button from "@/components/ui/button";

interface Ticket {
  holders_name: string;
  ticket_number: number;
  event_id: string;
}

export default function Ticket({ params }: { params: { id: string } }) {
  const ticketId = params.id;

  const [ticket, setTicket] = useState<Ticket>();
  const [event, setEvent] = useState<Event>();
  const [startDate, setStartDate] = useState<{
    day: number;
    month: string;
    dayOfWeek: string;
    year: number;
  }>();
  const [endDate, setEndDate] = useState<{
    day: number;
    month: string;
    dayOfWeek: string;
    year: number;
  }>();

  const [startTime, setStartTime] = useState<string>();
  const [endTime, setEndTime] = useState<string>();

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
    const year = date.getFullYear();

    const formattedDate = {
      day,
      month,
      dayOfWeek,
      year,
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
      await fetchEvent(data[0].event_id);
    } catch (error) {
      console.error("Error fetching ticket", error);
    }
  }

  const handleDownloadTicket = async () => {
    const element = document.getElementById("the_ticket");
    if (element && event && ticket) {
      const canvas = await html2canvas(element);
      const data = canvas.toDataURL("image/jpg");
      const link = document.createElement("a");

      link.href = data;
      link.download = `${event.name}-${ticket.ticket_number}.png`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const fetchEvent = async (eventId: string) => {
    try {
      const { error, data } = await supabase
        .from("events")
        .select("*")
        .eq("id", eventId);

      if (error) throw error;
      setEvent(data[0]);
      setStartDate(formatDate(data[0].start_date));
      setEndDate(formatDate(data[0].end_date));
      setStartTime(formatTime(data[0].start_time));
      setEndTime(formatTime(data[0].end_time));
    } catch (error) {
      // console.error("Error fetching event", error);
    }
  };

  useEffect(() => {
    fetchTicket();
    toast("Take a screenshot of your ticket.", {
      duration: 10000,
    });
  }, [undefined]);

  return (
    <div className=" relative flex h-screen flex-col items-center justify-center overflow-auto  ">
      {/* the ticket */}
      {ticket && event && (
        <>
          <div
            id="the_ticket"
            // className="flex  overflow-auto"
            className=" flex rotate-90 scale-75 bg-brand shadow-lg shadow-dark-300 xs:scale-90 sm:rotate-0 sm:scale-100"
          >
            <div className="relative flex h-[300px] w-[300px] items-center justify-center bg-brand">
              <Image
                src={event.cover}
                alt={event.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex min-w-[500px] flex-col justify-between justify-items-stretch bg-light-300 px-10 py-2 text-center ">
              <p className="flex items-center justify-around border-b border-dark-200 pb-2 font-liches font-medium text-dark-300 ">
                <span className="w-[100px] text-[20px] font-medium   ">
                  {startDate?.month === endDate?.month && startDate?.month}{" "}
                  {startDate?.month === endDate?.month &&
                    (startDate?.day === endDate?.day
                      ? startDate?.day
                      : `${startDate?.day} - ${endDate?.day}`)}
                  {startDate?.month !== endDate?.month &&
                    ` ${startDate?.month} ${startDate?.day} - ${endDate?.month} ${endDate?.day}`}
                </span>
                <span className="w-[100px] text-right text-lg ">
                  {startDate?.year === endDate?.year
                    ? startDate?.year
                    : `${startDate?.year} - ${endDate?.year}`}
                </span>
              </p>
              {/* event name */}
              <div className=" font-liches text-dark-400 ">
                <h1 className="text-3xl tracking-widest">{event.name}</h1>
                <h2 className="mt-3 font-nanum text-5xl text-brand ">
                  {ticket.holders_name}
                </h2>
              </div>
              <div className=" font-liches text-xl font-medium tracking-widest text-dark-300 ">
                <p>
                  {startTime ?? ""} <span>TO</span> {endTime ?? ""}
                </p>
              </div>
              <p className=" flex w-full items-center justify-around border-t border-dark-200 pt-2 font-liches text-[20px] text-dark-200 ">
                <span className=""> {event.host}</span>
                <SmileyIcon className=" h-7 w-7 stroke-2" />
                <span className="">{event.venue}</span>
              </p>
            </div>

            {/* right */}
            <div className="relative flex flex-col items-center justify-center bg-brand p-4 font-liches text-2xl ">
              <span className="font-medium">#</span>
              {ticket.ticket_number
                .toString()
                .split("")
                .map((num, index) => (
                  <span key={index} className="text-l">
                    {num}
                  </span>
                ))}
            </div>
          </div>
          <Button
            onClick={handleDownloadTicket}
            className="absolute bottom-4 right-4 z-20 rounded-md bg-brand p-2 text-white"
          >
            Download
          </Button>
        </>
      )}
    </div>
  );
}
