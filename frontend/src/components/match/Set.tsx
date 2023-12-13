'use client'
import { useState, type ReactElement } from 'react'
import { type Team } from '@/interfaces/Team'
import { FETCH_METHODS, serverRequest } from '@/utils/serverData'
import { type Set } from '@/interfaces/Set'
import { PlayersSelection } from './PlayerSelection'

type PlayerOrUndefined = string | undefined

interface Props {
  set: Set
  matchId: string
  teams: Team[]
  scoring: (p1: number, p2: number) => number
  updateSetPlayers: (teamId: string, players: PlayerOrUndefined[]) => void
}

export default function SetComponent ({ set: { id, numberPlayers, playedLegs, players }, matchId, teams, scoring, updateSetPlayers }: Props): ReactElement {
  const wonLeg = async (teamId: string): Promise<void> => {
    await serverRequest<unknown>(`/api/sets/${id}/wonLeg`, FETCH_METHODS.POST, { teamId })
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
            <td><PlayersSelection team={team}
                                  numberOfPlayers={numberPlayers}
                                  setId={id}
                                  matchId={matchId}
                                  updateSetPlayers={updateSetPlayers}
                                  players={players.filter(p => p.teamId === team.id).map(x => x.playerId)}/></td>
            <td>{scoring(homePoints, homePoints)}</td>
            <td>{playedLegs.filter(leg => leg.teamId === team.id).length} <button>-</button><button onClick={() => { void wonLeg(team.id) }}>+</button></td>
            <td><a href='/leg'>Jgri</a></td>
          </tr>)}
        </tbody>
      </table>
    </main>
  )
}
