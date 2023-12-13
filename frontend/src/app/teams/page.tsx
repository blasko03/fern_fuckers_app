'use client'
import { type Team } from '@/interfaces/Team'
import { serverRequest } from '@/utils/serverData'
import { useState, type ReactElement, useEffect } from 'react'

export default function Home (): ReactElement {
  const [teams, setTeams] = useState<Team[]>([])
  const getData = async (): Promise<void> => {
    setTeams(await serverRequest<Team[]>('/api/teams'))
  }

  useEffect(() => {
    getData().catch(error => { console.log(error) })
  }, [])
  return (
    <main>
      { teams.map(team => <div key={team.id}>{team.name}</div>) }
      <div>
        <a href='/teams/create'>Crea</a>
      </div>
    </main>
  )
}
