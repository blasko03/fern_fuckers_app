import { type ChangeEvent, type ReactElement } from 'react'
import Select from '../form/select'
import { FETCH_METHODS, serverRequest } from '../../utils/serverData'
import { type Team } from '../../interfaces/Team'

type PlayerOrUndefined = string | undefined

interface Props {
  team: Team
  numberOfPlayers: number
  setId: string
  players: PlayerOrUndefined[]
  updateSetPlayers: (setId: string, teamId: string, players: PlayerOrUndefined[]) => void
}

export function PlayersSelection ({ team, numberOfPlayers, setId, players, updateSetPlayers }: Props): ReactElement {
  const savePlayers = async (id: string, index: number): Promise<void> => {
    const newPlayers = [...Array(numberOfPlayers)].map((_, i) => index === i ? id : players[i])
    updateSetPlayers(setId, team.id, newPlayers)
    await serverRequest<unknown>(`/api/sets/${setId}/setPlayers`, FETCH_METHODS.PATCH, {
      players: newPlayers.filter(x => x != null),
      teamId: team.id
    })
  }

  const onChange = async (event: ChangeEvent<HTMLSelectElement>, index: number): Promise<void> => {
    savePlayers(event.target.value, index).catch(x => x)
  }

  return <>
      {Array.from(Array(numberOfPlayers).keys()).map((_a, index) => <div key={index}>
          <Select selected={players[index]} options={team.players.map(p => ({ name: p.id, title: `${p.name} ${p.surname}` }))} onChange={(event: ChangeEvent<HTMLSelectElement>) => { void onChange(event, index) }} />
        </div>)}
    </>
}
