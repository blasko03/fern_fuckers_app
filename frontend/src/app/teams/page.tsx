'use client'
import { StdLayout } from '@/components/layouts/std_layout'
import { LinkList } from '@/components/link_list'
import { type Team } from '@/interfaces/Team'
import { serverRequest } from '@/utils/serverData'
import Link from 'next/link'
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
    <StdLayout title = {'Teams'}
               bottom = {<Link className='button full-width' href='/teams/create'>Add team</Link>}>
      <LinkList elements={teams.map(team => ({ id: team.id, text: team.name }))}/>
    </StdLayout>
  )
}
