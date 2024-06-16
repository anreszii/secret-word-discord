import { DiscordSDK, Events, Types } from "@discord/embedded-app-sdk";
import { makeAutoObservable } from "mobx";
import { discordApi } from "shared/api";
import { localStorageService } from "./LocalStorageService";
import { ILocalStorageItems } from "../types/localStorage";
import { IParticipants } from "../types/participants";

class DiscordService {
  discordSdk: DiscordSDK = new DiscordSDK(
    import.meta.env.VITE_DISCORD_CLIENT_ID
  );
  loading: boolean = true;
  users: IParticipants[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  authDiscord = async () => {
    await this.discordSdk.ready();

    const { code } = await this.discordSdk.commands.authorize({
      client_id: import.meta.env.VITE_DISCORD_CLIENT_ID,
      response_type: "code",
      state: "",
      prompt: "none",
      scope: ["identify"],
    });

    const { data } = await discordApi.getTokens(code);

    localStorageService.setItem(
      ILocalStorageItems.accessToken,
      data.access_token
    );

    await this.discordSdk.commands.authenticate({
      access_token: data.access_token,
    });
  };

  getUsers = async () => {
    this.users = (
      await this.discordSdk.commands.getInstanceConnectedParticipants()
    ).participants;

    this.discordSdk.subscribe(
      Events.ACTIVITY_INSTANCE_PARTICIPANTS_UPDATE,
      (
        participants: Types.GetActivityInstanceConnectedParticipantsResponse
      ) => {
        this.users = participants.participants;
      }
    );
    this.loading = false;
  };

  getLinkPhoto = (
    userId: string,
    userAvatar: string | null | undefined
  ): string => {
    return `https://cdn.discordapp.com/avatars/${userId}/${userAvatar}.png?size=256`;
  };
}

export const discordService = new DiscordService();
