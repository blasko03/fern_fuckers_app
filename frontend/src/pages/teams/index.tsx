import { type ReactElement } from 'react'
import { StdLayout } from '../../components/layouts/std_layout'
import { LinkList } from '../../components/link_list'
import { Link } from 'react-router-dom'
import { useFetchTeams } from '../../components/teams/useFetchTeams'

export default function Teams (): ReactElement {
  const teams = useFetchTeams()
  return (
    <StdLayout title = {'Teams'}
               bottom = {<Link className='button full-width' to='/teams/create'>Add team</Link>}>
      <LinkList elements={teams.map(team => ({ id: team.id, text: team.name }))}/>
    </StdLayout>
  )
}
