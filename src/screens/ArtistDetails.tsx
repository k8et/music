import React from "react";

const ArtistDetails = () => {
  // const {
  //   id: artistId,
  //   img = "",
  //   name = "",
  // } = useParams<{ id: string; img?: string; name?: string }>();
  // const { activeSong, isPlaying } = useSelector((state: any) => state.player);
  // const { data: chartData } = useGetTopChartsQuery("293401556");
  // const { data: artistData } = useGetArtistDetailsQuery(artistId);
  // const data = artistData ? Object.values(artistData) : [];
  // if (!artistData && !chartData) {
  //   return <Loader />;
  // }
  return (
    <div className="flex flex-col w-full">
      {/*<ArtistSongDetails*/}
      {/*  artistData={chartData}*/}
      {/*  songData={artistData}*/}
      {/*  artistId={artistId}*/}
      {/*  img={img}*/}
      {/*  name={name}*/}
      {/*/>*/}
      {/*<RelatedSongs*/}
      {/*  artistId={artistId}*/}
      {/*  activeSong={activeSong}*/}
      {/*  data={data}*/}
      {/*  isPlaying={isPlaying}*/}
      {/*  artistData={artistData}*/}
      {/*/>*/}
    </div>
  );
};

export default ArtistDetails;
