import Button from "../ui/button";
import { FormBgPattern } from "./form-bg-pattern";
import { useSupabase } from "@/context/supabase-context";
import { GoogleIcon } from "../icons/google-icon";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function AuthForm() {
  // Supabase signup
  const { supabase } = useSupabase();
  const pathname = usePathname();
  const provider = "google";

  const signUp = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `http://localhost:3000/auth/callback`,
      },
    });
    if (error) {
      window.alert(error.message);
    }
  };

  const signIn = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `http://localhost:3000/auth/callback`,
      },
    });
  };

  // SignUp vs SignIn state
  const [isSignIn, setIsSignIn] = useState<boolean>(false);

  return (
    <div className="bg-light px-6 pt-10 pb-8 dark:bg-dark-300 sm:px-8 lg:p-12">
      <FormBgPattern className="hidden xs:flex absolute bottom-0 left-0 text-light dark:text-dark-300 dark:opacity-60" />
      <div className="relative z-10 flex items-center">
        <div className="w-full shrink-0 text-left md:w-[380px]">
          <div className="flex flex-col pb-5 text-center lg:pb-9 xl:pb-10 xl:pt-2">
            <h2 className="text-lg font-medium tracking-[-0.3px] text-dark dark:text-light lg:text-xl">
              We Hate Passwords Too!
            </h2>
          </div>
          <div className="space-y-4 lg:space-y-5 flex flex-col items-center">
            <Button
              type="submit"
              className="!my-5 w-full text-sm tracking-[0.2px] lg:!my-7"
              onClick={isSignIn ? signIn : signUp}
            >
              <GoogleIcon className="fill-white " />
              {isSignIn ? "Sign In With Google" : "Sign Up With Google"}
            </Button>

            <div className="text-13px leading-6 tracking-[0.2px] dark:text-light-900">
              {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={isSignIn ? signIn : signUp}
                className="inline-flex font-semibold text-brand hover:text-dark-400 hover:dark:text-light-500"
              >
                {isSignIn ? "Sign Up" : "Sign In"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
