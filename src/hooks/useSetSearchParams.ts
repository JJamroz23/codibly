import { useEffect } from "react";

export const useSetSearchParams = (data: Record<string, string | number>) => {
  useEffect(() => {
    const params = new URLSearchParams();

    Object.keys(data).forEach((key) => {
      if (data[key]) params.append(key, String(data[key]));
    });

    window.history.pushState(null, "", `?${params.toString()}`);
  }, [data]);
};
