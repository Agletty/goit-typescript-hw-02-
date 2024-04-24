import axios, { AxiosResponse } from "axios";
// import { Image } from "../../App.types";
import { ApiResponse } from "../../App.types";

const API_URL = "https://api.unsplash.com/";
const API_KEY = "7URfErPpCda_zfTPT05FknSNSXhSl5J4xIoFjZvec_g";

const fetchPhotos = async (
  query: string = "",
  page: number = 1,
  perPage: number = 10
): Promise<ApiResponse> => {
  try {
    let url = `${API_URL}${query ? "search/photos/" : "photos/"}`;

    const response: AxiosResponse<ApiResponse> = await axios.get(url, {
      params: {
        client_id: API_KEY,
        query,
        page,
        per_page: perPage,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching photos:", error);
    return Promise.reject(error);
  }
};
export default fetchPhotos;
