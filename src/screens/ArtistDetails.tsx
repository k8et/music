import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useGetArtistDetailsQuery } from "../store/actions/trackActions";
import ArtistSongDetails from "../components/Artist&SongDetails";
import RelatedSongs from "../components/RelatedSongs";

const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state: any) => state.player);
  const { data: artistData } = useGetArtistDetailsQuery(artistId);
  const data = artistData ? Object.values(artistData) : [];
  if (!artistData) {
    return <div>load</div>;
  }
  console.log(artistData, "artistData");
  return (
    <div className="flex flex-col w-full">
      <ArtistSongDetails artistData={artistData} artistId={artistId} />
      <RelatedSongs
        artistId={artistId}
        activeSong={activeSong}
        data={data}
        isPlaying={isPlaying}
      />
    </div>
  );
};

export default ArtistDetails;
