import React from "react";
import Player from "../../assets/player.png"

const SpotifySticker = ({ data = {}, style = 1 }) => {
  data = {
    album_type: "album",
    total_tracks: 12,
    external_urls: {
      spotify: "https://open.spotify.com/album/0dNZ3ypCu19FqmRxB1ezBc",
    },
    href: "https://api.spotify.com/v1/albums/0dNZ3ypCu19FqmRxB1ezBc",
    id: "0dNZ3ypCu19FqmRxB1ezBc",
    images: [
      {
        url: "https://i.scdn.co/image/ab67616d0000b273099bfbcf7ced6e82f8a797c7",
        height: 640,
        width: 640,
      },
      {
        url: "https://i.scdn.co/image/ab67616d00001e02099bfbcf7ced6e82f8a797c7",
        height: 300,
        width: 300,
      },
      {
        url: "https://i.scdn.co/image/ab67616d00004851099bfbcf7ced6e82f8a797c7",
        height: 64,
        width: 64,
      },
    ],
    name: "Scars & Screws",
    release_date: "2021-09-24",
    release_date_precision: "day",
    type: "album",
    uri: "spotify:album:0dNZ3ypCu19FqmRxB1ezBc",
    artists: [
      {
        external_urls: {
          spotify: "https://open.spotify.com/artist/5bxVbtf4t5k1QPmy0XDvgv",
        },
        href: "https://api.spotify.com/v1/artists/5bxVbtf4t5k1QPmy0XDvgv",
        id: "5bxVbtf4t5k1QPmy0XDvgv",
        name: "Shamoon Ismail",
        type: "artist",
        uri: "spotify:artist:5bxVbtf4t5k1QPmy0XDvgv",
      },
    ],
  };

  switch (style) {
    case 1:
      return <StyleOne data={data} />;
    case 2:
      return <StyleTwo data={data} />;
    case 3:
      return <StyleThree data={data} />;
    default:
      return <StyleOne data={data} />;
  }
};

const StyleOne = ({ data = {} }) => {
  return (
    <div
      id="sticker"
      className="w-[380px] flex items-center flex-col bg-[white] py-[40px]"
    >
      <div className="w-[300px]">
        <img
          src={data?.images?.at(0).url}
          alt={data?.name}
          className="w-full h-[300px] object-cover"
        />
        <h1 className="text-xl mt-1 text-center font-bold text-gray-800">
          {data?.name}
        </h1>
        <p className="text-gray-600 text-center">{data?.artists?.at(0).name}</p>
        <img
          src={`https://scannables.scdn.co/uri/plain/jpeg/000000/white/640/${data?.uri}`}
          alt={data?.name}
          className="w-full h-[75px] object-contain mt-3"
        />
      </div>
    </div>
  );
};

const StyleTwo = ({ data = {} }) => {
  return (
    <div
      id="sticker"
      className="w-[380px] flex items-center flex-col bg-[white] py-[40px]"
    >
      <div className="w-[300px]">
        <img
          src={data?.images?.at(0).url}
          alt={data?.name}
          className="w-full h-[300px] object-cover"
        />
        <img
          src={`https://scannables.scdn.co/uri/plain/jpeg/000000/white/640/${data?.uri}`}
          alt={data?.name}
          className="w-full h-[75px] object-contain"
        />
      </div>
    </div>
  );
};

const StyleThree = ({ data = {} }) => {
  return (
    <div
      id="sticker"
      className="w-[380px] flex items-center flex-col bg-[white] py-[40px]"
    >
      <div className="w-[300px]">
        <img
          src={data?.images?.at(0).url}
          alt={data?.name}
          className="w-full h-[300px] object-cover"
        />

        <img
          src={`https://scannables.scdn.co/uri/plain/jpeg/000000/white/640/${data?.uri}`}
          alt={data?.name}
          className="w-full h-[75px] object-contain"
        />

        <h1 className="text-xl mt-1 font-bold text-gray-800">{data?.name}</h1>
        <p className="text-gray-600">{data?.artists?.at(0).name}</p>

        <img src={Player} className="mt-2"/>
      </div>
    </div>
  );
};

export default SpotifySticker;
