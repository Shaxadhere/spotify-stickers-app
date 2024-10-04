export const convertQueryStringToObject = (queryString) => {
    if(!queryString) {
        queryString = window.location.search;
    }
    const params = new URLSearchParams(queryString);
    return Object.fromEntries(params);
}