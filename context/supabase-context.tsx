import type { SupabaseClient } from "@supabase/supabase-js";
import { createContext, useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { useRecoilState } from "recoil";
import { userState } from "@/recoil/atoms";
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
    } else {
      setUser(null);
      console.log(error);
    }
  }

  getUser();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      router.refresh();
    });

    //refresh user
    getUser();

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, router]);

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
