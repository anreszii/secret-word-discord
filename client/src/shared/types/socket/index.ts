import { EventPayloadData, Events } from "@discord/embedded-app-sdk";

export type EventHandler = (data: EventPayloadData<Events>) => any;
