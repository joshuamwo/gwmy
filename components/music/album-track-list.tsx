import { Track } from "@/types";

interface AlbumTrackListProps {
  tracks: Track[];
}

export default function AlbumTrackList({ tracks }: AlbumTrackListProps) {
  return (
    <div className="flex w-full flex-col transition-all duration-500">
      {tracks.map((track, index) => (
        <div className="flex w-full items-center gap-4 px-3 pb-2.5 pt-3 hover:bg-light-600 dark:hover:bg-dark-500">
          <div className="text-sm">{index + 1}.</div>
          <div>
            <h3 className="text-sm">{track.name}</h3>
            <div className="text-xs opacity-70">
              <span>{track.artist}</span>
              {track.other_artists?.map((artist) => <span>, {artist}</span>)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
