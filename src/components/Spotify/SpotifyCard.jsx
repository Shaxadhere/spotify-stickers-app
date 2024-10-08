import React, { useEffect, useRef } from "react";
import { authorize, getSpotifyInfo } from "../../services/spotify.service";
import SpotifySticker from "./SpotifySticker";
import STORAGE from "../../constants/storage.constants";
import { getToken } from "../../utils/request.util";
import { ITEM_TYPES } from "../../constants/spotify.constants";
import html2canvas from "html2canvas";
import { convertQueryStringToObject } from "../../utils/url-utils";
import useUrlState from "../../hooks/useUrlState";

const SpotifyCard = () => {
  const queryString = convertQueryStringToObject();
  const stickerComponentRef = useRef(null);
  const [query, setQuery] = useUrlState({
    url: queryString?.url
      ? queryString?.url
      : "https://open.spotify.com/track/3wGp1azIVCBN1wzsph3f2m?si=5e64d6e4d3bf4474",
    style: queryString?.style ? Number(queryString?.style) : 1,
  });

  const [result, setResult] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);

  const onSearch = async () => {
    setIsLoading(true);
    const type = query?.url?.split("/")?.at(3);
    const id = query?.url?.split("/")?.at(4);
    const data = await getSpotifyInfo(type, id);

    switch (type) {
      case ITEM_TYPES.TRACK:
        setResult(data?.album);
        break;
      case ITEM_TYPES.PLAYLIST:
        const playListResult = {
          images: data?.images,
          name: data?.name,
          artists: [{ name: data?.owner?.display_name }],
          uri: data?.uri,
        };
        setResult(playListResult);
      case ITEM_TYPES.ARTIST:
        const artistResult = {
          images: data?.images,
          name: data?.name,
          uri: data?.uri,
        };
        setResult(artistResult);
      case ITEM_TYPES.ALBUM:
        const albumResult = {
          images: data?.images,
          artists: data?.artists,
          uri: data?.uri,
          name: data?.name,
        };
        setResult(albumResult);
      default:
        break;
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const token = getToken();
    const expiryTime = localStorage.getItem(STORAGE.EXPIRY);

    const getInitialData = () => {
      if (!result?.name) {
        onSearch();
      }
    };

    if (!token) {
      authorize().then(() => getInitialData());
    } else if (new Date().getTime() > Number(expiryTime)) {
      authorize().then(() => getInitialData());
    } else {
      getInitialData();
    }
  }, []);

  const downloadImage = () => {
    if (!stickerComponentRef.current) return;
    if (!result?.name) return;

    // Wait for images to load before capturing
    const images = stickerComponentRef.current.querySelectorAll("img");

    Promise.all(
      Array.from(images).map((img) => {
        return new Promise((resolve) => {
          if (img.complete) {
            resolve();
          } else {
            img.onload = resolve;
            img.onerror = resolve; // Resolve on error to avoid hanging
          }
        });
      })
    ).then(() => {
      html2canvas(stickerComponentRef.current, { useCORS: true }) // Enable CORS
        .then((canvas) => {
          const data = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.href = data;
          const fileName = `${result?.name || "spotify-sticker"}.png`;
          link.download = fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((error) => {
          console.error("Error generating image:", error);
        });
    });
  };

  return (
    <div
      className={`min-h-screen bg-black flex items-center justify-center`}
      style={{
        backgroundColor: `#${queryString?.bg}`,
      }}
    >
      <div
        className="max-w-full lg:max-w-6xl mx-auto bg-[#181818] rounded-lg shadow-lg p-8 flex lg:space-x-8"
        style={{
          backgroundColor: `#${queryString?.cardBg}`,
        }}
      >
        <div className="w-full lg:w-1/2 flex flex-col">
          <h1
            className="text-3xl font-bold mb-4 text-white"
            style={{
              color: `#${queryString?.headingColor}`,
            }}
          >
            Spotify Codes
          </h1>
          <p
            className="text-gray-300 mb-6"
            style={{
              color: `#${queryString?.textColor}`,
            }}
          >
            Spotify Codes helps users to generate stickers for their favorite
            songs, albums, playlists, and artists.
          </p>
          <label className="block text-gray-200 mb-2" htmlFor="spotifyUri">
            Enter a Spotify URI to get started
          </label>
          <input
            type="text"
            id="spotifyUri"
            placeholder="spotify:user:spotify:playlist:37i9dQZF1DXcBWIGoYBM5M"
            value={query?.url}
            onChange={(e) => setQuery({ url: e.target.value })}
            className="w-full p-3 border border-gray-600 rounded-lg mb-4 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
            style={{
              backgroundColor: `#${queryString?.inputBg}`,
              color: `#${queryString?.inputColor}`,
            }}
          />
          <button
            onClick={onSearch}
            className={`bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition duration-200 ${
              isLoading
                ? "cursor-not-allowed bg-green-900 hover:bg-green-900"
                : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "GETTING DATA FROM SPOTIFY..." : "GET SPOTIFY STICKER"}
          </button>
        </div>
        <div className="w-full mt-10 lg:mt-0 lg:w-1/2 flex items-center justify-center">
          <div className="flex gap-2 flex-col">
            <div className="flex gap-2 items-center justify-between">
              <div className="flex !flex-row gap-2 items-center justify-between">
                <button
                  className={
                    "bg-slate-600 text-sm max-w-[120px] text-white py-2 px-4 rounded-lg shadow-md hover:bg-slate-900 transition duration-200" +
                    (Number(query?.style) === 1 ? " bg-slate-900" : "")
                  }
                  onClick={() => setQuery({ style: 1 })}
                >
                  Style 01
                </button>
                <button
                  className={
                    "bg-slate-600 text-sm max-w-[120px] text-white py-2 px-4 rounded-lg shadow-md hover:bg-slate-900 transition duration-200" +
                    (Number(query?.style) === 2 ? " bg-slate-900" : "")
                  }
                  onClick={() => setQuery({ style: 2 })}
                >
                  Style 02
                </button>
                <button
                  className={
                    "bg-slate-600 text-sm max-w-[120px] text-white py-2 px-4 rounded-lg shadow-md hover:bg-slate-900 transition duration-200" +
                    (Number(query?.style) === 3 ? " bg-slate-900" : "")
                  }
                  onClick={() => setQuery({ style: 3 })}
                >
                  Style 03
                </button>
              </div>
            </div>
            <div ref={stickerComponentRef}>
              <SpotifySticker data={result} style={query?.style} />
            </div>

            <button
              className="bg-green-500 text-sm text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition duration-200"
              onClick={downloadImage}
            >
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotifyCard;
