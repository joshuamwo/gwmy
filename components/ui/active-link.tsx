import type { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { classnames } from "@/utils/classnames";

interface ActiveLinkProps extends LinkProps {
  activeClassName?: string;
  children?: React.ReactNode;
}
const ActiveLink: React.FC<
  ActiveLinkProps & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">
> = ({ href, className, activeClassName = "active", ...props }) => {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={classnames(className, {
        [activeClassName]: pathname === href,
      })}
      {...props}
    />
  );
};

export default ActiveLink;
