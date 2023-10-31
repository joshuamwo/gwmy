import Button from "./button";
import { UserIcon } from "@/components/icons/user-icon";

export default function ProfileButton() {
  return (
    <Button
      variant="icon"
      aria-label="User"
      className="flex"
      onClick={() => window.alert("TODO: Open profile menu")}
    >
      <UserIcon className="h-5 w-5" />
    </Button>
  );
}
