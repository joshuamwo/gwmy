import Button from "./button";
import { UserIcon } from "@/components/icons/user-icon";

interface ProfileButtonProps { 
	handleClick: () => void;
}

export default function ProfileButton({handleClick}: ProfileButtonProps)  {
  return (
    <Button
      variant="icon"
      aria-label="User"
      className="flex"
      onClick={handleClick}
    >
      <UserIcon className="h-5 w-5" />
    </Button>
  );
}
