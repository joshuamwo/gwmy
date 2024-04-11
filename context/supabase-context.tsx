import type { SupabaseClient } from "@supabase/supabase-js";
import { createContext, useEffect, useContext } from "react";
import { useRecoilState } from "recoil";
import { getUserDoneState, userState } from "@/recoil/atoms";
import { UserStateType } from "@/types";
import { createClient } from "@/utils/supabase/client";

type SupabaseContextType = {
  supabase: SupabaseClient;
};

const SupabseContext = createContext<SupabaseContextType | undefined>(
  undefined,
);
const UserContext = createContext<UserStateType | undefined>(undefined);

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [getUserDone, setGetUserDone] = useRecoilState(getUserDoneState);

  const supabase = createClient();

  //set user state
  const [user, setUser] = useRecoilState(userState);

  //function to	get user
  async function getUser() {
    const { data, error } = await supabase.from("profiles").select("*");
    if (!error) {
      setUser(data[0]);
      setGetUserDone(true);
    } else {
      // setUser(null);
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

export const userContext = () => {
  const context = useContext(UserContext);
  return context;
};
