import axios from "axios";

export default class Api {
  private static url: string = process.env.REACT_APP_API_URL || "";
  private static key: string;

  static getUrl() {
    return Api.url;
  }

  static async setKey(token: string) {
    // Check if token is valid
    return axios.get(`${Api.url}/check-api-key`, {
      headers: {
      },
      params: {
        token: token,
      },
    }).then((response) => {
      if (response.data.status === "success") {
        Api.key = token;
      }
    });
  }
}