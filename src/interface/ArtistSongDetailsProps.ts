export interface ArtistSongDetailsProps {
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
