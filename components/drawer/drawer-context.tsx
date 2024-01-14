import { useRecoilState } from "recoil";
import { drawerState } from "@/recoil/atoms";
import { DrawerType } from "@/types";

export function useDrawer() {
  const [state, setState] = useRecoilState(drawerState);

  function openDrawer(drawerType: DrawerType) {
    setState({ ...state, isOpen: true, drawerType });
  }
  function closeDrawer() {
    setState({ ...state, isOpen: false });
  }

  return {
    ...state,
    openDrawer,
    closeDrawer,
  };
}
