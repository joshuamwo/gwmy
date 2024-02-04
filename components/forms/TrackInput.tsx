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
          className="my-2 w-full p-2"
          key={audioSrc} // Added key attribute
          src={audioSrc}
        />
      )}
      <Button
        type="button"
        className="!h- h-12 w-full !p-0  text-sm tracking-[0.2px]"
        variant="outline"
      >
        <label
          htmlFor="music-file-input"
          className="relative flex h-full w-full items-center justify-center"
        >
          {trackFile ? "Replace Track" : "Upload Track"}

          <input
            type="file"
            id="music-file-input"
            className="absolute left-0 right-0 h-full opacity-0"
            onChange={(e) => {
              console.log(e.target.files);
              handleFileInput(e);
            }}
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
