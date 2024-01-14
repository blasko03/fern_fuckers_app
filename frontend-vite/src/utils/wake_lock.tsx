import { useEffect } from 'react'

export default function ScreenWakeLock ({ children }: { children: React.ReactNode }): React.ReactNode {
  async function requestWakeLock (): Promise<void> {
    try {
      await navigator.wakeLock.request('screen')
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    requestWakeLock().catch(e => { console.log(e) })
  }, [])

  return children
}
