import { useState } from "react";
import Button from "../ui/button";

interface TrackInputProps {
  trackFile?: File;
  handleInput: (value: File) => void;
  name?: string;
  required?: boolean;
}

export default function TrackInput({
  trackFile,
  handleInput,
  required,
  name,
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
        className="w-full !p-0 !h- text-sm  tracking-[0.2px] h-12"
        variant="outline"
      >
        <label
          htmlFor="music-file-input"
          className="w-full h-full relative flex items-center justify-center"
        >
          {trackFile ? "Replace Track" : "Upload Track"}

          <input
            type="file"
            id="music-file-input"
            className="opacity-0 absolute left-0 right-0 h-full"
            onChange={(e) => handleFileInput(e)}
            aria-hidden
            accept="audio/mpeg"
            name={name}
            required={required}
          />
        </label>
      </Button>
    </div>
  );
}
