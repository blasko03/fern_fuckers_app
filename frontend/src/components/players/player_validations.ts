import { type Player } from '../../interfaces/Player'
import { type Validators, validateLenhth, validatePresence } from '../form/validation'

export const playerValidations: Validators<Omit<Player, 'id'>> = {
  name: [validatePresence, validateLenhth({ min: 3, max: 20 })],
  surname: [validatePresence, validateLenhth({ min: 3, max: 20 })]
}
