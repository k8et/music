import React from "react";
import { useParams } from "react-router";
import ArtistSongDetails from "../components/Artist&SongDetails";
import {
  useGetSongDetailsQuery,
  useGetTopChartsQuery,
} from "../store/actions/trackActions";
import { ScrollableContainer } from "../components/ScrollableContainer";
import Loader from "../components/Loader";
const SongDetails = () => {
  const {
    id: songId,
    img = "",
    name = "",
  } = useParams<{ id: string; img?: string; name?: string }>();
  const { data: chartData } = useGetTopChartsQuery("293401556");
  const { data: songData } = useGetSongDetailsQuery(songId);
  if (!songData && !chartData) {
    return <Loader />;
  }
  return (
    <div className="flex flex-col w-full">
      <ArtistSongDetails
        artistData={chartData}
        songData={songData}
        artistId={songId}
        img={img}
        name={name}
      />
      <ScrollableContainer height={50}>
        <div className="mb-20 ">
          <h2 className="text-white text-3xl font-bold">Lyrics:</h2>

          <div className="mt-5">
            {songData?.sections[1].type === "LYRICS" ? (
              songData?.sections[1]?.text.map((line: any, i: any) => (
                <p
                  key={`lyrics-${line}-${i}`}
                  className="text-gray-400 text-base my-1"
                >
                  {line}
                </p>
              ))
            ) : (
              <p className="text-gray-400 text-base my-1">
                Sorry, No lyrics found!
              </p>
            )}
          </div>
        </div>
      </ScrollableContainer>
    </div>
  );
};

export default SongDetails;
