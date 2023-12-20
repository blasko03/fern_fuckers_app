'use client'
import { serverRequest } from '@/utils/serverData'
import { useEffect, type ReactElement, useState } from 'react'
import { type Championship } from '../../interfaces/Championship'
import { LinkList } from '@/components/link_list'
import { StdLayout } from '@/components/layouts/std_layout'
import Link from 'next/link'

export default function Home (): ReactElement {
  const [championships, setChampionships] = useState<Championship[]>([])
  const getData = async (): Promise<void> => {
    setChampionships(await serverRequest<Championship[]>('/api/championships'))
  }

  useEffect(() => {
    getData().catch(error => { console.log(error) })
  }, [])
  return (
    <StdLayout title = {'Championships'}
               bottom = {<Link className='button full-width' href='/championships/create'>Add championship</Link>}>
      <LinkList elements = { championships.map(championship => ({ id: championship.id, text: championship.name, link: `/championships/${championship.id}` })) } />
    </StdLayout>
  )
}
