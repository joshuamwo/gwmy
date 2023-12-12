import type { SupabaseClient } from "@supabase/supabase-js";
import { createContext, useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { useRecoilState } from "recoil";
import { getUserDoneState, userState } from "@/recoil/atoms";
import { UserStateType } from "@/types";

type SupabaseContextType = {
  supabase: SupabaseClient;
};

const SupabseContext = createContext<SupabaseContextType | undefined>(
  undefined
);
const UserContext = createContext<UserStateType | undefined>(undefined);

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const provider = "google";
  const [getUserDone, setGetUserDone] =
    useRecoilState(getUserDoneState);

  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  );

  //set user state
  const [user, setUser] = useRecoilState(userState);

  //function to	get user
  async function getUser() {
    const { data, error } = await supabase.from("profiles").select("*");
    if (!error) {
      setUser(data[0]);
      setGetUserDone(true);
    } else {
      setUser(null);
      setGetUserDone(true);
    }
  }

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      getUser();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  return (
    <SupabseContext.Provider value={{ supabase }}>
      <UserContext.Provider value={user}>
        <>{children}</>
      </UserContext.Provider>
    </SupabseContext.Provider>
  );
}

export const useSupabase = () => {
  const context = useContext(SupabseContext);
  if (context === undefined) {
    throw new Error("useSupabase must be used within a SupabaseProvider");
  }
  return context;
};

// export const userContext = () => {
//   const context = useContext(UserContext);
//   if (context === undefined) {
//     throw new Error("userContext must be used within a UserContext");
//   }
//   return context;
// };
