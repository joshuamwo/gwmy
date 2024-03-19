import ContentLoader from "react-content-loader";
import { useIsDarkMode } from "@/lib/hooks/use-is-dark-mode";
import { useIsMounted } from "@/lib/hooks/use-is-mounted";

export default function ProductCardUiLoader(props: any) {
  const isMounted = useIsMounted();
  const { isDarkMode } = useIsDarkMode();
  return (
    <ContentLoader
      speed={2}
      width={"100%"}
      height={"100%"}
      viewBox="0 0 360 500"
      // className="bg-[#d0d0d0] dark:bg-[#505050] backdrop:dark:bg-[#505050]"
      backgroundColor={isDarkMode ? "#505050" : "#d0d0d0"}
      foregroundColor={isDarkMode ? "#606060" : "#c0c0c0"}
      {...props}
    >
      {/* for wen I put in multi shop functionality */}
      {/* <circle cx="30" cy="330" r="30" /> */}
      <rect x="5" y="440" rx="3" ry="3" width="40%" height="18" />
      {/* <rect x="5" y="470" rx="3" ry="3" width="60%" height="12" /> */}
      <rect x="280" y="440" rx="10" ry="10" width="65" height="23" />
      <rect x="0" y="0" rx="8" ry="8" width="100%" height="420" />
    </ContentLoader>
  );
}
