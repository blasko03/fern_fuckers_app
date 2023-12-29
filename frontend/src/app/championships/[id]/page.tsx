'use client'
import { StdLayout } from '@/components/layouts/std_layout'
import { LinkList } from '@/components/link_list'
import { type Championship } from '@/interfaces/Championship'
import { serverRequest } from '@/utils/serverData'
import Link from 'next/link'
import { useState, type ReactElement, useEffect } from 'react'

interface Props {
  params: {
    id: string
  }
}

export default function Home ({ params: { id } }: Props): ReactElement {
  const [championship, setChampionship] = useState<Championship>()
  const getData = async (id: string): Promise<void> => {
    setChampionship(((await serverRequest<Championship>(`/api/championships/${id}`))))
  }

  useEffect(() => {
    getData(id).catch(error => { console.log(error) })
  }, [id])

  return (
    <StdLayout title = {'Match'}
               bottom = {<Link className='button full-width' href={`/championships/${id}/stats`}>Statistiche</Link>}>
      { championship?.matches != null
        ? <LinkList elements={championship?.matches.map(match => ({ id: match.id, text: match.teams.map(team => team.name).join(' : '), link: `/match/${match.id}` }))}/>
        : <div></div>
      }
    </StdLayout>
  )
}
