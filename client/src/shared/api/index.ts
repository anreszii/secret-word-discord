import axios, { AxiosResponse } from "axios";
import { ITokenResponse } from "shared/types/auth";

class DiscordApi {
  async getTokens(code: string): Promise<AxiosResponse<ITokenResponse>> {
    return axios.post(
      "/api/token",
      { code },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export const discordApi = new DiscordApi();
