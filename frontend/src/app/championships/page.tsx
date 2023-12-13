'use client'
import { serverRequest } from '@/utils/serverData'
import { useEffect, type ReactElement, useState } from 'react'
import { type Championship } from '../../interfaces/Championship'

export default function Home (): ReactElement {
  const [championships, setChampionships] = useState<Championship[]>()
  const getData = async (): Promise<void> => {
    setChampionships(await serverRequest<Championship[]>('/api/championships'))
  }

  useEffect(() => {
    getData().catch(error => { console.log(error) })
  }, [])
  return (
    <main>
      {championships?.map(championship => <div key={championship.id}>
            <a href={`/championships/${championship.id}`}>{championship.name}</a>
        </div>)}
        <div>
            <a href='/championships/create'>Crea</a>
        </div>
    </main>
  )
}
