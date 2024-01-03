import Form, { CreateForm, handleSubmit } from '@/components/form/form'
import TextField from '@/components/form/text_field'
import { StdLayout } from '@/components/layouts/std_layout'
import { type Player } from '@/interfaces/Player'
import { type ReactElement } from 'react'
import { useRouter } from 'next/navigation'
import { playerValidations } from './player_validations'

type PlayerFields = Omit<Player, 'id'>

export default function PlayerForm (): ReactElement {
  const { isSubmtting, setIsSubmtting, formValidations, formState, field } = CreateForm<PlayerFields>({ validations: playerValidations })
  const router = useRouter()
  const submit = async (): Promise<void> => {
    await handleSubmit({
      isSubmtting,
      formState,
      router,
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
