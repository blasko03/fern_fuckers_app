import { useState, type ReactElement, useEffect } from 'react'
import { serverRequest } from '../../utils/serverData'
import { Team } from '../../interfaces/Team'
import { StdLayout } from '../../components/layouts/std_layout'
import { LinkList } from '../../components/link_list'
import { Link } from 'react-router-dom'

export default function Teams (): ReactElement {
  const [teams, setTeams] = useState<Team[]>([])
  const getData = async (): Promise<void> => {
    setTeams(await serverRequest<Team[]>('/api/teams'))
  }

  useEffect(() => {
    getData().catch(error => { console.log(error) })
  }, [])
  return (
    <StdLayout title = {'Teams'}
               bottom = {<Link className='button full-width' to='/teams/create'>Add team</Link>}>
      <LinkList elements={teams.map(team => ({ id: team.id, text: team.name }))}/>
    </StdLayout>
  )
}
