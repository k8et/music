import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  useGetArtistDetailsQuery,
  useGetTopChartsQuery,
} from "../store/actions/trackActions";
import ArtistSongDetails from "../components/Artist&SongDetails";
import RelatedSongs from "../components/RelatedSongs";

const ArtistDetails = () => {
  const { id: artistId, img: img, name: name } = useParams();
  const { activeSong, isPlaying } = useSelector((state: any) => state.player);
  const { data: chartData } = useGetTopChartsQuery("293401556");
  const { data: artistData } = useGetArtistDetailsQuery(artistId);
  const data = artistData ? Object.values(artistData) : [];
  if (!artistData && !artistData) {
    return <div>load</div>;
  }
  return (
    <div className="flex flex-col w-full">
      <ArtistSongDetails
        artistData={chartData}
        songData={artistData}
        artistId={artistId}
        img={img}
        name={name}
      />
      <RelatedSongs
        artistId={artistId}
        activeSong={activeSong}
        data={data}
        isPlaying={isPlaying}
        artistData={artistData}
      />
    </div>
  );
};

export default ArtistDetails;
