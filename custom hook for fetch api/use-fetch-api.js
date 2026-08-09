import { useEffect, useRef, useState } from "react";

const cache = new Map();
export const useFetchAPI = (api, search) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const controllerRef = useRef();

  async function FetchAPI(controller) {
    try {
      const res = await fetch(`/api?seach=${search}`, {
        signal: controller.signal,
      });
      const res_data = await res.json();
      setData(res_data);
      cache.set(search, res_data);
    } catch (error) {
      if (error.name !== "AbortError") {
        setError(error);
      }
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }
  useEffect(() => {
    if (!api || search) return;
    if (cache && cache.get(search)) {
      setData(cache.get(search));
      return;
    }
    setLoading(true);
    if (controllerRef.current) controllerRef.current.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    FetchAPI(controller);
    return () => {
      controller.abort();
    };
  }, [api, search]);
  return { data, loading, error };
};
