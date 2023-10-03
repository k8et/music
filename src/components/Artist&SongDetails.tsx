import React from "react";
import { Link } from "react-router-dom";

interface ArtistSongDetailsProps {
  artistId?: string;
  artistData?: {
    data: any;
    tracks: {
      subtitle: string;
      images: any;
      artists: {
        [key: string]: string | number | null | undefined;
      }[];
    }[];
  };
  songData?: {
    subtitle: string;
    artists: {
      [key: string]: string | number | null | undefined;
    };
    genres: {
      primary: string;
    };
  };
  img: string;
  name: string;
}

const ArtistSongDetails: React.FC<ArtistSongDetailsProps> = ({
  artistId,
  artistData,
  songData,
  img,
  name,
}) => {
  if (!artistData || !artistId) {
    return <div />;
  }
  const matchingArtist = artistData.tracks.find(
    (artist: any) => artist.artists[0]?.adamid === artistId,
  );
  return (
    <div className="relative w-full flex flex-col">
      <div className="w-full sm:h-48 h-28" />

      <div className="absolute inset-0 flex items-center">
        <img
          alt="profile"
          src={
            matchingArtist
              ? matchingArtist?.images?.background
                  .replace("{w}", "500")
                  .replace("{h}", "500")
              : img
          }
          className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
        />

        <div className="ml-5">
          <p className="font-bold sm:text-3xl text-xl text-white">
            {matchingArtist ? matchingArtist?.subtitle : name}
          </p>
          {!artistId && (
            <Link to={`/artists/${songData?.artists?.adamid}`}>
              <p className="text-base text-gray-400 mt-2">
                {songData?.subtitle}
              </p>
            </Link>
          )}

          <p className="text-base text-gray-400 mt-2">
            {artistId
              ? artistData?.data?.attributes?.genreNames[0]
              : songData?.genres?.primary}
          </p>
        </div>
      </div>

      <div className="w-full sm:h-44 h-24" />
    </div>
  );
};

export default ArtistSongDetails;
