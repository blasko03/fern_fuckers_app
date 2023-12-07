'use client'
import { serverData } from '@/utils/server_data'
import { useEffect, type ReactElement, useState } from 'react'

export default function Home (): ReactElement {
  const [championships, setChampionships] = useState<string[]>()
  const getData = async (): Promise<void> => {
    setChampionships(await serverData<string[]>('api/championships'))
  }

  useEffect(() => {
    getData().catch(error => { console.log(error) })
  }, [])
  return (
    <main>
      {championships?.map(championship => <div key={championship}>
            <a href='/championship'>{championship}</a>
        </div>)}
        <div>
            <a href='/championship/create'>Crea</a>
        </div>
    </main>
  )
}
