import { type Team } from './Team'
import { MatchSet } from './Set'

export interface Match {
  id: string
  teams: Team[]
  sets: MatchSet[]
}
