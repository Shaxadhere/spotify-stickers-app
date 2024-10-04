import { useEffect, useMemo, useState } from "react";

const useUrlState = (initialState) => {
  // Function to get search parameters from URL and convert them into an object
  const getSearchParams = () => {
    const params = new URLSearchParams(window.location.search);
    return Object.fromEntries(params.entries());
  };

  // Memoized state for default values, falling back to the initial state if URL params are empty
  const defaultState = useMemo(() => {
    const urlParams = getSearchParams();
    return Object.keys(urlParams).length ? urlParams : initialState;
  }, [initialState]);

  // Local state to keep track of URL state
  const [state, setState] = useState(defaultState);

  // Synchronize URL with the current state
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    // Update the URL search params based on the state
    Object.keys(state).forEach((key) => {
      if (state[key] === undefined || state[key] === null) {
        searchParams.delete(key); // Remove keys with undefined/null values
      } else {
        searchParams.set(key, state[key]); // Set/Update the value in URL
      }
    });

    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.replaceState(null, "", newUrl);
  }, [state]);

  return [state, setState];
};

export default useUrlState;
