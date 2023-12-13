import { type Leg } from './Leg'

export interface Set {
  id: string
  players: SetPlayers[]
  numberLegs: number
  numberPlayers: number
  whoWins: string
  playedLegs: Leg[]
}

export interface SetPlayers {
  teamId: string
  playerId: string | undefined
}
