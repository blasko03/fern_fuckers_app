'use client'
import Cricket from '@/components/games/cricket'
import { type ReactElement } from 'react'
import WakeLock from '@/app/wake_lock'

export default function CricketRoute (): ReactElement {
  return <WakeLock><Cricket /></WakeLock>
}
