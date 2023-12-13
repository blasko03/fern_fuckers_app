import { FETCH_METHODS, serverRequest } from '@/utils/serverData'
import { type ChangeEvent, type ReactElement } from 'react'
import Select from '../form/select'
import { type Team } from '@/interfaces/Team'

type PlayerOrUndefined = string | undefined

interface Props {
  team: Team
  numberOfPlayers: number
  setId: string
  matchId: string
  players: PlayerOrUndefined[]
  updateSetPlayers: (teamId: string, players: PlayerOrUndefined[]) => void
}

export function PlayersSelection ({ team, numberOfPlayers, setId, matchId, players, updateSetPlayers }: Props): ReactElement {
  const savePlayers = async (id: string, index: number): Promise<void> => {
    const newPlayers = [...Array(numberOfPlayers)].map((_, i) => index === i ? id : players[i])
    updateSetPlayers(team.id, newPlayers)
    await serverRequest<unknown>(`/api/match/${matchId}/setPlayers`, FETCH_METHODS.PATCH, [{
      players: newPlayers.filter(x => x != null),
      teamId: team.id,
      setId
    }])
  }

  const onChange = async (event: ChangeEvent<HTMLSelectElement>, index: number): Promise<void> => {
    savePlayers(event.target.value, index).catch(x => x)
  }

  return <>
      {Array.from(Array(numberOfPlayers).keys()).map((a, index) => <div key={index}>
          <Select selected={players[index]} options={team.players.map(p => ({ name: p.id, title: p.name }))} onChange={async (event: any) => { await onChange(event, index) }} />
        </div>)}
    </>
}
