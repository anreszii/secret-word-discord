export interface IParticipants {
  username: string;
  discriminator: string;
  id: string;
  bot: boolean;
  flags: number;
  global_name?: string | null | undefined;
  avatar?: string | null | undefined;
  avatar_decoration_data?:
    | {
        asset: string;
        skuId?: string | undefined;
      }
    | null
    | undefined;
  premium_type?: number | null | undefined;
  nickname?: string | undefined;
}

export interface IMe {
  username: string;
  discriminator: string;
  id: string;
  public_flags: number;
  avatar?: string | null | undefined;
  global_name?: string | null | undefined;
}
