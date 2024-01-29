import { NextRequest, NextResponse } from "next/server";
import { json } from "stream/consumers";

interface TrackData {
  name: string;
  artist: string;
  other_artists?: string[];
  album?: string;
  cover: string;
  artists_note?: string;
  producers: string[];
  release_date: Date;
  genre: string;
  published: boolean;
}

interface AlbumData {
  name: string;
  artist: string;
  other_artists?: string[];
  cover: string;
  artists_note?: string;
  producers: string[];
  release_date: Date;
  genre: string;
  published: boolean;
}

export async function POST(req: NextRequest) {
  // check is user is authorised to perform this action

  //handle request data depending on if its a track of album
  const data = req.json();
  console.log(data);

  return NextResponse.json({
    ok: true,
  });
}
