'use client'
import { faDeleteLeft, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, type ReactElement } from 'react'

export default function NumberKeyBoard ({ onSubmit }: { onSubmit: (currentScore: number) => void }): ReactElement {
  const [insertedNumber, setInsertedNumber] = useState<number>(0)
  return (
    <>
      <div className='number_keyboard'>
        <h1 className='insertedNumber'>{insertedNumber}</h1>
        <div>
          {[...Array(9)].map((x, i) => <div key={i + 1}><button onClick={() => { setInsertedNumber(n => n * 10 + i + 1) }}>{i + 1}</button></div>)}
          <div><button onClick={() => {
            setInsertedNumber(Math.floor(insertedNumber / 10))
          }}><FontAwesomeIcon icon={faDeleteLeft} /></button></div>
          <div><button onClick={() => { setInsertedNumber(n => n * 10) }}>0</button></div>
          <div><button onClick={() => {
            onSubmit(insertedNumber)
            setInsertedNumber(0)
          }}><FontAwesomeIcon icon={faRightFromBracket} /></button></div>
        </div>
      </div>
    </>
  )
}
