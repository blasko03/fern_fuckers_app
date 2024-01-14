import { Leg } from "./Leg"
import { UpdatedPlayersEvent } from "./Set"

export interface MatchEvents {
  message: Leg | UpdatedPlayersEvent
  createdDate: Date
  type: EventTypes
}

export enum EventTypes {
  WON_LEG = 'WON_LEG',
  CHANGED_PLAYERS = 'CHANGED_PLAYERS'
}
