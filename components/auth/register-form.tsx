import { useModalAction } from "../modals/modal-controller";
import { RegisterInput } from "@/types";
import Input from "../forms/input";
import Button from "../ui/button";
import Password from "../forms/password";
import { useEffect, useState } from "react";
import { FormBgPattern } from "./form-bg-pattern";

export default function RegisterForm() {
  const { openModal, closeModal } = useModalAction();
  const [registerInput, setRegisterInput] = useState<RegisterInput>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.id, e.target.value);
    setRegisterInput({
      ...registerInput,
      [e.target.id]: e.target.value,
    });
  };

  useEffect(() => {
    console.log(registerInput);
  }, [registerInput]);

  return (
    <div className="bg-light px-6 pt-10 pb-8 dark:bg-dark-300 sm:px-8 lg:p-12">
      <FormBgPattern className="absolute bottom-0 left-0 text-light dark:text-dark-300 dark:opacity-60" />

      <div className="relative z-10 flex items-center">
        <div className="w-full shrink-0 text-left md:w-[380px]">
          <div className="flex flex-col pb-5 text-center lg:pb-9 xl:pb-10 xl:pt-2">
            <h2 className="text-lg font-medium tracking-[-0.3px] text-dark dark:text-light lg:text-xl">
              Welcome Back
            </h2>
            <div className="mt-1.5 text-13px leading-6 tracking-[0.2px] dark:text-light-900 lg:mt-2.5 xl:mt-3">
              Create an account to continue{" "}
              <button
                // onClick={() => openModal("LOGIN_VIEW")}
                className="inline-flex font-semibold text-brand hover:text-dark-400 hover:dark:text-light-500"
              >
                Log In
              </button>
            </div>
          </div>

          <form className="space-y-4 lg:space-y-5">
            <>
              <div className="flex flex-row">
                {" "}
                <Input
                  id="firstName"
                  label="First Name"
                  className="mr-4"
                  inputClassName="bg-light dark:bg-dark-300 "
                  onChange={onInputChange}
                />
                <Input
                  id="lastName"
                  label="Last Name"
                  className=" ml-4"
                  inputClassName="bg-light dark:bg-dark-300"
                  onChange={onInputChange}
                />
              </div>

              <Input
                id="email
									"
                label="Your Email"
                inputClassName="bg-light dark:bg-dark-300"
                type="email"
                onChange={onInputChange}
              />
              <Password
                id="password"
                label="Password"
                inputClassName="bg-light dark:bg-dark-300"
                onChange={onInputChange}
              />
              <Button
                type="submit"
                className="!mt-5 w-full text-sm tracking-[0.2px] lg:!mt-7"
              >
                Register
              </Button>
            </>
          </form>
        </div>
      </div>
    </div>
  );
}
