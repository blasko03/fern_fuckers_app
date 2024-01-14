import { type Validators, validateLenhth, validatePresence, validateNumberOfSelectedElements } from '../form/validation'
import { type ChampionshipFields } from './championship_form'

export const championshipValidations: Validators<ChampionshipFields> = {
  name: [validatePresence, validateLenhth({ min: 3, max: 20 })],
  teams: [validatePresence, validateNumberOfSelectedElements({ min: 2, max: 20 })]
}
