'use client'
import { type ReactElement } from 'react'
import Set from '../../components/match/Set'

const homeTeam = { name: 'AAAA', players: [{ name: 'player1' }, { name: 'player2' }] }
const guestsTeam = { name: 'BBBB', players: [{ name: 'player3' }, { name: 'player4' }] }

function wins3Legs (p1: number, p2: number): number {
  if (p1 < 3 && p2 < 3) {
    return 0
  }
  return p1 > p2 ? 1 : 0
}

function whoWins (p1: number, p2: number): number {
  if (p1 === 0 && p2 === 0) {
    return 0
  }
  return p1 >= p2 ? 1 : 0
}

export default function Home (): ReactElement {
  return (
    <main>
      <Set numberOfPlayers={1} homeTeam={ homeTeam } guestsTeam={ guestsTeam } scoring={wins3Legs} />
      <Set numberOfPlayers={1} homeTeam={ homeTeam } guestsTeam={ guestsTeam } scoring={wins3Legs} />
      <Set numberOfPlayers={2} homeTeam={ homeTeam } guestsTeam={ guestsTeam } scoring={whoWins} />
      <Set numberOfPlayers={2} homeTeam={ homeTeam } guestsTeam={ guestsTeam } scoring={whoWins} />
    </main>
  )
}
