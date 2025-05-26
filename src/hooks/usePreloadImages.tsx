import { useEffect } from "react";

export const usePreloadImages = (imageUrl: string) => {
  useEffect(() => {
    if (!imageUrl) return;

    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = imageUrl;
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [imageUrl]);
};
