"use	client";

import ProfileButton from "../ui/profile-button";
import { userState } from "@/recoil/atoms";
import { useRecoilState } from "@/recoil/recoil";
import { useModalAction } from "../modals/modal-controller";
import { Menu } from "@/components/ui/dropdown";
import { Fragment, useState } from "react";
import { Avatar } from "@mui/material";
import { useSupabase } from "@/context/supabase-context";
import { useRouter } from "next/navigation";
import { Transition } from "@/components/ui/transition";
import ActiveLink from "../ui/active-link";

const AuthorizedMenuItems = [
  {
    label: "Profile",
    href: "/user/profile",
  },
  {
    label: "Orders",
    href: "/user/orders",
  },
];

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
        })
        .catch((err) => {
          router.refresh();
          setLoading(false);
        });
    }
    router.refresh();
  }
  return (
    <Menu>
      <Menu.Button className="relative inline-flex h-8 w-8 justify-center rounded-full border border-light-400 bg-light-300 dark:border-dark-500 dark:bg-dark-500">
        <Avatar
          src={user?.avatar_url}
          alt={user.full_name}
          sx={{ width: 28, height: 28 }}
        />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute top-[84%] z-30 mt-4 w-56 rounded-md bg-light py-1.5 text-dark shadow-dropdown right-0 origin-top-right  dark:bg-dark-250 dark:text-light">
          {AuthorizedMenuItems.map((item) => (
            <Menu.Item key={item.href}>
              <ActiveLink
                href={item.href}
                className="transition-fill-colors flex w-full items-center px-5 py-2.5 hover:bg-light-400 dark:hover:bg-dark-600"
              >
                {item.label}
              </ActiveLink>
            </Menu.Item>
          ))}

          <Menu.Item>
            <button
              type="button"
              className="transition-fill-colors w-full px-5 py-2.5 hover:bg-light-400 text-left  dark:hover:bg-dark-600"
              onClick={(e) => signOut(e)}
            >
              Sign Out
            </button>
          </Menu.Item>
        </Menu.Items>
      </Transition>
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
