import { useState, type ReactElement, useEffect } from 'react'
import { type Championship } from '../../../interfaces/Championship'
import { serverRequest } from '../../../utils/serverData'
import { Link, useParams } from 'react-router-dom'
import { StdLayout } from '../../../components/layouts/std_layout'
import { LinkList } from '../../../components/link_list'

export default function ChampionshipGet (): ReactElement {
  const { id } = useParams()
  const [championship, setChampionship] = useState<Championship>()
  const getData = async (id: string): Promise<void> => {
    setChampionship(((await serverRequest<Championship>(`/api/championships/${id}`))))
  }
  useEffect(() => {
    if (id === undefined) { return }
    getData(id).catch(error => { console.log(error) })
  }, [id])

  return (
    <StdLayout title = {'Match'}
               bottom = {<Link className='button full-width' to={`/championships/${id}/stats`}>Statistiche</Link>}>
      { championship?.matches != null
        ? <LinkList elements={championship?.matches.map(match => ({ id: match.id, text: match.teams.map(team => team.name).join(' : '), link: `/match/${match.id}` }))}/>
        : <div></div>
      }
    </StdLayout>
  )
}
