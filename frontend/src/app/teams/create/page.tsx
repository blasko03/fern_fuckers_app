import { type ReactElement } from 'react'

export default function Home (): ReactElement {
  return (
    <main>
        <div>
            Team name
        </div>
        <div>
           <input type='text' />
        </div>

        <div>
            Members
        </div>
        <div>
           <div><input type='checkbox' /> Player1</div>
           <div><input type='checkbox' /> Player2</div>
           <div><input type='checkbox' /> Player3</div>
           <div><input type='checkbox' /> Player4</div>
           <div><input type='checkbox' /> Player5</div>
        </div>
    </main>
  )
}
