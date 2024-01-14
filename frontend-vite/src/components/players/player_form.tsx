import { type ReactElement } from 'react'
import { playerValidations } from './player_validations'
import { Player } from '../../interfaces/Player'
import Form, { CreateForm } from '../form/form'
import { handleSubmit } from '../form/handle_submit'
import { StdLayout } from '../layouts/std_layout'
import TextField from '../form/text_field'

type PlayerFields = Omit<Player, 'id'>

export default function PlayerForm (): ReactElement {
  const { isSubmtting, setIsSubmtting, formValidations, formState, field } = CreateForm<PlayerFields>({ validations: playerValidations })
  const submit = async (): Promise<void> => {
    await handleSubmit({
      isSubmtting,
      formState,
      setIsSubmtting,
      formValidations,
      serverUrl: '/api/players',
      succesUrl: '/players'
    })
  }
  return (
    <StdLayout title = {'Create Player'}
               bottom = {<button className={['full-width', isSubmtting ? 'pulse' : ''].join(' ')}
                                 onClick={() => { void submit() }}>{isSubmtting ? 'sending' : ''} Crea</button>}>
      <Form onSubmit={ () => { void submit() }}>
        <div>
            <div>Name {formState?.name?.touched === true && formValidations?.name?.[0]}</div>
            <TextField { ...field<string>('name')} />
        </div>
        <div>
            <div>Surname {formState?.surname?.touched === true && formValidations?.surname?.[0]}</div>
            <TextField { ...field<string>('surname')} />
        </div>
      </Form>
    </StdLayout>
  )
}
