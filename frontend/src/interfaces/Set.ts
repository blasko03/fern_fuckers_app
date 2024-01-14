import { type Leg } from './Leg'

export interface MatchSet {
  id: string
  players: SetPlayers[]
  numberLegs: number
  numberPlayers: number
  whoWins: WHO_WINS
  playedLegs: Leg[]
}

export interface SetPlayers {
  teamId: string
  playerId: string | undefined
}

export interface UpdatedPlayersEvent {
  players: SetPlayers[]
  setId: string
}

export enum WHO_WINS {
  ALL_LEGS = 'ALL_LEGS',
  WHO_WINS_FIRST = 'WHO_WINS_FIRST'
}
