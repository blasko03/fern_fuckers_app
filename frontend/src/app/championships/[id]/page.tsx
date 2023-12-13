'use client'
import { type Championship } from '@/interfaces/Championship'
import { serverRequest } from '@/utils/serverData'
import { useState, type ReactElement, useEffect } from 'react'

interface Props {
  params: {
    id: string
  }
}

export default function Home ({ params: { id } }: Props): ReactElement {
  const [championship, setChampionship] = useState<Championship>()
  const getData = async (id: string): Promise<void> => {
    setChampionship(((await serverRequest<Championship[]>('/api/championships'))).filter(x => x.id === id)[0])
  }

  useEffect(() => {
    getData(id).catch(error => { console.log(error) })
  }, [id])

  return (
    <main className='box'>
      {championship?.matches.map(match => <div key={match.id}>
          <a href={`/match/${match.id}`}>{match.teams.map(team => team.name).join(' : ')}</a>
        </div>
      )}
    </main>
  )
}
