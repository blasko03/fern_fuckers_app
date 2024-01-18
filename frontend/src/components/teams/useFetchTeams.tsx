import { useState, useEffect } from 'react'
import { type Team } from '../../interfaces/Team'
import { serverRequest } from '../../utils/serverData'

export function useFetchTeams (): Team[] {
  const [teams, setTeams] = useState<Team[]>([])
  const getData = async (): Promise<void> => {
    setTeams(await serverRequest<Team[]>('/api/teams'))
  }

  useEffect(() => {
    getData().catch(error => { console.log(error) })
  }, [])
  return teams
}
