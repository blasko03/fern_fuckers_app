'use client'
import { type Championship } from '@/interfaces/Championship'
import { serverData } from '@/utils/server_data'
import { useState, type ReactElement, useEffect } from 'react'

interface Props {
  params: {
    id: string
  }
}

export default function Home ({ params: { id } }: Props): ReactElement {
  const [championship, setChampionship] = useState<Championship>()
  const getData = async (): Promise<void> => {
    setChampionship(((await serverData<Championship[]>('api/championships'))).filter(x => x.id === id)[0])
  }
  useEffect(() => {
    getData().catch(error => { console.log(error) })
  }, [])

  return (
    <main className='box'>
      {championship?.matches.map(match => <div key={match.id}>
          <a href={`/match/${match.id}`}>{match.teams.map(team => team.name).join(' : ')}</a>
        </div>
      )}
    </main>
  )
}
