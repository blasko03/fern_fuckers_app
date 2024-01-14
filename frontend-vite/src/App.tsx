import { ToastContainer } from 'react-toastify'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Players from './pages/players'
import PlayerCreate from './pages/players/create/page'
import ChampionshipCreate from './pages/championships/create'
import Teams from './pages/teams'
import TeamCreate from './pages/teams/create'
import Championships from './pages/championships'
import ChampionshipGet from './pages/championships/id'
import ChampionshipStats from './pages/championships/stats'
import MatchGet from './pages/match/id'
import SempolajcPage from './pages/games/sempolajc'
import { type ReactElement } from 'react'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/championships',
    element: <Championships />
  },
  {
    path: '/championships/create',
    element: <ChampionshipCreate />
  },
  {
    path: '/championships/:id',
    element: <ChampionshipGet />
  },
  {
    path: '/championships/:id/stats',
    element: <ChampionshipStats />
  },
  {
    path: '/match/:id',
    element: <MatchGet />
  },
  {
    path: '/teams',
    element: <Teams />
  },
  {
    path: '/teams/create',
    element: <TeamCreate />
  },
  {
    path: '/players',
    element: <Players />
  },
  {
    path: '/players/create',
    element: <PlayerCreate />
  },
  {
    path: '/games/sempolajc',
    element: <SempolajcPage />
  }
])

function App (): ReactElement {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  )
}

export default App
