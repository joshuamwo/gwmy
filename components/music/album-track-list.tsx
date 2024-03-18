import { Track } from "@/types";
import Link from "next/link";

interface AlbumTrackListProps {
  tracks: Track[];
}

export default function AlbumTrackList({ tracks }: AlbumTrackListProps) {
  return (
    <div className="flex w-full flex-col transition-all duration-500">
      {tracks.map((track, index) => (
        <Link href={`/admin/my-music/track/${track.id}`}>
          <div
            key={index}
            className="hover:bg-light-00 flex w-full items-center gap-4 px-3 pb-2.5 pt-3 dark:hover:bg-dark-500"
          >
            <div className="text-lg font-medium">{index + 1}.</div>
            <div>
              <h3 className="text-base">{track.name}</h3>
              <div className="text-sm font-medium opacity-80">
                <span>{track.artist}</span>
                {track.other_artists &&
                  track.other_artists?.map((artist, index) => (
                    <span key={index}>, {artist}</span>
                  ))}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
