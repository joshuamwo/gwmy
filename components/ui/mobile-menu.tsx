import { useCart } from "@/context/cart-context";
import { useDrawer } from "../drawer/drawer-context";
import { CloseIcon } from "../icons/close-icon";
import Scrollbar from "../ui/scrollbars";
import Button from "../ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Sidebar from "../sections/sidebar";
import CustomerSidebar from "../sections/customer-sidebar";
import AdminSidebar from "../sections/admin-sidebar";
import { useRecoilValue } from "recoil";
import { userState } from "@/recoil/atoms";

export default function MobileMenu() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { closeDrawer } = useDrawer();

  //get user state
  const user = useRecoilValue(userState);

  return (
    <>
      <div className="flex h-16 items-center justify-between px-5 py-2 sm:px-7">
        <Link href="/" className="flex gap-1 text-light-200">
          {/* <h1 className="font-bold">GWMY</h1> */}
          {["G", "W", "M", "Y"].map((letter) => (
            <div className="group" key={letter}>
              <h1 className=" flex w-8 justify-center rounded bg-brand p-1 transition-all duration-500 hover:bg-dark-400">
                {letter}
              </h1>
              {/* tooltip */}
              <div className=" absolute  mt-1 hidden w-8 flex-col rounded bg-brand p-1 text-center group-hover:flex  group-hover:animate-bounce ">
                {letter === "G"
                  ? ["O", "D"].map((letter) => (
                      <span key={letter}>{letter}</span>
                    ))
                  : letter === "W"
                    ? ["W", "A", "N", "T", "S"].map((letter) => (
                        <span key={letter}>{letter}</span>
                      ))
                    : letter === "M"
                      ? ["E"].map((letter) => (
                          <span key={letter}>{letter}</span>
                        ))
                      : ["Y", "O", "U", "N", "G"].map((letter) => (
                          <span key={letter}>{letter}</span>
                        ))}
              </div>
            </div>
          ))}
        </Link>

        <div className="ml-3 flex h-7 items-center">
          <button
            type="button"
            className="-m-2 p-2 text-dark-800 outline-none transition-all hover:text-dark hover:dark:text-light-200"
            onClick={closeDrawer}
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      {user && (
        <div className="cart-scrollbar flex h-full w-full items-end dark:bg-dark-100">
          <div className="h-1/2 w-full ">
            {user?.user_type !== "alpha" ? (
              <CustomerSidebar sidebarIsOpen={true} classname="marker:" />
            ) : (
              <AdminSidebar sidebarIsOpen={true} classname="" />
            )}
          </div>
        </div>
      )}
    </>
  );
}
