import { useEffect, useState } from "react";
import { validateYoutubeUrlFormat } from "../utils/validation";
import { searchYoutube } from "../api/youtubeApi";

export const useYoutube = () => {
  const [isValidUrl, setIsValidUrl] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [videoId, setVideoId] = useState(null);

  const youtubeOptions = {
    height: "390",
    width: "640",
  };

  const urlHandler = (e) => {
    const url = e.target.value;

    if (validateYoutubeUrlFormat(url)) {
      setYoutubeUrl(url);
      setVideoId(url.split("v=")[1].split("&")[0]);
    } else {
      setVideoId(null);
      setIsValidUrl(false);
      setYoutubeUrl(null);
      setThumbnailUrl(null);
    }
  };

  const validateYoutubeUrl = async () => {
    const data = await searchYoutube(videoId);

    if (data.pageInfo.totalResults > 0) {
      setIsValidUrl(true);
      setThumbnailUrl(data.items[0].snippet.thumbnails.medium.url);
    } else {
      setVideoId(null);
      setIsValidUrl(false);
      setYoutubeUrl(null);
      setThumbnailUrl(null);
    }
  };

  useEffect(() => {
    if (videoId) {
      validateYoutubeUrl();
    }
  }, [videoId]);

  return {
    youtubeOptions,
    isValidUrl,
    videoId,
    youtubeUrl,
    thumbnailUrl,
    urlHandler,
  };
};
