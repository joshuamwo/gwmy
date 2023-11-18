import { useSupabase } from "@/context/supabase-context";
import { useRecoilState } from "@/recoil/recoil";
import { userState } from "@/recoil/atoms";
import { useRouter } from "next/navigation";
import { SupabaseClient } from "@supabase/supabase-js";

interface signOutProps {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  supabase: SupabaseClient<any, "public", any>;
}

const signOut = async ({ loading, setLoading, supabase }: signOutProps) => {
  setLoading(true);
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    await supabase.auth
      .signOut()
      .then((res) => {
        setUser(null);
        router.refresh();
        setLoading(false);
      })
      .catch((err) => {
        router.refresh();
        setLoading(false);
      });
  }
  router.refresh();
};

export function useSignOut({ loading, setLoading, supabase }: signOutProps) {
  return signOut({ loading, setLoading, supabase });
}
