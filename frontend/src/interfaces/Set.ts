import { type Leg } from './Leg'
import { type Player } from './Player'

export interface Set {
  id: string
  players: Player[]
  numberLegs: number
  numberPlayers: number
  whoWins: string
  playedLegs: Leg[]
}
