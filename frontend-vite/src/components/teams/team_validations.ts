import { type Validators, validateLenhth, validatePresence, validateNumberOfSelectedElements } from '../form/validation'
import { type TeamsFields } from './team_form'

export const teamValidations: Validators<TeamsFields> = {
  name: [validatePresence, validateLenhth({ min: 3, max: 20 })],
  players: [validatePresence, validateNumberOfSelectedElements({ min: 2, max: 6 })]
}
