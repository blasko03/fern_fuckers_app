export interface MatchEvents {
  message: any
  createdDate: Date
  type: EventTypes
}

export enum EventTypes {
  WON_LEG = 'WON_LEG',
  CHANGED_PLAYERS = 'CHANGED_PLAYERS'
}
