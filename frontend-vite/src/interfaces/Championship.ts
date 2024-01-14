import { type Match } from './Match'
import { type Player } from './Player'

export interface Championship {
  id: string
  name: string
  matches: Match[]
  teams: Player[]
}
