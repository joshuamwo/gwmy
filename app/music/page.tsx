"use client";

import { useModalAction } from "@/components/modals/modal-controller";
import Button from "@/components/ui/button";

export default function MusicPage() {
  const { openModal } = useModalAction();

  return (
    <div className="">
      <Button
        variant="outline"
        onClick={() =>
          openModal("ADDPRODUCTFORM", {
            productType: "Music",
            productSubType: "Track",
          })
        }
      >
        Add Track
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          openModal("ADDPRODUCTFORM", {
            productType: "Music",
            productSubType: "Album",
          })
        }
      >
        Add Album
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          openModal("ADDPRODUCTFORM", {
            productType: "Fashion",
            productSubType: "",
          })
        }
      >
        Add Fashion
      </Button>
    </div>
  );
}
