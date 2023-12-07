'use client'
import { useState, type ReactElement } from 'react'

function NumberKeyBoard ({ onSubmit }: { onSubmit: (currentScore: number) => void }): ReactElement {
  const [insertedNumber, setInsertedNumber] = useState<number>(0)
  return (
    <>
      {insertedNumber}
      <div className='number_keyboard'>
        {[...Array(9)].map((x, i) => <div key={i + 1} onClick={() => { setInsertedNumber(n => n * 10 + i + 1) }}>{i + 1}</div>)}
        <div onClick={() => {
          setInsertedNumber(Math.floor(insertedNumber / 10))
        }}>canc</div>
        <div onClick={() => { setInsertedNumber(n => n * 10) }}>0</div>
        <div onClick={() => {
          onSubmit(insertedNumber)
          setInsertedNumber(0)
        }}>submit</div>
      </div>
    </>
  )
}

interface GameScore { player: string, score: number }

export default function Home (): ReactElement {
  const players = ['player1', 'player2', 'player3']
  const [scoreHistory, setScoreHistory] = useState<GameScore[]>([])
  const [wonLegs, setWonLegs] = useState<Record<string, number>>(players.reduce((acc, x) => ({ ...acc, [x]: 0 }), {}))
  const [currentPlayer, setCurrentPlayer] = useState<number>(0)

  const getCurrentScore = (scoreHistory: GameScore[], startScore: number, player: string): number => {
    return startScore - scoreHistory.filter(x => x.player === player).reduce((sum, x) => sum + x.score, 0)
  }

  const handleSubmit = (currentScore: number): void => {
    const player = players[currentPlayer]
    const newScore = getCurrentScore(scoreHistory, 501, player) - currentScore

    if (newScore >= 0) {
      setScoreHistory(scores => [...scores, { player, score: currentScore }])
      setCurrentPlayer(x => (x + 1) % players.length)
    }
    if (newScore === 0) {
      setScoreHistory([])
      setWonLegs(x => ({ ...x, [player]: x[player] + 1 }))
      if (wonLegs[player] + 1 > 2) {
        alert(`win for ${player}`)
      }
    }
  }

  return (
    <main>
      {players.map(player => <div key={player}>{player} { player === players[currentPlayer] && '*' } - {wonLegs[player]} - { getCurrentScore(scoreHistory, 501, player) }</div>)}

      <NumberKeyBoard onSubmit={handleSubmit} />
    </main>
  )
}
