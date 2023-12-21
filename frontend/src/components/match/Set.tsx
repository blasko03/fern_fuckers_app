'use client'
import { type ReactElement } from 'react'
import { type Team } from '@/interfaces/Team'
import { FETCH_METHODS, serverRequest } from '@/utils/serverData'
import { WHO_WINS, type Set } from '@/interfaces/Set'
import { PlayersSelection } from './PlayerSelection'
import { type Leg } from '@/interfaces/Leg'

type PlayerOrUndefined = string | undefined

function getPoints (teamId: string, playedLegs: Leg[], teams: string[], whoWins: WHO_WINS): number {
  const scores = playedLegs.reduce((acc: any, leg) => ({ ...acc, [leg.teamId]: ((acc[leg.teamId] ?? 0) + 1) }), {})
  const maxScore = Object.keys(scores).reduce((a, v) => Math.max(a, scores[v]), -Infinity)
  const countMaxScore = Object.keys(scores).reduce((a, v) => (scores[v] === maxScore ? a + 1 : a), 0)

  if (WHO_WINS.ALL_LEGS === whoWins && countMaxScore === teams.length && playedLegs.length >= 2) {
    return 1
  }
  if (WHO_WINS.ALL_LEGS === whoWins && countMaxScore === 1 && scores[teamId] === maxScore && scores[teamId] >= 2) {
    return 1
  }
  if (countMaxScore === 1 && scores[teamId] === maxScore && scores[teamId] >= 3) {
    return 1
  }

  return 0
}

const whoWinsDescription = {
  ALL_LEGS: 'Play 2 legs',
  WHO_WINS_FIRST: 'Who wins 3 legs first (max 5 set)'
}

interface Props {
  set: Set
  matchId: string
  teams: Team[]
  updateSetPlayers: (setId: string, teamId: string, players: PlayerOrUndefined[]) => void
  matchNumber: number
}

export default function SetComponent ({ set: { id, numberPlayers, playedLegs, players, whoWins }, matchNumber, matchId, teams, updateSetPlayers }: Props): ReactElement {
  const wonLeg = async (teamId: string): Promise<void> => {
    await serverRequest<unknown>(`/api/sets/${id}/wonLeg`, FETCH_METHODS.POST, { teamId })
  }

  return (
    <>
    <h1 style={{ textAlign: 'center' }}>Round {matchNumber} <small><i>{whoWinsDescription[whoWins]}</i></small></h1>
    <div className='matchSet'>
      {teams.map(team => <div key={team.id}>
        <div style={{ height: 0 }}>&nbsp;</div>
        <h3 style={{ textAlign: 'center' }}>{team.name} ({getPoints(team.id, playedLegs, teams.map(t => t.id), whoWins)})</h3>
        <div className='information'>
          <div className='wonLegsBox'>
            <h5>wonLegs</h5>
            <div className='numberOfLegs'>{playedLegs.filter(leg => leg.teamId === team.id).length}</div>
          </div>
          <div><button onClick={() => { void wonLeg(team.id) }}>+</button></div>
          <div style={{ flexBasis: '100%' }}><PlayersSelection team={team}
                                numberOfPlayers={numberPlayers}
                                setId={id}
                                matchId={matchId}
                                updateSetPlayers={updateSetPlayers}
                                players={players.filter(p => p.teamId === team.id).map(x => x.playerId)}/>
          </div>
        </div>
      </div>)}
    </div>
    <hr />
    </>
  )
}
