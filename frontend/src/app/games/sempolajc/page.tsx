'use client'
import Cricket from '@/components/games/sempolajc'
import { type ReactElement } from 'react'
import WakeLock from '@/app/wake_lock'

export default function CricketRoute (): ReactElement {
  return <WakeLock><Cricket /></WakeLock>
}
