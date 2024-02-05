import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

// Custom hook for managing a scrollable slider
export function useScrollableSlider(defaultActivePath: string = "/") {
  // Use Next.js router
  const router = useRouter();

  // Create refs for the slider and the previous and next buttons
  const sliderEl = useRef<HTMLDivElement>(null!);
  const sliderPrevBtn = useRef<HTMLButtonElement>(null!);
  const sliderNextBtn = useRef<HTMLButtonElement>(null!);

  // Function to scroll the slider to the right
  function scrollToTheRight() {
    let offsetWidth = sliderEl.current.offsetWidth;
    sliderEl.current.scrollLeft += offsetWidth / 2;
    sliderPrevBtn.current.classList.remove("opacity-0", "invisible");
  }

  // Function to scroll the slider to the left
  function scrollToTheLeft() {
    let offsetWidth = sliderEl.current.offsetWidth;
    sliderEl.current.scrollLeft -= offsetWidth / 2;
    sliderNextBtn.current.classList.remove("opacity-0", "invisible");
  }

  // Effect to initialize button visibility and add event listeners
  useEffect(() => {
    const filterBarEl = sliderEl.current;
    const prevBtn = sliderPrevBtn.current;
    const nextBtn = sliderNextBtn.current;

    // Initialize visibility of next button
    function initNextBtnVisibility() {
      let offsetWidth = filterBarEl.offsetWidth;
      let scrollWidth = filterBarEl.scrollWidth;
      // Show next button when scrollWidth is greater than offsetWidth
      if (scrollWidth > offsetWidth) {
        nextBtn?.classList.remove("opacity-0", "invisible");
      } else {
        nextBtn?.classList.add("opacity-0", "invisible");
      }
    }

    // Show or hide next and previous buttons based on scroll position
    function visibleNextAndPrevBtnOnScroll() {
      let newScrollLeft = filterBarEl.scrollLeft,
        offsetWidth = filterBarEl.offsetWidth,
        scrollWidth = filterBarEl.scrollWidth;
      // Reach to the right end
      if (scrollWidth - newScrollLeft == offsetWidth) {
        nextBtn?.classList.add("opacity-0", "invisible");
        prevBtn?.classList.remove("opacity-0", "invisible");
      } else {
        nextBtn?.classList.remove("opacity-0", "invisible");
      }
      // Reach to the left end
      if (newScrollLeft === 0) {
        prevBtn?.classList.add("opacity-0", "invisible");
        nextBtn?.classList.remove("opacity-0", "invisible");
      } else {
        prevBtn?.classList.remove("opacity-0", "invisible");
      }
    }

    // Add event listeners for resize and scroll events
    window.addEventListener("resize", initNextBtnVisibility);
    filterBarEl.addEventListener("scroll", visibleNextAndPrevBtnOnScroll);

    // Remove event listeners when component unmounts
    return () => {
      window.removeEventListener("resize", initNextBtnVisibility);
      filterBarEl.removeEventListener("scroll", visibleNextAndPrevBtnOnScroll);
    };
  }, []);

  // // Effect to scroll to the left when the current route is the default active path
  const pathname = usePathname();
  useEffect(() => {
    if (pathname === defaultActivePath) {
      scrollToTheLeft();
    }
  }, [pathname, defaultActivePath]);

  // Return refs and scroll functions
  return {
    sliderEl,
    sliderPrevBtn,
    sliderNextBtn,
    scrollToTheRight,
    scrollToTheLeft,
  };
}
