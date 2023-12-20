'use client'
import { serverRequest } from '@/utils/serverData'
import { useEffect, type ReactElement, useState } from 'react'
import { type Championship } from '../../interfaces/Championship'
import { LinkList } from '@/components/link_list'

export default function Home (): ReactElement {
  const [championships, setChampionships] = useState<Championship[]>([])
  const getData = async (): Promise<void> => {
    setChampionships(await serverRequest<Championship[]>('/api/championships'))
  }

  useEffect(() => {
    getData().catch(error => { console.log(error) })
  }, [])
  return (
    <main>
      <LinkList elements = { championships.map(championship => ({ id: championship.id, text: championship.name, link: `/championships/${championship.id}` })) } />

        <div>
            <a href='/championships/create'>Crea</a>
        </div>
    </main>
  )
}
