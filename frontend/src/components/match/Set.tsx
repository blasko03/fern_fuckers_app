'use client'
import { useState, type ReactElement } from 'react'
import Select from '../inputs/select'

interface Props {
  homeTeam: Team
  guestsTeam: Team
  numberOfPlayers: number
  scoring: (p1: number, p2: number) => number
}

interface Player {
  name: string
}

interface Team {
  name: string
  players: Player[]
}

export default function Set ({ homeTeam, guestsTeam, numberOfPlayers, scoring }: Props): ReactElement {
  const [homePoints, setHomePoints] = useState(0)
  const [gestsPoints, setGestsPoints] = useState(0)
  return (
    <main>
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Ime</th>
            <th>Točka</th>
            <th>Leg</th>
            <th>Leg</th>
            <th>Točka</th>
            <th>Ime</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><PlayersSelection players={homeTeam.players} numberOfPlayers={numberOfPlayers} /></td>
            <td>{scoring(homePoints, gestsPoints)}</td>
            <td><input value={homePoints} type="number" onChange={(event) => { setHomePoints(parseInt(event.target.value)) } } /></td>
            <td><input value={gestsPoints} type="number" onChange={(event) => { setGestsPoints(parseInt(event.target.value)) } } /></td>
            <td>{scoring(gestsPoints, homePoints)}</td>
            <td><PlayersSelection players={guestsTeam.players} numberOfPlayers={numberOfPlayers} /></td>
            <td><a href='/leg'>Jgi</a></td>
          </tr>
        </tbody>
      </table>
    </main>
  )
}

function PlayersSelection ({ players, numberOfPlayers }: { players: Player[], numberOfPlayers: number }): ReactElement {
  return <>
    {Array.from(Array(numberOfPlayers).keys()).map((a, index) => <div key={index}>
        <Select options={players.map(p => ({ name: p.name, title: p.name }))}/>
      </div>)}
  </>
}
