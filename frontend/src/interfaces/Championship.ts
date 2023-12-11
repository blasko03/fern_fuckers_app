import { type UUID } from 'crypto'
import { type Match } from './Match'

export interface Championship {
  id: UUID
  name: string
  matches: Match[]
}
