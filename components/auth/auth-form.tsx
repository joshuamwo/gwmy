import Button from "../ui/button";
import { FormBgPattern } from "./form-bg-pattern";
import { useSupabase } from "@/context/supabase-context";
import { GoogleIcon } from "../icons/google-icon";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function AuthForm() {
  // Supabase signup
  // const { supabase } = useSupabase();
  const supabase = createClient();
  const pathname = usePathname();

  const provider = "google";

  const signIn = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=${pathname}`,
      },
    });

    if (error) {
      window.alert(error.message);
    }
  };

  // SignUp vs SignIn state
  const [isSignIn, setIsSignIn] = useState<boolean>(false);

  return (
    <div className="bg-light px-6 pb-8 pt-10 dark:bg-dark-300 sm:px-8 lg:p-12">
      <FormBgPattern className="absolute bottom-0 left-0 hidden text-light dark:text-dark-300 dark:opacity-60 xs:flex" />
      <div className="relative z-10 flex items-center">
        <div className="mb-9 mt-7 w-full shrink-0 text-left md:w-[380px]">
          <div className=" flex flex-col pb-5 text-center lg:pb-9 xl:pb-10 xl:pt-2">
            <h2 className="text-lg font-medium tracking-[-0.3px] text-dark dark:text-light lg:text-xl">
              We Hate Passwords Too!
            </h2>
          </div>
          <div className="flex flex-col items-center space-y-4 lg:space-y-5">
            <Button
              type="submit"
              className="w-full text-sm tracking-[0.2px]"
              onClick={signIn}
            >
              <GoogleIcon className="fill-white " />
              Sign In With Google
            </Button>

            {/* <div className="text-13px leading-6 tracking-[0.2px] dark:text-light-900">
              {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={signIn}
                className="inline-flex font-semibold text-brand hover:text-dark-400 hover:dark:text-light-500"
              >
                {isSignIn ? "Sign Up" : "Sign In"}
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
