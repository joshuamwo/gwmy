import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
// import { useModalAction, useModalState } from "./modal-controller";
import { useEffect, Fragment } from "react";
import { usePathname } from "next/navigation";
import RegisterForm from "../auth/register-form";
import { CloseIcon } from "../icons/close-icon";

type ModalToggleProps = "open" | "close";
interface ModalContainerProps {
  modalIsOpen?: boolean;
  modalToggle: (action: ModalToggleProps) => void;
}

export function ModalContainer({
  modalIsOpen,
  modalToggle,
}: ModalContainerProps) {
  const router = useRouter();

  // const { view, isOpen } = useModalState();
  // const { closeModal } = useModalAction();

  // close modal when route change
  let pathname: string = "";
  const newPathname = usePathname();

  useEffect(() => {
    if (pathname !== newPathname) {
      console.log("pathname changed");
      // closeModal();
    }
    pathname = newPathname;
  }, [newPathname]);

  return (
    <Transition show={modalIsOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden xs:p-4"
        onClose={() => modalToggle("close")}
      >
        <div className="min-h-screen text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 z-40 cursor-pointer bg-dark bg-opacity-60 backdrop-blur dark:bg-opacity-80" />
          </Transition.Child>
          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-110"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-110"
          >
            <div className="relative z-50 inline-block min-h-screen w-full transform overflow-hidden text-start align-middle transition-all xs:min-h-[auto] xs:w-auto">
              <div className="relative flex min-h-screen items-center overflow-hidden xs:block xs:min-h-[auto] xs:rounded-md">
                <button
                  onClick={() => modalToggle("close")}
                  aria-label="Close panel"
                  className="absolute top-5 z-10 text-dark-900 outline-none transition-all hover:text-dark focus-visible:outline-none right-4  dark:text-dark-800 hover:dark:text-light-200 md:top-6 md:right-5 lg:top-7 lg:right-7 
																		"
                >
                  <CloseIcon className="h-4 w-4 focus-visible:outline-none lg:h-[18px] lg:w-[18px] 3xl:h-5 3xl:w-5" />
                </button>
                <div className="h-full w-full">
                  {/* {view && renderModalContent(view)}
                   */}
                  <RegisterForm />
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
