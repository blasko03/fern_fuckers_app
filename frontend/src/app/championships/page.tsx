'use client'
import { serverData } from '@/utils/server_data'
import { useEffect, type ReactElement, useState } from 'react'
import { type Championship } from '../../interfaces/Championship'

export default function Home (): ReactElement {
  const [championships, setChampionships] = useState<Championship[]>()
  const getData = async (): Promise<void> => {
    setChampionships(await serverData<Championship[]>('api/championships'))
  }

  useEffect(() => {
    getData().catch(error => { console.log(error) })
  }, [])
  return (
    <main>
      {championships?.map(championship => <div key={championship.id}>
            <a href={`/championship/${championship.id}`}>{championship.name}</a>
        </div>)}
        <div>
            <a href='/championship/create'>Crea</a>
        </div>
    </main>
  )
}
