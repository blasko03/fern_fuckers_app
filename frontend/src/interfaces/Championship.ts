import { type Match } from './Match'

export interface Championship {
  id: string
  name: string
  matches: Match[]
  teams: Match[]
}
