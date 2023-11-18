"use	client";

import ProfileButton from "../ui/profile-button";
import { userState } from "@/recoil/atoms";
import { useRecoilState } from "@/lib/recoil";
import { useModalAction } from "../modals/modal-controller";
import { Menu } from "@/components/ui/dropdown";
import { useState } from "react";
import { Avatar } from "@mui/material";
import { useSupabase } from "@/context/supabase-context";
import { useRouter } from "next/navigation";

function AuthorizedMenu({ user, setUser }: any) {
  const [loading, setLoading] = useState(false);
  const { supabase } = useSupabase();
  const router = useRouter();

  async function signOut(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    // e.preventDefault();
    setLoading(true);
    // Check if we have a session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      await supabase.auth
        .signOut()
        .then((res) => {
          setUser(null);
          setLoading(false);
          router.refresh();
          console.log("Signed Out", res);
        })
        .catch((err) => {
          console.log(err);
          router.refresh();
          setLoading(false);
        });
    }
    router.refresh();
  }
  console.log(user);
  return (
    <Menu>
      <Menu.Button>
        {user?.avatar_url ? (
          <Avatar
            src={user?.avatar_url}
            alt={user.full_name}
            sx={{ width: 28, height: 28 }}
          />
        ) : (
          <Avatar>{user?.full_name[0]}</Avatar>
        )}
      </Menu.Button>
    </Menu>
  );
}

export default function ProfileMenu() {
  const { openModal } = useModalAction();
  const [user, setUser] = useRecoilState(userState);

  function handleProfileMenuClick() {
    user ? " " : openModal("AUTHFORM");
  }
  //create a menu depending on user auth status
  return (
    //if user is logged in
    user ? (
      <AuthorizedMenu user={user} setUser={setUser} />
    ) : (
      <ProfileButton handleClick={handleProfileMenuClick} />
    )
  );
}
