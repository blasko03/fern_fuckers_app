import { type ReactElement, useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDeleteLeft, faRightFromBracket, faRotateLeft, faRotateRight, faPlayCircle, faSlash, faXmark, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import PlayersSelection from './players_selection'
import { type Player } from '../../../interfaces/Player'
import NumberKeyBoard from '../../../pages/leg/NumberKeyBoard'
import { SavedValues } from './SavedValues'

const POINTS = [20, 19, 18, 17, 16, 15, 25]

interface SavedGame {
  throws: Throw[] | undefined
  currentPlayerId: string | undefined
  players: Player[]
}

function saveGame ({ throws, currentPlayerId }: { throws: Throw[], currentPlayerId: string }): void {
  sessionStorage.setItem(SavedValues.THROWS, JSON.stringify(throws))
  sessionStorage.setItem(SavedValues.CURRENT_PLAYER_ID, currentPlayerId)
}

export type StartGame = ({ reset }: { reset?: boolean }) => void

function getSavedGame ({ reset }: { reset: boolean }): SavedGame {
  const throws = sessionStorage.getItem(SavedValues.THROWS)
  const currentPlayerId = sessionStorage.getItem(SavedValues.CURRENT_PLAYER_ID)
  const playersStr = sessionStorage.getItem(SavedValues.PLAYERS)
  const players = playersStr != null ? JSON.parse(playersStr) : []
  if (!reset && throws != null && currentPlayerId != null) {
    return { throws: JSON.parse(throws), currentPlayerId, players }
  }
  return { throws: undefined, currentPlayerId: undefined, players }
}

export default function Cricket (): ReactElement {
  const [players, setPlayers] = useState<Player[]>([])
  const [game, setGame] = useState<CricketGame>()
  const [points, setPoints] = useState<Record<string, number>>({})
  const [gameStatus, setSameStatus] = useState<CricketScoring>({})
  const [currentPlayer, setCurrentPlayer] = useState<Player>()
  const [winner, setWinner] = useState<Player>()
  const [throws, setThrows] = useState<Throw[]>([])

  const addScore = (scores: number[]): void => {
    if (game === undefined) { return }
    game.addThrow(scores)
    setPoints(game.points())
    setSameStatus(game.gameStatus())
    setCurrentPlayer(game.currentPlayer())
    setWinner(game.winner())
  }

  const startGame: StartGame = ({ reset = false }) => {
    const { throws, currentPlayerId, players } = getSavedGame({ reset })
    const game = new CricketGame({ players, throws, currentPlayerId })
    setGame(game)
    setPoints(game.points())
    setSameStatus(game.gameStatus())
    setCurrentPlayer(game.currentPlayer())
    setWinner(game.winner())
    setThrows(game.throws)
    setPlayers(game.players)
  }

  useEffect(() => {
    const currentPlayerId = currentPlayer?.id
    if (currentPlayerId != null) {
      saveGame({ throws, currentPlayerId })
    }
  }, [throws, currentPlayer])

  useEffect(() => {
    startGame({})
  }, [])
  if (game === undefined) { return <div></div> }
  if (currentPlayer === undefined) { return <PlayersSelection setPlayers = {setPlayers} players = {players} startGame = {startGame}/> }
  return <div>
    <GameNavigation addScore = {addScore}
      throws={throws}
      setCurrentPlayer={setCurrentPlayer}
      removeLastThrow = {
        () => {
          const lastThrow = game.removeLastThrow()
          setPoints(game.points())
          setSameStatus(game.gameStatus())
          setCurrentPlayer(game.currentPlayer())
          setWinner(game.winner())
          return lastThrow
        }
      }/>
    <GameStatus gameStatus = {gameStatus} players = {players} points = {points} currentPlayer = {currentPlayer} />
    {winner === undefined
      ? <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
        { CricketGame.isClosure(game.gameStatus(), currentPlayer.id)
          ? <NumberKeyBoard onSubmit={(newScore: number) => {
            addScore([newScore])
            setThrows(game.throws)
          }} />
          : <ScoreInsert isValidThrow={(throws: number[]) => game.isValidThrow(throws)}
                    openedNumbers={game.openedNumbers()}
                    addScore={(newScore: number[]) => {
                      addScore(newScore)
                      setThrows(game.throws)
                    }} />
        }
      </div>
      : <div>
        <h1>Dobu {winner.name} {winner.surname}</h1>

        {players.filter(p => p.id !== winner.id).map(player => <h1 key={player.id}>{player.name} {player.surname} je šempolajc</h1>)}
      </div>
    }
  </div>
}

function ScoreInsert ({ addScore, isValidThrow, openedNumbers }: { openedNumbers: number[], addScore: (newScore: number[]) => void, isValidThrow: (throws: number[]) => boolean }): ReactElement {
  const [result, setResult] = useState<number[]>([])
  return <div className="cricket_keyboard">
    {POINTS.map(s => <div key={s}>
      <button disabled={!openedNumbers.includes(s)} onClick={() => {
        if (isValidThrow([...result, s])) {
          setResult(r => [...r, s])
        }
      }}>{s}
        <small>
          {result.filter(r => r === s).length > 0 ? `x ${result.filter(r => r === s).length}` : ''}
        </small>
      </button>
    </div>)}
    <div><button onClick={() => {
      setResult(r => [...r.slice(0, r.length - 1)])
    }}><FontAwesomeIcon icon={faDeleteLeft} /></button></div>
    <div><button onClick={() => {
      setResult([])
      addScore(result)
    }}><FontAwesomeIcon icon={faRightFromBracket} /></button></div>
  </div>
}

function GameStatus ({ gameStatus, players, points, currentPlayer }: { gameStatus: CricketScoring, players: Player[], points: Record<string, number>, currentPlayer: Player }): ReactElement {
  const NHitsSimbol = ({ nHits }: { nHits: number }): ReactElement => {
    if (nHits === 1) {
      return <FontAwesomeIcon icon={faSlash} />
    }
    if (nHits === 2) {
      return <FontAwesomeIcon icon={faXmark} />
    }
    if (nHits >= 3) {
      return <FontAwesomeIcon icon={faCircleXmark} />
    }

    return <></>
  }
  return <table className='pointsTable'>
    <thead>
      <tr>
        <td>Player</td>
        {POINTS.map(point => <td key={point}>{point}</td>)}
        <td>Points</td>
      </tr>
    </thead>
    <tbody>
      {
        players.map(player => <tr key={player.id}>
          <td>
            {player.name} {player.surname}
            {currentPlayer.id === player.id ? <FontAwesomeIcon icon={faPlayCircle} className='currentPlayer' /> : ''}
            </td>
          {POINTS.map(point => <td key={point}><NHitsSimbol nHits={gameStatus?.[player.id]?.[point]}/></td>)}
          <td>{points[player.id]}</td>
        </tr>)
      }
    </tbody>
  </table>
}

function GameNavigation ({ removeLastThrow, addScore, throws, setCurrentPlayer }: { throws: Throw[], removeLastThrow: () => Throw | undefined, addScore: (scores: number[]) => void, setCurrentPlayer: Dispatch<SetStateAction<Player | undefined>> }): ReactElement {
  const [removedThrows, setRemovedThrows] = useState<Throw[]>([])
  useEffect(() => {
    setRemovedThrows([])
  }, [throws])
  return <div className='gameNavigation'>
    <div><button onClick={() => {
      const removedThrow = removeLastThrow()
      if (removedThrow !== undefined) { setRemovedThrows(t => ([...t, removedThrow])) }
    }}><FontAwesomeIcon icon={faRotateLeft}/></button></div>
    { removedThrows.length > 0 &&
      <div><button
        onClick={() => {
          const removed = removedThrows[removedThrows.length - 1]
          if (removed !== undefined) {
            addScore(removed.points)
            setRemovedThrows(rt => rt.slice(0, rt.length - 1))
          }
        }}
      ><FontAwesomeIcon icon={faRotateRight} /></button></div>
  }
  <div style={{ marginLeft: 'auto' }}><button onClick={() => { setCurrentPlayer(undefined) }}>Restart</button></div>
  </div>
}

interface Throw {
  playerId: string
  points: number[]
}

class CricketGame {
  players: Player[]
  throws: Throw[] = []
  playerIndex: number = 0

  constructor ({ players, throws, currentPlayerId }: { players: Player[], throws?: Throw[], currentPlayerId?: string }) {
    this.players = players
    if (throws != null && currentPlayerId != null) {
      this.throws = throws
      this.playerIndex = players.findIndex(p => p.id === currentPlayerId)
    }
  }

  addThrow (points: number[]): void {
    if (this.winner() !== undefined) {
      return
    }
    const curretPlayerId = this.currentPlayer().id
    this.playerIndex = (this.playerIndex + 1) % this.players.length
    const newPoint = points.reduce((partialSum, a) => partialSum + a, 0) + this.points()[curretPlayerId]
    if (CricketGame.isClosure(this.gameStatus(), curretPlayerId) && newPoint > -2 && newPoint !== 0) {
      return
    }
    this.throws = [...this.throws, { playerId: curretPlayerId, points }]
  }

  removeLastThrow (): Throw | undefined {
    const throwsLength = this.throws.length
    if (throwsLength === 0) { return }
    const lastThrow = this.throws[throwsLength - 1]
    this.throws = this.throws.slice(0, throwsLength - 1)
    this.playerIndex = this.players.findIndex((element) => element.id === lastThrow.playerId)
    return lastThrow
  }

  currentPlayer (): Player {
    return this.players[this.playerIndex]
  }

  gameStatus (): CricketScoring {
    return this.throws.reduce((acc: CricketScoring, t) => {
      acc[t.playerId] ??= []
      t.points.forEach(p => {
        acc[t.playerId][p] = (acc[t.playerId][p] ?? 0) + 1
      })
      return acc
    }, {})
  }

  isValidThrow (throws: number[]): boolean {
    if (!throws.every(t => this.openedNumbers().includes(t))) {
      return false
    }

    const grouped = throws.reduce((acc: Record<number, number>, t) => {
      acc[t] = (acc[t] ?? 0) + 1
      return acc
    }, {})

    return Object.keys(grouped).reduce((acc, t) => (acc + Math.ceil(grouped[t as unknown as number] / 3)), 0) <= 3
  }

  openedNumbers (): number[] {
    const gameStatus = this.gameStatus()
    const opened = this.players.flatMap(player => {
      return POINTS.map(points => {
        return (gameStatus?.[player.id]?.[points] ?? 0) < 3 ? points : undefined
      })
    })

    return opened.filter(x => x !== undefined).filter((value, index, array) => array.indexOf(value) === index) as number[]
  }

  static isClosure (gameStatus: CricketScoring, playerId: string): boolean {
    return POINTS.map(point => gameStatus?.[playerId]?.[point] ?? 0)
      .filter(totalPoints => totalPoints < 3)
      .length === 0
  }

  points (): Record<string, number> {
    const closings: CricketScoring = {}
    return this.throws.flatMap(t => t.points.map(p => ({ playerId: t.playerId, points: p })))
      .reduce((acc1: Record<string, number>, t) => {
        acc1[t.playerId] = acc1[t.playerId] ?? 0
        closings[t.playerId] = closings[t.playerId] ?? {}
        if (CricketGame.isClosure(closings, t.playerId)) {
          const newPoints = acc1[t.playerId] + t.points
          acc1[t.playerId] = newPoints === 0 || newPoints < -1 ? newPoints : acc1[t.playerId]
        } else {
          closings[t.playerId][t.points] = (closings[t.playerId][t.points] ?? 0) + 1
          acc1[t.playerId] += Math.max((closings[t.playerId][t.points] ?? 0) - 3, 0) * t.points * -1
        }
        return acc1
      }, {})
  }

  winner (): Player | undefined {
    const closingPlayers = this.players.filter(player => {
      return CricketGame.isClosure(this.gameStatus(), player.id)
    })
    const points = this.points()

    return closingPlayers.filter(player => points[player.id] === 0)[0]
  }
}

type CricketScoring = Record<string, Record<number, number>>
