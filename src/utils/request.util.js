import { HTTP_METHODS } from "../constants/request.constants";
import STORAGE from "../constants/storage.constants";

const request = async ({
    url,
    method = 'GET',
    data = {},
    params = {},
}) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`,
        };
        url = `${url}${appendQueryParams(params)}`;
        const response = await fetch(url, {
            method,
            headers,
            ...(Object.keys(data).length > 0 && method === HTTP_METHODS.POST && { body: JSON.stringify(data) }),
        })
        const result = await response.json();
        return result;
    } catch (error) {
        console.warn("Error in request: ", error)
    }
}

const appendQueryParams = (params) => {
    let url = '';
    if (Object.keys(params).length > 0) {
        url += '?';
        for (const key in params) {
            url += `${key}=${params[key]}&`;
        }
        url = url.slice(0, -1);
    }
    return url;
}

export const getToken = () => {
    return localStorage.getItem(STORAGE.TOKEN)
}

export default request