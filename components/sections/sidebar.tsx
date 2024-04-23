import { useRecoilValue } from "recoil";
import { getUserDoneState } from "@/recoil/atoms";
import CustomerSidebar from "./customer-sidebar";
import { classnames } from "@/utils/classnames";
import AdminSidebar from "./admin-sidebar";
import { useIsMounted } from "@/lib/hooks/use-is-mounted";
import { useRecoilState } from "recoil";
import { userContext } from "@/context/supabase-context";
import { LoaderIcon } from "react-hot-toast";
import Trending from "../ui/trending";

interface SidebarProps {
  sidebarIsOpen: boolean;
  className?: string;
}

export default function Sidebar({
  sidebarIsOpen,
  className = "hidden sm:flex bottom-0 z-20",
}: SidebarProps) {
  const user = userContext();
  const isMounted = useIsMounted();
  const getUserDone = useRecoilValue(getUserDoneState);

  return (
    <aside
      className={classnames(
        "flex flex-col gap-2  transition-all duration-500   ",
        sidebarIsOpen ? "sm:w-96" : "sm:w-20",
        className,
      )}
    >
      <div className="flex w-full flex-col rounded-md bg-light-400 text-dark-400 dark:bg-dark-100 ">
        {isMounted && getUserDone ? (
          user?.user_type !== "alpha" ? (
            <CustomerSidebar
              sidebarIsOpen={sidebarIsOpen}
              classname={className}
            />
          ) : (
            <AdminSidebar sidebarIsOpen={sidebarIsOpen} classname={className} />
          )
        ) : (
          <div className="flex h-[104px] items-center justify-center ">
            <LoaderIcon />
          </div>
        )}
      </div>
      <div className="flex h-full w-full flex-grow rounded-md bg-light-400 p-5 text-dark-600 dark:bg-dark-100 dark:text-light-900 ">
        <Trending />
      </div>
    </aside>
  );
}
