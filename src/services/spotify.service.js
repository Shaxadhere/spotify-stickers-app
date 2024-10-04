import SPOTIFY_ENDPOINTS from "../constants/spotify-endpoints";
import STORAGE from "../constants/storage.constants";
import request from "../utils/request.util";

export const authorize = async () => {
    const auth = await request({
        url: import.meta.env.VITE_TOKEN_URL,
        method: "POST",
    })

    const expiryDuration = auth.expires_in * 1000;
    const expiryTime = new Date().getTime() + expiryDuration;

    localStorage.setItem(STORAGE.TOKEN, auth.access_token);
    localStorage.setItem(STORAGE.AUTH, JSON.stringify(auth));
    localStorage.setItem(STORAGE.EXPIRY, expiryTime);
}

export const getAlbum = async (id) => {
    const url = `${SPOTIFY_ENDPOINTS.ALBUM}/${id}`;
    const result = await request({ url });
    return result;
}

export const getArtist = async (id) => {
    const url = `${SPOTIFY_ENDPOINTS.ARTIST}/${id}`;
    const result = await request({ url });
    return result;
}

export const getPlaylist = async (id) => {
    const url = `${SPOTIFY_ENDPOINTS.PLAYLIST}/${id}`;
    const result = await request({ url });
    return result;
}

export const getTrack = async (id) => {
    const url = `${SPOTIFY_ENDPOINTS.TRACK}/${id}`;
    const result = await request({ url });
    return result;
}

export const getSpotifyInfo = async (type, id) => {
    switch (type) {
        case "track":
            return await getTrack(id);
        case "album":
            return await getAlbum(id);
        case "artist":
            return await getArtist(id);
        case "playlist":
            return await getPlaylist(id);
        default:
            return await getTrack(id);
    }
}