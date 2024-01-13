import TextField from '@/components/form/text_field'
import { type FormValue } from '@/components/form/utils'
import { type Player } from '@/interfaces/Player'
import { useState, type ReactElement, type Dispatch, type SetStateAction, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { SavedValues, type StartGame } from '.'
import { StdLayout } from '@/components/layouts/std_layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareMinus, faSquarePlus, faArrowsUpDown } from '@fortawesome/free-solid-svg-icons'
import { ReactSortable } from 'react-sortablejs'

function removePlayer ({ player, setPlayers }: { player: Player, setPlayers: Dispatch<SetStateAction<Player[]>> }): void {
  setPlayers(players => (players.filter(p => p.id !== player.id)))
}

function isValidInput (input: string): boolean {
  return input.length >= 2
}

export default function PlayersSelection ({ setPlayers, players, startGame }: { setPlayers: Dispatch<SetStateAction<Player[]>>, players: Player[], startGame: StartGame }): ReactElement {
  const [input, setInput] = useState<FormValue<string>>({ value: '', touched: false })
  useEffect(() => {
    sessionStorage.setItem(SavedValues.PLAYERS, JSON.stringify(players))
  }, [players])

  return <StdLayout title = {'Select players'} bottom = {<button className='full-width' disabled={players.length < 2} onClick={() => { startGame({ reset: true }) }}>Start game</button>}>
    <div className='playersSelection'>
      <div className='input'>
        <form>
          <TextField state = { input } setState = { setInput } isValid={isValidInput(input.value) || !input.touched} name = "name" />
            <button disabled = {!isValidInput(input.value) || players.length >= 6} onClick={() => {
              setPlayers(p => [...p, { id: uuidv4(), name: input.value, surname: '' }])
              setInput({ value: '', touched: false })
            }}><FontAwesomeIcon icon={faSquarePlus} /></button>
          </form>
      </div>
      <div className='players'>
        <ReactSortable list={players} filter={'button'} setList={(newState) => { setPlayers(newState) }}>
          {players.map((player) => (
            <div key={player.id} className='player'>
              <div><FontAwesomeIcon icon={faArrowsUpDown} /> {player.name}</div>
              <button onClick={() => { removePlayer({ player, setPlayers }) }}><FontAwesomeIcon icon={faSquareMinus} /></button>
            </div>
          ))}
        </ReactSortable>
      </div>
    </div>
  </StdLayout>
}
