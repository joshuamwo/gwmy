import { useState } from "react";
import Button from "../ui/button";

interface TrackInputProps {
  trackFile?: File;
  handleInput: (value: File) => void;
}

export default function TrackInput({
  trackFile,
  handleInput,
}: TrackInputProps) {
  const [audioSrc, setAudioSrc] = useState<string>();
  const audioKey = audioSrc;
  // read file input
  // & send to parent
  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    // check if file has been selected
    if (e.target.files) {
      const file = e.target.files[0];
      const fileUrl = window.URL.createObjectURL(file);
      console.log(fileUrl);

      if (trackFile) {
        setAudioSrc("");
      }
      handleInput(file);
      setAudioSrc(fileUrl);
      return;
    }
    return;
  }
  return (
    <div>
      {audioSrc && (
        <audio
          controls
          className="p-2 w-full my-2"
          key={audioSrc} // Added key attribute
          src={audioSrc}
        />
      )}
      <Button
        type="button"
        className="w-full text-sm  tracking-[0.2px]"
        variant="outline"
      >
        <label htmlFor="music-file-input" className="w-full ">
          {trackFile ? "Replace Track" : "Upload Track"}
          <input
            type="file"
            id="music-file-input"
            className="w-full opacity-0 "
            onChange={(e) => handleFileInput(e)}
            hidden
            accept="audio/mpeg"
          />
        </label>
      </Button>
    </div>
  );
}
