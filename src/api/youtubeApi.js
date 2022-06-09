import envKeys from "../config/config";
import axios from "axios";

export const searchYoutube = async (videoId) => {
  const uri = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails&id=${videoId}&key=${envKeys.REACT_APP_YOUTUBE_API_KEY}`;
  const response = await axios.get(uri);

  return response.data;
};
