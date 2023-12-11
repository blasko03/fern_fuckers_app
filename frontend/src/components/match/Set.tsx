'use client'
import { useState, type ReactElement } from 'react'
import Select from '../form/select'
import { type Team } from '@/interfaces/Team'
import { type Player } from '@/interfaces/Player'

interface Props {
  teams: Team[]
  numberOfPlayers: number
  scoring: (p1: number, p2: number) => number
}

export default function Set ({ teams, numberOfPlayers, scoring }: Props): ReactElement {
  const wonLeg = async (id: string): Promise<void> => {
    await fetch(`http://localhost:5093/api/legs/${id}/wonLeg`, {
      method: 'POST',
      body: JSON.stringify({
        teamId: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
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
            <td><PlayersSelection players={teams[0].players} numberOfPlayers={numberOfPlayers} /></td>
            <td>{scoring(homePoints, homePoints)}</td>
            <td><button>-</button><button onClick={() => { void wonLeg('3fa85f64-5717-4562-b3fc-2c963f66afa6') }}>+</button></td>
            <td><a href='/leg'>Jgri</a></td>
          </tr>)}
        </tbody>
      </table>
    </main>
  )
}

function PlayersSelection ({ players, numberOfPlayers }: { players: Player[], numberOfPlayers: number }): ReactElement {
  const setPlayers = async (id: string): Promise<void> => {
    await fetch(`http://localhost:5093/api/match/${id}/setPlayers`, {
      method: 'PATCH',
      body: JSON.stringify([{
        players: [
          '3fa85f64-5717-4562-b3fc-2c963f66afa6'
        ],
        teamId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        setId: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
      }]),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    console.log('aaaaaaaaaaaaaaa')
  }

  return <>
    {Array.from(Array(numberOfPlayers).keys()).map((a, index) => <div key={index}>
        <Select options={players.map(p => ({ name: p.name, title: p.name }))} onChange={async () => { await setPlayers('3fa85f64-5717-4562-b3fc-2c963f66afa6') }} />
      </div>)}
  </>
}
