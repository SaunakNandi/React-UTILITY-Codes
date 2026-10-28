import { useEffect, useRef, useState } from "react";

const cache = new Map();
export const useFetchApi = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const controlerRef = useRef();

  const fetchApi = async () => {
    try {
      const res = await fetch(url, { signal: controlerRef.current.signal });
      const response = await res.json();
      setData(response);
      cache.set(url, response);
    } catch (error) {
      if (error.name !== "AbortError") {
        console.warn(error);
        setError(error);
      }
    } finally {
      if (!controlerRef.current.aborted) setLoading(false);
      return;
    }
  };
  useEffect(() => {
    if (!url) {
      setData(null);
      setLoading(false);
      return;
    }
    if (cache.has(url)) {
      setData(cache.get(url));
      setLoading(false);
      return;
    }
    setLoading(true);
    if (controlerRef.current) controlerRef.current.abort();
    controlerRef.current = new AbortController();
    fetchApi();
    return () => {
      controlerRef.current.abort();
    };
  }, [api]);

  return { data, error, loading };
};
