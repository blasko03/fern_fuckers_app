import { type UUID } from 'crypto'
import { type Set } from './Set'
import { type Team } from './Team'

export interface Match {
  id: UUID
  teams: Team[]
  sets: Set[]
}
