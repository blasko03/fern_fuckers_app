'use client'
import { useState, type ReactElement, type ChangeEvent } from 'react'
import Select from '../form/select'
import { type Team } from '@/interfaces/Team'
import { SERVER_ADDRESS } from '@/utils/serverData'
import { type Leg } from '@/interfaces/Leg'

interface Props {
  id: string
  matchId: string
  teams: Team[]
  numberOfPlayers: number
  scoring: (p1: number, p2: number) => number
  playedLegs: Leg[]
}

export default function Set ({ id, matchId, teams, numberOfPlayers, scoring, playedLegs }: Props): ReactElement {
  const wonLeg = async (teamId: string): Promise<void> => {
    await fetch(`${SERVER_ADDRESS}/api/sets/${id}/wonLeg`, {
      method: 'POST',
      body: JSON.stringify({
        teamId
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
  }

  const [homePoints] = useState(0)
  return (
    <main>
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Ime</th>
            <th>Točka</th>
            <th>Leg</th>
          </tr>
        </thead>
        <tbody>
          {teams.map(team => <tr key={team.id}>
            <td><PlayersSelection team={team} numberOfPlayers={numberOfPlayers} setId={id} matchId={matchId} /></td>
            <td>{scoring(homePoints, homePoints)}</td>
            <td>{playedLegs.filter(leg => leg.teamId === team.id).length} <button>-</button><button onClick={() => { void wonLeg(team.id) }}>+</button></td>
            <td><a href='/leg'>Jgri</a></td>
          </tr>)}
        </tbody>
      </table>
    </main>
  )
}
type PlayerOrUndefined = string | undefined

function PlayersSelection ({ team, numberOfPlayers, setId, matchId }: { team: Team, numberOfPlayers: number, setId: string, matchId: string }): ReactElement {
  const [selecedPlayers, setSelecedPlayers] = useState<PlayerOrUndefined[]>([...Array(numberOfPlayers)].map(x => undefined))
  const savePlayers = async (id: string, index: number): Promise<void> => {
    const players = selecedPlayers.map((item, i) => index === i ? id : item)
    setSelecedPlayers(players)
    console.log(players)
    await fetch(`${SERVER_ADDRESS}/api/match/${matchId}/setPlayers`, {
      method: 'PATCH',
      body: JSON.stringify([{
        players: players.filter(x => x !== null),
        teamId: team.id,
        setId
      }]),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
  }

  const onChange = async (event: ChangeEvent<HTMLSelectElement>, index: number): Promise<void> => {
    savePlayers(event.target.value, index).catch(x => x)
  }

  return <>
    {Array.from(Array(numberOfPlayers).keys()).map((a, index) => <div key={index}>
        <Select options={team.players.map(p => ({ name: p.id, title: p.name }))} onChange={async (event: any) => { await onChange(event, index) }} />
      </div>)}
  </>
}
