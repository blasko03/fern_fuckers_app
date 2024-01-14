import { useEffect, type ReactElement, useState } from 'react'
import { type Championship } from '../../interfaces/Championship'
import { serverRequest } from '../../utils/serverData'
import { StdLayout } from '../../components/layouts/std_layout'
import { Link } from 'react-router-dom'
import { LinkList } from '../../components/link_list'

export default function Championships (): ReactElement {
  const [championships, setChampionships] = useState<Championship[]>([])
  const getData = async (): Promise<void> => {
    setChampionships(await serverRequest<Championship[]>('/api/championships'))
  }
  useEffect(() => {
    getData().catch(error => { console.log(error) })
  }, [])
  return (
    <StdLayout title = {'Championships'}
               bottom = {<Link className='button full-width' to='/championships/create'>Add championship</Link>}>
      <LinkList elements = { championships.map(championship => ({ id: championship.id, text: championship.name, link: `/championships/${championship.id}` })) } />
    </StdLayout>
  )
}
