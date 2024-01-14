import { type MatchEvents } from '../interfaces/MatchEvents'
import { SERVER_ADDRESS } from './serverData'

type OnMessageAction = (events: MatchEvents) => void

export class EventSourceListner {
  lastEvent: string | undefined
  lastRequestedEvent: string | undefined
  eventSource: EventSource | undefined
  id: string
  onMessageAction: OnMessageAction

  constructor (id: string, lastEvent: string, onMessageAction: OnMessageAction) {
    this.id = id
    this.onMessageAction = onMessageAction
    this.lastEvent = lastEvent
    this.connectToEventSource()
  }

  updateLastEvent (lastEvent: string): void {
    this.lastEvent = lastEvent
  }

  onMessage = (event: MessageEvent<string>): void => {
    const data = event.data
    if (data !== '') {
      const data: MatchEvents = JSON.parse(event.data)
      this.onMessageAction(data)
    }
  }

  onError = (): void => {
    if (this.lastEvent !== this.lastRequestedEvent) {
      this.eventSource?.close()
      this.connectToEventSource()
    }
  }

  connectToEventSource = (): void => {
    const paramsString = this.lastEvent !== undefined ? `lastEvent=${this.lastEvent}` : ''
    this.eventSource = new EventSource(`${SERVER_ADDRESS}/api/match/${this.id}/matchEvents?${paramsString}`)
    this.eventSource.onmessage = this.onMessage
    this.eventSource.onerror = this.onError
    this.lastRequestedEvent = this.lastEvent
  }
}
